# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

เจ้าของรถยนต์และมอเตอร์ไซค์ทั่วไป รวมถึงสายแต่งและคนรักการดูแลยานพาหนะ (Car & Motorcycle Enthusiasts) ที่ต้องการค้นหาและเลือกซื้ออะไหล่แท้ อุปกรณ์ตกแต่ง และเคมีภัณฑ์ โดยมั่นใจว่าสินค้าตรงรุ่นและใช้งานกับรถของตนเองได้อย่างถูกต้อง 100%

## Product Purpose

MOTIX เป็นแพลตฟอร์มอีคอมเมิร์ซและดิจิทัลโชว์รูมยานยนต์ระดับพรีเมียม (Motorsport Performance Parts E-Commerce) มุ่งเน้นการแก้ปัญหาความสับสนในการเลือกซื้ออะไหล่ผิดรุ่น ให้ข้อมูลสเปกที่แม่นยำ พร้อมมอบประสบการณ์การเลือกชมสินค้าที่น่าตื่นเต้นเสมือนอยู่ในสตูดิโอแข่งรถ

## Positioning

การผสานระบบคัดกรองอะไหล่ตามรุ่นรถจริง (Vehicle Matching Engine) เข้ากับเทคโนโลยีการแสดงผลสินค้าแบบ Interactive 360° Studio Showcase ช่วยให้ผู้ซื้อตรวจสอบรายละเอียดสินค้าและรูปทรงได้ทุกมุมมองก่อนตัดสินใจซื้อ สร้างความน่าเชื่อถือเหนือร้านค้าอะไหล่ออนไลน์ทั่วไป

## Operating Context

- ผู้ใช้เปิดค้นหาอะไหล่จากทั้งคอมพิวเตอร์และมือถือขณะเช็กสภาพรถหรือวางแผนซ่อมบำรุง
- มีขั้นตอนการระบุรุ่นรถ (ปี/ยี่ห้อ/รุ่นย่อย) เป็นแกนหลักของการคัดกรองสินค้าที่เข้ากันได้
- สินค้าครอบคลุมทั้งกลุ่มบำรุงรักษาพื้นฐาน (น้ำมันเครื่อง, หัวเทียน, แบตเตอรี่) และกลุ่มเพิ่มสมรรถนะ (ระบบเบรก, โช้คอัพ, ระบบส่งกำลัง)

## Capabilities and Constraints

- **ความสามารถปัจจุบัน:**
  - Interactive 360-degree Product Rotation Showcase (หมุนดูรอบทิศทาง 360°)
  - Vehicle Finder (Pit-Stop Garage Selector) คัดกรองตามรุ่นรถ
  - Interactive Recommendation Form (รองรับมุมมองทั้ง Grid และ Slider Carousel)
  - Auto-sliding Announcement Bar แจ้งข่าวสาร/โปรโมชัน
  - Brand Showcase แสดงพาร์ตเนอร์แบรนด์ชั้นนำ (Brembo, Motul, NGK, YSS, GS Battery)
  - Flash Sale Event พร้อมตัวนับเวลานับถอยหลัง
- **ข้อจำกัดทางเทคนิค:**
  - รันบน React 19 + Vite 6 + Tailwind CSS
  - รันใน Local Workspace แบบแยกอิสระจาก GitHub Remote

## Brand Commitments

- **ชื่อแบรนด์:** MOTIX
- **บุคลิกและน้ำเสียง:** ดุดัน แม่นยำ ทันสมัย สไตล์ Motorsport Performance (Racing Pit Stop & Dynamic Cockpit)
- **อัตลักษณ์ทางสายตา (Visual Constraints):** คุมโทน Motorsport Dark Palette (Racing Red, Performance Orange, Deep Carbon Black/Dark Slate) เสริมด้วยแสงนีออนและ Glass Cockpit elements

## Evidence on Hand

- รหัสต้นแบบและคอมโพเนนต์ React ใน `src/` ที่ทำงานได้จริง
- รายการสินค้าและชุดข้อมูลจำลองใน `src/data/mockData.ts`
- ไฟล์สไตล์และ Glass UI tokens ใน `src/index.css`

## Product Principles

1. **Precision Matching First:** ความเข้ากันได้ของอะไหล่กับรุ่นรถต้องชัดเจน ตรวจสอบง่าย และไม่ทำให้ลูกค้าสั่งผิด
2. **Immersive Motorsport Presentation:** นำเสนอสินค้าด้วยมาตรฐาน Visual ที่ดึงดูดใจ ให้ความรู้สึกล้ำสมัยผ่านระบบ 360° และ HUD Telemetry
3. **Speed & Clarity:** ทุกกระบวนการค้นหา สั่งซื้อ และคัดกรอง ต้องรวดเร็ว ชัดเจน มีความโปร่งใสในข้อมูลสเปก
