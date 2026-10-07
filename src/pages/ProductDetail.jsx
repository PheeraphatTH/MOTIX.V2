import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Car,
  Bike,
  Sparkles,
  Share2,
  ChevronRight,
  Zap,
  Star,
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductGallery } from '../components/products/ProductGallery';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart, toggleWishlist, isInWishlist, selectedVehicle } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specs', 'compatibility', 'reviews'
  const [copiedLink, setCopiedLink] = useState(false);

  const product = products.find((p) => p.id === id) || products[0];
  const isFavorite = isInWishlist(product?.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product?.id && (p.category === product?.category || p.vehicleType === product?.vehicleType))
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">ไม่พบสินค้า</h2>
          <Button onClick={() => navigate('/products')}>กลับไปหน้ารวมสินค้า</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Ignore iframe clipboard permission restrictions
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const isCompatibleWithSelected = selectedVehicle && selectedVehicle.model
    ? (product?.compatibleVehicles || []).some(v => 
        typeof v === 'string' && v.toLowerCase().includes(String(selectedVehicle.model).toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-[#0B0D12] pt-6 pb-24 lg:py-10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 overflow-x-auto pb-1">
          <Link to="/" className="hover:text-white shrink-0">หน้าแรก</Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <Link to="/products" className="hover:text-white shrink-0">สินค้าทั้งหมด</Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <Link to={`/products?category=${product.category}`} className="hover:text-white shrink-0">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="text-slate-200 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Top Stage: Gallery + Key Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery product={product} images={product.images || [product.image]} productName={product.name} />
          </div>

          {/* Right Column: Product Core Info & Buying Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand, Type, SKU & Share */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-[#FF6B6B] font-extrabold text-xs tracking-wider uppercase border border-red-500/30">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="min-h-[44px] px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    title="แชร์สินค้านี้"
                    aria-label="แชร์สินค้านี้"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedLink ? 'คัดลอกลิงก์แล้ว' : 'แชร์'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isFavorite
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                    title="รายการโปรด"
                    aria-label="บันทึกในรายการโปรด"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              {/* English Subtitle */}
              <p className="text-xs font-mono text-slate-400">{product.nameEn}</p>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                <span className="text-slate-500">•</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {product.stock > 0 ? `สต็อกพร้อมส่งทันที (${product.stock} ชิ้น)` : 'สินค้าหมดชั่วคราว'}
                </span>
              </div>

              {/* Price Tag Box */}
              <div className="p-4 rounded-2xl bg-[#141824] border border-[#242E42] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">ราคาพิเศษ (รวมภาษีมูลค่าเพิ่ม)</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                      ฿{formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-base text-slate-500 line-through font-mono">
                        ฿{formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {product.discount > 0 && (
                  <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white font-extrabold text-sm shadow-md">
                    ประหยัด {product.discount}%
                  </span>
                )}
              </div>

              {/* Vehicle Compatibility Status Notice */}
              {selectedVehicle.model ? (
                <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                  isCompatibleWithSelected
                    ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                    : 'bg-amber-950/40 border-amber-700/60 text-amber-300'
                }`}>
                  {isCompatibleWithSelected ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block text-white">ตรวจสอบแล้ว: ใส่ได้ตรงรุ่น 100%</strong>
                        <span>เข้ากันได้กับ {selectedVehicle.brand} {selectedVehicle.model} ของคุณ</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <strong className="block text-white">โปรดตรวจสอบ: อาจไม่ตรงกับรุ่นที่เลือก</strong>
                        <span>รถปัจจุบัน: {selectedVehicle.brand} {selectedVehicle.model} (ดูรายการรุ่นที่รองรับด้านล่าง)</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#121622] border border-[#222A3B] text-xs flex items-center justify-between">
                  <span className="text-slate-400">ยังไม่ได้เลือกรุ่นรถของคุณ?</span>
                  <Link to="/" className="text-[#FF6B6B] hover:underline font-bold">
                    ใช้ระบบ Vehicle Finder →
                  </Link>
                </div>
              )}

              {/* Brief Highlights */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  จุดเด่นของอะไหล่ชิ้นนี้:
                </span>
                <ul className="space-y-1 text-xs text-slate-400">
                  {product.features?.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Buying Controls */}
            <div className="space-y-4 pt-4 border-t border-[#1E2536]">
              {/* Quantity Selector */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-bold text-slate-300">จำนวน:</span>
                <div className="flex items-center rounded-xl bg-[#161B27] border border-[#2B354A] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="ลดจำนวน"
                    className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-mono font-bold text-white select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="เพิ่มจำนวน"
                    className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  ยอดรวม: <strong className="text-white font-mono text-sm">฿{formatPrice(product.price * quantity)}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  icon={ShoppingCart}
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full"
                >
                  เพิ่มลงตะกร้า
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  icon={Zap}
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full shadow-lg shadow-red-950/50"
                >
                  ซื้อทันที (Buy Now)
                </Button>
              </div>

              {/* Trust Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E63946]" />
                  <span>รับประกันแท้ 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FF5722]" />
                  <span>จัดส่งด่วน 24-48 ชม.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>เปลี่ยนคืนใน 7 วัน</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12 rounded-3xl bg-[#121622] border border-[#222A3B] p-6 sm:p-8 shadow-xl">
          
          {/* Tab Navigation Buttons */}
          <div role="tablist" aria-label="ข้อมูลสินค้าเพิ่มเติม" className="flex items-center gap-2 border-b border-[#1E2536] pb-4 mb-6 overflow-x-auto">
            {[
              { id: 'description', label: 'รายละเอียดสินค้า' },
              { id: 'specs', label: 'สเปกและข้อมูลทางเทคนิค' },
              { id: 'compatibility', label: 'รุ่นรถที่รองรับ' },
              { id: 'reviews', label: `รีวิว (${product.reviews?.length || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  activeTab === tab.id
                    ? 'bg-[#E63946] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-sm leading-relaxed">
            {/* 1. Description */}
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">รายละเอียดสินค้าและการใช้งาน</h3>
                <p className="text-slate-300 leading-relaxed max-w-4xl">
                  {product.description}
                </p>
                <div className="pt-4 border-t border-[#1E2536]">
                  <h4 className="text-sm font-bold text-white mb-2.5">
                    คุณสมบัติเด่น (Key Features)
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    {product.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0E1119] border border-[#1F2636]">
                        <CheckCircle2 className="w-4 h-4 text-[#E63946] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 2. Technical Specs Table */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">ข้อมูลจำเพาะทางเทคนิค (Specifications)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.specs && Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-[#0E1119] border border-[#1F2636] text-xs">
                      <span className="text-slate-400 font-medium capitalize">{key}</span>
                      <span className="text-white font-bold">{val}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#0E1119] border border-[#1F2636] text-xs">
                    <span className="text-slate-400 font-medium">แบรนด์</span>
                    <span className="text-white font-bold">{product.brand}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#0E1119] border border-[#1F2636] text-xs">
                    <span className="text-slate-400 font-medium">รหัส SKU</span>
                    <span className="text-white font-mono font-bold">{product.sku}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Compatible Vehicles */}
            {activeTab === 'compatibility' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">รายการรุ่นรถที่รองรับ (Compatible Vehicles)</h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    ✓ ผ่านการทดสอบระยะติดตั้งจริง
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {product.compatibleVehicles?.map((v, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#0E1119] border border-[#1F2636] text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">รีวิวจากลูกค้าผู้ซื้อจริง</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingStars rating={product.rating} size="sm" />
                      <span className="text-xs text-slate-400">({product.reviewCount} รีวิวทั้งหมด)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.reviews?.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-[#0E1119] border border-[#1F2636] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.author}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            ยืนยันผู้ซื้อจริง
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{rev.date}</span>
                      </div>
                      <RatingStars rating={rev.rating} size="xs" showNumber={false} />
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#E63946] rounded-full"></span>
              <span>สินค้าที่ใกล้เคียงและมักจะซื้อร่วมกัน</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Buy Bar for friction-free conversion with safe area support */}
      <aside aria-label="แถบสั่งซื้อด่วนบนมือถือ" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121622]/95 backdrop-blur-md border-t border-[#222A3B] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0 flex-1">
          <span className="text-[11px] text-slate-400 block truncate">{product.name}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-white font-mono">฿{formatPrice(product.price * quantity)}</span>
            {quantity > 1 && (
              <span className="text-[10px] text-slate-400 font-mono">({quantity} ชิ้น)</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            aria-label="เพิ่มลงตะกร้า"
            className="min-h-[44px] px-3.5 rounded-xl bg-[#1C2230] border border-[#2B354A] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 transition-all disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4 text-[#E63946]" />
            <span className="hidden xs:inline">เพิ่มลงตะกร้า</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>ซื้อทันที</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
