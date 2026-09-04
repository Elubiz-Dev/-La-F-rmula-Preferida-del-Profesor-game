import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CAMPAIGN_CHAPTERS } from '../data/campaignData';
import { playSound } from '../utils/sound';
import { ChevronLeft, Star, Heart, Timer, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// ================================================================
// MOTOR CENTRAL DE MINIJUEGOS — 11 juegos de arcade/habilidad
// ================================================================

export const GameEngine = ({ chapterId, existingStars, onComplete, onBack }) => {
  const chapter = CAMPAIGN_CHAPTERS.find(c => c.id === chapterId);
  const [gameState, setGameState] = useState('intro'); // intro | playing | result
  const [starsEarned, setStarsEarned] = useState(0);
  const [score, setScore] = useState(0);

  const handleGameOver = (finalScore, maxScore) => {
    const pct = finalScore / maxScore;
    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct > 0 ? 1 : 0;
    setStarsEarned(stars);
    setScore(finalScore);
    setGameState('result');
    if (stars >= 1) {
      playSound('correct');
      confetti({ particleCount: stars * 40, spread: 70, origin: { y: 0.6 } });
    } else {
      playSound('wrong');
    }
  };

  // Render del juego correcto según tipo
  const renderGame = () => {
    const props = { chapter, onGameOver: handleGameOver };
    switch (chapter.game.type) {
      case 'notes_catcher':    return <NotesCatcher {...props} />;
      case 'rain_shelter':     return <RainShelter {...props} />;
      case 'homerun_timing':   return <HomerunTiming {...props} />;
      case 'sakura_memory':    return <SakuraMemory {...props} />;
      case 'fever_compress':   return <FeverCompress {...props} />;
      case 'stealth_balance':  return <StealthBalance {...props} />;
      case 'euler_constellation': return <EulerConstellation {...props} />;
      case 'hidden_card_search':  return <HiddenCardSearch {...props} />;
      case 'logic_circuit':    return <LogicCircuit {...props} />;
      case 'catch_baseball_glove': return <CatchBaseball {...props} />;
      case 'chalk_legacy_rush': return <ChalkLegacyRush {...props} />;
      default: return <NotesCatcher {...props} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Header del capítulo */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs text-emerald-400 font-mono">{chapter.badge}</p>
          <h2 className="text-xl font-bold font-serif text-white">{chapter.title}</h2>
        </div>
        {existingStars > 0 && (
          <div className="ml-auto flex gap-0.5">
            {[1,2,3].map(i => <Star key={i} className={`w-5 h-5 ${i <= existingStars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />)}
          </div>
        )}
      </div>

      {/* INTRO */}
      {gameState === 'intro' && (
        <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-8 space-y-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-4xl shadow-xl ring-4 ring-emerald-400/20">
            🎮
          </div>
          <div>
            <p className="text-xs text-emerald-400 uppercase tracking-wider font-bold mb-1">Minijuego — {chapter.game.title}</p>
            <h3 className="text-2xl font-bold font-serif text-white">{chapter.game.title}</h3>
          </div>

          {/* Resumen del capítulo con estilo post-it */}
          <div className="bg-yellow-200 text-stone-800 rounded-2xl p-4 text-sm text-left font-semibold shadow-md relative" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            <div className="absolute -top-3 left-6 w-4 h-4 rounded-full bg-rose-500 ring-2 ring-white/80 shadow" />
            "{chapter.quote}"
          </div>

          <p className="text-sm text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/10 leading-relaxed">
            📖 <strong className="text-white">Historia:</strong> {chapter.synopsis}
          </p>

          <div className="bg-emerald-950/60 border border-emerald-700/40 rounded-2xl p-4 text-sm text-emerald-200">
            🎯 <strong>Instrucciones:</strong> {chapter.game.instruction}
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-amber-400" /> {chapter.game.timeLimit}s</span>
            <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-amber-400" /> Meta: {chapter.game.goal}</span>
          </div>

          <button
            onClick={() => setGameState('playing')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg shadow-xl transition-all active:scale-95"
          >
            ¡Comenzar Aventura! →
          </button>
        </div>
      )}

      {/* JUEGO ACTIVO */}
      {gameState === 'playing' && renderGame()}

      {/* RESULTADO */}
      {gameState === 'result' && (
        <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-8 space-y-6 text-center">
          <div className="text-5xl">{starsEarned >= 2 ? '🎉' : starsEarned === 1 ? '👍' : '😅'}</div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {starsEarned === 3 ? '¡Perfecto!' : starsEarned === 2 ? '¡Bien hecho!' : starsEarned === 1 ? 'Capítulo Completado' : 'Inténtalo de nuevo'}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {starsEarned >= 1 ? 'Has desbloqueado el siguiente capítulo.' : 'No te rindas, vuelve a intentarlo.'}
            </p>
          </div>

          {/* Estrellas */}
          <div className="flex justify-center gap-3">
            {[1, 2, 3].map(i => (
              <Star key={i} className={`w-10 h-10 transition-all ${i <= starsEarned ? 'text-amber-400 fill-amber-400 scale-110' : 'text-slate-700'}`} />
            ))}
          </div>

          {/* Carta de recompensa */}
          {starsEarned >= 1 && (
            <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/20 border border-amber-600/50 rounded-2xl p-4">
              <p className="text-xs text-amber-400 uppercase tracking-wider font-bold mb-2">🏆 Carta Desbloqueada</p>
              <p className="text-white font-bold text-base">{chapter.rewardCard.name}</p>
              <p className="text-xs text-amber-200 mt-1">{chapter.rewardCard.desc}</p>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-800/60 text-amber-300 border border-amber-600/40">
                {chapter.rewardCard.type}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGameState('intro')}
              className="py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reintentar
            </button>
            <button
              onClick={() => onComplete(starsEarned, starsEarned >= 1 ? chapter.rewardCard.name : null)}
              className="py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all"
            >
              {starsEarned >= 1 ? 'Siguiente Capítulo →' : 'Volver al Mapa'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ================================================================
// SHARED GAME HUD COMPONENT
// ================================================================
const GameHUD = ({ timeLeft, maxTime, score, goal, lives }) => (
  <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl px-4 py-2 text-sm mb-4">
    <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
      <Timer className="w-4 h-4" />
      <span className={timeLeft <= 5 ? 'text-rose-400 animate-pulse' : ''}>{timeLeft}s</span>
      <div className="w-16 h-1.5 rounded-full bg-white/10 ml-1">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(timeLeft / maxTime) * 100}%` }} />
      </div>
    </div>
    <div className="font-mono font-bold text-emerald-400">{score} / {goal}</div>
    {lives !== undefined && (
      <div className="flex gap-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart key={i} className={`w-4 h-4 ${i < lives ? 'text-rose-400 fill-rose-400' : 'text-slate-700'}`} />
        ))}
      </div>
    )}
  </div>
);

// ================================================================
// JUEGO 1 — Capítulo 1: ATRAPA LOS POST-ITS (Click rápido)
// ================================================================
const NotesCatcher = ({ chapter, onGameOver }) => {
  const [notes, setNotes] = useState([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const goal = chapter.game.goal;
  const notesTexts = ['📝 Me llamo Profesor', '⏰ Memoria: 80 min', '📍 Asistenta nueva', '📅 Accidente 1975', '🧮 Matemático', '🏠 Mi cabaña', '📌 220 y 284', '💼 Mi oficio'];
  const timerRef = useRef(null);
  const noteIdRef = useRef(0);

  const spawnNote = useCallback(() => {
    const id = noteIdRef.current++;
    const x = 5 + Math.random() * 80;
    const text = notesTexts[Math.floor(Math.random() * notesTexts.length)];
    setNotes(prev => [...prev, { id, x, y: -10, text, speed: 0.8 + Math.random() * 1.2 }]);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); onGameOver(caught, goal); return 0; }
        return t - 1;
      });
    }, 1000);
    const spawn = setInterval(spawnNote, 600);
    return () => { clearInterval(timerRef.current); clearInterval(spawn); };
  }, []);

  useEffect(() => {
    if (caught >= goal) { clearInterval(timerRef.current); onGameOver(goal, goal); }
  }, [caught]);

  // Mover notas hacia abajo
  useEffect(() => {
    const frame = setInterval(() => {
      setNotes(prev => {
        const updated = prev.map(n => ({ ...n, y: n.y + n.speed }));
        const fallen = updated.filter(n => n.y > 105);
        if (fallen.length > 0) setMissed(m => m + fallen.length);
        return updated.filter(n => n.y <= 105);
      });
    }, 50);
    return () => clearInterval(frame);
  }, []);

  const catchNote = (id) => {
    playSound('correct');
    setNotes(prev => prev.filter(n => n.id !== id));
    setCaught(c => c + 1);
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={caught} goal={goal} />
      <div className="relative h-80 bg-gradient-to-b from-sky-900/20 to-emerald-900/20 border border-white/10 rounded-2xl overflow-hidden" style={{ userSelect: 'none' }}>
        <p className="absolute top-2 left-0 right-0 text-center text-[11px] text-slate-500">¡Haz clic en los post-its antes de que caigan!</p>
        {notes.map(note => (
          <button
            key={note.id}
            onClick={() => catchNote(note.id)}
            className="absolute transform -translate-x-1/2 px-3 py-2 rounded-xl bg-yellow-200 text-stone-800 text-xs font-bold shadow-lg hover:scale-110 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            style={{ left: `${note.x}%`, top: `${note.y}%`, fontFamily: 'Caveat, cursive', fontSize: '0.9rem', zIndex: 10 }}
          >
            📌 {note.text}
          </button>
        ))}
        {missed > 0 && (
          <div className="absolute bottom-2 right-3 text-xs text-rose-400">Perdidas: {missed}</div>
        )}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 2 — Capítulo 2: PARAGUAS DE ROOT (Mouse tracking)
// ================================================================
const RainShelter = ({ chapter, onGameOver }) => {
  const [umbrellaX, setUmbrellaX] = useState(50);
  const [drops, setDrops] = useState([]);
  const [saved, setSaved] = useState(0);
  const [hit, setHit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const goal = chapter.game.goal;
  const arenaRef = useRef(null);
  const dropIdRef = useRef(0);
  const savedRef = useRef(0);
  const hitRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); onGameOver(savedRef.current, goal); return 0; }
        return t - 1;
      });
    }, 1000);
    const spawn = setInterval(() => {
      const id = dropIdRef.current++;
      setDrops(prev => [...prev, { id, x: 10 + Math.random() * 80, y: 0, speed: 1 + Math.random() }]);
    }, 400);
    return () => { clearInterval(timer); clearInterval(spawn); };
  }, []);

  useEffect(() => {
    if (savedRef.current >= goal) onGameOver(goal, goal);
  }, [saved]);

  // Física de gotas
  useEffect(() => {
    const frame = setInterval(() => {
      setDrops(prev => {
        const updated = prev.map(d => ({ ...d, y: d.y + d.speed }));
        let newSaved = 0, newHit = 0;
        const remaining = updated.filter(d => {
          if (d.y >= 80 && d.y <= 88) { // zona del paraguas
            const diff = Math.abs(d.x - umbrellaX);
            if (diff < 12) { newSaved++; return false; }
          }
          if (d.y >= 90) { newHit++; return false; }
          return true;
        });
        if (newSaved > 0) { playSound('correct'); savedRef.current += newSaved; setSaved(s => s + newSaved); }
        if (newHit > 0) { hitRef.current += newHit; setHit(h => h + newHit); }
        return remaining;
      });
    }, 50);
    return () => clearInterval(frame);
  }, [umbrellaX]);

  const handleMouseMove = (e) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setUmbrellaX(Math.max(10, Math.min(90, x)));
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setUmbrellaX(Math.max(10, Math.min(90, x)));
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={saved} goal={goal} />
      <div
        ref={arenaRef}
        className="relative h-96 bg-gradient-to-b from-slate-800/60 to-emerald-900/30 border border-white/10 rounded-2xl overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ userSelect: 'none', touchAction: 'none' }}
      >
        {/* Root (niño) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl">👦</div>
        {/* Paraguas */}
        <div className="absolute text-4xl transition-all duration-75" style={{ left: `${umbrellaX}%`, bottom: '18%', transform: 'translateX(-50%)' }}>☂️</div>
        {/* Gotas de lluvia */}
        {drops.map(d => (
          <div key={d.id} className="absolute text-lg select-none" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translateX(-50%)' }}>💧</div>
        ))}
        {hit > 0 && <div className="absolute top-2 right-3 text-xs text-rose-400">Golpes: {hit}</div>}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 3 — Capítulo 3: TIMING DEL BATEO (Ritmo / timing)
