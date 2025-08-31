// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import toast from 'react-hot-toast'

// const IntegrationsManager = () => {
//   const [integrations, setIntegrations] = useState([
//     {
//       id: 'google-analytics',
//       name: 'Google Analytics',
//       description: 'Track portfolio visitors and engagement',
//       icon: '📊',
//       category: 'analytics',
//       connected: false
//     },
//     {
//       id: 'github',
//       name: 'GitHub',
//       description: 'Automatically sync your repositories',
//       icon: '🐙',
//       category: 'productivity',
//       connected: true
//     },
//     {
//       id: 'linkedin',
//       name: 'LinkedIn',
//       description: 'Import experience and recommendations',
//       icon: '💼',
//       category: 'social',
//       connected: false
//     },
//     {
//       id: 'dribbble',
//       name: 'Dribbble',
//       description: 'Showcase your design work',
//       icon: '🏀',
//       category: 'design',
//       connected: false
//     },
//     {
//       id: 'behance',
//       name: 'Behance',
//       description: 'Display your creative projects',
//       icon: '🎨',
//       category: 'design',
//       connected: false
//     },
//     {
//       id: 'medium',
//       name: 'Medium',
//       description: 'Import your blog posts',
//       icon: '📝',
//       category: 'productivity',
//       connected: false
//     },
//     {
//       id: 'figma',
//       name: 'Figma',
//       description: 'Embed your design prototypes',
//       icon: '🎯',
//       category: 'design',
//       connected: false
//     },
//     {
//       id: 'codepen',
//       name: 'CodePen',
//       description: 'Show your code experiments',
//       icon: '✏️',
//       category: 'productivity',
//       connected: false
//     }
//   ])

//   const [activeCategory, setActiveCategory] = useState('all')

//   const categories = [
//     { id: 'all', label: 'All', icon: '🔗' },
//     { id: 'analytics', label: 'Analytics', icon: '📊' },
//     { id: 'social', label: 'Social', icon: '👥' },
//     { id: 'productivity', label: 'Productivity', icon: '⚡' },
//     { id: 'design', label: 'Design', icon: '🎨' }
//   ]

//   const filteredIntegrations =
//     activeCategory === 'all'
//       ? integrations
//       : integrations.filter(integration => integration.category === activeCategory)

//   const handleToggleIntegration = (integrationId) => {
//     setIntegrations(prev =>
//       prev.map(integration =>
//         integration.id === integrationId
//           ? { ...integration, connected: !integration.connected }
//           : integration
//       )
//     )

//     const integration = integrations.find(i => i.id === integrationId)
//     if (integration) {
//       toast.success(`${integration.name} ${integration.connected ? 'disconnected' : 'connected'}!`)
//     }
//   }

