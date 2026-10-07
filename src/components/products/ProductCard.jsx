import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShoppingCart,
  Heart,
  Eye,
  CheckCircle2,
  Car,
  Bike,
  Star,
  ShieldCheck,
  Zap,
  RotateCw,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getBrandLogo } from '../../data/productAssets';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, selectedVehicle } = useCart();

  const isFavorite = isInWishlist(product?.id);
  const isCompatibleWithSelected = selectedVehicle && selectedVehicle.model
    ? (product?.compatibleVehicles || []).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(String(selectedVehicle.model).toLowerCase())
      )
    : true;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const brandLogo = product.brandLogo || getBrandLogo(product.brand);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col bg-[#0F1420] border border-[#1E273A] hover:border-[#E63946]/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_12px_35px_-8px_rgba(230,57,70,0.3)] transition-all duration-300"
    >
      {/* 1. Studio Showcase Canvas */}
      <div className="relative w-full pt-[85%] studio-canvas overflow-hidden rounded-t-2xl border-b border-[#1A2234]">
        
        {/* Brand Logo Badge on Top-Left */}
        <div className="absolute top-3 left-3 z-10 max-h-7 flex items-center pointer-events-none">
          {brandLogo ? (
            <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm border border-slate-200/80">
              <img
                src={brandLogo}
                alt={product.brand}
                referrerPolicy="no-referrer"
                className="h-4 sm:h-5 w-auto object-contain max-w-[85px]"
              />
            </div>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Image Link with Smooth Zoom */}
        <Link to={`/products/${product.id}`} className="absolute inset-0 flex items-center justify-center p-6 pt-9">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
          />
        </Link>

        {/* Quick Action Overlay Buttons (Wishlist & Quick View) Top-Right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`min-w-[36px] min-h-[36px] w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isFavorite
                ? 'bg-[#E63946] text-white shadow-[0_0_10px_rgba(230,57,70,0.5)]'
                : 'bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white'
            }`}
            title="เพิ่มในรายการโปรด"
            aria-label={isFavorite ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="min-w-[36px] min-h-[36px] w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="ดูตัวอย่างด่วน"
            aria-label={`ดูตัวอย่างด่วน ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="min-w-[36px] min-h-[36px] w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-black/50 hover:bg-[#E63946] text-amber-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="หมุนดู 360 องศา"
            aria-label={`หมุนดู 360 องศา ${product.name}`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vehicle Match Status Badge */}
        {selectedVehicle.model && isCompatibleWithSelected ? (
          <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 backdrop-blur-md flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 shadow-md z-10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">ใส่ได้ตรงรุ่น {selectedVehicle.model} 100%</span>
          </div>
        ) : (
          product.isPromotion && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white text-[10px] font-black shadow-md z-10">
              HOT DEAL
            </div>
          )
        )}
      </div>

      {/* 2. Product Information */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#0F1420] to-[#0A0D15]">
        <div>
          {/* Category / Part Subtitle */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-[#FF5722]">{product.category || 'อะไหล่แท้'}</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-bold">
                {product.stock > 0 ? 'มีสินค้า' : 'หมด'}
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-[#FF6B6B] transition-colors mb-2">
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Compatible Vehicles */}
          <p className="text-[11px] text-slate-400 line-clamp-1 mb-2.5">
            <span className="text-slate-500 font-medium">ตรงรุ่น:</span> {product.compatibleVehicles?.slice(0, 3).join(', ')}
          </p>

          {/* Rating Row */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-1 bg-[#151D2C] px-2 py-0.5 rounded-md border border-[#243048]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewCount} รีวิว)</span>
          </div>
        </div>

        {/* 3. Price & Add to Cart Button */}
        <div className="pt-3 border-t border-[#1C2538] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-lg sm:text-xl font-extrabold text-white telemetry-chip">
                ฿{formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-500/20 text-[#FF6B6B] border border-red-500/30">
                  -{product.discount}%
                </span>
              )}
            </div>
            {product.oldPrice && (
              <span className="text-[11px] text-slate-500 line-through telemetry-chip">
                ฿{formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Tactile Racing CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            disabled={product.stock <= 0}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-gradient-to-r from-[#E63946] via-[#FF3B4C] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white flex items-center justify-center active:scale-90 transition-all shadow-[0_4px_12px_rgba(230,57,70,0.4)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="เพิ่มลงตะกร้า"
            aria-label={`เพิ่ม ${product.name} ลงตะกร้า`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
