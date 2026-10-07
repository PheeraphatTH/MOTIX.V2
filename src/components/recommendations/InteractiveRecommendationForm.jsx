import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Car,
  Bike,
  Wrench,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  PackageCheck,
} from 'lucide-react';
import { vehicleData } from '../../data/vehicles';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { SmartAdvisorCard } from './SmartAdvisorCard';
import { useCart } from '../../context/CartContext';

// Options for Primary Goals / Needs
const GOAL_OPTIONS = [
  {
    id: 'all',
    label: 'ทุกความต้องการ',
    desc: 'ดูรายการแนะนำทั้งหมดที่ตรงกับรถของคุณ',
  },
  {
    id: 'maintenance',
    label: 'เช็กระยะ / ของเหลว',
    desc: 'น้ำมันเครื่อง, ไส้กรอง, กรองอากาศ, หัวเทียน',
    categories: ['engine-oil', 'filters', 'engine-parts'],
  },
  {
    id: 'repair-safety',
    label: 'ซ่อมแซม & ความปลอดภัย',
    desc: 'ผ้าเบรก, จานเบรก, ยาง, ไฟส่องสว่าง',
    categories: ['brake-system', 'tires-wheels', 'lighting'],
  },
  {
    id: 'performance',
    label: 'เพิ่มสมรรถนะ / แต่งซิ่ง',
    desc: 'โช้คอัพ, ท่อไอเสีย, กรองอากาศแต่ง, ล้อแม็ก',
    categories: ['suspension', 'moto-suspension', 'exhaust-system', 'car-wheels', 'chain-sprocket', 'filters'],
  },
  {
    id: 'electrical',
    label: 'ระบบไฟ & แบตเตอรี่',
    desc: 'แบตเตอรี่, ไดสตาร์ต, หลอดไฟ LED',
    categories: ['battery', 'moto-battery', 'lighting', 'engine-parts'],
  },
];

// Budget Range Options
const BUDGET_OPTIONS = [
  { id: 'all', label: 'ทุกระดับราคา' },
  { id: 'under-2000', label: 'ประหยัดคุ้มค่า (ต่ำกว่า ฿2,000)', max: 2000 },
  { id: '2000-10000', label: 'มาตรฐาน (฿2,000 - ฿10,000)', min: 2000, max: 10000 },
  { id: 'over-10000', label: 'พรีเมียม / เรซซิ่ง (฿10,000+)', min: 10000 },
];

