import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { CampaignMapView } from './components/CampaignMapView';
import { GameEngine } from './components/GameEngine';
import { CollectionView } from './components/CollectionView';
import { QuizView } from './components/QuizView';
import { toggleSound, isSoundEnabled, playSound } from './utils/sound';
import { CAMPAIGN_CHAPTERS } from './data/campaignData';
import { Sparkles, RotateCcw, Unlock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [soundActive, setSoundActive] = useState(true);

  // Estado global de progreso de la campaña
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('formula-progress');
      return saved ? JSON.parse(saved) : { unlockedChapters: [1], stars: {}, cards: [] };
    } catch {
      return { unlockedChapters: [1], stars: {}, cards: [] };
    }
  });

  // Capítulo actualmente jugando
  const [playingChapterId, setPlayingChapterId] = useState(null);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem('formula-progress', JSON.stringify(newProgress));
    } catch {}
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const handleCompleteChapter = (chapterId, starsEarned, cardEarned) => {
    const newUnlocked = progress.unlockedChapters.includes(chapterId + 1)
      ? progress.unlockedChapters
      : [...progress.unlockedChapters, chapterId + 1];

    const newCards = cardEarned && !progress.cards.includes(cardEarned)
      ? [...progress.cards, cardEarned]
      : progress.cards;

    const newStars = { ...progress.stars, [chapterId]: starsEarned };

    saveProgress({
      unlockedChapters: newUnlocked,
      stars: newStars,
      cards: newCards,
    });

    setPlayingChapterId(null);
  };

  // Funciones de utilidad para demostración
  const unlockAllDemo = () => {
    playSound('correct');
    const allIds = CAMPAIGN_CHAPTERS.map(c => c.id);
    const allCards = CAMPAIGN_CHAPTERS.map(c => c.rewardCard.name);
    const allStars = {};
    CAMPAIGN_CHAPTERS.forEach(c => { allStars[c.id] = 3; });
    saveProgress({
      unlockedChapters: allIds,
      stars: allStars,
      cards: allCards,
    });
  };

  const resetProgress = () => {
    if (window.confirm('¿Reiniciar todo el progreso al Capítulo 1?')) {
      playSound('click');
      saveProgress({ unlockedChapters: [1], stars: {}, cards: [] });
    }
  };

  return (
    <div className="min-h-screen bg-[#071311] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <BackgroundCanvas />

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          soundEnabled={soundActive}
          toggleSoundHandler={handleToggleSound}
          totalCards={progress.cards.length}
          totalStars={Object.values(progress.stars).reduce((a, b) => a + b, 0)}
        />

        <main className="flex-1 pb-10">
          {activeTab === 'campaign' && !playingChapterId && (
            <CampaignMapView
              progress={progress}
              onPlayChapter={(id) => setPlayingChapterId(id)}
            />
          )}

          {activeTab === 'campaign' && playingChapterId && (
            <GameEngine
              chapterId={playingChapterId}
              existingStars={progress.stars[playingChapterId] || 0}
              onComplete={(stars, card) => handleCompleteChapter(playingChapterId, stars, card)}
              onBack={() => setPlayingChapterId(null)}
            />
          )}

          {activeTab === 'collection' && (
            <CollectionView progress={progress} />
          )}

          {activeTab === 'quiz' && (
            <QuizView onBack={() => setActiveTab('campaign')} />
          )}
        </main>

        {/* Footer con créditos y atajos de demostración */}
        <footer className="border-t border-emerald-950/80 bg-[#06100e]/95 py-4 px-6 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-center sm:text-left">
              Basado en la novela de <strong className="text-white">Yōko Ogawa</strong> · <em>博士の愛した数式 (La Fórmula Preferida del Profesor)</em>
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={unlockAllDemo}
                title="Desbloquea los 11 capítulos con 3 estrellas y todas las cartas"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 transition-all text-[11px] font-mono shadow-sm"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Desbloquear Todo (Demo)</span>
              </button>

              <button
                onClick={resetProgress}
                title="Reiniciar progreso"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-[11px] font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
