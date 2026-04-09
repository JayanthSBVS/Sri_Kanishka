import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, Clock, MapPin, ArrowRight, Sparkles, CheckCircle, Package, Truck } from 'lucide-react';
import { useUI } from '../../context/UIContext';

const Groceries = () => {
    const { openServiceModal } = useUI();
    const [activeTab, setActiveTab] = useState('fresh');

    return (
        <div className="pt-3 min-h-screen">
            {/* Hero */}
            <section className="relative rounded-[2.5rem] margin-x-custom mx-4 md:mx-6 mb-16 overflow-hidden min-h-[500px] flex items-center shadow-2xl shadow-orange-100/50">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Fresh Groceries" className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-orange-950/90 via-orange-900/40 to-transparent"></div>

                <div className="container-custom relative z-10 px-8 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/50 text-orange-200 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                            <Leaf size={14} className="text-orange-400" />
                            Fresh & Farm-To-Table
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-display leading-tight drop-shadow-lg">
                            Purity You Can <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Taste</span>
                        </h1>
                        <p className="text-xl text-orange-100 max-w-2xl mb-12 leading-relaxed font-sans font-medium">
                            Premium quality staples, organic heritage grains, and farm-fresh essentials delivered with care to your doorstep.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setActiveTab('fresh')}
                                className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'fresh' ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-orange-950/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                            >
                                Fresh Harvest
                            </button>
                            <button
                                onClick={() => setActiveTab('organic')}
                                className={`px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1 ${activeTab === 'organic' ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-orange-950/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                            >
                                Organic Staples
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Direct from Farms", desc: "Sourced directly to ensure maximum freshness and fairness to farmers.", icon: MapPin },
                            { title: "Chemical Free", desc: "No harmful pesticides or artificial preservatives used.", icon: CheckCircle },
                            { title: "Same Day Delivery", desc: "Harvested in the morning, on your table by evening.", icon: Clock },
                            { title: "Eco-Packaging", desc: "Plastic-free, sustainable packaging for a better planet.", icon: Leaf }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-3xl bg-white/40 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-orange-600 flex items-center justify-center mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2 font-display">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products / Selection */}
            <div className="container-custom pb-20 mt-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-3 block">Premium Selection</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">Quality You Can Trust</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Single Origin Desi Cow Ghee", category: "Organic", price: "₹1,200/kg", img: "https://images.unsplash.com/photo-1550583724-1255818c0533?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                        { title: "Stone Ground Multigrain Atta", category: "Staples", price: "₹85/kg", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                        { title: "Cold Pressed Coconut Oil", category: "Essential Oils", price: "₹450/ltr", img: "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                        { title: "Heritage Red Rice", category: "Traditional Grains", price: "₹120/kg", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                        { title: "Raw Wild Forest Honey", category: "Natural Sweetener", price: "₹650/500g", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
                        { title: "Farm Picked Seasonal Basket", category: "Fresh Produce", price: "₹499/basket", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 group transition-all duration-300 hover:shadow-xl">
                            <div className="h-48 relative overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{item.title}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-orange-600 font-bold text-xl">{item.price}</span>
                                    <button 
                                        onClick={() => openServiceModal('groceries', `Inquiry: ${item.title}`)}
                                        className="p-3 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-colors"
                                    >
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 font-bold text-xs uppercase tracking-wider mb-6">
                            Monthly Subscription
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">The Smart-Pantry Plan</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            Never run out of essentials. Customize your monthly pantry needs and get them delivered automatically on the first of every month with an exclusive 15% discount.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <Package className="text-orange-500" size={20} /> Set Your Essentials
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <Truck className="text-orange-500" size={20} /> Zero Delivery Fees
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <Clock className="text-orange-500" size={20} /> Fixed Delivery Date
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 font-medium">
                                <ArrowRight className="text-orange-500" size={20} /> Flexible Cancellation
                            </div>
                        </div>
                        <button 
                            onClick={() => openServiceModal('groceries', 'Subscription Plan')}
                            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
                        >
                            Build Your Pantry
                        </button>
                    </div>
                    <div className="flex-1 w-full h-[400px] rounded-[2rem] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Groceries Subscription" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            
            {/* Stats */}
            <section className="py-16 bg-orange-950 text-white rounded-t-[3rem] mt-auto">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-orange-900/50">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 font-display">100%</div>
                            <div className="text-sm md:text-base text-orange-100/60 font-medium">Organic Certified</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 font-display">50+</div>
                            <div className="text-sm md:text-base text-orange-100/60 font-medium">Partner Farms</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 font-display">5k+</div>
                            <div className="text-sm md:text-base text-orange-100/60 font-medium">Happy Homes</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 font-display">24h</div>
                            <div className="text-sm md:text-base text-orange-100/60 font-medium">Farm to Home</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Groceries;
