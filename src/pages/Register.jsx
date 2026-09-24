import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Zap,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  Car,
  Bike,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Tag,
  ArrowRight,
  Copy,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { getApiUrl, getStoreBaseUrl } from '../utils/apiConfig';
import { EmailPreviewModal } from '../components/common/EmailPreviewModal';
import { MotixBrandLogo } from '../components/common/MotixBrandLogo';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || '/';
  const isFromCheckout = redirectTarget.includes('checkout');

  const { registerUser } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: 'car',
    vehicleModel: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [emailDeliveryInfo, setEmailDeliveryInfo] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [memberId] = useState(`MTX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!form.name.trim()) {
      setErrorMessage('กรุณาระบุชื่อ - นามสกุล');
      return;
    }

    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMessage('กรุณาระบุที่อยู่อีเมลให้ถูกต้อง');
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage('กรุณาระบุเบอร์โทรศัพท์ติดต่อ');
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!form.agreeTerms) {
      setErrorMessage('กรุณายอมรับเงื่อนไขการสมัครสมาชิก');
      return;
    }

    setIsSubmitting(true);

    const res = registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      vehicleType: form.vehicleType,
      vehicleModel: form.vehicleModel,
    });

    if (!res.success) {
      setIsSubmitting(false);
      setErrorMessage(res.message);
      return;
    }

    // Trigger Welcome Email through MOTIX Gmail SMTP service
    try {
      const clientStoreUrl = getStoreBaseUrl();

      const emailRes = await fetch(getApiUrl('/api/auth/register-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          vehicleType: form.vehicleType,
          vehicleModel: form.vehicleModel,
          storeUrl: clientStoreUrl,
        }),
      });
      const emailData = await emailRes.json();
      setEmailDeliveryInfo(emailData);
    } catch (err) {
      console.warn('Email dispatch warning:', err);
    }

    setIsSubmitting(false);
    setRegisterSuccess(true);
  };

  if (registerSuccess) {
    return (
      <div className="min-h-screen bg-[#07090E] py-10 sm:py-16 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Dynamic Background Glow matching Hero */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(230,57,70,0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-xl bg-[#0E121B] border border-[#222C3E] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10 animate-in fade-in zoom-in duration-300">
          
          {/* Header with authentic MOTIX Logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <MotixBrandLogo height={42} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>REGISTRATION COMPLETE &bull; ยืนยันการสมัครสำเร็จ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
              ยินดีต้อนรับสมาชิกใหม่ MOTIX!
            </h2>
            <p className="text-sm text-slate-300">
              สร้างบัญชีของคุณ <strong className="text-white">{form.name}</strong> เรียบร้อยแล้ว
            </p>
          </div>

          {/* REALISTIC MOTORSPORT VIP MEMBER CARD (Photorealistic Carbon & Titanium) */}
          <div className="relative rounded-2xl bg-[#070A0F] border border-red-500/40 p-5 sm:p-6 shadow-2xl overflow-hidden">
            {/* Background Carbon Weave Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Card Top Row: Brand & Tier */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div>
                <span className="text-xl font-black tracking-wider text-white font-['Arial_Black',Impact]">
                  MOTI<span className="text-[#E63946]">X</span>
                </span>
                <span className="block text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                  VIP MOTORSPORT CLUB
                </span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#161E2D] border border-red-500/40 text-[11px] font-black text-white flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
                <span>SILVER RACER</span>
              </div>
            </div>

            {/* Chip & Benefits Row */}
            <div className="relative z-10 flex items-center justify-between my-3 pb-3 border-b border-[#1A2333]">
              <div className="flex items-center gap-3">
                {/* Gold Chip Graphic */}
                <div className="w-10 h-8 rounded-md bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border border-amber-800 p-1 flex flex-col justify-between shadow-sm">
                  <div className="w-full h-1 bg-amber-900/40 rounded-xs" />
                  <div className="w-full h-1 bg-amber-900/40 rounded-xs" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {memberId}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">+100 แต้มต้อนรับ</span>
                <span className="text-[10px] text-slate-400">สะสมแต้ม 2x ทุกยอดซื้อ</span>
              </div>
            </div>

            {/* Member Details */}
            <div className="relative z-10 grid grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                  MEMBER NAME
                </span>
                <span className="font-bold text-white text-sm truncate block">
                  {form.name || 'MOTIX MEMBER'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                  REGISTERED VEHICLE
                </span>
                <span className="font-bold text-[#FF5722] text-sm truncate block">
                  {form.vehicleModel || (form.vehicleType === 'bike' ? 'มอเตอร์ไซค์' : 'รถยนต์')}
                </span>
              </div>
            </div>
          </div>

          {/* 15% Welcome Coupon Box (Realistic Design) */}
          <div className="p-4 rounded-2xl bg-[#090C12] border border-dashed border-[#FF5722] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-xs font-bold text-[#FF5722] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>โค้ดส่วนลดต้อนรับสมาชิกใหม่</span>
              </div>
              <div className="text-sm font-bold text-white">
                รับส่วนลด 15% ไม่มีขั้นต่ำ (ลดสูงสุด ฿1,000)
              </div>
              <div className="text-[11px] text-slate-400">
                ใช้ได้กับอะไหล่และน้ำมันเครื่องทุกชิ้นในร้าน MOTIX
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-[#141A26] border border-[#253246] font-mono font-bold text-sm text-[#FF5722] tracking-wider">
                MOTIX-WELCOME15
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('MOTIX-WELCOME15');
                  setCopiedCoupon(true);
                  setTimeout(() => setCopiedCoupon(false), 2000);
                }}
                className="p-2 rounded-lg bg-[#1D2536] hover:bg-[#253046] text-slate-200 hover:text-white border border-[#2E3C54] transition-colors cursor-pointer"
                title="คัดลอกโค้ด"
              >
                {copiedCoupon ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Email Dispatch Notice */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              จัดส่งบัตรสมาชิกและโค้ดลด 15% ไปยัง <strong className="text-white">{form.email}</strong> เรียบร้อยแล้ว
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {isFromCheckout ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(redirectTarget)}
                icon={ShoppingBag}
                className="w-full shadow-xl shadow-red-950/60 text-sm font-bold bg-gradient-to-r from-[#E63946] to-[#C1121F]"
              >
                🛒 ดำเนินการสั่งซื้อสินค้าต่อ (ไปที่หน้าชำระเงิน)
              </Button>
            ) : null}

            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#141924] hover:bg-[#1C2333] border border-red-500/40 text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Eye className="w-4 h-4 text-[#FF5722]" />
              <span>เปิดดูอีเมลจริงที่ส่ง (Realistic Email Preview)</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                variant={isFromCheckout ? "outline" : "primary"}
                size="md"
                onClick={() => navigate('/products')}
                icon={ShoppingBag}
                className="flex-1 shadow-lg shadow-red-950/40"
              >
                เลือกซื้ออะไหล่สำหรับ {form.vehicleModel || 'รถของคุณ'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                เข้าสู่หน้าแรก
              </Button>
            </div>
          </div>

          {/* Guarantees Footer */}
          <div className="pt-2 border-t border-[#1C2536] grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
            <div>🛡️ อะไหล่แท้ 100%</div>
            <div>🚚 จัดส่งด่วน 24-48h</div>
            <div>🔧 ค้นหาตรงรุ่น 100%</div>
          </div>

          {/* Email Preview Modal */}
          <EmailPreviewModal
            isOpen={showPreviewModal}
            onClose={() => setShowPreviewModal(false)}
            initialType="register"
            prefillEmail={form.email}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-[#121622] border border-[#262F42] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Checkout Alert Banner if redirected from checkout */}
        {isFromCheckout && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/70 to-[#1C1318] border border-[#E63946]/50 space-y-1 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF8A8A]">
              <ShoppingBag className="w-4 h-4 text-[#E63946]" />
              <span>สมัครสมาชิกเพื่อทำการสั่งซื้อสินค้า</span>
            </div>
            <p className="text-[11px] text-slate-300">
              สร้างบัญชีสมาชิกฟรีเพื่อบันทึกประวัติการสั่งซื้อ รับประกันสินค้าแท้ 100% พร้อมรับแต้มสะสมทันที
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E63946] to-[#9A031E] text-white shadow-lg mb-1">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            สมัครสมาชิก MOTIX Club
          </h1>
          <p className="text-xs text-slate-400">
            สร้างบัญชีเพื่อสะสมแต้ม ค้นหาอะไหล่ตรงรุ่นรถ และรับดีลราคาสมาชิก
          </p>
        </div>

        {/* Welcome Bonus Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#181D2A] to-amber-950/30 border border-red-500/30 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Award className="w-4 h-4" />
            <span>สิทธิประโยชน์พิเศษสำหรับสมาชิกใหม่:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400">
            <li className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>รับฟรีทันที <strong>100 แต้มสะสม</strong></span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-200">
              <Tag className="w-3.5 h-3.5 text-[#FF6B6B] shrink-0" />
              <span>โค้ดส่วนลด ฿100 (WELCOME100)</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>การันตีอะไหล่แท้ 100% ตรงรุ่น</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-200">
              <Car className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>บันทึกรุ่นรถเพื่อเช็กของเข้ากันได้</span>
            </li>
          </ul>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/60 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* 1. Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>ชื่อ - นามสกุล <span className="text-[#FF6B6B]">*</span></span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
              placeholder="ระบุชื่อ - นามสกุลของคุณ"
            />
          </div>

          {/* 2. Email & Phone in 2 cols on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>อีเมล <span className="text-[#FF6B6B]">*</span></span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                placeholder="youremail@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>เบอร์โทรศัพท์ <span className="text-[#FF6B6B]">*</span></span>
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                placeholder="081-234-5678"
              />
            </div>
          </div>

          {/* 3. Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>รหัสผ่าน <span className="text-[#FF6B6B]">*</span></span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl pl-3.5 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>ยืนยันรหัสผ่าน <span className="text-[#FF6B6B]">*</span></span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl pl-3.5 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                  placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* 4. Vehicle Selection (Optional helper) */}
          <div className="p-3.5 rounded-2xl bg-[#0E1119] border border-[#222A3B] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>รุ่นรถที่คุณใช้งาน (เพื่อกรองอะไหล่ตรงรุ่น)</span>
              </span>
              <span className="text-[10px] text-slate-500">ไม่บังคับ</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, vehicleType: 'car' })}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  form.vehicleType === 'car'
                    ? 'bg-red-500/15 border-[#E63946] text-white font-bold'
                    : 'bg-[#141824] border-[#252E42] text-slate-400'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>รถยนต์ (Car)</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, vehicleType: 'motorcycle' })}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  form.vehicleType === 'motorcycle'
                    ? 'bg-red-500/15 border-[#E63946] text-white font-bold'
                    : 'bg-[#141824] border-[#252E42] text-slate-400'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>มอเตอร์ไซค์ (Bike)</span>
              </button>
            </div>

            <input
              type="text"
              value={form.vehicleModel}
              onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
              className="w-full bg-[#121622] border border-[#262F42] rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946]"
              placeholder={
                form.vehicleType === 'car'
                  ? 'เช่น Toyota Yaris ATIV 2023, Honda Civic FE, Isuzu D-Max'
                  : 'เช่น Honda CBR650R, Yamaha XMAX 300, Kawasaki Ninja'
              }
            />
          </div>

          {/* 5. Terms checkbox */}
          <div className="flex items-start gap-2 pt-1 text-[11px]">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={form.agreeTerms}
              onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
              className="mt-0.5 rounded bg-[#0E1119] border-slate-700 text-[#E63946] cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-slate-400 cursor-pointer">
              ฉันยอมรับข้อตกลงและเงื่อนไขการเป็นสมาชิก MOTIX Club และยินยอมรับสิทธิประโยชน์ข่าวสารโปรโมชั่น
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full shadow-lg shadow-red-950/50 cursor-pointer"
          >
            {isSubmitting ? 'กำลังสร้างบัญชีสมาชิก...' : 'สมัครสมาชิกและรับโบนัส 100 แต้มทันที'}
          </Button>
        </form>

        {/* Demo Notice for Course Submission */}
        <div className="text-center pt-2">
          <span className="text-[10px] text-slate-500 bg-[#0E1119] px-2.5 py-1 rounded-full border border-slate-800">
            💡 ระบบสมัครสมาชิกจำลองบันทึกข้อมูลลงใน LocalStorage อัตโนมัติ (ไม่ต้องใช้ Database ภายนอก)
          </span>
        </div>

        {/* Login Link */}
        <div className="pt-4 border-t border-[#1C2230] text-center text-xs text-slate-400">
          มีบัญชีสมาชิกอยู่แล้ว?{' '}
          <Link 
            to={isFromCheckout ? `/login?redirect=${encodeURIComponent(redirectTarget)}` : '/login'} 
            className="text-[#FF6B6B] hover:underline font-bold"
          >
            เข้าสู่ระบบที่นี่
          </Link>
        </div>

      </div>
    </div>
  );
};

