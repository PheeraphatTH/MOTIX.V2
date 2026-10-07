import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Compass,
  MoveHorizontal,
} from 'lucide-react';

export const Product360Viewer = ({ product }) => {
  const [rotation, setRotation] = useState(0); // 0 to 360
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1.2) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 1 pixel = 0.8 degrees of rotation
    const newRotation = (startRotation + deltaX * 0.8) % 360;
    setRotation(newRotation < 0 ? newRotation + 360 : newRotation);
  }, [isDragging, startX, startRotation]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartRotation(rotation);
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const newRotation = (startRotation + deltaX * 0.8) % 360;
    setRotation(newRotation < 0 ? newRotation + 360 : newRotation);
  }, [isDragging, startX, startRotation]);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Global mouse release listener
  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  // Calculate simulated 3D perspectives & lighting reflection sheen
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const isBackView = normalizedRotation > 90 && normalizedRotation < 270;
  
  // Specular lighting reflection angle
  const sheenPosition = ((normalizedRotation / 360) * 100).toFixed(1);

  // Preset angle jumps
  const setPresetAngle = (deg) => {
    setRotation(deg);
  };

  // Determine current viewing face label
  const getFacingLabel = () => {
    if (normalizedRotation >= 315 || normalizedRotation < 45) return 'มุมมองด้านหน้า (FRONT 0°)';
    if (normalizedRotation >= 45 && normalizedRotation < 135) return 'มุมมองด้านขวา (RIGHT 90°)';
    if (normalizedRotation >= 135 && normalizedRotation < 225) return 'มุมมองด้านหลัง (REAR 180°)';
    return 'มุมมองด้านซ้าย (LEFT 270°)';
  };

  // Use the primary product image for 360 rotation to maintain product fidelity.
  // Only use specialized 360 frames if product explicitly provides product.frames360
  const primaryImage = product?.image || (product?.images && product.images[0]);
  let currentImage = primaryImage;
  if (product?.frames360 && Array.isArray(product.frames360) && product.frames360.length > 0) {
    const frameIndex = Math.floor((normalizedRotation / 360) * product.frames360.length) % product.frames360.length;
    currentImage = product.frames360[frameIndex];
  }


  return (
    <div className="flex flex-col gap-3 select-none">
      
      {/* 360 Stage Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full pt-[90%] sm:pt-[85%] rounded-3xl studio-canvas border border-[#232D42] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing transition-all ${
          isDragging ? 'ring-2 ring-[#E63946]' : ''
        }`}
      >
        {/* Dynamic Studio Ambient Grid & Lighting Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.95)_0%,rgba(240,243,248,0.85)_60%,rgba(215,223,235,0.5)_100%)] pointer-events-none" />

        {/* 360 Orbit Ground Ring with Degree Ticks */}
        <div className="absolute bottom-6 inset-x-8 sm:inset-x-14 h-24 border-2 border-dashed border-red-500/25 rounded-[100%] pointer-events-none transform rotate-x-60 flex items-center justify-center">
          {/* Orbit Needle Indicator */}
          <div
            className="absolute w-3 h-3 rounded-full bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.9)]"
            style={{
              transform: `rotate(${normalizedRotation}deg) translate(140px) rotate(-${normalizedRotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          />
        </div>

        {/* Dynamic Floor Contact Shadow */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-10 bg-black/25 rounded-[100%] blur-md pointer-events-none transition-transform duration-200"
          style={{
            transform: `translate(-50%, 0) scale(${1 + Math.sin((normalizedRotation * Math.PI) / 180) * 0.15})`,
          }}
        />

        {/* The 3D Rotating Product Image */}
        <div
          className="absolute inset-0 p-8 sm:p-12 flex items-center justify-center pointer-events-none"
          style={{
            perspective: '1200px',
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform"
            style={{
              transform: `scale(${zoomLevel}) perspective(1000px) rotateY(${normalizedRotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.05s linear',
            }}
          >
            <img
              src={currentImage}
              alt={product?.name || 'Product 360 view'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow-2xl"
              draggable={false}
            />

            {/* Specular Light Sheen Overlay (Metallic Reflection gleam) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
              style={{
                background: `linear-gradient(105deg, transparent ${sheenPosition - 20}%, rgba(255,255,255,0.8) ${sheenPosition}%, transparent ${Number(sheenPosition) + 20}%)`,
              }}
            />

            {/* Rear Face Spec stamp indicator (Shows when rotated backwards) */}
            {isBackView && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                QC STAMP: VERIFIED
              </div>
            )}
          </div>
        </div>

        {/* Top-Left Telemetry HUD Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
            <span className="text-xs font-black telemetry-chip tracking-wider text-[#FF6B6B]">
              360° INTERACTIVE
            </span>
            <span className="text-xs font-mono font-bold text-white pl-1 border-l border-white/20">
              {Math.round(normalizedRotation)}°
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm self-start shadow-sm">
            {getFacingLabel()}
          </span>
        </div>

        {/* Top-Right Quick Angle Presets */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          {[0, 90, 180, 270].map((deg) => {
            const isActive = Math.abs(((normalizedRotation - deg + 180) % 360) - 180) < 15;
            return (
              <button
                key={deg}
                type="button"
                onClick={() => setPresetAngle(deg)}
                aria-label={`หมุนไปที่ ${deg} องศา`}
                className={`min-w-[34px] min-h-[34px] px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md border transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  isActive
                    ? 'bg-[#E63946] text-white border-red-500 shadow-md'
                    : 'bg-black/60 text-white/80 border-white/10 hover:bg-black/80'
                }`}
              >
                {deg}°
              </button>
            );
          })}
        </div>

        {/* Bottom Drag Guidance Banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10 flex items-center gap-1.5 shadow-md pointer-events-none">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#FF5722] animate-pulse shrink-0" />
          <span className="hidden sm:inline">คลิกค้างแล้วลากซ้าย-ขวา เพื่อหมุนดูรอบทิศ</span>
          <span className="sm:hidden">แตะแล้วปัดซ้าย-ขวา เพื่อหมุนดูรอบทิศ</span>
        </div>

      </div>

      {/* Control Actions Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#10141F] border border-[#232D42]">
        
        {/* Auto Spin Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`min-h-[40px] flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isAutoSpinning
                ? 'bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-[0_2px_10px_rgba(230,57,70,0.4)]'
                : 'bg-[#182030] hover:bg-[#20293D] text-slate-300 hover:text-white border border-[#2B374E]'
            }`}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>หยุดหมุน</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>หมุนอัตโนมัติ</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setRotation(0);
              setZoomLevel(1);
            }}
            aria-label="รีเซ็ตมุมมอง 0 องศา"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[#182030] hover:bg-[#20293D] text-slate-400 hover:text-white border border-[#2B374E] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="รีเซ็ตมุมมอง 0°"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
            aria-label="ซูมออก"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[#182030] hover:bg-[#20293D] text-slate-400 hover:text-white border border-[#2B374E] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="ซูมออก"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-[11px] font-mono text-slate-300 px-1.5 min-w-[3rem] text-center select-none">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
            aria-label="ซูมเข้า"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-[#182030] hover:bg-[#20293D] text-slate-400 hover:text-white border border-[#2B374E] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="ซูมเข้า"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
