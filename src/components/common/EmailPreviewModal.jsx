import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Award,
  Smartphone,
  Monitor,
  RefreshCw,
  FileCode,
  Download,
  Copy,
  Check,
  Code,
  Layers,
  Receipt,
  ShoppingBag,
} from 'lucide-react';
import {
  generateSubscribeEmailHtml,
  generateRegisterEmailHtml,
  generateOrderConfirmationEmailHtml,
} from '../../../server/emailTemplates';
import { getApiUrl, getStoreBaseUrl } from '../../utils/apiConfig';

export const EmailPreviewModal = ({
  isOpen,
  onClose,
  initialType = 'order',
  prefillEmail = '',
  orderData = null,
}) => {
  const [activeTab, setActiveTab] = useState(initialType); // 'order' | 'subscribe' | 'register' | 'php_assignment'
  const [testEmail, setTestEmail] = useState(prefillEmail || orderData?.shippingAddress?.email || 'pheeraphatx0093kiw@gmail.com');
  const [testName, setTestName] = useState(orderData?.shippingAddress?.fullName || '');
  const [vehicleModel, setVehicleModel] = useState(orderData?.shippingAddress?.vehicleNote || 'Honda Civic FE / Wave 110i');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
    if (orderData?.shippingAddress?.email) {
      setTestEmail(orderData.shippingAddress.email);
    } else if (prefillEmail) {
      setTestEmail(prefillEmail);
    }
    if (orderData?.shippingAddress?.fullName) {
      setTestName(orderData.shippingAddress.fullName);
    }
  }, [initialType, prefillEmail, orderData]);

  // PHP Assignment State
  const [selectedPhpFile, setSelectedPhpFile] = useState('subscribe_form.php');
  const [phpViewMode, setPhpViewMode] = useState('interactive'); // 'interactive' | 'code'
  const [phpCode, setPhpCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeTab === 'php_assignment' && phpViewMode === 'code') {
      setLoadingCode(true);
      fetch(getApiUrl(`/api/php-files/${selectedPhpFile}`))
        .then((r) => r.text())
        .then((text) => {
          setPhpCode(text);
          setLoadingCode(false);
        })
        .catch(() => {
          setPhpCode('// ไม่สามารถโหลดไฟล์ได้ กรุณาลองใหม่');
          setLoadingCode(false);
        });
    }
  }, [activeTab, selectedPhpFile, phpViewMode]);

  const handleCopyCode = () => {
    if (!phpCode) return;
    navigator.clipboard.writeText(phpCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Current store URL for direct backlinks in preview and real email
  const currentStoreUrl = getStoreBaseUrl();

  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  const defaultSampleOrder = useMemo(() => ({
    orderId: 'MTX-849201',
    date: new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    items: [
      {
        id: 'p-01',
        name: 'ชุดจานเบรกคู่หน้า Brembo GT Slot (330mm)',
        nameTh: 'จานเบรกเซาะร่องประสิทธิภาพสูง',
        price: 18500,
        quantity: 1,
        brand: 'Brembo',
        sku: 'BRM-09A8201',
        vehicleModel: 'Honda Civic FE / Accord',
      },
      {
        id: 'p-02',
        name: 'ผ้าเบรกคู่หน้า Project Mu B-Spec Sport',
        nameTh: 'ผ้าเบรกเกรดสปอร์ต ทนความร้อน 500°C',
        price: 4200,
        quantity: 1,
        brand: 'Project Mu',
        sku: 'PMU-BSPEC-FR',
        vehicleModel: 'Honda Civic FE',
      },
      {
        id: 'p-03',
        name: 'น้ำมันเบรก Motul RBF 660 Factory Line (500ml)',
        nameTh: 'น้ำมันเบรกจุดเดือดสูงเกรดสนามแข่ง',
        price: 850,
        quantity: 2,
        brand: 'Motul',
        sku: 'MTL-RBF660',
      },
    ],
    subtotal: 24400,
    discount: 2440,
    shipping: 0,
    total: 21960,
    shippingAddress: {
      fullName: testName || 'สมชาย มั่นคง',
      phone: '081-234-5678',
      email: testEmail || 'somchai.m@example.com',
      address: '123/45 หมู่บ้านพรีเมียม ถ.ศรีนครินทร์ แขวงหนองบอน',
      district: 'เขตประเวศ',
      province: 'กรุงเทพมหานคร',
      postalCode: '10250',
      vehicleNote: vehicleModel || 'Honda Civic FE 1.5 Turbo RS',
    },
    paymentMethod: 'promptpay',
    shippingMethod: 'express',
    pointsEarned: 439,
    storeUrl: currentStoreUrl,
  }), [testName, testEmail, vehicleModel, currentStoreUrl]);

  // Generate Email HTML directly in memory for 100% reliable preview without network 404
  const renderedEmailHtml = useMemo(() => {
    if (activeTab === 'order') {
      const targetOrder = orderData
        ? {
            ...orderData,
            shippingAddress: {
              ...orderData.shippingAddress,
              email: testEmail || orderData.shippingAddress?.email || 'customer@example.com',
            },
            storeUrl: currentStoreUrl,
          }
        : {
            ...defaultSampleOrder,
            shippingAddress: {
              ...defaultSampleOrder.shippingAddress,
              email: testEmail || 'customer@example.com',
            },
          };
      return generateOrderConfirmationEmailHtml(targetOrder);
    }
    if (activeTab === 'subscribe') {
      return generateSubscribeEmailHtml(testEmail || 'customer@example.com', currentStoreUrl);
    }
    return generateRegisterEmailHtml({
      name: testName,
      email: testEmail || 'customer@example.com',
      vehicleModel: vehicleModel || 'Honda Civic FE',
      storeUrl: currentStoreUrl,
    });
  }, [activeTab, testEmail, testName, vehicleModel, currentStoreUrl, orderData, defaultSampleOrder]);

  if (!isOpen) return null;

  const handleSendTest = async (e) => {
    e?.preventDefault();
    if (!testEmail || !testEmail.includes('@')) {
      setSendResult({
        success: false,
        message: 'กรุณาระบุที่อยู่อีเมลผู้รับให้ถูกต้อง',
      });
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      let endpoint = '';
      let payload = {};

      if (activeTab === 'order') {
        endpoint = getApiUrl('/api/order/confirmation-email');
        const targetOrder = orderData
          ? {
              ...orderData,
              shippingAddress: {
                ...orderData.shippingAddress,
                email: testEmail,
              },
            }
          : {
              ...defaultSampleOrder,
              shippingAddress: {
                ...defaultSampleOrder.shippingAddress,
                email: testEmail,
              },
            };
        payload = { order: targetOrder, storeUrl: currentStoreUrl };
      } else if (activeTab === 'subscribe') {
        endpoint = getApiUrl('/api/newsletter/subscribe');
        payload = { email: testEmail, storeUrl: currentStoreUrl };
      } else {
        endpoint = getApiUrl('/api/auth/register-email');
        payload = {
          name: testName,
          email: testEmail,
          phone: '081-234-5678',
          vehicleType: 'car',
          vehicleModel: vehicleModel,
          storeUrl: currentStoreUrl,
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${res.status}: ไม่สามารถส่งอีเมลได้`);
      }

      const data = await res.json();
      setSendResult({
        success: data.success,
        message: data.message || (data.success ? 'ส่งอีเมลสำเร็จแล้ว!' : 'ไม่สามารถส่งอีเมลได้'),
        messageId: data.messageId,
      });
    } catch (err) {
      const isNetworkErr = !err.status && (err.message?.includes('fetch') || err.message?.includes('Network') || err.name === 'TypeError');
      setSendResult({
        success: false,
        isGitHubPages: isGitHubPages,
        message: isGitHubPages && isNetworkErr
          ? '⚠️ บน GitHub Pages เป็น Static Hosting (ไม่มีเซิร์ฟเวอร์ Node.js รันอยู่เบื้องหลัง) จึงไม่สามารถเชื่อมต่อส่ง Gmail SMTP ได้โดยตรง กรุณาทดสอบส่งจริงผ่านหน้าต่าง Live Preview ของ AI Studio (หน้านี้) หรือรันใน VS Code ครับ'
          : `เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err.message || 'Network Error'}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#0E121A] border border-[#232D42] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E273A] bg-[#121622] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-[#E63946]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  ระบบจำลองและส่งอีเมลอัตโนมัติ MOTIX
                </h3>
                {isGitHubPages ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    GitHub Pages (Static Preview)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Gmail SMTP Online (Server Mode)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                ส่งผ่าน: <span className="text-slate-200 font-mono">pheeraphatx0093kiw@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="hidden sm:flex items-center bg-[#090C12] p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-[#1C2333] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-[#1C2333] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/60 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#1E273A] bg-[#0A0D14] px-5 gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => { setActiveTab('order'); setSendResult(null); }}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'order'
                ? 'border-emerald-500 text-white bg-[#141A28]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span>1. สรุปคำสั่งซื้อ & ใบเสร็จ (Order Receipt Email)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              ส่งเมื่อซื้อสินค้า
            </span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('subscribe'); setSendResult(null); }}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'subscribe'
                ? 'border-[#E63946] text-white bg-[#141A28]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FF5722]" />
            <span>2. อีเมล Subscribe ข่าวสาร (คูปอง 10%)</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setSendResult(null); }}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'register'
                ? 'border-[#E63946] text-white bg-[#141A28]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-[#E63946]" />
            <span>3. อีเมล Register ต้อนรับสมาชิก (ลด 15%)</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('php_assignment'); setSendResult(null); }}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'php_assignment'
                ? 'border-cyan-500 text-white bg-[#141A28]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>4. ใบงาน PHP (subscribe_form.php & sendMail.php)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
              PHP Native
            </span>
          </button>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'php_assignment' ? (
          /* ============================================================
             PHP ASSIGNMENT WORKSPACE (โจทย์อาจารย์: subscribe_form.php & sendMail.php)
             ============================================================ */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#080A0F]">
            {/* Top Toolbar for PHP Assignment */}
            <div className="bg-[#10141F] px-5 py-3 border-b border-[#1E273A] flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* File Selector Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">เลือกไฟล์:</span>
                <button
                  type="button"
                  onClick={() => setSelectedPhpFile('subscribe_form.php')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    selectedPhpFile === 'subscribe_form.php'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                      : 'bg-[#182030] text-slate-300 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>1. subscribe_form.php (แบบฟอร์ม POST)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhpFile('sendMail.php')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    selectedPhpFile === 'sendMail.php'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                      : 'bg-[#182030] text-slate-300 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>2. sendMail.php (คำสั่ง mail() ส่งเมล)</span>
                </button>
              </div>

              {/* View Mode & Action Buttons */}
              <div className="flex items-center gap-2">
                {/* View Switcher: Interactive vs Code */}
                <div className="flex items-center bg-[#0A0D14] p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPhpViewMode('interactive')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      phpViewMode === 'interactive'
                        ? 'bg-[#1E2738] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>ทดสอบฟอร์มจริง</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhpViewMode('code')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      phpViewMode === 'code'
                        ? 'bg-[#1E2738] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ดูโค้ด PHP (Source)</span>
                  </button>
                </div>

                {/* Download File Button */}
                <a
                  href={getApiUrl(`/api/php-files/${selectedPhpFile}?download=1`)}
                  download={selectedPhpFile}
                  className="px-3 py-1.5 rounded-xl bg-[#1A2333] hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลด {selectedPhpFile}</span>
                </a>

                {/* Open in New Tab Button */}
                <a
                  href={getApiUrl('/subscribe_form.php')}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">เปิดแท็บใหม่</span>
                </a>
              </div>
            </div>

            {/* Instruction Checklist Box */}
            <div className="bg-[#0C0F17] px-5 py-2.5 border-b border-[#1A2233] text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">ขั้นตอนตามโจทย์:</span>
                <span>1. ฟอร์ม <code>subscribe_form.php</code> ส่งแบบ POST ไปยัง <code>sendMail.php</code></span>
                <span className="text-slate-500">|</span>
                <span>2. สคริปต์ <code>sendMail.php</code> รับค่าส่งอีเมลด้วยฟังก์ชัน <code>mail()</code></span>
              </div>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> พร้อมส่งอาจารย์ทั้ง 2 ไฟล์
              </span>
            </div>

            {/* Main Display: Interactive View OR Code View */}
            <div className="flex-1 p-4 overflow-y-auto flex justify-center items-start">
              {phpViewMode === 'interactive' ? (
                <div className="w-full max-w-2xl h-full min-h-[580px] bg-[#0E121A] rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl flex flex-col">
                  <div className="bg-[#121722] px-4 py-2 border-b border-[#1E273A] flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-emerald-400">URL: {getApiUrl('/subscribe_form.php') || 'http://localhost:3000/subscribe_form.php'}</span>
                    <span>กรอกอีเมลแล้วกดส่งเพื่อทดสอบการทำงานจริงของ POST → sendMail.php</span>
                  </div>
                  <iframe
                    title="PHP Form Interactive"
                    src={getApiUrl('/subscribe_form.php')}
                    className="w-full flex-1 border-none min-h-[550px]"
                  />
                </div>
              ) : (
                <div className="w-full max-w-4xl bg-[#090C12] rounded-2xl border border-[#1E273A] overflow-hidden shadow-2xl flex flex-col">
                  <div className="bg-[#111624] px-5 py-2.5 border-b border-[#1E273A] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs font-bold text-white">{selectedPhpFile}</span>
                      <span className="text-[11px] text-slate-400">({selectedPhpFile === 'subscribe_form.php' ? 'HTML + PHP Form' : 'PHP Mailer Script'})</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all border border-emerald-500/40"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'คัดลอกโค้ดแล้ว!' : 'คัดลอกโค้ดทั้งหมด'}</span>
                    </button>
                  </div>
                  <div className="p-4 bg-[#06080C] overflow-x-auto max-h-[540px]">
                    {loadingCode ? (
                      <div className="text-slate-400 text-xs py-8 text-center flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>กำลังโหลดเนื้อหาโค้ด PHP...</span>
                      </div>
                    ) : (
                      <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre">
                        <code>{phpCode}</code>
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ============================================================
             ORIGINAL EMAIL PREVIEW & REAL TEST WORKSPACE
             ============================================================ */
          <>
            {/* Quick Send Control Bar */}
            <div className="bg-[#111624] px-5 py-3 border-b border-[#1E273A] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <form onSubmit={handleSendTest} className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <div className="flex items-center gap-2 bg-[#090C12] border border-slate-700/80 rounded-xl px-3 py-1.5 flex-1 sm:w-72">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    placeholder="ใส่อีเมลของคุณเพื่อทดสอบรับของจริง"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                  />
                </div>

                {activeTab === 'register' && (
                  <input
                    type="text"
                    placeholder="ชื่อลูกค้า (เว้นว่างได้)"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="bg-[#090C12] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none w-36"
                  />
                )}

                {activeTab === 'order' && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono font-bold">
                    <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                    <span>คำสั่งซื้อ: #{orderData?.orderId || 'MTX-849201'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#C1121F] hover:from-[#FF4D5E] hover:to-[#D62839] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/40 disabled:opacity-60 transition-all cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>กำลังส่งผ่าน Gmail...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{activeTab === 'order' ? 'ส่งใบเสร็จสรุปคำสั่งซื้อเข้าอีเมลนี้' : 'ทดลองส่งอีเมลจริงเข้ากล่องข้อความ'}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>แสดงตัวอย่าง HTML จริงที่ลูกค้าจะได้รับใน Inbox</span>
              </div>
            </div>

            {/* Cloud Backend Connected Indicator for GitHub Pages */}
            {isGitHubPages && (
              <div className="bg-emerald-500/10 border-b border-emerald-500/25 px-5 py-2 text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>
                    <strong>โหมด GitHub Pages:</strong> เชื่อมต่อกับ Cloud Run Backend อัตโนมัติ สามารถกดปุ่มส่งอีเมลจริงเข้า Gmail ได้ทันทีโดยไม่ต้องโคลนลงเครื่อง
                  </span>
                </div>
              </div>
            )}

            {/* Status Toast Banner */}
            {sendResult && (
              <div
                className={`px-5 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
                  sendResult.success
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/15 border-red-500/30 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {sendResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{sendResult.message}</span>
                  {sendResult.messageId && (
                    <span className="font-mono text-[10px] text-slate-400">
                      (Message ID: {sendResult.messageId.slice(0, 24)}...)
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSendResult(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Main Preview Container */}
            <div className="flex-1 bg-[#07090E] p-4 sm:p-6 overflow-y-auto flex justify-center items-start">
              <div
                className={`transition-all duration-300 h-full w-full ${
                  previewDevice === 'mobile'
                    ? 'max-w-md shadow-2xl border border-slate-700 rounded-3xl overflow-hidden p-1 bg-slate-900'
                    : 'max-w-3xl'
                }`}
              >
                <iframe
                  title="MOTIX Email Preview"
                  srcDoc={renderedEmailHtml}
                  className="w-full h-full min-h-[600px] rounded-xl border border-[#222B3D] bg-[#090B10]"
                />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
