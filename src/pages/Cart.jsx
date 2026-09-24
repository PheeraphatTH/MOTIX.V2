import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Car,
  Bike,
  Lock,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    user,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const formatPrice = (price) => {
    const num = Number(price);
    return new Intl.NumberFormat('th-TH').format(isNaN(num) ? 0 : num);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0D12] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <EmptyState
            title="ตะกร้าสินค้าของคุณยังว่างอยู่"
            description="เลือกรุ่นรถของคุณ หรือค้นหาอะไหล่แท้คุณภาพสูงเพื่อเริ่มต้นการสั่งซื้อ"
            actionLabel="เริ่มเลือกซื้ออะไหล่"
            onAction={() => navigate('/products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E2536]">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider block mb-1">
              SHOPPING CART
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              ตะกร้าสินค้าของคุณ ({cart.length} รายการ)
            </h1>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>ล้างตะกร้าทั้งหมด</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((rawItem, index) => {
              const item = rawItem.product || rawItem;
              const price = Number(rawItem.price ?? item.price ?? 0);
              const safePrice = isNaN(price) ? 0 : price;
              const quantity = Math.max(1, Number(rawItem.quantity) || 1);
              const name = rawItem.name || item.name || 'อะไหล่ MOTIX';
              const brand = rawItem.brand || item.brand || 'MOTIX';
              const sku = rawItem.sku || item.sku || 'MTX-PART';
              const image = rawItem.image || item.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80';
              const itemId = rawItem.id || item.id || `item-${index}`;
              const compatibleList = rawItem.compatibleVehicles || item.compatibleVehicles || [];
              const fitmentText = rawItem.vehicle || (compatibleList.length > 0 ? compatibleList.slice(0, 3).join(', ') : 'รองรับหลากหลายรุ่น');

              return (
                <div
                  key={itemId}
                  className="rounded-2xl bg-[#121622] border border-[#222A3B] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md hover:border-[#E63946]/30 transition-colors"
                >
                  {/* Image Container */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white border border-[#202738] p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left space-y-1 w-full sm:w-auto">
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#FF6B6B] uppercase">
                        {brand}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-[11px] text-slate-400 font-mono">SKU: {sku}</span>
                    </div>

                    <Link
                      to={`/products/${itemId}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-[#FF6B6B] transition-colors block line-clamp-1"
                    >
                      {name}
                    </Link>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      รองรับ: {fitmentText}
                    </p>

                    <div className="text-sm font-mono text-slate-300 sm:hidden pt-1">
                      ฿{formatPrice(safePrice)} ต่อชิ้น
                    </div>
                  </div>

                  {/* Quantity & Price Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-2">
                    <div className="flex items-center rounded-xl bg-[#161B27] border border-[#2B354A]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(itemId, quantity - 1)}
                        className="px-2.5 py-1 text-slate-300 hover:text-white font-bold cursor-pointer transition-colors"
                        title="ลดจำนวน"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(itemId, quantity + 1)}
                        className="px-2.5 py-1 text-slate-300 hover:text-white font-bold cursor-pointer transition-colors"
                        title="เพิ่มจำนวน"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base sm:text-lg font-black text-white font-mono block">
                        ฿{formatPrice(safePrice * quantity)}
                      </span>
                      <span className="hidden sm:block text-[10px] text-slate-400 font-mono">
                        (฿{formatPrice(safePrice)} / ชิ้น)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(itemId)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="ลบรายการนี้"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Guarantees row */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#121622]/60 border border-[#1E2536] text-xs text-slate-400 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E63946]" />
                <span>อะไหล่แท้ 100%</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FF5722]" />
                <span>ส่งด่วน 24-48 ชม.</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>เปลี่ยนคืนใน 7 วัน</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Card */}
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                <Tag className="w-4 h-4 text-[#E63946]" />
                <span>โค้ดส่วนลด (Coupon Code)</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/60 flex items-center justify-between">
                  <div className="text-xs text-emerald-300">
                    <span className="font-bold block font-mono">{appliedCoupon.code}</span>
                    <span>{appliedCoupon.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:underline font-bold"
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="กรอกโค้ด เช่น MOTIX100"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-[#0E1119] border border-[#2A344A] rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-[#E63946]"
                  />
                  <Button type="submit" variant="primary" size="sm">
                    ใช้โค้ด
                  </Button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-400">{couponError}</p>
              )}

              <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap gap-1.5">
                <span>โค้ดแนะนำ:</span>
                <span className="font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => applyCoupon('MOTIX100')}>MOTIX100</span>
                <span className="font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => applyCoupon('FREESHIP')}>FREESHIP</span>
                <span className="font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => applyCoupon('RIDE150')}>RIDE150</span>
              </div>
            </div>

            {/* Summary Card */}
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white pb-3 border-b border-[#1E2536]">
                สรุปคำสั่งซื้อ (Order Summary)
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>ยอดรวมสินค้า (Subtotal):</span>
                  <span className="font-mono font-bold text-white">฿{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>ส่วนลดคูปอง ({appliedCoupon?.code}):</span>
                    <span className="font-mono font-bold">-฿{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>ค่าจัดส่งพัสดุด่วน:</span>
                  <span className="font-mono font-bold text-white">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-400">ฟรี (โปรโมชั่น)</span>
                    ) : (
                      `฿${cartShipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>ภาษีมูลค่าเพิ่ม VAT 7%:</span>
                  <span>รวมในราคาแล้ว</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E2536] flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">ยอดชำระสุทธิ</span>
                  <span className="text-[10px] text-slate-400">Net Total Amount</span>
                </div>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF8A8A] font-mono">
                  ฿{formatPrice(cartTotal)}
                </span>
              </div>

              {/* Member Auth Requirement Box */}
              {user ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/30 animate-pulse" />
                    <div>
                      <span className="text-white font-bold block">{user.name}</span>
                      <span className="text-[10px] text-emerald-400 font-medium">เข้าสู่ระบบแล้ว • {user.tier || 'สมาชิก MOTIX'}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    +{Math.floor(cartTotal / 50)} แต้ม
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs text-amber-200">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>ต้องเข้าสู่ระบบก่อนสั่งซื้อ</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    ระบบกำหนดให้เข้าสู่ระบบหรือสมัครสมาชิกก่อน เพื่อผูกประวัติคำสั่งซื้อและรับประกันอะไหล่แท้
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                icon={user ? ArrowRight : Lock}
                iconPosition="right"
                onClick={() => {
                  if (!user) {
                    navigate('/login?redirect=/checkout');
                  } else {
                    navigate('/checkout');
                  }
                }}
                className="w-full shadow-lg shadow-red-950/60 font-bold"
              >
                {user ? 'ดำเนินการสั่งซื้อ (Checkout)' : 'เข้าสู่ระบบเพื่อสั่งซื้อสินค้า (Login to Order)'}
              </Button>

              <Link
                to="/products"
                className="block text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← เลือกซื้อสินค้าเพิ่มเติม
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
