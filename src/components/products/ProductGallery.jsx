import React, { useState } from 'react';
import { ShieldCheck, ZoomIn, RotateCw, Camera, Sparkles } from 'lucide-react';
import { Product360Viewer } from './Product360Viewer';

export const ProductGallery = ({ product, images = [], productName = 'Product' }) => {
  const [activeMode, setActiveMode] = useState('360'); // default to '360' or 'gallery'
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const galleryImages = images.length > 0 ? images : (product?.images || [product?.image]);
  const activeImage = galleryImages[selectedImageIndex] || galleryImages[0];
  const name = productName || product?.name || 'Product';

  return (
    <div className="flex flex-col gap-4">
      {/* View Mode Switcher: 360° View vs Studio Gallery */}
      <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#111624] border border-[#243048]">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveMode('360')}
            className={`flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              activeMode === '360'
                ? 'bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-[0_2px_12px_rgba(230,57,70,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>หมุนดู 360 องศา (360° View)</span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-amber-300 font-extrabold border border-amber-400/30">
              PRO 360°
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('gallery')}
            className={`flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              activeMode === 'gallery'
                ? 'bg-[#1C2538] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>ภาพถ่ายสตูดิโอ ({galleryImages.length})</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 font-medium px-2">
          <Sparkles className="w-3 h-3 text-[#FF5722]" />
          <span>Interactive Inspection</span>
        </div>
      </div>

      {/* Main Display Stage */}
      {activeMode === '360' ? (
        <Product360Viewer product={product || { images: galleryImages, name }} />
      ) : (
        <div className="flex flex-col gap-4">
          <div
            className="relative w-full pt-[90%] sm:pt-[85%] studio-canvas border border-[#243048] rounded-3xl overflow-hidden group shadow-lg"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <div className="absolute inset-0 p-8 sm:p-12 flex items-center justify-center">
              <img
                src={activeImage}
                alt={name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain transition-transform duration-300 drop-shadow-xl ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[11px] text-slate-200 flex items-center gap-1.5 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5 text-[#E63946]" />
              <span className="hidden sm:inline">เลื่อนเมาส์เพื่อซูม</span>
              <span className="sm:hidden">แตะค้างเพื่อซูม</span>
            </div>

            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-emerald-950/85 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 backdrop-blur-md shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>สินค้าแท้ 100% มีรับประกัน</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden studio-canvas border-2 transition-all shrink-0 p-2 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#E63946] shadow-[0_2px_12px_rgba(230,57,70,0.4)]'
                      : 'border-[#243048] hover:border-[#E63946]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
