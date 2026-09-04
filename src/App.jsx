import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { CampaignMapView } from './components/CampaignMapView';
import { GameEngine } from './components/GameEngine';
import { CollectionView } from './components/CollectionView';
import { QuizView } from './components/QuizView';
import { toggleSound, isSoundEnabled } from './utils/sound';

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

  return (
    <div className="min-h-screen bg-[#0d1b18] text-slate-100 flex flex-col relative overflow-x-hidden">
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

        <main className="flex-1">
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

        <footer className="border-t border-emerald-950/80 bg-[#0d1b18]/90 py-3 px-6 text-center text-xs text-slate-500">
          <span>Basado en la novela de <strong className="text-slate-300">Yōko Ogawa</strong> · 博士の愛した数式 · Completa los 11 capítulos para desbloquear el diploma final.</span>
        </footer>
      </div>
    </div>
  );
}
