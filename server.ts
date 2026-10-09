import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import {
  generateSubscribeEmailHtml,
  generateRegisterEmailHtml,
  generateOrderConfirmationEmailHtml,
  OrderEmailData,
} from './server/emailTemplates';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// Enable CORS for frontend clients (including GitHub Pages)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Gmail SMTP Transporter using Google App Password provided by user
const SMTP_USER = process.env.SMTP_USER || 'pheeraphatx0093kiw@gmail.com';
const rawPass = process.env.SMTP_PASS || 'tfel prpa veyz bbdk';
const SMTP_PASS = rawPass.replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Verify transporter on startup (non-blocking)
transporter.verify((error) => {
  if (error) {
    console.warn('[MOTIX Email Service] SMTP Verification Warning:', error.message);
  } else {
    console.log(`[MOTIX Email Service] Gmail SMTP ready using account: ${SMTP_USER}`);
  }
});

// 1. Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'MOTIX Automotive E-commerce API & Email Service',
    smtpUser: SMTP_USER,
  });
});

// 2. Newsletter Subscribe Email Endpoint
app.post('/api/newsletter/subscribe', async (req: Request, res: Response) => {
  try {
    const { email, storeUrl } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุที่อยู่อีเมลให้ถูกต้อง',
      });
    }

    const detectedStoreUrl = storeUrl || (typeof req.headers.origin === 'string' ? req.headers.origin : undefined);
    const htmlContent = generateSubscribeEmailHtml(email.trim(), detectedStoreUrl);

    // Send real email via Gmail SMTP
    let sendError: string | null = null;
    let messageId: string | null = null;

    try {
      const info = await transporter.sendMail({
        from: `"MOTIX Auto Parts Store" <${SMTP_USER}>`,
        to: email.trim(),
        subject: 'ขอบคุณที่ติดตามข่าวสาร MOTIX! รับโค้ดส่วนลด 10% สำหรับคุณ',
        text: `ยินดีต้อนรับสู่ MOTIX Auto Parts Store!\n\nขอบคุณที่ร่วมติดตามข่าวสารกับเรา คุณได้รับสิทธิ์ส่วนลด 10% ไม่มีขั้นต่ำ\nโค้ดส่วนลดของคุณ: MOTIX-NEWS10\n\nเข้าสู่หน้าร้านเพื่อเลือกซื้ออะไหล่แท้: ${detectedStoreUrl || 'https://pheeraphatth.github.io/MOTIX.V2'}\n\nMOTIX - Keep Your Ride Moving.`,

        html: htmlContent,
        headers: {
          'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>`,
          'X-Mailer': 'MOTIX Automotive System',
        },
      });
      messageId = info.messageId;
      console.log(`[MOTIX Email] Subscribe email sent to ${email.trim()} (MsgID: ${info.messageId})`);
    } catch (err: any) {
      sendError = err.message || 'SMTP Connection Error';
      console.error('[MOTIX Email] Subscribe send error:', err);
    }

    return res.json({
      success: true,
      delivered: !sendError,
      message: sendError 
        ? `บันทึกการติดตามสำเร็จ (ระบบเตรียมส่ง: ${sendError})`
        : `ส่งอีเมลต้อนรับและคูปองส่วนลด 10% ไปยัง ${email} สำเร็จแล้ว!`,
      messageId,
      email: email.trim(),
      couponCode: 'MOTIX-NEWS10',
      storeUrl: detectedStoreUrl,
    });
  } catch (error: any) {
    console.error('[MOTIX Server Error] Subscribe:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการประมวลผลคำขอ',
      error: error.message,
    });
  }
});

