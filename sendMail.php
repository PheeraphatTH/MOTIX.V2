<?php
/**
 * ไฟล์: sendMail.php
 * รายวิชา: การเขียนโปรแกรมบนเว็บ / Web Programming
 * โปรเจกต์: MOTIX Auto Parts Store
 * ดัดแปลงจากโค้ด LAB ของอาจารย์ให้เข้ากับระบบร้าน MOTIX อย่างสมบูรณ์แบบ
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. โหลดไฟล์ class PHPMailer (รองรับทั้งแบบโฟลเดอร์ PHPMailer/src/ และ vendor/)
$phpMailerLoaded = false;
if (file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php')) {
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
    $phpMailerLoaded = true;
} elseif (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    $phpMailerLoaded = true;
}

// 2. ตรวจสอบการส่งข้อมูลผ่าน POST ที่ส่งจากฟอร์ม subscribe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);

    if ($email) {
        $senderEmail = 'pheeraphatx0093kiw@gmail.com'; // อีเมลผู้ส่งของร้าน MOTIX
        $appPassword = getenv('SMTP_PASS') ?: 'eizg oeyc fwhc ndfe'; // Google App Password
        $senderName  = 'MOTIX Auto Parts Store';
        $subject     = 'ยินดีต้อนรับสู่ MOTIX! รับโค้ดส่วนลด 10% สำหรับคุณ';

        // โหลดเนื้อหาอีเมลและแม่แบบ HTML (MOTIX Automotive Theme)
        include "emailContent.php";

        $sendSuccess = false;
        $errorMessage = '';

        if ($phpMailerLoaded && class_exists('PHPMailer\PHPMailer\PHPMailer')) {
            // ส่งด้วย PHPMailer ตามคำสั่งของอาจารย์
            $mail = new PHPMailer(true);
            try {
                // ตั้งค่า SMTP
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = $senderEmail;
                $mail->Password   = $appPassword;
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;
                $mail->CharSet    = 'UTF-8'; // รองรับภาษาไทย 100%

                // กำหนดผู้ส่งและผู้รับ
                $mail->setFrom($senderEmail, $senderName);
                $mail->addAddress($email);

                // กำหนดเนื้อหาอีเมล
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $bodyContent;
                $mail->AltBody = "ขอบคุณที่ติดตามข่าวสาร MOTIX Auto Parts Store! รับโค้ดส่วนลด 10%: MOTIX-NEWS10 เข้าชมร้าน: http://localhost:3000";

                $mail->send();
                $sendSuccess = true;
            } catch (Exception $e) {
                $errorMessage = $mail->ErrorInfo;
            }
        } else {
            // สำรองกรณีที่ยังไม่ได้ดาวน์โหลดโฟลเดอร์ PHPMailer: ส่งผ่านคำสั่ง mail() ของ PHP
            $headers  = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: =?UTF-8?B?" . base64_encode($senderName) . "?= <{$senderEmail}>\r\n";
            $headers .= "Reply-To: {$senderEmail}\r\n";
            $headers .= "X-Mailer: MOTIX Auto Parts PHP Mailer\r\n";

            if (@mail($email, '=?UTF-8?B?' . base64_encode($subject) . '?=', $bodyContent, $headers)) {
                $sendSuccess = true;
            } else {
                $errorMessage = "ไม่พบไลบรารี PHPMailer หรือฟังก์ชัน mail() ของเซิร์ฟเวอร์ยังไม่เปิดใช้งาน";
            }
        }

        // บันทึกรายการอีเมลที่สมัครสมาชิกลงไฟล์ตามโค้ดของอาจารย์
        if ($sendSuccess) {
            file_put_contents("subscribers.txt", date('Y-m-d H:i:s') . " - " . $email . "\n", FILE_APPEND);
        }

        // แสดงผลหน้าจอตามรูปแบบ MOTIX พร้อมข้อความตามอาจารย์
        ?>
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MOTIX - สถานะการสมัครรับข่าวสาร</title>
            <style>
                body {
                    margin: 0;
                    padding: 40px 16px;
                    background-color: #07090E;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    color: #F1F5F9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 80vh;
                }
                .card {
                    max-width: 520px;
                    width: 100%;
                    background: #0E121A;
                    border: 1px solid #1E2738;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.8);
                }
                .status-badge {
                    font-size: 40px;
                    margin-bottom: 12px;
                }
                h2 {
                    margin: 0 0 12px 0;
                    color: #FFFFFF;
                }
                p {
                    color: #94A3B8;
                    font-size: 15px;
                    line-height: 1.6;
                    margin-bottom: 24px;
                }
                .btn {
                    display: inline-block;
                    background: linear-gradient(135deg, #E63946 0%, #C1121F 100%);
                    color: #FFFFFF;
                    padding: 12px 28px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 700;
                    box-shadow: 0 4px 14px rgba(230,57,70,0.4);
                }
            </style>
        </head>
        <body>
            <div class="card">
                <?php if ($sendSuccess): ?>
                    <div class="status-badge">✔️</div>
                    <h2>Subscription สำเร็จ!</h2>
                    <p style="color: #22C55E; font-weight: 600;">
                        คุณจะได้รับข้อเสนอพิเศษทางอีเมล: <?php echo htmlspecialchars($email); ?>
                    </p>
                    <p>โค้ดส่วนลด 10% ของคุณคือ: <strong style="color: #FF5722; font-size: 18px;">MOTIX-NEWS10</strong></p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                        <a href="http://localhost:3000" class="btn">💻 เข้าสู่หน้าร้าน MOTIX (Localhost: 3000)</a>
                        <?php 
                        $onlineUrl = getenv('STORE_PUBLIC_URL') ?: 'https://ais-pre-qw6ggnlhmejdfkkwsn2uhw-107258666727.asia-southeast1.run.app';
                        ?>
                        <a href="<?php echo htmlspecialchars($onlineUrl); ?>" class="btn" style="background: #1E293B; border: 1px solid #334155;">🌐 หน้าร้านออนไลน์ (Web Preview)</a>
                        <a href="subscribe_form.php" style="color: #94A3B8; font-size: 13px; text-decoration: underline; margin-top: 6px;">← กลับไปยังแบบฟอร์มสมัครข่าวสาร</a>
                    </div>
                <?php else: ?>
                    <div class="status-badge">❌</div>
                    <h2>เกิดข้อผิดพลาด</h2>
                    <p style="color: #EF4444;">
                        ไม่สามารถส่งอีเมลถึงคุณได้: <?php echo htmlspecialchars($errorMessage); ?>
                    </p>
                    <a href="subscribe_form.php" class="btn" style="background: #334155;">กลับไปลองใหม่</a>
                <?php endif; ?>
            </div>
        </body>
        </html>
        <?php
    } else {
        echo "<div style='font-family:sans-serif; text-align:center; padding:40px; color:#E63946;'><h3>⚠️ ไม่มีอีเมลนี้ หรือรูปแบบอีเมลไม่ถูกต้อง</h3><a href='subscribe_form.php'>← ย้อนกลับ</a></div>";
    }
} else {
    echo "Access Denied.";
}
?>
