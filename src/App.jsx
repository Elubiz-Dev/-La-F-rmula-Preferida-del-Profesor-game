import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { CampaignMapView } from './components/CampaignMapView';
import { GameEngine } from './components/GameEngine';
import { ChapterStoryView } from './components/ChapterStoryView';
import { MathLabView } from './components/MathLabView';
import { CollectionView } from './components/CollectionView';
import { QuizView } from './components/QuizView';
import { toggleSound, isSoundEnabled, playSound } from './utils/sound';
import { CAMPAIGN_CHAPTERS } from './data/campaignData';

export default function App() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [soundActive, setSoundActive] = useState(true);
  const [activeStoryChapterId, setActiveStoryChapterId] = useState(1);

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

  const handleReadChapterStory = (id) => {
    setActiveStoryChapterId(id || 1);
    setPlayingChapterId(null);
    setActiveTab('story');
  };

  const handlePlayFromStory = (id) => {
    setActiveTab('campaign');
    setPlayingChapterId(id);
  };

  const handleGoToLab = () => {
    setActiveTab('mathlab');
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
              onReadChapter={handleReadChapterStory}
            />
          )}

          {activeTab === 'campaign' && playingChapterId && (
            <GameEngine
              chapterId={playingChapterId}
              existingStars={progress.stars[playingChapterId] || 0}
              onComplete={(stars, card) => handleCompleteChapter(playingChapterId, stars, card)}
              onBack={() => setPlayingChapterId(null)}
              onReadStory={handleReadChapterStory}
            />
          )}

          {activeTab === 'story' && (
            <ChapterStoryView
              initialChapterId={activeStoryChapterId}
              onGoToLab={handleGoToLab}
              onPlayArcade={handlePlayFromStory}
              onBackToCampaign={() => setActiveTab('campaign')}
            />
          )}

          {activeTab === 'mathlab' && (
            <MathLabView
              onBackToStory={() => setActiveTab('story')}
              onBackToCampaign={() => setActiveTab('campaign')}
            />
          )}

          {activeTab === 'collection' && (
            <CollectionView progress={progress} />
          )}

          {activeTab === 'quiz' && (
            <QuizView onBack={() => setActiveTab('campaign')} />
          )}
        </main>

        {/* Footer con créditos */}
        <footer className="border-t border-emerald-950/80 bg-[#06100e]/95 py-4 px-6 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto flex items-center justify-center sm:justify-start">
            <p className="text-center sm:text-left">
              Basado en la novela de <strong className="text-white">Yōko Ogawa</strong> · <em>博士の愛した数式 (La Fórmula Preferida del Profesor)</em>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
