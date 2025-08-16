import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Award,
  Star,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Eye,
  Heart,
  Palette,
  Layers,
  Zap
} from 'lucide-react';

import TagLineRender from '../../ui/TagLineRender';



const GlassmorphismTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState(0);
  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const themes = [
    'from-purple-400 via-pink-500 to-red-500',
    'from-blue-400 via-purple-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-indigo-400 via-purple-500 to-pink-500'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="min-h-screen relative overflow-hidden">
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${themes[colorTheme]} opacity-80`}>
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </div>

            {/* Floating glass orbs */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Interactive mouse follower */}
            <div 
              className="absolute w-96 h-96 rounded-full bg-white/5 backdrop-blur-3xl pointer-events-none"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                transition: 'all 0.3s ease-out'
              }}
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
              <div className="text-center">
                {/* Theme switcher */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-8 right-8 flex space-x-2"
                >
                  {themes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setColorTheme(index)}
                      className={`w-4 h-4 rounded-full border-2 border-white/30 ${
                        colorTheme === index ? 'scale-125' : ''
                      } transition-transform`}
                      style={{ background: `linear-gradient(45deg, ${themes[index].split(' ')[0].replace('from-', '')}, ${themes[index].split(' ')[2].replace('to-', '')})` }}
                    />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                  className="mb-8"
                >
                  {user.profileImgUrl ? (
                    <div className="relative">
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold mx-auto border-4 border-white/30 shadow-2xl">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
                >
                  {user.fullName}
                </motion.h1>

                {user.title && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8"
                  >
                    <Sparkles className="w-5 h-5 text-white mr-3" />
                    <p className="text-xl text-white font-medium">
                      {user.title}
                    </p>
                  </motion.div>
                )}

                {user.tagLine && (
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-12 backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20"
                  >
                  <TagLineRender tagLine={user.tagLine}/> 
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center space-x-6"
                >
                  <button className="group px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span className="font-medium">Download CV</span>
                    </div>
                  </button>
                  <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>View Portfolio</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-gray-800 mb-16"
              >
                Skills & Expertise
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                    className="group p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <Code className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-800 font-semibold text-lg">{skill}</p>
                    <div className="mt-4 h-2 bg-gray-200/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-5" />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-gray-800 mb-16"
              >
                Featured Projects
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.02,
                      rotateY: index % 2 === 0 ? 5 : -5,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                    }}
                    className="group relative overflow-hidden rounded-3xl bg-white/50 backdrop-blur-md border border-white/60 shadow-xl"
                  >
                    {/* Project image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="w-16 h-16 text-white/80" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      {project.description && (
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/60 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-white/40"
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
                            className="flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/40"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
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
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-bold text-gray-800 mb-8"
              >
                Let's Connect
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 mb-12"
              >
                Ready to create something amazing together?
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    rotateY: 10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }}
                  className="group p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <Mail className="w-12 h-12 text-purple-600 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">{user.email}</p>
                </motion.a>

                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      rotateY: -10,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                    }}
                    className="group p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative mb-6">
                      <Linkedin className="w-12 h-12 text-blue-600 mx-auto group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">LinkedIn</h3>
                    <p className="text-gray-600">Professional Network</p>
                  </motion.a>
                )}

                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                    }}
                    className="group p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative mb-6">
                      <Github className="w-12 h-12 text-gray-800 mx-auto group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">GitHub</h3>
                    <p className="text-gray-600">Code Repository</p>
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
    <div className="min-h-screen relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />
      
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </div>
  );
};

export default GlassmorphismTemplate;