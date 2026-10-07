import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Disc,
  Gauge,
  Zap,
  Activity,
  CircleDot,
  SunMedium,
  RotateCw,
  Car,
  Bike,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  RECOMMENDATION_SYMPTOMS,
  DRIVING_STYLES,
  getRecommendedProductsForSymptom,
  getMemberPersonalizedRecommendations,
} from '../data/recommendations';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { SmartAdvisorCard } from '../components/recommendations/SmartAdvisorCard';
import { InteractiveRecommendationForm } from '../components/recommendations/InteractiveRecommendationForm';
import { QuickViewModal } from '../components/products/QuickViewModal';

const SYMPTOM_ICONS = {
  Disc,
  Gauge,
  Zap,
  Activity,
  CircleDot,
  SunMedium,
  RotateCw,
};

export const Recommendations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, selectedVehicle, addToCart, showToast, setQuickViewProduct } = useCart();

  // Mode: 'form' (default interactive filter form), 'symptom' or 'quiz'
  const [mode, setMode] = useState(searchParams.get('mode') || 'form');
  const [selectedSymptomId, setSelectedSymptomId] = useState(
    searchParams.get('symptom') || 'brake-noise'
  );
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');

  // Quiz state (3 Steps)
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    vehicleType: 'car',
    goal: 'repair', // 'repair' | 'maintenance' | 'upgrade'
    budgetStyle: 'sport', // 'daily' | 'sport' | 'heavy'
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Sync symptom param
  useEffect(() => {
    const s = searchParams.get('symptom');
    if (s && RECOMMENDATION_SYMPTOMS.some((item) => item.id === s)) {
      setSelectedSymptomId(s);
      setMode('symptom');
    }
  }, [searchParams]);

  const currentVehicleModel = selectedVehicle?.model || user?.vehicleModel || '';

  // Get data for selected symptom
  const symptomData = getRecommendedProductsForSymptom(
    selectedSymptomId,
    vehicleTypeFilter,
    currentVehicleModel
  );

  // Quiz Results calculation
  const calculateQuizRecommendations = () => {
    return products
      .filter((p) => {
        if (quizAnswers.vehicleType !== 'all' && p.vehicleType !== quizAnswers.vehicleType) {
          return false;
        }

        // Filter by goal
        if (quizAnswers.goal === 'repair') {
          return ['brake-system', 'battery', 'engine-parts', 'tires-wheels'].includes(p.category);
        } else if (quizAnswers.goal === 'maintenance') {
          return ['engine-oil', 'filters', 'battery'].includes(p.category);
        } else if (quizAnswers.goal === 'upgrade') {
          return ['suspension', 'lighting', 'brake-system', 'engine-oil'].includes(p.category);
        }
        return true;
      })
      .map((p, idx) => {
        let score = 99 - idx * 2;
        let reason = '';
        if (quizAnswers.goal === 'repair') {
          reason = `วิเคราะห์ตรงจุด: ช่วยซ่อมแซมและแก้ปัญหาชิ้นส่วนสึกหรอ คืนความปลอดภัยระดับโรงงาน`;
        } else if (quizAnswers.goal === 'maintenance') {
          reason = `บำรุงรักษาตามรอบ: ช่วยยืดอายุเครื่องยนต์ ประหยัดน้ำมัน และลดค่าซ่อมบำรุงระยะยาว`;
        } else {
          reason = `อัปเกรดสมรรถนะ: เพิ่มแรงม้า ความหนึบ และทัศนวิสัยขับขี่สไตล์ ${quizAnswers.budgetStyle}`;
        }

        return {
          ...p,
          recommendationScore: score,
          recommendationReason: reason,
          recommendationTags: ['ตรงความต้องการ', 'อัลกอริทึม MOTIX', 'รับประกันแท้ 100%'],
        };
      });
  };

  const quizResults = calculateQuizRecommendations();

  // 1-Click Add All Recommended Products to Cart (Bundle Action)
  const handleAddBundleToCart = (items) => {
    if (!items || items.length === 0) return;
    items.forEach((item) => {
      addToCart(item, 1);
    });
    showToast(`เพิ่มสินค้าแนะนำชุดพิเศษ (${items.length} รายการ) ลงตะกร้าเรียบร้อยแล้ว`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Category Tag */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/" className="hover:text-white transition-colors">หน้าแรก</Link>
          <span>/</span>
          <span className="text-[#FF6B6B] font-bold">ระบบแนะนำอะไหล่อัจฉริยะ (Smart Advisor)</span>
        </div>

        {/* Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            ระบบผู้ช่วยแนะนำอะไหล่อัจฉริยะ
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            วิเคราะห์ปัญหาตรงจุด คัดสรรอะไหล่แท้และ OEM คุณภาพสูงที่ตรงรุ่นกับรถของคุณ 100% ตอบโจทย์ทั้งการซ่อมแซม เช็กระยะ และอัปเกรดสมรรถนะ
          </p>

          {/* Mode Switcher Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMode('form');
                setSearchParams({ mode: 'form' });
              }}
              className={`min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                mode === 'form'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-400'
                  : 'bg-[#151A26] text-slate-400 hover:text-white border border-[#252E42]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>เลือกแบบฟอร์มคัดกรองความต้องการ (Smart Form Filter)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('symptom');
                setSearchParams({ mode: 'symptom', symptom: selectedSymptomId });
              }}
              className={`min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                mode === 'symptom'
                  ? 'bg-[#E63946] text-white shadow-lg shadow-red-950/50'
                  : 'bg-[#151A26] text-slate-400 hover:text-white border border-[#252E42]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>เลือกตามอาการ / ปัญหาของรถ (Symptom Mode)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('quiz');
                setSearchParams({ mode: 'quiz' });
              }}
              className={`min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                mode === 'quiz'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-950/50'
                  : 'bg-[#151A26] text-slate-400 hover:text-white border border-[#252E42]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>ทำแบบประเมิน 3 ขั้นตอน (Guided Quiz)</span>
            </button>
          </div>
        </div>

        {/* Member Personalized Notification */}
        {user && user.vehicleModel && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#141824] to-amber-950/30 border border-red-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-400">
                  ระบบตรวจพบรถประจำตัวของคุณ: <strong className="text-white">{user.vehicleModel}</strong>
                </span>
                <p className="text-xs text-slate-300">
                  ทุกรายการสินค้าด้านล่างได้รับการตรวจเช็กความเข้ากันได้ และมีสเปกที่ตรงรุ่นกับรถของคุณ
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30 shrink-0">
              100% COMPATIBILITY VERIFIED
            </span>
          </div>
        )}

        {/* MODE 0: INTERACTIVE FORM FILTER RECOMMENDATION (NEW) */}
        {mode === 'form' && (
          <InteractiveRecommendationForm onQuickView={(p) => setQuickViewProduct(p)} />
        )}

        {/* MODE 1: SYMPTOM-BASED RECOMMENDATION */}
        {mode === 'symptom' && (
          <div className="space-y-8">
            
            {/* Top Symptom Selector Bar */}
            <div className="p-6 rounded-3xl bg-[#121622] border border-[#252E40] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#E63946]" />
                    <span>คลิกเลือกอาการที่รถของคุณกำลังประสบปัญหา:</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    ระบบจะนำเสนอชุดอะไหล่ที่ช่วยแก้ปัญหาได้ตรงจุดที่สุดทันที
                  </p>
                </div>

                {/* Filter vehicle type */}
                <div className="flex items-center gap-1.5 bg-[#0B0E17] p-1 rounded-xl border border-[#222A3C] shrink-0">
                  <button
                    onClick={() => setVehicleTypeFilter('all')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      vehicleTypeFilter === 'all' ? 'bg-[#E63946] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    onClick={() => setVehicleTypeFilter('car')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      vehicleTypeFilter === 'car' ? 'bg-[#E63946] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    รถยนต์
                  </button>
                  <button
                    onClick={() => setVehicleTypeFilter('motorcycle')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      vehicleTypeFilter === 'motorcycle' ? 'bg-[#E63946] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    มอเตอร์ไซค์
                  </button>
                </div>
              </div>

              {/* Symptom Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {RECOMMENDATION_SYMPTOMS.map((symptom) => {
                  const Icon = SYMPTOM_ICONS[symptom.iconName] || Disc;
                  const isSelected = selectedSymptomId === symptom.id;

                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => {
                        setSelectedSymptomId(symptom.id);
                        setSearchParams({ mode: 'symptom', symptom: symptom.id });
                      }}
                      className={`flex flex-col p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#2A1D25] to-[#161B28] border-red-500 text-white shadow-xl shadow-red-950/40'
                          : 'bg-[#151926] hover:bg-[#1C2234] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected ? 'bg-[#E63946] text-white' : 'bg-[#1D2538] text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-amber-400 font-mono">
                            {symptom.defaultMatchScore}%
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold line-clamp-2 leading-snug">
                        {symptom.titleTh}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 truncate">
                        {symptom.tags[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Symptom Diagnosis Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171A26] via-[#141824] to-[#191D2B] border border-[#2B354D] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-[#FF6B6B] text-xs font-bold border border-red-500/30">
                    {symptomData.symptom.severityLabel}
                  </span>
                  <span className="text-xs text-amber-400 font-bold font-mono">
                    อัลกอริทึมประเมินความแม่นยำ: {symptomData.symptom.defaultMatchScore}% MATCH
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {symptomData.symptom.titleTh}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {symptomData.symptom.descriptionTh}
                </p>
                <div className="pt-1 flex flex-wrap gap-2">
                  {symptomData.symptom.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#222A3D] text-slate-200 text-xs font-medium border border-[#303B54]"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 1-Click Add All Action */}
              {symptomData.products.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleAddBundleToCart(symptomData.products)}
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:brightness-110 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-red-950/40 shrink-0 cursor-pointer active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ใส่สินค้าแนะนำทั้งหมดลงตะกร้า ({symptomData.products.length} ชิ้น)</span>
                </button>
              )}
            </div>

            {/* Product Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  รายการอะไหล่แนะนำสำหรับแก้อาการนี้ ({symptomData.products.length} รายการ):
                </h3>
                <span className="text-xs text-slate-400">
                  เรียงตามคะแนนความเหมาะสมสูงสุด
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {symptomData.products.map((product) => (
                  <SmartAdvisorCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: 3-STEP GUIDED QUIZ */}
        {mode === 'quiz' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#273044] shadow-2xl max-w-4xl mx-auto">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#202738]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E63946] flex items-center justify-center text-white font-black text-sm">
                    {quizStep}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#FF6B6B] uppercase tracking-wider block">
                      ขั้นตอนที่ {quizStep} จาก 3
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      {quizStep === 1 && '1. เลือกรถของคุณ'}
                      {quizStep === 2 && '2. เลือกเป้าหมายหลักที่คุณต้องการ'}
                      {quizStep === 3 && '3. ระดับงบประมาณ & สไตล์การใช้งาน'}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuizStep(1);
                    setIsQuizCompleted(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>เริ่มใหม่</span>
                </button>
              </div>

              {/* Step 1: Vehicle Type */}
              {quizStep === 1 && (
                <div className="space-y-5">
                  <p className="text-sm text-slate-300">
                    กรุณาเลือกประเภทพาหนะ เพื่อให้ระบบกรองเฉพาะอะไหล่ที่ใส่ได้แน่นอน:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, vehicleType: 'car' }));
                        setQuizStep(2);
                      }}
                      className={`p-6 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                        quizAnswers.vehicleType === 'car'
                          ? 'bg-gradient-to-r from-[#2B1B22] to-[#171C28] border-red-500 text-white shadow-xl'
                          : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <div className="p-3.5 rounded-2xl bg-[#E63946]/20 text-[#E63946]">
                        <Car className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">รถยนต์ (Cars / Pickups / SUVs)</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          เก๋ง, กระบะ, รถตู้, รถครอบครัว 7 ที่นั่ง
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, vehicleType: 'motorcycle' }));
                        setQuizStep(2);
                      }}
                      className={`p-6 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                        quizAnswers.vehicleType === 'motorcycle'
                          ? 'bg-gradient-to-r from-[#2B1B22] to-[#171C28] border-red-500 text-white shadow-xl'
                          : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <div className="p-3.5 rounded-2xl bg-orange-500/20 text-orange-400">
                        <Bike className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">รถจักรยานยนต์ (Motorcycle / BigBike)</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          สกู๊ตเตอร์, รถครอบครัว, บิ๊กไบค์, มอเตอร์ไซค์สปอร์ต
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Goal */}
              {quizStep === 2 && (
                <div className="space-y-5">
                  <p className="text-sm text-slate-300">
                    เป้าหมายในการเลือกซื้ออะไหล่ครั้งนี้ของคุณคืออะไร?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, goal: 'repair' }));
                        setQuizStep(3);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        quizAnswers.goal === 'repair'
                          ? 'bg-red-500/10 border-red-500 text-white shadow-xl'
                          : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🛠️</span>
                      <h4 className="text-base font-bold text-white mb-1">ซ่อมแซม & แก้ไขปัญหา</h4>
                      <p className="text-xs text-slate-400">
                        มีเสียงดัง รถสะดุด เบรกไม่อยู่ หรือชิ้นส่วนเดิมเริ่มเสื่อมสภาพ
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, goal: 'maintenance' }));
                        setQuizStep(3);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        quizAnswers.goal === 'maintenance'
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-xl'
                          : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">⚙️</span>
                      <h4 className="text-base font-bold text-white mb-1">เช็กระยะ & บำรุงรักษา</h4>
                      <p className="text-xs text-slate-400">
                        ถึงรอบ 10,000 กม. ถ่ายของเหลว เปลี่ยนไส้กรอง ตรวจสอบแบตเตอรี่
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((prev) => ({ ...prev, goal: 'upgrade' }));
                        setQuizStep(3);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        quizAnswers.goal === 'upgrade'
                          ? 'bg-orange-500/10 border-orange-500 text-white shadow-xl'
                          : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🏎️</span>
                      <h4 className="text-base font-bold text-white mb-1">อัปเกรด & แต่งสมรรถนะ</h4>
                      <p className="text-xs text-slate-400">
                        อยากได้ความแรง หนึบ เข้าโค้งนิ่ง ทัศนวิสัยไฟหน้าสว่าง หรือเสียงท่อเพราะ
                      </p>
                    </button>
                  </div>
                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setQuizStep(1)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← ย้อนกลับ
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Style */}
              {quizStep === 3 && (
                <div className="space-y-5">
                  <p className="text-sm text-slate-300">
                    เลือกสไตล์การใช้งานและระดับงบประมาณที่ต้องการ:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {DRIVING_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => {
                          setQuizAnswers((prev) => ({ ...prev, budgetStyle: style.id }));
                          setIsQuizCompleted(true);
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                          quizAnswers.budgetStyle === style.id
                            ? 'bg-gradient-to-b from-[#2B1B22] to-[#171C28] border-red-500 text-white shadow-xl'
                            : 'bg-[#151926] hover:bg-[#1D2336] border-[#252E42] text-slate-300'
                        }`}
                      >
                        <span className="px-2 py-0.5 rounded-full bg-[#E63946]/20 text-[#FF6B6B] text-[10px] font-bold border border-red-500/30 mb-2 inline-block">
                          {style.badge}
                        </span>
                        <h4 className="text-base font-bold text-white mb-1">{style.nameTh}</h4>
                        <p className="text-xs text-slate-400">{style.descriptionTh}</p>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setQuizStep(2)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← ย้อนกลับ
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsQuizCompleted(true)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white text-xs font-bold shadow-lg"
                    >
                      ประมวลผลคำแนะนำทันที
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Quiz Results Section */}
            {isQuizCompleted && (
              <div className="space-y-6 pt-4">
                <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171A26] via-[#141824] to-[#191D2B] border border-[#2B354D] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ประมวลผลสำเร็จตามแบบจำลองความต้องการของคุณ</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      อะไหล่ที่แนะนำสูงสุดสำหรับคุณ ({quizResults.length} รายการ)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      ประเภท: {quizAnswers.vehicleType === 'car' ? 'รถยนต์' : 'มอเตอร์ไซค์'} | เป้าหมาย: {quizAnswers.goal} | สไตล์: {quizAnswers.budgetStyle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddBundleToCart(quizResults)}
                    className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:brightness-110 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-red-950/40 shrink-0 cursor-pointer active:scale-95 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ใส่สินค้าผลลัพธ์ทั้งหมดลงตะกร้า</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {quizResults.map((product) => (
                    <SmartAdvisorCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      <QuickViewModal />
    </div>
  );
};
