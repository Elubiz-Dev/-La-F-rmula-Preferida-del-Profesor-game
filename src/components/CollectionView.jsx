import React, { useState } from 'react';
import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { playSound } from '../utils/sound';
import { Star, Lock, Package, Sparkles, Award, X, Printer, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

const RARITY_THEMES = {
  'Reliquia': {
    border: 'border-amber-500/60',
    bg: 'from-amber-900/60 via-amber-800/30 to-yellow-950/40',
    text: 'text-amber-300',
    tag: 'bg-amber-950/90 text-amber-200 border-amber-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]',
  },
  'Símbolo': {
    border: 'border-indigo-500/60',
    bg: 'from-indigo-900/60 via-purple-900/30 to-slate-950/40',
    text: 'text-indigo-300',
    tag: 'bg-indigo-950/90 text-indigo-200 border-indigo-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]',
  },
  'Objeto de Colección': {
    border: 'border-rose-500/60',
    bg: 'from-rose-900/60 via-pink-900/30 to-slate-950/40',
    text: 'text-rose-300',
    tag: 'bg-rose-950/90 text-rose-200 border-rose-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.4)]',
  },
  'Recuerdo': {
    border: 'border-teal-500/60',
    bg: 'from-teal-900/60 via-emerald-900/30 to-slate-950/40',
    text: 'text-teal-300',
    tag: 'bg-teal-950/90 text-teal-200 border-teal-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]',
  },
  'Entrada Vintage': {
    border: 'border-orange-500/60',
    bg: 'from-orange-900/60 via-amber-900/30 to-slate-950/40',
    text: 'text-orange-300',
    tag: 'bg-orange-950/90 text-orange-200 border-orange-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]',
  },
  'Obra Maestra': {
    border: 'border-violet-500/60',
    bg: 'from-violet-900/70 via-purple-900/40 to-slate-950/40',
    text: 'text-violet-300',
    tag: 'bg-violet-950/90 text-violet-200 border-violet-500/50',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
  },
  'Reliquia Familiar': {
    border: 'border-emerald-500/60',
    bg: 'from-emerald-900/60 via-teal-900/30 to-slate-950/40',
    text: 'text-emerald-300',
    tag: 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]',
  },
  'Trofeo': {
    border: 'border-yellow-500/60',
    bg: 'from-yellow-900/60 via-amber-900/30 to-slate-950/40',
    text: 'text-yellow-300',
    tag: 'bg-yellow-950/90 text-yellow-200 border-yellow-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]',
  },
  'Recuerdo Íntimo': {
    border: 'border-pink-500/60',
    bg: 'from-pink-900/60 via-rose-900/30 to-slate-950/40',
    text: 'text-pink-300',
    tag: 'bg-pink-950/90 text-pink-200 border-pink-500/50',
    glow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]',
  },
  'Legado Eterno': {
    border: 'border-cyan-400/70 ring-1 ring-cyan-300/40',
    bg: 'from-cyan-950/80 via-teal-900/40 to-blue-950/50',
    text: 'text-cyan-200',
    tag: 'bg-cyan-950/90 text-cyan-200 border-cyan-400/60',
    glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]',
  },
};

const CARD_EMOJIS = {
  1: '⌚', 2: '☂️', 3: '⚾', 4: '🌸', 5: '🏟️', 6: '🔑',
  7: '📜', 8: '📷', 9: '🥇', 10: '🧤', 11: '🍵'
};

