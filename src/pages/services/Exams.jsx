import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, CheckCircle, ArrowRight, Sparkles, Star, Award, Search, Globe } from 'lucide-react';
import { useUI } from '../../context/UIContext';

const examsData = [
    {
        name: 'IELTS',
        fullName: 'International English Language Testing System',
        color: 'blue',
        description: "The IELTS test is the world's most popular English language proficiency test for study, work, and migration. Accepted by over 11,000 organizations globally including universities, employers, professional bodies, and immigration authorities.",
        whoShouldTake: 'Students planning to study in UK, Australia, Canada, New Zealand, or seeking immigration. Also required for UK visa applications and professional registration.',
        testFormat: [
            'Listening (30 minutes): 40 questions on 4 recordings',
            'Reading (60 minutes): 40 questions on 3 passages',
            'Writing (60 minutes): 2 tasks including essay writing',
            'Speaking (11-14 minutes): Face-to-face interview with examiner'
        ],
        details: [
            'Score range: 0-9 bands (9 being the highest)',
            'Two types: Academic & General Training',
            'Total duration: 2 hrs 45 mins',
            'Validity: 2 years from test date',
            'Fee: ₹16,250 (approx.)',
            'Results: Available in 3-5 days (computer) or 13 days (paper)'
        ],
        preparationTips: [
            'Practice all four skills daily for balanced improvement',
            'Take regular mock tests under timed conditions',
            'Focus on academic vocabulary and formal writing style',
            'Record yourself speaking to identify pronunciation issues'
        ]
    },
    {
        name: 'TOEFL',
        fullName: 'Test of English as a Foreign Language',
        color: 'purple',
        description: 'TOEFL iBT measures your ability to use and understand English at the university level. It evaluates how well you combine listening, reading, speaking, and writing skills to perform academic tasks. Accepted by 160+ countries and 11,500+ universities.',
        whoShouldTake: 'Students applying to American, Canadian universities, or English-speaking institutions. Required for undergraduate, graduate programs, scholarships, and student visas.',
        testFormat: [
            'Reading (54-72 minutes): 3-4 passages with comprehension questions',
            'Listening (41-57 minutes): Academic lectures and conversations',
            'Speaking (17 minutes): 4 tasks expressing opinions on familiar topics',
            'Writing (50 minutes): 2 tasks - integrated and independent essay'
        ],
        details: [
            'Score range: 0-120 (30 points per section)',
            'Fully internet-based test (iBT)',
            'Duration: ~3 hours',
            'Validity: 2 years',
            'Fee: $185-220 USD (varies by location)',
            'Accepted by 160+ countries worldwide',
            'Results: Available in 4-8 days'
        ],
        preparationTips: [
            'Master note-taking skills for integrated tasks',
            'Build stamina for the 3-hour computer-based test',
            'Practice typing for writing section (saves time)',
            'Use official ETS materials for authentic practice'
        ]
    },
    {
        name: 'GRE',
        fullName: 'Graduate Record Examination',
        color: 'indigo',
        description: "The GRE General Test measures verbal reasoning, quantitative reasoning, critical thinking, and analytical writing skills. Required for admission to graduate and business schools worldwide, it's accepted by thousands of programs globally.",
        whoShouldTake: "Students applying for Master's, PhD, MBA, and other graduate programs. Required by most US universities and increasingly accepted in Europe, Canada, and Australia.",
        testFormat: [
            'Analytical Writing (60 minutes): 2 essays analyzing arguments',
            'Verbal Reasoning (60 minutes): 2 sections with 20 questions each',
            'Quantitative Reasoning (70 minutes): 2 sections with 20 questions each',
            'Unscored Research Section: May appear in any order'
        ],
        details: [
            'Score range: 260-340 (Verbal & Quant: 130-170 each)',
            'Analytical Writing: 0-6 in half-point increments',
            'Sections: Verbal, Quantitative, Analytical Writing',
            'Duration: ~3 hours 45 minutes',
            'Validity: 5 years',
            'Fee: $220 USD worldwide',
            'Computer-adaptive test (difficulty adjusts)'
        ],
        preparationTips: [
            'Master high-frequency vocabulary (1000+ words)',
            'Practice mental math to save time in Quant section',
            'Learn to identify question patterns and shortcuts',
            'Take full-length adaptive practice tests regularly'
        ]
    },
    {
        name: 'PTE',
        fullName: 'Pearson Test of English Academic',
        color: 'emerald',
        description: 'PTE Academic is a computer-based English language test for study abroad and immigration. Known for fast results and unbiased AI scoring, it assesses real-life English used in academic settings and is trusted by universities, governments worldwide.',
        whoShouldTake: 'Students seeking faster results and computer-based testing. Popular for Australia, New Zealand immigration and widely accepted for UK, Canadian student visas.',
        testFormat: [
            'Speaking & Writing (54-67 minutes): Personal introduction, read aloud, essay',
            'Reading (29-30 minutes): Multiple choice, reorder paragraphs',
            'Listening (30-43 minutes): Summarize spoken text, multiple choice',
            'All sections integrated with AI scoring'
        ],
        details: [
            'Score range: 10-90 points (90 being highest)',
            'Fully computer-based test with AI scoring',
            'Duration: ~2 hours',
            'Validity: 2 years',
            'Fee: ₹15,900 (India) / $245 USD',
            'Results: Within 48 hours (usually 24 hours)',
            'Unlimited score sending to institutions'
        ],
        preparationTips: [
            'Get comfortable with computerized testing interface',
            'Practice speaking into a microphone clearly',
            'Learn template-based approaches for speaking/writing',
            'Master time management - no breaks between sections'
        ]
    }
];

