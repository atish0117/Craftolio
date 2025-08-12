import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Download, 
  Terminal, 
  Code, 
  Coffee, 
  Zap,
  Eye,
  Heart,
  Star,
  Award,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Trophy,
  Quote,
  Send,
  Phone,
  Linkedin,
  User,
  Briefcase,
  BookOpen
} from 'lucide-react';
import BioRender from '../../ui/BioRender';


const TypeWriter = ({ text, speed=100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayedText}</span>;
};


// Matrix rain effect component
const MatrixRain = memo(() => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-green-400 font-mono text-xs opacity-30"
          style={{ left: `${drop.x}%` }}
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: 10 / drop.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </div>
  );
});

// Code block component with syntax highlighting
const CodeBlock = memo(({ children, className = '' }) => (
  <div className={`bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm ${className}`}>
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      <span className="text-gray-400 text-xs ml-4">code.js</span>
    </div>
    {children}
  </div>
));

const DeveloperTemplate= ({ user, projects, sectionOrder, visibleSections }) => {
  const [ok, setOk] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);
  const [currentCommand, setCurrentCommand] = useState(0);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  console.log(user)
  console.log(projects)

  const commands = [
    'npm install awesome-developer',
    'git clone https://github.com/talent',
    'npm run build-amazing-things',
    'docker run --name innovation',
    'kubectl apply -f success.yaml'
  ];

  // Terminal typing effect
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentCommand((prev) => (prev + 1) % commands.length);
  }, 3000); // Har 3s pe change
  return () => clearInterval(interval);
}, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % user.testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center">
            {/* Matrix rain background */}
            <MatrixRain />
            
            {/* Interactive background elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute w-96 h-96 bg-green-400/5 rounded-full blur-3xl"
              
                transition={{ type: "spring", stiffness: 50 }}
              />
              <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Music control */}
            <div className="absolute top-8 right-8 z-20">
              <motion.button
                onClick={() => setOk(!ok)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-800/80 backdrop-blur-sm border border-green-400 rounded-full text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all"
              >
                {ok ? <Coffee className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              </motion.button>
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-green-400 font-mono text-sm">
                      <TypeWriter text="// Welcome to my interactive portfolio" delay={500} />
                      
                    </span>
                  </motion.div>
                  
                  <CodeBlock className="mb-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-white">
                        <span className="text-green-400">const</span> developer = {'{'}
                      </p>
                      <div className="ml-4 space-y-1">
                        <p className="text-white">
                          <span className="text-blue-400">name:</span> <span className="text-yellow-300">"{user.fullName}"</span>,
                        </p>
                        {user.title && (
                          <p className="text-white">
                            <span className="text-blue-400">role:</span> <span className="text-yellow-300">"{user.title}"</span>,
                          </p>
                        )}
                        <p className="text-white">
                          <span className="text-blue-400">passion:</span> <span className="text-yellow-300">"Building amazing things"</span>,
                        </p>
                        <p className="text-white">
                          <span className="text-blue-400">status:</span> <span className="text-green-300">"Available for hire"</span>
                        </p>
                      </div>
                      <p className="text-white">{'}'}</p>
                    </motion.div>
                  </CodeBlock>
                  
                  {user.bio && (
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <span className="text-green-400 font-mono text-sm">/* About me */</span>
                      <p className="text-gray-300 mt-2 leading-relaxed"> <BioRender bio={user.bio}/> </p>
                    </motion.div>
                  )}

                
                  {/* Terminal simulation */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2 }}
  className="bg-black/90 border border-green-400 rounded-lg p-4 mb-6 shadow-lg shadow-green-500/20"
>
  <div className="flex items-center space-x-2 mb-2">
    <Terminal className="w-4 h-4 text-green-400" />
    <span className="text-green-400 font-mono text-sm">terminal</span>
  </div>
  <div className="font-mono text-sm">
    <span className="text-green-400">$ </span>
    <TypeWriter 
      text={commands[currentCommand]} 
        key={currentCommand}
      speed={100}
    />
    <span className="animate-pulse text-green-400">█</span>
  </div>
</motion.div>

                  
                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                  >
                    {user.socialLinks?.github && (
                      <motion.a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gray-800 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all font-mono flex items-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>git clone portfolio</span>
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-mono flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>./resume.pdf</span>
                    </motion.button>
                    <motion.a
                      href={`mailto:${user.email}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-mono flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>send --message</span>
                    </motion.a>
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
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-80 h-80 rounded-lg object-cover border-2 border-green-400 shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    ) : (
                      <motion.div 
                        className="w-80 h-80 rounded-lg bg-gray-800 border-2 border-green-400 flex items-center justify-center text-green-400 text-6xl font-mono shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {user.fullName.charAt(0)}
                      </motion.div>
                    )}
                    <motion.div 
                      className="absolute -top-4 -right-4 bg-gray-800 border border-green-400 rounded-lg p-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-green-400 font-mono text-sm flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Online
                      </span>
                    </motion.div>
                    
                    {/* Floating code snippets */}
                    <motion.div
                      className="absolute -left-8 top-1/4 bg-gray-800 border border-blue-400 rounded p-2 font-mono text-xs text-blue-400"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {'<Code />'}
                    </motion.div>
                    <motion.div
                      className="absolute -right-8 bottom-1/4 bg-gray-800 border border-yellow-400 rounded p-2 font-mono text-xs text-yellow-400"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      {'{innovation}'}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-blue-900/10"></div>
            <div className="max-w-6xl mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// My technical arsenal</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter text="skills.map(skill => expertise)" delay={200} />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
                    }}
                    onHoverStart={() => setActiveSkill(skill)}
                    onHoverEnd={() => setActiveSkill(null)}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-3 h-3 bg-green-400 rounded-full"
                            animate={activeSkill === skill ? { scale: [1, 1.5, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          />
                          <span className="text-white font-mono font-bold">{skill}</span>
                        </div>
                        <Code className="w-5 h-5 text-green-400 group-hover:animate-spin" />
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 font-mono">
                        {Math.floor(Math.random() * 5) + 2} years experience
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <CodeBlock className="max-w-md mx-auto">
                  <p className="text-green-400 font-mono text-sm">
                    <TypeWriter text="console.log('Always learning new technologies!');" delay={1000} />
                  </p>
                </CodeBlock>
              </motion.div>
            </div>
          </section>
        ) : null;

      case 'experience':
        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <section className="py-20 bg-gray-900 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// Work Journey</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter text="experience.map(exp => growth)" delay={200} />
                </h2>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-400"></div>

                <div className="space-y-8">
                  {user.experienceDetails.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <motion.div 
                        className="absolute left-6 top-6 w-4 h-4 bg-green-400 rounded-full border-4 border-gray-900 shadow-lg"
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />

                      <div className="bg-gray-800 border border-gray-700 max-w-3xl rounded-lg p-6 hover:border-green-400 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors flex items-center">
                              <Briefcase className="w-5 h-5 mr-2" />
                              {exp.jobTitle}
                            </h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <Building className="w-4 h-4 mr-2" />
                              <span className="font-mono">{exp.companyName}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-green-400 font-mono text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {exp.duration}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-4">{exp.responsibilities}</p>
                        
                        <div className="flex flex-wrap gap-2">

                             {exp.skills.map((s, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-mono border border-green-400/30"
                            >
                              {s}
                            </motion.span>
                               ))}
                          {['Leadership', 'Innovation', 'Growth', 'Team Building'].map((achievement, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-mono border border-green-400/30"
                            >
                              {achievement}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null;

      case 'education':
        return user.education && user.education.length > 0 ? (
          <section className="py-20 bg-gray-800 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// Academic Credentials</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter text="education.map(degree => knowledge)" delay={200} />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)"
                    }}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center"
                      >
                        <GraduationCap className="w-6 h-6 text-white" />
                      </motion.div>
                      {edu.gpa && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{edu.gpa}</div>
                          <div className="text-sm text-gray-400">GPA</div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-2">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span className="font-mono">{edu.institution}</span>
                    </div>
                    
                    <div className="flex items-center text-green-400 font-mono text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {edu.startYear} - {edu.endYear}
                    </div>
                    
                    {edu.description && (
                      <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <section className="py-20 bg-gray-900 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// Certifications</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter text="certificates.map(cert => verified)" delay={200} />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: 2,
                      y: -10,
                      boxShadow: "0 15px 30px rgba(251, 191, 36, 0.3)"
                    }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Sparkle animation */}
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </motion.div>
                    
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4"
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 font-mono text-sm">{cert.issuer}</p>
                          {cert.platform && (
      <p className="text-xs text-gray-500 mt-1 font-mono">
        Platform: {cert.platform}
      </p>
    )}
                      </div>
                    </div>

                    
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-mono">{cert.date}</span>
                    </div>
                    
                    {cert.credentialId && (
                      <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded mb-3 border">
                        ID: {cert.credentialId}
                      </div>
                    )}
                    {cert.certificateLink && (
  <a
    href={cert.certificateLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block text-xs text-blue-600 hover:underline mb-3"
  >
    View Certificate
  </a>
)}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-bold flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✓
                        </motion.div>
                        <span className="ml-1">Verified</span>
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-gray-800 relative">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// Client Feedback</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter text="testimonials.map(feedback => trust)" delay={200} />
                </h2>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-green-400 transition-all duration-300 mb-8 relative overflow-hidden"
                >
                  {/* Quote decoration */}
                  <Quote className="w-16 h-16 text-green-400/20 absolute top-4 left-4" />
                  
                  <div className="relative z-10">
                    <p className="text-xl text-gray-300 italic leading-relaxed mb-6 pl-12 break-words">
                      "{user.testimonials[currentTestimonial].message}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.img
                          src={user.testimonials[currentTestimonial].imageUrl}
                          alt={user.testimonials[currentTestimonial].name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-400"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div>
                          <div className="font-bold text-white text-lg">
                            {user.testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-gray-400 font-mono text-sm">
                            {user.testimonials[currentTestimonial].designation}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                {user.testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-green-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

     case 'projects':
  return projects && projects.length > 0 ? (
    <section className="py-20 bg-gray-900 relative">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-green-400 font-mono text-sm">// Featured repositories</span>
          <h2 className="text-4xl font-bold text-white font-mono mt-2">
            <TypeWriter text="projects.filter(p => p.featured)" delay={200} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative rounded-xl overflow-hidden border border-gray-700 hover:border-green-400 transition-all duration-300 group"
              style={{
                backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors"></div>

              {/* Content */}
              <div className="relative p-6 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center  justify-between space-x-3 mb-4">
                    <div>
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Github className="w-6 h-6 text-green-400" />
                      </motion.div>
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                      {project.title.toUpperCase()}
                    </h3>
                    </div>
                     <div className="flex items-center space-x-4 ">
                    <span className="text-green-400 font-mono text-sm">{project.status}</span>
                  </div>
                  </div>

                  {project.description && (
                    <p className="text-gray-300 mb-4 leading-relaxed break-words">
                      {project.description}
                    </p>
                  )}

                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gray-700/80 text-gray-300 rounded-full text-sm font-mono border border-gray-600 hover:border-green-400 transition-colors cursor-pointer backdrop-blur-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-6 text-sm text-gray-300 font-mono mt-4">
                  {project.githubLink && (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center space-x-2 hover:text-green-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source</span>
                    </motion.a>
                  )}
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </motion.a>
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
          <section className="py-20 bg-gray-800 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-green-400 font-mono text-sm">// Let's connect</span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2 mb-8">
                  <TypeWriter text="contact.init()" delay={200} />
                </h2>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-8 font-mono text-left max-w-2xl mx-auto hover:border-green-400 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">terminal</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">$ whoami</p>
                    <motion.p 
                      className="text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <TypeWriter text={user.fullName} delay={1000} />
                    </motion.p>
                    
                    <p className="text-gray-400 mt-4">$ cat contact.json</p>
                    <div className="text-white ml-4">
                      <p>{'{'}</p>
                      <motion.p 
                        className="ml-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <span className="text-blue-400">"email":</span> 
                        <span className="text-yellow-300"> "{user.email}"</span>,
                      </motion.p>
                      {user.socialLinks?.github && (
                        <motion.p 
                          className="ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          <span className="text-blue-400">"github":</span> 
                          <span className="text-yellow-300"> "{user.socialLinks.github}"</span>,
                        </motion.p>
                      )}
                      {user.socialLinks?.linkedin && (
                        <motion.p 
                          className="ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.5 }}
                        >
                          <span className="text-blue-400">"linkedin":</span> 
                          <span className="text-yellow-300"> "{user.socialLinks.linkedin}"</span>
                        </motion.p>
                      )}
                      <p>{'}'}</p>
                    </div>
                    
                    <p className="text-gray-400 mt-4">$ echo "Ready to collaborate!"</p>
                    <motion.p 
                      className="text-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                    >
                      <TypeWriter text="Ready to collaborate!" delay={3000} />
                    </motion.p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  {user.socialLinks?.github && (
                    <motion.a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gray-900 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all font-mono flex items-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>git remote add origin</span>
                    </motion.a>
                  )}
                  <motion.a
                    href={`mailto:${user.email}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-mono flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>send --message</span>
                  </motion.a>
                  {user.socialLinks?.linkedin && (
                    <motion.a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-mono flex items-center space-x-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>connect --professional</span>
                    </motion.a>
                  )}
                </motion.div>

                {/* Contact stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-green-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      24/7
                    </motion.div>
                    <div className="text-sm text-gray-400 font-mono">Available</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-blue-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      &lt;24h
                    </motion.div>
                    <div className="text-sm text-gray-400 font-mono">Response</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-purple-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      100%
                    </motion.div>
                    <div className="text-sm text-gray-400 font-mono">Committed</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </div>
  );
};

export default DeveloperTemplate;