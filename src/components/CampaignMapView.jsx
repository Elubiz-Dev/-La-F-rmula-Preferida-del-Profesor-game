import React from 'react';
import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { playSound } from '../utils/sound';
import { Lock, Star, ChevronRight, Pin, Shield, Flame, Sparkles, Thermometer, Moon, Heart, Box, Trophy, Gift, GraduationCap } from 'lucide-react';

const ICONS = { Pin, Shield, Flame, Sparkles, Thermometer, Moon, Heart, Box, Trophy, Gift, GraduationCap };

const ACT_COLORS = {
  1: { border: 'border-emerald-700/50', bg: 'from-emerald-900/40 to-teal-900/20', badge: 'bg-emerald-700 text-emerald-100', label: 'Acto I — El Encuentro' },
  2: { border: 'border-amber-700/50', bg: 'from-amber-900/40 to-orange-900/20', badge: 'bg-amber-700 text-amber-100', label: 'Acto II — Conflictos y Vínculos' },
  3: { border: 'border-purple-700/50', bg: 'from-purple-900/40 to-pink-900/20', badge: 'bg-purple-700 text-purple-100', label: 'Acto III — Despedida y Legado' },
};

const DIFF_COLORS = {
  'Fácil': 'text-emerald-400 bg-emerald-950/60 border-emerald-700/40',
  'Normal': 'text-sky-400 bg-sky-950/60 border-sky-700/40',
  'Desafiante': 'text-amber-400 bg-amber-950/60 border-amber-700/40',
  'Difícil': 'text-rose-400 bg-rose-950/60 border-rose-700/40',
  'Épico': 'text-purple-400 bg-purple-950/60 border-purple-700/40',
  'Legendario': 'text-pink-400 bg-pink-950/60 border-pink-700/40',
};

const StarDisplay = ({ count, max = 3 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
    ))}
  </div>
);

export const CampaignMapView = ({ progress, onPlayChapter }) => {
  const { unlockedChapters, stars } = progress;

  const acts = [1, 2, 3];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Campaña Narrativa · 11 Capítulos</p>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
          Desbloquea la Historia del Profesor
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Supera cada minijuego para descubrir el siguiente capítulo, ganar estrellas y coleccionar cartas de la historia.
        </p>
        {/* Progreso Global */}
        <div className="inline-flex items-center gap-4 mt-2 px-5 py-2 rounded-full bg-black/40 border border-emerald-900/50 text-xs">
          <span className="text-slate-300">Capítulos desbloqueados: <strong className="text-emerald-400">{unlockedChapters.length}</strong>/11</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Estrellas: <strong className="text-amber-400">{Object.values(stars).reduce((a, b) => a + b, 0)}</strong>/33</span>
        </div>
      </div>

      {/* Actos */}
      {acts.map(actId => {
        const actChapters = CAMPAIGN_CHAPTERS.filter(c => c.act === actId);
        const theme = ACT_COLORS[actId];

        return (
          <div key={actId}>
            {/* Separador de Acto */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badge}`}>{theme.label}</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Grid de Capítulos del Acto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actChapters.map(chapter => {
                const isUnlocked = unlockedChapters.includes(chapter.id);
                const chapterStars = stars[chapter.id] || 0;
                const isCompleted = chapterStars > 0;
                const Icon = ICONS[chapter.icon] || Pin;
                const diffStyle = DIFF_COLORS[chapter.difficulty] || DIFF_COLORS['Normal'];

                return (
                  <div
                    key={chapter.id}
                    className={`relative rounded-3xl border bg-gradient-to-br p-5 transition-all duration-300 group
                      ${isUnlocked
                        ? `${theme.border} ${theme.bg} cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/40`
                        : 'border-slate-800 bg-slate-900/30 opacity-60 cursor-not-allowed'
                      } ${isCompleted ? 'ring-1 ring-amber-500/40' : ''}`}
                    onClick={() => isUnlocked && (playSound('click'), onPlayChapter(chapter.id))}
                  >
                    {/* Candado para capítulos bloqueados */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/30 backdrop-blur-sm z-10">
                        <div className="text-center space-y-2">
                          <Lock className="w-8 h-8 text-slate-500 mx-auto" />
                          <p className="text-xs text-slate-500 font-semibold">Completa el capítulo {chapter.id - 1}</p>
                        </div>
                      </div>
                    )}

                    {/* Contenido de la Tarjeta */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Icono del capítulo */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all
                          ${isUnlocked ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/5'}
                          ${isCompleted ? 'ring-2 ring-amber-400/50' : ''}`}>
                          <Icon className={`w-6 h-6 ${isCompleted ? 'text-amber-400' : isUnlocked ? 'text-white' : 'text-slate-500'}`} />
                        </div>

                        <div>
                          <p className="text-[11px] text-slate-400 font-mono">{chapter.badge}</p>
                          <h3 className={`text-base font-bold font-serif leading-tight ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                            {chapter.title}
                          </h3>
                          <p className={`text-xs mt-0.5 ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                            {chapter.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Estrellitas */}
                      <div className="flex-shrink-0">
                        <StarDisplay count={chapterStars} />
                      </div>
                    </div>

                    {/* Resumen del juego y dificultad */}
                    {isUnlocked && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffStyle}`}>
                            {chapter.difficulty}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold">🎮 {chapter.game.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {chapter.synopsis}
                        </p>

                        {/* Recompensa */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isCompleted ? 'bg-amber-900/30 border border-amber-700/40' : 'bg-white/5 border border-white/10'}`}>
                          <span className="text-base">{isCompleted ? '🏆' : '🎁'}</span>
                          <div>
                            <p className="text-[10px] text-slate-400">{isCompleted ? 'Recompensa obtenida:' : 'Recompensa al completar:'}</p>
                            <p className={`text-xs font-semibold ${isCompleted ? 'text-amber-300' : 'text-slate-300'}`}>
                              {chapter.rewardCard.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botón de Jugar */}
                    {isUnlocked && (
                      <button className={`w-full mt-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                        ${isCompleted
                          ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40 hover:bg-amber-600/30'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/60'
                        }`}>
                        {isCompleted ? (
                          <><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Jugar de Nuevo</>
                        ) : (
                          <>Jugar <ChevronRight className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

    </div>
  );
};