export const CollectionView = ({ progress }) => {
  const { cards, stars } = progress;
  const totalPossible = CAMPAIGN_CHAPTERS.length;
  const collected = cards.length;
  const [selectedCard, setSelectedCard] = useState(null);
  const [filterRarity, setFilterRarity] = useState('all');

  const openCardDetail = (chapter) => {
    playSound('click');
    setSelectedCard(chapter);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Álbum de Recuerdos Coleccionables</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
          Tus Cartas y Reliquias
        </h2>

        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Cada carta representa un objeto, momento o símbolo sagrado del profesor y su familia adoptiva. Haz clic en cualquiera para examinar su historia oculta.
        </p>

        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-black/50 border border-amber-500/30 text-xs shadow-lg">
          <Package className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">Coleccionadas: <strong className="text-amber-400 font-bold font-mono">{collected}</strong> de <strong className="text-white font-bold font-mono">{totalPossible}</strong></span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 font-mono font-semibold">{Math.round((collected / totalPossible) * 100)}% Completado</span>
        </div>
      </div>

      {/* Grid de Cartas Coleccionables */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {CAMPAIGN_CHAPTERS.map(chapter => {
          const isUnlocked = cards.includes(chapter.rewardCard.name);
          const chapterStars = stars[chapter.id] || 0;
          const rarity = chapter.rewardCard.type;
          const theme = RARITY_THEMES[rarity] || RARITY_THEMES['Recuerdo'];

          return (
            <div
              key={chapter.id}
              onClick={() => isUnlocked && openCardDetail(chapter)}
              className={`foil-card relative rounded-3xl border p-4 sm:p-5 text-center flex flex-col justify-between transition-all ${
                isUnlocked
                  ? `bg-gradient-to-br ${theme.bg} ${theme.border} cursor-pointer shadow-lg ${theme.glow}`
                  : 'bg-black/30 border-white/5 opacity-40 cursor-not-allowed'
              }`}
            >
              {/* Candado para cartas bloqueadas */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/60 backdrop-blur-sm z-10 p-3">
                  <Lock className="w-6 h-6 text-slate-500 mb-1" />
                  <p className="text-[10px] text-slate-400 font-semibold">Supera el Cap. {chapter.id}</p>
                </div>
              )}

              {/* Parte Superior: Rareza y Emoji */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-slate-400">Nº {chapter.id.toString().padStart(2, '0')}</span>
                  {isUnlocked && (
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${theme.tag}`}>
                      {rarity}
                    </span>
                  )}
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform">
                  {isUnlocked ? CARD_EMOJIS[chapter.id] : '❓'}
                </div>
              </div>

              {/* Parte Central: Título y descripción breve */}
              <div className="space-y-1.5 my-3">
                <h4 className={`text-xs sm:text-sm font-bold font-serif leading-tight ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                  {isUnlocked ? chapter.rewardCard.name : `Secreto del Cap. ${chapter.id}`}
                </h4>
                {isUnlocked && (
                  <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                    {chapter.rewardCard.desc}
                  </p>
                )}
              </div>

              {/* Parte Inferior: Estrellas de maestría */}
              <div className="pt-2 border-t border-white/10 flex justify-center items-center gap-1">
                {isUnlocked ? (
                  [1, 2, 3].map(i => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= chapterStars
                          ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]'
                          : 'text-slate-700'
                      }`}
                    />
                  ))
                ) : (
                  <span className="text-[10px] text-slate-600 font-mono">Bloqueado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DETALLE DE CARTA */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-amber-500/40 p-6 sm:p-8 space-y-5 shadow-2xl">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-amber-400/50 flex items-center justify-center text-5xl shadow-xl animate-float">
                {CARD_EMOJIS[selectedCard.id]}
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300 font-mono">
                  {selectedCard.rewardCard.type} · Capítulo {selectedCard.id}
                </span>
                <h3 className="text-2xl font-bold font-serif text-white mt-1">
                  {selectedCard.rewardCard.name}
                </h3>
              </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-white">📖 Significado en la Historia:</p>
              <p>{selectedCard.rewardCard.desc}</p>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs italic text-amber-200 leading-relaxed text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              "{selectedCard.quote}"
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg"
            >
              Cerrar Detalle
            </button>
          </div>
        </div>
      )}

      {/* DIPLOMA FINAL DE COLECCIÓN COMPLETA */}
      {collected >= totalPossible && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950/80 via-yellow-950/50 to-emerald-950/80 border-2 border-amber-400/80 p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center text-4xl font-serif font-extrabold shadow-xl ring-4 ring-amber-300/30">
            ∞
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">Logro Máximo Desbloqueado</span>
            <h3 className="text-3xl font-extrabold font-serif text-amber-200">
              ¡Álbum de Recuerdos Completo!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Has rescatado todos los instantes sagrados de la novela de Yōko Ogawa. El Profesor de los 80 minutos vive para siempre en tu memoria.
            </p>
          </div>

          <div className="inline-block px-8 py-4 bg-black/50 border border-amber-500/60 rounded-2xl font-serif text-amber-300 text-lg sm:text-xl shadow-inner">
            ★ Catedrático Honorario de la Fórmula de Euler ★
          </div>
        </div>
      )}
    </div>
  );
};
