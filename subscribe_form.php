<?php
/**
 * ไฟล์: subscribe_form.php
 * รายวิชา: การเขียนโปรแกรมบนเว็บ / Web Programming
 * วัตถุประสงค์: แบบฟอร์ม Subscribe Email สำหรับส่งข่าวสารไปยัง Leads ที่สนใจข้อมูลร้าน MOTIX
 * ส่งข้อมูลแบบ POST ไปยัง sendMail.php
 */
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOTIX - แบบฟอร์มสมัครรับข่าวสาร (Subscribe Form)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=Chakra+Petch:wght@600;700&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Prompt', sans-serif;
            background-color: #07090E;
            color: #F1F5F9;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            background-image: 
                radial-gradient(circle at 10% 15%, rgba(230, 57, 70, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 90% 85%, rgba(14, 165, 233, 0.08) 0%, transparent 45%);
        }
        .container {
            width: 100%;
            max-width: 520px;
            background: #0E121A;
            border: 1px solid #1E2738;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }
        .header-bar {
            height: 4px;
            background: linear-gradient(90deg, #E63946, #FF5722, #C1121F);
        }
        .brand-section {
            padding: 28px 32px 20px 32px;
            text-align: center;
            border-bottom: 1px solid #182030;
            background: #0B0E14;
        }
        .logo-text {
            font-family: 'Chakra Petch', sans-serif;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #FFFFFF;
        }
        .logo-accent {
            color: #E63946;
        }
        .brand-badge {
            display: inline-block;
            margin-top: 8px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #E63946;
            background: rgba(230, 57, 70, 0.12);
            border: 1px solid rgba(230, 57, 70, 0.3);
            padding: 4px 12px;
            border-radius: 9999px;
        }
        .content-section {
            padding: 32px;
        }
        .title {
            font-size: 22px;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 8px;
            line-height: 1.3;
        }
        .subtitle {
            font-size: 13px;
            color: #94A3B8;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        .highlight-box {
            background: #131A26;
            border: 1px dashed rgba(230, 57, 70, 0.4);
            border-radius: 12px;
            padding: 14px 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .highlight-icon {
            font-size: 24px;
        }
        .highlight-text h4 {
            font-size: 13px;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 2px;
        }
        .highlight-text p {
            font-size: 12px;
            color: #CBD5E1;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #E2E8F0;
            margin-bottom: 8px;
        }
        label .required {
            color: #E63946;
        }
        input[type="text"],
        input[type="email"],
        select {
            width: 100%;
            background: #080A0F;
            border: 1px solid #232E42;
            border-radius: 12px;
            padding: 12px 16px;
            color: #FFFFFF;
            font-size: 14px;
            font-family: inherit;
            transition: all 0.2s ease;
            outline: none;
        }
        input[type="text"]:focus,
        input[type="email"]:focus,
        select:focus {
            border-color: #E63946;
            box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.2);
            background: #0B0E15;
        }
        input::placeholder {
            color: #64748B;
        }
        select {
            cursor: pointer;
        }
        select option {
            background: #0E121A;
            color: #FFFFFF;
        }
        .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #E63946 0%, #C1121F 100%);
            border: none;
            border-radius: 12px;
            padding: 14px 20px;
            color: #FFFFFF;
            font-size: 15px;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 8px 20px rgba(230, 57, 70, 0.35);
        }
        .submit-btn:hover {
            background: linear-gradient(135deg, #FF4D5E 0%, #D62839 100%);
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(230, 57, 70, 0.45);
        }
        .submit-btn:active {
            transform: translateY(1px);
        }
        .footer-note {
            margin-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #64748B;
            line-height: 1.5;
        }
        .system-specs {
            margin-top: 24px;
            padding: 12px 16px;
            background: #090C12;
            border: 1px solid #1A2230;
            border-radius: 10px;
            font-size: 11px;
            color: #94A3B8;
        }
        .system-specs strong {
            color: #E2E8F0;
        }
        .back-link {
            display: inline-block;
            margin-top: 16px;
            color: #94A3B8;
            font-size: 12px;
            text-decoration: none;
            transition: color 0.2s;
        }
        .back-link:hover {
            color: #FFFFFF;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Top Racing Stripe -->
        <div class="header-bar"></div>

        <!-- Brand Header -->
        <div class="brand-section">
            <div class="logo-text">MOTI<span class="logo-accent">X</span></div>
            <div class="brand-badge">AUTOMOTIVE & MOTORSPORT STORE</div>
        </div>

        <!-- Content & Form Area -->
        <div class="content-section">
            <h1 class="title">สมัครรับข่าวสาร & สิทธิพิเศษ</h1>
            <p class="subtitle">กรอกอีเมลของคุณเพื่อรับข้อเสนอพิเศษ โปรโมชั่นน้ำมันเครื่อง และโค้ดส่วนลด 10% ส่งตรงเข้ากล่องจดหมายทันที</p>

            <!-- Special Benefit Box -->
            <div class="highlight-box">
                <div class="highlight-icon">🎁</div>
                <div class="highlight-text">
                    <h4>รับโค้ดส่วนลด 10% (MTO10WELCOME)</h4>
                    <p>ระบบจะจัดส่งอีเมลยืนยันพร้อมโค้ดคูปองไปยังอีเมลของคุณทันที</p>
                </div>
            </div>

            <!-- ข้อ 1 ตามคำสั่งอาจารย์: ส่งข้อมูลแบบ POST ไปยัง sendMail.php -->
            <form action="sendMail.php" method="POST">
                
                <!-- ชื่อลูกค้า / Leads (ตัวเลือก) -->
                <div class="form-group">
                    <label for="name">ชื่อผู้รับข้อมูล <span style="color: #64748B; font-weight: normal;">(เว้นว่างได้)</span></label>
                    <input type="text" id="name" name="name" placeholder="ระบุชื่อของคุณ (เช่น คุณสมชาย)">
                </div>

                <!-- อีเมลผู้รับ (จำเป็น) -->
                <div class="form-group">
                    <label for="email">อีเมลของคุณ <span class="required">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="name@example.com">
                </div>

                <!-- ประเภทยานพาหนะที่สนใจ -->
                <div class="form-group">
                    <label for="interest">หมวดหมู่ที่คุณสนใจเป็นพิเศษ</label>
                    <select id="interest" name="interest">
                        <option value="motorcycle">รถจักรยานยนต์ / บิ๊กไบค์ (Bigbike & Scooters)</option>
                        <option value="car">รถยนต์ (Cars & Sedan/SUV)</option>
                        <option value="oil_lubricant">น้ำมันเครื่องสังเคราะห์ & สารหล่อลื่น</option>
                        <option value="tuning_parts">อะไหล่แต่งสมรรถนะสูง & เบรก/โช้ค</option>
                        <option value="all">สนใจทุกโปรโมชั่นของทางร้าน</option>
                    </select>
                </div>

                <!-- ปุ่มส่งข้อมูล Submit -->
                <button type="submit" class="submit-btn">
                    <span>รับข่าวสารและโค้ดส่วนลด 10%</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>

                <div class="footer-note">
                    🔒 ข้อมูลของคุณปลอดภัยและจะถูกใช้เพื่อการส่งข่าวสารโปรโมชั่นของ MOTIX เท่านั้น
                </div>
            </form>

            <!-- หมายเหตุประกอบใบงานของอาจารย์ -->
            <div class="system-specs">
                <strong>📋 ข้อมูลใบงานวิชาการเขียนโปรแกรมบนเว็บ:</strong><br>
                • ฟอร์มนี้ตั้งชื่อไฟล์: <code>subscribe_form.php</code><br>
                • ส่งคำขอแบบ: <code>Method: POST</code> ไปยัง <code>sendMail.php</code><br>
                • การประมวลผล: ดำเนินการผ่านฟังก์ชัน <code>mail()</code> ของภาษา PHP
            </div>

            <div style="text-align: center; margin-top: 18px; display: flex; justify-content: center; gap: 14px;">
                <a href="http://localhost:3000" class="back-link" style="color: #38BDF8; font-weight: 600;">💻 กลับหน้าร้านค้า (Localhost: 3000)</a>
                <span style="color: #475569;">|</span>
                <a href="/" class="back-link">🌐 หน้าร้านค้าหลัก</a>
            </div>
        </div>
    </div>

</body>
</html>
