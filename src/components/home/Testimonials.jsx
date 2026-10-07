import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote, Users, Truck, Sparkles } from 'lucide-react';
import { testimonials, marketingStats } from '../../data/reviews';
import { SectionTitle } from '../common/SectionTitle';
import { RatingStars } from '../common/RatingStars';

export const Testimonials = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#0E1119] border-t border-[#1C2230] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <SectionTitle
          tagline="CUSTOMER REVIEWS & SOCIAL PROOF"
          title="เสียงตอบรับจากผู้ขับขี่และช่างมืออาชีพ"
          subtitle="ความพึงพอใจจากผู้ใช้จริงทั่วประเทศ ทั้งเจ้าของรถยนต์ มอเตอร์ไซค์ และเจ้าของอู่ซ่อมรถ"
          align="center"
          className="max-w-3xl mx-auto mb-12 text-center"
        />

        {/* 1. Marketing Stats Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 p-6 rounded-3xl bg-[#141824] border border-[#262F42] shadow-xl">
          {marketingStats.map((stat, i) => (
            <div key={i} className="text-center p-3">
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1">
                {stat.labelTh}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 flex flex-col justify-between shadow-lg relative group hover:border-[#E63946]/40 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Header Rating & Date */}
                <div className="flex items-center justify-between">
                  <RatingStars rating={testi.rating} size="sm" showNumber={false} />
                  <span className="text-xs text-slate-400">{testi.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{testi.comment}"
                </p>
              </div>

              {/* User & Product Purchased */}
              <div className="pt-4 mt-4 border-t border-[#1C2230] space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={testi.avatar}
                    alt={testi.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#2B354A]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{testi.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <span className="text-[11px] text-slate-400 block">{testi.role}</span>
                  </div>
                </div>

                {testi.productPurchased && (
                  <div className="p-2 rounded-lg bg-[#0A0D14] border border-[#1A2130] text-[10px] text-slate-400 truncate">
                    <span className="text-[#FF6B6B] font-semibold">สินค้าที่ซื้อ: </span>
                    {testi.productPurchased}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