//   const connectedCount = integrations.filter(i => i.connected).length

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Integrations
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Connect your favorite tools and services
//           </p>
//         </div>
//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           {connectedCount} of {integrations.length} connected
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {categories.slice(1).map(category => {
//           const categoryIntegrations = integrations.filter(i => i.category === category.id)
//           const connectedInCategory = categoryIntegrations.filter(i => i.connected).length

//           return (
//             <motion.div
//               key={category.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="card p-4 text-center"
//             >
//               <div className="text-2xl mb-2">{category.icon}</div>
//               <h3 className="font-medium text-gray-900 dark:text-white">
//                 {category.label}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {connectedInCategory}/{categoryIntegrations.length} connected
//               </p>
//             </motion.div>
//           )
//         })}
//       </div>

//       {/* Category Filter */}
//       <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
//         {categories.map(category => (
//           <button
//             key={category.id}
//             onClick={() => setActiveCategory(category.id)}
//             className={`
//               flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
//               ${activeCategory === category.id
//                 ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
//                 : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//               }
//             `}
//           >
//             <span>{category.icon}</span>
//             <span>{category.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Integrations Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredIntegrations.map((integration, index) => (
//           <motion.div
//             key={integration.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`
//               card p-6 transition-all duration-300 hover:shadow-lg
//               ${integration.connected
//                 ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
//                 : 'hover:border-primary-200 dark:hover:border-primary-800'
//               }
//             `}
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="text-3xl">{integration.icon}</div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white">
//                     {integration.name}
//                   </h3>
//                   <div className={`
//                     inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
//                     ${integration.connected
//                       ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
//                       : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400'
//                     }
//                   `}>
//                     {integration.connected ? 'Connected' : 'Not Connected'}
//                   </div>
//                 </div>
//               </div>

//               <motion.button
//                 onClick={() => handleToggleIntegration(integration.id)}
//                 className={`
//                   relative inline-flex h-6 w-11 items-center rounded-full transition-colors
//                   ${integration.connected ? 'bg-green-600' : 'bg-gray-300 dark:bg-dark-600'}
//                 `}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
//                   animate={{
//                     x: integration.connected ? 24 : 4
//                   }}
//                   transition={{
//                     type: 'spring',
//                     stiffness: 500,
//                     damping: 30
//                   }}
//                 />
//               </motion.button>
//             </div>

//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               {integration.description}
//             </p>

//             {integration.connected && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 className="border-t border-green-200 dark:border-green-800 pt-4"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-green-700 dark:text-green-300">
//                     Last synced: Just now
//                   </span>
//                   <button className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
//                     Configure
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Coming Soon Section */}
//       <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
//         <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
//           🚀 More Integrations Coming Soon!
//         </h3>
//         <p className="text-purple-800 dark:text-purple-200 mb-4">
//           We're working on adding more integrations to make your portfolio even more powerful.
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-700 dark:text-purple-300">
//           <div className="flex items-center space-x-2">
//             <span>📧</span>
//             <span>Mailchimp</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>💬</span>
//             <span>Discord</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>📱</span>
//             <span>Instagram</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>🎵</span>
//             <span>Spotify</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default IntegrationsManager



// IntegrationsManager.jsx (changes)
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function IntegrationsManager() {
  const [integrations, setIntegrations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    { id:'all', label:'All', icon:'🔗' },
    { id:'analytics', label:'Analytics', icon:'📊' },
    { id:'social', label:'Social', icon:'👥' },
    { id:'productivity', label:'Productivity', icon:'⚡' },
    { id:'design', label:'Design', icon:'🎨' }
  ];

  const token = localStorage.getItem('token');

  async function load() {
    const res = await fetch(`${API}/integrations`, { headers: { Authorization: `Bearer ${token}` }});
    const data = await res.json();
    setIntegrations(data.integrations);
  }

  useEffect(() => { load(); }, []);

  const filteredIntegrations =
    activeCategory === 'all' ? integrations : integrations.filter(i => i.category === activeCategory);

  async function connect(providerId) {
    const res = await fetch(`${API}/integrations/${providerId}/connect-url`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const win = window.open(data.authUrl, '_blank', 'width=520,height=620');

    // crude poll to refresh after OAuth completes (token set by /oauth/callback page)
    const poll = setInterval(() => {
      const newToken = localStorage.getItem('token');
      if (newToken) {
        clearInterval(poll);
        load();
        toast.success(`${providerId} connected`);
        if (win) win.close();
      }
    }, 1500);
  }

  async function disconnect(providerId) {
    await fetch(`${API}/integrations/${providerId}/disconnect`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }
    });
    toast.success(`${providerId} disconnected`);
    load();
  }

  async function sync(providerId) {
    const res = await fetch(`${API}/integrations/${providerId}/sync`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(`Synced (${new Date(data.lastSyncedAt).toLocaleString()})`);
      load();
    } else {
      toast.error('Sync failed');
    }
  }

  const handleToggleIntegration = (id, isConnected) => {
    if (isConnected) disconnect(id); else connect(id);
  };

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Connect your favorite tools and services</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {connectedCount} of {integrations.length} connected
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.slice(1).map(category => {
          const cats = integrations.filter(i => i.category === category.id);
          const conn = cats.filter(i => i.connected).length;
          return (
            <motion.div key={category.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="card p-4 text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-900 dark:text-white">{category.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{conn}/{cats.length} connected</p>
            </motion.div>
          );
        })}
      </div>

      {/* filter */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {categories.map(category => (
          <button key={category.id} onClick={()=>setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${activeCategory===category.id ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm' :
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
            <span>{category.icon}</span><span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div key={integration.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*0.05 }}
            className={`card p-6 transition-all duration-300 hover:shadow-lg
              ${integration.connected ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
              : 'hover:border-primary-200 dark:hover:border-primary-800'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{integration.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${integration.connected ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400'}`}>
                    {integration.connected ? 'Connected' : 'Not Connected'}
                  </div>
                </div>
              </div>

              <motion.button whileTap={{ scale:0.95 }}
                onClick={() => handleToggleIntegration(integration.id, integration.connected)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${integration.connected ? 'bg-green-600' : 'bg-gray-300 dark:bg-dark-600'}`}>
                <motion.span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                  animate={{ x: integration.connected ? 24 : 4 }} transition={{ type:'spring', stiffness:500, damping:30 }}/>
              </motion.button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>

            {integration.connected && (
              <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                className="border-t border-green-200 dark:border-green-800 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Last synced: {integration.lastSyncedAt ? new Date(integration.lastSyncedAt).toLocaleString() : '—'}
                  </span>
                  <button onClick={()=>sync(integration.id)}
                    className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                    Configure / Sync
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Coming soon as-is */}
      {/* ... keep your existing Coming Soon section ... */}
    </div>
  );
}
