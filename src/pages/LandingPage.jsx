import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Bell, Sun, Moon } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import useAuthStore from '../store/useAuthStore';
import JAMAAnimatedLogo from '../components/JAMAAnimatedLogo';

const LandingPage = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandOrigin, setExpandOrigin] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const previewRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleDashboardClick = () => {
    if (isExpanding) return;
    const rect = previewRef.current.getBoundingClientRect();
    setExpandOrigin({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      vw: window.innerWidth,
      vh: window.innerHeight,
    });
    setIsExpanding(true);
    setTimeout(() => navigate('/dashboard'), 1050);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative transition-colors duration-300"
      style={{ background: darkMode ? 'hsl(222 18% 9%)' : 'hsl(0 0% 98%)' }}
    >
      {/* Background Video — brighter opacity */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ opacity: darkMode ? 0.55 : 0.45 }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4" type="video/mp4" />
      </video>

      {/* Subtle gradient overlay so text stays readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: darkMode
            ? 'linear-gradient(to bottom, rgba(13,14,23,0.55) 0%, rgba(13,14,23,0.3) 50%, rgba(13,14,23,0.7) 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.65) 100%)',
        }}
      />

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center w-full h-full">

        {/* Hero content — fades out when expanding */}
        <motion.div
          className="w-full flex flex-col items-center shrink-0"
          animate={isExpanding ? { opacity: 0, y: -30, scale: 0.97 } : {}}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Navbar */}
          <nav className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 font-inter shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className={`text-xl font-semibold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ✦ Medix AI
                </span>
                <span className={`text-[8px] font-bold tracking-[0.18em] uppercase ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                  developed by
                </span>
              </div>
              <div className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
                <JAMAAnimatedLogo size="small" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/terminology', label: 'Study Library' },
                { to: '/quiz', label: 'Practice Exams' },
                { to: '/anatomy', label: 'Visualizer' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm transition-colors ${
                    darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3 mr-2">
                <button className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                  <Bell className="w-4 h-4" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="relative p-0.5 rounded-full transition-all duration-300 flex items-center
                             border border-white/20"
                  style={{ width: '52px', height: '26px' }}
                >
                  <span
                    className="absolute inset-0 rounded-full transition-colors duration-300"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                        : 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
                    }}
                  />
                  <span
                    className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full shadow-md transition-all duration-300"
                    style={{
                      transform: darkMode ? 'translateX(26px)' : 'translateX(0px)',
                      background: darkMode ? '#6366f1' : '#ffffff',
                    }}
                  >
                    {darkMode
                      ? <Moon className="w-3 h-3 text-white" />
                      : <Sun className="w-3 h-3 text-indigo-500" />
                    }
                  </span>
                </button>
              </div>

              {useAuthStore.getState().user ? (
                <div className="flex gap-2">
                  <Link to="/dashboard">
                    <button className={`rounded-full px-5 py-2 text-sm font-medium font-inter transition-all
                      ${darkMode
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}>
                      Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={async () => {
                      await useAuthStore.getState().signOut();
                      navigate('/login');
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-medium font-inter transition-all border
                      ${darkMode
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                      }`}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login">
                    <button className={`rounded-full px-5 py-2 text-sm font-medium font-inter transition-all
                      ${darkMode
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}>
                      Sign In
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className={`rounded-full px-5 py-2 text-sm font-medium font-inter transition-all border
                      ${darkMode
                        ? 'border-indigo-400/50 text-indigo-300 hover:bg-indigo-900/30'
                        : 'border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                      }`}>
                      Admin Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Hero text */}
          <div className="flex flex-col items-center pt-6 md:pt-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-inter shadow-sm backdrop-blur-sm ${
                darkMode
                  ? 'border-white/20 bg-white/10 text-white/80'
                  : 'border-gray-300/60 bg-white/60 text-gray-600'
              }`}
            >
              Powered by Gemini AI ✨
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-center font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight max-w-xl ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              The <em className="font-display" style={{ fontStyle: 'italic' }}>Medical</em> Engine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-4 text-center text-base md:text-lg max-w-[650px] leading-relaxed font-inter ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Your AI-powered companion for mastering medical terminology, exploring 3D anatomy, and conquering adaptive clinical assessments—accelerating your path from student to specialist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 flex items-center gap-3"
            >
              <Link to="/dashboard">
                <button className={`rounded-full px-6 py-3.5 text-sm font-medium font-inter transition-all ${
                  darkMode
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Learn
                </button>
              </Link>
              <button
                className={`h-11 w-11 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm ${
                  darkMode
                    ? 'bg-white/15 hover:bg-white/25 border border-white/20'
                    : 'bg-white/70 hover:bg-white border border-gray-200/60'
                }`}
              >
                <Play className={`h-4 w-4 fill-current ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isExpanding ? { opacity: 0 } : { opacity: 1, y: 0 }}
          transition={isExpanding ? { duration: 0.15 } : { duration: 0.8, delay: 0.5 }}
          className="mt-6 w-full max-w-5xl px-4"
        >
          <div
            ref={previewRef}
            onClick={handleDashboardClick}
            className="rounded-2xl overflow-hidden p-3 md:p-4 cursor-pointer group relative"
            style={{
              background: darkMode
                ? 'rgba(30, 30, 50, 0.55)'
                : 'rgba(255, 255, 255, 0.45)',
              border: darkMode
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: darkMode
                ? '0 25px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 25px 80px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-3 md:inset-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-black/15 backdrop-blur-[2px] rounded-xl">
              <div className="bg-white/95 text-gray-900 px-6 py-3 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2 border border-gray-200">
                <span className="material-symbols-outlined text-base">open_in_full</span>
                Click to explore Dashboard
              </div>
            </div>

            {/* Static Dashboard Preview — no API calls */}
            <div className="rounded-xl overflow-hidden pointer-events-none select-none relative" style={{ height: '50vh', minHeight: '360px' }}>
              <div className="absolute inset-0 flex flex-col p-8" style={{ background: darkMode ? 'hsl(222 18% 13%)' : '#ffffff' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40" />
                  <div>
                    <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
                    <div className="h-3 w-32 rounded bg-gray-100 dark:bg-gray-800" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="rounded-xl p-4 border border-gray-100 dark:border-gray-800" style={{ background: darkMode ? 'hsl(222 18% 16%)' : '#f8fafc' }}>
                      <div className="h-3 w-20 rounded bg-indigo-100 dark:bg-indigo-900/30 mb-3" />
                      <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  ))}
                </div>
                <div className="flex-1 rounded-xl border border-gray-100 dark:border-gray-800 p-4" style={{ background: darkMode ? 'hsl(222 18% 16%)' : '#f8fafc' }}>
                  <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
                  <div className="space-y-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-indigo-200 dark:bg-indigo-800" />
                        <div className="h-3 rounded bg-gray-100 dark:bg-gray-800" style={{ width: `${60 + i * 8}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EXPANDING BOUNDARY ANIMATION */}
      <AnimatePresence>
        {isExpanding && expandOrigin && (
          <motion.div
            key="expand-boundary"
            className="fixed z-[100] overflow-hidden"
            initial={{
              top: expandOrigin.top,
              left: expandOrigin.left,
              width: expandOrigin.width,
              height: expandOrigin.height,
              borderRadius: 16,
            }}
            animate={{
              top: 0,
              left: 0,
              width: expandOrigin.vw,
              height: expandOrigin.vh,
              borderRadius: 0,
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="origin-top-left"
              style={{
                width: expandOrigin.vw,
                minHeight: expandOrigin.vh,
                overflow: 'auto',
                background: darkMode ? 'hsl(222 18% 13%)' : '#ffffff',
              }}
              initial={{ scale: expandOrigin.width / expandOrigin.vw }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-lg font-medium text-gray-500 animate-pulse">Loading Dashboard...</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTRO SCREEN SPLASH OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="splash-overlay"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              y: '-100vh',
              opacity: 0,
              transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
            style={{ background: darkMode ? 'hsl(222 18% 9%)' : 'hsl(0 0% 98%)' }}
          >
            <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl px-6">
              {/* Developed by */}
              <motion.span
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-1 ${
                  darkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              >
                developed by
              </motion.span>
              {/* LARGE logo */}
              <JAMAAnimatedLogo size="large" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
