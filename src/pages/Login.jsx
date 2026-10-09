import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Zap,
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  UserCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Car,
  Bike,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect') || '/';
  const isFromCheckout = redirectTarget.includes('checkout');

  const { loginUser, registeredUsers } = useCart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('กรุณากรอกอีเมล');
      return;
    }

    if (!password) {
      setErrorMessage('กรุณากรอกรหัสผ่าน');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginUser({ email, password });
      setIsLoading(false);

      if (res && res.success) {
        navigate(redirectTarget);
      } else {
        setErrorMessage(res?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (targetEmail, targetPassword) => {
    setEmail(targetEmail);
    setPassword(targetPassword);
    setErrorMessage('');
    const res = loginUser({ email: targetEmail, password: targetPassword });
    if (res && res.success) {
      navigate(redirectTarget);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#121622] border border-[#262F42] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Checkout Alert Banner if redirected from checkout */}
        {isFromCheckout && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/70 to-[#1C1318] border border-[#E63946]/50 space-y-1 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF8A8A]">
              <ShoppingBag className="w-4 h-4 text-[#E63946]" />
              <span>กรุณาเข้าสู่ระบบก่อนสั่งซื้อสินค้า</span>
            </div>
            <p className="text-[11px] text-slate-300">
              MOTIX กำหนดให้สมาชิกสั่งซื้อเพื่อผูกประกันอะไหล่แท้, สะสมแต้ม, และรับอีเมลยืนยันคำสั่งซื้อ
            </p>
          </div>
        )}

        {/* Logo & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E63946] to-[#9A031E] text-white shadow-lg mb-1">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white font-heading">
            เข้าสู่ระบบ MOTIX Club
          </h1>
          <p className="text-xs text-slate-400">
            {isFromCheckout 
              ? 'เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อต่อทันที' 
              : 'ยินดีต้อนรับกลับสู่ศูนย์รวมอะไหล่ยานยนต์คุณภาพ'}
          </p>
        </div>

        {/* Demo / Quick Select Accounts */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>บัญชีในระบบที่พร้อมเข้าใช้งาน ({registeredUsers?.length || 2} บัญชี)</span>
            </span>
            <span className="text-[10px] text-amber-400/80">คลิกเพื่อกรอกอัตโนมัติ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-0.5">
            {(registeredUsers || []).slice(0, 4).map((u) => (
              <button
                key={u.id || u.email}
                type="button"
                onClick={() => handleQuickDemoLogin(u.email, u.password || 'password123')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1 text-[11px] font-bold text-white group-hover:text-amber-300">
                  {u.vehicleType === 'motorcycle' || u.vehicleType === 'bike' ? (
                    <Bike className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  ) : (
                    <Car className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  )}
                  <span className="truncate">{u.name}</span>
                </div>
                <span className="text-[9px] text-slate-400 block truncate font-mono">
                  {u.email}
                </span>
              </button>
            ))}
          </div>
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
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">อีเมลผู้ใช้งาน</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold">รหัสผ่าน</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] transition-colors"
                placeholder="••••••••"
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

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-[#0E1119] border-slate-700 text-[#E63946] cursor-pointer" />
              <span>จดจำการเข้าสู่ระบบ</span>
            </label>
            <button
              type="button"
              onClick={() => setErrorMessage('💡 เพื่อความสะดวกในการทดสอบ สามารถกดปุ่มบัญชีทดสอบ Demo ด้านบน หรือสมัครสมาชิกใหม่ได้ทันที')}
              className="text-[#FF6B6B] hover:underline cursor-pointer"
            >
              ลืมรหัสผ่าน?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            icon={LogIn}
            className="w-full shadow-lg shadow-red-950/50 cursor-pointer"
          >
            {isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="pt-4 border-t border-[#1C2230] text-center text-xs text-slate-400">
          ยังไม่มีบัญชีสมาชิก?{' '}
          <Link 
            to={isFromCheckout ? `/register?redirect=${encodeURIComponent(redirectTarget)}` : '/register'} 
            className="text-[#FF6B6B] hover:underline font-bold"
          >
            สมัครสมาชิกใหม่ รับ 100 แต้มฟรี
          </Link>
        </div>

      </div>
    </div>
  );
};

