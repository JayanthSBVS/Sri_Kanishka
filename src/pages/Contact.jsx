import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [focused, setFocused] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleFocus = (field) => setFocused(p => ({ ...p, [field]: true }));
    const handleBlur = (field) => setFocused(p => ({ ...p, [field]: formData[field].length > 0 }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log('Form submitted:', formData);
            // Reset form or show success message here
        }, 2000);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden mb-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact-hero.png"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/60"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-gold-600 font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        24/7 Support
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-white font-display"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                    >
                        We'd love to hear from you. Whether you have a question about our services, pricing, or need consulting, our team is ready to answer all your questions.
                    </motion.p>
                </div>
            </section>

            <div className="container-custom pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Contact Info & Map */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Info Cards */}
                        <div className="grid gap-6">
                            {[
                                { icon: MapPin, title: "Our Office", text: "Kanishka Sri Associates, #123, Tech Park", sub: "Bangalore, Karnataka 560001", color: "blue" },
                                { icon: Phone, title: "Phone Support", text: "+91 9441809692", sub: "Name: Chanakya", color: "gold" },
                                { icon: Mail, title: "Email Us", text: "hello@kanishkasri.com", sub: "We reply within 24 hours", color: "purple" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md hover:border-blue-100 transition-all group"
                                >
                                    <div className={`p-4 rounded-xl bg-${item.color}-50 text-${item.color}-600 group-hover:bg-${item.color}-100 transition-colors`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-1 font-display">{item.title}</h3>
                                        <p className="text-gray-700 font-medium">{item.text}</p>
                                        <p className="text-gray-400 text-sm mt-1">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Map Preview */}
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-64 overflow-hidden relative group">
                            <iframe
                                title="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.979040683072!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1645516942000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-7 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold-100/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-display">Send us a Message</h3>
                            <p className="text-gray-500 mb-10 text-lg">Your email address will not be published. Required fields are marked *</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Full Name *"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        focused={focused['name']}
                                        onFocus={() => handleFocus('name')}
                                        onBlur={() => handleBlur('name')}
                                    />
                                    <InputField
                                        label="Email Address *"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        focused={focused['email']}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={() => handleBlur('email')}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        focused={focused['phone']}
                                        onFocus={() => handleFocus('phone')}
                                        onBlur={() => handleBlur('phone')}
                                    />
                                    <InputField
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        focused={focused['subject']}
                                        onFocus={() => handleFocus('subject')}
                                        onBlur={() => handleBlur('subject')}
                                    />
                                </div>

                                <InputField
                                    label="Your Message *"
                                    name="message"
                                    isTextArea
                                    value={formData.message}
                                    onChange={handleChange}
                                    focused={focused['message']}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={() => handleBlur('message')}
                                />

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto px-12 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gold-600 transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : (
                                            <>
                                                Send Message
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// InputField Component moved outside to prevent re-renders losing focus
const InputField = ({ label, name, type = "text", isTextArea = false, value, onChange, onFocus, onBlur, focused }) => (
    <div className="relative">
        {isTextArea ? (
            <textarea
                name={name}
                rows="5"
                value={value}
                onChange={onChange}
                className={`peer w-full px-5 py-4 rounded-xl border-2 outline-none transition-all bg-gray-50 pt-7 font-medium text-gray-800 resize-none ${focused || value?.length > 0 ? 'border-gold-400 ring-4 ring-gold-100/50 bg-white' : 'border-gray-100 focus:border-gold-400 focus:ring-4 focus:ring-gold-100/50'
                    }`}
                onFocus={onFocus}
                onBlur={onBlur}
            ></textarea>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`peer w-full px-5 py-4 rounded-xl border-2 outline-none transition-all bg-gray-50 pt-7 font-medium text-gray-800 ${focused || value?.length > 0 ? 'border-gold-400 ring-4 ring-gold-100/50 bg-white' : 'border-gray-100 focus:border-gold-400 focus:ring-4 focus:ring-gold-100/50'
                    }`}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        )}
        <label
            className={`absolute left-5 transition-all duration-200 pointer-events-none ${focused || value?.length > 0 ? 'top-2 text-xs text-gold-600 font-bold' : 'top-4 text-gray-400 font-medium'
                }`}
        >
            {label}
        </label>
    </div>
);

export default Contact;
