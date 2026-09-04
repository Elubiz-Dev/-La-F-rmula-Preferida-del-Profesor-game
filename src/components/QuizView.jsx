import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { playSound } from '../utils/sound';
import { ChevronLeft, Star, Timer, CheckCircle2, XCircle, Printer, RotateCcw, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView = ({ onBack }) => {
  const [screen, setScreen] = useState('intro'); // intro | play | results
  const [playerName, setPlayerName] = useState('');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
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
    setQIdx(0); setScore(0); setCorrect(0);
    setSelected(null); setTimeLeft(20); setFeedback(null);
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const ok = idx === q.correct;
    if (ok) { playSound('correct'); const pts = 100 + timeLeft * 10; setScore(s => s + pts); setCorrect(c => c + 1); }
    else playSound('wrong');
    setFeedback({ ok, text: q.explanation });
  };

  const next = () => {
    playSound('click');
    if (qIdx < QUIZ_QUESTIONS.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setTimeLeft(20); setFeedback(null);
    } else {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      setScreen('results');
    }
  };

  const rank = correct >= 8 ? 'Catedrático de Euler' : correct >= 5 ? 'Discípulo de Root' : 'Aprendiz del Profesor';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ChevronLeft className="w-4 h-4" /> Volver al Mapa
      </button>

      {/* INTRO */}
      {screen === 'intro' && (
        <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-8 text-center space-y-6">
          <div className="text-6xl">🎓</div>
          <h2 className="text-3xl font-bold font-serif text-white">Trivia Final del Libro</h2>
          <p className="text-sm text-slate-400">10 preguntas sobre la historia, los personajes y los momentos clave de la novela de Yōko Ogawa.</p>
          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            {[['📝','10 Preguntas'],['⏱️','20s cada una'],['🏆','Diploma final']].map(([e,l]) => (
              <div key={l} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                <span className="text-2xl block mb-1">{e}</span>{l}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-emerald-500 transition-colors">
            <User className="w-5 h-5 text-emerald-400 ml-2" />
            <input
              type="text" value={playerName} maxLength={30}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Escribe tu nombre o equipo"
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2"
            />
          </div>
          <button onClick={start} className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg shadow-xl transition-all active:scale-95">
            ¡Iniciar Desafío! →
          </button>
        </div>
      )}

      {/* PLAY */}
      {screen === 'play' && (
        <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-6 space-y-5">
          {/* HUD */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400 font-mono">Pregunta <strong className="text-emerald-400">{qIdx + 1}</strong>/10</span>
            <div className={`flex items-center gap-1.5 font-mono font-bold ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
              <Timer className="w-4 h-4" />{timeLeft}s
            </div>
            <span className="text-cyan-400 font-mono font-bold">{score} pts</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full">
            <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(timeLeft / 20) * 100}%` }} />
          </div>

          <div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300">{q.chapter}</span>
            <h3 className="text-lg font-bold font-serif text-white mt-3 leading-snug">{q.question}</h3>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              let style = 'bg-white/5 border-white/10 text-slate-200 hover:border-emerald-500 hover:bg-white/10';
              if (selected !== null) {
                if (idx === q.correct) style = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400';
                else if (idx === selected) style = 'bg-rose-900/60 border-rose-600 text-rose-200';
                else style = 'bg-white/3 border-white/5 text-slate-600 opacity-50';
              }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={selected !== null}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 ${style}`}>
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-mono text-slate-400">{String.fromCharCode(65+idx)}</span>
                    {opt}
                  </span>
                  {selected !== null && idx === q.correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-3 ${feedback.ok ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200' : 'bg-rose-950/70 border-rose-800 text-rose-200'}`}>
              <p>{feedback.text}</p>
              <button onClick={next} className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs hover:from-emerald-500 hover:to-teal-500 transition-all">
                {qIdx < 9 ? 'Siguiente pregunta →' : 'Ver resultados 🎓'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {screen === 'results' && (
        <div className="rounded-3xl bg-[#0d1b18]/90 border border-emerald-900/60 p-8 space-y-6 text-center">
          <div className="text-5xl">🏆</div>
          <h3 className="text-2xl font-bold font-serif text-white">¡Trivia Completada!</h3>
          <div className="grid grid-cols-3 gap-3">
            {[[score,'Puntos','text-amber-400'],[`${correct}/10`,'Aciertos','text-emerald-400'],[rank,'Rango','text-purple-400']].map(([v,l,c]) => (
              <div key={l} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <p className={`font-bold text-lg font-mono ${c}`}>{v}</p>
                <p className="text-xs text-slate-400">{l}</p>
              </div>
            ))}
          </div>

          {/* Diploma */}
          <div className="bg-amber-50 text-stone-900 rounded-3xl p-6 border-8 border-amber-800/30 space-y-3 print:border-none" id="diploma">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-serif text-lg font-bold">∞</div>
            <h4 className="text-lg font-serif font-extrabold uppercase tracking-wide text-amber-950">Diploma de Maestría Literaria</h4>
            <p className="text-xs text-stone-500 italic">En honor al legado de Yōko Ogawa y su Profesor</p>
            <p className="text-2xl font-serif font-bold text-amber-900 border-b border-amber-800/30 pb-2">{playerName || 'Estudiante Honorario'}</p>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">Por haber explorado los 11 capítulos, comprendido la belleza matemática y emocional de <em>La Fórmula Preferida del Profesor</em> con distinción.</p>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-amber-800/20 text-stone-700 text-[11px]">
              <div><div className="w-16 h-px bg-amber-800/30 mx-auto mb-1" /><strong>El Profesor</strong><br /><span className="text-stone-500">80 minutos de memoria</span></div>
              <div><div className="w-16 h-px bg-amber-800/30 mx-auto mb-1" /><strong>Root</strong><br /><span className="text-stone-500">Profesor de Matemáticas</span></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => window.print()} className="flex-1 py-3 rounded-2xl bg-amber-600/20 border border-amber-600/40 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-600/30 transition-all">
              <Printer className="w-4 h-4" /> Imprimir
            </button>
            <button onClick={start} className="flex-1 py-3 rounded-2xl bg-white/5 text-slate-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <RotateCcw className="w-4 h-4" /> Repetir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