// ================================================================
const HomerunTiming = ({ chapter, onGameOver }) => {
  const [ballPos, setBallPos] = useState(0); // 0-100
  const [direction, setDirection] = useState(1);
  const [homeruns, setHomeruns] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const [feedback, setFeedback] = useState('');
  const [swinging, setSwinging] = useState(false);
  const goal = chapter.game.goal;
  const ballRef = useRef(0);
  const dirRef = useRef(1);
  const homerunRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(homerunRef.current, goal); return 0; } return t - 1; });
    }, 1000);
    const ball = setInterval(() => {
      ballRef.current = ballRef.current + dirRef.current * 3;
      if (ballRef.current >= 100 || ballRef.current <= 0) dirRef.current *= -1;
      setBallPos(ballRef.current);
    }, 20);
    return () => { clearInterval(timer); clearInterval(ball); };
  }, []);

  const swing = () => {
    if (swinging) return;
    setSwinging(true);
    playSound('baseball');
    // Zona dorada entre 42-58
    const pos = ballRef.current;
    if (pos >= 40 && pos <= 60) {
      playSound('correct');
      homerunRef.current++;
      const h = homerunRef.current;
      setHomeruns(h);
      setFeedback('🏠 ¡CUADRANGULAR!');
      if (h >= goal) { onGameOver(goal, goal); return; }
    } else {
      playSound('wrong');
      setFeedback('❌ ¡Swing y fallo!');
    }
    setTimeout(() => { setFeedback(''); setSwinging(false); }, 500);
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); swing(); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [swinging]);

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={homeruns} goal={goal} />
      <div className="relative h-48 bg-gradient-to-b from-sky-900/30 to-emerald-900/30 border border-white/10 rounded-2xl overflow-hidden">
        {/* Pista de la pelota */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/10 rounded-full -translate-y-1/2">
          {/* Zona dorada */}
          <div className="absolute bg-amber-500/40 border-x border-amber-400 h-full rounded-sm" style={{ left: '40%', width: '20%' }} />
          <div className="absolute top-4 left-[46%] text-[10px] text-amber-400 font-bold whitespace-nowrap">ZONA DORADA</div>
        </div>
        {/* Pelota */}
        <div className="absolute top-1/2 -translate-y-1/2 text-2xl -translate-x-1/2 transition-none" style={{ left: `${ballPos}%` }}>⚾</div>
        {/* Feedback */}
        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold animate-bounce">
            {feedback}
          </div>
        )}
      </div>
      <button
        onClick={swing}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-2xl shadow-xl active:scale-95 transition-all"
      >
        ⚾ ¡BATEAR! (o Espacio)
      </button>
      <p className="text-center text-xs text-slate-400">Golpea cuando la pelota esté en la zona dorada</p>
    </div>
  );
};

