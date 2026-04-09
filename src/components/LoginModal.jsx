import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../context/UIContext';

const LoginModal = () => {
    const { isLoginOpen, closeLogin, showToast, loginUser } = useUI();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const endpoint = isSignup ? 'register' : 'login';
        const payload = isSignup ? { name, email, password } : { email, password };
        try {
            const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                loginUser(data.data.token, data.data.user);
                showToast(isSignup ? 'Account created successfully!' : 'Login Successful!', 'success');
                closeLogin();
            } else {
                setError(data.message || (isSignup ? 'Registration failed' : 'Login failed'));
            }
        } catch (err) {
            setError('Could not connect to server. Is it running?');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setError('');
        setPassword('');
    };

    return (
        <AnimatePresence>
            {isLoginOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLogin}
                        className="absolute inset-0 bg-white/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 border border-gray-100"
                    >
                        <div className="relative h-32 bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16"></div>
                            <h2 className="text-3xl font-bold text-white relative z-10 font-display">
                                {isSignup ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <button
                                onClick={closeLogin}
                                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            {error && (
                                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {isSignup && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                                        <input
                                            type="text"
                                            required={isSignup}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800"
                                        />
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Password</label>
                                        {!isSignup && <a href="#" className="text-xs text-gold-600 font-semibold hover:underline">Forgot?</a>}
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" className="w-4 h-4 text-gold-500 rounded border-gray-300 focus:ring-gold-400" />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me for 30 days</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 btn-primary font-bold rounded-xl shadow-lg shadow-gold-200 hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isSignup ? "Create Account" : "Sign In to Dashboard")}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                {isSignup ? "Already have an account?" : "Don't have an account?"}
                                <button type="button" onClick={toggleMode} className="text-gold-600 font-bold hover:underline ml-1">
                                    {isSignup ? "Sign In Instead" : "Create Account"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
