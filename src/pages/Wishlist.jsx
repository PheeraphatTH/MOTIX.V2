import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/products/ProductCard';
import { EmptyState } from '../components/common/EmptyState';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, clearWishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0D12] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <EmptyState
            title="ยังไม่มีสินค้าในรายการโปรด"
            description="กดไอคอนหัวใจที่สินค้าที่คุณสนใจ เพื่อบันทึกไว้ดูหรือสั่งซื้อในภายหลัง"
            actionLabel="เลือกดูสินค้าทั้งหมด"
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
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              รายการอะไหล่ที่คุณบันทึกไว้ ({wishlist.length} รายการ)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              สินค้าที่คุณสนใจเพื่อกลับมาดูหรือสั่งซื้อในภายหลัง
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            aria-label="ล้างรายการโปรดทั้งหมด"
            className="min-h-[44px] px-2 text-xs text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-lg cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>ล้างรายการโปรดทั้งหมด</span>
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
