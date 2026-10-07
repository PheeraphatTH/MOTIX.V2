import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'ปรึกษาเทียบสเปกอะไหล่',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        phone: '',
        email: '',
        subject: 'ปรึกษาเทียบสเปกอะไหล่',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ติดต่อเรา & ปรึกษาทีมช่างผู้เชี่ยวชาญ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            ต้องการเทียบเบอร์อะไหล่ ตรวจสอบความเข้ากันได้ของรถ หรือสอบถามสถานะจัดส่ง ติดต่อเราได้ทุกวัน
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#121622] border border-[#222A3B] p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-white pb-3 border-b border-[#1E2536]">
                ช่องทางการติดต่อ MOTIX
              </h2>

              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#E63946] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">ศูนย์บริการและคลังกระจายสินค้า</strong>
                    <span className="text-slate-400">888 ถนนพัฒนาการ แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร 10250</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">สายด่วนบริการลูกค้า (Hotline)</strong>
                    <span className="text-slate-300 font-mono">02-888-MOTIX (02-888-6684)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">LINE Official Account</strong>
                    <span className="text-emerald-400 font-mono font-bold">@motixparts (มี @ นำหน้า)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">อีเมลติดต่อฝ่ายขาย & ธุรกิจ</strong>
                    <span className="text-slate-400">support@motixparts.co.th</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">เวลาทำการ</strong>
                    <span className="text-slate-400">เปิดให้บริการทุกวัน: 08:30 - 18:30 น.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#121622] border border-[#222A3B] p-6 sm:p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-2">
                ส่งข้อความถึงเรา (Send Us a Message)
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                กรอกข้อมูลด้านล่าง ทีมวิศวกรและช่างเทคนิคของเราจะติดต่อกลับภายใน 15-30 นาที
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-600/60 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-white font-bold text-base">ส่งข้อความเรียบร้อยแล้ว!</h3>
                  <p className="text-xs text-emerald-300">
                    เจ้าหน้าที่ MOTIX ได้รับข้อมูลของท่านแล้ว และจะติดต่อกลับตามเบอร์โทรศัพท์หรืออีเมลที่ระบุ
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">ชื่อของคุณ *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">เบอร์โทรศัพท์ติดต่อ *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">อีเมล</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold">หัวข้อการติดต่อ</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E63946]"
                      >
                        <option value="ปรึกษาเทียบสเปกอะไหล่">ปรึกษาเทียบสเปกอะไหล่</option>
                        <option value="สอบถามสถานะคำสั่งซื้อ">สอบถามสถานะคำสั่งซื้อ</option>
                        <option value="ขอใบเสนอราคา/สั่งซื้อจำนวนมาก">ขอใบเสนอราคา/สั่งซื้อจำนวนมาก</option>
                        <option value="แจ้งเคลมหรือเปลี่ยนสินค้า">แจ้งเคลมหรือเปลี่ยนสินค้า</option>
                        <option value="ข้อเสนอแนะบริการ">ข้อเสนอแนะบริการ</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold">ข้อความหรือรายละเอียดรุ่นรถที่ต้องการสอบถาม *</label>
                    <textarea
                      rows="4"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="ระบุยี่ห้อ รุ่น ปี และชิ้นส่วนที่ต้องการ เช่น ต้องการผ้าเบรกหน้า Honda Civic 2022..."
                      className="w-full bg-[#0E1119] border border-[#262F42] rounded-xl p-3.5 text-white focus:outline-none focus:border-[#E63946]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={Send}
                    className="w-full sm:w-auto"
                  >
                    ส่งข้อความสอบถาม
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
