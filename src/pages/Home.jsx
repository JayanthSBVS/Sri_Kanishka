import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Heart, Flower, Star, Quote, ChevronLeft, ChevronRight, Sparkles, Users, Briefcase, Sun, CheckCircle, Building, Globe, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats, testimonials } from '../data/mockData';
import { useUI } from '../context/UIContext';

const Home = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const { openServiceModal } = useUI();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const statIcons = [Users, Briefcase, Heart, Sun];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
                        alt="Kanishka Sri Associates - Holistic Growth"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="container-custom relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-300 font-bold text-sm tracking-wide mb-8"
                        >
                            <Sparkles size={16} />
                            <span>Holistic Growth Ecosystem</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight font-display drop-shadow-lg text-white">
                            Elevate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-amber-300">Career, Life</span> & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Inner Peace</span>
                        </h1>

                        <p className="text-xl text-gray-200 mb-10 max-w-xl leading-relaxed font-medium drop-shadow-md">
                            One platform integrating professional IT training, trusted matrimonial services, and spiritual guidance for a complete and fulfilled life.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/services" className="px-8 py-4 rounded-full font-bold text-gray-900 bg-white hover:bg-gold-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300 flex items-center justify-center gap-2">
                                Explore Services <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all flex items-center justify-center hover:scale-105 transform duration-300">
                                Get Started
                            </Link>
                        </div>
                    </motion.div>

                    <div className="hidden lg:block relative h-[600px] w-full">
                        {/* Floating Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="absolute top-8 right-4 z-20"
                        >
                            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-72 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Tech Mastery</h4>
                                        <div className="flex text-gold-400 text-xs">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">"Landed my dream job at a top MNC after the full-stack bootcamp!"</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 z-30"
                        >
                            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-72 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <Flower size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Inner Peace</h4>
                                        <div className="flex text-gold-400 text-xs">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">"Found clarity and serenity through the spiritual mindfulness sessions."</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="absolute bottom-10 left-0 z-20"
                        >
                            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-72 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Soulmate Found</h4>
                                        <p className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle size={10} /> Verified Match</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">"Thank you for helping us find each other. Truly blessed!"</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Upcoming Events Section */}
            <section className="py-24 relative overflow-hidden border-y border-gray-100/20">
                <div className="container-custom text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-10 block"
                    >
                        Upcoming Events
                    </motion.span>

                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Event 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">21-day Maitri Sambodh Dhyaan</h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                                A powerful meditation devised for the current time to Bond with your Divine. Cleanses the Body, Mind and Soul and awakens the third-eye chakra.
                                <br />
                                <span className="text-gray-500 text-base font-medium">(Online, no charges applicable)</span>
                            </p>
                            <Link
                                to="/services/maitri-sambodh-dhyaan"
                                className="text-gold-600 font-bold hover:text-gold-700 transition-colors uppercase tracking-[0.2em] text-sm"
                            >
                                Details & Participation
                            </Link>
                        </motion.div>

                        {/* Elegant Separator */}
                        <div className="flex justify-center items-center gap-4 text-gold-200">
                            <div className="w-16 h-px bg-current"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
                            <div className="w-16 h-px bg-current"></div>
                        </div>

                        {/* Event 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">Vedic Havan</h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                                Havan (sacred fire ritual) is a powerful Vedic process, conducted as a prayer offering to the Divine. Through Vedic Havan, one can offer a personal prayer relating to any facet of life – spiritual, material, relationship, well-being, and so on – to help one grow and move ahead in life.
                            </p>
                            <Link
                                to="/services/maitri-havan"
                                className="text-gold-600 font-bold hover:text-gold-700 transition-colors uppercase tracking-[0.2em] text-sm"
                            >
                                Book A Havan
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 -mt-10 relative z-30">
                <div className="container-custom">
                    <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-100">
                            {stats.map((stat, idx) => {
                                const Icon = statIcons[idx];
                                return (
                                    <div key={idx} className="text-center px-4 group">
                                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-gold-600 group-hover:scale-110 transition-transform shadow-sm">
                                            {Icon && <Icon size={24} />}
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-display">
                                            {stat.value}
                                        </h3>
                                        <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Programs */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="relative mb-20">
                        {/* Decorative background blur */}
                        <div className="absolute -left-10 -top-10 w-40 h-40 bg-gold-200/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-gold-500 pl-8 py-4">
                            <div className="max-w-2xl">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-3 block"
                                >
                                    Our Expertise
                                </motion.span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">Specialized Services</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Empowering your growth through professional IT training, trusted matrimonial matching, and holistic spiritual wellness. We bridge the gap between career, life, and inner peace.
                                </p>
                            </div>
                            <Link to="/services" className="group relative px-8 py-4 bg-white/50 backdrop-blur-sm border border-gold-200 rounded-2xl font-bold text-gold-700 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-3 shrink-0">
                                View all services
                                <div className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service Cards */}
                        <Link to="/services/it" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/10 transition-colors z-10"></div>
                                <img src="/images/it/cyber-security.png" alt="IT Services" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <Code size={14} /> Technology
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display group-hover:text-blue-600 transition-colors">IT Services & Placements</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Master Full Stack, Cloud, and AI with our intensive bootcamps designed for the modern industry.</p>
                                <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                                    Explore Courses <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/services/marriage" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-rose-600/20 group-hover:bg-rose-600/10 transition-colors z-10"></div>
                                <img src="/images/marriage/rings-bg.jpg" alt="Marriage Services" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-rose-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <Heart size={14} /> Matrimony
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display group-hover:text-rose-600 transition-colors">Global Matrimony</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Find your soulmate with our trusted and personalized matching service, blending tradition with modernity.</p>
                                <div className="flex items-center text-rose-600 font-bold group-hover:gap-2 transition-all">
                                    Find Matches <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/services/meditation" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-purple-600/20 group-hover:bg-purple-600/10 transition-colors z-10"></div>
                                <img src="/images/meditation/hero-meditation.png" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'} alt="Meditation Services" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-purple-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <Flower size={14} /> Wellness
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display group-hover:text-purple-600 transition-colors whitespace-nowrap">Inner Peace, Spiritual & Healings</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Reconnect with yourself through guided meditation, spiritual retreats, and mindfulness practices.</p>
                                <div className="flex items-center text-purple-600 font-bold group-hover:gap-2 transition-all">
                                    Start Journey <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/services/real-estate" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-emerald-600/20 group-hover:bg-emerald-600/10 transition-colors z-10"></div>
                                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Real Estate" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <Building size={14} /> Estates
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display group-hover:text-emerald-600 transition-colors">Real Estate & Construction</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Explore premium residential properties and professional construction services tailored for your future.</p>
                                <div className="flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
                                    View Properties <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/services/abroad-consultancy" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-sky-600/20 group-hover:bg-sky-600/10 transition-colors z-10"></div>
                                <img src="https://images.unsplash.com/photo-1523050853064-dbad323bce9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Abroad Consultancy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-sky-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <Globe size={14} /> Global
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display group-hover:text-sky-600 transition-colors">Abroad Consultancy</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Expert guidance for overseas education, work permits, and immigration to top global destinations.</p>
                                <div className="flex items-center text-sky-600 font-bold group-hover:gap-2 transition-all">
                                    Consult Expert <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/services/groceries" className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-orange-600/20 group-hover:bg-orange-600/10 transition-colors z-10"></div>
                                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Groceries" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-white/90 backdrop-blur-sm text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                                        <ShoppingCart size={14} /> Groceries
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display group-hover:text-orange-600 transition-colors">Premium Groceries</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">Farm-fresh organic staples and premium quality groceries delivered directly to your kitchen.</p>
                                <div className="flex items-center text-orange-600 font-bold group-hover:gap-2 transition-all">
                                    Shop Now <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Impact Section - Combined with How It Works visually */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-50/50 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-gold-600 font-bold uppercase tracking-widest text-xs mb-2 block">Our Approach</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display text-gray-900">Simple Steps To <br />Start Your Journey</h2>
                            <p className="text-gray-600 text-lg mb-10">Whether you are looking to upskill, find a partner, or seek peace, our onboarding is seamless and supportive.</p>

                            <div className="space-y-8">
                                {[
                                    { title: "Discover", desc: "Browse our diverse range of services to find what matches your current life goals.", icon: Sparkles, color: "gold" },
                                    { title: "Connect", desc: "Reach out to our experts for a personalized consultation and guidance.", icon: Users, color: "blue" },
                                    { title: "Transform", desc: "Begin your program and experience the positive change in your life.", icon: Star, color: "purple" }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className={`w-16 h-16 rounded-2xl bg-${step.color}-50 flex items-center justify-center text-${step.color}-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            <step.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gold-100 to-blue-50 rounded-[3rem] transform rotate-3 scale-105 opacity-50"></div>
                            <div className="bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden relative border border-gray-100 h-[600px] group">
                                <img
                                    src="/images/timeline-home.jpg"
                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'}
                                    alt="Collaboration"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-10">
                                    <Quote className="text-gold-400 mb-4" size={40} />
                                    <p className="text-white font-medium text-2xl font-display leading-snug">"The first step towards change is awareness. The second step is acceptance."</p>
                                    <p className="text-gold-400 mt-4 font-bold uppercase tracking-widest text-xs">- Nathaniel Branden</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative overflow-hidden">
                <div className="container-custom relative">
                    <div className="text-center mb-16">
                        <span className="text-gold-600 font-bold uppercase tracking-widest text-xs">Testimonials</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900 font-display">Success Stories</h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 shadow-xl relative min-h-[400px] flex flex-col items-center text-center justify-center border border-gray-100">
                            <div className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-gold-400 to-amber-500 text-white p-6 rounded-full shadow-lg shadow-gold-200">
                                <Quote size={32} />
                            </div>

                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-8 max-w-3xl"
                                >
                                    <div className="flex justify-center gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-gold-400 text-gold-400" />)}
                                    </div>
                                    <p className="text-xl md:text-3xl text-gray-800 leading-normal font-serif font-medium">
                                        "{testimonials[currentTestimonial].content}"
                                    </p>
                                    <div className="flex flex-col items-center pt-6">
                                        <div className="relative mb-4 group">
                                            <div className="absolute inset-0 bg-gold-200 rounded-full blur opacity-50 transform translate-y-2 group-hover:opacity-80 transition-opacity"></div>
                                            <img
                                                src={testimonials[currentTestimonial].avatar}
                                                alt={testimonials[currentTestimonial].name}
                                                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                            />
                                        </div>
                                        <h4 className="font-bold text-2xl text-gray-900 font-display">{testimonials[currentTestimonial].name}</h4>
                                        <p className="text-gold-600 font-medium uppercase tracking-wider text-xs mt-1">{testimonials[currentTestimonial].role}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <button onClick={prevTestimonial} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white hover:bg-gold-50 text-gray-400 hover:text-gold-600 shadow-md hover:shadow-lg transition-all hover:scale-110 group border border-gray-100">
                                <ChevronLeft size={24} className="transform group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button onClick={nextTestimonial} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white hover:bg-gold-50 text-gray-400 hover:text-gold-600 shadow-md hover:shadow-lg transition-all hover:scale-110 group border border-gray-100">
                                <ChevronRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {/* Same as before... */}


            {/* FAQ */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                { q: "What kind of IT courses do you offer?", a: "We offer full-stack, cloud, and data-focused bootcamps designed for practical job readiness." },
                                { q: "How does the matrimony service work?", a: "Our team curates matches based on preferences and conducts profiles screening and counseling." },
                                { q: "Do you offer trial sessions?", a: "Yes — many programs include demo sessions or an initial consultation to help you decide." }
                            ].map((faq, i) => (
                                <details key={i} className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden open:shadow-md transition-shadow">
                                    <summary className="font-bold cursor-pointer p-6 list-none flex justify-between items-center text-gray-800">
                                        {faq.q}
                                        <span className="transform group-open:rotate-180 transition-transform duration-300 text-gold-500">
                                            <ChevronDownIcon />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden text-center shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                        {/* Animated background shape */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/20 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                        <div className="relative z-10 max-w-3xl mx-auto text-white">
                            <h3 className="text-3xl md:text-6xl font-bold font-display mb-8 text-white leading-tight">Ready to transform your life?</h3>
                            <p className="text-gray-300 text-xl mb-12 leading-relaxed">Join thousands of others who have found success, love, and peace with Kanishka Sri Associates.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Link to="/contact" className="px-10 py-4 bg-white text-gray-900 font-bold rounded-full hover:shadow-lg hover:shadow-white/20 transform hover:-translate-y-1 transition-all text-lg">
                                    Get in Touch
                                </Link>
                                <Link to="/services" className="px-10 py-4 bg-transparent border-2 border-white/20 hover:border-white text-white font-bold rounded-full hover:bg-white/5 transition-all text-lg">
                                    Explore Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ChevronDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);

export default Home;