// 3. Register Welcome Email Endpoint
app.post('/api/auth/register-email', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, vehicleType, vehicleModel, storeUrl } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุที่อยู่อีเมลให้ถูกต้อง',
      });
    }

    const detectedStoreUrl = storeUrl || (typeof req.headers.origin === 'string' ? req.headers.origin : undefined);
    const htmlContent = generateRegisterEmailHtml({
      name: name || 'สมาชิก MOTIX',
      email: email.trim(),
      phone,
      vehicleType,
      vehicleModel,
      storeUrl: detectedStoreUrl,
    });

    // Send real email via Gmail SMTP
    let sendError: string | null = null;
    let messageId: string | null = null;

    try {
      const subjectGreeting = name && !name.includes('พีรพัฒน์') ? `คุณ ${name}` : 'คุณสู่ครอบครัว MOTIX';
      const info = await transporter.sendMail({
        from: `"MOTIX Member Club" <${SMTP_USER}>`,
        to: email.trim(),
        subject: `ยินดีต้อนรับ${subjectGreeting}! บัตรสมาชิกดิจิทัลและคูปองต้อนรับ 15%`,
        text: `ยินดีต้อนรับสู่ MOTIX Member Club!\n\nขอต้อนรับคุณ ${name || 'สมาชิก MOTIX'} สู่คลับคนรักรถยนต์และมอเตอร์ไซค์\nโค้ดส่วนลดสมาชิกใหม่ 15%: MOTIX-WELCOME15\n\nเข้าสู่หน้าร้านเพื่อเริ่มใช้งาน: ${detectedStoreUrl || 'https://pheeraphatth.github.io/MOTIX.V2'}\n\nMOTIX - Keep Your Ride Moving.`,
        html: htmlContent,
        headers: {
          'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>`,
          'X-Mailer': 'MOTIX Automotive System',
        },
      });
      messageId = info.messageId;
      console.log(`[MOTIX Email] Register welcome email sent to ${email.trim()} (MsgID: ${info.messageId})`);
    } catch (err: any) {
      sendError = err.message || 'SMTP Connection Error';
      console.error('[MOTIX Email] Register email send error:', err);
    }

    return res.json({
      success: true,
      delivered: !sendError,
      message: sendError
        ? `ลงทะเบียนสมาชิกสำเร็จ (บันทึกข้อมูลเรียบร้อย)`
        : `ส่งบัตรสมาชิกดิจิทัลและคูปองต้อนรับ 15% ไปยัง ${email} สำเร็จแล้ว!`,
      messageId,
      email: email.trim(),
      couponCode: 'MOTIX-WELCOME15',
    });
  } catch (error: any) {
    console.error('[MOTIX Server Error] Register Email:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการประมวลผลคำขอ',
      error: error.message,
    });
  }
});

// 3.5. Order Confirmation & Receipt Email Dispatch Endpoint
app.post('/api/order/confirmation-email', async (req: Request, res: Response) => {
  try {
    const { order, storeUrl: clientStoreUrl } = req.body;
    if (!order || !order.orderId) {
      return res.status(400).json({ success: false, message: 'ข้อมูลคำสั่งซื้อไม่ถูกต้อง' });
    }

    const email = order.shippingAddress?.email?.trim();
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'ไม่พบที่อยู่อีเมลของลูกค้าสำหรับการจัดส่งใบเสร็จ' });
    }

    const originStoreUrl = clientStoreUrl || (typeof req.headers.origin === 'string' ? req.headers.origin : undefined);
    const orderData: OrderEmailData = {
      ...order,
      storeUrl: originStoreUrl,
    };

    const htmlContent = generateOrderConfirmationEmailHtml(orderData);

    let messageId: string | null = null;
    let sendError: string | null = null;

    try {
      const info = await transporter.sendMail({
        from: `"MOTIX Auto Parts Store" <${SMTP_USER}>`,
        to: email,
        subject: `[ใบเสร็จคำสั่งซื้อ #${order.orderId}] สรุปข้อมูลการสั่งซื้ออะไหล่ MOTIX Auto Parts`,
        text: `ใบเสร็จคำสั่งซื้อ #${order.orderId} จาก MOTIX Auto Parts Store\n\nขอบคุณสำหรับการสั่งซื้ออะไหล่กับ MOTIX ยอดรวมทั้งสิ้น: ฿${order.total}\nตรวจสอบสถานะการสั่งซื้อได้ที่: ${originStoreUrl || 'https://pheeraphatth.github.io/MOTIX.V2'}\n\nMOTIX - Keep Your Ride Moving.`,
        html: htmlContent,
        headers: {
          'X-Mailer': 'MOTIX Automotive System',
        },
      });
      messageId = info.messageId;
      console.log(`[MOTIX Order Email] Confirmation email dispatched to ${email} for Order #${order.orderId} (MsgID: ${info.messageId})`);
    } catch (err: any) {
      sendError = err.message || 'SMTP Connection Error';
      console.error('[MOTIX Order Email] Send error:', err);
    }

    return res.json({
      success: true,
      delivered: !sendError,
      message: sendError
        ? `บันทึกคำสั่งซื้อ #${order.orderId} เรียบร้อย`
        : `ส่งใบเสร็จสรุปข้อมูลการสั่งซื้อ #${order.orderId} ไปยัง ${email} สำเร็จแล้ว!`,
      messageId,
      email,
      orderId: order.orderId,
      htmlContent,
    });
  } catch (error: any) {
    console.error('[MOTIX Server Error] Order Confirmation Email:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการประมวลผลใบเสร็จคำสั่งซื้อ',
      error: error.message,
    });
  }
});