// ================================================================
// JUEGO 4 — Capítulo 4: MEMORIA DE LOS CEREZOS (Simon Says)
// ================================================================
const SakuraMemory = ({ chapter, onGameOver }) => {
  const SYMBOLS = ['🌸', '🔔', '🌺', '🍃'];
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [phase, setPhase] = useState('watch'); // watch | input
  const [highlighted, setHighlighted] = useState(null);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('Observa la secuencia...');
  const [failed, setFailed] = useState(false);
  const goal = chapter.game.goal;

  const showSequence = async (seq) => {
    setPhase('watch');
    setMessage('Observa la secuencia...');
    await new Promise(r => setTimeout(r, 600));
    for (let i = 0; i < seq.length; i++) {
      setHighlighted(seq[i]);
      playSound('click');
      await new Promise(r => setTimeout(r, 600));
      setHighlighted(null);
      await new Promise(r => setTimeout(r, 300));
    }
    setPhase('input');
    setMessage('¡Tu turno! Repite la secuencia');
    setPlayerInput([]);
  };

  useEffect(() => {
    const initial = [Math.floor(Math.random() * 4)];
    setSequence(initial);
    showSequence(initial);
  }, []);

  const handleInput = (idx) => {
    if (phase !== 'input') return;
    playSound('click');
    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);

    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      playSound('wrong');
      setFailed(true);
      setMessage('❌ ¡Secuencia incorrecta!');
      setTimeout(() => onGameOver(round - 1, goal), 1500);
      return;
    }

    if (newInput.length === sequence.length) {
      playSound('correct');
      if (round >= goal) {
        setMessage('🎉 ¡Perfecto! Has completado todas las rondas');
        setTimeout(() => onGameOver(goal, goal), 1200);
        return;
      }
      const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
      setRound(r => r + 1);
      setSequence(nextSeq);
      setTimeout(() => showSequence(nextSeq), 800);
    }
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-5">
      <div className="flex items-center justify-between bg-black/30 rounded-2xl px-4 py-2 text-sm">
        <span className="text-amber-400 font-mono">Ronda {round}/{goal}</span>
        <span className={`font-semibold ${phase === 'input' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>{message}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SYMBOLS.map((sym, idx) => (
          <button
            key={idx}
            onClick={() => handleInput(idx)}
            disabled={phase !== 'input'}
            className={`py-8 rounded-2xl text-5xl font-bold transition-all active:scale-95
              ${highlighted === idx ? 'bg-amber-400/30 scale-105 border-2 border-amber-400 shadow-xl shadow-amber-500/30' : 'bg-white/5 border border-white/10'}
              ${phase === 'input' ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default opacity-80'}`}
          >
            {sym}
          </button>
        ))}
      </div>

      {playerInput.length > 0 && (
        <div className="flex gap-2 justify-center">
          {playerInput.map((i, j) => <span key={j} className="text-2xl">{SYMBOLS[i]}</span>)}
        </div>
      )}
    </div>
  );
};

