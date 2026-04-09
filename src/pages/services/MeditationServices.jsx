import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Sun, Moon, Wind, Calendar, Sparkles, Heart, Star, Clock, Leaf, Home, Users, Phone } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { Link } from 'react-router-dom';

const MeditationServices = () => {
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
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen">
            {/* Zen Hero Section */}
            <section className="relative rounded-[2.5rem] margin-x-custom mx-4 md:mx-6 mb-16 overflow-hidden min-h-[600px] flex items-center shadow-2xl shadow-gold-100/50">
                <div className="absolute inset-0 z-0">
                    <img src="/images/meditation/hero-meditation.png" alt="Meditation" className="w-full h-full object-cover" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none mix-blend-multiply"></div>

                <div className="container-custom relative z-10 px-8 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl relative overflow-hidden group"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-30 pointer-events-none"></div>

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-gold-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm ring-1 ring-white/50"
                            >
                                <Sparkles size={14} className="text-gold-600" />
                                <span>Global Family • Friend • Guide</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-5xl md:text-7xl font-bold font-display text-gray-900 mb-8 leading-tight drop-shadow-sm"
                            >
                                Experience <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-amber-700">The Ocean of Love</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl text-gray-800 leading-relaxed mb-12 max-w-2xl font-medium"
                            >
                                "The cause of suffering is the lack of love. Love is the only power that heals." Embark on a journey of inner transformation to realize your True Self.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                <button
                                    onClick={() => openServiceModal('meditation', 'Book Spiritual Session')}
                                    className="px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 bg-gradient-to-r from-gold-500 to-amber-600 text-white shadow-gold-200"
                                >
                                    <span className="flex items-center gap-2"><Calendar size={18} /> Begin Transformation</span>
                                </button>
                                <button className="px-8 py-4 rounded-full font-sans font-bold text-gray-900 bg-white/40 hover:bg-white border border-white/50 hover:border-gold-200 transition-all flex items-center gap-2 hover:shadow-lg">
                                    Our Mission <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Maitreya Dadashreeji Section */}
            <section className="py-20 relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Image Side */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gold-50 rounded-[3rem] -z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img
                                src="/images/meditation/maitreya_dadashreeji.jpg.png"
                                alt="Maitreya Dadashreeji"
                                className="rounded-[2.5rem] shadow-2xl w-full object-cover h-[700px] transform group-hover:scale-[1.01] transition-transform duration-500"
                            />
                        </div>

                        {/* Text Side */}
                        <div>
                            <span className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-2 block">Maitreya Dadashreeji</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                                <span className="text-amber-600">A Transforming</span> <span className="text-gray-500 font-light">Presence</span>
                            </h2>

                            <div className="prose prose-lg text-gray-800">
                                <p className="mb-6">
                                    Maitreya Dadashreeji is a Global Humanitarian, Transformation Pioneer and Social Reformer. Uplifting human consciousness, removing boundaries, bonding humanity and uniting nations together, He has guided many individuals by awakening the Love within them. Through His endeavours for Global Transformation, He is working to establish “One World, One Family.”
                                </p>

                                <h3 className="text-xl font-bold text-black mb-4">A Transforming Presence</h3>
                                <p className="mb-6">
                                    A humble presence, a tender smile and clad in all white, Maitreya Dadashreeji appears very simple to the human eye. Yet His powerful presence connects you not only with Him, but with yourself in a manner unimaginable. It takes you on an awakening journey deep into your inner self, whilst bringing your mind to a complete standstill.
                                </p>
                                <p className="mb-8">
                                    His presence is one of unconditional love and peace. With Him, no tools or techniques are required, you simply have to be in His presence, and you will witness the change in your self.
                                </p>

                                <blockquote className="border-l-4 border-gold-400 pl-6 py-2 italic text-black bg-gold-50/50 rounded-r-xl my-8 font-medium">
                                    “Before me, many have delivered teachings and techniques for your salvation and liberation. I am not here to repeat them, but to deliver that experience in your heart so that it becomes your own personal Truth.”
                                </blockquote>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-50/80 to-amber-50/80 backdrop-blur-md text-gold-700 font-bold border border-gold-500 shadow-lg shadow-gold-100/50 cursor-default flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                                        <div className="p-1.5 bg-white rounded-full text-gold-600 shadow-sm">
                                            <Clock size={16} />
                                        </div>
                                        <span className="tracking-wide uppercase text-xs">Coming Soon</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mahavataar Babaji Section */}
            <section className="py-20 relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Text Side - Left on Desktop */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                                <span className="text-amber-600">A Timeless</span> <span className="text-gray-500 font-light">Creation</span>
                            </h2>

                            <div className="prose prose-lg text-gray-800">
                                <p className="mb-6">
                                    Mahavataar Babaji, a timeless creation, has been on this planet Earth for the past 5000 years. His physical body looks like that of a young boy of around 25 years. The only cloth that He wears, is an orange dhoti (a piece of cloth) wrapped around the waist coming to just above the knees. However, His mystical physical manifestation occurs in various attires not limited to the dhoti.
                                </p>
                                <p className="mb-6">
                                    He dwells high up in the Himalayan range away from any human habitat. There are 3-4 disciples with Him who learn and work for a higher cause. He is aware of all the events occurring in the world. The Divine energy has been exuding through each and every pore of His soft Divine body since thousands of years. He has never represented any cult, religion or specific spiritual technique but only 'The Truth'. He is peacefully resting in the state of dis-identification. He interacts with a few chosen ones to share and teach the Higher Knowledge at His will.
                                </p>
                                <p className="mb-6">
                                    Divine Master Agastya, who received the Supreme Knowledge directly from Lord Shiv, imparted the same to young Babaji. As per instructions of Lord Shiv, Master Agastya relocated from the Himalayas to the southern region of India. This is where he met this young boy. As a disciple, Babaji surrendered completely at His Master's feet and followed everything that was taught to Him with faith and discipline.
                                </p>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-50/80 to-amber-50/80 backdrop-blur-md text-gold-700 font-bold border border-gold-500 shadow-lg shadow-gold-100/50 cursor-default flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                                        <div className="p-1.5 bg-white rounded-full text-gold-600 shadow-sm">
                                            <Clock size={16} />
                                        </div>
                                        <span className="tracking-wide uppercase text-xs">Coming Soon</span>
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Image Side - Right on Desktop */}
                        <div className="relative group order-1 lg:order-2">
                            <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] -z-10 transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img
                                src="/images/meditation/Mahavataar Babaji.png"
                                alt="Mahavataar Babaji"
                                className="rounded-[2.5rem] shadow-2xl w-full object-cover h-[700px] transform group-hover:scale-[1.01] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Ayurvedic Wellness Section */}
            <section className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply pointer-events-none"></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-3 block">Natural Harmony</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-8 leading-tight">
                                <span className="text-gray-900">Holistic</span> <span className="text-green-600">Ayurvedic Healing</span>
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                Embark on a journey to wellness with our tailored Ayurvedic guidance. We believe that true healing comes from within and is supported by nature's timeless wisdom.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                        <Leaf size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">Tailored Medicines</h4>
                                        <p className="text-gray-600 leading-relaxed">Personalized Ayurvedic formulations prepared strictly based on your unique body constitution (Dosha) and specific health problems.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                        <Home size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">Kitchen Remedies</h4>
                                        <p className="text-gray-600 leading-relaxed">Majority of the time, potent cures can be prepared with simple home ingredients. We empower you with this ancient knowledge.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">Guidance from Sadhgurus</h4>
                                        <p className="text-gray-600 leading-relaxed">Receive invaluable inputs and holistic health strategies directly from our experienced team of Sadhgurus.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-md text-green-700 font-bold border border-green-500 shadow-lg shadow-green-100/50 cursor-default flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                                    <div className="p-1.5 bg-white rounded-full text-green-600 shadow-sm">
                                        <Clock size={16} />
                                    </div>
                                    <span className="tracking-wide uppercase text-xs">Coming Soon</span>
                                </button>
                            </div>
                        </div>

                        <div className="md:w-1/2 relative h-[600px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-gradient-to-br from-green-100 to-white p-2 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 15,
                                    ease: "linear",
                                }}
                                className="h-full flex flex-row gap-0"
                                style={{ width: "200%" }}
                            >
                                <img
                                    src="/images/meditation/Gemini_Generated_Image_3t34fb3t34fb3t34.png"
                                    alt="Ayurvedic Herbs 1"
                                    className="rounded-[2rem] w-1/2 object-cover h-[600px]"
                                />
                                <img
                                    src="/images/meditation/Gemini_Generated_Image_k2lxzhk2lxzhk2lx.png"
                                    alt="Ayurvedic Herbs 2"
                                    className="rounded-[2rem] w-1/2 object-cover h-[600px]"
                                />
                                {/* Duplicate for seamless loop */}
                                <img
                                    src="/images/meditation/Gemini_Generated_Image_3t34fb3t34fb3t34.png"
                                    alt="Ayurvedic Herbs 1"
                                    className="rounded-[2rem] w-1/2 object-cover h-[600px]"
                                />
                                <img
                                    src="/images/meditation/Gemini_Generated_Image_k2lxzhk2lxzhk2lx.png"
                                    alt="Ayurvedic Herbs 2"
                                    className="rounded-[2rem] w-1/2 object-cover h-[600px]"
                                />
                            </motion.div>

                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg z-10">
                                <p className="text-gray-800 font-serif italic text-center">"Let food be thy medicine and medicine be thy food."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Offerings Grid */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-gold-600 font-bold tracking-widest uppercase text-xs mb-3 block">Pathways to Awakening</span>
                        <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">Spiritual Offerings</h2>
                        <p className="text-gray-600 text-lg">Sacred spaces and sessions to deepen your connection with the Divine.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Sun, title: "Bodhi Hyatt", time: "Weekly Sessions", desc: "Awakening sessions to experience the flow of divine energy and clarity.", active: true },
                            { icon: Heart, title: "Maitri Sambodh", time: "Monthly Retreats", desc: "Deep immersion into the essence of Friendship and unconditional love.", active: false },
                            { icon: Sparkles, title: "Transformation", time: "Advanced Program", desc: "A guided journey to dissolve internal blocks and realize your true potential.", active: false }
                        ].map((cls, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className={`p-8 rounded-[2.5rem] transition-all duration-300 relative overflow-hidden group ${cls.active ? 'bg-gray-900 text-white shadow-2xl scale-105 z-10' : 'bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white border border-gray-100 hover:border-gold-200 hover:shadow-xl'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${cls.active ? 'bg-white/10 text-gold-400' : 'bg-gold-50 text-gold-600'}`}>
                                    <cls.icon size={26} />
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 font-display ${cls.active ? 'text-white' : 'text-gray-900'}`}>{cls.title}</h3>
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 ${cls.active ? 'bg-white/10 text-white/80' : 'bg-gray-100 text-gray-500'}`}>
                                    {cls.time}
                                </span>
                                <p className={`leading-relaxed ${cls.active ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {cls.desc}
                                </p>

                                <button className={`mt-8 w-full py-3 rounded-xl font-bold text-sm transition-colors ${cls.active ? 'bg-gold-500 text-white hover:bg-gold-400' : 'bg-gray-100 text-gray-900 hover:bg-gold-50 hover:text-gold-600'}`}>
                                    Join Session
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-24 relative overflow-hidden border-t border-gold-100/50">
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
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">Maitri Havan</h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                                Havan (sacred fire ritual) is a powerful Vedic process, conducted as a prayer offering to the Divine. Through Maitri Havan, one can offer a personal prayer relating to any facet of life – spiritual, material, relationship, well-being, and so on – to help one grow and move ahead in life.
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

            {/* Core Values - Dark/Gold Elegant Section */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden relative rounded-[3rem] mx-4 md:mx-6 mb-16 shadow-2xl shadow-gray-900/40">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-3 block">Our Essence</span>
                            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight text-white">Love. Transform. <br />Serve.</h2>
                        </div>
                        <button className="px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors text-sm font-semibold text-white">
                            Explore Teachings
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Maitri", desc: "Establishing a bond of friendship with your Inner Divine.", icon: Heart },
                            { title: "Sambodh", desc: "The awakening of true knowledge and awareness.", icon: Sun },
                            { title: "Seva", desc: "Selfless service as an expression of love.", icon: Star },
                            { title: "Shanti", desc: "Eternal peace beyond the fluctuations of the mind.", icon: Moon }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-3xl hover:bg-gray-800 transition-colors hover:-translate-y-1 duration-300 group">
                                <item.icon className="text-gold-400 mb-4 group-hover:text-gold-300 transition-colors" size={32} />
                                <h4 className="text-xl font-bold mb-2 font-display text-white">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Body Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 rounded-[2rem] bg-gold-500/10 border border-gold-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white font-display">Need Spiritual Guidance?</h3>
                                <p className="text-gold-100/60">Our mentors are available to help you on your journey.</p>
                            </div>
                        </div>
                        <a href="tel:+918121121369" className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gold-500 hover:text-white transition-all shadow-lg text-lg">
                            Call +91 81211 21369
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Meditation Stats & Partners - Footer Style */}
            <section className="py-20 bg-[#1F1209] text-white rounded-t-[3rem] mt-auto">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center divide-x divide-white/10">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">5000+</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Sessions Guided</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">15+</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Expert Gurus</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">98%</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">4.9/5</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">User Rating</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gold-100/40 text-sm uppercase tracking-widest mb-8 font-bold">Recognized By</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Yoga Alliance', 'Headspace', 'Calm', 'Mindful', 'Chopra Center', 'Art of Living'].map((company, i) => (
                                <span key={i} className="text-xl md:text-2xl font-bold font-display text-white">{company}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default MeditationServices;

