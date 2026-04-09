import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, GraduationCap, Briefcase, FileCheck, ArrowRight, Sparkles, Globe, Award, BookOpen, Star, Search, CheckCircle } from 'lucide-react';
import { useUI } from '../../context/UIContext';

const examsData = [
    {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        color: 'blue',
        description: "The IELTS test is the world's most popular English language proficiency test for study, work, and migration. Accepted by over 11,000 organizations globally.",
        whoShouldTake: 'Students planning to study in UK, Australia, Canada, New Zealand, or seeking immigration.',
        testFormat: [
            'Listening (30 minutes): 4 recordings',
            'Reading (60 minutes): 3 passages',
            'Writing (60 minutes): 2 tasks',
            'Speaking (11-14 minutes): Interview'
        ],
        details: [
            'Score range: 0-9 bands',
            'Two types: Academic & General',
            'Validity: 2 years',
            'Fee: ₹16,250 (approx.)'
        ],
        preparationTips: [
            'Daily practice for balanced improvement',
            'Regular timed mock tests',
            'Focus on academic vocabulary'
        ]
    },
    {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        color: 'purple',
        description: 'TOEFL iBT measures your ability to use and understand English at the university level. Accepted by 160+ countries and 11,500+ universities.',
        whoShouldTake: 'Students applying to American, Canadian universities, or English-speaking institutions.',
        testFormat: [
            'Reading (54-72 minutes): 3-4 passages',
            'Listening (41-57 minutes): Academic lectures',
            'Speaking (17 minutes): 4 tasks',
            'Writing (50 minutes): 2 tasks'
        ],
        details: [
            'Score range: 0-120',
            'Fully internet-based (iBT)',
            'Validity: 2 years',
            'Fee: $185-220 USD'
        ],
        preparationTips: [
            'Master integrated note-taking',
            'Build 3-hour test stamina',
            'Practice fast computer typing'
        ]
    },
    {
        name: 'GRE',
        fullName: 'Graduate Record Examination',
        color: 'indigo',
        description: "Measures verbal reasoning, quantitative reasoning, and analytical writing skills. Required for admission to graduate and business schools worldwide.",
        whoShouldTake: "Students applying for Master's, PhD, MBA, and other graduate programs globally.",
        testFormat: [
            'Analytical Writing: 2 essays',
            'Verbal Reasoning: 2 sections',
            'Quantitative Reasoning: 2 sections',
            'Adaptive difficulty per section'
        ],
        details: [
            'Score range: 260-340',
            'Validity: 5 years',
            'Fee: $220 USD worldwide',
            'Accepted by thousands of programs'
        ],
        preparationTips: [
            'Master high-frequency vocabulary',
            'Practice mental math shortcuts',
            'Take adaptive mock tests'
        ]
    },
    {
        name: 'PTE',
        fullName: 'Pearson Test of English Academic',
        color: 'emerald',
        description: 'Computer-based English test for study abroad and immigration. Known for fast results and unbiased AI scoring.',
        whoShouldTake: 'Students seeking faster results (within 48 hours). Popular for Australia and New Zealand.',
        testFormat: [
            'Speaking & Writing (54-67 mins)',
            'Reading (29-30 minutes)',
            'Listening (30-43 minutes)',
            'Integrated AI scoring'
        ],
        details: [
            'Score range: 10-90 points',
            'Fully computer-based',
            'Validity: 2 years',
            'Results: Within 48 hours'
        ],
        preparationTips: [
            'Master computerized interface',
            'Practice clear mic speaking',
            'Template-based writing strategy'
        ]
    }
];

