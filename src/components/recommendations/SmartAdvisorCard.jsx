import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingCart, Star, CheckCircle, Eye, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getBrandLogo } from '../../data/productAssets';

export const SmartAdvisorCard = ({ product, onQuickView }) => {
  const { addToCart, showToast } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`เพิ่ม ${product.name} ลงในตะกร้าแล้ว`, 'success');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  const score = product.recommendationScore || 95;
  const brandLogo = product.brandLogo || getBrandLogo(product.brand);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#0F1420] border border-[#1E273A] hover:border-[#E63946]/60 shadow-lg hover:shadow-[0_12px_30px_rgba(230,57,70,0.25)] transition-all duration-300 overflow-hidden">
      
      {/* Top Match Score Pill */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#090C12]/90 text-[10px] font-bold text-white border border-[#2B354C] backdrop-blur-md shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" />
        <span className="telemetry-chip font-bold text-[#FF6B6B]">{score}% Match</span>
      </div>

      {/* Promo badge */}
      {product.promoTag && (
        <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-[#E63946] text-white text-[10px] font-black uppercase shadow-md">
          {product.promoTag}
        </div>
      )}

      {/* Product Image Canvas (Studio Canvas) */}
      <div className="relative aspect-[4/3] studio-canvas p-5 flex items-center justify-center overflow-hidden border-b border-[#1A2234]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
          loading="lazy"
        />

        {/* Hover Quick View Trigger */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-lg bg-black/40 hover:bg-[#E63946] text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md"
          title="ดูตัวอย่างด่วน"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-[#0F1420] to-[#0A0D15]">
        
        {/* Brand & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-bold text-[#FF5722] uppercase tracking-wide">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-[#151D2C] px-2 py-0.5 rounded-md border border-[#243048]">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${product.id}`}
          className="text-xs sm:text-sm font-bold text-white hover:text-[#FF6B6B] transition-colors line-clamp-2 mb-2 leading-snug"
        >
          {product.name}
        </Link>

        {/* Highlighted Reason */}
        <div className="text-[11px] text-slate-300 line-clamp-2 mb-3 bg-[#0A0D14] px-2.5 py-1.5 rounded-lg border border-[#1E273A]/80">
          <span>{product.recommendationReason || product.description}</span>
        </div>

        {/* Pricing and 1-Click Action */}
        <div className="mt-auto pt-3 border-t border-[#1C2538] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-white telemetry-chip">
                ฿{product.price.toLocaleString()}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-[11px] text-slate-500 line-through telemetry-chip">
                  ฿{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white text-xs font-bold shadow-[0_2px_10px_rgba(230,57,70,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>ใส่ตะกร้า</span>
            </button>
            <Link
              to={`/products/${product.id}`}
              className="p-1.5 rounded-xl bg-[#161D2B] hover:bg-[#20293A] text-slate-300 hover:text-white transition-colors"
              title="ดูรายละเอียด"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