// ================================================================
// JUEGO 5 — Capítulo 5: COMPRESAS FRÍAS (Click rápido)
// ================================================================
const FeverCompress = ({ chapter, onGameOver }) => {
  const [temp, setTemp] = useState(0); // 0-100 (100 = muy mal)
  const [compresses, setCompresses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const [positions, setPositions] = useState([]);
  const goal = chapter.game.goal;
  const compRef = useRef(0);
  const tempRef = useRef(0);

  useEffect(() => {
    // Temperatura sube sola
    const tempInterval = setInterval(() => {
      tempRef.current = Math.min(100, tempRef.current + 2);
      setTemp(t => Math.min(100, t + 2));
    }, 400);

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); clearInterval(tempInterval); onGameOver(compRef.current, goal); return 0; }
        return t - 1;
      });
    }, 1000);

    // Generar compresas en posiciones aleatorias
    const regen = () => setPositions(Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 70
    })));
    regen();
    const spawn = setInterval(regen, 1500);

    return () => { clearInterval(tempInterval); clearInterval(timer); clearInterval(spawn); };
  }, []);

  useEffect(() => {
    if (compRef.current >= goal) onGameOver(goal, goal);
  }, [compresses]);

  const applyCompress = (id) => {
    playSound('correct');
    tempRef.current = Math.max(0, tempRef.current - 8);
    setTemp(t => Math.max(0, t - 8));
    compRef.current++;
    setCompresses(c => c + 1);
    setPositions(prev => prev.filter(p => p.id !== id));
  };

  const tempColor = temp > 70 ? 'bg-rose-500' : temp > 40 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={compresses} goal={goal} />
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm text-slate-300">🌡️ Fiebre del Profesor:</span>
        <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${tempColor} transition-all duration-300`} style={{ width: `${temp}%` }} />
        </div>
        <span className={`text-sm font-mono font-bold ${temp > 70 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}>{temp}°</span>
      </div>

      <div className="relative h-72 bg-gradient-to-b from-blue-900/20 to-slate-900/40 border border-white/10 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl opacity-20">👴</div>
        </div>
        {positions.map(pos => (
          <button
            key={pos.id}
            onClick={() => applyCompress(pos.id)}
            className="absolute text-3xl hover:scale-125 transition-transform active:scale-90 cursor-pointer animate-bounce"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            🧊
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400">¡Haz clic en los cubos de hielo para bajar la fiebre!</p>
    </div>
  );
};

// ================================================================
// JUEGO 6 — Capítulo 6: SIGILO EN LA NOCHE (Balance bar)
// ================================================================
const StealthBalance = ({ chapter, onGameOver }) => {
  const [noise, setNoise] = useState(50); // 0 silencio, 100 ruido
  const [distance, setDistance] = useState(0); // 0-100 distancia recorrida
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const [holding, setHolding] = useState(false);
  const noiseRef = useRef(50);
  const distRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(Math.round(distRef.current), 100); return 0; } return t - 1; });
    }, 1000);

    const physics = setInterval(() => {
      // Ruido sube si avanza, baja lentamente solo
      noiseRef.current = Math.max(0, Math.min(100, noiseRef.current - 0.5));
      setNoise(Math.round(noiseRef.current));

      if (noiseRef.current < 40) {
        distRef.current = Math.min(100, distRef.current + 0.5);
        setDistance(Math.round(distRef.current));
        if (distRef.current >= 100) { onGameOver(100, 100); }
      }
    }, 50);

    return () => { clearInterval(timer); clearInterval(physics); };
  }, []);

  const step = () => {
    noiseRef.current = Math.min(100, noiseRef.current + 12);
    setNoise(Math.round(noiseRef.current));
  };

  const noiseColor = noise > 60 ? 'bg-rose-500' : noise > 30 ? 'bg-amber-500' : 'bg-emerald-500';
  const safeZone = noise <= 40;

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={distance} goal={100} />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>🔇 Silencio</span>
          <span className={`font-bold ${safeZone ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
            {safeZone ? '✅ Zona Segura — Avanzando...' : '⚠️ ¡Demasiado ruido!'}
          </span>
          <span>📢 Ruido</span>
        </div>
        <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute left-0 w-[40%] h-full bg-emerald-900/50 border-r-2 border-emerald-500" />
          <div className={`h-full ${noiseColor} transition-all duration-100 rounded-full`} style={{ width: `${noise}%` }} />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs text-slate-400">Progreso hacia la habitación del Profesor:</p>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all" style={{ width: `${distance}%` }} />
        </div>
        <p className="text-xs text-slate-400">{distance}% del camino</p>
      </div>

      <p className="text-center text-sm text-slate-400">Haz <strong className="text-white">UN clic a la vez</strong> — espera a que el ruido baje a zona verde para avanzar:</p>

      <button
        onClick={step}
        className="w-full py-5 rounded-2xl bg-indigo-800/60 hover:bg-indigo-700/80 border border-indigo-600/50 text-white font-bold text-lg active:scale-95 transition-all"
      >
        👣 Dar Un Paso Silencioso
      </button>
    </div>
  );
};

// ================================================================
// JUEGO 7 — Capítulo 7: CONSTELACIÓN DE EULER (Conectar nodos)
// ================================================================
const EulerConstellation = ({ chapter, onGameOver }) => {
  const NODES = [
    { id: 'e', label: 'e', desc: '2.718... Crecimiento', x: 20, y: 20, color: 'bg-emerald-500' },
    { id: 'i', label: 'i', desc: '√(-1) Imaginario', x: 75, y: 15, color: 'bg-purple-500' },
    { id: 'pi', label: 'π', desc: '3.14159... Geometría', x: 80, y: 70, color: 'bg-sky-500' },
    { id: 'one', label: '1', desc: 'Unidad', x: 20, y: 75, color: 'bg-amber-500' },
    { id: 'zero', label: '0', desc: 'El Vacío y la Paz', x: 50, y: 50, color: 'bg-rose-500' },
  ];
  const CORRECT_ORDER = ['e', 'i', 'pi', 'one', 'zero'];

  const [connected, setConnected] = useState([]);
  const [lastConnected, setLastConnected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const [message, setMessage] = useState('Conecta los 5 nodos en orden: e → i → π → 1 → 0');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(connected.length, 5); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [connected]);

  const handleNodeClick = (nodeId) => {
    const expectedIndex = connected.length;
    if (CORRECT_ORDER[expectedIndex] === nodeId) {
      playSound('correct');
      const newConnected = [...connected, nodeId];
      setConnected(newConnected);
      setLastConnected(nodeId);
      if (newConnected.length === 5) {
        playSound('euler');
        setMessage('🌟 ¡La fórmula de Euler brilla! e^(iπ) + 1 = 0');
        setTimeout(() => onGameOver(5, 5), 1200);
      } else {
        setMessage(`✅ ${nodeId === 'e' ? 'e conectado' : nodeId === 'i' ? 'e → i ✓' : nodeId === 'pi' ? 'e → i → π ✓' : 'e → i → π → 1 ✓'} — Continúa...`);
      }
    } else {
      playSound('wrong');
      setAttempts(a => a + 1);
      setConnected([]);
      setLastConnected(null);
      setMessage('❌ Orden incorrecto. Comienza de nuevo: e → i → π → 1 → 0');
    }
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={connected.length} goal={5} />
      <p className="text-center text-xs text-slate-300 bg-white/5 rounded-xl p-2">{message}</p>

      {/* Canvas de constelación */}
      <div className="relative h-72 bg-indigo-950/40 border border-indigo-800/40 rounded-2xl overflow-hidden">
        {/* Líneas de conexión */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {connected.map((id, idx) => {
            if (idx === 0) return null;
            const from = NODES.find(n => n.id === connected[idx - 1]);
            const to = NODES.find(n => n.id === id);
            return (
              <line key={id}
                x1={`${from.x}%`} y1={`${from.y}%`}
                x2={`${to.x}%`} y2={`${to.y}%`}
                stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Nodos */}
        {NODES.map(node => {
          const isConnected = connected.includes(node.id);
          const isNext = CORRECT_ORDER[connected.length] === node.id;
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full font-bold text-white transition-all active:scale-90
                ${isConnected ? `${node.color} w-14 h-14 text-xl ring-4 ring-amber-400 shadow-lg shadow-amber-500/50` : isNext ? `${node.color} w-12 h-12 text-lg ring-2 ring-white animate-pulse` : `${node.color} opacity-60 w-10 h-10 text-base`}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 text-xs text-slate-400">
        {NODES.map((n, i) => (
          <span key={n.id} className={`px-2 py-1 rounded-lg ${connected.includes(n.id) ? 'bg-amber-800/40 text-amber-300' : 'bg-white/5'}`}>
            {n.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 8 — Capítulo 8: BUSCA LA TARJETA (Shuffle / memory click)
// ================================================================
const HiddenCardSearch = ({ chapter, onGameOver }) => {
  const [boxes, setBoxes] = useState(() => {
    const arr = Array.from({ length: 9 }, (_, i) => ({ id: i, opened: false, hasCard: i === Math.floor(Math.random() * 9) }));
    return arr;
  });
  const [found, setFound] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const [message, setMessage] = useState('¡Busca la tarjeta de Enatsu oculta en las cajas de 1975!');
  const goal = chapter.game.goal;
  const foundRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(foundRef.current, goal); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openBox = (id) => {
    const box = boxes.find(b => b.id === id);
    if (box.opened) return;
    playSound('click');
    setAttempts(a => a + 1);
    const newBoxes = boxes.map(b => b.id === id ? { ...b, opened: true } : b);

    if (box.hasCard) {
      playSound('correct');
      foundRef.current++;
      setFound(f => f + 1);
      setMessage('🃏 ¡Encontraste la tarjeta de Enatsu! Reshuffling...');
      if (foundRef.current >= goal) { setTimeout(() => onGameOver(goal, goal), 800); return; }
      // Crear nuevo set de cajas
      setTimeout(() => {
        setBoxes(Array.from({ length: 9 }, (_, i) => ({ id: i, opened: false, hasCard: i === Math.floor(Math.random() * 9) })));
        setMessage('¡Busca la siguiente tarjeta!');
      }, 700);
    } else {
      setMessage('📦 Vacío. Sigue buscando...');
      setBoxes(newBoxes);
    }
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={found} goal={goal} />
      <p className="text-center text-xs text-slate-300">{message}</p>
      <div className="grid grid-cols-3 gap-3">
        {boxes.map(box => (
          <button
            key={box.id}
            onClick={() => openBox(box.id)}
            disabled={box.opened}
            className={`aspect-square rounded-2xl font-bold text-3xl transition-all active:scale-95 border
              ${box.opened
                ? box.hasCard
                  ? 'bg-amber-900/40 border-amber-500 text-amber-400'
                  : 'bg-white/5 border-white/10 text-slate-600'
                : 'bg-amber-900/20 border-amber-700/50 hover:bg-amber-800/30 hover:scale-105 cursor-pointer'
              }`}
          >
            {box.opened ? (box.hasCard ? '🃏' : '📦') : '📫'}
          </button>
        ))}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 9 — Capítulo 9: ENGRANAJES (Rotar al ángulo correcto)
// ================================================================
const LogicCircuit = ({ chapter, onGameOver }) => {
  const [gears, setGears] = useState([45, 90, 135, 200]);
  const targets = [90, 180, 270, 360];
  const [aligned, setAligned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const alignedRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(alignedRef.current, 4); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const rotateGear = (idx, dir) => {
    playSound('click');
    setGears(prev => {
      const updated = [...prev];
      updated[idx] = (updated[idx] + dir * 45 + 360) % 361;
      const newAligned = updated.filter((g, i) => Math.abs(g - targets[i]) < 20).length;
      if (newAligned > alignedRef.current) playSound('correct');
      alignedRef.current = newAligned;
      setAligned(newAligned);
      if (newAligned >= 4) setTimeout(() => onGameOver(4, 4), 600);
      return updated;
    });
  };

  const GEAR_EMOJIS = ['⚙️', '🔧', '⚙️', '🔩'];

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={aligned} goal={4} />
      <p className="text-center text-xs text-slate-400">Ajusta cada engranaje al ángulo objetivo girando con los botones</p>
      <div className="grid grid-cols-2 gap-4">
        {gears.map((angle, idx) => {
          const isAligned = Math.abs(angle - targets[idx]) < 20;
          return (
            <div key={idx} className={`p-4 rounded-2xl border ${isAligned ? 'bg-emerald-900/30 border-emerald-500' : 'bg-white/5 border-white/10'} text-center space-y-3`}>
              <div className="text-4xl transition-transform" style={{ transform: `rotate(${angle}deg)`, display: 'inline-block' }}>
                {GEAR_EMOJIS[idx]}
              </div>
              <div className="text-xs">
                <span className="text-slate-400">Actual: </span><span className="text-amber-300 font-mono">{angle}°</span>
                {' / '}
                <span className="text-slate-400">Meta: </span><span className="text-emerald-400 font-mono">{targets[idx]}°</span>
              </div>
              {isAligned && <div className="text-emerald-400 text-xs font-bold">✅ Alineado</div>}
              <div className="flex gap-2 justify-center">
                <button onClick={() => rotateGear(idx, -1)} className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all">◀ -45°</button>
                <button onClick={() => rotateGear(idx, 1)} className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all">+45° ▶</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 10 — Capítulo 10: ATRAPA EL BÉISBOL (Mouse tracking)
// ================================================================
const CatchBaseball = ({ chapter, onGameOver }) => {
  const [gloveX, setGloveX] = useState(50);
  const [balls, setBalls] = useState([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const goal = chapter.game.goal;
  const caughtRef = useRef(0);
  const arenaRef = useRef(null);
  const ballIdRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(caughtRef.current, goal); return 0; } return t - 1; });
    }, 1000);
    const spawn = setInterval(() => {
      const id = ballIdRef.current++;
      setBalls(prev => [...prev, { id, x: 10 + Math.random() * 80, y: 0, speed: 2 + Math.random() * 2 }]);
    }, 800);
    return () => { clearInterval(timer); clearInterval(spawn); };
  }, []);

  useEffect(() => {
    if (caughtRef.current >= goal) onGameOver(goal, goal);
  }, [caught]);

  useEffect(() => {
    const frame = setInterval(() => {
      setBalls(prev => {
        const updated = prev.map(b => ({ ...b, y: b.y + b.speed }));
        let newCaught = 0, newMissed = 0;
        const remaining = updated.filter(b => {
          if (b.y >= 80 && b.y <= 92) {
            if (Math.abs(b.x - gloveX) < 10) { newCaught++; return false; }
          }
          if (b.y > 100) { newMissed++; return false; }
          return true;
        });
        if (newCaught > 0) { playSound('correct'); caughtRef.current += newCaught; setCaught(c => c + newCaught); }
        if (newMissed > 0) { setMissed(m => m + newMissed); }
        return remaining;
      });
    }, 40);
    return () => clearInterval(frame);
  }, [gloveX]);

  const handleMouseMove = (e) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    setGloveX(Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)));
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    setGloveX(Math.max(10, Math.min(90, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={caught} goal={goal} />
      <div ref={arenaRef} className="relative h-96 bg-gradient-to-b from-sky-900/20 to-emerald-900/30 border border-white/10 rounded-2xl overflow-hidden cursor-none"
        onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} style={{ touchAction: 'none', userSelect: 'none' }}>
        {balls.map(b => (
          <div key={b.id} className="absolute text-2xl -translate-x-1/2" style={{ left: `${b.x}%`, top: `${b.y}%` }}>⚾</div>
        ))}
        <div className="absolute text-4xl -translate-x-1/2 transition-none" style={{ left: `${gloveX}%`, bottom: '5%' }}>🧤</div>
        {missed > 0 && <div className="absolute top-2 right-3 text-xs text-rose-400">Perdidos: {missed}</div>}
      </div>
    </div>
  );
};

// ================================================================
// JUEGO 11 — Capítulo 11: ENCIENDE LAS BOMBILLAS (Click rápido en grid)
// ================================================================
const ChalkLegacyRush = ({ chapter, onGameOver }) => {
  const [lit, setLit] = useState(Array(12).fill(false));
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(chapter.game.timeLimit);
  const goal = chapter.game.goal;
  const scoreRef = useRef(0);

  const lightNext = useCallback(() => {
    const idx = Math.floor(Math.random() * 12);
    setActive(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { onGameOver(scoreRef.current, goal); return 0; } return t - 1; });
    }, 1000);
    lightNext();
    const cycle = setInterval(() => {
      setActive(prev => {
        if (prev !== null) {
          setLit(l => { const nl = [...l]; nl[prev] = false; return nl; });
        }
        return null;
      });
      setTimeout(lightNext, 200);
    }, 900);
    return () => { clearInterval(timer); clearInterval(cycle); };
  }, []);

  const clickStudent = (idx) => {
    if (active !== idx) { playSound('wrong'); return; }
    playSound('correct');
    scoreRef.current++;
    setScore(s => s + 1);
    setActive(null);
    setLit(l => { const nl = [...l]; nl[idx] = true; return nl; });
    if (scoreRef.current >= goal) { onGameOver(goal, goal); }
  };

  const STUDENT_EMOJIS = ['👦', '👧', '🧒', '👦', '👧', '🧒', '👦', '👧', '🧒', '👦', '👧', '🧒'];

  return (
    <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-5 space-y-4">
      <GameHUD timeLeft={timeLeft} maxTime={chapter.game.timeLimit} score={score} goal={goal} />
      <p className="text-center text-xs text-slate-400">¡Toca al alumno cuando su bombilla se encienda!</p>
      <div className="grid grid-cols-4 gap-3">
        {STUDENT_EMOJIS.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => clickStudent(idx)}
            className={`p-3 rounded-2xl text-center transition-all active:scale-90 border
              ${active === idx
                ? 'bg-amber-400/30 border-amber-400 scale-110 shadow-xl shadow-amber-500/40'
                : lit[idx]
                  ? 'bg-emerald-900/30 border-emerald-700'
                  : 'bg-white/5 border-white/10'
              }`}
          >
            <div className="text-3xl">{emoji}</div>
            <div className="text-lg mt-1">{active === idx ? '💡' : lit[idx] ? '✅' : '⬜'}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
