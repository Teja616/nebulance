"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Cog, TrendingUp, Users, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Home as HomeIcon, Sun, Moon, ArrowRight, CheckCircle, Play, Sparkles } from 'lucide-react';

const NebulanceHomepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [heroText, setHeroText] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [processProgress, setProcessProgress] = useState(0);
  
  const heroString = 'Nebulance – AI for the Future';
  
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const customerRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const processRef = useRef(null);

  // Theme classes
  const themeClasses = {
    bg: isDarkMode ? 'bg-black' : 'bg-white',
    text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textPrimary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-black/40' : 'bg-white/80',
    navBg: isDarkMode ? 'bg-black/50' : 'bg-white/80',
    border: isDarkMode ? 'border-yellow-600/20' : 'border-yellow-600/30',
    borderHover: isDarkMode ? 'hover:border-yellow-600/50' : 'hover:border-yellow-600/70',
  };

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Process section progress tracking
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate progress based on scroll position within the section
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + sectionHeight), 0), 1);
          setProcessProgress(progress);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced intersection observer for scroll animations with stagger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animation to child elements
            const children = entry.target.querySelectorAll('.scroll-animate');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-up');
              }, index * 100);
            });
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const refs = [servicesRef, aboutRef, customerRef, statsRef, ctaRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
    setMounted(true);
  }, []);

  // Typewriter effect for hero text (client only)
  useEffect(() => {
    if (!mounted) return;
    if (currentLetterIndex < heroString.length) {
      const timer = setTimeout(() => {
        setHeroText(prev => prev + heroString[currentLetterIndex]);
        setCurrentLetterIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentLetterIndex, heroString, mounted]);

  // Parallax effect for elements
  const getParallaxStyle = (speed = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  const services = [
    {
      title: 'AI Website Generation',
      description: 'Transform your vision into stunning websites with our intelligent design algorithms.',
      icon: <Zap className="w-8 h-8" />,
      features: ['Custom Design', 'SEO Optimized', 'Mobile Ready']
    },
    {
      title: 'AI Process Pipelining',
      description: 'Streamline complex workflows with automated intelligence and seamless integration.',
      icon: <Cog className="w-8 h-8" />,
      features: ['Workflow Automation', 'Real-time Analytics', 'Cloud Integration']
    },
    {
      title: 'Business Automation',
      description: 'Eliminate repetitive tasks and optimize operations with cutting-edge automation.',
      icon: <TrendingUp className="w-8 h-8" />,
      features: ['Task Automation', 'Performance Tracking', 'Cost Reduction']
    },
    {
      title: 'AI Lead Generation',
      description: 'Identify and convert high-quality prospects with precision-targeted AI systems.',
      icon: <Users className="w-8 h-8" />,
      features: ['Smart Targeting', 'Lead Scoring', 'CRM Integration']
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <CheckCircle className="w-6 h-6" /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { number: '24/7', label: 'Support Available', icon: <Phone className="w-6 h-6" /> },
    { number: '50+', label: 'AI Models Deployed', icon: <Zap className="w-6 h-6" /> }
  ];

  const processSteps = [
    { 
      step: '01', 
      title: 'Discovery', 
      desc: 'Understanding your needs and analyzing requirements',
      detail: 'Deep dive into your business objectives and technical requirements'
    },
    { 
      step: '02', 
      title: 'Strategy', 
      desc: 'Crafting the perfect AI solution architecture',
      detail: 'Designing scalable AI systems tailored to your specific use case'
    },
    { 
      step: '03', 
      title: 'Development', 
      desc: 'Building with precision using cutting-edge technology',
      detail: 'Implementing robust AI models with continuous testing and optimization'
    },
    { 
      step: '04', 
      title: 'Deployment', 
      desc: 'Launching your success with seamless integration',
      detail: 'Rolling out solutions with full monitoring and ongoing support'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechVision',
      content: 'Nebulance transformed our entire digital presence. Their AI solutions increased our conversion rates by 300%.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder, InnovateCorp',
      content: 'The automation pipeline they built saved us 40 hours per week. Absolutely revolutionary technology.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Elena Petrov',
      role: 'Director, FutureScale',
      content: 'Their lead generation AI identified prospects we never knew existed. ROI was immediate and substantial.',
      rating: 5,
      image: '👩‍💻'
    }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden font-sans transition-colors duration-500`}>
      {/* Custom cursor effect */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Animated background particles */}

      {/* Subtle background animation */}
      <div className="fixed inset-0 opacity-5">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-black via-gray-900 to-black' : 'from-gray-50 via-yellow-50 to-gray-50'}`}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      </div>

      {/* Left Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-20 ${themeClasses.navBg} backdrop-blur-sm border-r ${themeClasses.border} z-50 transition-all duration-1000 ${
        isLoaded ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-start h-full pt-6 space-y-8">
          {/* Logo */}
          <div className="mb-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-yellow-600/30 shadow-lg">
              <img 
                src="/logo.png" 
                alt="Nebulance Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-xl border border-yellow-600/30 shadow-lg hidden items-center justify-center text-black font-bold text-lg">
                N
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-all duration-300 hover:bg-yellow-600/10 hover:scale-110 ${themeClasses.border} border group`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-600 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-yellow-600 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          {[
            { label: 'Home', icon: <HomeIcon className="w-6 h-6 text-yellow-600 mb-1" /> },
            { label: 'Services', icon: <Cog className="w-6 h-6 text-yellow-600 mb-1" /> },
            { label: 'About', icon: <Users className="w-6 h-6 text-yellow-600 mb-1" /> },
            { label: 'Contact', icon: <Mail className="w-6 h-6 text-yellow-600 mb-1" /> }
          ].map((item, index) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className="group relative p-3 rounded-lg transition-all duration-300 hover:bg-yellow-600/10 hover:scale-110 flex flex-col items-center"
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById(item.label.toLowerCase());
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  section.classList.add('section-highlight');
                  setTimeout(() => {
                    section.classList.remove('section-highlight');
                  }, 1200);
                }
              }}
            >
              {item.icon}
              <span className={`absolute left-full ml-4 px-3 py-1 ${themeClasses.cardBg} text-yellow-600 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm border ${themeClasses.border}`}>
                {item.label}
              </span>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-yellow-600/20 transition-all duration-300"></div>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="ml-20">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-between px-16 relative">
          {/* Floating elements with parallax */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-600/10 to-teal-500/10 rounded-full blur-xl animate-pulse"
              style={getParallaxStyle(-0.3)}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-yellow-600/10 rounded-full blur-xl animate-pulse" 
              style={{ animationDelay: '1s', ...getParallaxStyle(0.2) }} 
            />
          </div>

          <div className={`flex-1 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/20 mb-6 animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-600 font-medium">AI-Powered Solutions</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-100 via-yellow-600 to-gray-100 bg-clip-text text-transparent">
                {mounted ? heroText : ''}
                {mounted && <span className="animate-pulse">|</span>}
              </span>
            </h1>
            
            <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-2xl leading-relaxed`}>
              Revolutionizing business through intelligent automation and cutting-edge AI solutions. 
              Transform your operations with the power of artificial intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>

              <button className={`px-8 py-4 border ${themeClasses.border} text-yellow-600 font-semibold rounded-lg hover:bg-yellow-600/10 ${themeClasses.borderHover} transition-all duration-300 hover:scale-105 group`}>
                <Play className="inline w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 opacity-70">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className={`text-sm ${themeClasses.textSecondary}`}>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-600 fill-current" />
                ))}
                <span className={`text-sm ${themeClasses.textSecondary} ml-2`}>4.9/5 Rating</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visualization with parallax */}
          <div 
            className={`flex-1 flex justify-end transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={getParallaxStyle(0.1)}
          >
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-yellow-600/20 to-teal-500/20 rounded-2xl border border-yellow-600/30 flex items-center justify-center backdrop-blur-sm overflow-hidden group hover:scale-105 transition-transform duration-500">
                <div className="text-8xl animate-pulse">🤖</div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                  <div className="absolute top-4 left-1/2 w-3 h-3 bg-yellow-600 rounded-full transform -translate-x-1/2" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-teal-500 rounded-full transform -translate-x-1/2" />
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 px-3 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black text-xs font-semibold rounded-lg animate-bounce">
                AI Powered
              </div>
              <div className="absolute -bottom-4 -right-4 px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xs font-semibold rounded-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                24/7 Support
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-16 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`scroll-animate text-center group hover:scale-110 transition-all duration-300 cursor-pointer p-6 rounded-xl ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.border} ${themeClasses.borderHover}`}
                >
                  <div className="text-yellow-600 mb-3 flex justify-center group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.number}</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="scroll-animate text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className={`scroll-animate text-xl ${themeClasses.textSecondary} text-center mb-16 max-w-3xl mx-auto`}>
              Cutting-edge AI solutions tailored to elevate your business to unprecedented heights
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`scroll-animate group p-8 ${themeClasses.cardBg} backdrop-blur-sm rounded-2xl border ${themeClasses.border} ${themeClasses.borderHover} transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-600/10 relative overflow-hidden`}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${themeClasses.textPrimary} group-hover:text-yellow-600 transition-colors duration-300`}>
                      {service.title}
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed mb-4`}>
                      {service.description}
                    </p>
                    
                    {/* Feature list */}
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 flex items-center text-yellow-600 group-hover:text-yellow-500 transition-colors duration-300">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section with Enhanced Process Timeline */}
        <section id="about" ref={aboutRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="scroll-animate text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                  About Nebulance
                </span>
              </h2>
              <p className={`scroll-animate text-xl ${themeClasses.textSecondary} max-w-4xl mx-auto leading-relaxed`}>
                We are pioneers in artificial intelligence, dedicated to creating solutions that don't just meet today's challenges, 
                but anticipate tomorrow's opportunities. Our team of world-class engineers and data scientists work tirelessly to 
                push the boundaries of what's possible with AI technology.
              </p>
            </div>

            {/* Vision and Mission */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className={`scroll-animate p-8 ${themeClasses.cardBg} backdrop-blur-sm rounded-2xl border ${themeClasses.border} group hover:${themeClasses.borderHover} transition-all duration-300`}>
                <div className="text-yellow-600 mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>Our Vision</h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  To democratize AI technology and make it accessible to businesses of all sizes, 
                  enabling them to compete and thrive in the digital age through intelligent automation.
                </p>
              </div>
              
              <div className={`scroll-animate p-8 ${themeClasses.cardBg} backdrop-blur-sm rounded-2xl border ${themeClasses.border} group hover:${themeClasses.borderHover} transition-all duration-300`}>
                <div className="text-yellow-600 mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>Our Mission</h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  To deliver innovative AI solutions that transform business operations, 
                  enhance productivity, and create sustainable competitive advantages for our clients worldwide.
                </p>
              </div>
            </div>

            {/* Enhanced Process Timeline */}
            <div ref={processRef} className="relative">
              <h3 className={`scroll-animate text-3xl font-bold text-center mb-16 ${themeClasses.textPrimary}`}>Our Process</h3>
              <div className="flex">
                {/* Left side - Process steps */}
                <div className="flex-1 space-y-16">
                  {processSteps.map((item, index) => (
                    <div 
                      key={index} 
                      className={`scroll-animate flex items-start group transition-all duration-500 ${
                        processProgress >= (index + 1) / processSteps.length 
                          ? 'opacity-100 transform translate-x-0' 
                          : 'opacity-60 transform translate-x-4'
                      }`}
                    >
                      <div className="flex-shrink-0 mr-8">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-black font-bold text-lg transition-all duration-500 ${
                          processProgress >= (index + 1) / processSteps.length
                            ? 'bg-gradient-to-br from-yellow-600 to-yellow-500 scale-110 shadow-lg shadow-yellow-600/25'
                            : 'bg-gray-600 scale-100'
                        }`}>
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                          processProgress >= (index + 1) / processSteps.length
                            ? 'text-yellow-600'
                            : themeClasses.textPrimary
                        }`}>
                          {item.title}
                        </h4>
                        <p className={`text-lg ${themeClasses.textSecondary} mb-2`}>
                          {item.desc}
                        </p>
                        <p className={`text-sm ${themeClasses.textSecondary} opacity-70`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right side - Animated timeline */}
                <div className="flex-shrink-0 w-24 flex justify-center relative ml-8">
                  {/* Main timeline line */}
                  <div className={`w-1 bg-gradient-to-b from-gray-600 to-gray-600 rounded-full relative`} style={{ height: '400px' }}>
                    {/* Animated progress line */}
                    <div 
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-600 to-yellow-500 rounded-full transition-all duration-700 ease-out"
                      style={{ height: `${Math.min(processProgress * 100, 100)}%` }}
                    />
                    
                    {/* Animated dot */}
                    <div 
                      className="absolute w-4 h-4 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full transform -translate-x-1/2 shadow-lg transition-all duration-700 ease-out"
                      style={{ 
                        top: `${Math.min(processProgress * 100, 95)}%`,
                        left: '50%',
                        boxShadow: processProgress > 0 ? '0 0 20px rgba(212, 175, 55, 0.6)' : 'none'
                      }}
                    >
                      {/* Pulsing ring effect */}
                      <div className="absolute inset-0 rounded-full bg-yellow-600/20 animate-ping" />
                    </div>
                    
                    {/* Static step indicators */}
                    {processSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                          processProgress >= (index + 1) / processSteps.length
                            ? 'bg-yellow-600 scale-110'
                            : 'bg-gray-500 scale-100'
                        }`}
                        style={{
                          top: `${(index / (processSteps.length - 1)) * 95}%`,
                          left: '50%'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Experience Section */}
        <section ref={customerRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="scroll-animate text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className={`scroll-animate text-xl ${themeClasses.textSecondary} text-center mb-16`}>
              Discover how businesses worldwide are transforming with our AI solutions
            </p>

            <div className="flex overflow-x-auto space-x-8 pb-6 scrollbar-thin scrollbar-thumb-yellow-600/20">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`scroll-animate group min-w-96 p-8 ${themeClasses.cardBg} backdrop-blur-sm rounded-2xl border ${themeClasses.border} ${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-600/10 relative overflow-hidden`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute top-4 right-4 text-4xl opacity-20">"</div>
                  
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">{testimonial.image}</div>
                    <div>
                      <h4 className={`font-semibold ${themeClasses.textPrimary}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-600 fill-current" />
                    ))}
                  </div>
                  
                  <p className={`${themeClasses.text} mb-6 leading-relaxed italic`}>
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`scroll-animate p-12 ${themeClasses.cardBg} backdrop-blur-sm rounded-3xl border ${themeClasses.border} relative overflow-hidden group hover:${themeClasses.borderHover} transition-all duration-500`}>
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-600/30 rounded-full animate-float"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i % 2 * 40)}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 text-yellow-600 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                    Ready to Transform Your Business?
                  </span>
                </h2>
                <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-2xl mx-auto`}>
                  Join hundreds of companies that have revolutionized their operations with our AI solutions. 
                  Start your journey to the future today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button className="group px-10 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Start Your AI Journey
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  </button>
                  
                  <button className={`px-10 py-4 border ${themeClasses.border} text-yellow-600 font-semibold rounded-lg hover:bg-yellow-600/10 ${themeClasses.borderHover} transition-all duration-300 hover:scale-105 group`}>
                    <Phone className="inline w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Schedule a Call
                  </button>
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No Setup Fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>30-Day Money Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`py-16 px-16 border-t ${themeClasses.border} relative`}>
          {/* Newsletter Section */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h3 className={`scroll-animate text-3xl font-bold mb-4 ${themeClasses.textPrimary}`}>Stay Updated</h3>
              <p className={`scroll-animate ${themeClasses.textSecondary} mb-8`}>
                Get the latest insights on AI trends and exclusive updates from Nebulance
              </p>
              
              <div className="scroll-animate max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-3 ${themeClasses.cardBg} border ${themeClasses.border} rounded-lg focus:ring-2 focus:ring-yellow-600/20 focus:border-yellow-600/50 transition-all duration-300 ${themeClasses.text} placeholder-gray-500`}
                />
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Company Info */}
              <div className="scroll-animate md:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 border border-yellow-600/30">
                    <img 
                      src="/logo.png" 
                      alt="Nebulance Logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-xl hidden items-center justify-center text-black font-bold text-lg">
                      N
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-600">Nebulance</h3>
                </div>
                <p className={`${themeClasses.textSecondary} leading-relaxed mb-6 max-w-md`}>
                  Pioneering the future of artificial intelligence with innovative solutions 
                  that transform businesses worldwide. Join us in shaping tomorrow's digital landscape.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Instagram, label: 'Instagram' }
                  ].map(({ icon: Icon, label }, index) => (
                    <a
                      key={label}
                      href="#"
                      className="p-3 bg-yellow-600/10 rounded-lg text-yellow-600 hover:bg-yellow-600/20 hover:scale-110 transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="scroll-animate">
                <h4 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-6`}>Quick Links</h4>
                <ul className="space-y-3">
                  {['Home', 'Services', 'About', 'Contact', 'Blog', 'Careers'].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className={`${themeClasses.textSecondary} hover:text-yellow-600 transition-colors duration-300 group flex items-center`}
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="scroll-animate">
                <h4 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-6`}>Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <Mail className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className={`${themeClasses.textSecondary} text-sm mb-1`}>Email</p>
                      <a href="mailto:hello@nebulance.ai" className={`${themeClasses.text} hover:text-yellow-600 transition-colors duration-300`}>
                        hello@nebulance.ai
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <Phone className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className={`${themeClasses.textSecondary} text-sm mb-1`}>Phone</p>
                      <a href="tel:+15551234567" className={`${themeClasses.text} hover:text-yellow-600 transition-colors duration-300`}>
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className={`${themeClasses.textSecondary} text-sm mb-1`}>Location</p>
                      <span className={themeClasses.text}>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className={`border-t ${themeClasses.border} pt-8 flex flex-col md:flex-row justify-between items-center`}>
              <p className={`scroll-animate ${themeClasses.textSecondary} text-sm mb-4 md:mb-0`}>
                © 2024 Nebulance. All rights reserved. Crafted with AI innovation.
              </p>
              
              <div className="scroll-animate flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className={`${themeClasses.textSecondary} hover:text-yellow-600 transition-colors duration-300`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 p-4 bg-gradient-to-br from-yellow-600 to-yellow-500 text-black rounded-full shadow-lg hover:shadow-xl hover:shadow-yellow-600/25 transition-all duration-300 hover:scale-110 z-40 group ${
              scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 rotate-[-90deg] group-hover:translate-y-[-2px] transition-transform duration-300" />
          </button>
        </footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .section-highlight {
          animation: highlightSection 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
        
        @keyframes highlightSection {
          0% {
            box-shadow: 0 0 0 0 #d4af37aa;
            background: inherit;
          }
          30% {
            box-shadow: 0 0 32px 8px #d4af37aa;
            background: linear-gradient(90deg, rgba(212,175,55,0.08) 0%, rgba(32,178,170,0.08) 100%);
          }
          100% {
            box-shadow: 0 0 0 0 #d4af37aa;
            background: inherit;
          }
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-yellow-600\/20::-webkit-scrollbar {
          height: 6px;
        }
        
        .scrollbar-thumb-yellow-600\/20::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-thumb-yellow-600\/20::-webkit-scrollbar-track {
          background: transparent;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        /* Custom scrollbar for light mode */
        ${!isDarkMode ? `
          .scrollbar-thumb-yellow-600\\/20::-webkit-scrollbar-thumb {
            background: rgba(212, 175, 55, 0.4);
          }
        ` : ''}
        
        /* Smooth transitions for theme switching */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        
        /* Enhanced hover effects */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }
          50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4); }
        }
        
        .glow-on-hover:hover {
          animation: glow 2s ease-in-out infinite;
        }
        
        /* Parallax effect */
        .parallax {
          transform: translateZ(0);
          will-change: transform;
        }

        /* Staggered animations */
        .scroll-animate:nth-child(1) { transition-delay: 0ms; }
        .scroll-animate:nth-child(2) { transition-delay: 100ms; }
        .scroll-animate:nth-child(3) { transition-delay: 200ms; }
        .scroll-animate:nth-child(4) { transition-delay: 300ms; }
        .scroll-animate:nth-child(5) { transition-delay: 400ms; }
        .scroll-animate:nth-child(6) { transition-delay: 500ms; }
      `}</style>
    </div>
  );
};

export default NebulanceHomepage;