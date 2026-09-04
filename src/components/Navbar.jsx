import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Map, Package, Award, Star, Sparkles, BookOpen } from 'lucide-react';
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
    { id: 'campaign', label: 'Campaña', icon: Map, badge: 'Arcade' },
    { id: 'story', label: 'Novela', icon: BookOpen, badge: '11 Cap.' },
    { id: 'mathlab', label: 'Laboratorio', icon: Sparkles, badge: 'Math' },
    { id: 'collection', label: 'Colección', icon: Package, badge: `${totalCards}/11` },
    { id: 'quiz', label: 'Trivia', icon: Award, badge: 'Diploma' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#071311]/85 backdrop-blur-xl border-b border-emerald-500/20 px-4 py-3 shadow-lg shadow-black/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">

        {/* Logo & Título con estilo japonés y matemático */}
        <div 
          onClick={() => { playSound('click'); setActiveTab('campaign'); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-600 flex items-center justify-center shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40 text-white font-serif text-2xl font-bold group-hover:scale-105 transition-transform">
              <span>∞</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 ring-2 ring-[#071311] flex items-center justify-center text-[9px] font-bold text-black animate-pulse">
              ★
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 leading-tight">
                La Fórmula Preferida del Profesor
              </h1>
            </div>
            <p className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1.5" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.05rem' }}>
              <span>博士の愛した数式</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-300/90">Yōko Ogawa</span>
            </p>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <nav className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-emerald-900/40 shadow-inner">
          {tabs.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { playSound('click'); setActiveTab(id); }}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{label}</span>
                {badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono hidden md:inline-block ${
                    isActive ? 'bg-black/30 text-emerald-200' : 'bg-white/5 text-slate-500'
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Estadísticas de jugador + controles */}
        <div className="flex items-center gap-2">
          {/* Estrellas y cartas */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs shadow-inner">
            <div className="flex items-center gap-1 text-amber-400 font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{totalStars}</span>
              <span className="text-[10px] text-slate-500 font-normal">/33</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-emerald-400 font-bold font-mono">
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>{totalCards}</span>
              <span className="text-[10px] text-slate-500 font-normal">/11</span>
            </div>
          </div>

          {/* Botón de Sonido */}
          <button
            onClick={toggleSoundHandler}
            title={soundEnabled ? "Silenciar audio" : "Activar audio"}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-400'
                : 'bg-rose-950/30 border-rose-800/40 text-rose-400 hover:bg-rose-900/40'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Botón Pantalla Completa */}
          <button
            onClick={toggleFullscreen}
            title="Pantalla completa"
            className="p-2 rounded-xl bg-black/40 border border-emerald-900/40 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
