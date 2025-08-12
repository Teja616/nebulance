
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight, Zap, Cog, TrendingUp, Users, Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Home as HomeIcon } from 'lucide-react';

const NebulanceHomepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroText, setHeroText] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const heroString = 'Nebulance – AI for the Future';
  
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const customerRef = useRef(null);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const refs = [servicesRef, aboutRef, customerRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typewriter effect for hero text (one letter at a time)
  useEffect(() => {
    if (currentLetterIndex < heroString.length) {
      const timer = setTimeout(() => {
        setHeroText(prev => prev + heroString[currentLetterIndex]);
        setCurrentLetterIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentLetterIndex, heroString]);

  const services = [
    {
      title: 'AI Website Generation',
      description: 'Transform your vision into stunning websites with our intelligent design algorithms.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: 'AI Process Pipelining',
      description: 'Streamline complex workflows with automated intelligence and seamless integration.',
      icon: <Cog className="w-8 h-8" />
    },
    {
      title: 'Business Automation',
      description: 'Eliminate repetitive tasks and optimize operations with cutting-edge automation.',
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: 'AI Lead Generation',
      description: 'Identify and convert high-quality prospects with precision-targeted AI systems.',
      icon: <Users className="w-8 h-8" />
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechVision',
      content: 'Nebulance transformed our entire digital presence. Their AI solutions increased our conversion rates by 300%.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder, InnovateCorp',
      content: 'The automation pipeline they built saved us 40 hours per week. Absolutely revolutionary technology.',
      rating: 5
    },
    {
      name: 'Elena Petrov',
      role: 'Director, FutureScale',
      content: 'Their lead generation AI identified prospects we never knew existed. ROI was immediate and substantial.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden font-sans">
      {/* Subtle background animation */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse"></div>
      </div>

      {/* Left Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-20 bg-black/50 backdrop-blur-sm border-r border-yellow-600/20 z-50 transition-all duration-1000 ${
        isLoaded ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ scrollBehavior: 'smooth' }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* Logo Image */}
          <div className="mb-8 mt-4">
            <Image
              src="/logo.png"
              alt="Nebulance Logo"
              width={48}
              height={48}
              className="rounded-xl border border-yellow-600/40 shadow-lg bg-black/10 object-contain"
              style={{ display: 'block', margin: 'auto' }}
              priority
            />
          </div>
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
                <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-yellow-600 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
          <div className={`flex-1 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-100 via-yellow-600 to-gray-100 bg-clip-text text-transparent">
                {heroText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Revolutionizing business through intelligent automation and cutting-edge AI solutions. 
              Transform your operations with the power of artificial intelligence.
            </p>
            <div className="flex space-x-6">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 hover:scale-105">
                Get Started
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-yellow-600/50 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className={`flex-1 flex justify-end transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="w-96 h-96 bg-gradient-to-br from-yellow-600/20 to-teal-500/20 rounded-2xl border border-yellow-600/30 flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <Image
                src="/nebulance.png"
                alt="Nebulance Hero"
                width={320}
                height={320}
                className="object-cover rounded-2xl shadow-2xl border border-yellow-600/40 bg-black/10"
                style={{ display: 'block', margin: 'auto' }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Cutting-edge AI solutions tailored to elevate your business to unprecedented heights
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-600/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-100 group-hover:text-yellow-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                  About Nebulance
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                  We are pioneers in artificial intelligence, dedicated to creating solutions that don&apos;t just meet today&apos;s challenges, 
                  but anticipate tomorrow&apos;s opportunities. Our team of world-class engineers and data scientists work tirelessly to 
                  push the boundaries of what&apos;s possible with AI technology.
              </p>
            </div>

            {/* About Banner Image Placeholder */}
            <div className="w-full h-64 bg-gradient-to-r from-yellow-600/10 to-teal-500/10 rounded-2xl border border-yellow-600/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-yellow-600/70 text-xl font-medium">Wide Banner Image Placeholder</span>
            </div>
          </div>
        </section>

        {/* Customer Experience Section */}
        <section id="experience" ref={customerRef} className="py-20 px-16 opacity-0 translate-y-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-gray-100 to-yellow-600 bg-clip-text text-transparent">
                Customer Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              Discover how businesses worldwide are transforming with our AI solutions
            </p>

            <div className="flex overflow-x-auto space-x-8 pb-6 scrollbar-thin scrollbar-thumb-yellow-600/20">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="group min-w-96 p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-600/10"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-600 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                  </p>
                  <div className="border-t border-yellow-600/20 pt-4">
                    <h4 className="text-teal-500 font-semibold group-hover:text-teal-400 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-16 px-16 border-t border-yellow-600/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-4">Nebulance</h3>
                <p className="text-gray-400 leading-relaxed">
                  Pioneering the future of artificial intelligence with innovative solutions 
                  that transform businesses worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-400">hello@nebulance.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-400">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-400">San Francisco, CA</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="p-3 bg-yellow-600/10 rounded-lg text-yellow-600 hover:bg-yellow-600/20 hover:scale-110 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-yellow-600/20 pt-8 text-center">
              <p className="text-gray-500">
                © 2024 Nebulance. All rights reserved. Crafted with AI innovation.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
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
      `}</style>
    </div>
  );
};

export default NebulanceHomepage;