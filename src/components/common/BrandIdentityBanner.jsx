import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, ThumbsUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BrandIdentityBanner = ({ className = '' }) => {
  const navigate = useNavigate();

  const coreCategories = [
    {
      id: 'brakes',
      name: 'เบรก',
      category: 'brake-system',
      iconSvg: (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          {/* Disc rotor */}
          <circle cx="30" cy="30" r="22" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="30" cy="30" r="14" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
          <circle cx="30" cy="30" r="6" fill="#020617" />
          {/* Drilled holes */}
          <circle cx="30" cy="14" r="1.5" fill="#E2E8F0" />
          <circle cx="30" cy="46" r="1.5" fill="#E2E8F0" />
          <circle cx="14" cy="30" r="1.5" fill="#E2E8F0" />
          <circle cx="46" cy="30" r="1.5" fill="#E2E8F0" />
          {/* Red Caliper */}
          <path
            d="M 38 12 C 48 16, 52 26, 50 36 C 48 38, 44 38, 42 34 C 40 28, 38 20, 34 16 Z"
            fill="#E63946"
            stroke="#FF6B6B"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      id: 'engine',
      name: 'เครื่องยนต์',
      category: 'engine-parts',
      iconSvg: (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          {/* V-Engine Block */}
          <path
            d="M 18 18 L 26 14 L 30 20 L 34 14 L 42 18 L 46 34 L 40 44 L 20 44 L 14 34 Z"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          {/* Cylinders */}
          <line x1="22" y1="20" x2="28" y2="32" stroke="#E63946" strokeWidth="2.5" />
          <line x1="38" y1="20" x2="32" y2="32" stroke="#E63946" strokeWidth="2.5" />
          <circle cx="30" cy="38" r="4" fill="#E2E8F0" />
          {/* Piston head / intake */}
          <rect x="25" y="10" width="10" height="5" rx="1.5" fill="#64748B" />
        </svg>
      ),
    },
    {
      id: 'suspension',
      name: 'ช่วงล่าง',
      category: 'suspension',
      iconSvg: (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          {/* Coilover Shock Absorber angled */}
          <g transform="translate(30, 30) rotate(-35) translate(-30, -30)">
            <circle cx="30" cy="10" r="4.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
            <rect x="27" y="15" width="6" height="30" fill="#E2E8F0" />
            {/* Spring coils */}
            <path
              d="M 23 20 Q 30 17, 37 20 M 23 26 Q 30 23, 37 26 M 23 32 Q 30 29, 37 32 M 23 38 Q 30 35, 37 38"
              fill="none"
              stroke="#E63946"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="30" cy="50" r="4.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
          </g>
        </svg>
      ),
    },
    {
      id: 'wheels',
      name: 'ล้อ & ยาง',
      category: 'tires-wheels',
      iconSvg: (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          {/* Tire outer tread */}
          <circle cx="30" cy="30" r="23" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          {/* Alloy Rim */}
          <circle cx="30" cy="30" r="16" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
          {/* 5-Spoke Wheel */}
          <g stroke="#E2E8F0" strokeWidth="2.5">
            <line x1="30" y1="30" x2="30" y2="15" />
            <line x1="30" y1="30" x2="44" y2="25" />
            <line x1="30" y1="30" x2="39" y2="42" />
            <line x1="30" y1="30" x2="21" y2="42" />
            <line x1="30" y1="30" x2="16" y2="25" />
          </g>
          <circle cx="30" cy="30" r="4.5" fill="#E63946" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`relative w-full rounded-3xl bg-[#07090E] border border-[#2B354C] p-6 sm:p-10 shadow-2xl overflow-hidden text-center flex flex-col items-center ${className}`}
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(230, 57, 70, 0.15), transparent 70%), radial-gradient(ellipse at 50% 80%, rgba(15, 23, 42, 0.6), transparent 70%)',
      }}
    >
      {/* Background Automotive Speed Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e63946_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* TOP EMBLEM: TACHOMETER & CAR SILHOUETTE */}
      <div className="relative w-full max-w-md mx-auto mb-2">
        <svg viewBox="0 0 400 160" className="w-full h-auto max-h-36 overflow-visible">
          <defs>
            <linearGradient id="bannerChrome" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="52%" stopColor="#475569" />
              <stop offset="80%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="bannerRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="40%" stopColor="#E63946" />
              <stop offset="80%" stopColor="#9A031E" />
              <stop offset="100%" stopColor="#4A000A" />
            </linearGradient>
            <filter id="gaugeGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E63946" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Tachometer Arc */}
          <path
            d="M 80 130 A 130 130 0 0 1 320 130"
            fill="none"
            stroke="#1E293B"
            strokeWidth="8"
            strokeDasharray="6 8"
          />
          {/* Redline RPM zone */}
          <path
            d="M 220 38 A 130 130 0 0 1 315 125"
            fill="none"
            stroke="url(#bannerRed)"
            strokeWidth="10"
            filter="url(#gaugeGlow)"
          />
          {/* Tachometer needle */}
          <line x1="200" y1="120" x2="270" y2="50" stroke="#FF4D4D" strokeWidth="4" strokeLinecap="round" />
          <circle cx="200" cy="120" r="8" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />

          {/* Sports Coupe Car Silhouette Roofline */}
          <path
            d="M 30 120 C 70 115, 120 70, 195 68 C 265 66, 310 95, 370 120"
            fill="none"
            stroke="url(#bannerChrome)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 90 112 C 135 80, 185 78, 235 78 C 270 78, 295 95, 330 112"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Speed horizontal cut */}
          <line x1="20" y1="128" x2="380" y2="128" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* BRAND NAME: 3D METALLIC MOTIX */}
      <div className="flex items-center justify-center my-1 select-none">
        <span
          className="font-heading font-black tracking-tight text-5xl sm:text-7xl lg:text-8xl"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 25%, #94A3B8 50%, #334155 52%, #CBD5E1 78%, #0F172A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.9))',
          }}
        >
          MOTI
        </span>
        <span
          className="font-heading font-black tracking-tight text-5xl sm:text-7xl lg:text-8xl -ml-1 sm:-ml-2"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 35%, #C1121F 70%, #780000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 16px rgba(230, 57, 70, 0.8))',
          }}
        >
          X
        </span>
      </div>

      {/* AUTO & MOTORCYCLE PARTS */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 max-w-md w-full">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#E63946] to-[#E63946]" />
        <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#FF5722] uppercase whitespace-nowrap">
          AUTO & MOTORCYCLE PARTS
        </span>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#E63946] to-[#E63946]" />
      </div>

      {/* MAIN SLOGAN: KEEP YOUR RIDE MOVING. (ให้รถของคุณพร้อมเดินทางต่อ) */}
      <div className="mt-4 mb-6 space-y-1.5 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-wider font-heading">
          KEEP YOUR RIDE{' '}
          <span className="text-[#E63946] italic">
            MOVING.
          </span>
        </h2>
        <div className="flex items-center justify-center gap-3 text-slate-300 font-['Prompt']">
          <span className="h-[1px] w-8 bg-red-500/50" />
          <span className="text-sm sm:text-base font-semibold text-slate-200">
            ให้รถของคุณพร้อมเดินทางต่อ
          </span>
          <span className="h-[1px] w-8 bg-red-500/50" />
        </div>
      </div>

      {/* 4 CORE CATEGORY EMBLEMS (เบรก, เครื่องยนต์, ช่วงล่าง, ล้อ & ยาง) */}
      <div className="w-full max-w-3xl my-5 p-4 rounded-2xl bg-[#0D1018]/90 border border-red-900/40 relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {coreCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.category}`)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#131722] hover:bg-[#1C2333] border border-[#232B3E] hover:border-[#E63946] transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#1C2230] to-[#0F1420] border border-slate-700/60 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-red-500/80 transition-transform shadow-md">
                {cat.iconSvg}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 VALUE PROPOSITIONS (BOTTOM TRAPEZOID BAR) */}
      <div className="w-full max-w-3xl mt-4 pt-4 border-t border-[#1F2738] grid grid-cols-1 sm:grid-cols-3 gap-3 text-left sm:text-center">
        {/* Quality Parts */}
        <div className="flex items-center sm:justify-center gap-3 p-2.5 rounded-xl bg-[#111520]/60 border border-[#20273A]">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#E63946] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black uppercase text-white tracking-wider">QUALITY PARTS</div>
            <div className="text-[11px] text-slate-400">อะไหล่คุณภาพแท้ 100%</div>
          </div>
        </div>

        {/* Fast Delivery */}
        <div className="flex items-center sm:justify-center gap-3 p-2.5 rounded-xl bg-[#111520]/60 border border-[#20273A]">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5722] shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black uppercase text-white tracking-wider">FAST DELIVERY</div>
            <div className="text-[11px] text-slate-400">จัดส่งรวดเร็ว 24-48 ชม.</div>
          </div>
        </div>

        {/* Best Price */}
        <div className="flex items-center sm:justify-center gap-3 p-2.5 rounded-xl bg-[#111520]/60 border border-[#20273A]">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black uppercase text-white tracking-wider">BEST PRICE</div>
            <div className="text-[11px] text-slate-400">ราคาคุ้มค่า การันตีศูนย์</div>
          </div>
        </div>
      </div>
    </div>
  );
};
