import React from 'react';
import { Target, Eye, Globe, ChevronDown, Award, Briefcase, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const timeline = [
        { year: "2018", title: "Inception", desc: "Started as a small IT training center with a vision to bridge the skill gap in the industry." },
        { year: "2020", title: "Expansion", desc: "Added Matrimonial services to help alumni find trusted partners within the community." },
        { year: "2022", title: "Holistic Growth", desc: "Introduced Spiritual guidance and meditation retreats for total well-being." },
        { year: "2024", title: "Going Global", desc: "Digital transformation and global outreach to serve the Indian diaspora worldwide." }
    ];

    const team = [
        { name: "Kanishka Sri", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
        { name: "Aarav Patel", role: "Head of Technology", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
        { name: "Priya Singh", role: "Lead Relationship Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
        { name: "Dr. Ananya Roy", role: "Spiritual Guide", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-about.png"
                        alt="About Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/70 to-gold-900/40"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-100 shadow-sm text-gold-600 font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        Who We Are
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-8 text-white font-display"
                    >
                        Driven by Purpose, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-amber-600">United by Values.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        We are a unique organization dedicated to holistic human development. By bridging the gap between professional success, personal relationships, and spiritual well-being, we help you lead a complete life.
                    </motion.p>
                </div>
            </section>

            <div className="container-custom py-20">
                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gold-100/50 border border-gold-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                            <Eye size={180} className="text-gold-600" />
                        </div>
                        <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-600 mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                            <Eye size={32} />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 font-display relative z-10">Our Vision</h2>
                        <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                            To create a society where individuals are not only successful in their careers but also fulfilled in their personal lives and at peace with themselves. We envision a world balanced by technology, love, and spirituality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-blue-50 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                            <Target size={180} className="text-blue-600" />
                        </div>
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 font-display relative z-10">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                            To provide top-tier resources for skill development, reliable platforms for finding life partners, and accessible spiritual guidance. We strive to be the bridge that connects your aspirations with reality.
                        </p>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Our Culture</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display">Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Integrity", desc: "We uphold the highest feeling of honesty in all our services.", icon: Award, color: "gold" },
                            { title: "Excellence", desc: "We strive for perfection in training, matchmaking, and guidance.", icon: Sparkles, color: "blue" },
                            { title: "Compassion", desc: "We serve with a heart full of empathy and understanding.", icon: Heart, color: "rose" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/40 border border-gray-100/50 rounded-3xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <div className={`w-14 h-14 mx-auto rounded-full bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <span className="text-gold-600 font-bold uppercase tracking-widest text-xs mb-2 block">History</span>
                        <h2 className="text-3xl font-bold text-gray-900 font-display">Our Journey</h2>
                    </div>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold-100 before:via-gold-300 before:to-gold-100">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gold-100 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 text-gold-600 font-bold text-xs transform group-hover:scale-110">
                                    {item.year.slice(-2)}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/70 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 group-hover:border-gold-200 group-hover:shadow-md transition-all duration-300 relative">
                                    {/* Arrow for desktop */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 rotate-45 ${idx % 2 === 0 ? '-right-2.5 border-r-gold-200 border-t-gold-200' : '-left-2.5 border-l-gold-200 border-b-gold-200'} `}></div>

                                    <div className="flex items-center justify-between space-x-2 mb-2">
                                        <div className="font-bold text-xl text-gray-900 font-display">{item.title}</div>
                                        <time className="font-mono font-bold text-gold-600 text-sm bg-gold-50 px-2 py-1 rounded-md">{item.year}</time>
                                    </div>
                                    <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Leadership</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display">Meet the Minds</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, idx) => (
                            <div key={idx} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