export const InteractiveRecommendationForm = ({ onQuickView }) => {
  const { selectedVehicle, updateVehicleFilter, user } = useCart();

  // Form State
  const [vehicleType, setVehicleType] = useState(selectedVehicle?.type || 'car');
  const [brand, setBrand] = useState(selectedVehicle?.brand || '');
  const [model, setModel] = useState(selectedVehicle?.model || user?.vehicleModel || '');
  const [goal, setGoal] = useState('all');
  const [category, setCategory] = useState('all');
  const [budget, setBudget] = useState('all');
  const [resultsViewMode, setResultsViewMode] = useState('slider'); // 'slider' | 'grid'
  const sliderRef = useRef(null);

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Available brands & models based on vehicle type
  const availableBrands = vehicleData[vehicleType]?.brands || [];
  const availableModels = brand
    ? vehicleData[vehicleType]?.models[brand.toLowerCase()] || vehicleData[vehicleType]?.models[brand] || []
    : [];

  // Filter Categories matching vehicle type
  const availableCategories = useMemo(() => {
    return categories.filter((c) => c.vehicleType === vehicleType || c.vehicleType === 'both');
  }, [vehicleType]);

  const handleVehicleTypeChange = (newType) => {
    setVehicleType(newType);
    setBrand('');
    setModel('');
    setCategory('all');
  };

  const handleResetForm = () => {
    setVehicleType('car');
    setBrand('');
    setModel('');
    setGoal('all');
    setCategory('all');
    setBudget('all');
  };

  // Compute matching products
  const recommendedResults = useMemo(() => {
    const activeGoalObj = GOAL_OPTIONS.find((g) => g.id === goal);
    const activeBudgetObj = BUDGET_OPTIONS.find((b) => b.id === budget);

    return products
      .filter((product) => {
        // 1. Vehicle Type Match
        if (product.vehicleType !== 'both' && product.vehicleType !== vehicleType) {
          return false;
        }

        // 2. Specific Category Filter (if chosen)
        if (category !== 'all') {
          if (product.category !== category) return false;
        }

        // 3. Goal Category Match (if goal selected)
        if (activeGoalObj && activeGoalObj.categories && activeGoalObj.categories.length > 0) {
          const matchesGoalCategory = activeGoalObj.categories.includes(product.category);
          if (!matchesGoalCategory) return false;
        }

        // 4. Budget Range Filter
        if (activeBudgetObj) {
          if (activeBudgetObj.min && product.price < activeBudgetObj.min) return false;
          if (activeBudgetObj.max && product.price > activeBudgetObj.max) return false;
        }

        return true;
      })
      .map((product) => {
        let score = 94;
        let reasons = [];
        let isModelDirectMatch = false;

        // Direct vehicle match
        if (model) {
          const matchesCar = product.compatibleVehicles?.some((v) =>
            model.toLowerCase().includes(v.toLowerCase()) || v.toLowerCase().includes(model.toLowerCase())
          );
          if (matchesCar) {
            score = 99;
            isModelDirectMatch = true;
            reasons.push(`ตรงรุ่นกับ ${model}`);
          }
        }

        if (goal === 'maintenance') {
          reasons.push('เหมาะสำหรับรอบบำรุงรักษา');
        } else if (goal === 'repair-safety') {
          reasons.push('เกรดความปลอดภัยมาตรฐาน OEM');
        } else if (goal === 'performance') {
          reasons.push('เพิ่มสมรรถนะการขับขี่');
        } else {
          reasons.push('อะไหล่มาตรฐานแท้ 100%');
        }

        return {
          ...product,
          recommendationScore: score,
          recommendationReason: reasons.join(' • '),
          recommendationTags: [
            isModelDirectMatch ? 'ตรงรุ่น 100%' : 'ตรวจสเปกพร้อมใส่',
            product.discount > 0 ? `ลด ${product.discount}%` : 'ของแท้',
          ],
          isModelDirectMatch,
        };
      })
      .sort((a, b) => {
        if (a.isModelDirectMatch && !b.isModelDirectMatch) return -1;
        if (!a.isModelDirectMatch && b.isModelDirectMatch) return 1;
        return b.recommendationScore - a.recommendationScore;
      });
  }, [vehicleType, brand, model, goal, category, budget]);

  const handleApplyForm = (e) => {
    e.preventDefault();
    if (brand || model) {
      updateVehicleFilter({
        type: vehicleType,
        brand,
        model,
      });
    }

    const el = document.getElementById('form-recommendation-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. CLEAN FORM CONTAINER CARD */}
      <div className="rounded-2xl bg-[#11151F] border border-[#202738] p-6 sm:p-8 shadow-xl">
        
        {/* Header inside form */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C2333]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              ค้นหาและคัดกรองอะไหล่ตามสเปกรถของคุณ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              เลือกข้อมูลเพื่อแสดงรายการอะไหล่ที่ตรงรุ่นและตรงงบประมาณทันที
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161B28] hover:bg-[#1E2536] text-slate-300 hover:text-white text-xs font-medium border border-[#263045] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ล้างค่า</span>
          </button>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleApplyForm} className="mt-6 space-y-6">
          
          {/* 1. Vehicle Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              1. ประเภทพาหนะ
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => handleVehicleTypeChange('car')}
                className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  vehicleType === 'car'
                    ? 'bg-[#E63946] border-[#E63946] text-white shadow-sm'
                    : 'bg-[#151A26] hover:bg-[#1A2030] border-[#222A3C] text-slate-400'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>รถยนต์ (Car / Pickup / SUV)</span>
              </button>

              <button
                type="button"
                onClick={() => handleVehicleTypeChange('motorcycle')}
                className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  vehicleType === 'motorcycle'
                    ? 'bg-[#E63946] border-[#E63946] text-white shadow-sm'
                    : 'bg-[#151A26] hover:bg-[#1A2030] border-[#222A3C] text-slate-400'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>มอเตอร์ไซค์ (Motorcycle)</span>
              </button>
            </div>
          </div>

          {/* 2. Brand & Model Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="form-brand-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
                2. ยี่ห้อรถ (Brand)
              </label>
              <div className="relative">
                <select
                  id="form-brand-select"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModel('');
                  }}
                  className="w-full bg-[#151A26] border border-[#252E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63946] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">-- ไม่ระบุยี่ห้อ (ดูทั้งหมด) --</option>
                  {availableBrands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="form-model-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
                3. รุ่นรถ (Model)
              </label>
              <div className="relative">
                <select
                  id="form-model-select"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand && availableModels.length === 0}
                  className={`w-full bg-[#151A26] border border-[#252E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63946] transition-colors appearance-none ${
                    !brand ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <option value="">
                    {brand ? `-- เลือกรุ่นของ ${brand} --` : '-- เลือกรุ่นรถ --'}
                  </option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3. Goal Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              4. สิ่งที่คุณต้องการทำ
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {GOAL_OPTIONS.map((opt) => {
                const isSelected = goal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C2333] border-[#E63946] text-white'
                        : 'bg-[#141824] hover:bg-[#181E2E] border-[#202738] text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Category & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="form-category-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
                5. หมวดหมู่อะไหล่
              </label>
              <div className="relative">
                <select
                  id="form-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#151A26] border border-[#252E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63946] transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">-- ทุกหมวดหมู่ --</option>
                  {availableCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.nameTh} ({c.nameEn})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="form-budget-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
                6. ระดับงบประมาณ
              </label>
              <div className="relative">
                <select
                  id="form-budget-select"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#151A26] border border-[#252E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63946] transition-colors appearance-none cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1C2333]">
            <span className="text-xs text-slate-400">
              พบสินค้าที่เข้าเงื่อนไข: <strong className="text-white font-mono">{recommendedResults.length}</strong> รายการ
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E63946] hover:bg-[#D62828] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>ดูรายการแนะนำ ({recommendedResults.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>

      {/* 2. CLEAN RESULTS DISPLAY SECTION */}
      <div id="form-recommendation-results" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base sm:text-lg font-bold text-white">
              รายการอะไหล่แนะนำ ({recommendedResults.length} รายการ)
            </h3>
            {model && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ตรงรุ่น {model}</span>
              </span>
            )}
          </div>

          {/* View Mode Toggle & Slider Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#141A28] border border-[#232D42]">
              <button
                type="button"
                onClick={() => setResultsViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  resultsViewMode === 'slider'
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="โหมดสไลด์โชว์"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>สไลด์โชว์</span>
              </button>
              <button
                type="button"
                onClick={() => setResultsViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  resultsViewMode === 'grid'
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="โหมดตาราง"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>ตาราง</span>
              </button>
            </div>

            {/* Slider Navigation Arrows */}
            {resultsViewMode === 'slider' && recommendedResults.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="p-2 rounded-xl bg-[#141A28] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#232D42] transition-colors cursor-pointer"
                  title="เลื่อนไปทางซ้าย"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="p-2 rounded-xl bg-[#141A28] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#232D42] transition-colors cursor-pointer"
                  title="เลื่อนไปทางขวา"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {recommendedResults.length > 0 ? (
          resultsViewMode === 'slider' ? (
            <div className="relative">
              <div
                ref={sliderRef}
                className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                {recommendedResults.map((product) => (
                  <div key={product.id} className="w-[280px] sm:w-[310px] shrink-0 snap-start">
                    <SmartAdvisorCard
                      product={product}
                      onQuickView={onQuickView}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recommendedResults.map((product) => (
                <SmartAdvisorCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )
        ) : (
          <div className="p-8 text-center rounded-2xl bg-[#11151F] border border-[#202738] max-w-md mx-auto space-y-3">
            <AlertTriangle className="w-7 h-7 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">ไม่พบสินค้าในเงื่อนไขที่เลือก</h4>
            <p className="text-xs text-slate-400">
              ลองปรับตัวเลือกงบประมาณหรือหมวดหมู่ให้กว้างขึ้น
            </p>
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2 rounded-lg bg-[#E63946] text-white text-xs font-bold cursor-pointer"
            >
              รีเซ็ตเพื่อดูทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
