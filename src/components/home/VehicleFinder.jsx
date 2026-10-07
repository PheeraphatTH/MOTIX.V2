import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Car,
  Bike,
  Search,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { vehicleData } from '../../data/vehicles';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const VehicleFinder = ({ isCompact = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedVehicle, updateVehicleFilter, clearVehicleFilter } = useCart();

  const [type, setType] = useState(selectedVehicle.type || 'car');
  const [brand, setBrand] = useState(selectedVehicle.brand || '');
  const [model, setModel] = useState(selectedVehicle.model || '');
  const [year, setYear] = useState(selectedVehicle.year || '');

  const availableBrands = vehicleData[type]?.brands || [];
  const availableModels = brand
    ? vehicleData[type]?.models[brand.toLowerCase()] || vehicleData[type]?.models[brand] || []
    : [];
  const availableYears = vehicleData[type]?.years || [];

  // Quick Preset Vehicles (High traffic models in Thailand)
  const popularPresets = [
    { type: 'car', brand: 'Honda', model: 'Civic', year: 2022, label: 'Honda Civic FE' },
    { type: 'car', brand: 'Toyota', model: 'Fortuner', year: 2021, label: 'Toyota Fortuner' },
    { type: 'car', brand: 'Honda', model: 'City', year: 2020, label: 'Honda City 1.0 Turbo' },
    { type: 'car', brand: 'Mazda', model: 'Mazda 2', year: 2019, label: 'Mazda 2 Skyactiv' },
    { type: 'motorcycle', brand: 'Yamaha', model: 'XMAX 300', year: 2023, label: 'Yamaha XMAX 300' },
    { type: 'motorcycle', brand: 'Honda', model: 'Wave 125i', year: 2022, label: 'Honda Wave 125i' },
    { type: 'motorcycle', brand: 'Honda', model: 'Forza 350', year: 2023, label: 'Honda Forza 350' },
  ];

  const handleTypeChange = (newType) => {
    setType(newType);
    setBrand('');
    setModel('');
    setYear('');
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    setModel('');
    setYear('');
  };

  const handleQuickPreset = (preset) => {
    setType(preset.type);
    setBrand(preset.brand);
    setModel(preset.model);
    setYear(String(preset.year));
    updateVehicleFilter({
      type: preset.type,
      brand: preset.brand,
      model: preset.model,
      year: preset.year,
    });
    navigate(`/products?vehicleType=${preset.type}&brand=${encodeURIComponent(preset.brand)}&model=${encodeURIComponent(preset.model)}&year=${preset.year}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (brand || model) {
      updateVehicleFilter({
        type,
        brand,
        model,
        year: year ? Number(year) : '',
      });
      navigate(`/products?vehicleType=${type}&brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}`);
    } else {
      navigate(`/products?vehicleType=${type}`);
    }
  };

  const handleReset = () => {
    setType('car');
    setBrand('');
    setModel('');
    setYear('');
    clearVehicleFilter();
  };

  return (
    <section id="vehicle-finder-section" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-14">
      <div className="rounded-3xl glass-cockpit border border-red-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-5 sm:p-8 backdrop-blur-2xl relative overflow-hidden">
        
        {/* Glowing Top Indicator Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E63946] via-[#FF5722] to-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.8)]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1E273A]">
          
          {/* Header Title & Concept */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              เลือกรุ่นรถของคุณ เพื่อกรองอะไหล่ที่ใส่ได้ตรงรุ่น 100%
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              หมดกังวลเรื่องสั่งผิดรุ่น ระบบจะคัดกรองเฉพาะอะไหล่แท้และ OEM ที่เข้ากับรถของคุณเท่านั้น
            </p>
          </div>

          {/* Vehicle Type Tabs (Car vs Motorcycle) */}
          <div className="flex items-center p-1.5 bg-[#090C12] rounded-2xl border border-[#232D42] shrink-0 shadow-inner">
            <button
              type="button"
              onClick={() => handleTypeChange('car')}
              className={`min-h-[44px] flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] ${
                type === 'car'
                  ? 'bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-[0_4px_15px_rgba(230,57,70,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>{t('vehicleFinder.car') || 'รถยนต์ (Car)'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleTypeChange('motorcycle')}
              className={`min-h-[44px] flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] ${
                type === 'motorcycle'
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#D84315] text-white shadow-[0_4px_15px_rgba(255,87,34,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>{t('vehicleFinder.motorcycle') || 'มอเตอร์ไซค์ (Bike)'}</span>
            </button>
          </div>
        </div>

        {/* Quick Popular Vehicle Preset Pills */}
        <div className="pt-4 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" /> รุ่นยอดนิยม:
          </span>
          {popularPresets
            .filter((p) => p.type === type)
            .map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleQuickPreset(preset)}
                className="shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#141A28] hover:bg-[#1E2638] text-slate-200 hover:text-white border border-[#263148] hover:border-red-500/50 transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              >
                <span>{preset.label}</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
        </div>

        {/* Dropdown Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-4 items-end">
          
          {/* 1. Brand */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-[#E63946] text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <span>{t('vehicleFinder.selectBrand') || 'ยี่ห้อรถ'}</span>
            </label>
            <select
              value={brand}
              onChange={handleBrandChange}
              className="w-full bg-[#131926] text-sm text-white rounded-xl border border-[#2B374E] px-3.5 py-3 focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] focus:outline-none transition-all cursor-pointer hover:border-slate-500"
            >
              <option value="">-- เลือกยี่ห้อรถ --</option>
              {availableBrands.map((b) => (
                <option key={b.id} value={b.name} className="bg-[#131926] text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-[#E63946] text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span>{t('vehicleFinder.selectModel') || 'รุ่นรถ'}</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand}
              className="w-full bg-[#131926] text-sm text-white rounded-xl border border-[#2B374E] px-3.5 py-3 focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-slate-500"
            >
              <option value="">{brand ? '-- เลือกรุ่นรถ --' : '-- กรุณาเลือกยี่ห้อก่อน --'}</option>
              {availableModels.map((m) => (
                <option key={m} value={m} className="bg-[#131926] text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-[#E63946] text-white text-[10px] flex items-center justify-center font-bold">3</span>
              <span>{t('vehicleFinder.selectYear') || 'ปีผลิต (ไม่ระบุก็ได้)'}</span>
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!brand}
              className="w-full bg-[#131926] text-sm text-white rounded-xl border border-[#2B374E] px-3.5 py-3 focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-slate-500"
            >
              <option value="">-- ทุกปีการผลิต (All Years) --</option>
              {availableYears.map((y) => (
                <option key={y} value={y} className="bg-[#131926] text-white">
                  ปี {y}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 min-h-[44px] py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#E63946] via-[#FF3B4C] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(230,57,70,0.4)] transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Search className="w-4 h-4" />
              <span>{t('vehicleFinder.findButton') || 'ค้นหาอะไหล่ตรงรุ่น'}</span>
            </button>

            {(brand || model || year) && (
              <button
                type="button"
                onClick={handleReset}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#141A28] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#2B374E] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="รีเซ็ตค่าทั้งหมด"
                aria-label="รีเซ็ตค่าทั้งหมด"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </form>

        {/* Selected Vehicle Active Status Banner */}
        {selectedVehicle.model && (
          <div className="mt-5 pt-4 border-t border-[#1C2538] flex flex-wrap items-center justify-between gap-3 text-xs bg-emerald-950/20 px-4 py-2.5 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                กำลังกรองอะไหล่เฉพาะรุ่น: <strong className="text-white font-bold">{selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.year || 'ทุกปี'})</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={clearVehicleFilter}
              className="min-h-[36px] px-2 text-[#FF6B6B] hover:text-white font-semibold underline cursor-pointer inline-flex items-center"
            >
              ล้างตัวกรองเพื่อดูอะไหล่ทุกรุ่น
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
