import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  CheckCircle2,
  Package,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { products } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilter } from '../components/products/ProductFilter';
import { useCart } from '../context/CartContext';
import { VehicleFinder } from '../components/home/VehicleFinder';

export const Products = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedVehicle, clearVehicleFilter } = useCart();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price-asc', 'price-desc', 'rating', 'newest'

  // Filter state
  const [filters, setFilters] = useState({
    vehicleType: searchParams.get('vehicleType') || 'all',
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand')] : [],
    maxPrice: 15000,
    inStockOnly: false,
    promoOnly: false,
  });

  // Sync URL search params
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);

    const cat = searchParams.get('category');
    if (cat) setFilters(prev => ({ ...prev, categories: [cat] }));

    const vt = searchParams.get('vehicleType');
    if (vt) setFilters(prev => ({ ...prev, vehicleType: vt }));
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesVehicle = p.compatibleVehicles?.some(v => v.toLowerCase().includes(query));

        if (!matchesName && !matchesBrand && !matchesSku && !matchesCategory && !matchesVehicle) {
          return false;
        }
      }

      // 2. Vehicle Type
      if (filters.vehicleType !== 'all' && p.vehicleType !== filters.vehicleType) {
        return false;
      }

      // 3. Categories
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
        return false;
      }

      // 4. Brands
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      // 5. Price
      if (p.price > filters.maxPrice) {
        return false;
      }

      // 6. In Stock
      if (filters.inStockOnly && p.stock <= 0) {
        return false;
      }

      // 7. Promo Only
      if (filters.promoOnly && !p.isPromotion && p.discount <= 0) {
        return false;
      }

      // 8. Vehicle Finder Filter if model is selected
      if (selectedVehicle.model) {
        const selectedModelLower = selectedVehicle.model.toLowerCase();
        const matchesSelectedVehicle = p.compatibleVehicles?.some(v => {
          const vLower = v.toLowerCase();
          return vLower.includes(selectedModelLower) || selectedModelLower.includes(vLower);
        });
        if (!matchesSelectedVehicle) {
          return false;
        }
      } else if (selectedVehicle.brand) {
        const matchesBrand = p.compatibleBrands?.includes(selectedVehicle.brand.toLowerCase());
        if (!matchesBrand) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.stock - a.stock;
      return 0; // recommended default
    });
  }, [products, searchQuery, filters, sortBy, selectedVehicle]);

  const handleResetFilters = () => {
    setFilters({
      vehicleType: 'all',
      categories: [],
      brands: [],
      maxPrice: 15000,
      inStockOnly: false,
      promoOnly: false,
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const removeCategoryFilter = (catSlug) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== catSlug),
    }));
  };

  const removeBrandFilter = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.filter(b => b !== brand),
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Control Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E2536]">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {searchQuery ? `ผลการค้นหา "${searchQuery}"` : 'รายการอะไหล่ทั้งหมด'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                พบสินค้าทั้งหมด <span className="text-white font-bold">{filteredProducts.length}</span> รายการ
              </p>
            </div>

            {/* Controls: Mobile Filter Trigger & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                aria-label="เปิดตัวกรองสินค้า"
                className="lg:hidden flex-1 sm:flex-none min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#141822] border border-[#2B3448] text-xs font-bold text-slate-200 hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] transition-colors"
              >
                <Filter className="w-4 h-4 text-[#E63946]" />
                <span>ตัวกรองสินค้า</span>
                {(filters.categories.length > 0 || filters.brands.length > 0 || filters.promoOnly) && (
                  <span className="w-2 h-2 rounded-full bg-[#E63946]"></span>
                )}
              </button>

              {/* Sort dropdown */}
              <div className="flex-1 md:flex-initial flex items-center gap-2 bg-[#141822] border border-[#2B3448] rounded-xl px-3 min-h-[44px] focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-[#E63946]/50">
                <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                <label htmlFor="products-sort-select" className="sr-only">เรียงลำดับสินค้า</label>
                <select
                  id="products-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer py-2.5"
                >
                  <option value="recommended" className="bg-[#141822]">แนะนำยอดนิยม</option>
                  <option value="price-asc" className="bg-[#141822]">ราคา: ต่ำ → สูง</option>
                  <option value="price-desc" className="bg-[#141822]">ราคา: สูง → ต่ำ</option>
                  <option value="rating" className="bg-[#141822]">คะแนนรีวิวสูงสุด</option>
                  <option value="newest" className="bg-[#141822]">สินค้ามาใหม่</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Vehicle Notification if active */}
          {selectedVehicle.model && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  กำลังกรองเฉพาะอะไหล่ที่ตรงรุ่นกับ: <strong className="text-white font-bold">{selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.year || 'ทุกปี'})</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={clearVehicleFilter}
                className="min-h-[44px] px-2 text-[#FF6B6B] hover:text-white hover:underline font-bold inline-flex items-center"
              >
                ล้างตัวกรองรุ่นรถ
              </button>
            </div>
          )}

          {/* Active Filter Chips */}
          {(filters.categories.length > 0 || filters.brands.length > 0 || searchQuery || filters.promoOnly) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-semibold mr-1">ตัวกรองที่เลือก:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-lg bg-[#181E2C] border border-slate-700 text-xs text-white">
                  <span>ค้นหา: {searchQuery}</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="ลบคำค้นหา"
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-slate-700/80 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filters.categories.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-[#FF6B6B] font-bold">
                  <span>หมวด: {c}</span>
                  <button
                    type="button"
                    onClick={() => removeCategoryFilter(c)}
                    aria-label={`ลบตัวกรองหมวดหมู่ ${c}`}
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-red-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {filters.brands.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200">
                  <span>แบรนด์: {b}</span>
                  <button
                    type="button"
                    onClick={() => removeBrandFilter(b)}
                    aria-label={`ลบตัวกรองแบรนด์ ${b}`}
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-slate-700 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {filters.promoOnly && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 text-xs text-orange-400 font-bold">
                  <span>เฉพาะโปรโมชั่น</span>
                  <button
                    type="button"
                    onClick={() => setFilters(f => ({ ...f, promoOnly: false }))}
                    aria-label="ยกเลิกเฉพาะโปรโมชั่น"
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-orange-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="min-h-[44px] px-2 text-xs text-[#FF6B6B] hover:text-white hover:underline font-bold inline-flex items-center ml-1"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}

          {/* Smart Recommendation Banner Trigger - Clean secondary utility */}
          <div className="p-3.5 rounded-2xl bg-[#131722] border border-[#222A3B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  เลือกไม่ถูก หรือไม่แน่ใจว่าจะต้องเปลี่ยนชิ้นไหน?
                </span>
                <p className="text-xs text-slate-400">
                  ลองใช้ <strong className="text-amber-300 font-medium">ระบบผู้ช่วยแนะนำอะไหล่อัจฉริยะ</strong> ค้นหาตามอาการ หรือทำแบบประเมิน 3 ข้อ
                </p>
              </div>
            </div>
            <Link
              to="/recommendations"
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#1C2230] hover:bg-[#252E42] border border-[#2B354A] text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <span>เปิดระบบแนะนำสินค้า</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E63946]" />
            </Link>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filter + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filter */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setMobileFilterOpen(false)}
              />
              <div className="relative w-4/5 max-w-xs bg-[#11151F] h-full p-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] overflow-y-auto z-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base">ตัวกรองสินค้า</h3>
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      aria-label="ปิดตัวกรองสินค้า"
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ProductFilter
                    filters={filters}
                    onFilterChange={setFilters}
                    onResetFilters={handleResetFilters}
                    totalResults={filteredProducts.length}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full mt-4 min-h-[44px] py-3 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] active:scale-98 text-white font-bold text-xs shadow-lg shadow-red-950/40 transition-all cursor-pointer"
                >
                  แสดงผล ({filteredProducts.length} รายการ)
                </button>
              </div>
            </div>
          )}

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            <ProductGrid
              products={filteredProducts}
              onResetFilters={handleResetFilters}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
