import React from 'react';
import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { Star, Lock, Package } from 'lucide-react';

const RARITY_COLORS = {
  'Reliquia': 'from-amber-700/60 to-yellow-800/40 border-amber-500/60',
  'Símbolo': 'from-indigo-700/60 to-purple-800/40 border-indigo-500/60',
  'Objeto de Colección': 'from-rose-700/60 to-pink-800/40 border-rose-500/60',
  'Recuerdo': 'from-teal-700/60 to-emerald-800/40 border-teal-500/60',
  'Entrada Vintage': 'from-orange-700/60 to-amber-800/40 border-orange-500/60',
  'Obra Maestra': 'from-violet-700/60 to-purple-800/40 border-violet-500/60 ring-2 ring-violet-400/40',
  'Reliquia Familiar': 'from-emerald-700/60 to-teal-800/40 border-emerald-500/60',
  'Trofeo': 'from-yellow-700/60 to-amber-800/40 border-yellow-500/60',
  'Trofeo': 'from-yellow-700/60 to-amber-800/40 border-yellow-500/60',
  'Recuerdo Íntimo': 'from-pink-700/60 to-rose-800/40 border-pink-500/60',
  'Legado Eterno': 'from-slate-600/60 to-zinc-700/40 border-slate-400/60 ring-2 ring-white/20',
};

const CARD_EMOJIS = {
  1: '⌚', 2: '☂️', 3: '⚾', 4: '🌸', 5: '🏟️', 6: '🔑',
  7: '📜', 8: '📷', 9: '🥇', 10: '🧤', 11: '🍵'
};

export const CollectionView = ({ progress }) => {
  const { cards, stars } = progress;
  const totalPossible = CAMPAIGN_CHAPTERS.length;
  const collected = cards.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Colección de Recuerdos</p>
        <h2 className="text-3xl font-bold font-serif text-white">Tus Cartas del Profesor</h2>
        <p className="text-sm text-slate-400">
          Completa cada capítulo para desbloquear sus cartas y construir la historia completa.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-amber-900/50 text-xs">
          <Package className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">Cartas: <strong className="text-amber-400">{collected}</strong> / {totalPossible}</span>
        </div>
      </div>

      {/* Grid de Cartas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {CAMPAIGN_CHAPTERS.map(chapter => {
          const isUnlocked = cards.includes(chapter.rewardCard.name);
          const chapterStars = stars[chapter.id] || 0;
          const rarity = chapter.rewardCard.type;
          const gradStyle = RARITY_COLORS[rarity] || RARITY_COLORS['Recuerdo'];

          return (
            <div
              key={chapter.id}
              className={`relative rounded-2xl border p-4 text-center space-y-2 transition-all
                ${isUnlocked
                  ? `bg-gradient-to-br ${gradStyle} hover:scale-105 hover:shadow-xl cursor-pointer`
                  : 'bg-white/3 border-white/10 opacity-50'
                }`}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                  <Lock className="w-6 h-6 text-slate-600" />
                </div>
              )}

              {/* Emoji de la carta */}
              <div className={`text-5xl ${!isUnlocked ? 'opacity-20 blur-sm' : ''}`}>
                {isUnlocked ? CARD_EMOJIS[chapter.id] : '❓'}
              </div>

              {/* Rarity badge */}
              {isUnlocked && (
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded-full">
                  {rarity}
                </span>
              )}

              <p className={`text-xs font-bold leading-tight ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                {isUnlocked ? chapter.rewardCard.name : chapter.badge}
              </p>

              {isUnlocked && (
                <>
                  <p className="text-[10px] text-slate-300 leading-tight">{chapter.rewardCard.desc}</p>
                  <div className="flex justify-center gap-0.5">
                    {[1,2,3].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= chapterStars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Diploma si todas completadas */}
      {collected >= totalPossible && (
        <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/20 border-2 border-amber-500/60 rounded-3xl p-8 text-center space-y-4">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-bold font-serif text-amber-300">¡Colección Completa!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Has vivido los 11 capítulos de la historia del Profesor, Root y la asistenta. El legado del matemático vive en ti.
          </p>
          <div className="inline-block px-6 py-3 bg-amber-600/30 border border-amber-500 rounded-2xl font-serif text-amber-200 text-lg">
            ∞ Catedrático Honorario de la Fórmula de Euler ∞
          </div>
        </div>
      )}
    </div>
  );
};