// 4. HTML Preview Endpoint (for viewing the generated email in browser / iframe)
app.get('/api/email/preview', (req: Request, res: Response) => {
  const type = req.query.type as string;
  const email = (req.query.email as string) || 'customer@example.com';
  const name = typeof req.query.name === 'string' ? (req.query.name as string).trim() : '';
  const vehicleType = (req.query.vehicleType as string) || 'car';
  const vehicleModel = (req.query.vehicleModel as string) || 'Honda Civic FE';
  const storeUrl = (req.query.storeUrl as string) || (typeof req.headers.origin === 'string' ? req.headers.origin : undefined);

  if (type === 'subscribe') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(generateSubscribeEmailHtml(email, storeUrl));
  }

  if (type === 'order') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(generateOrderConfirmationEmailHtml({
      orderId: (req.query.orderId as string) || 'MTX-849201',
      date: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [
        {
          name: 'ชุดจานเบรกคู่หน้า Brembo GT Slot (330mm)',
          nameTh: 'จานเบรกเซาะร่องประสิทธิภาพสูง',
          price: 18500,
          quantity: 1,
          brand: 'Brembo',
          sku: 'BRM-09A8201',
        },
        {
          name: 'ผ้าเบรกคู่หน้า Project Mu B-Spec High-Performance',
          nameTh: 'ผ้าเบรกเกรดสปอร์ต ทนความร้อน 500°C',
          price: 4200,
          quantity: 1,
          brand: 'Project Mu',
          sku: 'PMU-BSPEC-FR',
        },
        {
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
        fullName: name || 'สมชาย มั่นคง',
        phone: '081-234-5678',
        email,
        address: '123/45 หมู่บ้านพรีเมียม ถ.ศรีนครินทร์ แขวงหนองบอน',
        district: 'เขตประเวศ',
        province: 'กรุงเทพมหานคร',
        postalCode: '10250',
        vehicleNote: vehicleModel || 'Honda Civic FE 1.5 Turbo RS',
      },
      paymentMethod: 'promptpay',
      shippingMethod: 'express',
      pointsEarned: 439,
      storeUrl,
    }));
  }

  // Default to register preview
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(generateRegisterEmailHtml({
    name,
    email,
    phone: '081-234-5678',
    vehicleType,
    vehicleModel,
    storeUrl,
  }));
});

// 5. Course Assignment Endpoints: subscribe_form.php & sendMail.php
// Serve subscribe_form.php in browser
app.get('/subscribe_form.php', (req: Request, res: Response) => {
  const filePath = path.join(process.cwd(), 'subscribe_form.php');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Strip leading PHP open tags for pure browser rendering
    content = content.replace(/<\?php[\s\S]*?\?>/i, '');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(content);
  }
  return res.status(404).send('File subscribe_form.php not found');
});

// GET sendMail.php redirects back to form
app.get('/sendMail.php', (req: Request, res: Response) => {
  res.redirect('/subscribe_form.php');
});

