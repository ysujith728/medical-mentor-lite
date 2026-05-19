import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const QuizConfigurator = () => {
    const navigate = useNavigate();
    const { setQuizConfig, resetQuizState } = useAppStore();
    const [topic, setTopic] = useState('Pathology');
    const [diff, setDiff] = useState('Medium');
    const [time, setTime] = useState(10);
    
    const handleStart = () => {
        const numQuestions = Math.max(1, Math.floor(time / (diff === 'Easy' ? 1 : diff === 'Hard' ? 2 : 1.5)));
        setQuizConfig({ topic, difficulty: diff, timeLimit: time, numQuestions });
        resetQuizState();
        navigate('/quiz/engine');
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-inter text-gray-900 pt-8 px-6 lg:px-8 max-w-7xl mx-auto flex gap-6 flex-col lg:flex-row">
            <div className="flex-1 space-y-5">
                <h1 className="text-3xl font-display text-gray-900 mb-6">Exam Configuration</h1>
                
                <div className="card-panel-elevated p-6 lg:p-8 rounded-2xl relative overflow-hidden">
                    <label className="block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-2">Topic Search</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-5 text-gray-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-base mb-4 placeholder:text-gray-400"
                        placeholder="e.g. Cardiology, Action Potentials..."
                    />
                    
                    <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
                        <span className="material-symbols-outlined text-indigo-500 text-sm mt-0.5">auto_spark</span>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            <strong className="text-gray-700">How the AI prepares your quiz:</strong> The neural engine scans medical contexts to compile original, challenging scenarios focused on <em>{topic || 'your topic'}</em>. It intelligently adjusts the clinical complexity and length.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">Difficulty Level</label>
                            <div className="relative">
                                <select value={diff} onChange={(e) => setDiff(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-5 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-gray-900 cursor-pointer">
                                    <option>Easy</option><option>Medium</option><option>Hard</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">Time to Complete</label>
                            <div className="relative">
                                <select value={time} onChange={(e) => setTime(Number(e.target.value))}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-5 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-gray-900 cursor-pointer">
                                    <option value={5}>5 Minutes</option><option value={10}>10 Minutes</option><option value={15}>15 Minutes</option><option value={30}>30 Minutes</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleStart}
                    className="w-full py-4 mt-3 rounded-full bg-gray-900 text-white font-semibold text-base hover:bg-gray-800 active:scale-[0.99] transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    Start Exam ({Math.max(1, Math.floor(time / (diff === 'Easy' ? 1 : diff === 'Hard' ? 2 : 1.5)))} Qs)
                    <span className="material-symbols-outlined">rocket_launch</span>
                </button>
            </div>

            <div className="lg:w-[320px]">
                <div className="card-panel p-6 rounded-2xl h-full relative overflow-hidden">
                    <div className="flex items-center gap-3 text-indigo-600 mb-6">
                        <span className="material-symbols-outlined text-3xl">psychology</span>
                        <h2 className="text-lg font-semibold">Neural Engine</h2>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        MEDIX AI creates highly customized quiz scenarios using advanced reasoning. Questions are dynamically compiled to match your parameters.
                    </p>
                    <ul className="space-y-5 text-sm text-gray-500 flex-1">
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-indigo-500 text-lg flex-shrink-0">check_circle</span>
                            <div><span className="text-gray-900 font-semibold block mb-0.5">Adaptive Load</span>Questions generated based on your time limit and difficulty level.</div>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-violet-500 text-lg flex-shrink-0">schedule</span>
                            <div><span className="text-gray-900 font-semibold block mb-0.5">Precision Pacing</span>Harder difficulty assumes more complex scenarios, automatically adjusting question count.</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QuizConfigurator;
