import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Map, Package, Award, Star } from 'lucide-react';
import { playSound } from '../utils/sound';

export const Navbar = ({ activeTab, setActiveTab, soundEnabled, toggleSoundHandler, totalCards, totalStars }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const tabs = [
    { id: 'campaign', label: 'Campaña', icon: Map },
    { id: 'collection', label: 'Colección', icon: Package },
    { id: 'quiz', label: 'Trivia Final', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a1714]/95 backdrop-blur-md border-b border-emerald-900/40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg ring-1 ring-emerald-400/30 text-white font-bold text-xl font-serif">∞</div>
          <div>
            <h1 className="text-base font-bold font-serif text-white leading-tight">La Fórmula Preferida del Profesor</h1>
            <p className="text-[11px] text-emerald-400" style={{ fontFamily: 'Caveat, cursive' }}>博士の愛した数式 · Yōko Ogawa</p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-emerald-900/40">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { playSound('click'); setActiveTab(id); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* Stats + Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-black/30 border border-emerald-900/40 text-xs">
            <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" />{totalStars}</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-emerald-400"><Package className="w-3.5 h-3.5" />{totalCards}</span>
          </div>
          <button onClick={toggleSoundHandler} className="p-2 rounded-xl bg-black/30 border border-emerald-900/40 text-slate-400 hover:text-white transition-colors">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>
          <button onClick={toggleFullscreen} className="p-2 rounded-xl bg-black/30 border border-emerald-900/40 text-slate-400 hover:text-amber-400 transition-colors">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
