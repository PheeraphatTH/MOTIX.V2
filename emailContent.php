<?php
/**
 * ไฟล์: emailContent.php
 * รายวิชา: การเขียนโปรแกรมบนเว็บ / Web Programming
 * โปรเจกต์: MOTIX - Auto Parts Store
 * วัตถุประสงค์: แม่แบบ HTML สำหรับเนื้อหาอีเมล (Body Content) เมื่อลูกค้ากด Subscribe
 */

// กำหนดตัวแปรสำหรับแสดงผลในอีเมล
$customerEmail = isset($email) ? htmlspecialchars($email, ENT_QUOTES, 'UTF-8') : 'ลูกค้าคนพิเศษ';
$couponCode = "MOTIX-NEWS10";
$localhostUrl = "http://localhost:3000";
$liveUrl = getenv('STORE_PUBLIC_URL') ?: 'https://ais-pre-qw6ggnlhmejdfkkwsn2uhw-107258666727.asia-southeast1.run.app';
$storeUrl = $localhostUrl;

$bodyContent = '
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสู่ MOTIX Auto Parts Store</title>
  <style>
    body { margin: 0; padding: 0; background-color: #05070B; font-family: "Prompt", Arial, sans-serif; color: #F1F5F9; }
    a { text-decoration: none; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #05070B;">
  <center style="width: 100%; table-layout: fixed; background-color: #05070B; padding: 24px 8px 40px 8px;">
    
    <!-- MAIN CONTAINER -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #0A0D14; border: 1px solid #1E2536; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85); text-align: left;">
      
      <!-- TOP RACING ACCENT LINE -->
      <div style="height: 4px; background: linear-gradient(90deg, #E63946 0%, #FF5722 50%, #C1121F 100%);"></div>

      <!-- HEADER & OFFICIAL MOTIX LOGO (Matching Website 100%) -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 18px 22px; background-color: #07090E; border-bottom: 1px solid #161D2A;">
        <tr>
          <td valign="middle" align="left">
            <a href="' . $storeUrl . '" target="_blank" style="text-decoration: none; display: inline-block;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right: 12px; vertical-align: middle;">
                    <!-- MOTIX RPM Carbon Badge -->
                    <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(145deg, #1E2536 0%, #0D111A 100%); border: 1.5px solid #E63946; border-radius: 10px; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.45);">
                      <tr>
                        <td style="padding: 6px 10px; text-align: center; vertical-align: middle;">
                          <span style="font-family: Arial, sans-serif; font-size: 13px; font-weight: 900; color: #FFFFFF; letter-spacing: 1px; display: block; line-height: 1;">
                            🏎️ <span style="color: #FF6B6B;">RPM</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align: middle;">
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 900; color: #FFFFFF; line-height: 1; letter-spacing: -0.5px;">
                      <span style="color: #FFFFFF;">MOTI</span><span style="color: #E63946;">X</span>
                    </div>
                    <div style="font-size: 10px; font-weight: 800; font-style: italic; color: #94A3B8; letter-spacing: 1.5px; margin-top: 3px; text-transform: uppercase;">
                      KEEP YOUR RIDE MOVING.
                    </div>
                  </td>
                </tr>
              </table>
            </a>
          </td>
          <td valign="middle" align="right">
            <a href="' . $storeUrl . '" target="_blank" style="text-decoration: none; display: inline-block;">
              <div style="background-color: #121824; border: 1px solid rgba(230, 57, 70, 0.5); border-radius: 20px; padding: 6px 14px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #22C55E; margin-right: 5px; vertical-align: middle;"></span>
                <span style="font-size: 11px; font-weight: 800; color: #F1F5F9;">เข้าสู่เว็บไซต์ร้าน &rarr;</span>
              </div>
            </a>
          </td>
        </tr>
      </table>

      <!-- HERO BANNER -->
      <div style="padding: 36px 28px 28px 28px; background: radial-gradient(circle at 50% 0%, rgba(230,57,70,0.18) 0%, rgba(10,13,20,0) 75%); text-align: center;">
        <span style="display: inline-block; background-color: rgba(230, 57, 70, 0.15); border: 1px solid #E63946; color: #FF6B6B; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px;">
          MOTIX NEWSLETTER SUBSCRIBER
        </span>
        <h1 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 900; color: #FFFFFF; line-height: 1.3;">
          ยินดีต้อนรับสู่ครอบครัว <span style="color: #E63946;">MOTIX</span>!
        </h1>
        <p style="margin: 0; font-size: 14px; color: #94A3B8; line-height: 1.6;">
          ขอบคุณที่ติดตามข่าวสารกับเรา คุณคือลูกค้ารายสำคัญที่จะได้รับอัปเดตอะไหล่แท้ โปรโมชั่นพิเศษ และเคล็ดลับการดูแลรถก่อนใคร
        </p>
      </div>

      <!-- COUPON CARD -->
      <div style="padding: 0 28px 24px 28px;">
        <div style="background: linear-gradient(135deg, #161D2A 0%, #0E131C 100%); border: 1.5px dashed #E63946; border-radius: 14px; padding: 24px; text-align: center;">
          <div style="font-size: 12px; font-weight: 800; color: #FF5722; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">
            SPECIAL WELCOME GIFT
          </div>
          <div style="font-size: 20px; font-weight: 900; color: #FFFFFF; margin-bottom: 12px;">
            รับส่วนลดทันที 10% สำหรับการสั่งซื้อครั้งแรก
          </div>
          <div style="background-color: #07090E; border: 1px solid #222C3E; border-radius: 8px; padding: 14px; margin-bottom: 16px; display: inline-block; min-width: 220px;">
            <span style="font-family: monospace, Arial; font-size: 22px; font-weight: 900; color: #22C55E; letter-spacing: 3px;">
              ' . $couponCode . '
            </span>
          </div>
          <div style="font-size: 12px; color: #94A3B8; margin-bottom: 18px;">
            * ใช้ได้กับสินค้าทุกหมวดหมู่ ไม่มีขั้นต่ำในการสั่งซื้อ
          </div>
          <a href="' . $storeUrl . '" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #E63946 0%, #C1121F 100%); color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 12px 32px; border-radius: 8px; box-shadow: 0 4px 16px rgba(230,57,70,0.45); text-decoration: none;">
            เริ่มเลือกซื้ออะไหล่แท้เลย &rarr;
          </a>
        </div>
      </div>

      <!-- DUAL STORE LINK CHANNELS -->
      <div style="padding: 0 28px 24px 28px;">
        <div style="background: linear-gradient(135deg, #101522 0%, #07090F 100%); border: 1.5px solid #1E283C; border-radius: 12px; padding: 16px 18px;">
          <div style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">
            🌐 ช่องทางคลิกเข้าสู่หน้าร้าน MOTIX (เลือกลิงก์ตามอุปกรณ์ที่คุณใช้งาน):
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
            <tr>
              <td valign="top" style="padding-bottom: 8px;">
                <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                  💻 หากเปิดอ่านบนคอมพิวเตอร์ของคุณ (Localhost: 3000):
                </div>
                <div style="margin-top: 2px;">
                  <a href="' . $localhostUrl . '" target="_blank" style="color: #38BDF8; font-family: monospace; font-size: 12px; text-decoration: underline; font-weight: 700;">
                    ' . $localhostUrl . '
                  </a>
                  <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดรันในระบบเครื่องคุณ)</span>
                </div>
              </td>
            </tr>
            <tr>
              <td valign="top" style="padding-top: 6px; border-top: 1px dashed #1B2434;">
                <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                  📱 หากเปิดอ่านบนสมาร์ทโฟน หรือเบราว์เซอร์ออนไลน์:
                </div>
                <div style="margin-top: 2px;">
                  <a href="' . $liveUrl . '" target="_blank" style="color: #22C55E; font-family: monospace; font-size: 12px; text-decoration: underline; font-weight: 700; word-break: break-all;">
                    ' . $liveUrl . '
                  </a>
                  <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดได้ทุกอุปกรณ์)</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="padding: 24px 28px; background-color: #07090E; border-top: 1px solid #161D2A; text-align: center;">
        <div style="font-size: 13px; font-weight: 800; color: #FFFFFF; margin-bottom: 6px;">
          MOTIX Auto Parts Store
        </div>
        <div style="font-size: 11px; color: #64748B; line-height: 1.6;">
          ศูนย์รวมอะไหล่รถยนต์ มอเตอร์ไซค์ และน้ำมันเครื่องแท้ 100%<br>
          อีเมลฉบับนี้ส่งถึง: ' . $customerEmail . '<br>
          © ' . date('Y') . ' MOTIX Automotive. All rights reserved.
        </div>
      </div>

    </div>
  </center>
</body>
</html>
';