const AbroadConsultancy = () => {
    const { openServiceModal } = useUI();
    const [activeTab, setActiveTab] = useState('study');

    return (
        <div className="pt-3 min-h-screen">
            {/* Hero */}
            <section className="relative rounded-[2.5rem] margin-x-custom mx-4 md:mx-6 mb-16 overflow-hidden min-h-[500px] flex items-center shadow-2xl shadow-sky-100/50">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Study Abroad" className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/60 to-transparent"></div>

                <div className="container-custom relative z-10 px-8 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-500/50 text-sky-200 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                            <Plane size={14} />
                            Your Global Journey Starts Here
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display leading-tight drop-shadow-lg">
                            Go Beyond <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-300">Borders</span>
                        </h1>
                        <p className="text-xl text-sky-100 max-w-2xl mb-12 leading-relaxed font-sans font-medium">
                            Expert guidance for your overseas education, global career opportunities, and competitive exam preparations.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setActiveTab('study')}
                                className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'study' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sky-900/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                            >
                                Study Abroad
                            </button>
                            <button
                                onClick={() => setActiveTab('work')}
                                className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'work' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sky-900/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                            >
                                Work Permits & Visas
                            </button>
                            <button
                                onClick={() => setActiveTab('exams')}
                                className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'exams' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sky-900/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                            >
                                Exam Preparation
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Steps & Features */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "University Selection", desc: "Get unbiased advice to choose the university that fits your goals.", icon: GraduationCap },
                            { title: "Test Prep", desc: "Expert coaching for IELTS, TOEFL, GRE, and PTE.", icon: BookOpen },
                            { title: "Visa Assistance", desc: "End-to-end support for a hassle-free visa application process.", icon: FileCheck },
                            { title: "Global Networks", desc: "Extensive tie-ups with top institutions globally.", icon: Globe }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-white/40 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-sky-600 flex items-center justify-center mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2 font-display">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container-custom pb-20 mt-10">
                {activeTab === 'study' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Featured Countries */}
                        <div>
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-3 block">Top Destinations</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">Study in the World's Best Universities</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { name: "USA", desc: "Pinnacle of research & technology.", img: "https://images.unsplash.com/photo-1496442226666-8d4d1e410417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                                    { name: "UK", desc: "Rich academic heritage & short programs.", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                                    { name: "Canada", desc: "Welcoming culture & excellent PR path.", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                                    { name: "Australia", desc: "High living standards & diverse society.", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                                    { name: "Germany", desc: "Pioneers in engineering and low tuition fees.", img: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
                                ].map((country, idx) => (
                                    <div key={idx} className="relative rounded-[2rem] overflow-hidden group shadow-lg h-64 border border-gray-100">
                                        <img src={country.img} alt={country.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">{country.name}</h3>
                                            <p className="text-sky-100/90 text-sm">{country.desc}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-sky-50 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center border border-sky-100 hover:bg-sky-100 transition-colors">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-sky-600 mb-4 shadow-sm">
                                        <Globe size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">And Many More</h3>
                                    <p className="text-sky-700/80 mb-6 text-sm">Discover programs in Ireland, New Zealand, Singapore & Europe.</p>
                                    <button 
                                        onClick={() => openServiceModal('abroad', 'General Enquiry')}
                                        className="text-sky-600 font-bold hover:underline flex items-center gap-2"
                                    >
                                        Consult Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'work' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 w-full h-[400px] rounded-[2rem] overflow-hidden order-2 md:order-1">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Work Abroad" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 order-1 md:order-2">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-700 font-bold text-xs uppercase tracking-wider mb-6">
                                    Global Careers
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">Work Overseas Visas & PR</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    Secure your future with professional guidance on skilled worker visas, permanent residency (PR), and corporate immigrations.
                                </p>
                                <ul className="space-y-4 mb-8 text-gray-700">
                                    <li className="flex items-center gap-3 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                            <Briefcase size={14} />
                                        </div>
                                        H-1B, L1 (USA) & Tier 2 (UK) processing
                                    </li>
                                    <li className="flex items-center gap-3 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                            <FileCheck size={14} />
                                        </div>
                                        Express Entry & PNP Programs for Canada PR
                                    </li>
                                    <li className="flex items-center gap-3 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                            <Plane size={14} />
                                        </div>
                                        Australia Skilled Migration Visas
                                    </li>
                                </ul>
                                <button 
                                    onClick={() => openServiceModal('abroad', `Immigration Consultation`)}
                                    className="px-8 py-4 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200"
                                >
                                    Check Eligibility
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'exams' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-3 block">Test Preparation</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">Master Your Target Scores</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {examsData.map((exam, idx) => (
                                <div key={idx} className={`bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:border-${exam.color}-200 transition-colors group flex flex-col`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className={`text-2xl font-bold text-${exam.color}-600 font-display`}>{exam.name}</h3>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{exam.fullName}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-2xl bg-${exam.color}-50 text-${exam.color}-600 flex items-center justify-center`}>
                                            <BookOpen size={24} />
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{exam.description}</p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Test Format</h4>
                                            <ul className="space-y-1">
                                                {exam.testFormat.slice(0, 3).map((f, i) => (
                                                    <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                                                        <div className={`w-1 h-1 rounded-full bg-${exam.color}-400`}></div> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Details</h4>
                                            <ul className="space-y-1">
                                                {exam.details.slice(0, 3).map((d, i) => (
                                                    <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                                                        <div className={`w-1 h-1 rounded-full bg-${exam.color}-400`}></div> {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => openServiceModal('exams', `Enquiry: ${exam.name}`)}
                                        className={`w-full py-3 bg-${exam.color}-50 text-${exam.color}-600 rounded-xl font-bold hover:bg-${exam.color}-600 hover:text-white transition-all text-sm`}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            
            <section className="py-16 bg-gradient-to-r from-sky-900 to-indigo-900 text-white rounded-t-[3rem] mt-auto">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2 font-display">2000+</div>
                            <div className="text-sm md:text-base text-sky-100/80 font-medium">Students Enrolled</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2 font-display">95%</div>
                            <div className="text-sm md:text-base text-sky-100/80 font-medium">Visa Success Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2 font-display">20+</div>
                            <div className="text-sm md:text-base text-sky-100/80 font-medium">Countries Reached</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2 font-display">300+</div>
                            <div className="text-sm md:text-base text-sky-100/80 font-medium">Global University Tie-Ups</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AbroadConsultancy;
