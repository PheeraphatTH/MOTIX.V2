import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  Car,
  Bike,
  Search,
  SlidersHorizontal,
  Flame,
  Award,
} from 'lucide-react';
import { PRODUCT_ASSETS, BRAND_LOGOS } from '../../data/productAssets';
import { vehicleData } from '../../data/vehicles';
import { useCart } from '../../context/CartContext';

export const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedVehicle, updateVehicleFilter } = useCart();

  const [vehicleType, setVehicleType] = useState(selectedVehicle.type || 'car');
  const [brand, setBrand] = useState(selectedVehicle.brand || '');
  const [model, setModel] = useState(selectedVehicle.model || '');

  const availableBrands = vehicleData[vehicleType]?.brands || [];
  const availableModels = brand
    ? vehicleData[vehicleType]?.models[brand.toLowerCase()] || vehicleData[vehicleType]?.models[brand] || []
    : [];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (brand || model) {
      updateVehicleFilter({ type: vehicleType, brand, model, year: '' });
      navigate(`/products?vehicleType=${vehicleType}&brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`);
    } else {
      navigate(`/products?vehicleType=${vehicleType}`);
    }
  };

  const popularPicks = [
    { label: 'Honda Civic FE', type: 'car', brand: 'Honda', model: 'Civic' },
    { label: 'Toyota Fortuner', type: 'car', brand: 'Toyota', model: 'Fortuner' },
    { label: 'Yamaha XMAX 300', type: 'motorcycle', brand: 'Yamaha', model: 'XMAX 300' },
    { label: 'Honda Wave 125i', type: 'motorcycle', brand: 'Honda', model: 'Wave 125i' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#06080D] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#1A2336]">
      {/* Cinematic Automotive Backdrop with High-Energy Speed & Dark Contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[1px] pointer-events-none scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1800&auto=format&fit=crop&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-[#06080D]/90 to-[#06080D]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(230,57,70,0.28),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-bold text-[#FF6B6B] shadow-[0_0_20px_rgba(230,57,70,0.25)] backdrop-blur-xl"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]"></span>
            </span>
            <span className="telemetry-chip font-bold tracking-widest uppercase">
              MOTIX OFFICIAL PERFORMANCE & OEM STORE
            </span>
          </motion.div>

          {/* Guaranteed Fitment Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>รับประกันความเข้ากันได้ของอะไหล่ 100% ตรงรุ่นทุกชิ้น</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bold Automotive Headline & Value */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.03] uppercase font-heading">
                KEEP YOUR <br />
                <span className="text-[#FF6B6B]">
                  RIDE MOVING.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-200">
                ยกระดับสมรรถนะรถของคุณ <span className="text-[#FF5722] font-black">— ด้วยอะไหล่แท้ระดับโปร</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed"
            >
              แพลตฟอร์มศูนย์รวมอะไหล่ยานยนต์และอุปกรณ์ตกแต่งชั้นนำ คัดสรรแบรนด์ระดับตำนานอย่าง 
              <strong className="text-white font-semibold"> Brembo, YSS, Motul, NGK </strong> 
              พร้อมระบบตรวจสอบความตรงรุ่นอัจฉริยะ ให้คุณขับขี่ได้อย่างมั่นใจในทุกโค้ง
            </motion.p>

            {/* In-Hero Vehicle Search Cockpit Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 sm:p-6 rounded-3xl glass-cockpit border border-red-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-[#E63946]" />
                  <span>ค้นหาอะไหล่ด่วนตรงรุ่นรถของคุณ</span>
                </div>

                {/* Car vs Motorcycle Switcher */}
                <div className="flex items-center p-1 bg-[#090C12] rounded-xl border border-[#232D42]">
                  <button
                    type="button"
                    onClick={() => { setVehicleType('car'); setBrand(''); setModel(''); }}
                    className={`min-h-[36px] flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                      vehicleType === 'car'
                        ? 'bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>รถยนต์</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVehicleType('motorcycle'); setBrand(''); setModel(''); }}
                    className={`min-h-[36px] flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                      vehicleType === 'motorcycle'
                        ? 'bg-gradient-to-r from-[#FF5722] to-[#D84315] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>มอเตอร์ไซค์</span>
                  </button>
                </div>
              </div>

              {/* Form Selects */}
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={brand}
                  onChange={(e) => { setBrand(e.target.value); setModel(''); }}
                  aria-label="เลือกยี่ห้อรถ"
                  className="bg-[#111624] text-xs sm:text-sm text-white rounded-xl border border-[#253147] px-3.5 py-2.5 min-h-[44px] focus:border-[#E63946] focus:outline-none cursor-pointer"
                >
                  <option value="">-- เลือกยี่ห้อรถ --</option>
                  {availableBrands.map((b) => (
                    <option key={b.id} value={b.name} className="bg-[#111624]">{b.name}</option>
                  ))}
                </select>

                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand}
                  aria-label="เลือกรุ่นรถ"
                  className="bg-[#111624] text-xs sm:text-sm text-white rounded-xl border border-[#253147] px-3.5 py-2.5 min-h-[44px] focus:border-[#E63946] focus:outline-none disabled:opacity-40 cursor-pointer"
                >
                  <option value="">{brand ? '-- เลือกรุ่นรถ --' : '-- เลือกยี่ห้อก่อน --'}</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m} className="bg-[#111624]">{m}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(230,57,70,0.4)] transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Search className="w-4 h-4" />
                  <span>ค้นหาตรงรุ่น</span>
                </button>
              </form>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wide">
                  รุ่นฮิต:
                </span>
                {popularPicks
                  .filter((p) => p.type === vehicleType)
                  .map((pick) => (
                    <button
                      key={pick.label}
                      type="button"
                      onClick={() => {
                        setBrand(pick.brand);
                        setModel(pick.model);
                        updateVehicleFilter({ type: pick.type, brand: pick.brand, model: pick.model, year: '' });
                        navigate(`/products?vehicleType=${pick.type}&brand=${encodeURIComponent(pick.brand)}&model=${encodeURIComponent(pick.model)}`);
                      }}
                      className="min-h-[32px] px-3 py-1 rounded-lg text-xs font-medium bg-[#161D2B] hover:bg-[#202A3C] text-slate-300 hover:text-white border border-[#253147] shrink-0 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    >
                      {pick.label}
                    </button>
                  ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Showcase Frame (Brembo Rotor & Performance Specs) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Cockpit Card */}
              <div className="relative rounded-3xl glass-card border border-red-500/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden group">
                
                <div className="absolute top-0 right-0 w-52 h-52 bg-red-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* Studio Frame Product Display */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden studio-canvas border border-slate-200/20 mb-4 p-4 flex items-center justify-center shadow-inner">
                  <img
                    src={PRODUCT_ASSETS['brembo-rotor']}
                    alt="Brembo High Performance Brake Rotors"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500 drop-shadow-2xl"
                  />
                  
                  {/* Top Brand Logo Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-md border border-slate-200">
                    <img src={BRAND_LOGOS['Brembo']} alt="Brembo" className="h-5 w-auto object-contain" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 shadow-lg">
                      Brembo High Carbon Rotor Pair
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#E63946] to-[#C1121F] text-xs font-black text-white shadow-md">
                      ลด 21%
                    </span>
                  </div>
                </div>

                {/* Telemetry Spec Row */}
                <div className="p-4 rounded-2xl bg-[#090D15]/90 border border-[#1E2638] flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#FF5722]">
                        PRO PERFORMANCE SPEC
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Brembo High Carbon Rotor Pair
                    </h4>
                    <span className="text-xs text-slate-400 block">
                      ตรงรุ่น: Honda Civic, City, Toyota Altis, Mazda 3
                    </span>
                  </div>
                  
                  <Link
                    to="/products/prod-01"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white flex items-center justify-center transition-all shadow-md shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    title="ดูรายละเอียดสินค้า"
                    aria-label="ดูรายละเอียดสินค้า"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>

              </div>

              {/* Floating Customer Rating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3.5 rounded-2xl glass-cockpit border border-red-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E63946] to-[#9A031E] flex items-center justify-center text-white font-black text-base shadow-lg">
                  ★
                </div>
                <div>
                  <div className="text-sm font-black text-white telemetry-chip">4.9 / 5.0 RATING</div>
                  <div className="text-[11px] text-slate-300">จากนักขับขี่กว่า 15,000+ ออเดอร์</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