const Exams = () => {
    const { openServiceModal } = useUI();

    return (
        <div className="pt-3 min-h-screen">
            {/* Hero Section */}
            <section className="relative rounded-[2.5rem] margin-x-custom mx-4 md:mx-6 mb-16 overflow-hidden min-h-[500px] flex items-center shadow-2xl shadow-blue-100/50">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1434031211b08-3129f7988cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Exams Preparation" className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent"></div>

                <div className="container-custom relative z-10 px-8 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/50 text-blue-200 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                            <Sparkles size={14} className="text-blue-400" />
                            Academic Excellence
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display leading-tight drop-shadow-lg">
                            Master Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Target Scores</span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mb-12 leading-relaxed font-sans font-medium">
                            Expert coaching and comprehensive strategies for IELTS, TOEFL, GRE, and PTE. Turn your global ambitions into reality.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('exams-grid').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-full font-bold bg-white text-blue-900 transition-all shadow-lg hover:-translate-y-1 hover:bg-blue-50"
                            >
                                View Programs
                            </button>
                            <button
                                onClick={() => openServiceModal('exams', 'Free Consultation')}
                                className="px-8 py-4 rounded-full font-bold bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
                            >
                                Free Consultation
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials/Intro Section */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Expert Faculty", desc: "Learn from certified trainers with 10+ years experience.", icon: Award },
                            { title: "Mock Tests", desc: "Full-length adaptive tests mapped to latest patterns.", icon: BookOpen },
                            { title: "Score Updates", desc: "95% of our students achieve their target band scores.", icon: Star },
                            { title: "Global Reach", desc: "Recognized by 10,000+ universities worldwide.", icon: Globe }
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

            {/* Exams Grid */}
            <section id="exams-grid" className="py-20">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Choose Your Path</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display">Elite Test Prep Programs</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
                        {examsData.map((exam, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group hover:border-${exam.color}-200 transition-all duration-500`}
                            >
                                <div className={`h-2 bg-${exam.color}-500 w-full`}></div>
                                
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h3 className={`text-4xl font-bold text-${exam.color}-600 font-display`}>{exam.name}</h3>
                                                <div className={`px-3 py-1 bg-${exam.color}-50 text-${exam.color}-600 rounded-full text-xs font-bold uppercase tracking-wider`}>
                                                    Certified Course
                                                </div>
                                            </div>
                                            <p className="text-gray-500 font-medium mb-4 text-sm uppercase tracking-wide">{exam.fullName}</p>
                                            <p className="text-gray-600 text-lg leading-relaxed">{exam.description}</p>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <button 
                                                onClick={() => openServiceModal('exams', `Enroll: ${exam.name}`)}
                                                className={`w-full md:w-auto px-8 py-4 bg-${exam.color}-600 text-white rounded-2xl font-bold hover:bg-${exam.color}-700 transition-colors shadow-lg shadow-${exam.color}-100 flex items-center justify-center gap-2`}
                                            >
                                                Enroll Now <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className={`bg-${exam.color}-50/30 rounded-3xl p-8 border border-${exam.color}-50`}>
                                            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <CheckCircle size={20} className={`text-${exam.color}-500`} /> Who Should Take This
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed text-sm mb-8">{exam.whoShouldTake}</p>
                                            
                                            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Star size={20} className={`text-${exam.color}-500`} /> Key Details
                                            </h4>
                                            <ul className="space-y-3">
                                                {exam.details.map((detail, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-${exam.color}-400 mt-1.5 shrink-0`}></div>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-10">
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                    <Search size={20} className={`text-${exam.color}-500`} /> Test Format
                                                </h4>
                                                <ul className="space-y-4">
                                                    {exam.testFormat.map((format, i) => (
                                                        <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm hover:translate-x-1 transition-transform">
                                                            <div className={`w-8 h-8 rounded-lg bg-${exam.color}-50 text-${exam.color}-600 flex items-center justify-center shrink-0`}>
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-sm text-gray-600 font-medium">{format}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                    <Sparkles size={20} className={`text-${exam.color}-500`} /> Preparation Tips
                                                </h4>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {exam.preparationTips.map((tip, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50/50 p-3 rounded-xl">
                                                            <div className={`w-1 h-1 rounded-full bg-${exam.color}-400 mt-1.5 shrink-0`}></div>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-slate-900 text-white rounded-t-[3rem]">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">Achieve Your Dream Score</h2>
                    <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">Get personalized coaching and study materials to crack IELTS, GRE, or TOEFL in your first attempt.</p>
                    <button 
                        onClick={() => openServiceModal('exams', 'General Inquiry')}
                        className="px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
                    >
                        Get Free Assessment
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Exams;
