import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tag,
  Copy,
  Check,
  Zap,
  PackageCheck,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { promotions, bundlePackages } from '../data/promotions';
import { products } from '../data/products';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';
import { useCart } from '../context/CartContext';

export const Promotions = () => {
  const navigate = useNavigate();
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const promoProducts = products.filter((p) => p.isPromotion || p.discount > 0);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
            ดีลโปรโมชั่น & โค้ดส่วนลดพิเศษ
          </h1>
          <p className="text-sm text-slate-400 mt-3">
            รวมทุกข้อเสนอสุดคุ้มจาก MOTIX เพื่อให้การดูแลรถของคุณคุ้มค่าและพร้อมออกเดินทางตลอดเวลา
          </p>
        </div>

        {/* 1. Flash Sale Live Countdown Hero */}
        <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-[#141824] border border-red-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Flash Sale 8.8 Event: ลดกระหน่ำอะไหล่แท้ <br />
                <span className="text-[#FF5722]">
                  สูงสุดถึง 27% วันนี้เท่านั้น
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                ชิ้นส่วนสิ้นเปลืองและชุดเช็กระยะราคาพิเศษสุดในรอบเดือน สต็อกจำกัดตามเวลาที่นับถอยหลัง
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <CountdownTimer hoursFromNow={8} label="FLASH SALE ENDS IN" />
            </div>

          </div>
        </div>

        {/* 2. All Active Coupons */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1E2536]">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#E63946]" />
                <span>คูปองและโค้ดส่วนลดที่ใช้งานได้</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">คลิกเพื่อคัดลอกและใช้เป็นส่วนลดในหน้าชำระเงินทันที</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="rounded-2xl bg-[#131722] border border-[#222A3B] p-5 flex flex-col justify-between hover:border-[#E63946]/50 transition-all shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white ${promo.badgeColor}`}>
                      {promo.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">หมดเขต 2026</span>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading">
                    {promo.title}
                  </h3>

                  <div className="text-xl font-black text-[#FF5722] font-mono">
                    {promo.discount}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1E2536] flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-[#0A0D14] px-2.5 py-1.5 rounded border border-dashed border-slate-700">
                    {promo.code}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(promo.code)}
                    aria-label={`ใช้โค้ด ${promo.code}`}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      copiedCode === promo.code
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E63946] hover:bg-[#D62839] text-white shadow-md active:scale-95'
                    }`}
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>ใช้โค้ดนี้</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Ready to Ride Maintenance Bundles (Section 19) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1E2536]">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-400" />
                <span>Ready to Ride Maintenance Bundles (ชุดเซ็ตดูแลรถสุดคุ้ม)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">รวมอะไหล่ที่ต้องเปลี่ยนตามระยะทาง ประหยัดกว่าซื้อแยก</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundlePackages.map((bundle) => (
              <div
                key={bundle.id}
                className="rounded-2xl bg-[#131722] border border-[#262F42] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                      ประหยัดทันที ฿{bundle.saving}
                    </span>
                    <span className="text-xs text-slate-500">เซ็ตยอดนิยม</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {bundle.name}
                  </h3>

                  <div className="space-y-1.5 pt-2 border-t border-[#1F2636]">
                    <span className="text-xs text-slate-400 font-semibold block">รายการอะไหล่ในเซ็ต:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {bundle.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1F2636] flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-white font-mono">
                      ฿{new Intl.NumberFormat('th-TH').format(bundle.bundlePrice)}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-mono ml-2">
                      ฿{new Intl.NumberFormat('th-TH').format(bundle.originalPrice)}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/products')}
                  >
                    เลือกชุดนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Products On Sale Catalog */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1E2536]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E63946]" />
              <span>สินค้าลดราคาประจำสัปดาห์</span>
            </h2>
            <Link to="/products" className="text-xs font-bold text-[#FF6B6B] hover:underline">
              ดูสินค้าทั้งหมด →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
