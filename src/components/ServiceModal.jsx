import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';
import { useUI } from '../context/UIContext';

const ServiceModal = () => {
    const { serviceModal, closeServiceModal, setMatrimonyProfile, matrimonyProfile, matrimonyLoginUser } = useUI();
    const [status, setStatus] = useState('idle'); // idle, loading, success
    const [error, setError] = useState('');
    const [isMatLoginMode, setIsMatLoginMode] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', password: '',
        preferredCourse: 'Full Stack Development',
        // Matrimony fields
        profileFor: 'Myself', gender: 'Male', dob: '', religion: 'Hindu',
        caste: '', education: '', profession: '', maritalStatus: 'Never Married'
    });

    // Compute DOB bounds: min 18 years ago, max 60 years ago
    const dobMax = (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 18);
        return d.toISOString().split('T')[0];
    })();
    const dobMin = (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 60);
        return d.toISOString().split('T')[0];
    })();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Phone: digits only, max 10
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, phone: digits }));
            return;
        }
        // First/Last name: letters + spaces only
        if (name === 'firstName' || name === 'lastName') {
            if (!/^[a-zA-Z\s]*$/.test(value)) return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
               setError('File is too large! Maximum size is 50MB.');
               return;
            }
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        const isMatrimony = serviceModal.type === 'marriage';

        try {
            let res, data;
            
            if (isMatrimony && isMatLoginMode) {
                // MATRIMONY LOGIN
                res = await fetch('http://localhost:5000/api/matrimony/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                data = await res.json();
                
                if (res.ok && data.success) {
                    matrimonyLoginUser(data.data.profile, data.data.token);
                    setStatus('success');
                } else {
                    setError(data.message || 'Login failed');
                    setStatus('idle');
                }
            } else {
                // MATRIMONY REGISTER (or IT Form submission)
                const url = isMatrimony ? 'http://localhost:5000/api/matrimony/register' : 'http://localhost:5000/api/it/register';
                
                let fetchOptions;
                if (isMatrimony) {
                    const data = new FormData();
                    Object.keys(formData).forEach(key => data.append(key, formData[key]));
                    if (profilePhoto) {
                        data.append('profilePhoto', profilePhoto);
                    }
                    
                    fetchOptions = {
                        method: 'POST',
                        body: data
                    };
                } else {
                    fetchOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...formData, serviceType: serviceModal.type })
                    };
                }

                res = await fetch(url, fetchOptions);
                data = await res.json();

                if (res.ok && data.success) {
                    setStatus('success');
                    if (isMatrimony) {
                        matrimonyLoginUser(data.data.profile, data.data.token);
                    }
                } else {
                    setError(data.message || 'Submission failed');
                    setStatus('idle');
                }
            }
        } catch (err) {
            setError('Could not connect to server. Is it running?');
            setStatus('idle');
        }
    };

    const handlePayment = async () => {
        setStatus('payment_loading');
        setError('');
        const matToken = localStorage.getItem('matToken');
        try {
            const res = await fetch(`http://localhost:5000/api/matrimony/${matrimonyProfile.id}/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${matToken}`
                },
                body: JSON.stringify({ simulateSuccess: true })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setMatrimonyProfile(data.data.profile);
                setStatus('success');
            } else {
                setError(data.message || 'Payment failed. Please try again.');
                setStatus('idle');
            }
        } catch (err) {
            setError('Payment error. Please try again.');
            setStatus('idle');
        }
    };

    if (!serviceModal.isOpen) return null;

    const requiresPayment = serviceModal.type === 'marriage' && matrimonyProfile && matrimonyProfile.paymentStatus === 'unpaid';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeServiceModal}
                    className="absolute inset-0 bg-white/60 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 border border-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 font-display">
                                {serviceModal.type === 'marriage' && isMatLoginMode ? 'Login to Matrimony' : serviceModal.title}
                            </h2>
                            <button onClick={closeServiceModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gold-600">
                                <X size={20} />
                            </button>
                        </div>

                        {status === 'success' && !requiresPayment ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                                    {serviceModal.type === 'marriage' ? 'Payment Successful!' : 'Request Received!'}
                                </h3>
                                <p className="text-gray-500 mb-8">
                                    {serviceModal.type === 'marriage' ? 'Your Matrimony profile is now fully active.' : 'Our team will get back to you within 24 hours.'}
                                </p>
                                <button
                                    onClick={closeServiceModal}
                                    className="px-8 py-3 btn-primary text-white font-bold rounded-xl shadow-lg transition-all"
                                >
                                    Close
                                </button>
                            </motion.div>
                        ) : requiresPayment ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-8 text-center"
                            >
                                <div className="w-20 h-20 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-100">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">Activate Profile</h3>
                                <p className="text-gray-500 mb-6">Complete the lifetime registration fee to unlock matching tools.</p>
                                
                                <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-600">Registration Fee</span>
                                        <span className="font-bold text-xl text-gray-900">₹500</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Validity</span>
                                        <span>Lifetime</span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 mb-4">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handlePayment}
                                    disabled={status === 'payment_loading'}
                                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    {status === 'payment_loading' ? <Loader2 className="animate-spin" size={20} /> : 'Pay ₹500 Now'}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                        {error}
                                    </div>
                                )}
                                {serviceModal.type === 'marriage' && isMatLoginMode ? (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                                            <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="••••••••" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                                                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" minLength={2} maxLength={30} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="John" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                                                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" minLength={2} maxLength={30} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="john@example.com" />
                                        </div>

                                        <div className="space-y-1">
                                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number <span className="text-rose-400 font-normal normal-case tracking-normal">(10 digits)</span></label>
                                             <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" inputMode="numeric" minLength={10} maxLength={10} pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="9876543210" />
                                             {formData.phone.length > 0 && formData.phone.length < 10 && (
                                                 <p className="text-xs text-rose-500 mt-1">{10 - formData.phone.length} more digit{10 - formData.phone.length !== 1 ? 's' : ''} needed</p>
                                             )}
                                         </div>

                                        {serviceModal.type === 'marriage' && (
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upload Profile Photo (Max 50MB)</label>
                                                <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl transition-colors hover:border-gold-400">
                                                    {photoPreview ? (
                                                        <div className="relative w-32 h-32 group">
                                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-md" />
                                                            <button 
                                                                type="button"
                                                                onClick={() => { setProfilePhoto(null); setPhotoPreview(null); }}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center text-gray-400">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-xs font-semibold">Click to upload photo</span>
                                                        </div>
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        onChange={handleFileChange} 
                                                        className="hidden" 
                                                        id="profile-photo-upload"
                                                        required
                                                    />
                                                    <label htmlFor="profile-photo-upload" className="cursor-pointer text-xs bg-gold-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gold-600 transition-colors">
                                                        {profilePhoto ? 'Change Photo' : 'Choose File'}
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        {serviceModal.type === 'marriage' && (
                                             <div className="space-y-1">
                                                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Create Account Password <span className="text-rose-400 font-normal normal-case tracking-normal">(min 8 chars)</span></label>
                                                 <input required name="password" value={formData.password} onChange={handleChange} type="password" minLength={8} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="••••••••" />
                                                 {formData.password.length > 0 && formData.password.length < 8 && (
                                                     <p className="text-xs text-rose-500 mt-1">{8 - formData.password.length} more character{8 - formData.password.length !== 1 ? 's' : ''} needed</p>
                                                 )}
                                             </div>
                                         )}

                                        {serviceModal.type === 'marriage' && (
                                            <>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile For</label>
                                                        <select name="profileFor" value={formData.profileFor} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
                                                            <option>Myself</option>
                                                            <option>Son</option>
                                                            <option>Daughter</option>
                                                            <option>Sibling</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
                                                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date of Birth <span className="text-rose-400 font-normal normal-case tracking-normal">(18–60 yrs)</span></label>
                                                         <input required name="dob" value={formData.dob} onChange={handleChange} type="date" min={dobMin} max={dobMax} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" />
                                                     </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marital Status</label>
                                                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
                                                            <option>Never Married</option>
                                                            <option>Divorced</option>
                                                            <option>Widowed</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Religion</label>
                                                        <select name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
                                                            <option>Hindu</option>
                                                            <option>Christian</option>
                                                            <option>Muslim</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Caste / Sub-Caste</label>
                                                        <input required name="caste" value={formData.caste} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="E.g. Brahmin" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Education</label>
                                                        <input required name="education" value={formData.education} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Master's, B.Tech, etc." />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profession</label>
                                                        <input required name="profession" value={formData.profession} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Software Engineer" />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {serviceModal.type === 'it' && (
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preferred Course</label>
                                                <select name="preferredCourse" value={formData.preferredCourse} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none">
                                                    <option>Full Stack Development</option>
                                                    <option>Cloud & DevOps</option>
                                                    <option>Data Science & AI</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 btn-primary text-white font-bold rounded-xl shadow-lg shadow-gold-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <>{isMatLoginMode ? 'Login' : 'Submit Application'} <Send size={18} /></>}
                                    </button>
                                </div>
                                
                                {serviceModal.type === 'marriage' && (
                                    <div className="text-center mt-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setIsMatLoginMode(!isMatLoginMode)} 
                                            className="text-sm font-bold text-gray-500 hover:text-gold-600 transition-colors"
                                        >
                                            {isMatLoginMode ? "Need an account? Register Here" : "Already registered? Login Here"}
                                        </button>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ServiceModal;
