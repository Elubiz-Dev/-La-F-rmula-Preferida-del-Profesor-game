import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  Heart, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Crown,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const ArcadeGamesView = () => {
  const [activeGame, setActiveGame] = useState('baseball');

  // ================= ESTADO JUEGO 1: BÉISBOL =================
  const [bbScore, setBbScore] = useState(0);
  const [bbLives, setBbLives] = useState(3);
  const [bbTime, setBbTime] = useState(30);
  const [bbPlaying, setBbPlaying] = useState(false);
  const [bbCurrentNum, setBbCurrentNum] = useState(28);
  const [bbFeedback, setBbFeedback] = useState('¡Presiona "Comenzar Partido" para batear los lanzamientos de Enatsu!');

  // Lista de números para los lanzamientos
  const baseballNumbers = [
    { n: 2, type: 'prime' },
    { n: 6, type: 'perfect' },
    { n: 7, type: 'prime' },
    { n: 9, type: 'composite' },
    { n: 13, type: 'prime' },
    { n: 15, type: 'composite' },
    { n: 19, type: 'prime' },
    { n: 24, type: 'composite' },
    { n: 28, type: 'perfect' },
    { n: 31, type: 'prime' },
    { n: 496, type: 'perfect' },
    { n: 37, type: 'prime' },
    { n: 42, type: 'composite' }
  ];

  useEffect(() => {
    let interval = null;
    if (bbPlaying && bbTime > 0 && bbLives > 0) {
      interval = setInterval(() => {
        setBbTime((prev) => prev - 1);
      }, 1000);
    } else if (bbTime === 0 || bbLives === 0) {
      setBbPlaying(false);
      if (bbScore > 50) {
        playSound('euler');
        confetti({ particleCount: 80, spread: 70 });
        setBbFeedback(`🏆 ¡HOMERUN! Fin del partido. Puntuación final: ${bbScore} pts.`);
      } else {
        playSound('wrong');
        setBbFeedback(`Fin del partido. Puntuación final: ${bbScore} pts. ¡Sigue practicando!`);
      }
    }
    return () => clearInterval(interval);
  }, [bbPlaying, bbTime, bbLives, bbScore]);

  const startBaseball = () => {
    playSound('baseball');
    setBbScore(0);
    setBbLives(3);
    setBbTime(30);
    setBbPlaying(true);
    pickNextBaseballNumber();
    setBbFeedback('¡Batea rápido identificando si el número es Primo, Compuesto o Perfecto!');
  };

  const pickNextBaseballNumber = () => {
    const item = baseballNumbers[Math.floor(Math.random() * baseballNumbers.length)];
    setBbCurrentNum(item);
  };

  const handleSwing = (typeSelected) => {
    if (!bbPlaying) return;
    playSound('baseball');

    const isCorrect = bbCurrentNum.type === typeSelected;
    if (isCorrect) {
      playSound('correct');
      const bonus = bbCurrentNum.type === 'perfect' ? 30 : 10;
      setBbScore((prev) => prev + bonus);
      setBbFeedback(`¡BATAZO LIMPIO! +${bonus} pts (${bbCurrentNum.n} es ${typeSelected === 'prime' ? 'Primo' : typeSelected === 'perfect' ? 'Número Perfecto' : 'Compuesto'})`);
    } else {
      playSound('wrong');
      setBbLives((prev) => prev - 1);
      setBbFeedback(`¡STRIKE! ${bbCurrentNum.n} NO es ${typeSelected}. Pierdes una vida.`);
    }

    pickNextBaseballNumber();
  };

  // ================= ESTADO JUEGO 2: POST-ITS =================
  const postitCards = [
    { id: 'p1', note: 'Mi memoria dura sólo 80 minutos', target: 'El Profesor' },
    { id: 'p2', note: 'Tiene la cabeza plana como √', target: 'Root' },
    { id: 'p3', note: 'Cumpleaños: 220 (Amigo del 284)', target: 'La Asistenta' },
    { id: 'p4', note: 'Fórmula de Euler: e^(iπ) + 1 = 0', target: 'La Reconciliación' },
  ];
  const [selectedPostit, setSelectedPostit] = useState(null);
  const [matchedPostits, setMatchedPostits] = useState([]);
  const [postitFeedback, setPostitFeedback] = useState('Selecciona una nota amarilla y luego su significado correspondiente.');

  const handleSelectNote = (id) => {
    playSound('click');
    setSelectedPostit(id);
  };

  const handleMatchTarget = (targetName) => {
    if (!selectedPostit) return;
    const card = postitCards.find((c) => c.id === selectedPostit);
    if (card && card.target === targetName) {
      playSound('correct');
      setMatchedPostits([...matchedPostits, card.id]);
      setSelectedPostit(null);
      setPostitFeedback(`¡Correcto! Has sujetado la nota con su alfiler: "${card.note}" 📌`);
      if (matchedPostits.length + 1 === postitCards.length) {
        playSound('euler');
        confetti({ particleCount: 70, spread: 60 });
        setPostitFeedback('🎉 ¡Memoria restaurada con éxito! Has colocado todas las notas del traje.');
      }
    } else {
      playSound('wrong');
      setPostitFeedback('Esa nota no corresponde a ese significado. ¡Intenta de nuevo!');
    }
  };

  // ================= ESTADO JUEGO 3: DUELO GAUSS =================
  const [gaussDuelN, setGaussDuelN] = useState(20);
  const [gaussOptions, setGaussOptions] = useState([210, 190, 400, 200]);
  const [gaussDuelScore, setGaussDuelScore] = useState(0);
  const [gaussFeedback, setGaussFeedback] = useState('Calcula la suma del 1 al N usando la fórmula de Gauss: S = n(n+1)/2');

  const generateGaussRound = () => {
    const n = (Math.floor(Math.random() * 8) + 2) * 10; // 20, 30, 40, 50, 60...
    const correctSum = (n * (n + 1)) / 2;
    const fake1 = correctSum + n;
    const fake2 = correctSum - n / 2;
    const fake3 = (n * n) / 2;
    const opts = [correctSum, fake1, fake2, fake3].sort(() => Math.random() - 0.5);

    setGaussDuelN(n);
    setGaussOptions(opts);
  };

  const handleGaussAnswer = (ans) => {
    const correctSum = (gaussDuelN * (gaussDuelN + 1)) / 2;
    if (ans === correctSum) {
      playSound('correct');
      setGaussDuelScore((prev) => prev + 100);
      setGaussFeedback(`¡Exacto! S = ${gaussDuelN} × ${gaussDuelN + 1} / 2 = ${correctSum} (+100 pts) ✨`);
      generateGaussRound();
    } else {
      playSound('wrong');
      setGaussFeedback(`Incorrecto. La suma del 1 al ${gaussDuelN} es ${correctSum}. ¡Prueba la siguiente!`);
      generateGaussRound();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      {/* Selector de Minijuegos */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => { playSound('click'); setActiveGame('baseball'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
            activeGame === 'baseball'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/60 ring-2 ring-amber-400'
              : 'bg-chalkboard-800 text-slate-300 hover:bg-chalkboard-700'
          }`}
        >
          <span>⚾ Béisbol Hanshin Tigers (#28)</span>
        </button>

        <button
          onClick={() => { playSound('click'); setActiveGame('postits'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
            activeGame === 'postits'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400'
              : 'bg-chalkboard-800 text-slate-300 hover:bg-chalkboard-700'
          }`}
        >
          <span>📌 El Traje de Post-its del Profesor</span>
        </button>

        <button
          onClick={() => { playSound('click'); setActiveGame('gauss'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
            activeGame === 'gauss'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-400'
              : 'bg-chalkboard-800 text-slate-300 hover:bg-chalkboard-700'
          }`}
        >
          <span>⚡ Duelo Rápido de Gauss</span>
        </button>
      </div>

      {/* ================= ESCENARIO DEL JUEGO ================= */}

      {/* JUEGO 1: BÉISBOL */}
      {activeGame === 'baseball' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-amber-900/60 p-6 shadow-2xl max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-amber-300 flex items-center gap-2">
                ⚾ Bateo de Primos, Compuestos y Perfectos
              </h3>
              <p className="text-xs text-slate-300">Enfrenta los lanzamientos zurdos de Yutaka Enatsu (#28).</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-amber-950/70 border border-amber-700/40 px-3 py-1.5 rounded-xl text-amber-300">
                Puntos: <strong className="text-base">{bbScore}</strong>
              </div>
              <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-200">
                Tiempo: <strong className="text-base text-cyan-300">{bbTime}s</strong>
              </div>
              <div className="bg-rose-950/70 border border-rose-800/40 px-3 py-1.5 rounded-xl text-rose-300">
                Vidas: {'❤️'.repeat(Math.max(0, bbLives))}
              </div>
            </div>
          </div>

          {/* Arena de Béisbol */}
          <div className="bg-chalkboard-900/90 p-8 rounded-2xl border border-emerald-950 text-center space-y-6">
            <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
              Lanzamiento en trayectoria:
            </div>
            
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-300 text-slate-900 flex items-center justify-center font-mono text-4xl font-extrabold shadow-2xl shadow-amber-500/20 ring-4 ring-amber-400/50 animate-bounce">
              {bbPlaying ? bbCurrentNum.n : '⚾'}
            </div>

            {/* Botones de Bateo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSwing('prime')}
                disabled={!bbPlaying}
                className="p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShieldCheck className="w-4 h-4" /> ¡Es Primo!
              </button>
              
              <button
                onClick={() => handleSwing('composite')}
                disabled={!bbPlaying}
                className="p-3.5 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Layers className="w-4 h-4" /> ¡Es Compuesto!
              </button>

              <button
                onClick={() => handleSwing('perfect')}
                disabled={!bbPlaying}
                className="p-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Crown className="w-4 h-4" /> ¡Es Perfecto (6, 28)!
              </button>
            </div>

            <div className="p-3 rounded-xl bg-chalkboard-800 border border-emerald-900 text-xs text-slate-200">
              {bbFeedback}
            </div>
          </div>

          <div className="text-center">
            {!bbPlaying && (
              <button
                onClick={startBaseball}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/80 transition-all flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4" /> Comenzar Partido
              </button>
            )}
          </div>
        </div>
      )}

      {/* JUEGO 2: TABLERO DE POST-ITS */}
      {activeGame === 'postits' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-emerald-900/60 p-6 shadow-2xl max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-emerald-300 flex items-center gap-2">
                📌 Las Notas del Traje del Profesor
              </h3>
              <p className="text-xs text-slate-300">Empareja cada nota con su significado antes de que los 80 minutos se agoten.</p>
            </div>
            <button
              onClick={() => {
                setMatchedPostits([]);
                setSelectedPostit(null);
                setPostitFeedback('Selecciona una nota y empareja su significado.');
              }}
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Tablero
            </button>
          </div>

          {/* Tablero de dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Columna Notas Post-it */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Notas en la Chaqueta:</h4>
              {postitCards.map((c) => {
                const isMatched = matchedPostits.includes(c.id);
                const isSelected = selectedPostit === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => !isMatched && handleSelectNote(c.id)}
                    disabled={isMatched}
                    className={`w-full text-left p-4 rounded-xl font-handwritten text-lg font-bold transition-all ${
                      isMatched 
                        ? 'bg-emerald-950/60 border border-emerald-700/50 text-slate-400 opacity-50 line-through'
                        : isSelected
                          ? 'bg-yellow-300 text-stone-950 ring-4 ring-amber-500 scale-105 shadow-xl'
                          : 'bg-yellow-200 hover:bg-yellow-300 text-stone-900 shadow-md'
                    }`}
                  >
                    📌 "{c.note}"
                  </button>
                );
              })}
            </div>

            {/* Columna Objetivos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Significado en la Historia:</h4>
              {['El Profesor', 'Root', 'La Asistenta', 'La Reconciliación'].map((target) => (
                <button
                  key={target}
                  onClick={() => handleMatchTarget(target)}
                  className="w-full text-left p-4 rounded-xl bg-chalkboard-900/80 hover:bg-chalkboard-700 border border-emerald-800/60 text-slate-200 font-semibold text-sm transition-all hover:border-emerald-400 flex items-center justify-between"
                >
                  <span>{target}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              ))}
            </div>

          </div>

          <div className="p-3 rounded-xl bg-chalkboard-900 border border-emerald-900 text-xs text-center text-slate-200">
            {postitFeedback}
          </div>
        </div>
      )}

      {/* JUEGO 3: DUELO RÁPIDO DE GAUSS */}
      {activeGame === 'gauss' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-cyan-900/60 p-6 shadow-2xl max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-cyan-300 flex items-center gap-2">
                ⚡ Duelo Rápido del Pequeño Gauss
              </h3>
              <p className="text-xs text-slate-300">Usa la fórmula $S = n(n+1)/2$ para calcular en segundos.</p>
            </div>
            <div className="bg-cyan-950/70 border border-cyan-700/40 px-3 py-1.5 rounded-xl text-cyan-300 font-mono text-xs">
              Puntos: <strong className="text-base">{gaussDuelScore}</strong>
            </div>
          </div>

          <div className="bg-chalkboard-900/90 p-6 rounded-2xl border border-cyan-900 text-center space-y-5">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Suma los primeros {gaussDuelN} números:</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">
              1 + 2 + 3 + ... + {gaussDuelN} = ?
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {gaussOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleGaussAnswer(opt)}
                  className="p-4 rounded-xl bg-chalkboard-800 hover:bg-cyan-900 border border-cyan-800/60 text-slate-100 font-mono text-xl font-bold hover:border-cyan-400 transition-all shadow"
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-chalkboard-800 border border-cyan-950 text-xs text-slate-300">
              {gaussFeedback}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
