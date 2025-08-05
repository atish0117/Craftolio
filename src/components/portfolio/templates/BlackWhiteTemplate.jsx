import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
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
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  Trophy,
  Quote,
  CheckCircle,
  Send,
  Coffee,
  Lightbulb,
  Target,
  BookOpen,
  Building,
  Globe,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  MousePointer,
  Layers,
  Grid,
  Square,
  Circle
} from 'lucide-react';

import BioRender from '../../ui/BioRender';


// Memoized floating geometric shapes
const FloatingShape = memo(({ index, delay }) => {
  const shapes = [Square, Circle, Grid, Layers];
  const Shape = shapes[index % shapes.length];
  
  return (
    <motion.div
      className="absolute opacity-10"
      style={{
        left: `${10 + (index % 10) * 8}%`,
        top: `${20 + (index % 4) * 20}%`,
      }}
      animate={{
        y: [0, -50, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      <Shape className="w-8 h-8 text-white" />
    </motion.div>
  );
});

// Interactive skill card with hover effects
const InteractiveSkillCard = memo(({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const proficiency = Math.floor(Math.random() * 30) + 70;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Animated background on hover */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: '16px' }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Code className={`w-8 h-8 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-black'
          }`} />
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className={`text-sm font-bold px-3 py-1 rounded-full border-2 transition-colors duration-300 ${
              isHovered 
                ? 'border-white text-white' 
                : 'border-black text-black'
            }`}
          >
            {proficiency}%
          </motion.div>
        </div>
        
        <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
          isHovered ? 'text-white' : 'text-black'
        }`}>
          {skill}
        </h3>
        
        {/* Animated progress bar */}
        <div className={`h-2 rounded-full transition-colors duration-300 ${
          isHovered ? 'bg-white/20' : 'bg-gray-200'
        }`}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
            className={`h-full rounded-full transition-colors duration-300 ${
              isHovered ? 'bg-white' : 'bg-black'
            }`}
          />
        </div>
        
        {/* Sparkle effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-2 right-2"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// Interactive project card with flip effect
const InteractiveProjectCard = memo(({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  }, [liked]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative h-80 perspective-1000"
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-300 overflow-hidden">
          {/* Project image area */}
          <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Lightbulb className="w-16 h-16 text-white/80" />
            </div>
            
            {/* Animated overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Like button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  liked ? 'text-red-500 fill-current' : 'text-white'
                }`} 
              />
            </button>
            
            {/* Flip indicator */}
            <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium">
              Click to flip →
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{views}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{likes}</span>
                </div>
              </div>
              <MousePointer className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-black rounded-2xl border-2 border-black text-white p-6 transform rotateY-180">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">{project.title}</h3>
              
              {project.description && (
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
              )}
              
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech , techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
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
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const BlackWhiteTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mouse tracking for interactive cursor
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => 
          (prev + 1) % user.testimonials.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  const renderSection = useCallback((sectionId ) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="relative min-h-screen bg-black overflow-hidden">
            {/* Animated geometric background */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }, (_, i) => (
                <FloatingShape key={i} index={i} delay={i * 0.2} />
              ))}
            </div>

            {/* Interactive cursor follower */}

            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Status badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-8"
                    >
                      <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                        <Zap className="w-4 h-4 mr-2" />
                        Available for Creative Projects
                      </span>
                    </motion.div>

                    <h1 className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                      <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block"
                      >
                        {user.fullName}
                      </motion.span>
                    </h1>
                    
                    {user.title && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center mb-8"
                      >
                        <div className="w-12 h-0.5 bg-white mr-4"></div>
                        <p className="text-2xl text-gray-300 font-light">
                          {user.title}
                        </p>
                      </motion.div>
                    )}
                    
                    {user.bio && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg text-gray-400 mb-12 leading-relaxed max-w-lg"
                      >
                            <BioRender bio={user.bio} />
                        
                        {/* {user.bio} */}
                      </motion.p>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                      <button className="group flex items-center justify-center px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-bold transform hover:scale-105">
                        <Download className="w-5 h-5 mr-2" />
                        Download Portfolio
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold transform hover:scale-105">
                        <div className="flex items-center justify-center">
                          <Eye className="w-5 h-5 mr-2" />
                          Explore Work
                        </div>
                      </button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <div className="relative">
                      {user.profileImgUrl ? (
                        <motion.img
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          src={user.profileImgUrl}
                          alt={user.fullName}
                          className="w-80 h-80 rounded-3xl object-cover shadow-2xl border-4 border-white/20"
                        />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: -2 }}
                          className="w-80 h-80 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-black shadow-2xl border-4 border-white/20"
                        >
                          {user.fullName.charAt(0)}
                        </motion.div>
                      )}
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-white/50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Status indicator */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-white/70"
                  >
                    <span className="text-sm mb-2">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-black mb-4">
                  Skills & Expertise
                </h2>
                <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Interactive showcase of technical skills and professional competencies
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.skills.map((skill , index) => (
                  <InteractiveSkillCard key={skill} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'experience':
        return user.experience && user.experience.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4">
                  Professional Journey
                </h2>
                <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Career progression and key achievements
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20"></div>

                <div className="space-y-12">
                  {user.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-6 top-2 w-4 h-4 bg-white rounded-full border-4 border-black shadow-lg"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <Briefcase className="w-6 h-6 text-white mr-3" />
                          <h3 className="text-2xl font-bold text-white">
                            {exp.position}
                          </h3>
                        </div>
                        
                        <div className="flex items-center text-gray-300 mb-2">
                          <Building className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-400 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {['Leadership', 'Innovation', 'Growth'].map((achievement, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null;

      case 'education':
        return user.education && user.education.length > 0 ? (
          <section className="py-20 bg-white relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-black mb-4">
                  Education
                </h2>
                <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Academic foundation and continuous learning
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-black rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderRadius: '16px' }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center"
                        >
                          <GraduationCap className="w-8 h-8 text-black" />
                        </motion.div>
                        {edu.gpa && (
                          <div className="text-right">
                            <div className="text-3xl font-black text-white">{edu.gpa}</div>
                            <div className="text-sm text-gray-400">GPA</div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3">
                        {edu.degree}
                      </h3>
                      
                      <div className="flex items-center text-gray-300 mb-4">
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{edu.institution}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      
                      {edu.description && (
                        <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4">
                  Certifications
                </h2>
                <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Professional credentials and achievements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderRadius: '16px' }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                            'bg-black group-hover:bg-white'
                          }`}
                        >
                          <Trophy className={`w-6 h-6 transition-colors duration-500 ${
                            'text-white group-hover:text-black'
                          }`} />
                        </motion.div>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      
                      <h3 className={`text-lg font-bold mb-2 transition-colors duration-500 ${
                        'text-black group-hover:text-white'
                      }`}>
                        {cert.name}
                      </h3>
                      
                      <p className={`font-medium mb-3 transition-colors duration-500 ${
                        'text-gray-600 group-hover:text-gray-300'
                      }`}>
                        {cert.issuer}
                      </p>
                      
                      <div className={`flex items-center text-sm mb-3 transition-colors duration-500 ${
                        'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{cert.date}</span>
                      </div>
                      
                      {cert.credentialId && (
                        <div className={`text-xs font-mono px-2 py-1 rounded transition-colors duration-500 ${
                          'bg-gray-100 text-gray-500 group-hover:bg-white/20 group-hover:text-gray-300'
                        }`}>
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-white relative">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-black mb-4">
                  Client Testimonials
                </h2>
                <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  What clients and colleagues say about working with me
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black rounded-3xl p-12 text-white mb-8 relative overflow-hidden"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <Quote className="w-16 h-16 text-white/30 mb-8" />
                    
                    <p className="text-2xl leading-relaxed mb-8 italic">
                      "{user.testimonials[currentTestimonial].content}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={user.testimonials[currentTestimonial].avatar}
                          alt={user.testimonials[currentTestimonial].name}
                          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white/20"
                        />
                        <div>
                          <div className="font-bold text-white text-lg">
                            {user.testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-gray-400">
                            {user.testimonials[currentTestimonial].position}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-3">
                {user.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-black scale-125' : 'bg-gray-300 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4">
                  Featured Projects
                </h2>
                <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Interactive showcase of creative work and solutions
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <InteractiveProjectCard key={project._id} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'contact':
        return (
          <section className="py-20 bg-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h2 className="text-6xl font-black text-black mb-4">
                  Let's Create Together
                </h2>
                <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
                <p className="text-2xl text-gray-600 mb-12">
                  Ready to bring your ideas to life?
                </p>
              </motion.div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-8 bg-black rounded-3xl text-white hover:bg-gray-800 transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ borderRadius: '24px' }}
                  />
                  <div className="relative z-10">
                    <Mail className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Email Me</h3>
                    <p className="text-gray-400">{user.email}</p>
                  </div>
                </motion.a>

                {user.phone && (
                  <motion.a
                    href={`tel:${user.phone}`}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group p-8 bg-black rounded-3xl text-white hover:bg-gray-800 transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ borderRadius: '24px' }}
                    />
                    <div className="relative z-10">
                      <Phone className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold mb-2">Call Me</h3>
                      <p className="text-gray-400">{user.phone}</p>
                    </div>
                  </motion.a>
                )}

                {user.location && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="group p-8 bg-black rounded-3xl text-white hover:bg-gray-800 transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ borderRadius: '24px' }}
                    />
                    <div className="relative z-10">
                      <MapPin className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold mb-2">Visit Me</h3>
                      <p className="text-gray-400">{user.location}</p>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Social links and CTA */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                  >
                    <Github className="w-8 h-8" />
                  </motion.a>
                )}
                
                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                  >
                    <Linkedin className="w-8 h-8" />
                  </motion.a>
                )}
                
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-bold text-lg flex items-center space-x-3"
                >
                  <Send className="w-6 h-6" />
                  <span>Start Conversation</span>
                </motion.a>
              </div>

              {/* Availability indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12"
              >
                <div className="inline-flex items-center px-6 py-3 bg-black rounded-full">
                  <Coffee className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-white">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </section>
        );

      default:
        return null;
    }
  }, [visibleSections, user, projects, currentTestimonial]);

  return (
    <div className="min-h-screen bg-white relative">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />

      {/* Fixed navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-black text-black">
            {user.fullName.split(' ')[0]}
          </div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-black hover:text-gray-600 transition-colors text-sm font-bold uppercase tracking-wider"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
      
      {sectionOrder.map((sectionId) => (
        <div key={sectionId} id={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlackWhiteTemplate;