import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  ShoppingCart,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { Button } from '../common/Button';
import { BrandIdentityBanner } from '../common/BrandIdentityBanner';

export const MarketingShowcase = () => {
  const navigate = useNavigate();

  const journeySteps = [
    {
      step: '01',
      title: 'AWARENESS & BRAND',
      thaiTitle: 'สร้างความมั่นใจ',
      desc: 'รับรู้ถึงแบรนด์ MOTIX ในฐานะพันธมิตรผู้ดูแลการเดินทาง',
      icon: Compass,
    },
    {
      step: '02',
      title: 'INTEREST & FINDER',
      thaiTitle: 'ค้นหาตรงรุ่น 100%',
      desc: 'ระบบเลือกรุ่นรถอัจฉริยะ ตอบโจทย์อะไหล่ที่ถูกต้องทันที',
      icon: Search,
    },
    {
      step: '03',
      title: 'CONSIDERATION',
      thaiTitle: 'สเปกแท้ & รีวิว',
      desc: 'เปรียบเทียบราคา สเปกมาตรฐาน พร้อมรีวิวจากผู้ใช้จริง',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'PURCHASE & DEALS',
      thaiTitle: 'โปรโมชั่น & ชำระเงิน',
      desc: 'รับส่วนลดพิเศษ คูปอง และขั้นตอนการสั่งซื้อสะดวกรวดเร็ว',
      icon: ShoppingCart,
    },
    {
      step: '05',
      title: 'RETENTION & TRUST',
      thaiTitle: 'เดินทางต่อเนื่อง',
      desc: 'รถพร้อมออกเดินทาง รับประกันสินค้าและสิทธิประโยชน์ระยะยาว',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#0B0D12] border-t border-[#1C2230] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Brand Official Identity Banner Showcase */}
        <BrandIdentityBanner />

        {/* Brand Core Emotional Banner (Section 12 & 37) */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A1F2C] via-[#121622] to-[#0D1017] border border-[#2D384E] shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-[#FF6B6B] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-[#E63946] text-[#E63946]" />
              <span>MOTIX BRAND CORE & PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-heading">
              รถพร้อม • คนพร้อม <br />
              <span className="text-[#FF5722]">
                การเดินทางก็ไปต่อได้
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              MOTIX ไม่ได้ขายเพียงแค่ "อะไหล่" แต่เราส่งมอบ <strong>ความพร้อมของรถ ความมั่นใจในทุกเส้นทาง</strong> และความสะดวกสบายในการดูแลรักษารถที่คุณรัก เพราะเราเชื่อว่าทุกการเดินทางควรดำเนินต่อไปได้ไม่มีสะดุด
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/products')}
              >
                เริ่มช้อปอะไหล่ตรงรุ่น
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/about')}
              >
                อ่านเรื่องราวแบรนด์ MOTIX
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Journey Framework (Section 26) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
              DIGITAL MARKETING FRAMEWORK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Customer Journey & Marketing Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              กลยุทธ์การตลาดดิจิทัลที่ขับเคลื่อนประสบการณ์ลูกค้าตั้งแต่จุดเริ่มต้นจนถึงการกลับมาซื้อซ้ำ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#121622] border border-[#222A3B] p-5 flex flex-col justify-between relative group hover:border-[#E63946]/50 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-extrabold text-slate-400">
                        {step.step}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider mb-1">
                      {step.title}
                    </h4>
                    <h5 className="text-sm font-bold text-white mb-2">
                      {step.thaiTitle}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#1C2230] text-[10px] text-slate-400 font-semibold">
                    {idx < 4 ? 'ขั้นตอนต่อไป →' : '✓ พันธมิตรระยะยาว'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
