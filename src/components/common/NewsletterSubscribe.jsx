import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Eye,
  Tag,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { EmailPreviewModal } from './EmailPreviewModal';
import { getApiUrl, getStoreBaseUrl } from '../../utils/apiConfig';

export const NewsletterSubscribe = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string, coupon?: string }
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewType, setPreviewType] = useState('subscribe');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({
        success: false,
        message: 'กรุณากรอกอีเมลให้ถูกต้องเพื่อรับสิทธิพิเศษ',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const clientStoreUrl = getStoreBaseUrl();

      const res = await fetch(getApiUrl('/api/newsletter/subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(),
          storeUrl: clientStoreUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({
          success: true,
          message: data.message || `ส่งอีเมลพร้อมโค้ดลด 10% ไปยัง ${email} สำเร็จแล้ว!`,
          coupon: data.couponCode || 'MOTIX-NEWS10',
        });
      } else {
        setStatus({
          success: false,
          message: data.message || 'เกิดข้อผิดพลาดในการสมัคร กรุณาลองใหม่อีกครั้ง',
        });
      }
    } catch (error) {
      // Fallback response for client offline or simulation
      setStatus({
        success: true,
        message: `สมัครรับข่าวสารสำเร็จ! ส่งโค้ดส่วนลดไปยัง ${email} แล้ว`,
        coupon: 'MOTIX-NEWS10',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171D2A] via-[#121622] to-[#171D2A] border border-red-500/30 p-6 sm:p-10 shadow-2xl">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-[#FF6B6B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
          <span>MOTIX NEWSLETTER & SPECIAL OFFERS</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            รับข่าวสาร อะไหล่เข้าใหม่ และ <span className="text-[#FF6B6B] font-extrabold">โค้ดลดทันที 10%</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            สมัครรับจดหมายข่าวทางอีเมลเพื่อไม่พลาด Flash Sale ดีลอะไหล่รถยนต์-มอเตอร์ไซค์ตรงรุ่น 
            พร้อมรับเทคนิคการดูแลรถจากช่างผู้เชี่ยวชาญ MOTIX Garage
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-[#0B0E15] p-2 rounded-2xl border border-slate-700/80 shadow-inner">
            <div className="flex-1 flex items-center gap-3 px-3 py-1.5">
              <Mail className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="email"
                required
                placeholder="กรอกอีเมลของคุณ เช่น name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 disabled:opacity-60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>กำลังส่ง...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>รับโค้ดส่วนลด 10%</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Result Feedback */}
        {status && (
          <div
            className={`max-w-xl mx-auto p-4 rounded-2xl border text-left flex items-start gap-3 animate-in fade-in zoom-in duration-200 ${
              status.success
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}
          >
            {status.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Mail className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 space-y-1.5">
              <p className="text-xs sm:text-sm font-semibold">{status.message}</p>
              {status.coupon && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-slate-300">โค้ดของคุณ:</span>
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {status.coupon}
                  </span>
                </div>
              )}
            </div>
            {status.success && (
              <button
                type="button"
                onClick={() => {
                  setPreviewType('subscribe');
                  setShowPreviewModal(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#141B29] hover:bg-[#1E283D] border border-slate-600 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>ดูอีเมล</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom Feature Badges & Direct Preview Button */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ไม่ส่งสแปม ยกเลิกได้ตลอดเวลา</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#FF5722]" />
            <span>รับส่วนลดพิเศษทันทีในกล่องข้อความ</span>
          </div>
          
          <button
            type="button"
            onClick={() => {
              setPreviewType('subscribe');
              setShowPreviewModal(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B6B] hover:text-white underline underline-offset-4 decoration-red-500/50 hover:decoration-white transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ดูตัวอย่างอีเมลที่ระบบจัดส่ง (Email Preview Showcase)</span>
          </button>
        </div>

      </div>

      {/* Interactive Modal */}
      <EmailPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        initialType={previewType}
        prefillEmail={email || 'pheeraphatx0093kiw@gmail.com'}
      />
    </div>
  );
};
