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
  Building,
  Globe,
  Target,
  BookOpen,
  CheckCircle,
  Trophy,
  Quote,
  Send,
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Shield,
  Italic
} from 'lucide-react';

import BioRender from '../../ui/BioRender';


// Memoized skill card component
const SkillCard = memo(({ skill, index }) => {
  const proficiency = Math.floor(Math.random() * 20) + 80;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {skill}
        </h3>
        <span className="text-sm text-gray-500 font-medium">{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
});

// Memoized project card component
const ProjectCard = memo(({ project, index }) => {
  const [liked, setLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  }, [liked]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Project image placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={project.imageUrl} alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Like button */}
        <button
          onClick={handleLike}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-sm"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              liked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} 
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ">
          {project.title.toUpperCase()}
        </h3>
        
        {project.description && (
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}
        
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech, techIndex) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Live Demo
              </a>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ProfessionalTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
console.log(user)
console.log("user email",user.email)
  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const renderSection = useCallback((sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 min-h-screen flex items-center overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
               <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(30deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(150deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(30deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(150deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b)
                `,
                backgroundSize: '80px 140px',
                backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
              }} />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
                      <User className="w-4 h-4 mr-2" />
                      Available for opportunities
                    </span>
                  </motion.div>

                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="block"
                    >
                      {user.fullName}
                    </motion.span>
                  </h1>
                  
                  {user.title && (
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-2xl text-blue-200 mb-6 font-medium"
                    >
                      {user.title}
                    </motion.p>
                  )}
                  
                  {user.bio && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg"
                    >
                       <BioRender bio={user.bio}/> 
                    </motion.p>
                  )}

                  {/* Professional stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="grid grid-cols-3 gap-6 mb-8"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{projects?.length || 0}</div>
                      <div className="text-sm text-white/70">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.workExperience}</div>
                      <div className="text-sm text-white/70">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.skills?.length || 0}</div>
                      <div className="text-sm text-white/70">Skills</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  >
                    <button className="group flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium border border-white/20">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium">
                      <div className="flex items-center justify-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Get In Touch
                      </div>
                    </button>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    {user.profileImgUrl ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-80 h-80 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-4 border-white/20"
                      >
                        {user.fullName.charAt(0)}
                      </motion.div>
                    )}
                    
                    {/* Professional status indicator */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-2 -right-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-white"
                    >
                      Available
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
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Core Competencies
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Professional skills and technical expertise developed through years of experience
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <SkillCard key={skill} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'experience':
        return user.experienceDetails
                        && user.experienceDetails.length > 0 ? (
          <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Professional Experience
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Career progression and key achievements in various roles
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>

                <div className="space-y-12 max-w-2xl">
                  {user.experienceDetails.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-4 border-white shadow-lg"></div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {exp.jobTitle}
                            </h3>
                            <div className="flex items-center text-blue-600 mb-2">
                              <Building className="w-4 h-4 mr-2" />
                              <span className="font-semibold">{exp.companyName}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{exp.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {['Leadership', 'Strategy', 'Innovation'].map((achievement, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {s}
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
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Education
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Academic foundation and continuous learning journey
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
                    className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      {edu.gpa && (
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">{edu.gpa}</div>
                          <div className="text-sm text-gray-500">GPA</div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{edu.institution}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{edu.startYear} - {edu.endYear}</span>
                    </div>
                    
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Professional Certifications
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Industry-recognized credentials and achievements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-gray-600 font-medium mb-3">{cert.platform}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{cert.date}</span>
                    </div>
                    
                     {cert.certificateLink && (
                <a
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>View Certificate</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Client Testimonials
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  What colleagues and clients say about working with me
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8"
                >
                  <Quote className="w-12 h-12 text-blue-300 mb-6" />
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 italic break-words">
                    "{user.testimonials[currentTestimonial].message}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={user.testimonials[currentTestimonial].imageUrl}
                        alt={user.testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          {user.testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-600">
                          {user.testimonials[currentTestimonial].designation}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                {user.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Featured Projects
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A selection of recent work and professional achievements
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'contact':
        return (
          <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Let's Work Together
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                  Ready to discuss your next project or opportunity?
                </p>
              </motion.div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Mail className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-white/80">{user.email}</p>
                </motion.a>

                {user.phone && (
                  <motion.a
                    href={`tel:${user.phone}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Phone className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <p className="text-white/80">{user.phone}</p>
                  </motion.a>
                )}

                {user.location && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <MapPin className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-white/80">{user.location}</p>
                  </motion.div>
                )}
              </div>
              
              {/* Social links and CTA */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                )}
                
                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                )}
                
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Start Conversation</span>
                </motion.a>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  }, [visibleSections, user, projects, currentTestimonial]);

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />

      {/* Fixed navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-gray-700 text-balance text-2xl">
            {user.fullName.split(' ')[0].toUpperCase()} | {user.title}
          </div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
                }`}
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
    </div>
  );
};

export default ProfessionalTemplate;