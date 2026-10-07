import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Tag,
  Truck,
  Gift,
  Zap,
  Star,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  Mail,
  Eye,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmailPreviewModal } from '../common/EmailPreviewModal';

export const MemberExclusive = () => {
  const { user } = useCart();
  const [showEmailModal, setShowEmailModal] = useState(false);

  const benefits = [
    {
      icon: Tag,
      title: 'คูปองส่วนลดพิเศษ',
      desc: 'รับโค้ดลดเพิ่มสูงสุด 15% ทุกเดือน',
      tag: 'ลดเพิ่ม',
    },
    {
      icon: Truck,
      title: 'โปรโมชั่นค่าจัดส่ง',
      desc: 'ฟรีค่าส่งเมื่อช้อปครบ 990.-',
      tag: 'ส่งฟรี',
    },
    {
      icon: Gift,
      title: 'ของแถมพรีเมียม',
      desc: 'เมื่อซื้อสินค้าที่ร่วมรายการ',
      tag: 'รับฟรี',
    },
    {
      icon: Zap,
      title: 'Early Access',
      desc: 'เห็นโปรโมชั่นและสินค้าใหม่ก่อนใคร',
      tag: 'ก่อนใคร',
    },
    {
      icon: Star,
      title: 'คะแนนสะสม',
      desc: 'สะสมแต้มทุกออเดอร์ แลกส่วนลดเงินสด',
      tag: 'แต้ม x2',
    },
  ];

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 bg-gradient-to-b from-[#0A0C10] via-[#140F11] to-[#0A0C10] border-y border-red-950/40">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(230,57,70,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Card inspired by MOTIX Member Reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171114] via-[#141219] to-[#171114] border border-red-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8">
          {/* Subtle diagonal racing glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[#FF6B6B] text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-[#E63946]" />
                <span>MEMBER EXCLUSIVE</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                สิทธิพิเศษเฉพาะสมาชิก <span className="text-[#FF6B6B]">MOTIX</span> เท่านั้น
              </h2>

              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                สมัครสมาชิกวันนี้ รับสิทธิพิเศษมากมายเพื่อการเดินทางที่คุ้มค่ากว่าเดิม ทั้งส่วนลด ของแถม และบริการเช็กระยะฟรี
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/promotions"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white font-bold text-sm shadow-lg shadow-red-950/50 transition-all hover:scale-105 active:scale-95"
                >
                  <span>ดูสิทธิพิเศษทั้งหมด</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {!user && (
                  <Link
                    to="/member-dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1822] hover:bg-[#262030] text-slate-200 border border-red-500/30 font-semibold text-sm transition-all"
                  >
                    <span>สมัครสมาชิกฟรี</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-[#FF6B6B] border border-red-500/40 font-bold text-xs transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#FF5722]" />
                  <span>ดูตัวอย่างอีเมลต้อนรับสมาชิก</span>
                </button>
              </div>
            </div>

            {/* Quick Stats or Status Pill */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0F0D14]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-red-500/20 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-[#FF6B6B] shrink-0 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs text-slate-400">ระดับสิทธิ์ปัจจุบัน</div>
                <div className="text-base font-bold text-white">
                  {user ? (user.tier || 'Gold Member') : 'บุคคลทั่วไป (ยังไม่เข้าสู่ระบบ)'}
                </div>
                <div className="text-xs text-amber-400 font-medium">
                  {user ? `สะสม ${user.points || 250} พอยท์พร้อมใช้` : 'สมัครทันทีรับฟรี 100 พอยท์'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Member Benefit Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-4 sm:p-5 rounded-2xl bg-[#12141F] border border-[#222A3B] hover:border-red-500/40 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-[#FF6B6B] mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.desc}
                </p>
                <span className="mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-[#FF6B6B] border border-red-500/20">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      <EmailPreviewModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        initialType="register"
        prefillEmail={user?.email || 'customer@example.com'}
      />
    </section>
  );
};
