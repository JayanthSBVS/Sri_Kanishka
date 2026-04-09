import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Sparkles, ShieldCheck, Coins, TrendingUp, Users, Home, Globe, Leaf,
    Brain, MessageCircle, Zap, Activity, XCircle, Filter, RefreshCw, Star,
    ArrowRight, Flame, HandHelping, Sun, Phone
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { Link } from 'react-router-dom';

const MaitriHavan = () => {
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
                        src="/hero-havan.png"
                        alt="Havan Ritual"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1F1209]/90 via-[#1F1209]/70 to-transparent"></div>
                    {/* Mandala Background (Subtle) */}
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] opacity-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-500 fill-current animate-spin-slow">
                            <path d="M50 0 C60 10 70 10 80 0 L100 20 C90 30 90 40 100 50 L80 100 C70 90 60 90 50 100 L0 80 C10 70 10 60 0 50 L20 0 C30 10 40 10 50 0" />
                        </svg>
                    </div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl text-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 text-white drop-shadow-lg">Maitri Havan</h1>
                        <nav className="flex items-center gap-2 text-gold-300 font-medium tracking-wide">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>|</span>
                            <span>Maitri Havan</span>
                        </nav>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitribodh Parivaar</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 tracking-tight">Maitri Havan</h2>
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
                                src="/images/meditation/About Havan.jpeg"
                                alt="Havan Process"
                                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-baseline gap-2 mb-6">
                                <h3 className="text-3xl font-bold font-display text-[#E67E22]">Convey</h3>
                                <span className="text-3xl font-light text-gray-500 font-display italic">Your Prayer</span>
                            </div>
                            <div className="prose prose-lg text-gray-600 leading-relaxed font-sans font-normal space-y-6">
                                <p>
                                    Maitri Havan is a powerful and authentic Vedic process to manifest your prayers. Not just a ritual but also a means of communicating and expressing Love towards the Divine. The prayers are offered through the sacred medium of Agni (Divine Fire), which helps the prayer to transcend beyond the physical realm into the realm of the Divine.
                                </p>
                                <p>
                                    At Maitribodh Parivaar, Maitri Havans are conducted by 'awakened' mediums, who have a deep understanding and right knowledge of different aspects of this divine process. This helps to sync and elevate the energies of the participating members and the surroundings where the sacred process takes place. The evolved spiritual state of the medium conducting the havan directly affects its efficiency and thus derives the best from the act. The devotional state of the medium uplifts the intensity of the havan. With a deep and strong bond with the Divine, the medium makes the impossible possible through the Havan.
                                </p>
                            </div>
                            <button
                                onClick={() => openServiceModal('meditation', 'Book Maitri Havan')}
                                className="mt-10 px-10 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all shadow-lg hover:shadow-xl uppercase tracking-widest text-xs"
                            >
                                Book Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* You Can Pray For Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitri Havans</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">You</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">Can Pray For</span>
                    </div>
                </div>

                <div className="container-custom">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12"
                    >
                        {[
                            { image: "/images/meditation/1.png", text: "Emotional or mental ailments like anxiety, depression, fear" },
                            { image: "/images/meditation/2.png", text: "Divine protection against unwanted energies and influences" },
                            { image: "/images/meditation/3.png", text: "Financial abundance and prosperity" },
                            { image: "/images/meditation/4.png", text: "Growth in current job or business venture" },
                            { image: "/images/meditation/5.png", text: "Strengthen love, communication and harmony in relationships" },
                            { image: "/images/meditation/6.png", text: "Love, peace and harmony at home, and within the entire family" },
                            { image: "/images/meditation/7.png", text: "Healing Mother Earth through Love and Care" },
                            { image: "/images/meditation/8.png", text: "Strengthen the Bond with the Divine" }
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                                    <img src={item.image} alt="" className="w-full h-full object-contain filter brightness-100" />
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed max-w-[200px]">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Ancient Vedic Ritual Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitribodh Parivaar</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">Ancient</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">Vedic Ritual</span>
                    </div>
                </div>

                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "/images/meditation/1.jpeg",
                            "/images/meditation/2.jpeg",
                            "/images/meditation/3.jpeg",
                            "/images/meditation/5.jpeg"
                        ].map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg"
                            >
                                <img src={img} alt={`Ritual Step ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitribodh Parivaar</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">Benefits</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">Of Maitri Havan</span>
                    </div>
                </div>

                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
                        {[
                            { image: "/images/meditation/icons/A.png", text: "Receive Grace for fulfillment of a Prayer" },
                            { image: "/images/meditation/icons/B.png", text: "Facilitates easy communion with the Divine" },
                            { image: "/images/meditation/icons/C.png", text: "Helps one progress their mindset from negative to positive" },
                            { image: "/images/meditation/icons/D.png", text: "Enhances the energy of the human body making it healthy and disease-free" },
                            { image: "/images/meditation/icons/E.png", text: "Helps deal with mental, emotional & personal obstacles" },
                            { image: "/images/meditation/icons/F.png", text: "Helps to release toxic or unwanted energies from the body" },
                            { image: "/images/meditation/icons/G.png", text: "Helps to reduce the impact of past karmas" },
                            { image: "/images/meditation/icons/H.png", text: "Accelerates the journey of Spiritual Transformation" }
                        ].map((item, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed max-w-[200px]">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Participation Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">How</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">Can I Participate?</span>
                    </div>
                </div>

                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        {
                            title: "VYAKTIGAT MAITRI HAVAN",
                            subtitle: "(INDIVIDUAL)",
                            desc: "Vyaktigat Maitri Havans are rituals which are done for an individual or family. An individual can request for any prayer to be offered through the process of Maitri Havan.",
                            details: "The Vyaktigat Maitri Havan process will be done exclusively for you with a dedicated havan kund. You would be able to participate in the Havan and offer ahutis (oblations) into the sacred fire.",
                            image: "/images/meditation/Vyaktigat.png"
                        },
                        {
                            title: "SANKALP MAITRI HAVAN",
                            subtitle: "(COLLECTIVE)",
                            desc: "Sankalp Maitri Havans are conducted for pre-defined sankalps (prayers) on auspicious days. An individual may book a havan for any of the sankalps defined as per the auspicious days.",
                            details: "The Sankalp Maitri Havans are done in your absence on your behalf. However, you may participate in the process from your own homes.",
                            image: "/images/meditation/Sankalp Havan.png"
                        }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
                        >
                            <div className="h-64 overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-10 flex-1 flex flex-col text-center">
                                <h3 className="text-xl font-bold tracking-[0.2em] text-gray-400 mb-1">{card.title}</h3>
                                <div className="text-lg font-light text-gray-400 italic mb-8 uppercase tracking-widest">{card.subtitle}</div>

                                <div className="space-y-6 text-gray-600 leading-relaxed text-sm mb-10">
                                    <p>{card.desc}</p>
                                    <p>{card.details}</p>
                                </div>

                                <button
                                    onClick={() => openServiceModal('meditation', `Book ${card.title}`)}
                                    className="mt-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gold-600 transition-colors shadow-lg"
                                >
                                    Inquire Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* When Can I Participate Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitri Havan</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">When</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">Can I Participate?</span>
                    </div>
                    <p className="mt-8 text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        You would get an opportunity to participate in the Maitri Havans on various auspicious days throughout the year at the Divine premises of our ShantiKshetra Premgiri Ashram and other spiritual centres. You may also choose to get the Vyaktigat Maitri Havan conducted at your own home or office premises.
                    </p>
                </div>

                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Ekādashi",
                                desc: "Once every month, on an Ekādashi day, Vyaktigat Maitri Havans will be conducted at our ShantiKshetra Premgiri Ashram for any prayer (intent) of your choosing. On these special days, Sankalp Maitri Havans would also be performed for the sankalp (prayer) specific to the significance of the day.",
                                image: "/images/meditation/Ekadasi 2 resized.png"
                            },
                            {
                                title: "Navrātri",
                                desc: "Traditionally, Navrātri has been celebrated as a festival where the positive (represented by the Divine Mother) goes into battle with all that which is not (represented by asur, the demonic forces). As such, this period, which lasts for 9 days and nights, is considered to be very auspicious for any spiritual practice or process done to uplift one's energy.",
                                image: "/images/meditation/Navratri 2 resized.png"
                            },
                            {
                                title: "Other Auspicious Days",
                                desc: "Apart from the monthly Ekādashi and the semi-annual Navrātri days, Vyaktigat Maitri Havans can also be performed at our ShantiKshetra Premgiri Ashram or your own residence or office premises. You can put in the request for the Maitri Havan and it can be done at a mutually convenient auspicious day.",
                                image: "/images/meditation/Auspicious events v2 resized.png"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold font-display text-[#E67E22] mb-6">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                                    {item.desc}
                                </p>
                                <button className="text-[#E67E22] font-bold text-xs uppercase tracking-widest hover:underline">
                                    read more
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book A Havan Form Section */}
            <section className="py-24">
                <div className="container-custom text-center mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Maitri Havan</span>
                    <div className="flex justify-center items-baseline gap-2">
                        <h2 className="text-4xl font-bold font-display text-[#E67E22]">Book</h2>
                        <span className="text-4xl font-light text-gray-500 font-display italic">A Havan</span>
                    </div>
                </div>

                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        {/* Instruction Box */}
                        <div className="bg-blue-50/50 border-l-4 border-[#E67E22] p-8 mb-12 rounded-r-2xl">
                            <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
                                <li>The booking of Maitri Havan is open only for Indian National Residents.</li>
                                <li>Please note that the dakshina amount is eligible for exemption under section 80G of The Income Tax Act, 1961.</li>
                                <li>You can book multiple havans, by selecting the required sankalp by clicking on 'Add Havan'. To select more sankalps click on 'Choose Sankalp' and repeat the process. Once you have added all the sankalps, click on 'Register and Pay'.</li>
                                <li>If your payment is debited / successful, but you have not received a receipt in your provided email from Maitribodh Parivaar immediately, we request you to wait for the next 24 hrs and if you still haven't received the receipt, then please get in touch with us. Do not make duplicate payment for the same.</li>
                            </ul>
                        </div>

                        {/* Dropdown Placeholder */}
                        <div className="mb-12">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Choose your havan type *</label>
                            <select className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-4 text-gray-700 focus:ring-2 focus:ring-[#E67E22]/20 outline-none appearance-none">
                                <option>--Select your havan type--</option>
                                <option>Vyaktigat Havan (Ashram/Arohan Kendra)</option>
                                <option>Vyaktigat Havan (Home/Office)</option>
                                <option>Sankalp Havan</option>
                            </select>
                        </div>

                        {/* Detailed Form */}
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold font-display text-[#E67E22] opacity-50 uppercase tracking-widest">--Select Your Havan Type--</h3>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/90 backdrop-blur-sm p-10 rounded-[2.5rem] border border-gray-100 shadow-xl" onSubmit={(e) => e.preventDefault()}>
                            {/* Row 1 */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full name (as mentioned on the PAN card) *</label>
                                <input type="text" placeholder="full name as mentioned on the PAN card" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email ID *</label>
                                <input type="email" placeholder="eMail ID" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>

                            {/* Row 2 */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address *</label>
                                <input type="text" placeholder="address" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">City *</label>
                                    <input type="text" placeholder="city name" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">State *</label>
                                    <input type="text" placeholder="state name" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile number *</label>
                                <input type="tel" placeholder="mobile number" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PAN Card Number *</label>
                                <input type="text" placeholder="PAN card number" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>

                            {/* Row 4 */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">How did you get to know about the havan? *</label>
                                <select className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none text-gray-500">
                                    <option>Other</option>
                                    <option>Friend/Family</option>
                                    <option>Social Media</option>
                                    <option>Website</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Havan category *</label>
                                <select className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none text-gray-500">
                                    <option>Nothing selected</option>
                                    <option>Health</option>
                                    <option>Wealth</option>
                                    <option>Relationship</option>
                                    <option>Spiritual Growth</option>
                                </select>
                            </div>

                            {/* Row 5 */}
                            <div className="col-span-1 md:col-span-2 space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Havan to be performed for *</label>
                                <input type="text" placeholder="Full name(s), separated by comma" className="w-full bg-gray-50/50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#E67E22]/20 transition-all outline-none" />
                            </div>

                            {/* Consent & Links */}
                            <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex flex-col gap-2">
                                    <button className="text-[10px] font-bold text-blue-500 hover:underline inline-flex items-center gap-1">Terms & Conditions</button>
                                    <button className="text-[10px] font-bold text-blue-500 hover:underline inline-flex items-center gap-1">Privacy Statements</button>
                                </div>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-xs text-gray-500 outline-none">
                                    <option>I agree to the above Terms and Conditions</option>
                                    <option>I do not agree</option>
                                </select>
                            </div>

                            {/* Submit */}
                            <div className="col-span-1 md:col-span-2 flex justify-center pt-8">
                                <button className="bg-gray-500 text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#E67E22] transition-colors shadow-lg">
                                    REQUEST HAVAN
                                </button>
                            </div>
                        </form>

                        {/* Contact Strip */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 p-8 rounded-[2rem] bg-orange-50/80 border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E67E22] rounded-full flex items-center justify-center text-white">
                                    <Phone size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-gray-900 font-display">Questions about Havan?</h3>
                                    <p className="text-gray-600">Call us for any queries related to spiritual rituals.</p>
                                </div>
                            </div>
                            <a href="tel:+918121121369" className="px-10 py-4 bg-[#E67E22] text-white font-bold rounded-xl hover:bg-[#D35400] transition-all shadow-lg text-lg">
                                +91 81211 21369
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}

            <section className="py-24 bg-[#1F1209] relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/hexellence.png")' }}></div>
                <div className="container-custom relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-8">Begin Your Spiritual Journey</h2>
                    <p className="text-gold-100/60 max-w-2xl mx-auto mb-12 text-lg">
                        Connect with the Divine through the sacred Agni. Experience the transformational power of Maitri Havan today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => openServiceModal('meditation', 'Book Maitri Havan')}
                            className="px-12 py-4 bg-gold-600 text-white font-bold rounded-full hover:bg-gold-500 transition-all shadow-xl shadow-gold-500/20 text-lg"
                        >
                            Reserve Your Slot
                        </button>
                        <Link to="/contact" className="px-12 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-lg flex items-center justify-center gap-2">
                            Contact Us <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MaitriHavan;
