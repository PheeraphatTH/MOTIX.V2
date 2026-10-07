import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Clock, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

export const MotixGarage = () => {
  const articles = [
    {
      id: 1,
      title: 'น้ำมันเครื่องแบบไหน เหมาะกับรถของคุณ?',
      category: 'บทความแนะนำ',
      readTime: '3 นาที',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80',
      summary: 'เจาะลึกความแตกต่างระหว่างสังเคราะห์แท้ กึ่งสังเคราะห์ และเบอร์ความหนืดที่เหมาะสมที่สุดสำหรับสภาพอากาศเมืองไทย',
    },
    {
      id: 2,
      title: 'โซ่และสเตอร์มอเตอร์ไซค์ ควรเปลี่ยนเมื่อไหร่?',
      category: 'บทความแนะนำ',
      readTime: '4 นาที',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
      summary: 'สัญญาณเตือนข้อตาย ฟันสเตอร์แหลม และระยะยืดที่เริ่มอันตราย พร้อมวิธีดูแลรักษาเพื่อยืดอายุการใช้งาน',
    },
    {
      id: 3,
      title: 'ขับทางไกล ควรเช็กอะไรบ้าง ก่อนออกเดินทาง?',
      category: 'บทความแนะนำ',
      readTime: '5 นาที',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
      summary: 'เช็กลิสต์ 7 จุดสำคัญ ยาง เบรก ระบบไฟส่องสว่าง และหม้อน้ำ เพื่อความปลอดภัยสูงสุดตลอดเส้นทาง',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#07090E] border-t border-[#182030] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title & Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[#FF6B6B] font-bold text-xs uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-[#E63946]" />
              <span className="telemetry-chip font-bold">MOTIX GARAGE KNOWLEDGE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              ความรู้ดี ๆ สำหรับคนรักรถ
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              บทความ เจาะลึกการบำรุงรักษา และเทคนิคการเซ็ตรถจากช่างผู้เชี่ยวชาญ เพื่อให้คุณขับขี่ได้อย่างเต็มสมรรถนะ
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111624] hover:bg-[#182032] text-slate-200 border border-[#243048] text-xs font-bold transition-all shrink-0 self-start lg:self-auto hover:border-red-500/50 shadow-sm"
          >
            <span>อ่านบทความทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl glass-card border border-[#1E273A] overflow-hidden hover:border-[#E63946]/50 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1.5"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0A0D15]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback image if network fails
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white text-[11px] font-bold shadow-md">
                    {item.category}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] text-slate-200 flex items-center gap-1.5 border border-white/10">
                    <Clock className="w-3 h-3 text-[#FF5722]" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF6B6B] transition-colors line-clamp-2 mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-3 border-t border-[#1C2538] flex items-center gap-1.5 text-xs font-bold text-[#FF6B6B] group-hover:text-white transition-colors">
                  <span>อ่านเพิ่มเติม</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#FF5722]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
