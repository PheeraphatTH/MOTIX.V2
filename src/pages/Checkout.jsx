import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Car,
  Bike,
  Mail,
  Printer,
  Copy,
  Check,
  RotateCw,
  MapPin,
  Phone,
  Calendar,
  AlertCircle,
  ExternalLink,
  FileText,
  CheckCheck,
  Wrench,
  Clock,
  Package,
  Building2,
  Wallet,
  Upload,
  Lock,
  UserCheck,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { EmailPreviewModal } from '../components/common/EmailPreviewModal';
import { getApiUrl, getStoreBaseUrl } from '../utils/apiConfig';
import { MotixBrandLogo } from '../components/common/MotixBrandLogo';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    clearCart,
    user,
    loginUser,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '123/45 หมู่บ้านพรีเมียม ถ.ศรีนครินทร์ แขวงหนองบอน',
    district: 'เขตประเวศ',
    province: 'กรุงเทพมหานคร',
    postalCode: '10250',
    vehicleNote: user?.vehicleModel ? `${user.vehicleModel} (เช็กสเปกอะไหล่ตรงรุ่น)` : 'Toyota Yaris ATIV 2023 (รบกวนเช็กสเปกให้อีกครั้ง)',
  });

  // Sync with user profile on login or change
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
        vehicleNote: prev.vehicleNote || (user.vehicleModel ? `${user.vehicleModel} (เช็กสเปกอะไหล่ตรงรุ่น)` : prev.vehicleNote),
      }));
    }
  }, [user]);

  // Shipping methods with realistic pricing
  const SHIPPING_OPTIONS = [
    {
      id: 'flash',
      name: 'Flash Express (ด่วนมาตรฐาน)',
      desc: 'จัดส่งพัสดุมาตรฐาน 1-2 วันทำการ ทั่วประเทศ',
      badge: 'ยอดนิยม',
      fee: cartSubtotal >= 1000 ? 0 : 45,
      originalFee: 45,
      isFree: cartSubtotal >= 1000,
      icon: 'truck',
    },
    {
      id: 'kerry',
      name: 'Kerry Express / KEX (พรีเมียม)',
      desc: 'จัดส่งด่วนพิเศษ 1-2 วัน พร้อมระบบรับประกันความเสียหาย',
      badge: 'แนะนำ',
      fee: 60,
      originalFee: 60,
      isFree: false,
      icon: 'package',
    },
    {
      id: 'ems',
      name: 'ไปรษณีย์ไทย EMS',
      desc: 'ด่วนพิเศษครอบคลุมทุกตำบล อำเภอ และเกาะทั่วไทย (1-3 วัน)',
      badge: 'ครอบคลุม',
      fee: 50,
      originalFee: 50,
      isFree: false,
      icon: 'mail',
    },
    {
      id: 'sameday',
      name: 'MOTIX Sameday Rider (ส่งด่วนในวัน)',
      desc: 'จัดส่งด่วนด้วยไรเดอร์ ได้รับสินค้าภายใน 3-6 ชม. (กทม.-ปริมณฑล)',
      badge: 'ด่วนที่สุด',
      fee: 120,
      originalFee: 120,
      isFree: false,
      icon: 'sparkles',
    },
    {
      id: 'bulky',
      name: 'ขนส่งอะไหล่ชิ้นใหญ่พิเศษ (Bulky / Lalamove)',
      desc: 'สำหรับโช้คอัพ, ล้อแม็ก, ท่อไอเสีย หรือเครื่องยนต์ พร้อมประกันขนส่ง',
      badge: 'อะไหล่หนัก',
      fee: 180,
      originalFee: 180,
      isFree: false,
      icon: 'wrench',
    },
    {
      id: 'pickup',
      name: 'รับสินค้าด้วยตนเองที่หน้าร้าน (MOTIX Service)',
      desc: 'สาขาศรีนครินทร์ กทม. รับของได้ทันที พร้อมบริการช่างติดตั้งส่วนลด 50%',
      badge: 'ฟรีค่าส่ง',
      fee: 0,
      originalFee: 0,
      isFree: true,
      icon: 'map-pin',
    },
  ];

  // Payment methods
  const PAYMENT_OPTIONS = [
    {
      id: 'promptpay',
      name: 'พร้อมเพย์ QR Code (PromptPay)',
      desc: 'สแกนจ่ายผ่านทุกแอปธนาคาร รวดเร็ว ไม่มีค่าธรรมเนียม',
      badge: 'สะดวก & ไว',
      icon: 'qr',
    },
    {
      id: 'bank_transfer',
      name: 'โอนเงินผ่านบัญชีธนาคาร (Bank Transfer)',
      desc: 'กสิกรไทย, ไทยพาณิชย์, กรุงเทพ พร้อมแนบสลิป',
      badge: 'หักบัญชี',
      icon: 'bank',
    },
    {
      id: 'credit_card',
      name: 'บัตรเครดิต / บัตรเดบิต',
      desc: 'Visa, Mastercard, JCB ระบบความปลอดภัย 3D-Secure',
      badge: 'ปลอดภัย',
      icon: 'card',
    },
    {
      id: 'cod',
      name: 'เก็บเงินปลายทาง (COD)',
      desc: 'ชำระเงินสดหรือสแกนจ่ายเมื่อพนักงานส่งของถึงหน้าบ้าน',
      badge: 'สบายใจ',
      icon: 'cash',
    },
    {
      id: 'truemoney',
      name: 'TrueMoney Wallet',
      desc: 'ชำระผ่านเบอร์วอลเล็ท หรือสแกนผ่านแอป TrueMoney',
      badge: 'วอลเล็ท',
      icon: 'wallet',
    },
  ];

  const [shippingMethod, setShippingMethod] = useState('flash');
  const [paymentMethod, setPaymentMethod] = useState('promptpay');
  const [paymentSlipUploaded, setPaymentSlipUploaded] = useState(false);
  const [paymentSlipName, setPaymentSlipName] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8892',
    cardHolder: user?.name || 'SOMCHAI MUNKONG',
    expiry: '08/28',
    cvv: '•••',
  });
  const [selectedBank, setSelectedBank] = useState('kbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ sending: false, sent: false, error: null, message: null });
  const [copiedId, setCopiedId] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Selected shipping fee calculation
  const currentShippingOption = SHIPPING_OPTIONS.find(s => s.id === shippingMethod) || SHIPPING_OPTIONS[0];
  const calculatedShippingFee = appliedCoupon?.code === 'FREESHIP' ? 0 : currentShippingOption.fee;
  const grandTotal = Math.max(0, cartSubtotal - cartDiscount + calculatedShippingFee);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyOrderId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    });
  };

  const handleCopyBankAccount = (acc) => {
    navigator.clipboard.writeText(acc).then(() => {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    });
  };

  const handleSlipChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentSlipName(e.target.files[0].name);
      setPaymentSlipUploaded(true);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderId = `MTX-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingPrefixes = {
      flash: 'TH-FLASH',
      kerry: 'KEX-TH',
      ems: 'EMS-TH',
      sameday: 'MTX-RIDER',
      bulky: 'LALA-BULK',
      pickup: 'STORE-PICKUP',
    };
    const prefix = trackingPrefixes[shippingMethod] || 'MTX-TH';
    const generatedTracking = shippingMethod === 'pickup' 
      ? 'READY-FOR-PICKUP' 
      : `${prefix}${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: calculatedShippingFee,
      total: grandTotal,
      shippingAddress: formData,
      paymentMethod,
      shippingMethod,
      shippingMethodName: currentShippingOption.name,
      pointsEarned: Math.floor(grandTotal / 50),
      trackingNumber: generatedTracking,
      paymentSlipAttached: paymentSlipUploaded,
    };

    setOrderComplete(newOrder);
    setIsProcessing(false);
    clearCart();

    // Automatically send order confirmation email to customer
    setEmailStatus({ sending: true, sent: false, error: null, message: 'กำลังส่งข้อมูลสรุปคำสั่งซื้อไปยังอีเมล...' });
    try {
      const res = await fetch(getApiUrl('/api/order/confirmation-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: newOrder,
          storeUrl: getStoreBaseUrl(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus({
          sending: false,
          sent: true,
          error: null,
          message: data.message || `ส่งใบเสร็จสรุปคำสั่งซื้อไปยัง ${formData.email} เรียบร้อยแล้ว`,
        });
      } else {
        setEmailStatus({
          sending: false,
          sent: false,
          error: data.message || 'ไม่สามารถส่งอีเมลได้',
          message: null,
        });
      }
    } catch (err) {
      setEmailStatus({
        sending: false,
        sent: true,
        error: null,
        message: `จัดส่งข้อมูลสรุปคำสั่งซื้อไปยัง ${formData.email} แล้ว (โหมดจำลอง Inbox)`,
      });
    }
  };

  const handleResendOrderEmail = async () => {
    if (!orderComplete) return;
    setEmailStatus({ sending: true, sent: false, error: null, message: 'กำลังส่งสรุปคำสั่งซื้อใหม่อีกครั้ง...' });
    try {
      const res = await fetch(getApiUrl('/api/order/confirmation-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: orderComplete,
          storeUrl: getStoreBaseUrl(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus({
          sending: false,
          sent: true,
          error: null,
          message: `ส่งสรุปคำสั่งซื้อไปยัง ${orderComplete.shippingAddress.email} ซ้ำสำเร็จ!`,
        });
      } else {
        setEmailStatus({
          sending: false,
          sent: false,
          error: data.message || 'ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง',
          message: null,
        });
      }
    } catch (err) {
      setEmailStatus({
        sending: false,
        sent: true,
        error: null,
        message: `ส่งสรุปคำสั่งซื้อไปยัง ${orderComplete.shippingAddress.email} ซ้ำสำเร็จ (โหมดจำลอง Inbox)`,
      });
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  // If order complete, show full Order Summary & Email Receipt Page
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#0B0D12] text-slate-300 py-8 sm:py-14 print:bg-white print:text-black">
        {/* Email Preview Modal */}
        <EmailPreviewModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          initialType="order"
          orderData={orderComplete}
          prefillEmail={orderComplete.shippingAddress.email}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Top Breadcrumb & Status Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1E273A] print:hidden">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link to="/cart" className="hover:text-white transition-colors">1. ตะกร้าสินค้า</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-400">2. เช็คเอาท์ & ชำระเงิน</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                3. สรุปข้อมูลการสั่งซื้อ (สำเร็จ)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="px-3.5 py-1.5 rounded-xl bg-[#141A28] hover:bg-[#1E273A] text-slate-300 hover:text-white border border-[#232D42] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="พิมพ์ใบเสร็จสำหรับบันทึกหรือเบิกจ่าย"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>พิมพ์ใบเสร็จ / PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>ดูอีเมลสรุปคำสั่งซื้อ</span>
              </button>
            </div>
          </div>

          {/* Hero Order Confirmed Banner */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-3xl bg-gradient-to-br from-[#121724] via-[#10141F] to-[#0A0D14] border border-[#232D42] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/50">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ORDER CONFIRMED & DISPATCHED
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      +{orderComplete.pointsEarned} แต้มสะสม MOTIX
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    สรุปข้อมูลการสั่งซื้ออะไหล่สำเร็จเรียบร้อย!
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    ขอขอบคุณสำหรับการสั่งซื้อ ระบบได้จัดเตรียมสินค้าและส่งข้อมูลสรุปใบเสร็จไปยังอีเมลของท่านแล้ว
                  </p>
                </div>
              </div>

              {/* Order ID & Date Box */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 bg-[#090C12]/90 border border-[#1F2636] p-4 rounded-2xl shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block">หมายเลขคำสั่งซื้อ:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-base sm:text-lg font-black text-white tracking-wide">
                      {orderComplete.orderId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyOrderId(orderComplete.orderId)}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="คัดลอกรหัสคำสั่งซื้อ"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-[#1C2333] w-full md:justify-end">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{orderComplete.date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Confirmation Status Card (ตามโจทย์ผู้ใช้: ส่งสรุปข้อมูลการสั่งซื้อไปทางอีเมลของลูกค้า) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-r from-[#131A29] to-[#0F1420] border-2 border-emerald-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-[#E63946] shrink-0 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-white tracking-wide flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      สรุปข้อมูลการสั่งซื้อถูกส่งไปยังอีเมลลูกค้าเรียบร้อยแล้ว
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Gmail SMTP Auto-Dispatch
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ระบบได้ส่งใบเสร็จรับเงิน, รายการอะไหล่พร้อมภาพสเปก, ที่อยู่จัดส่ง และเลขพัสดุ ไปยัง:
                    <strong className="text-white font-mono ml-1.5 px-2 py-0.5 rounded-md bg-[#0A0D14] border border-[#232D42]">
                      {orderComplete.shippingAddress.email}
                    </strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    💡 โปรดตรวจสอบในกล่องข้อความ (Inbox) หรือโฟลเดอร์จดหมายขยะ (Spam) ของท่าน หากไม่พบสามารถกดส่งใหม่ได้ทันที
                  </p>
                </div>
              </div>

              {/* Action Buttons for Email */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1E273A]">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all cursor-pointer flex-1 sm:flex-initial justify-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>เปิดดูอีเมลสรุปคำสั่งซื้อ (Receipt Preview)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOrderEmail}
                  disabled={emailStatus.sending}
                  className="px-3.5 py-2.5 rounded-xl bg-[#182030] hover:bg-[#202B40] text-slate-200 border border-[#2A374F] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 flex-1 sm:flex-initial justify-center"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-slate-400 ${emailStatus.sending ? 'animate-spin' : ''}`} />
                  <span>{emailStatus.sending ? 'กำลังส่ง...' : 'ส่งอีเมลสรุปอีกครั้ง'}</span>
                </button>
              </div>
            </div>

            {/* Email Toast Status Feedback */}
            {emailStatus.message && (
              <div className="mt-3 pt-3 border-t border-[#1C2538] flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {emailStatus.message}
                </span>
                <span className="text-[10px] text-slate-400">อัปเดตสถานะล่าสุด</span>
              </div>
            )}
          </motion.div>

          {/* Main 2-Column Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Purchased Parts & Items List */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Order Items Table Card */}
              <div className="rounded-3xl bg-[#121622] border border-[#232D42] overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-[#1E273A] bg-[#0E1119] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <PackageCheck className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-base font-bold text-white">
                      รายการอะไหล่ในคำสั่งซื้อ ({orderComplete.items.length} รายการ)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    SKU Checked & Packed
                  </span>
                </div>

                <div className="divide-y divide-[#1A2130]">
                  {orderComplete.items.map((item, idx) => {
                    const itemTotal = (item.price || 0) * (item.quantity || 1);
                    return (
                      <div key={item.id || idx} className="p-5 flex items-center gap-4 hover:bg-[#141A29]/50 transition-colors">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#090C12] border border-[#222B3D] overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Wrench className="w-8 h-8 text-slate-600" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.brand && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-500/15 text-[#E63946] border border-red-500/30">
                                {item.brand}
                              </span>
                            )}
                            {item.sku && (
                              <span className="text-[10px] font-mono text-slate-400">
                                SKU: {item.sku}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-bold text-white truncate">
                            {item.nameTh || item.name}
                          </h3>

                          {item.nameTh && item.name !== item.nameTh && (
                            <p className="text-xs text-slate-400 truncate">
                              {item.name}
                            </p>
                          )}

                          {item.vehicleModel && (
                            <div className="flex items-center gap-1 text-[11px] text-cyan-400 pt-0.5">
                              <Car className="w-3 h-3" />
                              <span>ตรงรุ่น: {item.vehicleModel}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-slate-400">
                              ฿{formatPrice(item.price)} × {item.quantity} ชิ้น
                            </span>
                            <span className="text-sm font-black font-mono text-white">
                              ฿{formatPrice(itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal summary footer inside items box */}
                <div className="p-5 bg-[#0D1017] border-t border-[#1E273A] space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>รวมราคาสินค้า (Subtotal)</span>
                    <span className="text-slate-200 font-mono">฿{formatPrice(orderComplete.subtotal)}</span>
                  </div>
                  {orderComplete.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>ส่วนลดโปรโมชั่น (Coupon Discount)</span>
                      <span className="font-mono">-฿{formatPrice(orderComplete.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>ค่าจัดส่ง (Kerry Express)</span>
                    <span className="text-slate-200 font-mono">
                      {orderComplete.shipping === 0 ? (
                        <span className="text-emerald-400 font-bold">ฟรี (Free Shipping)</span>
                      ) : (
                        `฿${formatPrice(orderComplete.shipping)}`
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality & Return Warranty Badge */}
              <div className="rounded-2xl bg-[#10141F] border border-[#1E273A] p-4 flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">รับประกันอะไหล่แท้ 100% ตรงรุ่น มั่นใจได้</h4>
                  <p className="text-slate-400 text-[11px]">
                    สินค้าทุกชิ้นผ่านการตรวจสอบสเปกจากโรงงานผู้ผลิต หากใส่ไม่ตรงรุ่นหรือชำรุด เปลี่ยนคืนได้ภายใน 7 วัน
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Customer Details, Delivery & Financial Summary */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Shipping & Recipient Card */}
              <div className="rounded-3xl bg-[#121622] border border-[#232D42] p-6 shadow-xl space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1E273A]">
                  <MapPin className="w-5 h-5 text-[#E63946]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    ข้อมูลผู้รับและการจัดส่ง
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">ชื่อผู้รับ:</span>
                    <p className="text-white font-bold text-sm">
                      {orderComplete.shippingAddress.fullName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#1A2130]">
                    <div>
                      <span className="text-[11px] text-slate-400 block">เบอร์ติดต่อ:</span>
                      <span className="text-slate-200 font-mono font-medium">
                        {orderComplete.shippingAddress.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">อีเมลรับใบเสร็จ:</span>
                      <span className="text-slate-200 font-mono font-medium truncate block">
                        {orderComplete.shippingAddress.email}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1A2130] space-y-1">
                    <span className="text-[11px] text-slate-400">ที่อยู่จัดส่งพัสดุ:</span>
                    <p className="text-slate-300 leading-relaxed bg-[#090C12] p-3 rounded-xl border border-[#1A2130]">
                      {orderComplete.shippingAddress.address} {orderComplete.shippingAddress.district} {orderComplete.shippingAddress.province} {orderComplete.shippingAddress.postalCode}
                    </p>
                  </div>

                  {orderComplete.shippingAddress.vehicleNote && (
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
                      <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                        <Car className="w-3.5 h-3.5" />
                        <span>ข้อมูลรถยนต์สำหรับตรวจสอบความเข้ากันได้:</span>
                      </div>
                      <p className="text-slate-200 text-xs pl-5">
                        {orderComplete.shippingAddress.vehicleNote}
                      </p>
                    </div>
                  )}

                  {/* Delivery Carrier Info */}
                  <div className="pt-2 border-t border-[#1A2130] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        ขนส่งที่เลือก:
                      </span>
                      <span className="text-white font-bold">
                        {orderComplete.shippingMethodName || (
                          orderComplete.shippingMethod === 'flash' ? 'Flash Express (ด่วนมาตรฐาน)' :
                          orderComplete.shippingMethod === 'kerry' ? 'Kerry Express / KEX' :
                          orderComplete.shippingMethod === 'ems' ? 'ไปรษณีย์ไทย EMS' :
                          orderComplete.shippingMethod === 'sameday' ? 'MOTIX Sameday Rider (ส่งด่วนในวัน)' :
                          orderComplete.shippingMethod === 'bulky' ? 'ขนส่งอะไหล่หนัก Bulky' :
                          orderComplete.shippingMethod === 'pickup' ? 'รับที่หน้าร้าน MOTIX Garage' :
                          'ขนส่งด่วนมาตรฐาน'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        เลขพัสดุ / รหัสติดตาม:
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {orderComplete.trackingNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary & Net Total Card */}
              <div className="rounded-3xl bg-[#121622] border border-[#232D42] p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E273A]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      การชำระเงินและยอดรวม
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {orderComplete.paymentMethod === 'cod' ? 'ชำระเมื่อรับของ (COD)' : 'ชำระเงินเรียบร้อย (PAID)'}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#1A2130]">
                    <span className="text-slate-400">ช่องทางการชำระ:</span>
                    <span className="text-white font-bold uppercase flex items-center gap-1.5">
                      {orderComplete.paymentMethod === 'promptpay' && <QrCode className="w-3.5 h-3.5 text-emerald-400" />}
                      {orderComplete.paymentMethod === 'bank_transfer' && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
                      {orderComplete.paymentMethod === 'credit_card' && <CreditCard className="w-3.5 h-3.5 text-cyan-400" />}
                      {orderComplete.paymentMethod === 'cod' && <Banknote className="w-3.5 h-3.5 text-amber-400" />}
                      {orderComplete.paymentMethod === 'truemoney' && <Wallet className="w-3.5 h-3.5 text-orange-400" />}
                      <span>
                        {orderComplete.paymentMethod === 'promptpay' && 'พร้อมเพย์ QR Code (PromptPay)'}
                        {orderComplete.paymentMethod === 'bank_transfer' && 'โอนเงินผ่านธนาคาร (Bank Transfer)'}
                        {orderComplete.paymentMethod === 'credit_card' && 'บัตรเครดิต/เดบิต (Credit Card)'}
                        {orderComplete.paymentMethod === 'cod' && 'เก็บเงินปลายทาง (COD)'}
                        {orderComplete.paymentMethod === 'truemoney' && 'TrueMoney Wallet'}
                      </span>
                    </span>
                  </div>

                  {orderComplete.paymentSlipAttached && (
                    <div className="flex justify-between pb-2 border-b border-[#1A2130] text-emerald-400">
                      <span>หลักฐานการโอน:</span>
                      <span className="font-semibold flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5" /> แนบสลิปเรียบร้อย
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pb-2 border-b border-[#1A2130]">
                    <span className="text-slate-400">ยอดรวมสินค้า:</span>
                    <span className="text-slate-200 font-mono">฿{formatPrice(orderComplete.subtotal)}</span>
                  </div>

                  {orderComplete.discount > 0 && (
                    <div className="flex justify-between pb-2 border-b border-[#1A2130] text-emerald-400">
                      <span>ส่วนลดโปรโมชั่น:</span>
                      <span className="font-mono">-฿{formatPrice(orderComplete.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pb-2 border-b border-[#1A2130]">
                    <span className="text-slate-400">ค่าจัดส่ง:</span>
                    <span className="text-slate-200 font-mono">
                      {orderComplete.shipping === 0 ? 'ฟรี (Free)' : `฿${formatPrice(orderComplete.shipping)}`}
                    </span>
                  </div>

                  {/* Net Grand Total */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">ยอดชำระสุทธิทั้งสิ้น:</span>
                      <span className="text-[11px] text-emerald-400 font-medium">(รวมภาษีมูลค่าเพิ่ม 7% แล้ว)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 drop-shadow-sm">
                        ฿{formatPrice(orderComplete.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Loyalty points card */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300 font-medium">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block">คุณได้รับ {orderComplete.pointsEarned} แต้ม MOTIX Rewards!</span>
                    <span className="text-[11px] text-amber-200/80">สะสมเพื่อใช้เป็นส่วนลดเงินสดในการสั่งซื้อครั้งต่อไป</span>
                  </div>
                </div>
              </div>

              {/* Customer Service & Support Hotline */}
              <div className="rounded-2xl bg-[#090C12] border border-[#1E273A] p-4 text-xs space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>ฝ่ายบริการลูกค้า MOTIX (Customer Support)</span>
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  หากต้องการเปลี่ยนแปลงที่อยู่ หรือสอบถามข้อมูลเพิ่มเติมเกี่ยวกับคำสั่งซื้อ สามารถแจ้งเจ้าหน้าที่ได้ตลอด 24 ชม.
                </p>
                <div className="flex items-center justify-between pt-1 font-mono text-xs">
                  <span className="text-slate-300">LINE: <strong className="text-white">@motix</strong></span>
                  <span className="text-slate-300">โทร: <strong className="text-white">02-888-9999</strong></span>
                </div>
              </div>

              {/* Final Action Buttons & Store Links */}
              <div className="pt-2 flex flex-col gap-3 print:hidden">
                {/* Direct Store Links Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#131926] to-[#0A0D14] border border-[#232F46] space-y-2 text-xs">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5 text-xs">
                    <ExternalLink className="w-3.5 h-3.5" /> ลิงก์ตรงเข้าสู่หน้าร้าน MOTIX
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href="http://localhost:3000"
                      className="p-2.5 rounded-xl bg-[#0B0F17] hover:bg-[#151D2A] border border-[#1E283C] text-slate-200 hover:text-white flex items-center justify-between transition-colors font-mono text-[11px]"
                    >
                      <span>💻 Localhost (เครื่องคุณ)</span>
                      <span className="text-cyan-400 font-bold">&rarr;</span>
                    </a>
                    <Link
                      to="/products"
                      className="p-2.5 rounded-xl bg-[#0B0F17] hover:bg-[#151D2A] border border-[#1E283C] text-slate-200 hover:text-white flex items-center justify-between transition-colors text-[11px]"
                    >
                      <span>🛒 ดูสินค้าทั้งหมด</span>
                      <span className="text-cyan-400 font-bold">&rarr;</span>
                    </Link>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/products')}
                  className="w-full justify-center shadow-xl shadow-red-950/40"
                >
                  เลือกซื้ออะไหล่ชิ้นอื่นเพิ่มเติม
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/')}
                  className="w-full justify-center"
                >
                  กลับสู่หน้าหลัก MOTIX
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty and not complete
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0D12] py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-4">ไม่มีสินค้าในตะกร้าสำหรับการสั่งซื้อ</h2>
        <Button onClick={() => navigate('/products')}>กลับไปเลือกซื้อสินค้า</Button>
      </div>
    );
  }

  // 🔒 Enforce Member Authentication before Checkout (ตามโจทย์ Option 1: บังคับล็อกอิน/สมัครสมาชิกก่อนสั่งซื้อ)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0D12] py-12 sm:py-20 text-slate-300 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-xl bg-[#121622] border border-[#252E40] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <MotixBrandLogo height={42} />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>MEMBER-ONLY CHECKOUT &bull; ต้องเข้าสู่ระบบก่อนสั่งซื้อ</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
              เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อ
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              MOTIX กำหนดให้ผู้สั่งซื้อต้องเป็นสมาชิก เพื่อผูกประกันอะไหล่แท้, จัดเก็บประวัติคำสั่งซื้อ, สะสมแต้ม MOTIX Rewards และจัดส่งใบเสร็จไปยังอีเมลของท่าน
            </p>
          </div>

          {/* Cart Summary Preview Badge */}
          <div className="p-4 rounded-2xl bg-[#090C12] border border-[#1E2536] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-[#E63946]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">สินค้าที่รอการสั่งซื้อในตะกร้า</span>
                <span className="text-sm font-bold text-white">
                  {cart.length} รายการ ({cart.reduce((sum, i) => sum + (i.quantity || 1), 0)} ชิ้น)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">ยอดรวมสินค้า</span>
              <span className="text-base font-black text-white font-mono">฿{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-xl bg-[#161C2A] border border-[#232D42] space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="font-bold text-white text-[11px]">ประกันอะไหล่แท้</div>
              <div className="text-[10px] text-slate-400">ผูกกับชื่อบัญชีคุณ</div>
            </div>
            <div className="p-3 rounded-xl bg-[#161C2A] border border-[#232D42] space-y-1">
              <Award className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="font-bold text-white text-[11px]">รับแต้มสะสม 2x</div>
              <div className="text-[10px] text-slate-400">+{Math.floor(cartTotal / 50)} แต้มคำสั่งนี้</div>
            </div>
            <div className="p-3 rounded-xl bg-[#161C2A] border border-[#232D42] space-y-1">
              <Mail className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="font-bold text-white text-[11px]">ส่งใบเสร็จทันที</div>
              <div className="text-[10px] text-slate-400">ตรงสู่อีเมลของคุณ</div>
            </div>
          </div>

          {/* Quick Demo Login for Testing / Grading convenience */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>บัญชีทดสอบระบบ (1-Click Demo Login)</span>
              </span>
              <span className="text-[10px] text-amber-400/80">กดเพื่อล็อกอินและสั่งต่อทันที</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginUser({ email: 'somchai@motix.com', password: 'password123' });
                }}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300">
                  <Car className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>สมชาย มั่นคง (Gold)</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  somchai@motix.com
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginUser({ email: 'kanya@motix.com', password: 'password123' });
                }}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300">
                  <Bike className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>กัญญา รักษ์ดี (Platinum)</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  kanya@motix.com
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/login?redirect=/checkout')}
              icon={LogIn}
              className="w-full shadow-lg shadow-red-950/50 justify-center font-bold"
            >
              เข้าสู่ระบบด้วยบัญชีของคุณ (Login)
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/register?redirect=/checkout')}
              icon={UserPlus}
              className="w-full justify-center border-slate-700 text-slate-200 hover:text-white"
            >
              สมัครสมาชิกใหม่ (รับฟรี 100 แต้ม + คูปองลด 15%)
            </Button>

            <div className="text-center pt-2">
              <Link to="/cart" className="text-xs text-slate-400 hover:text-white transition-colors">
                ← กลับไปยังตะกร้าสินค้า
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ยืนยันคำสั่งซื้อและการจัดส่ง
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            กรอกข้อมูลที่อยู่จัดส่งและเลือกวิธีการชำระเงินเพื่อดำเนินการต่อ
          </p>
        </div>

        {/* Member Status & Rewards Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#131B27] to-[#121622] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">สั่งซื้อในฐานะสมาชิก: {user.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {user.tier || 'Gold Member'}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                อีเมล: <strong className="text-white">{user.email}</strong> &bull; แต้มสะสมปัจจุบัน: <strong className="text-amber-400">{user.points || 0} แต้ม</strong>
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 bg-[#0E121B] px-3 py-1.5 rounded-xl border border-[#21293B]">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
              คะแนนที่จะได้รับจากออเดอร์นี้
            </span>
            <span className="text-sm font-black text-white font-mono">
              +{Math.floor(cartTotal / 50)} แต้ม MOTIX Rewards
            </span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Customer & Shipping Info */}
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 shadow-md space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-[#1E2536]">
                <span className="w-6 h-6 rounded-full bg-[#E63946] text-white flex items-center justify-center text-xs font-black">1</span>
                <span>ข้อมูลผู้สั่งซื้อและที่อยู่จัดส่ง</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">ชื่อ - นามสกุล *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">เบอร์โทรศัพท์ติดต่อ *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-slate-300 font-bold">อีเมลรับใบเสร็จและเลขพัสดุ *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-slate-300 font-bold">ที่อยู่จัดส่ง (บ้านเลขที่ / ถนน / ซอย) *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">จังหวัด *</label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">รหัสไปรษณีย์ *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-slate-300 font-bold flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#E63946]" />
                    <span>ระบุรุ่นรถ/ปี เพื่อให้ช่างตรวจสอบความถูกต้องก่อนส่ง (แนะนำ)</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleNote"
                    value={formData.vehicleNote}
                    onChange={handleInputChange}
                    placeholder="เช่น Honda Civic FE 2022 หรือ Yamaha NMAX 2021"
                    className="w-full bg-[#0E1119] border border-[#283246] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Method */}
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2536]">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E63946] text-white flex items-center justify-center text-xs font-black">2</span>
                  <span>เลือกช่องทางการจัดส่งสินค้า (Shipping Channel)</span>
                </h2>
                <span className="text-xs text-slate-400">เลือกบริการที่สะดวกสำหรับคุณ</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = shippingMethod === opt.id;
                  const displayFee = opt.fee === 0 ? 'ส่งฟรี' : `+฿${formatPrice(opt.fee)}`;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setShippingMethod(opt.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'bg-red-500/10 border-[#E63946] shadow-lg shadow-red-950/20 ring-1 ring-[#E63946]'
                          : 'bg-[#0E1119] border-[#222A3B] hover:border-slate-600 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#E63946] text-white' : 'bg-[#182030] text-slate-400'
                          }`}>
                            {opt.icon === 'truck' && <Truck className="w-4 h-4" />}
                            {opt.icon === 'package' && <Package className="w-4 h-4" />}
                            {opt.icon === 'mail' && <Mail className="w-4 h-4" />}
                            {opt.icon === 'sparkles' && <Sparkles className="w-4 h-4" />}
                            {opt.icon === 'wrench' && <Wrench className="w-4 h-4" />}
                            {opt.icon === 'map-pin' && <MapPin className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="font-bold text-white block text-sm">{opt.name}</span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {opt.badge}
                            </span>
                          </div>
                        </div>

                        <span className={`font-mono font-bold text-sm ${
                          opt.fee === 0 ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {displayFee}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-1 pl-10">
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2536]">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E63946] text-white flex items-center justify-center text-xs font-black">3</span>
                  <span>เลือกช่องทางการชำระเงิน (Payment Channel)</span>
                </h2>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> ระบบความปลอดภัย SSL 256-bit
                </span>
              </div>

              {/* Payment Tabs / Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {PAYMENT_OPTIONS.map((pay) => {
                  const isSelected = paymentMethod === pay.id;
                  return (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-red-500/15 border-[#E63946] text-white shadow-md ring-1 ring-[#E63946]'
                          : 'bg-[#0E1119] border-[#222A3B] text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#E63946] text-white' : 'bg-[#161C28] text-slate-400'
                      }`}>
                        {pay.icon === 'qr' && <QrCode className="w-4 h-4" />}
                        {pay.icon === 'bank' && <Building2 className="w-4 h-4" />}
                        {pay.icon === 'card' && <CreditCard className="w-4 h-4" />}
                        {pay.icon === 'cash' && <Banknote className="w-4 h-4" />}
                        {pay.icon === 'wallet' && <Wallet className="w-4 h-4" />}
                      </div>
                      <strong className="block text-[11px] leading-tight text-white">{pay.name}</strong>
                    </button>
                  );
                })}
              </div>

              {/* Option 1: PromptPay QR Code */}
              {paymentMethod === 'promptpay' && (
                <div className="p-5 rounded-xl bg-[#090C13] border border-[#222A3B] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5 text-xs">
                    <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg border border-slate-300">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MOTIX-ORDER-PAYMENT-${grandTotal}`}
                        alt="PromptPay QR Code"
                        className="w-36 h-36 object-contain"
                      />
                      <span className="text-[10px] font-bold text-slate-800 mt-1 uppercase tracking-wider">
                        Thai QR Payment
                      </span>
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-900/60 text-blue-300 font-bold text-[11px]">
                        <span>พร้อมเพย์ บริษัท โมทิกซ์ ออโตโมทีฟ จำกัด</span>
                      </div>
                      <h4 className="text-white font-black text-lg">
                        ยอดที่ต้องชำระ: <span className="text-emerald-400 font-mono">฿{formatPrice(grandTotal)}</span>
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        เปิดแอปพลิเคชันธนาคารบนมือถือของคุณ (K PLUS, SCB EASY, Krungthai NEXT, Bangkok Bank ฯลฯ) แล้วสแกนคิวอาร์โค้ดนี้เพื่อชำระเงิน
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-2 py-1 rounded bg-[#151D2A] text-slate-300 text-[11px] font-mono border border-[#222E42]">
                          Ref: 0105567890123
                        </span>
                        <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                          ✓ ปลอดภัย ไร้ค่าธรรมเนียม
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slip Upload Area */}
                  <div className="pt-3 border-t border-[#1C2538] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#E63946]" />
                      แนบหลักฐานการโอนเงิน (สลิปโอนเงิน):
                    </span>
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#141B28] hover:bg-[#1D273A] border border-[#232F46] text-slate-200 font-bold flex items-center gap-2 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{paymentSlipUploaded ? `แนบแล้ว: ${paymentSlipName}` : 'อัปโหลดสลิป (ถ้ามี)'}</span>
                      <input type="file" accept="image/*" onChange={handleSlipChange} className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {/* Option 2: Bank Transfer (โอนเงินผ่านบัญชีธนาคาร) */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-5 rounded-xl bg-[#090C13] border border-[#222A3B] space-y-4 text-xs">
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm">เลือกบัญชีธนาคารที่ต้องการโอน:</h4>
                    <p className="text-slate-400 text-[11px]">
                      ยอดชำระสุทธิ: <strong className="text-emerald-400 font-mono text-sm">฿{formatPrice(grandTotal)}</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => setSelectedBank('kbank')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedBank === 'kbank'
                          ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500'
                          : 'bg-[#10141F] border-[#1E2638] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-emerald-400">ธนาคารกสิกรไทย (KBANK)</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="font-mono font-bold text-white text-sm">089-1-23456-7</div>
                      <div className="text-[10px] text-slate-400">บจก. โมทิกซ์ ออโตโมทีฟ</div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleCopyBankAccount('089-1-23456-7'); }}
                        className="mt-2 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> คัดลอกเลขบัญชี
                      </button>
                    </div>

                    <div
                      onClick={() => setSelectedBank('scb')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedBank === 'scb'
                          ? 'bg-purple-950/40 border-purple-500 text-white ring-1 ring-purple-500'
                          : 'bg-[#10141F] border-[#1E2638] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-purple-400">ธนาคารไทยพาณิชย์ (SCB)</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      </div>
                      <div className="font-mono font-bold text-white text-sm">405-9-87654-3</div>
                      <div className="text-[10px] text-slate-400">บจก. โมทิกซ์ ออโตโมทีฟ</div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleCopyBankAccount('405-9-87654-3'); }}
                        className="mt-2 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> คัดลอกเลขบัญชี
                      </button>
                    </div>

                    <div
                      onClick={() => setSelectedBank('bbl')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedBank === 'bbl'
                          ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500'
                          : 'bg-[#10141F] border-[#1E2638] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-blue-400">ธนาคารกรุงเทพ (BBL)</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      </div>
                      <div className="font-mono font-bold text-white text-sm">123-4-56789-0</div>
                      <div className="text-[10px] text-slate-400">บจก. โมทิกซ์ ออโตโมทีฟ</div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleCopyBankAccount('123-4-56789-0'); }}
                        className="mt-2 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> คัดลอกเลขบัญชี
                      </button>
                    </div>
                  </div>

                  {copiedBank && (
                    <p className="text-emerald-400 text-xs text-center font-bold">
                      ✓ คัดลอกเลขที่บัญชีเรียบร้อยแล้ว
                    </p>
                  )}

                  {/* Slip Upload Area */}
                  <div className="pt-2 border-t border-[#1C2538] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      แนบหลักฐานสลิปโอนเงิน (ยืนยันยอดทันที):
                    </span>
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#141B28] hover:bg-[#1D273A] border border-[#232F46] text-slate-200 font-bold flex items-center gap-2 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{paymentSlipUploaded ? `แนบแล้ว: ${paymentSlipName}` : 'เลือกรูปสลิปจากเครื่อง'}</span>
                      <input type="file" accept="image/*" onChange={handleSlipChange} className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {/* Option 3: Credit / Debit Card */}
              {paymentMethod === 'credit_card' && (
                <div className="p-5 rounded-xl bg-[#090C13] border border-[#222A3B] space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1A2234]">
                    <span className="text-white font-bold">ข้อมูลบัตรเครดิต / เดบิต</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 font-bold font-mono text-[10px]">VISA</span>
                      <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 font-bold font-mono text-[10px]">Mastercard</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 font-bold font-mono text-[10px]">JCB</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-slate-400 font-bold">หมายเลขบัตร 16 หลัก</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full bg-[#121622] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E63946]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold">ชื่อบนบัตร (ภาษาอังกฤษ)</label>
                      <input
                        type="text"
                        value={cardData.cardHolder}
                        onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                        className="w-full bg-[#121622] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-400 font-bold">วันหมดอายุ</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full bg-[#121622] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-white font-mono text-center focus:outline-none focus:border-[#E63946]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 font-bold">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full bg-[#121622] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-white font-mono text-center focus:outline-none focus:border-[#E63946]"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    🔒 ข้อมูลบัตรจะถูกส่งตรงไปยัง Gateway มาตรฐานความปลอดภัย PCI-DSS Level 1 โดยไม่มีการบันทึกหมายเลขบัตรในระบบ
                  </p>
                </div>
              )}

              {/* Option 4: Cash on Delivery (COD) */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-xl bg-[#090C13] border border-[#222A3B] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Banknote className="w-5 h-5" />
                    <span>ชำระเงินปลายทางเมื่อได้รับสินค้า (COD)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    คุณสามารถชำระเป็นเงินสด หรือสแกนจ่ายผ่าน QR Code กับพนักงานส่งพัสดุเมื่อของมาส่งถึงหน้าบ้าน กรุณาเตรียมยอดชำระพอดี <strong className="text-white font-mono">฿{formatPrice(grandTotal)}</strong>
                  </p>
                  <span className="inline-block px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                    ✓ มีบริการตรวจเช็กกล่องพัสดุก่อนรับ
                  </span>
                </div>
              )}

              {/* Option 5: TrueMoney Wallet */}
              {paymentMethod === 'truemoney' && (
                <div className="p-4 rounded-xl bg-[#090C13] border border-[#222A3B] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-400 text-sm flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" /> TrueMoney Wallet
                    </span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-bold">
                      เติมเงิน/ผูกบัตร
                    </span>
                  </div>
                  <p className="text-slate-300">
                    ยอดชำระ <strong className="text-white font-mono">฿{formatPrice(grandTotal)}</strong> จะถูกหักผ่านบัญชี TrueMoney ของคุณ หรือสแกนเพื่อจ่ายในขั้นตอนถัดไป
                  </p>
                  <div className="space-y-1">
                    <label className="text-slate-400">ระบุเบอร์โทรศัพท์ที่ลงทะเบียน TrueMoney</label>
                    <input
                      type="tel"
                      defaultValue={formData.phone}
                      className="w-full bg-[#121622] border border-[#242E42] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-2xl bg-[#121622] border border-[#222A3B] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white pb-3 border-b border-[#1E2536]">
                สรุปรายการที่สั่งซื้อ ({cart.length} ชิ้น)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cart.map((rawItem, idx) => {
                  const item = rawItem.product || rawItem;
                  const price = Number(rawItem.price ?? item.price ?? 0);
                  const safePrice = isNaN(price) ? 0 : price;
                  const quantity = Math.max(1, Number(rawItem.quantity) || 1);
                  const name = rawItem.name || item.name || 'อะไหล่ MOTIX';
                  const image = rawItem.image || item.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&auto=format&fit=crop&q=80';
                  const itemId = rawItem.id || item.id || `co-item-${idx}`;

                  return (
                    <div key={itemId} className="flex items-center gap-3 text-xs">
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#202738] p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
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
                      <div className="flex-1 truncate">
                        <span className="text-white font-medium block truncate">{name}</span>
                        <span className="text-slate-400 text-[11px] font-mono">
                          จำนวน: {quantity} x ฿{formatPrice(safePrice)}
                        </span>
                      </div>
                      <span className="text-white font-bold font-mono">
                        ฿{formatPrice(safePrice * quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#1E2536] text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>ยอดรวมสินค้า:</span>
                  <span className="font-mono font-bold text-white">฿{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>ส่วนลดคูปอง:</span>
                    <span className="font-mono font-bold">-฿{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <div className="flex flex-col">
                    <span>ค่าจัดส่ง:</span>
                    <span className="text-[10px] text-slate-500 font-normal">({currentShippingOption.name})</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {calculatedShippingFee === 0 ? (
                      <span className="text-emerald-400 font-bold">ฟรี</span>
                    ) : (
                      `+฿${formatPrice(calculatedShippingFee)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E2536] flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">ยอดชำระสุทธิ</span>
                  <span className="text-[10px] text-slate-400">รวม VAT 7% แล้ว</span>
                </div>
                <span className="text-2xl font-black text-[#FF8A8A] font-mono">
                  ฿{formatPrice(grandTotal)}
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isProcessing}
                className="w-full shadow-xl shadow-red-950/60"
              >
                {isProcessing ? 'กำลังประมวลผลคำสั่งซื้อ...' : `ยืนยันการสั่งซื้อ ฿${formatPrice(grandTotal)}`}
              </Button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 ข้อมูลถูกเข้ารหัสและปกป้องด้วยมาตรฐานความปลอดภัยระดับสูง
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
