import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Heart, Flower, ArrowRight, Sparkles, Building, Globe, ShoppingCart } from 'lucide-react';

const Services = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            id: 'it',
            title: "IT Training & Consultancy",
            desc: "Industry-aligned tech courses and placement support.",
            icon: Code,
            color: "blue",
            link: "/services/it"
        },
        {
            id: 'marriage',
            title: "Marriage Matches",
            desc: "Trusted matrimonial services for your perfect match.",
            icon: Heart,
            color: "rose",
            link: "/services/marriage"
        },
        {
            id: 'meditation',
            title: "Meditation & Spirituality",
            desc: "Guided sessions for inner peace and mental clarity.",
            icon: Flower,
            color: "indigo",
            link: "/services/meditation"
        },
        {
            id: 'real-estate',
            title: "Real Estate & Construction",
            desc: "Premium properties and expert construction services.",
            icon: Building,
            color: "emerald",
            link: "/services/real-estate"
        },
        {
            id: 'abroad',
            title: "Abroad Consultancy",
            desc: "Expert guidance for education and careers overseas.",
            icon: Globe,
            color: "sky",
            link: "/services/abroad-consultancy"
        },
        {
            id: 'groceries',
            title: "Premium Groceries",
            desc: "Organic staples and farm-fresh essentials delivered home.",
            icon: ShoppingCart,
            color: "orange",
            link: "/services/groceries"
        }
    ];

    return (
        <div className="pt-24 min-h-screen">
            <div className="container-custom py-12">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-blue-50 to-gold-50 blur-3xl rounded-full opacity-60 -z-10"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-gold-600 font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} className="text-gold-500" />
                        Our Offerings
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-6"
                    >
                        Holistic Services for <br /> <span className="text-gradient-gold">Every Aspect of Life</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover the core pillars of Kanishka Sri designed to empower every aspect of your life—from career and home to well-being and staples.
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 border border-gray-100 h-[350px] animate-pulse relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50"></div>
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl mb-8"></div>
                                <div className="h-8 bg-gray-100 rounded-full w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-50 rounded-full w-full mb-2"></div>
                                <div className="h-4 bg-gray-50 rounded-full w-5/6 mb-8"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/3 mt-auto"></div>
                            </div>
                        ))
                    ) : (
                        services.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-8 card-shadow border border-gray-100 hover:border-gold-200 transition-all duration-300 group h-full flex flex-col relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}>
                                    <service.icon size={150} className={`text-${service.color}-500`} />
                                </div>

                                <div className={`w-16 h-16 rounded-2xl bg-${service.color}-50 text-${service.color}-500 ring-1 ring-${service.color}-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display relative z-10">{service.title}</h3>
                                <p className="text-gray-600 mb-8 flex-grow leading-relaxed relative z-10">{service.desc}</p>
                                <Link
                                    to={service.link}
                                    className={`flex items-center font-bold text-${service.color}-600 group-hover:underline mt-auto cursor-pointer relative z-10`}
                                >
                                    Explore Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;
