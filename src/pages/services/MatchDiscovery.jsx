import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, X, Search, Star, Sparkles, ArrowLeft,
    User, Phone, MapPin, BookOpen, Briefcase, Shield,
    ChevronDown, Check, Loader2, Crown, Activity, Calendar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import ProfileModal from '../../components/ProfileModal';

// ─── Utility Helpers ──────────────────────────────────────────────────────────

function calcAge(dob) {
    if (!dob) return null;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

function calcCompatibility(myProfile, otherProfile) {
    if (!myProfile || !otherProfile) return 0;
    let score = 40; 
    const me = myProfile.profileData || {};
    const them = otherProfile.profileData || {};

    if (me.religion && them.religion && me.religion === them.religion) score += 20;

    const myAge = calcAge(me.dob);
    const theirAge = calcAge(them.dob);
    if (myAge && theirAge) {
        const ageDiff = Math.abs(myAge - theirAge);
        if (ageDiff <= 3) score += 25;
        else if (ageDiff <= 7) score += 15;
        else if (ageDiff <= 12) score += 5;
    }

    if (me.maritalStatus === them.maritalStatus) score += 5;
    if (me.gender && them.gender && me.gender !== them.gender) score += 10;

    return Math.min(score, 99);
}

function getInitials(profile) {
    const f = profile?.firstName?.[0] || '';
    const l = profile?.lastName?.[0] || '';
    return (f + l).toUpperCase() || '?';
}

const AGE_RANGES = [
    { label: 'Any Age', min: 0, max: 200 },
    { label: '18 – 25', min: 18, max: 25 },
    { label: '26 – 32', min: 26, max: 32 },
    { label: '33 – 40', min: 33, max: 40 },
    { label: '40+', min: 40, max: 200 },
];

// ─── Premium Profile Card ─────────────────────────────────────────────────────

const MatchCard = ({ profile, myProfile, onViewProfile, index }) => {
    const [liked, setLiked] = useState(false);
    const { showToast } = useUI();
    
    const age = calcAge(profile.profileData?.dob);
    const compat = calcCompatibility(myProfile, profile);
    const isTopMatch = compat >= 75;

    const handleLike = (e) => {
        e.stopPropagation();
        setLiked(!liked);
        if (!liked) showToast(`Interest sent to ${profile.firstName}! 💕`, 'success');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            onClick={() => onViewProfile(profile)}
            className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
            {/* Background Image / Gradient */}
            {profile.profilePhoto ? (
                <img
                    src={`http://localhost:5000${profile.profilePhoto}`}
                    alt={profile.firstName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-300 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-rose-600 font-bold text-5xl font-display shadow-2xl">
                        {getInitials(profile)}
                    </div>
                </div>
            )}

            {/* Dark Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300" />
            
            {/* Top Match Badge */}
            {isTopMatch && (
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-bold shadow-xl">
                        <Sparkles size={12} className="text-pink-300" />
                        Top Match
                    </div>
                </div>
            )}

            {/* Compatibility Ring - Top Right */}
            <div className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shadow-xl">
                <span className="text-white font-bold text-sm tracking-tighter">{compat}%</span>
                <span className="text-white/70 text-[8px] uppercase tracking-wider -mt-1">Match</span>
            </div>

            {/* Quick Actions - Floating on hover */}
            <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                    onClick={handleLike}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 ${
                        liked 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/40 border border-white/30'
                    }`}
                >
                    <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Profile Info - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white font-display mb-1 flex items-center gap-2">
                    {profile.firstName} {profile.lastName?.charAt(0)}.
                    {age && <span className="text-white/80 font-normal text-xl">{age}</span>}
                    <Shield size={16} className="text-blue-400 fill-blue-400/20" />
                </h3>
                
                <div className="text-white/80 text-sm flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-rose-300" />
                    <span className="truncate">{profile.profileData?.profession || 'Professional'}</span>
                </div>

                {/* Tags Grid */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {profile.profileData?.religion && (
                        <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg text-xs font-medium">
                            {profile.profileData.religion}
                        </span>
                    )}
                    {profile.profileData?.education && (
                        <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg text-xs font-medium">
                            {profile.profileData.education}
                        </span>
                    )}
                    <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg text-xs font-medium">
                        {profile.profileData?.maritalStatus}
                    </span>
                </div>

                {/* View Details Text (appears on hover) */}
                <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-300 flex items-center">
                    <span className="text-pink-300 font-bold text-sm flex items-center gap-1">
                        View Full Profile <ArrowLeft size={14} className="rotate-180" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Profile Detail Modal (Sleek Side Sheet / Centered) ────────────────────────

const ProfileDetailModal = ({ profile, myProfile, onClose }) => {
    const { showToast } = useUI();
    const [interestSent, setInterestSent] = useState(false);
    
    if (!profile) return null;

    const age = calcAge(profile.profileData?.dob);
    const compat = calcCompatibility(myProfile, profile);

    const handleSendInterest = () => {
        setInterestSent(true);
        showToast(`Your interest has been safely delivered to ${profile.firstName}! 💌`, 'success');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
                >
                    {/* Header Image Area */}
                    <div className="relative h-64 shrink-0 bg-gray-100">
                        {profile.profilePhoto ? (
                            <img
                                src={`http://localhost:5000${profile.profilePhoto}`}
                                alt={profile.firstName}
                                className="w-full h-full object-cover object-top"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-5xl font-display shadow-xl">
                                    {getInitials(profile)}
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                        
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                            <div className="text-white">
                                <h2 className="text-4xl font-bold font-display flex items-end gap-2">
                                    {profile.firstName} {profile.lastName}
                                    {age && <span className="text-2xl text-white/80 font-normal mb-0.5">{age}</span>}
                                </h2>
                                <p className="flex items-center gap-2 mt-2 text-white/90">
                                    <Shield size={14} className="text-blue-400 fill-blue-400" /> Verified Profile
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                    ID: {profile.id.split('-')[0].toUpperCase()}
                                </p>
                            </div>
                            
                            {/* Big Action Button Overlay */}
                            <button
                                onClick={handleSendInterest}
                                disabled={interestSent}
                                className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-xl transition-all ${
                                    interestSent 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-105'
                                }`}
                            >
                                {interestSent ? <Check size={18} /> : <Heart size={18} fill="currentColor" />}
                                {interestSent ? 'Interest Sent' : 'Connect'}
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Details */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-gray-50">
                        {/* Mobile Connect Button */}
                        <div className="md:hidden mb-6">
                            <button
                                onClick={handleSendInterest}
                                disabled={interestSent}
                                className={`w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl font-bold shadow-lg transition-all ${
                                    interestSent 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                                }`}
                            >
                                {interestSent ? <Check size={18} /> : <Heart size={18} strokeWidth={2.5} />}
                                {interestSent ? 'Interest Sent' : 'Connect Now'}
                            </button>
                        </div>

                        {/* Compatibility Section */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 w-full">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                                    <Activity size={24} />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-gray-900">Match Compatibility</h3>
                                        <span className="text-xl font-bold text-rose-600 font-display">{compat}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${compat}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full rounded-full bg-gradient-to-r ${
                                                compat >= 75 ? 'from-green-400 to-emerald-500' : 'from-rose-400 to-pink-500'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <h3 className="font-bold text-gray-900 text-lg mb-4 ml-1">Personal Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {[
                                { label: 'Religion / Community', value: profile.profileData?.religion, sub: profile.profileData?.caste, icon: Star },
                                { label: 'Education', value: profile.profileData?.education, icon: BookOpen },
                                { label: 'Profession', value: profile.profileData?.profession, icon: Briefcase },
                                { label: 'Marital Status', value: profile.profileData?.maritalStatus, icon: Users },
                                { label: 'Date of Birth', value: profile.profileData?.dob ? new Date(profile.profileData.dob).toLocaleDateString() : 'N/A', icon: Calendar },
                                { label: 'Profile Created For', value: profile.profileData?.profileFor, icon: User },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-rose-100 transition-all">
                                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                                        <item.icon size={18} className="text-rose-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                                        <p className="text-sm font-semibold text-gray-900 my-0.5 leading-tight">{item.value || 'Not specified'}</p>
                                        {item.sub && <p className="text-xs text-gray-500">{item.sub}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ─── Floating Filter Bar ──────────────────────────────────────────────────────

const FloatingFilterBar = ({ filters, setFilters, stats }) => {
    return (
        <div className="sticky top-24 z-40 w-full px-4 transform -translate-y-6">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-white p-3 md:p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                        <select
                            value={filters.gender}
                            onChange={e => setFilters({ ...filters, gender: e.target.value })}
                            className="w-full bg-white border border-gray-100/50 text-gray-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 shadow-sm cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F43F5E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                        >
                            <option value="">Any Gender</option>
                            <option value="Male">Looking for Groom</option>
                            <option value="Female">Looking for Bride</option>
                        </select>

                        <select
                            value={filters.ageRange}
                            onChange={e => setFilters({ ...filters, ageRange: e.target.value })}
                            className="w-full bg-white border border-gray-100/50 text-gray-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 shadow-sm cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F43F5E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                        >
                            {AGE_RANGES.map(r => (
                                <option key={r.label} value={r.label}>{r.label}</option>
                            ))}
                        </select>

                        <select
                            value={filters.religion}
                            onChange={e => setFilters({ ...filters, religion: e.target.value })}
                            className="w-full bg-white border border-gray-100/50 text-gray-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 shadow-sm cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F43F5E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                        >
                            <option value="">Any Religion</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Christian</option>
                            <option>Other</option>
                        </select>

                        <select
                            value={filters.maritalStatus}
                            onChange={e => setFilters({ ...filters, maritalStatus: e.target.value })}
                            className="w-full bg-white border border-gray-100/50 text-gray-700 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 shadow-sm cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F43F5E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]"
                        >
                            <option value="">Any Status</option>
                            <option>Never Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                        </select>
                    </div>

                    <div className="shrink-0">
                        <span className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 px-5 py-3 rounded-xl font-bold text-sm shadow-sm md:w-auto w-full justify-center">
                            <Sparkles size={16} /> 
                            {stats.filtered} Profiles
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page Component ──────────────────────────────────────────────────────

const MatchDiscovery = () => {
    const navigate = useNavigate();
    const { matrimonyProfile, showToast, openProfile } = useUI();

    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [filters, setFilters] = useState({
        gender: '',
        ageRange: 'Any Age',
        religion: '',
        maritalStatus: '',
    });

    useEffect(() => {
        if (!matrimonyProfile) {
            navigate('/services/marriage');
            return;
        }
        if (matrimonyProfile.paymentStatus !== 'paid') {
            showToast('Please complete your profile activation first.', 'error');
            navigate('/services/marriage');
        }
    }, [matrimonyProfile, navigate, showToast]);

    useEffect(() => {
        const fetchProfiles = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/matrimony/profiles');
                const data = await res.json();
                if (data.success) {
                    const others = data.data.profiles.filter(p => p.id !== matrimonyProfile?.id);
                    setProfiles(others);
                }
            } catch (err) {
                showToast('Could not load profiles. Please try again.', 'error');
            } finally {
                setLoading(false);
            }
        };
        if (matrimonyProfile) fetchProfiles();
    }, [matrimonyProfile, showToast]);

    const filteredProfiles = useMemo(() => {
        return profiles.filter(p => {
            const age = calcAge(p.profileData?.dob) || 0;
            const ageRangeObj = AGE_RANGES.find(r => r.label === filters.ageRange) || AGE_RANGES[0];
            
            if (filters.gender && p.profileData?.gender !== filters.gender) return false;
            if (age && (age < ageRangeObj.min || age > ageRangeObj.max)) return false;
            if (filters.religion && p.profileData?.religion !== filters.religion) return false;
            if (filters.maritalStatus && p.profileData?.maritalStatus !== filters.maritalStatus) return false;
            return true;
        });
    }, [profiles, filters]);

    const sortedProfiles = useMemo(() => {
        return [...filteredProfiles].sort(
            (a, b) => calcCompatibility(matrimonyProfile, b) - calcCompatibility(matrimonyProfile, a)
        );
    }, [filteredProfiles, matrimonyProfile]);

    const topMatches = sortedProfiles.filter(p => calcCompatibility(matrimonyProfile, p) >= 75);
    const standardMatches = sortedProfiles.filter(p => calcCompatibility(matrimonyProfile, p) < 75);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* ─── Hero Banner ─── */}
            <section className="relative pt-24 pb-32 bg-[#1a0f1c] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-900/40 to-purple-900/40" />
                </div>

                <div className="container-custom relative z-10 flex flex-col items-center text-center">
                    <div 
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 cursor-pointer hover:bg-white/20 transition-all shadow-xl hover:-translate-y-1" 
                        onClick={openProfile}
                    >
                        {matrimonyProfile?.profilePhoto ? (
                            <img src={`http://localhost:5000${matrimonyProfile.profilePhoto}`} alt="You" className="w-8 h-8 rounded-full border border-white" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-xs">{getInitials(matrimonyProfile)}</div>
                        )}
                        <span className="text-white text-sm font-medium">Hello, {matrimonyProfile?.firstName} 👋</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 tracking-tight drop-shadow-lg">
                        Discover Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-400">Perfect Match</span>
                    </h1>
                    
                    <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        We've analyzed profiles based on your lifestyle, values, and preferences to bring you the most compatible connections.
                    </p>

                    <Link
                        to="/services/marriage"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest hover:bg-white/10 px-6 py-2 rounded-full"
                    >
                        <ArrowLeft size={16} />
                        Back to Matrimony
                    </Link>
                </div>
            </section>

            {/* ─── Floating Filter ─── */}
            <FloatingFilterBar 
                filters={filters} 
                setFilters={setFilters} 
                stats={{ total: profiles.length, filtered: sortedProfiles.length }} 
            />

            <div className="container-custom mt-12 px-4 sm:px-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-rose-100 border-t-rose-500 animate-[spin_2s_linear_infinite]" />
                            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-500 animate-pulse" fill="currentColor" size={28} />
                        </div>
                        <p className="text-gray-500 font-bold tracking-wide uppercase text-sm">Curating your matches...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {sortedProfiles.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-100/50">
                                    <Search size={32} className="text-rose-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-display">No Matches Found</h3>
                                <p className="text-gray-500 mb-8 px-8">We couldn't find any profiles matching your current filters. Try broadening your criteria or checking back later.</p>
                                <button
                                    onClick={() => setFilters({ gender: '', ageRange: 'Any Age', religion: '', maritalStatus: '' })}
                                    className="px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-rose-500 transition-colors shadow-lg"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-16"
                            >
                                {/* Top Matches Section */}
                                {topMatches.length > 0 && (
                                    <section>
                                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2">
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-900 font-display flex items-center gap-3">
                                                    Top Recommendations
                                                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-md">Premium</span>
                                                </h2>
                                                <p className="text-gray-500 mt-2 font-medium">Exceptional profiles with 75%+ compatibility rating</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {topMatches.map((profile, idx) => (
                                                <MatchCard key={profile.id} profile={profile} myProfile={matrimonyProfile} onViewProfile={setSelectedProfile} index={idx} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Other Matches Section */}
                                {standardMatches.length > 0 && (
                                    <section>
                                        <div className="mb-8 px-2">
                                            <h2 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-3">
                                                More Profiles to Explore
                                            </h2>
                                            <div className="w-12 h-1 bg-rose-200 rounded-full mt-3" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {standardMatches.map((profile, idx) => (
                                                <MatchCard key={profile.id} profile={profile} myProfile={matrimonyProfile} onViewProfile={setSelectedProfile} index={idx + topMatches.length} />
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Modals */}
            <ProfileDetailModal profile={selectedProfile} myProfile={matrimonyProfile} onClose={() => setSelectedProfile(null)} />
            <ProfileModal />
        </div>
    );
};

export default MatchDiscovery;
