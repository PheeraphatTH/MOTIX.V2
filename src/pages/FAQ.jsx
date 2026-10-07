import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RotateCcw, Wrench } from 'lucide-react';
import { SectionTitle } from '../components/common/SectionTitle';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'ระบบ Vehicle Finder แม่นยำแค่ไหน และทำไมต้องเลือกรุ่นรถก่อนซื้อ?',
      a: 'ระบบ Vehicle Finder ของ MOTIX ถูกออกแบบและแมปฐานข้อมูลเบอร์อะไหล่แท้ (OEM Part Number) ร่วมกับสเปกโรงงานของผู้ผลิตรถยนต์และมอเตอร์ไซค์มากกว่า 1,000 รุ่น ทำให้มั่นใจได้ว่าสินค้าที่แสดงผลสามารถติดตั้งเข้ากับตัวรถได้พอดี 100% โดยไม่ต้องดัดแปลง',
    },
    {
      q: 'อะไหล่ของ MOTIX เป็นของแท้หรือไม่ มีการรับประกันอย่างไร?',
      a: 'สินค้าทุกชิ้นบน MOTIX เป็นอะไหล่แท้ 100% ที่สั่งตรงจากโรงงานผู้ผลิตแบรนด์ชั้นนำ (เช่น Brembo, Motul, NGK, DID, Profender, Denso, GS Battery) มีการรับประกันคุณภาพสินค้าตามเงื่อนไขแบรนด์ตั้งแต่ 6 เดือน ถึง 2 ปี พร้อมใบรับประกันและใบกำกับภาษีเต็มรูปแบบ',
    },
    {
      q: 'ระยะเวลาการจัดส่งสินค้าใช้เวลากี่วัน?',
      a: 'สำหรับพื้นที่กรุงเทพฯ และปริมณฑล จัดส่งถึงภายใน 24 ชั่วโมง (หรือเลือกบริการ Same-Day ส่งด่วน 4-6 ชม.) สำหรับต่างจังหวัด จัดส่งถึงภายใน 24-48 ชั่วโมง โดยขนส่งเอกชนชั้นนำ พร้อมแพ็คเกจกันกระแทกมาตรฐานโรงงาน',
    },
    {
      q: 'หากสั่งซื้อไปแล้วใส่ไม่ได้ หรือไม่ตรงรุ่น สามารถเปลี่ยนหรือคืนได้หรือไม่?',
      a: 'MOTIX มีนโยบาย MOTIX Guarantee รับเปลี่ยนหรือคืนสินค้าได้ภายใน 7 วันทำการ นับจากวันที่ได้รับสินค้า ในกรณีที่สินค้ายังอยู่ในสภาพสมบูรณ์ ไม่ผ่านการติดตั้งใช้งานหนัก หรือชำรุด',
    },
    {
      q: 'มีบริการเก็บเงินปลายทาง (COD) หรือไม่ และรับชำระผ่านช่องทางใดบ้าง?',
      a: 'เรารองรับทั้งบริการเก็บเงินปลายทาง (COD), สแกน PromptPay QR Code, บัตรเครดิตและเดบิต (Visa / Mastercard / JCB) โดยไม่มีการชาร์จค่าธรรมเนียมเพิ่มเติม',
    },
    {
      q: 'สามารถติดต่อขอคำปรึกษาจากทีมช่างเทคนิคได้อย่างไร?',
      a: 'สามารถติดต่อได้ผ่าน LINE Official Account: @motixparts หรือโทรสายด่วน 02-888-MOTIX (02-888-6684) เปิดให้บริการทุกวันตั้งแต่เวลา 08:30 - 18:30 น.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D12] py-10 sm:py-16 text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
            คำถามที่พบบ่อย (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            รวบรวมข้อสงสัยเกี่ยวกับการเลือกรุ่นรถ การจัดส่ง การรับประกันสินค้า และการสั่งซื้อ
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#121622] border border-[#222A3B] overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#FF6B6B] transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#E63946]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-[#1C2230] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
