import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Award,
  Globe,
  Star,
  Gift,
  Percent,
} from 'lucide-react';
import { MotixBrandLogo } from '../common/MotixBrandLogo';
import { NewsletterSubscribe } from '../common/NewsletterSubscribe';

// Official Vector Brand Icons for Social Platforms (100% permitted for channel linking)
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LineIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.311c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.01 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export const Footer = () => {
  const { t } = useTranslation();
  // Social Channels with Official Brand Icons
  const socialChannels = [
    { name: 'Facebook', desc: 'ข่าวสารและโปรโมชั่น', icon: FacebookIcon, color: 'bg-[#1877F2]', border: 'border-blue-500/40', url: 'https://facebook.com' },
    { name: 'Instagram', desc: 'ไอเดียแต่งรถและสินค้าใหม่', icon: InstagramIcon, color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]', border: 'border-pink-500/40', url: 'https://instagram.com' },
    { name: 'LINE', desc: 'โปรโมชั่นพิเศษสำหรับสมาชิก', icon: LineIcon, color: 'bg-[#06C755]', border: 'border-emerald-500/40', url: 'https://line.me' },
    { name: 'YouTube', desc: 'รีวิวสินค้าและวิดีโอสุดเร้าใจ', icon: YoutubeIcon, color: 'bg-[#FF0000]', border: 'border-red-500/40', url: 'https://youtube.com' },
    { name: 'TikTok', desc: 'คอนเทนต์สนุกๆ สายไบค์', icon: TiktokIcon, color: 'bg-[#010101]', border: 'border-slate-500/40', url: 'https://tiktok.com' },
    { name: 'Email Newsletter', desc: 'ข่าวสารและโปรโมชั่นพิเศษ', icon: Mail, color: 'bg-[#E63946]', border: 'border-red-500/40', url: '#subscribe' },
    { name: 'Website', desc: 'ข้อมูลสินค้าและทั้งหมด', icon: Globe, color: 'bg-slate-800', border: 'border-slate-500/40', url: '/' },
  ];

  return (
    <footer className="bg-[#07090E] border-t border-[#1C2332] text-slate-400 text-sm">
      
      {/* 1. Value Pillars Top Bar in Crimson Red Motorsport Theme */}
      <div className="border-b border-[#141A26] py-8 bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#E63946] shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">สินค้าคุณภาพ</h4>
                <p className="text-xs text-slate-400">คัดสรรจากแบรนด์ชั้นนำ</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5722] shrink-0 shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">จัดส่งรวดเร็ว</h4>
                <p className="text-xs text-slate-400">ทั่วประเทศไทย 24-48 ชม.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#FF6B6B] shrink-0 shadow-sm">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">มั่นใจได้ 100%</h4>
                <p className="text-xs text-slate-400">มีรับประกันสินค้าทุกชิ้น</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">บริการหลังการขาย</h4>
                <p className="text-xs text-slate-400">ผู้เชี่ยวชาญพร้อมดูแล</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Subscription with Visual HTML Email Auto-Delivery */}
      <div className="border-b border-[#18202E] py-12 bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSubscribe />
        </div>
      </div>

      {/* 3. Stay Connected / Channels Section (From หลังลูกค้าRegister V2.png) */}
      <div className="border-b border-[#18202E] py-10 bg-gradient-to-b from-[#0B0D14] to-[#080A10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5722]">
              <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
              <span>{t('footer.stayConnected')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              {t('footer.followUs')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('footer.followUsDesc')}
            </p>
          </div>

          {/* 7 Channels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {socialChannels.map((ch, idx) => {
              const IconComp = ch.icon;
              return (
                <a
                  key={idx}
                  href={ch.url}
                  target={ch.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#111622] border border-[#1E2738] hover:border-red-500/60 transition-all duration-300 group hover:-translate-y-1 shadow-md cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-full ${ch.color} flex items-center justify-center text-white mb-2 ring-2 ring-white/10 group-hover:ring-red-500/40 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#FF6B6B] transition-colors">
                    {ch.name}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {ch.desc}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Member Privileges 4 Icons (From หลังลูกค้าRegister V2.png) */}
          <div className="mt-8 pt-6 border-t border-[#1C2538] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0D111A]">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#E63946] flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <span className="text-slate-300 font-medium">{t('footer.memberPromo')}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0D111A]">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#FF5722] flex items-center justify-center shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-slate-300 font-medium">{t('footer.newArrivals')}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0D111A]">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#E63946] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-slate-300 font-medium">{t('footer.careTips')}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0D111A]">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <span className="text-slate-300 font-medium">{t('footer.privileges')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="MOTIX Home">
              <MotixBrandLogo size="lg" showTagline={true} />
            </Link>
            
            <p className="text-xs font-bold tracking-widest text-[#E63946] uppercase">
              KEEP YOUR RIDE MOVING — ให้รถของคุณพร้อมเดินทางต่อ
            </p>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ศูนย์รวมอะไหล่รถยนต์และรถจักรยานยนต์ออนไลน์ยุคใหม่ 
              ออกแบบระบบค้นหาอะไหล่ตรงรุ่น แม่นยำ รวดเร็ว พร้อมโปรโมชั่นและบริการหลังการขายมาตรฐานระดับสากล
            </p>

            {/* Academic Mini Project Note */}
            <div className="p-3 rounded-xl bg-[#10141C] border border-[#1E2738] flex items-start gap-2.5">
              <Award className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-slate-200 block">Digital Marketing Mini Project</span>
                <span className="text-slate-400">พัฒนาขึ้นเพื่อนำเสนอในรายวิชาการตลาดดิจิทัล</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
              <span>{t('footer.mainMenu')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.products')}</span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.categories')}</span>
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#FF6B6B] font-semibold">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.promotions')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>{t('nav.faq')}</span>
                </Link>
              </li>
              <li>
                <a
                  href="/subscribe_form.php"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-bold"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>ใบงาน PHP (subscribe_form.php)</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    PHP
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
              <span>{t('footer.popularCategories')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=cat-brake" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>ระบบเบรก & จานดิสก์</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-lubricant" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>น้ำมันเครื่องและของเหลว</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-drive-system" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>ชุดโซ่ สเตอร์ และสายพาน</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-suspension" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>โช้คอัพและระบบช่วงล่าง</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat-light" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#E63946]" />
                  <span>อุปกรณ์ไฟส่องสว่าง LED</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
              <span>{t('footer.contactUs')}</span>
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF5722] shrink-0" />
                <span className="font-semibold text-slate-200">02-888-MOTIX (02-888-6684)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B6B] shrink-0" />
                <span>support@motixparts.co.th</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('footer.businessHours')}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. Bottom Copyright & Trust */}
      <div className="border-t border-[#141A26] py-6 bg-[#05070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <span className="font-bold text-white">MOTIX</span>. {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">{t('footer.paymentMethods')}</span>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="px-2 py-1 rounded bg-[#10141E] text-slate-200 border border-slate-800">PromptPay QR</span>
              <span className="px-2 py-1 rounded bg-[#10141E] text-slate-200 border border-slate-800">Visa / Master</span>
              <span className="px-2 py-1 rounded bg-[#10141E] text-slate-200 border border-slate-800">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
