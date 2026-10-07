import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Car,
  Bike,
  ShieldCheck,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { Product360Viewer } from './Product360Viewer';

export const QuickViewModal = () => {
  const navigate = useNavigate();
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('image');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isInWishlist(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#11151F] border border-[#262E40] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="ปิดหน้าต่างดูตัวอย่างด่วน"
          className="absolute top-4 right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/60 hover:bg-black text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image / 360 Container */}
        <div className="w-full md:w-1/2 p-5 bg-[#0A0D15] flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#262E40]">
          {/* Top Toggle Mode */}
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141A28] border border-[#243048]">
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  viewMode === 'image'
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ภาพถ่าย
              </button>
              <button
                type="button"
                onClick={() => setViewMode('360')}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  viewMode === '360'
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>หมุน 360°</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </button>
            </div>

            {product.discount > 0 && (
              <span className="px-2.5 py-1 rounded-md bg-[#E63946] text-white font-extrabold text-xs shadow-md">
                ลด {product.discount}%
              </span>
            )}
          </div>

          {/* Viewer Stage */}
          <div className="flex-1 flex items-center justify-center">
            {viewMode === '360' ? (
              <div className="w-full">
                <Product360Viewer product={product} />
              </div>
            ) : (
              <div className="relative w-full aspect-square studio-canvas rounded-2xl p-6 flex items-center justify-center border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
                {product.brandLogo && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-slate-200">
                    <img src={product.brandLogo} alt={product.brand} className="h-4 w-auto object-contain" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2">
              {product.name}
            </h2>

            <div className="mb-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-black text-white font-mono">
                ฿{formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  ฿{formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Vehicle compatibility sample */}
            <div className="p-2.5 rounded-xl bg-[#161B27] border border-[#252E42] text-xs space-y-1 mb-4">
              <span className="text-slate-400 font-semibold block">รุ่นรถที่รองรับตัวอย่าง:</span>
              <p className="text-slate-200 font-medium">
                {product.compatibleVehicles?.slice(0, 4).join(', ')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-3 border-t border-[#22293A]">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-semibold">จำนวน:</span>
              <div className="flex items-center rounded-xl bg-[#181E2C] border border-slate-700 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="ลดจำนวน"
                  className="min-w-[38px] min-h-[38px] flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-mono font-bold text-white select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="เพิ่มจำนวน"
                  className="min-w-[38px] min-h-[38px] flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">
                มีสินค้าพร้อมส่ง ({product.stock} ชิ้น)
              </span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="primary"
                icon={ShoppingCart}
                onClick={handleAddToCart}
              >
                เพิ่มลงตะกร้า
              </Button>

              <Button
                variant="outline"
                icon={ExternalLink}
                onClick={handleViewFullDetails}
              >
                ดูรายละเอียดเต็ม
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
