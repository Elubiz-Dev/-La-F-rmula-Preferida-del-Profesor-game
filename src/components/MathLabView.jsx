import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  Binary, 
  Compass, 
  Volume2,
  ChevronLeft,
  BookOpen
} from 'lucide-react';
import { MathFormula } from '../utils/katexHelper';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const MathLabView = ({ onBackToStory, onBackToCampaign }) => {
  // Estado para Euler
  const [selectedEulerConst, setSelectedEulerConst] = useState('all');
  
  // Estado para Gauss
  const [gaussN, setGaussN] = useState(10);
  
  // Estado para Root
  const [rootNumber, setRootNumber] = useState(10);

  // Datos para los 5 componentes de Euler
  const eulerConstants = [
    {
      id: 'e',
      symbol: 'e',
      name: 'Número de Euler (Base Natural)',
      value: '2.7182818...',
      role: 'Representa el crecimiento continuo y el análisis matemático en su máxima expresión.',
      quote: 'El número que describe cómo florecen los cerezos y cómo se multiplica la vida.'
    },
    {
      id: 'i',
      symbol: 'i',
      name: 'Unidad Imaginaria',
      value: '√(-1)',
      role: 'Extiende los números reales al plano complejo, permitiendo girar en 90° hacia dimensiones ocultas.',
      quote: 'Un número tímido que no existe en la recta real, pero sostiene la física moderna.'
    },
    {
      id: 'pi',
      symbol: 'π',
      name: 'Número Pi (Geometría Cósmica)',
      value: '3.1415926...',
      role: 'La relación perfecta entre la circunferencia y su diámetro; el alma de los círculos.',
      quote: 'El abrazo infinito que une el punto de partida con el destino.'
    },
    {
      id: 'one',
      symbol: '1',
      name: 'La Unidad (El Origen)',
      value: '1',
      role: 'El elemento neutro de la multiplicación y la base de todos los números naturales.',
      quote: 'El primer paso del conteo; el ser.'
    },
    {
      id: 'zero',
      symbol: '0',
      name: 'El Cero (El Vacío y la Paz)',
      value: '0',
      role: 'El origen de coordenadas, el equilibrio absoluto y el silencio creador.',
      quote: 'La nada que lo contiene todo; el silencio que reconcilió a la familia.'
    }
  ];

  const handleEulerClick = (id) => {
    playSound('euler');
    setSelectedEulerConst(id);
    if (id === 'all') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8 animate-fade-in">
      
      {/* Botones de navegación superior */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {onBackToCampaign && (
          <button
            onClick={() => { playSound('click'); onBackToCampaign(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Volver a Campaña
          </button>
        )}
        {onBackToStory && (
          <button
            onClick={() => { playSound('click'); onBackToStory(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold transition-all ml-auto"
          >
            <BookOpen className="w-4 h-4" /> Leer Novela
          </button>
        )}
      </div>

      {/* Título del Laboratorio */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Laboratorio de Exploración Matemática</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chalk-white">
          Las 4 Grandes Joyas del Profesor
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Manipula las fórmulas, descubre sus patrones ocultos y entiende por qué el Profesor las consideraba poemas escritos por la mano de Dios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TARJETA 1: IDENTIDAD DE EULER */}
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-purple-900/60 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
            <span className="text-xs font-mono font-bold text-purple-400">01 / EULER</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/40">
              La Ecuación de Dios
            </span>
          </div>

          <div className="text-center bg-chalkboard-900/80 p-5 rounded-2xl border border-purple-500/30 shadow-inner">
            <div className="text-3xl sm:text-4xl font-serif text-chalk-gold py-2">
              <MathFormula math="e^{i\pi} + 1 = 0" block />
            </div>
            <button 
              onClick={() => handleEulerClick('all')}
              className="mt-3 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full transition-all shadow flex items-center gap-1.5 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" /> Tocar el Acorde de Euler
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Reúne las 5 constantes matemáticas universales ($e, i, \pi, 1, 0$) y las operaciones básicas (suma, multiplicación y exponenciación).
          </p>

          {/* Chips de Constantes */}
          <div className="grid grid-cols-5 gap-2">
            {eulerConstants.map((c) => (
              <button
                key={c.id}
                onClick={() => handleEulerClick(c.id)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  selectedEulerConst === c.id
                    ? 'bg-purple-600 text-white border-purple-300 shadow-lg scale-105'
                    : 'bg-chalkboard-900 text-purple-200 border-purple-900/60 hover:border-purple-500'
                }`}
              >
                <div className="text-base font-serif font-bold">{c.symbol}</div>
                <div className="text-[9px] text-slate-300 truncate">{c.name.split(' ')[0]}</div>
              </button>
            ))}
          </div>

          {/* Tarjeta de Explicación de la Constante Seleccionada */}
          <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-700/30 min-h-[90px]">
            {selectedEulerConst === 'all' ? (
              <div className="text-xs text-purple-200 space-y-1">
                <p className="font-bold text-amber-300">✨ La Reconciliación Universal:</p>
                <p>En el Capítulo 7, el Profesor escribe esta fórmula para recordar a todos que en el universo no hay discordia cuando lo infinito ($e^\pi$) y lo imaginario ($i$) se unen con el $1$ para descansar en la paz del $0$.</p>
              </div>
            ) : (
              (() => {
                const item = eulerConstants.find((c) => c.id === selectedEulerConst);
                return (
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-purple-300">{item.name} ({item.value}):</p>
                    <p className="text-slate-300">{item.role}</p>
                    <p className="text-[11px] text-amber-300 font-handwritten text-sm italic">"{item.quote}"</p>
                  </div>
                );
              })()
            )}
          </div>
        </div>

        {/* TARJETA 2: EL TRUCO DEL PEQUEÑO GAUSS */}
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-emerald-900/60 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-400">02 / GAUSS</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/40">
              Suma de Términos
            </span>
          </div>

          <div className="text-center bg-chalkboard-900/80 p-4 rounded-2xl border border-emerald-500/30">
            <div className="text-2xl sm:text-3xl font-serif text-emerald-300 py-1">
              <MathFormula math="S = \frac{n(n+1)}{2}" block />
            </div>
            <p className="text-xs text-slate-400 mt-1">Suma de los primeros $n$ números enteros positivos</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Selecciona $N$: <strong className="text-amber-300 font-mono text-base">{gaussN}</strong></span>
              <input 
                type="range"
                min="4"
                max="100"
                step="2"
                value={gaussN}
                onChange={(e) => {
                  playSound('click');
                  setGaussN(Number(e.target.value));
                }}
                className="w-40 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Visualización de Parejas */}
            <div className="bg-chalkboard-900/90 p-4 rounded-xl border border-emerald-900/50 space-y-2">
              <div className="text-xs text-emerald-300 font-semibold flex items-center justify-between">
                <span>Parejas formadas:</span>
                <span className="font-mono text-amber-300">{gaussN / 2} pares de {gaussN + 1}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 scrollbar-thin">
                {Array.from({ length: Math.min(gaussN / 2, 8) }).map((_, i) => (
                  <div key={i} className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-950 border border-emerald-700 text-slate-300">
                    ({i + 1} + {gaussN - i} = <span className="text-cyan-300">{gaussN + 1}</span>)
                  </div>
                ))}
                {gaussN / 2 > 8 && (
                  <div className="text-[11px] text-slate-400 self-center">
                    ... y {(gaussN / 2) - 8} parejas más
                  </div>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-900/50 text-center font-mono text-sm font-bold text-emerald-300">
                Resultado: {gaussN / 2} × {gaussN + 1} = <span className="text-amber-400 text-lg">{(gaussN * (gaussN + 1)) / 2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 3: NÚMEROS AMIGOS (220 y 284) */}
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-amber-900/60 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400">03 / AMISTAD</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/40">
              Armonía Divina
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 bg-chalkboard-900/80 p-4 rounded-2xl border border-amber-500/30">
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-amber-300">220</div>
              <div className="text-[10px] text-slate-400 mt-1">Cumpleaños Asistenta</div>
            </div>
            <Heart className="w-7 h-7 text-rose-400 animate-pulse" />
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-cyan-300">284</div>
              <div className="text-[10px] text-slate-400 mt-1">Reloj del Profesor</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-chalkboard-900/70 rounded-xl border border-amber-900/40">
              <div className="font-semibold text-amber-300 mb-1">Divisores de 220:</div>
              <div className="flex flex-wrap gap-1 font-mono text-[10px] text-slate-300">
                {[1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110].map((d) => (
                  <span key={d} className="px-1 bg-amber-950/60 rounded border border-amber-800/40">{d}</span>
                ))}
              </div>
              <div className="mt-2 text-right font-mono text-cyan-300 font-bold">∑ = 284 ✨</div>
            </div>

            <div className="p-3 bg-chalkboard-900/70 rounded-xl border border-cyan-900/40">
              <div className="font-semibold text-cyan-300 mb-1">Divisores de 284:</div>
              <div className="flex flex-wrap gap-1 font-mono text-[10px] text-slate-300">
                {[1, 2, 4, 71, 142].map((d) => (
                  <span key={d} className="px-1 bg-cyan-950/60 rounded border border-cyan-800/40">{d}</span>
                ))}
              </div>
              <div className="mt-2 text-right font-mono text-amber-300 font-bold">∑ = 220 ✨</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 italic text-center">
            "Fueron creados el uno para el otro por la providencia divina de las matemáticas."
          </p>
        </div>

        {/* TARJETA 4: EL REFUGIO DE LA RAÍZ (ROOT) */}
        <div className="bg-chalkboard-800/90 rounded-3xl border-2 border-teal-900/60 p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-teal-900/40 pb-3">
            <span className="text-xs font-mono font-bold text-teal-400">04 / RADICAL</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700/40">
              El Nombre de Root
            </span>
          </div>

          <div className="text-center bg-chalkboard-900/80 p-4 rounded-2xl border border-teal-500/30">
            <div className="text-3xl font-serif text-teal-300 py-1">
              <MathFormula math="\sqrt{x}" block />
            </div>
            <p className="text-xs text-slate-400 mt-1">El techo que protege con infinita generosidad</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <input 
                type="number"
                value={rootNumber}
                onChange={(e) => setRootNumber(Number(e.target.value))}
                placeholder="Número"
                className="w-24 px-3 py-1.5 text-center bg-chalkboard-900 border border-teal-600 rounded-xl text-amber-300 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button 
                onClick={() => playSound('correct')}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow transition-all"
              >
                Cobijar
              </button>
            </div>

            <div className="p-4 bg-teal-950/40 rounded-xl border border-teal-800/40 text-center">
              <div className="text-xl font-mono text-teal-200">
                &radic;<span className="text-amber-300">{rootNumber}</span> = <span className="text-cyan-300 font-bold">
                  {rootNumber >= 0 
                    ? Math.sqrt(rootNumber).toFixed(6) 
                    : `${Math.sqrt(Math.abs(rootNumber)).toFixed(6)} i`}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                {rootNumber < 0 
                  ? '¡El radical abraza incluso a los números imaginarios sin juzgarlos!' 
                  : Number.isInteger(Math.sqrt(rootNumber)) 
                    ? '¡Es un cuadrado perfecto!' 
                    : 'Un número irracional con infinitos decimales, seguro bajo el techo.'}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
