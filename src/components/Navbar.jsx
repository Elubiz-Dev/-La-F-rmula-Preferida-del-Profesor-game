import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Volume2, VolumeX, Maximize, Minimize, Package, Award, 
  Star, Sparkles, BookOpen, Gamepad2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { playSound } from '../utils/sound';

export const Navbar = ({ activeTab, setActiveTab, soundEnabled, toggleSoundHandler, totalCards, totalStars }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const scrollContainerRef = useRef(null);
  const tabRefs = useRef({});
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const tabs = [
    { id: 'campaign', label: 'Campaña', icon: Gamepad2, badge: 'Arcade' },
    { id: 'story', label: 'Novela', icon: BookOpen, badge: '11 Cap.' },
    { id: 'mathlab', label: 'Laboratorio', icon: Sparkles, badge: 'Math' },
    { id: 'collection', label: 'Colección', icon: Package, badge: `${totalCards}/11` },
    { id: 'quiz', label: 'Trivia', icon: Award, badge: 'Diploma' },
  ];

  // Chequear límites de scroll horizontal estrictamente dentro del contenedor
  const updateScrollIndicators = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollIndicators();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollIndicators, { passive: true });
    window.addEventListener('resize', updateScrollIndicators);

    const resizeObserver = new ResizeObserver(() => updateScrollIndicators());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', updateScrollIndicators);
      resizeObserver.disconnect();
    };
  }, [updateScrollIndicators]);

  // Centrar pestaña activa usando scrollTo del contenedor para evitar desplazar la ventana del navegador
  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const targetScroll = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width / 2) + (elRect.width / 2);
      
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
    updateScrollIndicators();
  }, [activeTab, updateScrollIndicators]);

  // Funciones de navegación con flechas
  const scrollByAmount = (offset) => {
    if (scrollContainerRef.current) {
      playSound('click');
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Soporte de Arrastre (Mouse Drag-to-Scroll)
  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current);
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleTabClick = (id) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    playSound('click');
    setActiveTab(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071311]/95 backdrop-blur-2xl border-b border-emerald-500/20 px-2.5 sm:px-5 py-2 sm:py-2.5 shadow-xl shadow-black/60 transition-all w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-2 w-full min-w-0">

        {/* Fila Principal: Logo + Métricas y Controles */}
        <div className="flex items-center justify-between gap-2 w-full min-w-0">
          
          {/* Logo & Título (Auto-adaptable a pantallas pequeñas) */}
          <div 
            onClick={() => { playSound('click'); setActiveTab('campaign'); }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0 flex-1 overflow-hidden"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-600 flex items-center justify-center shadow-lg shadow-emerald-950/60 ring-1.5 sm:ring-2 ring-emerald-400/40 text-white font-serif text-lg sm:text-2xl font-bold group-hover:scale-105 transition-transform">
                <span>∞</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-500 ring-2 ring-[#071311] flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-black animate-pulse">
                ★
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-base md:text-lg font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 leading-tight truncate">
                La Fórmula Preferida del Profesor
              </h1>
              <p className="text-[10px] sm:text-xs text-emerald-400/90 font-medium flex items-center gap-1 truncate" style={{ fontFamily: 'Caveat, cursive', fontSize: '0.85rem' }}>
                <span className="truncate">博士の愛した数式</span>
                <span className="text-slate-600 shrink-0">·</span>
                <span className="text-amber-300/90 shrink-0">Yōko Ogawa</span>
              </p>
            </div>
          </div>

          {/* Estadísticas de jugador + Controles (Compacto para móviles) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Estrellas y cartas */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-black/60 border border-emerald-500/25 text-xs shadow-inner select-none shrink-0">
              <div className="flex items-center gap-1 text-amber-400 font-bold font-mono text-[11px] sm:text-xs">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>{totalStars}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-normal">/33</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1 text-emerald-400 font-bold font-mono text-[11px] sm:text-xs">
                <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                <span>{totalCards}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-normal">/11</span>
              </div>
            </div>

            {/* Botón de Sonido */}
            <button
              onClick={toggleSoundHandler}
              title={soundEnabled ? "Silenciar audio" : "Activar audio"}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all shrink-0 ${
                soundEnabled
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 hover:border-emerald-300 shadow-sm'
                  : 'bg-rose-950/40 border-rose-800/50 text-rose-400 hover:bg-rose-900/50'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Botón Pantalla Completa */}
            <button
              onClick={toggleFullscreen}
              title="Pantalla completa"
              className="p-1.5 sm:p-2 rounded-xl bg-black/50 border border-emerald-900/50 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all shrink-0"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>

        </div>

        {/* Fila de Navegación por pestañas deslizable */}
        <div className="relative w-full min-w-0 flex items-center">
          
          {/* Indicador / Flecha Izquierda */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount(-180)}
              title="Ver pestañas anteriores"
              className="absolute left-1 z-30 w-7 h-7 rounded-full bg-[#071311]/95 border border-emerald-400/60 text-emerald-300 flex items-center justify-center shadow-lg shadow-black hover:bg-emerald-900/80 active:scale-90 transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Máscara de desvanecimiento izquierda */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#071311] via-[#071311]/80 to-transparent pointer-events-none z-20 rounded-l-2xl" />
          )}

          {/* Contenedor Navegable con Drag y Touch Scroll */}
          <nav 
            ref={scrollContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex items-center gap-2 bg-black/55 p-1.5 px-2.5 sm:px-3 rounded-2xl border border-emerald-500/20 shadow-inner overflow-x-auto no-scrollbar scroll-smooth touch-pan-x select-none cursor-grab active:cursor-grabbing w-full min-w-0"
            style={{ overscrollBehaviorX: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {tabs.map(({ id, label, icon: Icon, badge }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  ref={(el) => (tabRefs.current[id] = el)}
                  onClick={() => handleTabClick(id)}
                  className={`shrink-0 relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap min-h-[36px] sm:min-h-[40px] ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-emerald-950/80 ring-1 ring-emerald-400/60 scale-[1.01]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-emerald-500/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors ${isActive ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-slate-400'}`} />
                  <span className="tracking-wide">{label}</span>
                  {badge && (
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md font-mono shrink-0 transition-all ${
                      isActive 
                        ? 'bg-black/40 text-emerald-200 border border-emerald-400/30' 
                        : 'bg-white/5 text-slate-400 border border-white/5'
                    }`}>
                      {badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Máscara de desvanecimiento derecha */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#071311] via-[#071311]/80 to-transparent pointer-events-none z-20 rounded-r-2xl" />
          )}

          {/* Indicador / Flecha Derecha */}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount(180)}
              title="Ver más pestañas"
              className="absolute right-1 z-30 w-7 h-7 rounded-full bg-[#071311]/95 border border-emerald-400/60 text-emerald-300 flex items-center justify-center shadow-lg shadow-black hover:bg-emerald-900/80 active:scale-90 transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>
    </header>
  );
};


