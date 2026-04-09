import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Database, CheckCircle, ArrowRight, Briefcase, Sparkles, Star, Phone } from 'lucide-react';
import { courses, jobOffers } from '../../data/mockData';
import { useUI } from '../../context/UIContext';

const ITServices = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const { openServiceModal } = useUI();

    return (
        <div className="pt-3 min-h-screen">
            {/* Hero */}
            {/* Hero */}
            <section className="relative rounded-[2.5rem] margin-x-custom mx-4 md:mx-6 mb-16 overflow-hidden min-h-[500px] flex items-center shadow-2xl shadow-blue-100/50">
                <div className="absolute inset-0">
                    <img src="/images/it/hero-team.jpg" alt="IT Academy Team" className="w-full h-full object-cover" />
                    {/* Clear Image - No Overlay */}
                </div>

                {/* Decorative Elements - Subtle */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none mix-blend-multiply"></div>

                <div className="container-custom relative z-10 px-8 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl relative overflow-hidden group"
                    >
                        {/* Mirror Reflection / Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-30 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                                <Sparkles size={14} className="text-blue-600" />
                                Tech Academy
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 font-display leading-tight drop-shadow-sm">
                                Launch Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">IT Career Today</span>
                            </h1>
                            <p className="text-xl text-gray-800 max-w-2xl mb-12 leading-relaxed font-sans font-medium">
                                Master the latest technologies with our industry-aligned curriculum. From full-stack development to cloud engineers, we build the future workforce.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'courses' ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-blue-200' : 'bg-white/50 text-gray-900 hover:bg-white border border-white/50'}`}
                                >
                                    Browse Courses
                                </button>
                                <button
                                    onClick={() => setActiveTab('jobs')}
                                    className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'jobs' ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-green-200' : 'bg-white/50 text-gray-900 hover:bg-white border border-white/50'}`}
                                >
                                    View Job Offers
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Features & Benefits */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Live Projects", desc: "Gain hands-on experience with real-world industry scenarios.", icon: Terminal },
                            { title: "Expert Mentors", desc: "Learn directly from architects working in top MNCs.", icon: CheckCircle },
                            { title: "Placement Support", desc: "Dedicated HR team for resume building and interview coaching.", icon: Briefcase },
                            { title: "Corporate Consultancy", desc: "We provide specialized staffing and corporate training solutions.", icon: Database }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-white/40 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-blue-600 flex items-center justify-center mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2 font-display">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Text */}
            <section className="py-20 bg-white/40 backdrop-blur-md rounded-[3rem] mx-4 md:mx-6 mb-20 shadow-xl shadow-gold-900/10 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
                <div className="absolute -left-20 top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute -right-20 bottom-20 w-64 h-64 bg-gold-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 font-bold tracking-widest uppercase text-xs mb-6 border border-blue-100">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-display">From Classroom to Boardroom</h2>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Our curriculum isn't just about code; it's about career architecture. We painstakingly design every module to mirror real-world software engineering challenges. You won't just learn syntax; you'll learn system design, scalability, and agile methodologies.
                        </p>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Our goal is to transform you into a <strong>Day-1 ready professional</strong> who can contribute to major projects immediately. We bridge the gap between academic theory and industrial application through immersive, project-based learning.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-custom pb-20">
                {activeTab === 'courses' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {courses.map((course, index) => (
                            <div key={course.id} className="bg-white rounded-[2.5rem] p-6 md:p-8 card-shadow border border-gray-100 hover:border-blue-200 transition-all duration-300 group flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                {/* Left Content: Information */}
                                <div className={`flex-1 w-full order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                                            {course.level}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                                            <Sparkles size={12} className="text-gold-400 fill-gold-400" /> {course.rating} ({course.reviews} reviews)
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display leading-tight">{course.title}</h3>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Master {course.tech.join(', ')} and build real-world applications. This comprehensive course is designed to take you from {course.level.toLowerCase()} level to industry-ready.
                                    </p>

                                    <div className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                                        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">What you'll learn:</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                                            {[
                                                "Industry-standard coding practices",
                                                "Real-time project implementation",
                                                "System design & architecture",
                                                "Performance optimization techniques",
                                                "Interview preparation & mock tests",
                                                "Job assistance & carrier guidance"
                                            ].map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 mb-8">
                                        {course.tech.map((t, i) => (
                                            <span key={i} className="text-sm font-semibold bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="text-gray-900 font-bold text-lg">
                                            <span className="text-gray-400 font-normal text-sm block">Duration</span>
                                            {course.duration}
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => openServiceModal('it', `Enroll: ${course.title}`)}
                                            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
                                        >
                                            View Details <ArrowRight size={16} />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Right Content: Image */}
                                <div className={`flex-1 w-full h-64 md:h-80 relative rounded-[2rem] overflow-hidden group-hover:shadow-2xl transition-shadow duration-500 order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {jobOffers.map((job) => (
                            <div key={job.id} className="bg-white p-8 rounded-[2rem] card-shadow border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-green-100 transition-colors">
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold mb-3">Hiring Now</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-display">{job.role}</h3>
                                    <p className="text-gray-500 font-medium mb-4">{job.company}</p>
                                    <div className="flex gap-3 text-sm font-medium">
                                        <span className="flex items-center gap-1 text-gray-600"><Briefcase size={14} className="text-green-500" /> {job.package}</span>
                                        <span className="flex items-center gap-1 text-gray-400">|</span>
                                        <span className="flex items-center gap-1 text-gray-600">{job.location}</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openServiceModal('it', `Job Application: ${job.role}`)}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-lg shrink-0 w-full sm:w-auto"
                                >
                                    Apply
                                </motion.button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Process / Journey Section */}
            <section className="py-20 border-y border-white/50">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Your Path to Success</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">From Beginner to Professional</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our structured roadmap ensures you are ready for the industry challenges from day one.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 hidden md:block border-t border-dashed border-gray-300"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Enroll & Assess", desc: "Skill gap analysis and personalized learning path." },
                                { step: "02", title: "Master Skills", desc: "Intensive training with live coding sessions." },
                                { step: "03", title: "Build Portfolio", desc: "Work on capstone projects and open source contribution." },
                                { step: "04", title: "Get Hired", desc: "Mock interviews, resume prep, and placement drives." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 shadow-blue-200 shadow-md group-hover:scale-110 transition-transform">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-xl">
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Success Stories</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display">Hear from our Alumni</h2>
                        </div>
                        <button className="hidden md:block px-6 py-3 rounded-full border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            View All Reviews
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Priya Sharma", role: "Frontend Developer at Infosys", image: "https://randomuser.me/api/portraits/women/44.jpg", quote: "The live projects were a game changer. I could talk confidently about my code during the interview." },
                            { name: "Rahul Verma", role: "Software Engineer at TCS", image: "https://randomuser.me/api/portraits/men/32.jpg", quote: "Mentors are very supportive. They helped me debug my code even late at night. improved my problem solving skills." },
                            { name: "Anjali Gupta", role: "React Developer at Wipro", image: "https://randomuser.me/api/portraits/women/65.jpg", quote: "Kanishka Sri's placement team is amazing. They prepared me for HR rounds and technical tests thoroughly." }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="p-8 rounded-[2rem] bg-indigo-50/50 hover:bg-white hover:shadow-xl border border-transparent hover:border-indigo-100 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-xs text-blue-600 font-medium">{testimonial.role}</div>
                                    </div>
                                </div>
                                <div className="flex text-amber-400 mb-4 gap-1">
                                    {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Placement Stats & Partners */}
            <section className="py-20 bg-[#1F1209] text-white rounded-t-[3rem] mt-auto">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center divide-x divide-white/10">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">500+</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Students Placed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">24 LPA</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Highest Package</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">50+</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Hiring Partners</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-display">92%</div>
                            <div className="text-sm md:text-base text-gold-100/60 font-medium">Success Rate</div>
                        </div>
                    </div>

                    <div className="text-center mt-20">
                        <p className="text-gold-100/40 text-sm uppercase tracking-widest mb-8 font-bold">Our Alumni Work At</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro'].map((company, i) => (
                                <span key={i} className="text-xl md:text-2xl font-bold font-display text-white">{company}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* IT Contact Strip */}
                <div className="container-custom mt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-500/20"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                <Phone size={32} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-2xl font-bold font-display">Ready to start your tech journey?</h3>
                                <p className="text-blue-100/70">Contact our admissions team for course details and seat availability.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Name: Chanakya</span>
                            <a href="tel:9441809692" className="text-3xl font-bold font-display hover:text-gold-400 transition-colors">
                                9441809692
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div >
    );
};

export default ITServices;
