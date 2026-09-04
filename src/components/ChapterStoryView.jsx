import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Lightbulb, 
  Sparkles, 
  BookOpen, 
  Feather, 
  Heart, 
  Award, 
  Check, 
  Flame,
  Binary
} from 'lucide-react';
import { CHAPTERS, ACTS } from '../data/chaptersData';
import { MathFormula } from '../utils/katexHelper';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const ChapterStoryView = ({ onGoToLab }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapter = CHAPTERS[currentChapterIndex];

  // Mini-estados para los widgets interactivos de cada capítulo
  const [rootInputVal, setRootInputVal] = useState(10);
  const [gaussN, setGaussN] = useState(10);
  const [eulerActiveConst, setEulerActiveConst] = useState(null);
  const [amicableHover, setAmicableHover] = useState(null);

  // Soporte para navegación con flechas de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex]);

  const handleNext = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      playSound('page');
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      playSound('page');
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const currentAct = ACTS.find((a) => a.chapters.includes(chapter.id));

  // Renderizador dinámico del Widget Matemático del capítulo
  const renderMathWidget = () => {
    switch (chapter.id) {
      case 1: // Números Amigos
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 bg-chalkboard-900/60 p-4 rounded-xl border border-emerald-800/40">
              <div 
                className="text-center p-3 rounded-lg bg-emerald-950/70 border border-emerald-600/40 hover:border-amber-400 transition-all cursor-pointer"
                onMouseEnter={() => { playSound('click'); setAmicableHover('220'); }}
              >
                <div className="text-2xl font-bold text-amber-300 font-mono">220</div>
                <div className="text-xs text-slate-300 mt-1">Cumpleaños de Asistenta</div>
                <div className="text-[10px] text-emerald-400 mt-1">Suma divisores = 284</div>
              </div>

              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
                <span className="text-[11px] text-slate-400 font-handwritten text-sm">Amor Aritmético</span>
              </div>

              <div 
                className="text-center p-3 rounded-lg bg-emerald-950/70 border border-emerald-600/40 hover:border-amber-400 transition-all cursor-pointer"
                onMouseEnter={() => { playSound('click'); setAmicableHover('284'); }}
              >
                <div className="text-2xl font-bold text-cyan-300 font-mono">284</div>
                <div className="text-xs text-slate-300 mt-1">Reloj del Profesor</div>
                <div className="text-[10px] text-cyan-400 mt-1">Suma divisores = 220</div>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-chalkboard-800/50 p-3 rounded-lg border border-emerald-900/40">
              <p className="font-semibold text-emerald-300 mb-1">Divisores de 220:</p>
              <p className="font-mono text-[11px] text-slate-400">1 + 2 + 4 + 5 + 10 + 11 + 20 + 22 + 44 + 55 + 110 = <span className="text-cyan-300 font-bold">284</span></p>
              <p className="font-semibold text-cyan-300 mt-2 mb-1">Divisores de 284:</p>
              <p className="font-mono text-[11px] text-slate-400">1 + 2 + 4 + 71 + 142 = <span className="text-amber-300 font-bold">220</span></p>
            </div>
          </div>
        );

      case 2: // El símbolo de Root (Raíz)
        return (
          <div className="space-y-4">
            <div className="bg-chalkboard-900/80 p-4 rounded-xl border border-emerald-800/50 text-center">
              <p className="text-xs text-slate-300 mb-2">Ingresa cualquier número para cobijarlo bajo el radical:</p>
              <div className="flex items-center justify-center gap-2">
                <input 
                  type="number" 
                  value={rootInputVal}
                  onChange={(e) => setRootInputVal(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-center bg-chalkboard-800 border border-emerald-600 rounded text-amber-300 font-mono font-bold"
                />
                <button 
                  onClick={() => { playSound('correct'); }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-semibold text-white transition-all shadow"
                >
                  Cobijar
                </button>
              </div>

              <div className="mt-4 p-3 bg-emerald-950/60 rounded-lg border border-emerald-700/40 flex items-center justify-center gap-3">
                <span className="text-3xl font-serif text-emerald-400">&radic;</span>
                <span className="text-2xl font-mono text-amber-300">{rootInputVal}</span>
                <span className="text-xl text-slate-400">=</span>
                <span className="text-lg font-mono text-cyan-300">
                  {rootInputVal >= 0 
                    ? Math.sqrt(rootInputVal).toFixed(4) 
                    : `${Math.sqrt(Math.abs(rootInputVal)).toFixed(4)} i (Número Imaginario)`}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                "El radical no desprecia a ningún número; les da a todos un techo y dignidad."
              </p>
            </div>
          </div>
        );

      case 3: // Números Primos y el 28
        return (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-amber-950/40 to-emerald-950/40 p-4 rounded-xl border border-amber-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚾ Hanshin Tigers · #28 Yutaka Enatsu</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">Número Perfecto</span>
              </div>
              <div className="text-center my-3">
                <span className="text-4xl font-extrabold font-mono text-amber-300">28</span>
              </div>
              <div className="bg-chalkboard-900/80 p-2.5 rounded text-center font-mono text-xs text-slate-300">
                Divisores propios: 1 + 2 + 4 + 7 + 14 = <strong className="text-emerald-400">28</strong>
              </div>
            </div>
          </div>
        );

      case 4: // El truco de Gauss
        return (
          <div className="space-y-3">
            <div className="bg-chalkboard-900/80 p-3 rounded-xl border border-emerald-800/40">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span>Sumar del 1 hasta: <strong className="text-amber-300 font-mono">{gaussN}</strong></span>
                <input 
                  type="range" 
                  min="4" 
                  max="100" 
                  step="2" 
                  value={gaussN}
                  onChange={(e) => {
                    setGaussN(Number(e.target.value));
                  }}
                  className="w-28 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-700/40 text-center">
                <div className="text-xs text-slate-400 mb-1">
                  {gaussN / 2} parejas de ({gaussN + 1})
                </div>
                <div className="text-xl font-mono font-bold text-emerald-300">
                  Total = {(gaussN * (gaussN + 1)) / 2}
                </div>
              </div>
            </div>
          </div>
        );

      case 7: // La Identidad de Euler
        return (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-900 p-4 rounded-xl border border-purple-500/40 text-center">
              <div className="text-2xl sm:text-3xl font-serif text-chalk-gold py-2">
                <MathFormula math="e^{i\pi} + 1 = 0" block />
              </div>
              <p className="text-xs text-purple-200 mt-2">
                La fórmula que desarmó el odio y trajo el silencio sagrado a la cabaña.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['e (Crecimiento)', 'i (Imaginario)', 'π (Círculo)', '1 (Unidad)', '0 (Paz)'].map((c, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded bg-purple-900/60 border border-purple-400/30 text-purple-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 rounded-xl bg-chalkboard-900/70 border border-emerald-800/40 text-center space-y-3">
            <div className="text-2xl font-serif text-emerald-300">
              <MathFormula math={chapter.mathConcept.latex} block />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {chapter.mathConcept.description}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 lg:px-8 py-4">
      
      {/* Selector de Capítulos tipo Línea de Tiempo */}
      <div className="bg-chalkboard-800/80 p-3 rounded-2xl border border-emerald-900/50 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === currentChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  playSound('page');
                  setCurrentChapterIndex(idx);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/80 scale-105 ring-2 ring-emerald-400'
                    : 'bg-chalkboard-900/70 text-slate-300 hover:text-white hover:bg-chalkboard-700 border border-emerald-950'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center font-mono text-[10px]">
                  {ch.id}
                </span>
                <span className="truncate max-w-[90px] sm:max-w-[130px]">{ch.title.split(' ')[0]} {ch.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de Pizarra del Capítulo */}
      <div className="relative rounded-3xl bg-chalkboard-800/90 border-4 border-emerald-950 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Encabezado del Capítulo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/50 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                {chapter.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentAct?.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-chalk-white mt-1">
              {chapter.title}
            </h2>
            <p className="text-xs text-emerald-400 font-handwritten text-lg">
              {chapter.japaneseTitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono text-slate-400">
              {chapter.id} de 11
            </span>
          </div>
        </div>

        {/* Contenido Grid: Narrativa + Concepto Matemático */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Columna Izquierda: Historia y Post-it (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Cita Textual tipo Post-it del Profesor */}
            <div className="postit-card p-5 rounded-2xl relative">
              <div className="absolute -top-3 left-6 w-4 h-4 rounded-full bg-rose-500 shadow ring-2 ring-white/80" title="Alfiler de notas del Profesor"></div>
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-stone-700 flex-shrink-0 mt-1 opacity-70" />
                <p className="font-handwritten text-xl sm:text-2xl text-stone-900 leading-snug font-bold">
                  "{chapter.quote}"
                </p>
              </div>
            </div>

            {/* Síntesis Narrativa */}
            <div className="bg-chalkboard-900/70 p-5 rounded-2xl border border-emerald-900/60 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Feather className="w-4 h-4" />
                <span>Síntesis del Capítulo</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {chapter.synopsis}
              </p>
            </div>

            {/* Claves del Relato */}
            <div className="bg-chalkboard-900/40 p-4 rounded-2xl border border-emerald-950">
              <h4 className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Lightbulb className="w-4 h-4" />
                <span>Momentos Clave & Ensayos:</span>
              </h4>
              <ul className="space-y-2">
                {chapter.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Pizarra Interactiva del Concepto Matemático (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-chalkboard-900/90 rounded-2xl border-2 border-emerald-800/60 p-5 shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-4">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>La Belleza Matemática</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                  {chapter.mathConcept.tag}
                </span>
              </div>

              {/* Render del Widget Interactivo */}
              {renderMathWidget()}
            </div>

            {/* Pie del Widget */}
            <div className="mt-5 pt-3 border-t border-emerald-900/50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 italic">
                Enseñanza poética de Yōko Ogawa
              </span>
              <button 
                onClick={onGoToLab}
                className="text-xs text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
              >
                Abrir en Laboratorio →
              </button>
            </div>
          </div>

        </div>

        {/* Botones de Navegación Inferiores */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-emerald-900/50">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentChapterIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-chalkboard-900 text-slate-500'
                : 'bg-chalkboard-700 hover:bg-chalkboard-600 text-white shadow'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="text-xs text-slate-400 hidden sm:block">
            Navega con las flechas <kbd className="px-1.5 py-0.5 rounded bg-chalkboard-900 border border-slate-700 text-slate-300 font-mono">⬅️</kbd> y <kbd className="px-1.5 py-0.5 rounded bg-chalkboard-900 border border-slate-700 text-slate-300 font-mono">➡️</kbd>
          </div>

          <button
            onClick={handleNext}
            disabled={currentChapterIndex === CHAPTERS.length - 1}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentChapterIndex === CHAPTERS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-chalkboard-900 text-slate-500'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/80'
            }`}
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
