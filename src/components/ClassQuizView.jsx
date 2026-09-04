import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  HelpCircle, 
  Timer, 
  GraduationCap, 
  User,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const ClassQuizView = ({ onBackToStory }) => {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'play', 'results'
  const [playerName, setPlayerName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState(null);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  useEffect(() => {
    let timer = null;
    if (gameState === 'play' && selectedOption === null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'play' && selectedOption === null && timeLeft === 0) {
      // Se agotó el tiempo
      handleSelectOption(-1);
    }
    return () => clearInterval(timer);
  }, [gameState, selectedOption, timeLeft]);

  const handleStart = () => {
    playSound('click');
    setGameState('play');
    setCurrentQIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setTimeLeft(20);
    setFeedback(null);
  };

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // evitar doble clic

    setSelectedOption(index);
    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      playSound('correct');
      const timeBonus = timeLeft * 10;
      const points = 100 + timeBonus;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: `¡Correcto! (+${points} pts) ${currentQ.explanation}`
      });
    } else {
      playSound('wrong');
      setFeedback({
        isCorrect: false,
        text: index === -1 
          ? `⏰ ¡Tiempo agotado! La respuesta correcta era: ${currentQ.options[currentQ.correct]}.`
          : `Incorrecto. ${currentQ.explanation}`
      });
    }
  };

  const handleNextQuestion = () => {
    playSound('click');
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(20);
      setFeedback(null);
    } else {
      // Fin del Quiz
      playSound('euler');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setGameState('results');
    }
  };

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      {/* PANTALLA 1: INTRODUCCIÓN */}
      {gameState === 'intro' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-emerald-900/60 p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-950/80 ring-4 ring-emerald-400/30">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chalk-white">
              Gran Trivia Escolar & Concurso
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
              Pon a prueba a tu audiencia con 10 preguntas interactivas sobre la historia del Profesor, Root, la asistenta y los teoremas del libro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto text-left text-xs">
            <div className="p-3 bg-chalkboard-900/80 rounded-xl border border-emerald-900 text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">📝 10 Preguntas</span>
              Basadas en los 11 capítulos y fórmulas clave.
            </div>
            <div className="p-3 bg-chalkboard-900/80 rounded-xl border border-emerald-900 text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">⏱️ 20s por Ronda</span>
              Responde rápido para sumar bonos de tiempo.
            </div>
            <div className="p-3 bg-chalkboard-900/80 rounded-xl border border-emerald-900 text-slate-300">
              <span className="font-bold text-cyan-400 block mb-1">🎓 Diploma Oficial</span>
              Certificado honorario descargable al finalizar.
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-4 pt-2">
            <div className="flex items-center gap-2 bg-chalkboard-900 p-2 rounded-2xl border border-emerald-700/60 focus-within:ring-2 focus-within:ring-emerald-400">
              <User className="w-5 h-5 text-emerald-400 ml-2" />
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nombre del Alumno o Equipo"
                maxLength={35}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2"
              />
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-950/80 transition-all flex items-center justify-center gap-2"
            >
              <span>¡Comenzar Desafío!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PANTALLA 2: JUEGO ACTIVO */}
      {gameState === 'play' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-emerald-900/60 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Barra de Progreso y Marcador */}
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-4">
            <div className="text-xs font-semibold text-slate-300">
              Pregunta <span className="text-emerald-400 font-bold font-mono text-base">{currentQIndex + 1}</span> de {QUIZ_QUESTIONS.length}
            </div>
            
            <div className="flex items-center gap-2 bg-chalkboard-900/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 font-mono text-sm font-bold">
              <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{timeLeft}s</span>
            </div>

            <div className="text-xs font-mono font-bold text-cyan-300 bg-chalkboard-900 px-3 py-1.5 rounded-xl border border-cyan-800/50">
              {score} pts
            </div>
          </div>

          {/* Tarjeta de Pregunta */}
          <div className="space-y-4">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700/50 text-emerald-300 uppercase tracking-wider">
              {currentQ.chapter}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-chalk-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQ.correct;

              let btnStyle = 'bg-chalkboard-900/80 border-emerald-900/60 text-slate-200 hover:border-emerald-500 hover:bg-chalkboard-700';

              if (selectedOption !== null) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-950/90 border-rose-600 text-rose-200 ring-2 ring-rose-500';
                } else {
                  btnStyle = 'bg-chalkboard-900/40 border-slate-800 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-mono text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </span>

                  {selectedOption !== null && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Banner de Feedback y Botón Siguiente */}
          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-3 ${
              feedback.isCorrect 
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200' 
                : 'bg-rose-950/70 border-rose-800 text-rose-200'
            }`}>
              <p>{feedback.text}</p>
              <div className="text-right">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  {currentQIndex < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados y Diploma 🎓'}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* PANTALLA 3: RESULTADOS Y DIPLOMA */}
      {gameState === 'results' && (
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-emerald-900/60 p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <Award className="w-14 h-14 mx-auto text-amber-400 animate-bounce" />
            <h2 className="text-3xl font-serif font-bold text-chalk-white">
              ¡Misión Cumplida!
            </h2>
            <p className="text-xs text-slate-300">
              Has demostrado un dominio excepcional de la historia y sus fundamentos matemáticos.
            </p>
          </div>

          {/* Marcador Final */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-chalkboard-900/80 border border-emerald-900">
              <div className="text-2xl font-bold font-mono text-amber-300">{score}</div>
              <div className="text-[11px] text-slate-400 mt-1">Puntos Totales</div>
            </div>
            <div className="p-4 rounded-2xl bg-chalkboard-900/80 border border-emerald-900">
              <div className="text-2xl font-bold font-mono text-emerald-300">{correctCount} / 10</div>
              <div className="text-[11px] text-slate-400 mt-1">Aciertos</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-chalkboard-900/80 border border-emerald-900">
              <div className="text-sm font-bold text-cyan-300 truncate">
                {correctCount >= 8 ? 'Catedrático de Euler' : correctCount >= 5 ? 'Discípulo de Root' : 'Aprendiz de los Tigers'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Rango Obtenido</div>
            </div>
          </div>

          {/* DIPLOMA IMPRIMIBLE DE HONOR */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 text-stone-900 border-8 border-amber-900/40 shadow-2xl relative print:m-0 print:border-none">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-serif text-xl font-bold">
                ∞
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold uppercase tracking-wide text-amber-950">
                Diploma de Maestría Matemática y Humana
              </h3>
              <p className="text-xs text-stone-600 italic">
                En memoria de las lecciones eternas del Profesor y la novela de Yōko Ogawa
              </p>

              <div className="py-2">
                <span className="text-xs text-stone-500 uppercase tracking-widest block mb-1">Se confiere el presente honor a:</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 border-b-2 border-amber-900/30 pb-1 inline-block px-4">
                  {playerName.trim() || 'Estudiante Honorario'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto leading-relaxed">
                Por haber comprendido la belleza inmortal de la fórmula <strong className="font-mono">e^(iπ) + 1 = 0</strong>, el cobijo generoso del radical y el indestructible amor que une a los seres humanos a través de los números.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-amber-900/20 text-stone-800 text-[11px]">
                <div>
                  <div className="w-24 h-0.5 bg-amber-900/40 mx-auto mb-1"></div>
                  <strong className="font-handwritten text-base block text-stone-900">El Profesor</strong>
                  <span className="text-stone-500">Memoria de 80 minutos</span>
                </div>
                <div>
                  <div className="w-24 h-0.5 bg-amber-900/40 mx-auto mb-1"></div>
                  <strong className="font-handwritten text-base block text-stone-900">Root</strong>
                  <span className="text-stone-500">Profesor de Matemáticas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimir / Guardar Diploma
            </button>
            <button
              onClick={handleStart}
              className="px-5 py-2.5 rounded-xl bg-chalkboard-700 hover:bg-chalkboard-600 text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Jugar de Nuevo
            </button>
            <button
              onClick={onBackToStory}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              Volver a la Presentación
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
