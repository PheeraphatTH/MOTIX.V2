import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  Zap,
  Sparkles,
  Car,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MotixBrandLogo } from '../common/MotixBrandLogo';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartTotalItems, wishlist, selectedVehicle, user, logoutUser, clearVehicleFilter } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('motix_lang', lang);
    setShowLangMenu(false);
  };

  const userName = typeof user?.name === 'string' ? user.name : (typeof user?.name === 'object' && user?.name?.name ? String(user.name.name) : 'สมาชิก MOTIX');
  const userEmail = typeof user?.email === 'string' ? user.email : (typeof user?.email === 'object' && user?.email?.email ? String(user.email.email) : 'member@motix.com');
  const userTier = typeof user?.tier === 'string' ? user.tier : 'Gold Member';
  const userPoints = typeof user?.points === 'number' || typeof user?.points === 'string' ? user.points : 0;
  const userVehicle = typeof user?.vehicleModel === 'string' ? user.vehicleModel : '';

  const navLinks = [
    { name: t('nav.home') || 'หน้าแรก', path: '/' },
    { name: t('nav.products') || 'สินค้าทั้งหมด', path: '/products' },
    { name: t('nav.recommendations') || 'แนะนำสินค้า AI', path: '/recommendations', special: true },
    { name: t('nav.categories') || 'หมวดหมู่อะไหล่', path: '/categories' },
    { name: t('nav.promotions') || 'โปรโมชั่นเดือด', path: '/promotions', highlight: true },
    { name: t('nav.about') || 'เกี่ยวกับเรา', path: '/about' },
    { name: t('nav.contact') || 'ติดต่อเรา', path: '/contact' },
    { name: t('nav.faq') || 'คำถามที่พบบ่อย', path: '/faq' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled
        ? 'glass-cockpit border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
        : 'bg-[#090C12]/95 border-b border-[#1C2538]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* 1. Slidebar Menu Button & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={onOpenMobileMenu}
              className="min-w-[44px] min-h-[44px] p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl text-slate-300 hover:text-white bg-[#111724] hover:bg-[#1A2234] border border-[#243048] hover:border-[#E63946]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group"
              aria-label="เปิดเมนูนำทาง"
              title="เปิดเมนูนำทาง"
            >
              <Menu className="w-5 h-5 text-[#E63946] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline-block text-xs font-bold text-slate-200 group-hover:text-white tracking-wide">
                เมนู
              </span>
            </button>

            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] rounded-xl p-1"
              aria-label="MOTIX Home"
            >
              <MotixBrandLogo size="md" showTagline={true} />
            </Link>
          </div>


          {/* 2. Quick Search Bar with Motorsport Style */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md hidden md:block relative"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่ออะไหล่, แบรนด์, รหัสสินค้า (เช่น Brembo, YSS)..."
                className="w-full bg-[#111624] text-sm text-slate-100 placeholder-slate-400 pl-10 pr-24 py-2.5 min-h-[44px] rounded-xl border border-[#243048] focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 px-3.5 py-1.5 min-h-[36px] bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ค้นหา
              </button>
            </div>
          </form>

          {/* 3. Right Action Tools: Language, Wishlist, Cart, User */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search icon button for mobile */}
            <button
              onClick={() => navigate('/products')}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-[#141A26] border border-[#232D42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
              aria-label="ค้นหาสินค้า"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label="เปลี่ยนภาษา"
                className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-[#111724] hover:bg-[#182030] border border-[#243048] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#E63946]" />
                <span className="uppercase">{i18n.language || 'th'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-[#121724] border border-[#243048] rounded-xl shadow-2xl py-1 z-50">
                  <button
                    onClick={() => changeLanguage('th')}
                    className={`w-full text-left px-3 py-2.5 min-h-[40px] text-xs font-semibold flex items-center justify-between hover:bg-[#1A2234] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                      i18n.language === 'th' ? 'text-[#E63946]' : 'text-slate-300'
                    }`}
                  >
                    <span>🇹🇭 ภาษาไทย</span>
                    {i18n.language === 'th' && <span>✓</span>}
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-3 py-2.5 min-h-[40px] text-xs font-semibold flex items-center justify-between hover:bg-[#1A2234] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                      i18n.language === 'en' ? 'text-[#E63946]' : 'text-slate-300'
                    }`}
                  >
                    <span>🇺🇸 English</span>
                    {i18n.language === 'en' && <span>✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="min-w-[44px] min-h-[44px] p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white bg-[#111724] hover:bg-[#182030] border border-[#243048] relative transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
              aria-label="รายการที่บันทึกไว้"
              title="รายการที่บันทึกไว้"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 hover:text-white" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF5722] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl bg-[#131928] hover:bg-[#1A2236] border border-[#26334D] text-slate-100 hover:border-[#E63946]/60 transition-all relative group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
              aria-label="ตะกร้าสินค้า"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#E63946] group-hover:scale-110 transition-transform" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E63946] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {cartTotalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-slate-200">
                ตะกร้า
              </span>
            </Link>

            {/* User Account / Auth */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="min-h-[44px] flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#111724] hover:bg-[#182030] border border-[#243048] text-xs font-semibold text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#E63946] to-[#FF5722] flex items-center justify-center font-bold text-white shadow-md">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline-block max-w-[100px] truncate">{userName}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#121724] border border-[#243048] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                      {/* Member Card Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/30 border-b border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                            MOTIX CLUB MEMBER
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {userTier}
                          </span>
                        </div>
                        <p className="text-sm font-black text-white truncate">{userName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
                        
                        {/* Points & Vehicle */}
                        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400 text-[11px]">แต้มสะสม:</span>
                          <span className="font-bold text-amber-400 font-mono">{userPoints} แต้ม</span>
                        </div>
                        {userVehicle && (
                          <div className="mt-1 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">รถของฉัน:</span>
                            <span className="font-bold text-white text-[11px] truncate max-w-[120px]">{userVehicle}</span>
                          </div>
                        )}
                      </div>

                      <div className="py-1">
                        <Link
                          to="/wishlist"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs text-slate-300 hover:bg-[#1A2234] hover:text-white"
                        >
                          <span>รายการที่บันทึกไว้</span>
                          <span className="text-[10px] text-slate-500">{(wishlist || []).length} ชิ้น</span>
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs text-slate-300 hover:bg-[#1A2234] hover:text-white"
                        >
                          <span>ตะกร้าสินค้า</span>
                          <span className="text-[10px] text-[#FF6B6B] font-bold">{cartTotalItems || 0} ชิ้น</span>
                        </Link>
                        <Link
                          to="/promotions"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-xs text-slate-300 hover:bg-[#1A2234] hover:text-white"
                        >
                          คูปองและโปรโมชั่นพิเศษ
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            logoutUser();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>ออกจากระบบ</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111724] hover:bg-[#182030] text-xs font-semibold text-slate-200 border border-[#243048] hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="hidden sm:inline-block">{t('nav.login') || 'เข้าสู่ระบบ'}</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-xs font-bold text-white shadow-[0_4px_12px_rgba(230,57,70,0.4)] transition-all"
                  >
                    <span className="hidden sm:inline-block">สมัครสมาชิก</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[10px] text-amber-300 font-mono font-bold">+100 แต้ม</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Desktop Navigation Category Links Bar & Active Vehicle Telemetry */}
        <nav className="hidden lg:flex items-center justify-between py-2.5 border-t border-[#1C2538]">
          <div className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-[#1A2234] border border-[#2D3952]'
                      : link.special
                      ? 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 font-bold'
                      : link.highlight
                      ? 'text-[#FF6B6B] hover:bg-red-500/10 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-[#131926]'
                  }`}
                >
                  {link.special && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  )}
                  {link.highlight && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E63946] mr-1 animate-ping" />
                  )}
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Active Vehicle Status Pill (Click to jump to garage selector) */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('vehicle-finder-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                navigate('/products');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
              selectedVehicle.model
                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-[#121724] border border-[#243048] hover:border-red-500/50 text-slate-300'
            }`}
            title="คลิกเพื่อเลือกรุ่นรถของคุณ"
          >
            <SlidersHorizontal className={`w-3.5 h-3.5 ${selectedVehicle.model ? 'text-emerald-400' : 'text-[#E63946]'}`} />
            <span>
              {selectedVehicle.model ? (
                <span>
                  รถของคุณ: <strong className="text-white font-bold">{selectedVehicle.brand} {selectedVehicle.model}</strong>
                </span>
              ) : (
                <span className="text-slate-400 hover:text-slate-200">
                  เลือกรุ่นรถของคุณ <span className="text-[#FF6B6B] font-bold">(เพื่อดูอะไหล่ตรงรุ่น)</span>
                </span>
              )}
            </span>
          </button>
        </nav>

      </div>
    </header>
  );
};
