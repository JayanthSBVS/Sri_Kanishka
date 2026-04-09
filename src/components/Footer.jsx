import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <footer className="bg-[#1F1209] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/hexellence.png")' }}></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
                >
                    {/* Brand */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Link to="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
                            <img src="/logo.png" alt="Kanishka Sri Associates" className="h-16 w-auto object-contain brightness-0 invert drop-shadow-lg" />
                        </Link>
                        <p className="text-gold-100/70 leading-relaxed text-sm font-light tracking-wide">
                            Empowering lives through career growth, relationship harmony, and inner peace. Your holistic partner for success and well-being.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gold-100/60 flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-400 hover:to-gold-600 hover:text-white hover:border-transparent transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/20 group">
                                    <Icon size={18} className="transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-bold mb-8 text-white font-display tracking-tight relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            {[{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Services', path: '/services' }, { name: 'Contact', path: '/contact' }].map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="text-gold-100/60 hover:text-gold-300 transition-all flex items-center group">
                                        <span className="w-0 h-0.5 bg-gold-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-bold mb-8 text-white font-display tracking-tight relative inline-block">
                            Our Services
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            {[{ name: 'IT Training', path: '/services/it' }, { name: 'Matrimony', path: '/services/marriage' }, { name: 'Meditation', path: '/services/meditation' }, { name: 'All Services', path: '/services' }].map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="text-gold-100/60 hover:text-gold-300 transition-all flex items-center group">
                                        <span className="w-0 h-0.5 bg-gold-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-bold mb-8 text-white font-display tracking-tight relative inline-block">
                            Stay Updated
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold-500 rounded-full"></span>
                        </h4>
                        <p className="text-gold-100/60 text-sm mb-6 font-light">Subscribe to our newsletter to receive daily updates and insights.</p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full bg-[#180e07] border border-white/5 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:ring-0 placeholder-white/20 text-sm transition-colors"
                                />
                                <button type="submit" className="bg-gradient-to-r from-gold-500 to-amber-600 text-white px-4 rounded-r-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all flex items-center justify-center">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gold-100/30 font-light"
                >
                    <p>&copy; {new Date().getFullYear()} Kanishka Sri Associates. All rights reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-gold-400 transition-colors relative group">
                            Privacy Policy
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a href="#" className="hover:text-gold-400 transition-colors relative group">
                            Terms of Service
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