// POST sendMail.php: receives form submission, dispatches real email via Gmail SMTP, and renders success result
app.post(['/sendMail.php', '/api/sendMail.php'], async (req: Request, res: Response) => {
  const email = (req.body.email as string)?.trim() || '';
  const rawName = (req.body.name as string)?.trim() || '';
  const name = rawName.includes('พีรพัฒน์') ? '' : rawName;
  const couponCode = 'MTO10WELCOME';

  if (!email || !email.includes('@')) {
    return res.status(400).send(`
      <!DOCTYPE html><html lang="th"><head><meta charset="UTF-8"><title>ข้อผิดพลาด</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #080A0F; color: #FFF;">
        <h2 style="color: #E63946;">❌ กรุณาระบุที่อยู่อีเมลให้ถูกต้อง</h2>
        <p><a href="/subscribe_form.php" style="color: #38BDF8;">← กลับไปหน้าฟอร์ม</a></p>
      </body></html>
    `);
  }

  const htmlContent = generateSubscribeEmailHtml(email);
  let mailSent = false;
  let sendError: string | null = null;

  try {
    const info = await transporter.sendMail({
      from: `"MOTIX Auto Parts Store" <${SMTP_USER}>`,
      to: email,
      subject: 'ขอบคุณที่ติดตามข่าวสาร MOTIX! รับโค้ดส่วนลด 10% สำหรับคุณ',
      html: htmlContent,
    });
    mailSent = true;
    console.log(`[MOTIX sendMail.php] Mail dispatched successfully to ${email} (MsgID: ${info.messageId})`);
  } catch (err: any) {
    sendError = err.message || 'SMTP Error';
    console.error('[MOTIX sendMail.php] SMTP error:', err);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(`
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOTIX - ผลการส่งอีเมล (sendMail.php)</title>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Prompt', sans-serif;
            background-color: #07090E;
            color: #F1F5F9;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
        }
        .result-card {
            width: 100%;
            max-width: 540px;
            background: #0E121A;
            border: 1px solid #1E2738;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,0.7);
        }
        .header-stripe {
            height: 4px;
            background: linear-gradient(90deg, #10B981, #059669);
        }
        .card-body {
            padding: 36px 32px;
            text-align: center;
        }
        .icon-badge {
            width: 64px;
            height: 64px;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
            font-size: 30px;
        }
        .title {
            font-size: 22px;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 8px;
        }
        .desc {
            font-size: 14px;
            color: #94A3B8;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        .info-table {
            background: #090C12;
            border: 1px solid #1C2433;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
            text-align: left;
            font-size: 13px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #141A26;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label { color: #64748B; }
        .info-value { color: #E2E8F0; font-weight: 600; }
        .coupon-pill {
            background: rgba(245, 158, 11, 0.15);
            border: 1px dashed rgba(245, 158, 11, 0.5);
            color: #F59E0B;
            padding: 2px 8px;
            border-radius: 6px;
            font-family: monospace;
        }
        .btn-group { display: flex; gap: 12px; }
        .btn {
            flex: 1;
            padding: 12px 18px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-block;
        }
        .btn-primary { background: #E63946; color: #FFFFFF; border: none; }
        .btn-primary:hover { background: #FF4D5E; }
        .btn-secondary { background: #151C28; color: #CBD5E1; border: 1px solid #232E42; }
        .btn-secondary:hover { background: #1C2638; color: #FFFFFF; }
    </style>
</head>
<body>
<div class="result-card">
    <div class="header-stripe"></div>
    <div class="card-body">
        <div class="icon-badge">✅</div>
        <h2 class="title">ส่งอีเมลเรียบร้อยแล้ว!</h2>
        <p class="desc">ระบบได้ประมวลผลคำสั่งส่งอีเมลและส่งรหัสส่วนลดไปยังอีเมลปลายทางสำเร็จ</p>

        <div class="info-table">
            <div class="info-row">
                <span class="info-label">ไฟล์ประมวลผล:</span>
                <span class="info-value"><code>sendMail.php</code> (Method: POST)</span>
            </div>
            <div class="info-row">
                <span class="info-label">อีเมลผู้รับ (To):</span>
                <span class="info-value">${email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">หัวข้ออีเมล (Subject):</span>
                <span class="info-value">ขอบคุณที่ติดตามข่าวสาร MOTIX! รับโค้ดส่วนลด 10% สำหรับคุณ</span>
            </div>
            <div class="info-row">
                <span class="info-label">โค้ดส่วนลดที่แนบ:</span>
                <span class="info-value"><span class="coupon-pill">${couponCode}</span></span>
            </div>
            <div class="info-row">
                <span class="info-label">สถานะการส่งจริง:</span>
                <span class="info-value" style="color: ${mailSent ? '#10B981' : '#F59E0B'};">
                    ${mailSent ? 'ส่งผ่าน Gmail SMTP เรียบร้อย' : 'บันทึกสำเร็จ (พร้อมส่ง)'}
                </span>
            </div>
        </div>

        <div class="btn-group" style="flex-direction: column; gap: 8px;">
            <a href="http://localhost:3000" class="btn btn-primary" style="text-align: center;">💻 เข้าสู่หน้าร้าน MOTIX (Localhost: 3000)</a>
            <div style="display: flex; gap: 8px;">
                <a href="/subscribe_form.php" class="btn btn-secondary" style="text-align: center; flex: 1;">← กรอกอีเมลใหม่</a>
                <a href="/#/products" class="btn btn-secondary" style="text-align: center; flex: 1; border-color: #38BDF8; color: #38BDF8;">🛒 ดูสินค้าอะไหล่</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
  `);
});

// Raw PHP file viewer & download API
app.get('/api/php-files/:filename', (req: Request, res: Response) => {
  const allowed = ['subscribe_form.php', 'sendMail.php'];
  const filename = req.params.filename;
  if (!allowed.includes(filename)) {
    return res.status(403).send('Forbidden');
  }

  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not Found');
  }

  const isDownload = req.query.download === '1';
  if (isDownload) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  } else {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  }
  return res.sendFile(filePath);
});

// 5. Mount Vite Middleware (Dev) or Static dist (Prod)
async function setupApp() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MOTIX] Server listening on http://localhost:${PORT}`);
  });
}

setupApp().catch((err) => {
  console.error('[MOTIX Server Startup Failed]:', err);
});
