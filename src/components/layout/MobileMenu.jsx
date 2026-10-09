import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Home,
  Package,
  Layers,
  Flame,
  Info,
  Phone,
  HelpCircle,
  Heart,
  ShoppingCart,
  User,
  Zap,
  Globe,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MotixBrandLogo } from '../common/MotixBrandLogo';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cartTotalItems, wishlist, user, selectedVehicle, logoutUser } = useCart();

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  const navItems = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.products'), path: '/products', icon: Package },
    { name: t('nav.recommendations') || 'แนะนำสินค้า', path: '/recommendations', icon: Sparkles, badge: 'AI', special: true },
    { name: t('nav.categories'), path: '/categories', icon: Layers },
    { name: t('nav.promotions'), path: '/promotions', icon: Flame, badge: 'HOT' },
    { name: t('nav.about'), path: '/about', icon: Info },
    { name: t('nav.contact'), path: '/contact', icon: Phone },
    { name: t('nav.faq'), path: '/faq', icon: HelpCircle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-4/5 max-w-xs bg-[#0F121A] border-r border-[#262D3D] h-full flex flex-col z-10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1F2636]">
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="cursor-pointer"
                aria-label="MOTIX Home"
              >
                <MotixBrandLogo size="sm" showTagline={true} />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="ปิดเมนู"
                aria-label="ปิดเมนู"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Vehicle Badge */}
            {selectedVehicle.model && (
              <div className="mx-4 mt-3 p-3 rounded-xl bg-red-950/40 border border-red-900/50 flex items-center gap-2.5 text-xs">
                <SlidersHorizontal className="w-4 h-4 text-[#E63946] shrink-0" />
                <div className="truncate">
                  <span className="text-slate-400 block text-[10px]">รุ่นรถของคุณ:</span>
                  <span className="font-bold text-white">
                    {selectedVehicle.brand} {selectedVehicle.model}
                  </span>
                </div>
              </div>
            )}

            {/* Nav Links */}
            <div className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleLinkClick(item.path)}
                    className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#181E2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-500/20 text-[#FF6B6B]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-[#1F2636] space-y-1">
                <button
                  type="button"
                  onClick={() => handleLinkClick('/wishlist')}
                  className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#181E2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>{t('nav.wishlist')}</span>
                  </div>
                  {wishlist.length > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#FF5722] text-white">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleLinkClick('/cart')}
                  className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#181E2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-[#E63946]" />
                    <span>{t('nav.cart')}</span>
                  </div>
                  {cartTotalItems > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#E63946] text-white">
                      {cartTotalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Footer Language & User with Safe Area Padding */}
            <div className="p-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] border-t border-[#1F2636] bg-[#0B0D12] space-y-3">
              {/* Language Switch */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>ภาษา (Language)</span>
                </span>
                <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage('th');
                      localStorage.setItem('motix_lang', 'th');
                    }}
                    className={`min-w-[36px] min-h-[36px] flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                      i18n.language === 'th' ? 'bg-[#E63946] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    TH
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage('en');
                      localStorage.setItem('motix_lang', 'en');
                    }}
                    className={`min-w-[36px] min-h-[36px] flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                      i18n.language === 'en' ? 'bg-[#E63946] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* User Auth */}
              {user ? (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate">
                      {typeof user?.name === 'string' ? user.name : (typeof user?.name === 'object' && user?.name?.name ? String(user.name.name) : 'สมาชิก MOTIX')}
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold">
                      {typeof user?.points === 'number' || typeof user?.points === 'string' ? user.points : 0} แต้ม
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logoutUser();
                      onClose();
                    }}
                    className="w-full min-h-[44px] py-2 rounded-xl bg-red-950/30 text-red-400 hover:text-red-300 text-xs font-bold border border-red-900/40 cursor-pointer"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('/register')}
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>สมัครสมาชิกใหม่ (รับ 100 แต้ม)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('/login')}
                    className="w-full min-h-[44px] py-2 rounded-xl bg-[#181E2C] hover:bg-[#222A3D] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-[#2B354A] cursor-pointer active:scale-95 transition-all"
                  >
                    <span>เข้าสู่ระบบ</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
