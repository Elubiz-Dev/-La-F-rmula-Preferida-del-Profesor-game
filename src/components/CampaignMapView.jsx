import React, { useState } from 'react';
import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { playSound } from '../utils/sound';
import { 
  Lock, Star, ChevronRight, Pin, Shield, Flame, Sparkles, 
  Thermometer, Moon, Heart, Box, Trophy, Gift, GraduationCap, 
  CheckCircle2, Compass, Play, Zap, Unlock
} from 'lucide-react';

const ICONS = { Pin, Shield, Flame, Sparkles, Thermometer, Moon, Heart, Box, Trophy, Gift, GraduationCap };

const ACT_METADATA = {
  1: {
    title: 'Acto I — El Encuentro y la Rutina',
    subtitle: 'Capítulos 1 al 4 · Los números amigos y el paraguas',
    themeGradient: 'from-emerald-950/80 via-emerald-900/30 to-teal-950/20',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    badgeStyle: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/40',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]',
  },
  2: {
    title: 'Acto II — Conflictos, Fiebre y la Belleza de Euler',
    subtitle: 'Capítulos 5 al 8 · El béisbol y la fórmula trascendental',
    themeGradient: 'from-amber-950/80 via-amber-900/30 to-orange-950/20',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    badgeStyle: 'bg-amber-900/80 text-amber-200 border-amber-500/40',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
  },
  3: {
    title: 'Acto III — El Salón de la Fama y el Legado Eterno',
    subtitle: 'Capítulos 9 al 11 · El guante de Enatsu y la despedida',
    themeGradient: 'from-purple-950/80 via-indigo-900/30 to-pink-950/20',
    borderColor: 'border-purple-500/30',
    accentColor: 'text-purple-400',
    badgeStyle: 'bg-purple-900/80 text-purple-200 border-purple-500/40',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
  },
};

const DIFFICULTY_STYLES = {
  'Fácil': 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40',
  'Normal': 'text-sky-300 bg-sky-950/80 border-sky-500/40',
  'Desafiante': 'text-amber-300 bg-amber-950/80 border-amber-500/40',
  'Difícil': 'text-rose-300 bg-rose-950/80 border-rose-500/40',
  'Épico': 'text-purple-300 bg-purple-950/80 border-purple-500/40',
  'Legendario': 'text-pink-300 bg-pink-950/80 border-pink-500/40',
};

const StarRating = ({ count, max = 3 }) => (
  <div className="flex gap-1 items-center">
    {Array.from({ length: max }).map((_, i) => {
      const isFilled = i < count;
      return (
        <Star
          key={i}
          className={`w-4 h-4 transition-all ${
            isFilled
              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
              : 'text-slate-700/80'
          }`}
        />
      );
    })}
  </div>
);

