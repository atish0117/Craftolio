// routes/integrationRoutes.js
import express from 'express';
import Integration from '../models/Integration.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import axios from 'axios';
import { providers } from '../config/oauthProviders.js';

const router = express.Router();

// List all integrations (status)
router.get('/', auth, async (req, res) => {
  const defs = [
    { id:'google-analytics', name:'Google Analytics', category:'analytics', icon:'📊', description:'Track portfolio visitors and engagement' },
    { id:'github', name:'GitHub', category:'productivity', icon:'🐙', description:'Automatically sync your repositories' },
    { id:'linkedin', name:'LinkedIn', category:'social', icon:'💼', description:'Import experience and recommendations' },
    { id:'dribbble', name:'Dribbble', category:'design', icon:'🏀', description:'Showcase your design work' },
    { id:'behance', name:'Behance', category:'design', icon:'🎨', description:'Display your creative projects' },
    { id:'medium', name:'Medium', category:'productivity', icon:'📝', description:'Import your blog posts' },
    { id:'figma', name:'Figma', category:'design', icon:'🎯', description:'Embed your design prototypes' },
    { id:'codepen', name:'CodePen', category:'productivity', icon:'✏️', description:'Show your code experiments' },
  ];
  const rows = await Integration.find({ userId: req.user._id });
  const map = Object.fromEntries(rows.map(r => [r.provider, r]));
  const withStatus = defs.map(d => ({
    ...d,
    connected: !!map[d.id]?.connected,
    lastSyncedAt: map[d.id]?.lastSyncedAt || null
  }));
  res.json({ integrations: withStatus });
});

// Get provider auth URL (so UI can start connect)
router.get('/:provider/connect-url', auth, async (req, res) => {
  const prov = req.params.provider;
  const key = prov === 'google-analytics' ? 'google' : prov;
  const cfg = providers[key];
  if (!cfg) return res.status(400).json({ message: 'Unsupported provider' });
  const state = encodeURIComponent('inapp'); // optional
  const authUrl = key === 'github'
    ? `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`
    : key === 'google'
    ? `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&response_type=code&scope=${encodeURIComponent(cfg.scope)}&access_type=offline&prompt=consent&state=${state}`
    : `${cfg.authUrl}?response_type=code&client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`;

  res.json({ authUrl });
});

// Disconnect
router.post('/:provider/disconnect', auth, async (req, res) => {
  const prov = req.params.provider;
  await Integration.findOneAndUpdate(
    { userId: req.user._id, provider: prov },
    { connected: false, accessToken: null, refreshToken: null, expiresAt: null },
    { upsert: true }
  );
  res.json({ message: `${prov} disconnected` });
});

// Manual Sync (example: GitHub & LinkedIn → update profile/projects)
router.post('/:provider/sync', auth, async (req, res) => {
  const prov = req.params.provider;
  const row = await Integration.findOne({ userId: req.user._id, provider: prov });
  if (!row?.connected || !row.accessToken) return res.status(400).json({ message: 'Not connected' });

  const user = await User.findById(req.user._id);

  try {
    if (prov === 'github') {
      const me = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${row.accessToken}` }});
      const repos = await axios.get('https://api.github.com/user/repos?per_page=100&sort=updated', { headers: { Authorization: `Bearer ${row.accessToken}` }});
      // pick top 3 by stargazers_count
      const top = repos.data.sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,3).map(r=>({
        title: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        tech: (r.language ? [r.language] : [])
      }));

      // merge to profile (simple example)
      user.socialLinks = { ...(user.socialLinks||{}), github: me.data.html_url };
      user.tagLine = user.tagLine || (me.data.bio || user.tagLine);
      await user.save();

      // OPTIONAL: if you have Project model, upsert these 3 as "imported"
      // ... upsert logic here if needed ...

    } else if (prov === 'linkedin') {
      const prof = await axios.get(providers.linkedin.profileUrl, { headers: { Authorization: `Bearer ${row.accessToken}` }});
      const first = prof.data.localizedFirstName || '';
      const last = prof.data.localizedLastName || '';
      const fullName = `${first} ${last}`.trim();
      if (!user.fullName) user.fullName = fullName;
      user.socialLinks = { ...(user.socialLinks||{}), linkedin: `https://www.linkedin.com/in/${prof.data.id}` };
      await user.save();
    } else if (prov === 'google-analytics') {
      // here generally you'd store property id / measurement id after a config UI
      // skipping actual GA property linkage in this minimal example
    }

    row.lastSyncedAt = new Date();
    await row.save();
    res.json({ message: 'Synced', lastSyncedAt: row.lastSyncedAt });
  } catch (e) {
    console.error('Sync error', e?.response?.data || e);
    res.status(500).json({ message: 'Sync failed' });
  }
});

export default router;
