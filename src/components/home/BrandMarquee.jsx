import React from 'react';
import { BRAND_LOGOS } from '../../data/productAssets';

export const BrandMarquee = () => {
  const brands = [
    { name: 'Brembo', logo: BRAND_LOGOS['Brembo'], tagline: 'High Performance Brakes' },
    { name: 'Motul', logo: BRAND_LOGOS['Motul'], tagline: '100% Synthetic Oil' },
    { name: 'NGK', logo: BRAND_LOGOS['NGK'], tagline: 'Laser Iridium Spark Plugs' },
    { name: 'YSS', logo: BRAND_LOGOS['YSS'], tagline: 'World Class Suspension' },
    { name: 'GS Battery', logo: BRAND_LOGOS['GS Battery'], tagline: 'Tough & Long Life' },
  ];

  return (
    <div className="relative py-6 bg-[#090C12] border-y border-[#182030] overflow-hidden">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#090C12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#090C12] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-300 telemetry-chip">
              AUTHORIZED OEM & RACING BRANDS
            </span>
          </div>

          {/* Brand Badges Bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10">
            {brands.map((b) => (
              <div
                key={b.name}
                className="group flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/30 transition-all duration-300"
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="h-5 sm:h-6 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="text-sm font-black text-white">{b.name}</span>
                )}
                <span className="hidden xl:inline-block text-[10px] text-slate-400 font-medium">
                  {b.tagline}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
