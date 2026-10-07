import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Truck,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar = () => {
  const announcements = [
    {
      id: 1,
      icon: Truck,
      iconColor: 'text-white',
      badge: 'FREE SHIPPING',
      text: 'จัดส่งด่วนทั่วไทย 24-48 ชม. • ส่งฟรีเมื่อสั่งซื้อครบ 1,500 บาท',
      linkText: 'รายละเอียด',
      linkTo: '/about',
    },
    {
      id: 2,
      icon: Flame,
      iconColor: 'text-amber-300 animate-pulse',
      badge: 'SPECIAL DEAL',
      text: (
        <span>
          MOTIX STARTER DEAL: โค้ด{' '}
          <span className="underline decoration-amber-300 font-mono tracking-wider font-extrabold text-amber-200 bg-black/20 px-1.5 py-0.5 rounded">
            STARTER20
          </span>{' '}
          ลดทันที 20%
        </span>
      ),
      linkText: 'รับสิทธิ์',
      linkTo: '/promotions',
    },
    {
      id: 3,
      icon: ShieldCheck,
      iconColor: 'text-emerald-300',
      badge: '100% GENUINE',
      text: 'การันตีอะไหล่แท้ศูนย์ & OEM 100% ตรงรุ่น • ไม่ตรงรุ่นยินดีคืนเงิน 2 เท่า',
      linkText: 'ตรวจสอบรุ่น',
      linkTo: '/products',
    },
    {
      id: 4,
      icon: Sparkles,
      iconColor: 'text-amber-300',
      badge: 'AI ADVISOR',
      text: 'ระบบ AI ช่วยวินิจฉัยอาการเสียและเลือกอะไหล่ตรงรุ่นรถแบบเรียลไทม์',
      linkText: 'ทดลองใช้ AI',
      linkTo: '/recommendations',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Auto slide every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, announcements.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const currentItem = announcements[currentIndex];
  const IconComponent = currentItem.icon;

  return (
    <div
      className="bg-gradient-to-r from-[#800010] via-[#E63946] to-[#800010] text-white text-xs font-semibold py-2 px-3 sm:px-6 shadow-md relative z-50 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background speed pulse line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 relative">
        
        {/* Left Navigation Chevron Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-black/25 text-white/90 hover:text-white transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Animated Sliding Content Stage */}
        <div className="flex-1 overflow-hidden h-6 flex items-center justify-center relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentItem.id}
              custom={direction}
              initial={{ y: direction > 0 ? 18 : -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -18 : 18, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 text-center truncate max-w-full px-2"
            >
              {/* Badge */}
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-black/30 border border-white/20 text-white shrink-0">
                {currentItem.badge}
              </span>

              {/* Icon */}
              <IconComponent className={`w-3.5 h-3.5 shrink-0 ${currentItem.iconColor}`} />

              {/* Message */}
              <span className="truncate text-xs tracking-wide">
                {currentItem.text}
              </span>

              {/* Call to Action */}
              {currentItem.linkTo && (
                <Link
                  to={currentItem.linkTo}
                  className="inline-flex items-center gap-0.5 ml-1 text-white hover:text-amber-200 font-extrabold hover:underline underline-offset-2 shrink-0 transition-colors"
                >
                  <span>{currentItem.linkText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Navigation Controls & Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Slide Indicator Dots */}
          <div className="hidden md:flex items-center gap-1.5 mr-1">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`py-1.5 px-0.5 flex items-center transition-all cursor-pointer focus-visible:outline-none`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next announcement"
            className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-black/25 text-white/90 hover:text-white transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
