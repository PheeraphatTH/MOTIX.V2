import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Zap, ChevronRight, Timer, Percent } from 'lucide-react';
import { products } from '../../data/products';
import { CountdownTimer } from '../common/CountdownTimer';
import { ProductCard } from '../products/ProductCard';

export const FlashSale = () => {
  // Flash sale products (discounted products)
  const flashSaleItems = products.filter((p) => p.isPromotion).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#07090E] via-[#0E121B] to-[#07090E] border-y border-[#1A2336] relative overflow-hidden">
      {/* Background glow styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-carbon opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flash Sale Header Cockpit Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 p-6 sm:p-8 rounded-3xl glass-card border border-red-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Glowing Red Corner Flare */}
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-red-600/20 via-orange-600/10 to-transparent pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-[#FF6B6B] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-[#E63946] text-[#E63946] animate-pulse motion-reduce:animate-none" />
              <span className="telemetry-chip font-bold">LIMITED TIME DEALS</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-heading">
              ดีลอะไหล่สปีดเดือด <span className="text-[#FF6B6B] font-extrabold">ลดสูงสุด 20%</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              คัดสรรอะไหล่แท้เกรดพรีเมียมและ Performance ปรับราคาพิเศษจำนวนจำกัดต่อวัน
            </p>
          </div>

          {/* Right side: Countdown + Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 relative z-10">
            <div className="p-3 rounded-2xl bg-[#090C12]/90 border border-[#232D42] shadow-inner">
              <CountdownTimer hoursFromNow={8} label="ดีลพิเศษหมดเวลาใน" />
            </div>
            <Link
              to="/promotions"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white text-xs font-bold transition-all shadow-[0_4px_15px_rgba(230,57,70,0.4)] hover:shadow-[0_6px_20px_rgba(230,57,70,0.55)] cursor-pointer"
            >
              <span>ดูดีลทั้งหมด</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashSaleItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
