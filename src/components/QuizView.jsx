import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { playSound } from '../utils/sound';
import { ChevronLeft, Star, Timer, CheckCircle2, XCircle, Printer, RotateCcw, User, Flame, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView = ({ onBack }) => {
  const [screen, setScreen] = useState('intro'); // intro | play | results
  const [playerName, setPlayerName] = useState('');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState(null);

  const q = QUIZ_QUESTIONS[qIdx];

  useEffect(() => {
    if (screen !== 'play' || selected !== null) return;
    if (timeLeft <= 0) { handleSelect(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, timeLeft, selected]);

  const start = () => {
    playSound('click');
    setScreen('play');
    setQIdx(0); setScore(0); setStreak(0); setCorrect(0);
    setSelected(null); setTimeLeft(20); setFeedback(null);
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const ok = idx === q.correct;
    if (ok) {
      playSound('correct');
      const bonusStreak = streak * 25;
      const pts = 100 + timeLeft * 10 + bonusStreak;
      setScore(s => s + pts);
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
    } else {
      playSound('wrong');
      setStreak(0);
    }
    setFeedback({ ok, text: q.explanation });
  };

  const next = () => {
    playSound('click');
    if (qIdx < QUIZ_QUESTIONS.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setTimeLeft(20); setFeedback(null);
    } else {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      setScreen('results');
    }
  };

  const rank = correct >= 9 ? 'Catedrático Supremo de Euler' : correct >= 7 ? 'Discípulo Dilecto de Root' : correct >= 4 ? 'Amigo de la Casa' : 'Aprendiz del Profesor';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all border border-white/10"
      >
        <ChevronLeft className="w-4 h-4" /> Volver al Mapa
      </button>

      {/* INTRO */}
      {screen === 'intro' && (
        <div className="relative rounded-3xl glass-panel border border-emerald-500/40 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-emerald-400/20 animate-float">
            🎓
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold">Desafío Intelectual</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              Trivia Final del Profesor
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              10 preguntas cronometradas sobre los 11 capítulos: personajes, matemáticas poéticas y momentos clave de la novela de Yōko Ogawa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            {[
              ['📝', '10 Preguntas', 'Capítulos 1 al 11'],
              ['⏱️', '20 Segundos', 'Bonos por velocidad'],
              ['🏆', 'Diploma de Honor', 'Con tu nombre oficial'],
            ].map(([emoji, title, desc]) => (
              <div key={title} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-2xl block">{emoji}</span>
                <p className="font-bold text-white text-[11px]">{title}</p>
                <p className="text-[10px] text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-black/50 p-2.5 rounded-2xl border border-emerald-500/30 focus-within:border-emerald-400 transition-all shadow-inner">
            <User className="w-5 h-5 text-emerald-400 ml-2" />
            <input
              type="text" 
              value={playerName} 
              maxLength={30}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Escribe tu nombre para el Diploma Final..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2 font-medium"
            />
          </div>

          <button 
            onClick={start} 
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-950/80 transition-all active:scale-95"
          >
            ¡Comenzar Desafío! →
          </button>
        </div>
      )}

      {/* PLAY */}
      {screen === 'play' && (
        <div className="rounded-3xl glass-panel border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* HUD SUPERIOR */}
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="text-slate-400 font-mono">
              Pregunta <strong className="text-white text-base">{qIdx + 1}</strong>/10
            </span>

            {/* Racha */}
            {streak >= 2 && (
              <div className="flex items-center gap-1 font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/50 animate-pulse">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>RACHA x{streak}!</span>
              </div>
            )}

            <div className={`flex items-center gap-1.5 font-mono font-bold ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>

            <span className="text-cyan-300 font-mono font-bold text-sm sm:text-base">
              {score} pts
            </span>
          </div>

          {/* Barra de Tiempo */}
          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-amber-400'
              }`} 
              style={{ width: `${(timeLeft / 20) * 100}%` }} 
            />
          </div>

          {/* Pregunta */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300">
              {q.chapter}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white pt-1 leading-snug">
              {q.question}
            </h3>
          </div>

          {/* Opciones */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let style = 'bg-black/30 border-white/10 text-slate-200 hover:border-emerald-400/50 hover:bg-white/5';
              if (selected !== null) {
                if (idx === q.correct) style = 'bg-emerald-950/90 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]';
                else if (idx === selected) style = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-1 ring-rose-400';
                else style = 'bg-black/20 border-white/5 text-slate-600 opacity-40';
              }
              return (
                <button 
                  key={idx} 
                  onClick={() => handleSelect(idx)} 
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${style}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </span>
                  {selected !== null && idx === q.correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Retroalimentación */}
          {feedback && (
            <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-3 animate-fade-in ${
              feedback.ok 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {feedback.ok ? <span>✨ ¡Respuesta Correcta!</span> : <span>❌ Explicación:</span>}
              </div>
              <p className="text-slate-300">{feedback.text}</p>
              <button 
                onClick={next} 
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                {qIdx < 9 ? 'Siguiente Pregunta →' : 'Ver Resultados Finales 🎓'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS & DIPLOMA */}
      {screen === 'results' && (
        <div className="rounded-3xl glass-panel border border-emerald-500/40 p-6 sm:p-8 space-y-6 text-center shadow-2xl animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center text-3xl shadow-xl">
            🏆
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">Evaluación Culminada</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">¡Trivia Completada!</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              [score, 'Puntos Totales', 'text-amber-300'],
              [`${correct}/10`, 'Aciertos', 'text-emerald-300'],
              [rank, 'Rango Obtenido', 'text-purple-300 text-xs sm:text-sm truncate'],
            ].map(([val, lbl, col]) => (
              <div key={lbl} className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <p className={`font-bold font-mono text-base sm:text-xl ${col}`}>{val}</p>
                <p className="text-[10px] text-slate-400">{lbl}</p>
              </div>
            ))}
          </div>

          {/* DIPLOMA IMPRIMIBLE DE NOVELA */}
          <div className="bg-[#fefae0] text-[#283618] rounded-3xl p-6 sm:p-8 border-8 border-[#dda15e] shadow-2xl space-y-4 printable-area" id="diploma">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#bc6c25] text-[#fefae0] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              ∞
            </div>
            
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#606c38] font-bold">Certificado de Excelencia Literaria</p>
              <h4 className="text-xl sm:text-2xl font-serif font-extrabold uppercase tracking-wide text-[#283618]">
                Diploma de Maestría
              </h4>
              <p className="text-xs text-[#606c38] italic font-serif">La Fórmula Preferida del Profesor · 博士の愛した数式</p>
            </div>

            <div className="border-b-2 border-[#dda15e] pb-2 max-w-sm mx-auto">
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#bc6c25]">
                {playerName || 'Estudiante Distinguido'}
              </p>
            </div>

            <p className="text-xs text-[#283618]/80 max-w-md mx-auto leading-relaxed">
              Por haber demostrado profundo entendimiento de la novela de <strong>Yōko Ogawa</strong>, comprendiendo el valor de los números amigos (220 y 284), el amor filial de Root y la eternidad de la identidad de Euler: <span className="font-mono font-bold">e^(iπ) + 1 = 0</span>.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#dda15e]/50 text-[11px] font-serif">
              <div>
                <div className="w-24 h-px bg-[#bc6c25]/40 mx-auto mb-1" />
                <strong className="text-[#283618]">El Profesor</strong><br />
                <span className="text-[#606c38] text-[10px]">80 minutos de memoria</span>
              </div>
              <div>
                <div className="w-24 h-px bg-[#bc6c25]/40 mx-auto mb-1" />
                <strong className="text-[#283618]">Root (√)</strong><br />
                <span className="text-[#606c38] text-[10px]">Profesor de Matemáticas</span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()} 
              className="flex-1 py-3.5 rounded-2xl bg-amber-600/30 border border-amber-500/50 text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-amber-600/40 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" /> Imprimir Diploma
            </button>
            <button 
              onClick={start} 
              className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Intentar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