export const CampaignMapView = ({ progress, onPlayChapter }) => {
  const { unlockedChapters, stars, cards } = progress;
  const [selectedAct, setSelectedAct] = useState('all');

  const totalStars = Object.values(stars).reduce((a, b) => a + b, 0);
  const totalChapters = CAMPAIGN_CHAPTERS.length;
  const completedCount = Object.keys(stars).length;
  const progressPct = Math.round((completedCount / totalChapters) * 100);

  // Determinar Rango del Jugador
  let playerRank = 'Nuevo Asistente';
  let rankColor = 'text-slate-300';
  if (totalStars >= 30) {
    playerRank = 'Catedrático de Euler';
    rankColor = 'text-amber-300 font-extrabold';
  } else if (totalStars >= 20) {
    playerRank = 'Compañero Inseparable de Root';
    rankColor = 'text-purple-300 font-bold';
  } else if (totalStars >= 10) {
    playerRank = 'Guardián de los Números Amigos';
    rankColor = 'text-emerald-300 font-bold';
  } else if (totalStars >= 3) {
    playerRank = 'Aprendiz de la Casa';
    rankColor = 'text-sky-300';
  }

  const acts = [1, 2, 3];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fade-in">

      {/* ================================================================ */}
      {/* HERO BANNER — Progreso Global y Rango */}
      {/* ================================================================ */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-500/30 p-6 sm:p-8">
        {/* Glow de fondo decorativo */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campaña Narrativa · 11 Capítulos Arcade</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              La Odisea del <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">Profesor y Root</span>
            </h2>
            
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Supera cada desafío de habilidad y reflejos para desbloquear la historia, ganar estrellas y coleccionar las 11 cartas de recuerdos.
            </p>
          </div>

          {/* Tarjeta de Rango & Progreso */}
          <div className="w-full md:w-auto flex-shrink-0 bg-black/50 border border-emerald-500/20 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 min-w-[260px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Tu Rango:</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 ${rankColor}`}>
                {playerRank}
              </span>
            </div>

            {/* Barra de Progreso */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Progreso Historia</span>
                <strong className="text-emerald-400">{progressPct}%</strong>
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/10 font-mono">
              <span>⭐ <strong className="text-amber-300">{totalStars}</strong>/33</span>
              <span>🎴 <strong className="text-emerald-300">{cards.length}</strong>/11</span>
              <span>📖 <strong className="text-teal-300">{completedCount}</strong>/11</span>
            </div>
          </div>
        </div>

        {/* Filtros rápidos de Actos */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono mr-1">Filtrar:</span>
          {[
            { id: 'all', label: 'Todos los Actos' },
            { id: '1', label: 'Acto I (Cap. 1-4)' },
            { id: '2', label: 'Acto II (Cap. 5-8)' },
            { id: '3', label: 'Acto III (Cap. 9-11)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playSound('click'); setSelectedAct(tab.id); }}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                selectedAct === tab.id
                  ? 'bg-emerald-600/40 border border-emerald-400/50 text-emerald-200 shadow'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* LISTADO DE ACTOS Y CAPÍTULOS */}
      {/* ================================================================ */}
      {acts
        .filter(actId => selectedAct === 'all' || selectedAct === String(actId))
        .map(actId => {
          const actChapters = CAMPAIGN_CHAPTERS.filter(c => c.act === actId);
          const meta = ACT_METADATA[actId];
          const actCompleted = actChapters.filter(c => (stars[c.id] || 0) > 0).length;

          return (
            <section key={actId} className="space-y-4">
              {/* Encabezado del Acto */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full border ${meta.badgeStyle}`}>
                    Acto {actId}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white">{meta.title}</h3>
                    <p className="text-xs text-slate-400">{meta.subtitle}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 self-start sm:self-auto bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  Completados: <strong className={meta.accentColor}>{actCompleted}</strong> / {actChapters.length}
                </span>
              </div>

              {/* Grid de Capítulos del Acto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {actChapters.map(chapter => {
                  const isUnlocked = unlockedChapters.includes(chapter.id);
                  const chapterStars = stars[chapter.id] || 0;
                  const isCompleted = chapterStars > 0;
                  const Icon = ICONS[chapter.icon] || Pin;
                  const diffBadge = DIFFICULTY_STYLES[chapter.difficulty] || DIFFICULTY_STYLES['Normal'];

                  return (
                    <div
                      key={chapter.id}
                      onClick={() => {
                        if (isUnlocked) {
                          playSound('click');
                          onPlayChapter(chapter.id);
                        }
                      }}
                      className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                        isUnlocked
                          ? `bg-gradient-to-br ${meta.themeGradient} ${meta.borderColor} cursor-pointer hover:scale-[1.02] hover:-translate-y-1 shadow-lg ${meta.glowColor}`
                          : 'bg-[#091513]/40 border-slate-800/80 opacity-60 cursor-not-allowed'
                      } ${isCompleted ? 'ring-1 ring-amber-400/40 shadow-emerald-950/40' : ''}`}
                    >
                      {/* Candado para capítulos bloqueados */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50 backdrop-blur-sm z-20">
                          <div className="text-center p-4 space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
                              <Lock className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-semibold text-slate-300">Capítulo Bloqueado</p>
                            <p className="text-[11px] text-slate-500">Supera el Capítulo {chapter.id - 1} para desbloquear</p>
                          </div>
                        </div>
                      )}

                      {/* Contenido Superior de la Tarjeta */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3.5">
                            {/* Icono temático */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-md ${
                              isCompleted
                                ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-black ring-2 ring-amber-300'
                                : isUnlocked
                                  ? 'bg-white/10 text-white ring-1 ring-white/20 group-hover:bg-white/20'
                                  : 'bg-white/5 text-slate-600'
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono text-emerald-400/90 font-semibold">{chapter.badge}</span>
                                {isCompleted && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.2 rounded-full border border-amber-500/40">
                                    <CheckCircle2 className="w-3 h-3 text-amber-400" /> Superado
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors leading-tight mt-0.5">
                                {chapter.title}
                              </h4>
                              <p className="text-xs text-slate-400 font-sans mt-0.5">
                                {chapter.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Estrellas */}
                          <div className="flex-shrink-0 pt-0.5">
                            <StarRating count={chapterStars} />
                          </div>
                        </div>

                        {/* Cita del libro y resumen */}
                        <div className="space-y-2">
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 italic bg-black/25 p-2.5 rounded-xl border border-white/5" style={{ fontFamily: 'Playfair Display, serif' }}>
                            "{chapter.quote}"
                          </p>

                          {/* Minijuego & Dificultad */}
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium truncate">
                              <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span className="truncate">{chapter.game.title}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono flex-shrink-0 ${diffBadge}`}>
                              {chapter.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Contenido Inferior: Recompensa & Botón de Acción */}
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                        {/* Carta Recompensa Preview */}
                        <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                          isCompleted
                            ? 'bg-amber-950/40 border border-amber-500/30 text-amber-200'
                            : 'bg-white/5 border border-white/10 text-slate-300'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-base">{isCompleted ? '🏆' : '🎴'}</span>
                            <span className="font-semibold truncate max-w-[170px]">{chapter.rewardCard.name}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 bg-black/30 px-2 py-0.5 rounded-md">
                            {chapter.rewardCard.type}
                          </span>
                        </div>

                        {/* Botón de Jugar */}
                        {isUnlocked && (
                          <button 
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                              isCompleted
                                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30'
                                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-teal-400 shadow-emerald-950/80 hover:shadow-lg'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span>Mejorar Puntuación</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 fill-white text-white" />
                                <span>Jugar Capítulo</span>
                                <ChevronRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

    </div>
  );
};
