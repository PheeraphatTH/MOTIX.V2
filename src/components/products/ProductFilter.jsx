import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';

export const ProductFilter = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const brands = [
    'Brembo',
    'Motul',
    'NGK',
    'DID',
    'Profender',
    'Denso',
    'GS Battery',
    'Yuasa',
    'Michelin',
    'Osram',
  ];

  const handleCategoryToggle = (slug) => {
    const newCategories = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  return (
    <div className="bg-[#131722] border border-[#222A3B] rounded-2xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1F2636]">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Filter className="w-4 h-4 text-[#E63946]" />
          <span>ตัวกรองอะไหล่</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="min-h-[36px] px-2 py-1 text-xs text-slate-400 hover:text-[#E63946] flex items-center gap-1 transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ต</span>
        </button>
      </div>

      {/* 1. Vehicle Type Segment */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
          ประเภทพาหนะ (Vehicle Type)
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#0D1017] rounded-xl border border-[#1E2536]">
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'car', label: '🚗 รถยนต์' },
            { id: 'motorcycle', label: '🏍️ มอเตอร์ไซค์' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, vehicleType: type.id })}
              className={`min-h-[40px] py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                filters.vehicleType === type.id
                  ? 'bg-[#E63946] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Special Badges: Promo / In Stock */}
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 cursor-pointer p-2.5 min-h-[44px] rounded-lg hover:bg-slate-800/40 transition-colors">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded bg-[#181E2C] border-slate-700 text-[#E63946] focus:ring-[#E63946] cursor-pointer"
          />
          <span>เฉพาะสินค้าพร้อมส่งทันที</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 cursor-pointer p-2.5 min-h-[44px] rounded-lg hover:bg-slate-800/40 transition-colors">
          <input
            type="checkbox"
            checked={filters.promoOnly}
            onChange={(e) => onFilterChange({ ...filters, promoOnly: e.target.checked })}
            className="w-4 h-4 rounded bg-[#181E2C] border-slate-700 text-[#E63946] focus:ring-[#E63946] cursor-pointer"
          />
          <span className="flex items-center gap-1 text-[#FF6B6B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เฉพาะสินค้าโปรโมชั่น / ลดราคา</span>
          </span>
        </label>
      </div>

      {/* 3. Category Filter */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
          หมวดหมู่อะไหล่ (Categories)
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categories
            .filter(c => filters.vehicleType === 'all' || c.vehicleType === filters.vehicleType)
            .map((cat) => {
              const isChecked = filters.categories.includes(cat.slug);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.slug)}
                  className={`w-full min-h-[38px] flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                    isChecked
                      ? 'bg-red-500/15 text-[#FF6B6B] font-bold border border-red-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate">{cat.nameTh}</span>
                  {isChecked && <Check className="w-3.5 h-3.5 text-[#E63946]" />}
                </button>
              );
            })}
        </div>
      </div>

      {/* 4. Brand Filter */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
          แบรนด์ชั้นนำ (Top Brands)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => {
            const isSelected = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandToggle(brand)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  isSelected
                    ? 'bg-[#E63946] text-white font-bold shadow-sm'
                    : 'bg-[#181E2C] text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <label className="font-bold text-slate-300 uppercase tracking-wider">
            ช่วงราคา (Max Price)
          </label>
          <span className="font-mono font-bold text-[#FF6B6B]">
            ฿{new Intl.NumberFormat('th-TH').format(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="15000"
          step="200"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#E63946] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>฿200</span>
          <span>฿15,000+</span>
        </div>
      </div>

      {/* Results Count Footer */}
      <div className="pt-2 text-center text-xs text-slate-400">
        พบอะไหล่ที่ตรงเงื่อนไข <span className="font-bold text-white">{totalResults}</span> รายการ
      </div>
    </div>
  );
};
