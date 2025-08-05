import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  Terminal, 
  Cpu, 
  Code2, 
  Rocket, 
  Shield, 
  Database, 
  Globe,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Star,
  Award,
  Calendar,
  MapPin,
  Phone,
  Eye,
  Heart,
  Play,
  Pause
} from 'lucide-react';
import BioRender from '../../ui/BioRender'; // Assuming BioRender is a component that renders the bio content

const NeonCyberpunkTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="min-h-screen bg-black relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(cyan 1px, transparent 1px),
                  linear-gradient(90deg, cyan 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'grid-move 20s linear infinite'
              }} />
            </div>

            {/* Neon particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: '0 0 10px cyan'
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="mb-8"
                >
                  {user.profileImgUrl ? (
                    <div className="relative">
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-cyan-400 shadow-2xl"
                        style={{ boxShadow: '0 0 50px cyan' }}
                      />
                      <div className="absolute inset-0 rounded-full border-4 border-pink-500 animate-ping opacity-20"></div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-black text-6xl font-bold mx-auto border-4 border-cyan-400"
                         style={{ boxShadow: '0 0 50px cyan' }}>
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 mb-6 ${
                    glitchActive ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    textShadow: glitchActive ? '2px 2px 0px #ff00ff, -2px -2px 0px #00ffff' : 'none',
                    filter: glitchActive ? 'hue-rotate(90deg)' : 'none'
                  }}
                >
                  {user.fullName}
                </motion.h1>

                {user.title && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center justify-center mb-8"
                  >
                    <Terminal className="w-6 h-6 text-cyan-400 mr-3" />
                    <p className="text-2xl text-cyan-300 font-mono">
                      {user.title}
                    </p>
                  </motion.div>
                )}

                {user.bio && (
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12 font-mono"
                  >
                     <BioRender bio={user.bio}/> 
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center space-x-6"
                >
                  <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold rounded-lg hover:from-pink-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
                          style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>DOWNLOAD_CV.exe</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      {musicPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{musicPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-cyan-900/20"></div>
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-16 font-mono"
              >
                &lt;SKILLS_MATRIX/&gt;
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, rotateY: -90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                      rotateY: 10 
                    }}
                    className="group p-6 bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-lg text-center font-mono relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:animate-spin" />
                      <p className="text-cyan-300 font-bold text-lg">{skill}</p>
                      <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-purple-900 via-black to-cyan-900">
            <div className="max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-16 font-mono"
              >
                [PROJECT_ARCHIVE]
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 5,
                      boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)'
                    }}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 p-8"
                  >
                    {/* Animated border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    {/* Glitch effect overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-pink-500 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <Rocket className="w-6 h-6 text-cyan-400 mr-3" />
                        <h3 className="text-2xl font-bold text-cyan-300 font-mono">
                          {project.title}
                        </h3>
                      </div>
                      
                      {project.description && (
                        <p className="text-gray-300 mb-6 leading-relaxed font-mono text-sm">
                          {project.description}
                        </p>
                      )}
                      
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                                techIndex % 3 === 0 ? 'border-cyan-400 text-cyan-400' :
                                techIndex % 3 === 1 ? 'border-pink-400 text-pink-400' :
                                'border-purple-400 text-purple-400'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-gray-800 text-cyan-400 rounded border border-cyan-400/50 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono text-sm"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            SOURCE
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-mono text-sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            DEPLOY
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'contact':
        return (
          <section className="py-20 bg-black relative overflow-hidden">
            {/* Matrix rain effect */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-cyan-400 font-mono text-sm animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 font-mono"
              >
                ESTABLISH_CONNECTION()
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-cyan-300 mb-12 font-mono"
              >
                Ready to hack the future together?
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                    rotateY: 10 
                  }}
                  className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300"
                >
                  <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:animate-bounce" />
                  <p className="text-cyan-300 font-mono font-bold">EMAIL_PROTOCOL</p>
                  <p className="text-gray-400 font-mono text-sm mt-2">{user.email}</p>
                </motion.a>

                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: '0 0 30px rgba(255, 0, 255, 0.8)',
                      rotateY: -10 
                    }}
                    className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-pink-400/30 rounded-lg hover:border-pink-400 transition-all duration-300"
                  >
                    <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-4 group-hover:animate-bounce" />
                    <p className="text-pink-300 font-mono font-bold">LINKEDIN_NET</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">Professional Network</p>
                  </motion.a>
                )}

                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: '0 0 30px rgba(128, 0, 255, 0.8)',
                      rotateY: 10 
                    }}
                    className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-purple-400/30 rounded-lg hover:border-purple-400 transition-all duration-300"
                  >
                    <Github className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
                    <p className="text-purple-300 font-mono font-bold">GITHUB_REPO</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">Code Repository</p>
                  </motion.a>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black font-mono">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      {/* Custom cursor */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute w-4 h-4 bg-cyan-400 rounded-full mix-blend-difference animate-pulse" 
             style={{ 
               left: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
               top: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
             }} />
      </div>

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default NeonCyberpunkTemplate;