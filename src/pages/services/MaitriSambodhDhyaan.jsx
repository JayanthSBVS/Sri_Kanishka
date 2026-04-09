import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Sparkles, Heart, Zap, ShieldCheck, Sun, CheckCircle,
    MessageCircle, ArrowRight, Play, Globe, Calendar, Clock, MapPin,
    RefreshCw, Coins, Phone
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { Link } from 'react-router-dom';

const MaitriSambodhDhyaan = () => {
    const { openServiceModal } = useUI();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/meditation/hero-meditation.png"
                        alt="Meditation Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl text-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 text-white drop-shadow-lg leading-tight">
                            21-day Maitri <br />
                            <span className="text-[#E67E22]">Sambodh Dhyaan</span>
                        </h1>
                        <nav className="flex items-center gap-2 text-gold-300 font-medium tracking-wide mb-8">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>|</span>
                            <span>Maitri Sambodh Dhyaan</span>
                        </nav>
                        <p className="text-xl text-gray-200 leading-relaxed mb-10 max-w-xl">
                            A powerful meditation devised for the current time to Bond with your Divine. Cleanses the Body, Mind and Soul.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => openServiceModal('meditation', 'Participate in 21-day Dhyaan')}
                                className="px-8 py-4 bg-[#E67E22] text-white font-bold rounded-full hover:bg-[#D35400] transition-all shadow-xl shadow-orange-500/20"
                            >
                                Participate Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Essence Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitribodh Parivaar</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 tracking-tight">The Path to Awakening</h2>
                </div>

                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group lg:pr-12"
                        >
                            <div className="absolute -inset-4 bg-gold-50 rounded-3xl -z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img
                                src="/images/meditation/group-class.jpg"
                                alt="Meditation Practice"
                                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-baseline gap-2 mb-6">
                                <h3 className="text-3xl font-bold font-display text-[#E67E22]">Cleansing</h3>
                                <span className="text-3xl font-light text-gray-500 font-display italic">Body & Soul</span>
                            </div>
                            <div className="prose prose-lg text-gray-600 leading-relaxed font-sans font-normal space-y-6">
                                <p>
                                    The 21-day Maitri Sambodh Dhyaan is not just a meditation; it's a journey of inner purification. Over the course of three weeks, you are guided through stages that systematically address the layers of the human experience.
                                </p>
                                <p>
                                    By focusing on specific energy centers and using sacred sounds and intentions, the practice helps to release deep-seated emotional blockages, quiet the mental chatter, and awaken the third-eye chakra. This leads to a state of heightened awareness and a profound sense of peace.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-gold-500 mt-1 shrink-0" size={20} />
                                        <p className="text-sm font-medium text-gray-700">Awakens Intuition</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-gold-500 mt-1 shrink-0" size={20} />
                                        <p className="text-sm font-medium text-gray-700">Reduces Stress</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-gold-500 mt-1 shrink-0" size={20} />
                                        <p className="text-sm font-medium text-gray-700">Emotional Balance</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-gold-500 mt-1 shrink-0" size={20} />
                                        <p className="text-sm font-medium text-gray-700">Spiritual Growth</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why 21 Days? Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">The Science of Change</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">Why</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">21 Days?</span>
                    </div>
                </div>

                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Week 1: Release",
                                desc: "The first seven days are dedicated to physical and emotional detoxification. Releasing the old patterns to make space for the new.",
                                icon: RefreshCw
                            },
                            {
                                title: "Week 2: Align",
                                desc: "The middle phase focuses on balancing the energy centers (Chakras). Aligning your internal state with the Divine flow.",
                                icon: Zap
                            },
                            {
                                title: "Week 3: Awaken",
                                desc: "The final week is centered around the awakening of the third eye and deepening your bond with the Divine within.",
                                icon: Sparkles
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon className="text-[#E67E22]" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Details Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 md:p-16 text-white border-b lg:border-b-0 lg:border-r border-white/10">
                            <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-6 block">Join the Event</span>
                            <h2 className="text-4xl font-bold font-display mb-10">Participation Details</h2>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Globe className="text-gold-400" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Platform</div>
                                        <div className="text-lg font-medium">Online (Zoom/YouTube)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Calendar className="text-gold-400" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</div>
                                        <div className="text-lg font-medium">21 Consecutive Days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Clock className="text-gold-400" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Timings</div>
                                        <div className="text-lg font-medium">Early Morning Hours</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Coins className="text-gold-400" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Charges</div>
                                        <div className="text-lg font-medium">No charges applicable</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-12 md:p-16 bg-white/5 flex flex-col justify-center items-center text-center">
                            <div className="w-24 h-24 bg-gold-400/20 rounded-full flex items-center justify-center mb-8">
                                <Play className="text-gold-400 fill-current" size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-white font-display mb-6">Ready to Transform?</h3>
                            <p className="text-gray-300 leading-relaxed max-w-sm mb-10">
                                Registration for the upcoming batch is now open. Secure your spot in this life-changing process.
                            </p>
                            <button
                                onClick={() => openServiceModal('meditation', 'Participate in 21-day Dhyaan')}
                                className="w-full py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gold-500 hover:text-white transition-all shadow-xl"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>

                    {/* Contact Strip */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto mt-16 p-8 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#E67E22] rounded-full flex items-center justify-center text-white">
                                <Phone size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-gray-900 font-display">Need Help with Registration?</h3>
                                <p className="text-gray-600">Our spiritual guides can assist you with your queries.</p>
                            </div>
                        </div>
                        <a href="tel:+918121121369" className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gold-600 transition-all shadow-lg text-lg">
                            +91 81211 21369
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Brief/CTA */}
            <section className="py-24 bg-[#1F1209] relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/hexellence.png")' }}></div>
                <div className="container-custom relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-8">Have Questions?</h2>
                    <p className="text-gold-100/60 max-w-2xl mx-auto mb-12 text-lg">
                        If you're unsure about the process or need more information, our spiritual guides are here to help you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="px-12 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-lg flex items-center justify-center gap-2">
                            Contact Support <MessageCircle size={20} />
                        </Link>
                        <Link to="/services/meditation" className="px-12 py-4 text-white/60 font-medium hover:text-white transition-all text-lg flex items-center justify-center gap-2">
                            Explore Other Services <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MaitriSambodhDhyaan;
