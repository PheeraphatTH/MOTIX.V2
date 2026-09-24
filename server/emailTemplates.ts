// Email HTML templates for MOTIX Automotive E-commerce Platform
// Crafted with 100% PURE HTML & INLINE CSS
// Guaranteed to render with ZERO broken images across Gmail, Apple Mail, Outlook, and mobile devices.

export interface RegisterEmailData {
  name?: string;
  email: string;
  phone?: string;
  vehicleType?: string;
  vehicleModel?: string;
  storeUrl?: string;
}

export interface OrderItemData {
  id?: string;
  name: string;
  nameTh?: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  brand?: string;
  sku?: string;
  vehicleModel?: string;
}

export interface OrderEmailData {
  orderId: string;
  date?: string;
  items: OrderItemData[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    district?: string;
    province?: string;
    postalCode?: string;
    vehicleNote?: string;
  };
  paymentMethod?: string;
  shippingMethod?: string;
  pointsEarned?: number;
  storeUrl?: string;
}

// Fallback live store URL if none is provided
export const DEFAULT_STORE_URL = 'https://ais-pre-qw6ggnlhmejdfkkwsn2uhw-107258666727.asia-southeast1.run.app';

export function resolveStoreUrl(customUrl?: string): string {
  if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
    return customUrl.trim().replace(/\/index\.html$/i, '').replace(/\/+$/, '');
  }
  if (typeof process !== 'undefined' && process.env?.STORE_PUBLIC_URL) {
    return process.env.STORE_PUBLIC_URL.trim().replace(/\/index\.html$/i, '').replace(/\/+$/, '');
  }
  return DEFAULT_STORE_URL;
}

/**
 * Accurately constructs a direct link to any sub-page or filter of the MOTIX store.
 * Uses HashRouter (`/#/...`) format to guarantee:
 * 1. ZERO 404 errors on GitHub Pages or static hosts
 * 2. Lands directly and immediately on the exact intended page (not generic Home)
 */
export function buildStoreLink(rawBaseUrl?: string, path: string = ''): string {
  let base = resolveStoreUrl(rawBaseUrl).trim();

  // Strip trailing slashes, index.html, and existing #/ or #
  base = base
    .replace(/\/index\.html$/i, '')
    .replace(/\/+#?(\/)*$/, '');

  const cleanPath = path.trim().replace(/^(\/|#)+/, '');
  if (!cleanPath) {
    return `${base}/#/`;
  }
  return `${base}/#/${cleanPath}`;
}

// ============================================================================
// 1. BRAND HEADER & LOGO COMPONENT (Bulletproof HTML/CSS for 100% Gmail Support)
// ============================================================================
export function renderBrandHeaderHtml(rightBadgeText: string = 'VIP MOTORSPORT CLUB', storeUrl: string = DEFAULT_STORE_URL): string {
  const homeUrl = buildStoreLink(storeUrl, '');
  const targetUrl = buildStoreLink(storeUrl, 'products');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 16px 20px; background-color: #0A0D14; border-bottom: 1px solid #161D2A;">
      <tr>
        <td valign="middle" align="left">
          <a href="${homeUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 12px; vertical-align: middle;">
                  <!-- MOTIX Official Automotive Carbon Racing Badge (Pure HTML/CSS - Gmail Safe 100%) -->
                  <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(145deg, #1E2536 0%, #0D111A 100%); border: 1.5px solid #E63946; border-radius: 10px; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.45);">
                    <tr>
                      <td style="padding: 6px 10px; text-align: center; vertical-align: middle;">
                        <span style="font-family: 'Arial Black', Impact, sans-serif; font-size: 13px; font-weight: 900; color: #FFFFFF; letter-spacing: 1px; display: block; line-height: 1;">
                          🏎️ <span style="color: #FF6B6B;">RPM</span>
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align: middle;">
                  <div style="font-family: 'Arial Black', Impact, 'Segoe UI Black', sans-serif; font-size: 26px; font-weight: 900; color: #FFFFFF; line-height: 1; letter-spacing: -0.5px;">
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
          <a href="${targetUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
            <div style="background-color: #121824; border: 1px solid rgba(230, 57, 70, 0.5); border-radius: 20px; padding: 6px 14px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #22C55E; margin-right: 5px; vertical-align: middle;"></span>
              <span style="font-size: 11px; font-weight: 800; color: #F1F5F9;">${rightBadgeText} &rarr;</span>
            </div>
          </a>
        </td>
      </tr>
    </table>
  `;
}

// ============================================================================
// 2. STORE CATEGORIES NAVIGATION BAR (Pure HTML/CSS - With direct store links)
// ============================================================================
export function renderStoreNavbarHtml(storeUrl: string = DEFAULT_STORE_URL): string {
  const carUrl = buildStoreLink(storeUrl, 'categories?type=car');
  const motoUrl = buildStoreLink(storeUrl, 'categories?type=motorcycle');
  const oilUrl = buildStoreLink(storeUrl, 'products?category=engine-oil');
  const promoUrl = buildStoreLink(storeUrl, 'promotions');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0E121A; padding: 9px 18px; border-bottom: 1px solid #161D2A;">
      <tr>
        <td align="center" style="font-size: 11px; font-weight: 700; color: #94A3B8;">
          <a href="${carUrl}" target="_blank" style="color: #CBD5E1; margin: 0 8px; text-decoration: none;">🚗 อะไหล่รถยนต์</a>
          <span style="color: #334155;">|</span>
          <a href="${motoUrl}" target="_blank" style="color: #CBD5E1; margin: 0 8px; text-decoration: none;">🏍️ อะไหล่มอเตอร์ไซค์</a>
          <span style="color: #334155;">|</span>
          <a href="${oilUrl}" target="_blank" style="color: #CBD5E1; margin: 0 8px; text-decoration: none;">🛢️ น้ำมันเครื่อง &amp; ของเหลว</a>
          <span style="color: #334155;">|</span>
          <a href="${promoUrl}" target="_blank" style="color: #FF5722; margin: 0 8px; text-decoration: none; font-weight: 800;">⚡ สินค้าลดราคา</a>
        </td>
      </tr>
    </table>
  `;
}

// ============================================================================
// 3. REALISTIC TITANIUM VIP MEMBER CARD (100% Pure HTML/CSS - Never breaks!)
// ============================================================================
export function renderRealisticVipCardHtml(memberId: string, memberName: string, vehicleModel: string): string {
  return `
    <div style="background: linear-gradient(135deg, #151D2C 0%, #080A10 100%); border: 1.5px solid rgba(230, 57, 70, 0.45); border-radius: 16px; padding: 22px 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.85); margin: 18px 0; text-align: left;">
      
      <!-- Card Top: Brand & Tier Badge -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="left" valign="middle">
            <div style="font-family: 'Arial Black', Impact, sans-serif; font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px;">
              MOTI<span style="color: #E63946;">X</span>
            </div>
            <div style="font-size: 9px; font-weight: 800; color: #94A3B8; letter-spacing: 2px; text-transform: uppercase;">
              VIP MOTORSPORT CLUB
            </div>
          </td>
          <td align="right" valign="middle">
            <div style="background-color: #171F2E; border: 1px solid rgba(230, 57, 70, 0.5); border-radius: 20px; padding: 5px 14px; display: inline-block;">
              <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background-color: #FF5722; margin-right: 6px; vertical-align: middle;"></span>
              <span style="font-size: 11px; font-weight: 900; color: #FFFFFF; letter-spacing: 0.5px;">SILVER RACER</span>
            </div>
          </td>
        </tr>
      </table>

      <!-- Card Middle: Gold Chip & Privileges -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0; padding-bottom: 14px; border-bottom: 1px solid #1D2738;">
        <tr>
          <td align="left" valign="middle">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 12px; vertical-align: middle;">
                  <!-- Gold Smart Chip in Pure CSS -->
                  <div style="width: 44px; height: 32px; border-radius: 6px; background: linear-gradient(135deg, #FDE68A 0%, #D97706 60%, #92400E 100%); border: 1px solid #78350F; padding: 2px 4px; box-sizing: border-box;">
                    <div style="width: 100%; height: 2px; background: rgba(120, 53, 15, 0.4); margin-top: 8px;"></div>
                    <div style="width: 100%; height: 2px; background: rgba(120, 53, 15, 0.4); margin-top: 6px;"></div>
                  </div>
                </td>
                <td valign="middle">
                  <div style="font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 900; color: #FFFFFF; letter-spacing: 2.5px;">
                    ${memberId}
                  </div>
                  <div style="font-size: 9.5px; font-weight: 700; color: #94A3B8; letter-spacing: 0.5px;">
                    AUTHENTICATED VIP MEMBER
                  </div>
                </td>
              </tr>
            </table>
          </td>
          <td align="right" valign="middle">
            <div style="font-size: 12px; font-weight: 800; color: #22C55E;">+100 แต้มต้อนรับ</div>
            <div style="font-size: 10px; color: #94A3B8;">สะสมแต้ม 2x ทุกยอดซื้อ</div>
          </td>
        </tr>
      </table>

      <!-- Card Bottom: Member Name & Registered Vehicle -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
        <tr>
          <td width="55%" align="left" valign="top">
            <div style="font-size: 9px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">
              MEMBER NAME
            </div>
            <div style="font-size: 15px; font-weight: 800; color: #FFFFFF; line-height: 1.2;">
              ${memberName}
            </div>
          </td>
          <td width="45%" align="right" valign="top">
            <div style="font-size: 9px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">
              REGISTERED VEHICLE
            </div>
            <div style="font-size: 14px; font-weight: 800; color: #FF4D5E; line-height: 1.2;">
              ${vehicleModel}
            </div>
          </td>
        </tr>
      </table>

      <!-- Realistic Barcode Stripe (Pure CSS Lines) -->
      <div style="background-color: #06080C; border-radius: 6px; padding: 6px 12px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #182030;">
        <span style="font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 900; letter-spacing: 4px; color: #CBD5E1;">
          ||| | |||| | ||| || |||| | || ||| ||||
        </span>
        <span style="font-size: 9px; font-weight: 700; color: #64748B; letter-spacing: 1px;">
          MOTIX DIGITAL PASS
        </span>
      </div>

    </div>
  `;
}

// ============================================================================
// 4. FEATURED PERFORMANCE PART SHOWCASE (Pure HTML/CSS - With direct shop link)
// ============================================================================
export function renderFeaturedPartHtml(storeUrl: string = DEFAULT_STORE_URL): string {
  const bremboProductUrl = buildStoreLink(storeUrl, 'products/prod-01');

  return `
    <div style="background: linear-gradient(135deg, #111724 0%, #090C14 100%); border: 1px solid #1E293B; border-radius: 14px; padding: 18px; margin-top: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="58" align="center" valign="middle" style="padding-right: 14px;">
            <div style="width: 54px; height: 54px; border-radius: 12px; background: linear-gradient(135deg, #241316 0%, #151A24 100%); border: 1px solid rgba(230, 57, 70, 0.4); text-align: center; line-height: 54px; font-size: 26px;">
              ⚙️
            </div>
          </td>
          <td valign="middle">
            <div style="display: inline-block; background-color: #E60000; color: #FFFFFF; font-size: 9px; font-weight: 900; padding: 2px 7px; border-radius: 4px; margin-bottom: 4px;">
              BREMBO HIGH PERFORMANCE
            </div>
            <div style="font-size: 14px; font-weight: 900; color: #FFFFFF; line-height: 1.3;">
              จานเบรก Brembo High Carbon แท้ 100% ตรงรุ่น
            </div>
            <div style="font-size: 11px; color: #94A3B8; margin-top: 3px;">
              ทนความร้อนสูง เบรกสั้น มั่นใจทุกย่านความเร็ว &bull; คืนสินค้าได้ใน 7 วัน
            </div>
            <div style="margin-top: 8px;">
              <a href="${bremboProductUrl}" target="_blank" style="display: inline-block; background-color: #1A2234; border: 1px solid #2B3B56; color: #38BDF8; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-decoration: none;">
                🔍 ดูรายละเอียดอะไหล่ชิ้นนี้ที่หน้าร้าน &rarr;
              </a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

// ============================================================================
// 5. OFFICIAL BRAND PARTNERS STRIP (Pure HTML/CSS - No broken images!)
// ============================================================================
export function renderBrandStripHtml(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 14px 20px; background-color: #07090E; border-top: 1px solid #161D2A; text-align: center;">
      <tr>
        <td>
          <div style="font-size: 10.5px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
            AUTHENTIC BRAND PARTNERS AT MOTIX
          </div>
          <div style="font-size: 11.5px; font-weight: 900;">
            <span style="color: #E60000; margin: 0 8px;">● BREMBO</span>
            <span style="color: #FF5722; margin: 0 8px;">● MOTUL</span>
            <span style="color: #F59E0B; margin: 0 8px;">● ÖHLINS</span>
            <span style="color: #E63946; margin: 0 8px;">● AKRAPOVIČ</span>
            <span style="color: #38BDF8; margin: 0 8px;">● NGK</span>
          </div>
        </td>
      </tr>
    </table>
  `;
}

// ============================================================================
// 6. REAL PRODUCTS LIST
// ============================================================================
export const REALISTIC_PRODUCTS = [
  {
    id: 'prod-01',
    route: 'products/prod-01',
    brand: 'Brembo',
    badgeColor: '#E60000',
    name: 'จานเบรกคู่หน้า Brembo High Carbon',
    carType: 'ตรงรุ่น Civic, City, Altis, Mazda 2/3',
    price: '฿3,290',
    originalPrice: '฿4,190',
    discount: 'ลด 21%',
  },
  {
    id: 'prod-02',
    route: 'products/prod-02',
    brand: 'Motul',
    badgeColor: '#E60012',
    name: 'น้ำมันเครื่อง Motul 300V Factory Line 10W-40',
    carType: 'เทคโนโลยี Ester Core สูตรเรซซิ่งแท้ 100%',
    price: '฿890',
    originalPrice: '฿1,050',
    discount: 'ลด 15%',
  },
];

// ============================================================================
// TEMPLATE 1: NEWSLETTER SUBSCRIBE CONFIRMATION EMAIL (Pure HTML)
// Includes explicit, high-contrast links back to the store website
// ============================================================================
export function generateSubscribeEmailHtml(toEmail: string, customStoreUrl?: string): string {
  const currentYear = new Date().getFullYear();
  const couponCode = 'MOTIX-NEWS10';
  const storeUrl = resolveStoreUrl(customStoreUrl);
  const homeLink = buildStoreLink(storeUrl, '');
  const productsLink = buildStoreLink(storeUrl, 'products');
  const categoriesLink = buildStoreLink(storeUrl, 'categories');

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสู่ MOTIX - ขอบคุณที่สมัครรับข่าวสาร</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #05070B;
      color: #F1F5F9;
      -webkit-font-smoothing: antialiased;
    }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .responsive-table { width: 100% !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .hero-title { font-size: 24px !important; }
      .product-card-col { width: 100% !important; display: block !important; margin-bottom: 12px; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #05070B;">
  <!-- Hidden Preheader for Clean Gmail Snippets (Zero Spam Triggers) -->
  <div style="display: none; font-size: 1px; color: #05070B; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ขอบคุณที่ร่วมติดตามข่าวสาร MOTIX Auto Parts Store รับโค้ดส่วนลด 10% รหัส MOTIX-NEWS10 สำหรับช้อปอะไหล่แท้ทุกรายการ
  </div>

  <center style="width: 100%; table-layout: fixed; background-color: #05070B; padding: 24px 8px 40px 8px;">
    
    <!-- MAIN CONTAINER (600px Standard Email Width) -->
    <div style="max-width: 620px; margin: 0 auto; background-color: #090B10; border: 1px solid #1C2433; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.85); text-align: left;">

      <!-- TOP RED MOTORSPORT STRIPE -->
      <div style="height: 4px; background: linear-gradient(90deg, #E63946 0%, #FF5722 50%, #C1121F 100%);"></div>

      <!-- 1. AUTHENTIC NAVBAR (With Direct Link to Store) -->
      ${renderBrandHeaderHtml('เข้าสู่เว็บไซต์ร้าน', storeUrl)}

      <!-- STORE NAVIGATION BAR (Direct Links to Categories & Products) -->
      ${renderStoreNavbarHtml(storeUrl)}

      <!-- 2. HERO WELCOME SECTION -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: radial-gradient(circle at 80% 25%, #250B0F 0%, #0F131D 65%, #080A0F 100%); padding: 26px 22px 20px 22px;">
        <tr>
          <td>
            
            <!-- Category Tag -->
            <div style="display: inline-block; background: rgba(230, 57, 70, 0.15); border: 1px solid rgba(230, 57, 70, 0.4); border-radius: 6px; padding: 4px 10px; margin-bottom: 12px;">
              <span style="color: #FF4D5E; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                MOTIX NEWSLETTER SUBSCRIBER
              </span>
            </div>

            <!-- Headline -->
            <h1 class="hero-title" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 900; line-height: 1.2; color: #FFFFFF;">
              ยินดีต้อนรับคุณสู่<br>
              ครอบครัว <span style="font-family: 'Arial Black', Impact, sans-serif; color: #FFFFFF; letter-spacing: 0.5px;">MOTI<span style="color: #E63946;">X</span></span>
            </h1>

            <p style="color: #CBD5E1; font-size: 13.5px; line-height: 1.6; margin: 0 0 18px 0;">
              ขอบคุณที่ร่วมติดตามข่าวสารกับ <strong style="color: #FFFFFF;">MOTIX</strong> คุณจะได้รับสิทธิ์เข้าถึงสินค้าอะไหล่แท้ตรงรุ่น โปรโมชั่น Flash Sale ประจำสัปดาห์ และสาระการดูแลรักษารถก่อนใคร
            </p>

            <!-- 10% Welcome Coupon Voucher (Pure HTML) -->
            <div style="background: linear-gradient(135deg, #181115 0%, #0E131E 100%); border: 1.5px dashed #E63946; border-radius: 12px; padding: 16px 20px; margin-bottom: 18px; box-shadow: 0 4px 20px rgba(230, 57, 70, 0.2);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="color: #FF6B6B; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                      🎁 คูปองต้อนรับผู้ติดตามใหม่:
                    </div>
                    <div style="font-size: 18px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px;">
                      รับส่วนลดทันที 10% ไม่มีขั้นต่ำ
                    </div>
                    <div style="color: #94A3B8; font-size: 11px;">
                      ใช้ได้กับอะไหล่รถยนต์ มอเตอร์ไซค์ และน้ำมันเครื่องทุกรายการในร้าน
                    </div>
                    <div style="margin-top: 6px;">
                      <a href="${productsLink}" target="_blank" style="color: #FF8080; font-size: 11.5px; font-weight: 700; text-decoration: underline;">
                        👉 แตะที่นี่เพื่อไปใช้คูปองที่หน้าร้านทันที
                      </a>
                    </div>
                  </td>
                  <td align="right" valign="middle" style="padding-left: 12px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 19px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; background-color: #06080C; border: 1px solid #334155; padding: 8px 16px; border-radius: 8px; white-space: nowrap;">
                      [<span style="color: #FF4D5E;">${couponCode}</span>]
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- PRIMARY STORE CTA BUTTON -->
            <div style="margin-bottom: 18px;">
              <a href="${productsLink}" 
                 target="_blank"
                 style="display: inline-block; background: linear-gradient(90deg, #E63946 0%, #C1121F 100%); color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 800; padding: 13px 30px; border-radius: 25px; box-shadow: 0 6px 20px rgba(230, 57, 70, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
                🛒 เข้าสู่หน้าร้าน MOTIX เพื่อเริ่มช้อปทันที &rarr;
              </a>
            </div>

            <!-- 🌐 DIRECT STORE ACCESS HIGHLIGHT BOX (ชัดเจนสำหรับลูกค้าคลิกกลับหน้าร้าน) -->
            <div style="background: linear-gradient(135deg, #121825 0%, #0A0E17 100%); border: 1.5px solid #24324A; border-radius: 12px; padding: 16px 18px; box-shadow: 0 6px 20px rgba(0,0,0,0.5); text-align: left;">
              <div style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">
                🌐 ช่องทางเข้าสู่หน้าร้าน MOTIX (เลือกลิงก์ตามอุปกรณ์ของคุณ)
              </div>
              <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; margin: 3px 0 8px 0;">
                MOTIX Automotive Online Store
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
                <tr>
                  <td valign="top" style="padding-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                      💻 หากเปิดบนคอมพิวเตอร์ของคุณ (Localhost: 3000):
                    </div>
                    <div style="margin-top: 2px;">
                      <a href="http://localhost:3000/#/" target="_blank" style="color: #38BDF8; font-family: monospace; font-size: 12px; font-weight: 700; text-decoration: underline;">
                        http://localhost:3000/#/
                      </a>
                      <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดรันในระบบเครื่องคุณ)</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding-top: 6px; border-top: 1px dashed #1E283C;">
                    <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                      📱 หากเปิดบนสมาร์ทโฟน หรือเว็บออนไลน์:
                    </div>
                    <div style="margin-top: 2px;">
                      <a href="${homeLink}" target="_blank" style="color: #22C55E; font-family: monospace; font-size: 12px; font-weight: 700; text-decoration: underline; word-break: break-all;">
                        ${homeLink}
                      </a>
                      <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดได้ทุกอุปกรณ์)</span>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 14px; text-align: center;">
                <a href="${homeLink}" target="_blank" style="display: inline-block; background-color: #E63946; color: #FFFFFF; font-size: 12.5px; font-weight: 800; padding: 10px 24px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);">
                  🛒 เข้าสู่หน้าร้าน MOTIX ทันที &rarr;
                </a>
              </div>
            </div>

          </td>
        </tr>
      </table>

      <!-- 3. FEATURED GENUINE PART SHOWCASE (With Store Link) -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 18px 22px; background-color: #07090E; border-top: 1px solid #182030;">
        <tr>
          <td>
            <div style="margin-bottom: 6px;">
              <span style="color: #FF5722; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                FEATURED GENUINE PERFORMANCE PART
              </span>
              <div style="font-size: 16px; font-weight: 900; color: #FFFFFF; margin-top: 2px;">
                อะไหล่แท้ระดับโลก พร้อมจัดส่งด่วนทั่วไทย
              </div>
            </div>

            ${renderFeaturedPartHtml(storeUrl)}
          </td>
        </tr>
      </table>

      <!-- 4. OFFICIAL BRAND PARTNERS STRIP -->
      ${renderBrandStripHtml()}

      <!-- 5. REAL PRODUCT RECOMMENDATIONS GRID (Each item has buy/shop button) -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 18px 22px; background-color: #0B0E15; border-top: 1px solid #182030;">
        <tr>
          <td>
            <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; margin-bottom: 12px;">
              ⚡ สินค้ายอดนิยมประจำสัปดาห์ (คลิกเพื่อดูที่หน้าร้าน)
            </div>

            <!-- 2x2 Products Table -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${REALISTIC_PRODUCTS.map((prod) => `
                  <td class="product-card-col" width="48%" valign="top" style="background-color: #101520; border: 1px solid #202B3C; border-radius: 12px; padding: 14px;">
                    <div style="display: inline-block; background-color: ${prod.badgeColor}; color: #FFFFFF; font-size: 9px; font-weight: 900; padding: 2px 7px; border-radius: 4px; margin-bottom: 6px;">
                      ${prod.brand}
                    </div>
                    <div style="font-size: 12.5px; font-weight: 800; color: #FFFFFF; line-height: 1.35; margin-bottom: 4px;">
                      ${prod.name}
                    </div>
                    <div style="font-size: 10px; color: #94A3B8; margin-bottom: 10px;">
                      ${prod.carType}
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                      <tr>
                        <td align="left">
                          <span style="font-size: 15px; font-weight: 900; color: #22C55E;">${prod.price}</span>
                          <span style="font-size: 10px; color: #64748B; text-decoration: line-through; margin-left: 4px;">${prod.originalPrice}</span>
                        </td>
                        <td align="right">
                          <span style="background-color: #E63946; color: #FFFFFF; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                            ${prod.discount}
                          </span>
                        </td>
                      </tr>
                    </table>
                    <a href="${buildStoreLink(storeUrl, prod.route || 'products')}" target="_blank" style="display: block; width: 100%; text-align: center; padding: 7px 0; background: linear-gradient(90deg, #E63946 0%, #B91C1C 100%); color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 6px; text-decoration: none;">
                      🛒 สั่งซื้ออะไหล่ชิ้นนี้ &rarr;
                    </a>
                  </td>
                `).join('<td width="4%"></td>')}
              </tr>
            </table>

          </td>
        </tr>
      </table>

      <!-- 6. VALUE GUARANTEES -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 16px 22px; background-color: #07090D; border-top: 1px solid #161D2A;">
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🛡️</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">อะไหล่แท้ 100%</div>
                  <div style="font-size: 9px; color: #94A3B8;">รับประกันศูนย์ตรง</div>
                </td>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🚚</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">จัดส่งไว 24-48 ชม.</div>
                  <div style="font-size: 9px; color: #94A3B8;">ส่งด่วนทั่วประเทศ</div>
                </td>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🔍</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">ตรงรุ่น 100%</div>
                  <div style="font-size: 9px; color: #94A3B8;">ใส่ไม่ได้ยินดีคืนเงิน</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- 7. FOOTER (With Direct Web Store Links) -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 22px 22px 26px 22px; background-color: #05070B; border-top: 1px solid #141A26;">
        <tr>
          <td valign="top" width="50%" class="mobile-stack">
            <a href="${homeLink}" target="_blank" style="text-decoration: none; color: inherit;">
              <div style="font-family: 'Arial Black', Impact, sans-serif; font-size: 20px; font-weight: 900; color: #FFFFFF;">
                MOTI<span style="color: #E63946;">X</span>
              </div>
            </a>
            <p style="font-size: 10px; color: #94A3B8; margin: 6px 0 8px 0; line-height: 1.5;">
              ศูนย์รวมอะไหล่และอุปกรณ์ยานยนต์ออนไลน์ยุคใหม่ อะไหล่แท้ ครบ จบ พร้อมส่งด่วนทั่วไทย
            </p>
            <div style="font-size: 11px; color: #CBD5E1;">
              🌐 เว็บไซต์ร้าน: <a href="${homeLink}" target="_blank" style="color: #38BDF8; font-weight: 800; text-decoration: underline;">${homeLink}</a>
            </div>
          </td>
          <td valign="top" width="50%" align="right" class="mobile-stack mobile-center" style="padding-top: 6px;">
            <div style="font-size: 11px; font-weight: 700; color: #CBD5E1;">
              ติดต่อสอบถามทีมงาน MOTIX:
            </div>
            <div style="font-size: 12px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">
              LINE Official: <span style="color: #06C755;">@motix</span>
            </div>
            <div style="font-size: 10px; color: #94A3B8; margin-top: 4px;">
              อีเมลส่งไปยัง: ${toEmail}
            </div>
            <div style="margin-top: 8px;">
              <a href="${homeLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">หน้าแรก</a>
              <a href="${productsLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">สินค้าทั้งหมด</a>
              <a href="${categoriesLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline;">หมวดหมู่อะไหล่</a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" style="padding-top: 16px; border-top: 1px solid #111622; margin-top: 12px;">
            <p style="color: #475569; font-size: 9px; margin: 0;">
              &copy; ${currentYear} MOTIX Automotive Store. All rights reserved. Keep Your Ride Moving.
            </p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
  `;
}

// ============================================================================
// TEMPLATE 2: MEMBER CLUB REGISTRATION CONFIRMATION EMAIL (Pure HTML)
// ============================================================================
export function generateRegisterEmailHtml(data: RegisterEmailData): string {
  const currentYear = new Date().getFullYear();
  const couponCode = 'MOTIX-WELCOME15';
  const randomMemberNum = Math.floor(1000 + Math.random() * 9000);
  const memberId = `MTX-${currentYear}-${randomMemberNum}`;
  const storeUrl = resolveStoreUrl(data.storeUrl);
  const homeLink = buildStoreLink(storeUrl, '');
  const productsLink = buildStoreLink(storeUrl, 'products');
  const categoriesLink = buildStoreLink(storeUrl, 'categories');
  
  // Sanitize user name
  const rawName = (data.name || '').trim();
  const hasCustomName = rawName && !rawName.includes('พีรพัฒน์') && rawName !== 'undefined';
  
  const greetingHeadline = hasCustomName
    ? `ยินดีต้อนรับคุณ <span style="color: #FF5722;">${rawName}</span><br>สู่ครอบครัว <span style="font-family: 'Arial Black', Impact, sans-serif; color: #FFFFFF; letter-spacing: 0.5px;">MOTI<span style="color: #E63946;">X</span></span>`
    : `ยินดีต้อนรับคุณสู่<br>ครอบครัว <span style="font-family: 'Arial Black', Impact, sans-serif; color: #FFFFFF; letter-spacing: 0.5px;">MOTI<span style="color: #E63946;">X</span></span>`;

  const vehicleModelClean = data.vehicleModel || 'รถยนต์ / มอเตอร์ไซค์';

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสู่ ครอบครัว MOTIX - บัตรสมาชิก Silver Racer</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #05070B;
      color: #F1F5F9;
      -webkit-font-smoothing: antialiased;
    }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .responsive-table { width: 100% !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .hero-title { font-size: 24px !important; }
      .product-card-col { width: 100% !important; display: block !important; margin-bottom: 12px; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #05070B;">
  <!-- Hidden Preheader for Clean Gmail Snippets (Zero Spam Triggers) -->
  <div style="display: none; font-size: 1px; color: #05070B; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ยินดีต้อนรับสู่ MOTIX Member Club - มอบสิทธิ์ส่วนลด 15% พร้อมบัตรสมาชิก Silver Racer ประจำตัวคุณ
  </div>

  <center style="width: 100%; table-layout: fixed; background-color: #05070B; padding: 24px 8px 40px 8px;">
    
    <!-- MAIN CONTAINER (600px Standard Email Width) -->
    <div style="max-width: 620px; margin: 0 auto; background-color: #090B10; border: 1px solid #1C2433; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.85); text-align: left;">

      <!-- TOP RED MOTORSPORT STRIPE -->
      <div style="height: 4px; background: linear-gradient(90deg, #E63946 0%, #FF5722 50%, #C1121F 100%);"></div>

      <!-- 1. AUTHENTIC NAVBAR (With Direct Store Link) -->
      ${renderBrandHeaderHtml('เข้าสู่เว็บไซต์ร้าน', storeUrl)}

      <!-- STORE NAVIGATION BAR -->
      ${renderStoreNavbarHtml(storeUrl)}

      <!-- 2. HERO WELCOME & REGISTRATION CONFIRMATION -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: radial-gradient(circle at 75% 20%, #22090C 0%, #0F131D 65%, #080A0F 100%); padding: 26px 22px 18px 22px;">
        <tr>
          <td>
            
            <!-- Category Tag -->
            <div style="display: inline-block; background: rgba(230, 57, 70, 0.15); border: 1px solid rgba(230, 57, 70, 0.4); border-radius: 6px; padding: 4px 10px; margin-bottom: 12px;">
              <span style="color: #FF4D5E; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                MOTIX MEMBER CLUB &bull; OFFICIAL WELCOME
              </span>
            </div>

            <!-- Headline -->
            <h1 class="hero-title" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 900; line-height: 1.2; color: #FFFFFF;">
              ${greetingHeadline}
            </h1>

            <p style="color: #CBD5E1; font-size: 13.5px; line-height: 1.6; margin: 0 0 16px 0;">
              การสมัครสมาชิกของคุณเสร็จสมบูรณ์เรียบร้อยแล้ว! ขอมอบบัตรสมาชิกดิจิทัลระดับ <strong>Silver Racer</strong> และโค้ดส่วนลด 15% ให้คุณใช้เลือกซื้ออะไหล่แท้เพื่อรถคันโปรดของคุณได้ทันที
            </p>

            <!-- 3. REALISTIC TITANIUM & CARBON FIBER MEMBER CARD -->
            ${renderRealisticVipCardHtml(memberId, rawName || 'MOTIX VIP MEMBER', vehicleModelClean)}

            <!-- 15% Welcome Coupon Box (Pure HTML) -->
            <div style="background: linear-gradient(135deg, #181115 0%, #0E131E 100%); border: 1.5px dashed #FF5722; border-radius: 12px; padding: 16px 20px; margin-bottom: 18px; box-shadow: 0 4px 20px rgba(255, 87, 34, 0.2);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="color: #FF5722; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                      🎉 โค้ดส่วนลดสมาชิกใหม่ 15%:
                    </div>
                    <div style="font-size: 18px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px;">
                      รับส่วนลด 15% ไม่มีขั้นต่ำ (ลดสูงสุด ฿1,000)
                    </div>
                    <div style="color: #94A3B8; font-size: 11px;">
                      ใช้ได้กับสินค้าทุกชิ้นในร้าน MOTIX &bull; จัดส่งด่วน 24-48 ชม.
                    </div>
                    <div style="margin-top: 6px;">
                      <a href="${productsLink}" target="_blank" style="color: #FFA07A; font-size: 11.5px; font-weight: 700; text-decoration: underline;">
                        👉 แตะที่นี่เพื่อเปิดหน้าร้านและใช้โค้ดส่วนลด 15%
                      </a>
                    </div>
                  </td>
                  <td align="right" valign="middle" style="padding-left: 12px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 19px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; background-color: #06080C; border: 1px solid #334155; padding: 8px 16px; border-radius: 8px; white-space: nowrap;">
                      [<span style="color: #FF5722;">${couponCode}</span>]
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- CTA Shop Button -->
            <div style="margin-bottom: 18px;">
              <a href="${productsLink}" 
                 target="_blank"
                 style="display: inline-block; background: linear-gradient(90deg, #E63946 0%, #C1121F 100%); color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 800; padding: 13px 30px; border-radius: 25px; box-shadow: 0 6px 20px rgba(230, 57, 70, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
                🛒 ช้อปสินค้าตรงรุ่นรถของคุณ &rarr;
              </a>
            </div>

            <!-- DIRECT STORE LINK HIGHLIGHT BOX -->
            <div style="background: linear-gradient(135deg, #121825 0%, #0A0E17 100%); border: 1.5px solid #24324A; border-radius: 12px; padding: 16px 18px; box-shadow: 0 6px 20px rgba(0,0,0,0.5);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <div style="font-size: 10.5px; font-weight: 800; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase;">
                      🌐 เว็บไซต์ร้าน MOTIX Store
                    </div>
                    <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; margin: 3px 0;">
                      MOTIX Official E-Commerce Store
                    </div>
                    <div>
                      <a href="${homeLink}" target="_blank" style="color: #38BDF8; font-size: 12.5px; font-weight: 800; text-decoration: underline; word-break: break-all;">
                        🔗 ${homeLink}
                      </a>
                    </div>
                  </td>
                  <td width="130" align="right" valign="middle" style="padding-left: 12px;">
                    <a href="${homeLink}" target="_blank" style="display: inline-block; background-color: #E63946; color: #FFFFFF; font-size: 12px; font-weight: 800; padding: 9px 16px; border-radius: 8px; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);">
                      เปิดหน้าร้าน &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </div>

          </td>
        </tr>
      </table>

      <!-- 4. OFFICIAL BRAND PARTNERS STRIP (Pure HTML) -->
      ${renderBrandStripHtml()}

      <!-- 5. REAL PRODUCT RECOMMENDATIONS GRID -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 18px 22px; background-color: #0B0E15; border-top: 1px solid #182030;">
        <tr>
          <td>
            <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; margin-bottom: 12px;">
              ⚡ อะไหล่แนะนำสำหรับสมาชิก (ใช้โค้ดลดเพิ่ม 15%)
            </div>

            <!-- 2x2 Products Table -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${REALISTIC_PRODUCTS.map((prod) => `
                  <td class="product-card-col" width="48%" valign="top" style="background-color: #101520; border: 1px solid #202B3C; border-radius: 12px; padding: 14px;">
                    <div style="display: inline-block; background-color: ${prod.badgeColor}; color: #FFFFFF; font-size: 9px; font-weight: 900; padding: 2px 7px; border-radius: 4px; margin-bottom: 6px;">
                      ${prod.brand}
                    </div>
                    <div style="font-size: 12.5px; font-weight: 800; color: #FFFFFF; line-height: 1.35; margin-bottom: 4px;">
                      ${prod.name}
                    </div>
                    <div style="font-size: 10px; color: #94A3B8; margin-bottom: 10px;">
                      ${prod.carType}
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                      <tr>
                        <td align="left">
                          <span style="font-size: 15px; font-weight: 900; color: #22C55E;">${prod.price}</span>
                          <span style="font-size: 10px; color: #64748B; text-decoration: line-through; margin-left: 4px;">${prod.originalPrice}</span>
                        </td>
                        <td align="right">
                          <span style="background-color: #E63946; color: #FFFFFF; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                            ${prod.discount}
                          </span>
                        </td>
                      </tr>
                    </table>
                    <a href="${buildStoreLink(storeUrl, prod.route || 'products')}" target="_blank" style="display: block; width: 100%; text-align: center; padding: 7px 0; background: linear-gradient(90deg, #E63946 0%, #B91C1C 100%); color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 6px; text-decoration: none;">
                      🛒 เลือกซื้ออะไหล่ชิ้นนี้ &rarr;
                    </a>
                  </td>
                `).join('<td width="4%"></td>')}
              </tr>
            </table>

          </td>
        </tr>
      </table>

      <!-- 6. VALUE GUARANTEES -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 16px 22px; background-color: #07090D; border-top: 1px solid #161D2A;">
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🛡️</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">อะไหล่แท้ 100%</div>
                  <div style="font-size: 9px; color: #94A3B8;">รับประกันศูนย์ตรง</div>
                </td>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🚚</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">จัดส่งไว 24-48 ชม.</div>
                  <div style="font-size: 9px; color: #94A3B8;">ส่งด่วนทั่วประเทศ</div>
                </td>
                <td width="33%" align="center" style="padding: 4px;">
                  <div style="font-size: 18px;">🔍</div>
                  <div style="font-size: 11px; font-weight: 800; color: #E2E8F0; margin-top: 2px;">ตรงรุ่น 100%</div>
                  <div style="font-size: 9px; color: #94A3B8;">ใส่ไม่ได้ยินดีคืนเงิน</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- 7. FOOTER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 22px 22px 26px 22px; background-color: #05070B; border-top: 1px solid #141A26;">
        <tr>
          <td valign="top" width="50%" class="mobile-stack">
            <a href="${homeLink}" target="_blank" style="text-decoration: none; color: inherit;">
              <div style="font-family: 'Arial Black', Impact, sans-serif; font-size: 20px; font-weight: 900; color: #FFFFFF;">
                MOTI<span style="color: #E63946;">X</span>
              </div>
            </a>
            <p style="font-size: 10px; color: #94A3B8; margin: 6px 0 8px 0; line-height: 1.5;">
              ศูนย์รวมอะไหล่และอุปกรณ์ยานยนต์ออนไลน์ยุคใหม่ อะไหล่แท้ ครบ จบ พร้อมส่งด่วนทั่วไทย
            </p>
            <div style="font-size: 11px; color: #CBD5E1;">
              🌐 เว็บไซต์ร้าน: <a href="${homeLink}" target="_blank" style="color: #38BDF8; font-weight: 800; text-decoration: underline;">${homeLink}</a>
            </div>
          </td>
          <td valign="top" width="50%" align="right" class="mobile-stack mobile-center" style="padding-top: 6px;">
            <div style="font-size: 11px; font-weight: 700; color: #CBD5E1;">
              ติดต่อสอบถามทีมงาน MOTIX:
            </div>
            <div style="font-size: 12px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">
              LINE Official: <span style="color: #06C755;">@motix</span>
            </div>
            <div style="font-size: 10px; color: #94A3B8; margin-top: 4px;">
              อีเมลส่งไปยัง: ${data.email}
            </div>
            <div style="margin-top: 8px;">
              <a href="${homeLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">หน้าแรก</a>
              <a href="${productsLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">สินค้าทั้งหมด</a>
              <a href="${categoriesLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline;">หมวดหมู่อะไหล่</a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" style="padding-top: 16px; border-top: 1px solid #111622; margin-top: 12px;">
            <p style="color: #475569; font-size: 9px; margin: 0;">
              &copy; ${currentYear} MOTIX Automotive Store. All rights reserved. Keep Your Ride Moving.
            </p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
  `;
}

// ============================================================================
// 8. ORDER CONFIRMATION & RECEIPT EMAIL TEMPLATE (Pure HTML/CSS)
// ============================================================================
export function generateOrderConfirmationEmailHtml(order: OrderEmailData): string {
  const currentYear = new Date().getFullYear();
  const storeUrl = resolveStoreUrl(order.storeUrl);
  const homeLink = buildStoreLink(storeUrl, '');
  const productsLink = buildStoreLink(storeUrl, 'products');
  const categoriesLink = buildStoreLink(storeUrl, 'categories');

  const customerName = (order.shippingAddress?.fullName || 'ลูกค้าผู้มีอุปการคุณ').trim();
  const customerEmail = order.shippingAddress?.email || 'customer@example.com';
  const customerPhone = order.shippingAddress?.phone || '-';
  const fullAddress = [
    order.shippingAddress?.address,
    order.shippingAddress?.district,
    order.shippingAddress?.province,
    order.shippingAddress?.postalCode,
  ].filter(Boolean).join(' ');

  const formatPrice = (amount: number = 0) => {
    return new Intl.NumberFormat('th-TH').format(amount);
  };

  const paymentLabelMap: Record<string, string> = {
    promptpay: 'พร้อมเพย์ QR Code (PromptPay - ชำระเงินเรียบร้อย)',
    bank_transfer: 'โอนเงินผ่านบัญชีธนาคาร (Bank Transfer - แนบสลิปเรียบร้อย)',
    credit_card: 'บัตรเครดิต / เดบิต (Credit/Debit Card - ชำระเงินเรียบร้อย)',
    cod: 'เก็บเงินปลายทาง (COD) - ชำระเงินเมื่อรับสินค้า',
    truemoney: 'TrueMoney Wallet - ชำระเงินเรียบร้อย',
  };
  const paymentText = paymentLabelMap[order.paymentMethod || ''] || order.paymentMethod || 'ชำระเงินออนไลน์';

  const shippingLabelMap: Record<string, string> = {
    flash: 'Flash Express (ขนส่งด่วนมาตรฐาน 1-2 วันทำการ)',
    kerry: 'Kerry Express / KEX (พัสดุด่วนพรีเมียม 1-2 วันทำการ)',
    ems: 'ไปรษณีย์ไทย EMS (ด่วนพิเศษครอบคลุมทั่วไทย 1-3 วัน)',
    sameday: 'MOTIX Sameday Rider (ส่งด่วนภายในวัน ได้รับใน 3-6 ชม.)',
    bulky: 'ขนส่งอะไหล่ชิ้นใหญ่พิเศษ (Bulky / Lalamove)',
    pickup: 'รับสินค้าด้วยตนเองที่หน้าร้าน (MOTIX Garage & Service)',
  };
  const shippingText = shippingLabelMap[order.shippingMethod || ''] || (order.shippingMethod === 'sameday'
    ? 'MOTIX Sameday Rider (ส่งด่วนในวัน)'
    : 'ขนส่งด่วนมาตรฐาน Kerry / Flash Express (1-2 วันทำการ)');

  const itemsHtml = (order.items || []).map((item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    const itemBrand = item.brand ? `<span style="display: inline-block; background-color: #1E2536; color: #94A3B8; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">${item.brand}</span>` : '';
    const itemSku = item.sku || item.id ? `<div style="font-size: 10px; color: #64748B; margin-top: 2px;">รหัสอะไหล่: ${item.sku || item.id}</div>` : '';

    return `
      <tr style="border-bottom: 1px solid #1A2130;">
        <td style="padding: 12px 8px; vertical-align: middle;">
          <div style="font-size: 12px; font-weight: 800; color: #FFFFFF; line-height: 1.4;">
            ${itemBrand}${item.name}
          </div>
          ${item.nameTh && item.nameTh !== item.name ? `<div style="font-size: 11px; color: #94A3B8; margin-top: 1px;">${item.nameTh}</div>` : ''}
          ${itemSku}
        </td>
        <td align="center" style="padding: 12px 8px; vertical-align: middle; font-size: 12px; font-weight: 700; color: #CBD5E1;">
          x${item.quantity || 1}
        </td>
        <td align="right" style="padding: 12px 8px; vertical-align: middle; font-size: 12px; color: #94A3B8;">
          ฿${formatPrice(item.price)}
        </td>
        <td align="right" style="padding: 12px 8px; vertical-align: middle; font-size: 13px; font-weight: 800; color: #E63946;">
          ฿${formatPrice(itemTotal)}
        </td>
      </tr>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="th" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>สรุปคำสั่งซื้อ #${order.orderId} - MOTIX Automotive</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, div, p, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background-color: #05070B;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #E2E8F0;
    }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .mobile-stack { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .mobile-center { text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 16px 8px; background-color: #05070B;">
  <!-- Hidden Preheader for Clean Gmail Snippets (Zero Spam Triggers) -->
  <div style="display: none; font-size: 1px; color: #05070B; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ใบเสร็จคำสั่งซื้อ #${order.orderId} จาก MOTIX Auto Parts Store - สรุปรายการอะไหล่แท้และการจัดส่ง
  </div>

  <center style="width: 100%; background-color: #05070B;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #0A0D14; border: 1px solid #1E2536; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.85); text-align: left;">
      
      <!-- BRAND HEADER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 16px 22px; background-color: #0A0D14; border-bottom: 1px solid #161D2A;">
        <tr>
          <td valign="middle">
            <a href="${homeLink}" target="_blank" style="text-decoration: none; display: inline-block;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right: 12px; vertical-align: middle;">
                    <!-- MOTIX Official Automotive Carbon Racing Badge (Pure HTML/CSS - Gmail Safe 100%) -->
                    <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(145deg, #1E2536 0%, #0D111A 100%); border: 1.5px solid #E63946; border-radius: 9px; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.45);">
                      <tr>
                        <td style="padding: 5px 9px; text-align: center; vertical-align: middle;">
                          <span style="font-family: 'Arial Black', Impact, sans-serif; font-size: 12px; font-weight: 900; color: #FFFFFF; letter-spacing: 1px; display: block; line-height: 1;">
                            🏎️ <span style="color: #FF6B6B;">RPM</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align: middle;">
                    <div style="font-family: 'Arial Black', Impact, 'Segoe UI Black', sans-serif; font-size: 24px; font-weight: 900; color: #FFFFFF; line-height: 1; letter-spacing: -0.5px;">
                      <span style="color: #FFFFFF;">MOTI</span><span style="color: #E63946;">X</span>
                    </div>
                    <div style="font-size: 9px; font-weight: 800; font-style: italic; color: #94A3B8; letter-spacing: 1.5px; margin-top: 3px; text-transform: uppercase;">
                      OFFICIAL ORDER RECEIPT
                    </div>
                  </td>
                </tr>
              </table>
            </a>
          </td>
          <td valign="middle" align="right">
            <div style="background-color: #121824; border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 20px; padding: 5px 12px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #22C55E; margin-right: 5px; vertical-align: middle;"></span>
              <span style="font-size: 11px; font-weight: 800; color: #22C55E;">ชำระเงินสำเร็จแล้ว</span>
            </div>
          </td>
        </tr>
      </table>

      <!-- STORE NAVBAR -->
      ${renderStoreNavbarHtml(storeUrl)}

      <!-- ORDER SUCCESS HERO BANNER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 24px 22px 18px 22px; background: linear-gradient(180deg, #0F1626 0%, #0A0D14 100%); border-bottom: 1px solid #161D2A;">
        <tr>
          <td align="center">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(34, 197, 94, 0.15); border: 2px solid #22C55E; line-height: 48px; text-align: center; margin: 0 auto 12px auto;">
              <span style="font-size: 24px; color: #22C55E;">✓</span>
            </div>
            <div style="font-size: 11px; font-weight: 800; color: #22C55E; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
              ORDER CONFIRMED &bull; ยืนยันคำสั่งซื้อเรียบร้อย
            </div>
            <h1 style="font-size: 22px; font-weight: 900; color: #FFFFFF; margin: 0 0 6px 0; line-height: 1.3;">
              ขอบคุณสำหรับคำสั่งซื้อ คุณ${customerName}
            </h1>
            <p style="font-size: 12.5px; color: #94A3B8; margin: 0; line-height: 1.5;">
              เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว กำลังดำเนินการตรวจสอบอะไหล่และแพ็กสินค้าเพื่อจัดส่งด่วน
            </p>
          </td>
        </tr>
      </table>

      <!-- ORDER META GRID (ID, Date, Status) -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 16px 22px; background-color: #0E121A; border-bottom: 1px solid #161D2A;">
        <tr>
          <td width="50%" valign="top" style="padding-right: 10px;">
            <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">หมายเลขคำสั่งซื้อ:</div>
            <div style="font-family: monospace; font-size: 15px; font-weight: 900; color: #E63946; margin-top: 2px;">
              #${order.orderId}
            </div>
            <div style="font-size: 10.5px; color: #94A3B8; margin-top: 4px;">
              วันที่สั่งซื้อ: ${order.date || new Date().toLocaleString('th-TH')}
            </div>
          </td>
          <td width="50%" valign="top" align="right">
            <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">สถานะการจัดส่ง:</div>
            <div style="font-size: 13px; font-weight: 800; color: #38BDF8; margin-top: 2px;">
              📦 กำลังเตรียมพัสดุ
            </div>
            <div style="font-size: 10.5px; color: #22C55E; margin-top: 4px;">
              ⚡ ประมาณการส่งถึง: 1-2 วันทำการ
            </div>
          </td>
        </tr>
      </table>

      <!-- SHIPPING & CUSTOMER DETAILS BOX -->
      <div style="padding: 18px 22px; border-bottom: 1px solid #161D2A;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0E131E; border: 1px solid #1C2436; border-radius: 12px; padding: 14px 16px;">
          <tr>
            <td width="50%" valign="top" class="mobile-stack" style="padding-right: 12px;">
              <div style="font-size: 11px; font-weight: 800; color: #F1F5F9; border-bottom: 1px solid #1E293B; padding-bottom: 6px; margin-bottom: 8px;">
                📍 ข้อมูลจัดส่งสินค้า
              </div>
              <div style="font-size: 12px; font-weight: 700; color: #FFFFFF;">${customerName}</div>
              <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">📞 ${customerPhone}</div>
              <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">✉️ ${customerEmail}</div>
              <div style="font-size: 11px; color: #CBD5E1; margin-top: 6px; line-height: 1.4;">
                ${fullAddress || 'จัดส่งตามที่อยู่ที่ระบุไว้'}
              </div>
            </td>
            <td width="50%" valign="top" class="mobile-stack" style="padding-left: 12px; border-left: 1px solid #1E293B;">
              <div style="font-size: 11px; font-weight: 800; color: #F1F5F9; border-bottom: 1px solid #1E293B; padding-bottom: 6px; margin-bottom: 8px;">
                💳 วิธีชำระเงิน & ขนส่ง
              </div>
              <div style="font-size: 11px; color: #94A3B8;">วิธีชำระเงิน:</div>
              <div style="font-size: 11.5px; font-weight: 700; color: #22C55E; margin-bottom: 6px;">
                ${paymentText}
              </div>
              <div style="font-size: 11px; color: #94A3B8;">รูปแบบขนส่ง:</div>
              <div style="font-size: 11px; font-weight: 700; color: #E2E8F0; margin-bottom: 6px;">
                ${shippingText}
              </div>
              ${order.shippingAddress?.vehicleNote ? `
                <div style="font-size: 10.5px; color: #94A3B8;">หมายเหตุ / รุ่นรถ:</div>
                <div style="font-size: 11px; font-weight: 700; color: #F59E0B;">
                  🚗 ${order.shippingAddress.vehicleNote}
                </div>
              ` : ''}
            </td>
          </tr>
        </table>
      </div>

      <!-- PURCHASED ITEMS TABLE -->
      <div style="padding: 16px 22px; border-bottom: 1px solid #161D2A;">
        <div style="font-size: 13px; font-weight: 900; color: #FFFFFF; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
          <span>📋 รายการอะไหล่ที่สั่งซื้อ (${(order.items || []).length} รายการ)</span>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0F17; border: 1px solid #1A2234; border-radius: 10px;">
          <thead>
            <tr style="background-color: #121824; border-bottom: 1px solid #1E2A40;">
              <th align="left" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #94A3B8; text-transform: uppercase;">สินค้า</th>
              <th align="center" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #94A3B8; text-transform: uppercase;">จำนวน</th>
              <th align="right" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #94A3B8; text-transform: uppercase;">ราคา/ชิ้น</th>
              <th align="right" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #94A3B8; text-transform: uppercase;">รวม</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <!-- FINANCIAL BREAKDOWN -->
      <div style="padding: 16px 22px; background-color: #0C1018; border-bottom: 1px solid #161D2A;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="top" width="55%" style="padding-right: 16px;" class="mobile-stack">
              <div style="background-color: #121824; border: 1px solid #1E283C; border-radius: 10px; padding: 12px;">
                <div style="font-size: 11px; font-weight: 800; color: #F59E0B; margin-bottom: 3px;">
                  🎁 MOTIX REWARDS สะสมแต้ม
                </div>
                <div style="font-size: 10.5px; color: #94A3B8; line-height: 1.4;">
                  คุณได้รับแต้มสะสม <strong style="color: #F59E0B;">+${order.pointsEarned || Math.floor(order.total / 50)} แต้ม</strong> จากคำสั่งซื้อนี้ สามารถนำไปแลกส่วนลดในบิลถัดไปได้ทันที
                </div>
              </div>
            </td>
            <td valign="top" width="45%" class="mobile-stack" style="padding-top: 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 12px;">
                <tr>
                  <td style="color: #94A3B8; padding: 4px 0;">ยอดรวมสินค้า:</td>
                  <td align="right" style="color: #FFFFFF; font-weight: 700; padding: 4px 0;">฿${formatPrice(order.subtotal)}</td>
                </tr>
                ${order.discount ? `
                <tr>
                  <td style="color: #22C55E; padding: 4px 0;">ส่วนลดคูปอง:</td>
                  <td align="right" style="color: #22C55E; font-weight: 700; padding: 4px 0;">-฿${formatPrice(order.discount)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #94A3B8; padding: 4px 0;">ค่าจัดส่ง:</td>
                  <td align="right" style="color: #FFFFFF; font-weight: 700; padding: 4px 0;">
                    ${order.shipping && order.shipping > 0 ? `฿${formatPrice(order.shipping)}` : '<span style="color: #22C55E;">ฟรี!</span>'}
                  </td>
                </tr>
                <tr style="border-top: 1px solid #1F293D;">
                  <td style="color: #FFFFFF; font-size: 14px; font-weight: 900; padding: 10px 0 0 0;">ยอดชำระสุทธิ:</td>
                  <td align="right" style="color: #22C55E; font-size: 18px; font-weight: 900; padding: 10px 0 0 0;">
                    ฿${formatPrice(order.total)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- GENUINE QUALITY GUARANTEE BADGE -->
      <div style="padding: 14px 22px; background-color: #0E131E; border-bottom: 1px solid #161D2A;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="36" valign="middle">
              <span style="font-size: 26px;">🛡️</span>
            </td>
            <td valign="middle" style="padding-left: 10px;">
              <div style="font-size: 11.5px; font-weight: 800; color: #FFFFFF;">
                การรับประกันอะไหล่แท้ 100% ตรงรุ่นจาก MOTIX
              </div>
              <div style="font-size: 10.5px; color: #94A3B8; margin-top: 1px; line-height: 1.4;">
                หากสินค้าชำรุดจากการผลิตหรือไม่ตรงรุ่น สามารถเปลี่ยนหรือคืนเงินได้ภายใน 7 วันทำการ
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- PRIMARY STORE CTA & DIRECT ACCESS CHANNELS -->
      <div style="padding: 22px; text-align: center; background-color: #0A0D14; border-bottom: 1px solid #161D2A;">
        <div style="margin-bottom: 14px;">
          <a href="${productsLink}" 
             target="_blank"
             style="display: inline-block; background: linear-gradient(90deg, #E63946 0%, #C1121F 100%); color: #FFFFFF; text-decoration: none; font-size: 13.5px; font-weight: 800; padding: 12px 28px; border-radius: 25px; box-shadow: 0 6px 20px rgba(230, 57, 70, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
            🛒 เลือกซื้ออะไหล่ชิ้นอื่นเพิ่มเติม &rarr;
          </a>
        </div>

        <!-- 🌐 DUAL LINK STORE BOX (Localhost 3000 & Web Online) -->
        <div style="background: linear-gradient(135deg, #101522 0%, #080A10 100%); border: 1.5px solid #1E283C; border-radius: 12px; padding: 16px; margin: 14px 0; text-align: left;">
          <div style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">
            🌐 เลือกลิงก์เพื่อเปิดหน้าร้าน MOTIX ตามอุปกรณ์ที่คุณใช้งาน:
          </div>
          
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
            <tr>
              <td valign="top" style="padding-bottom: 8px;">
                <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                  💻 หากเปิดดูบนเครื่องคอมพิวเตอร์ของคุณ (Localhost):
                </div>
                <div style="margin-top: 2px;">
                  <a href="http://localhost:3000/#/products" target="_blank" style="color: #38BDF8; font-family: monospace; font-size: 12px; text-decoration: underline; font-weight: 700;">
                    http://localhost:3000/#/products
                  </a>
                  <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดรันในเซิร์ฟเวอร์ Local)</span>
                </div>
              </td>
            </tr>
            <tr>
              <td valign="top" style="padding-top: 6px; border-top: 1px dashed #1B2434;">
                <div style="font-size: 12px; font-weight: 800; color: #FFFFFF;">
                  📱 หากเปิดดูบนสมาร์ทโฟน หรือเบราว์เซอร์ออนไลน์:
                </div>
                <div style="margin-top: 2px;">
                  <a href="${homeLink}" target="_blank" style="color: #22C55E; font-family: monospace; font-size: 12px; text-decoration: underline; font-weight: 700; word-break: break-all;">
                    ${homeLink}
                  </a>
                  <span style="font-size: 10px; color: #94A3B8; margin-left: 6px;">(เปิดได้ทุกอุปกรณ์ ทุกที่)</span>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div style="font-size: 11px; color: #64748B;">
          ต้องการความช่วยเหลือเกี่ยวกับคำสั่งซื้อนี้? ทัก LINE Official: <strong style="color: #06C755;">@motix</strong> (บริการ 24 ชม.)
        </div>
      </div>

      <!-- FOOTER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 20px 22px; background-color: #05070B;">
        <tr>
          <td valign="top" width="50%" class="mobile-stack">
            <a href="${homeLink}" target="_blank" style="text-decoration: none; color: inherit;">
              <div style="font-family: 'Arial Black', Impact, sans-serif; font-size: 18px; font-weight: 900; color: #FFFFFF;">
                MOTI<span style="color: #E63946;">X</span>
              </div>
            </a>
            <p style="font-size: 10px; color: #94A3B8; margin: 4px 0 6px 0; line-height: 1.4;">
              ศูนย์รวมอะไหล่และอุปกรณ์ยานยนต์ออนไลน์ยุคใหม่ อะไหล่แท้ ครบ จบ พร้อมส่งด่วนทั่วไทย
            </p>
            <div style="font-size: 10.5px; color: #CBD5E1;">
              🌐 หน้าร้าน: <a href="${homeLink}" target="_blank" style="color: #38BDF8; font-weight: 700; text-decoration: underline;">${homeLink}</a>
            </div>
          </td>
          <td valign="top" width="50%" align="right" class="mobile-stack mobile-center" style="padding-top: 4px;">
            <div style="font-size: 10px; color: #64748B;">
              อีเมลฉบับนี้ส่งไปยัง: <span style="color: #94A3B8;">${customerEmail}</span>
            </div>
            <div style="font-size: 10px; color: #64748B; margin-top: 2px;">
              คำสั่งซื้ออ้างอิง: #${order.orderId}
            </div>
            <div style="margin-top: 6px;">
              <a href="${homeLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">หน้าแรก</a>
              <a href="${productsLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline; margin-right: 8px;">สินค้าทั้งหมด</a>
              <a href="${categoriesLink}" target="_blank" style="color: #94A3B8; font-size: 10px; text-decoration: underline;">หมวดหมู่อะไหล่</a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" style="padding-top: 14px; border-top: 1px solid #111622; margin-top: 10px;">
            <p style="color: #475569; font-size: 9px; margin: 0;">
              &copy; ${currentYear} MOTIX Automotive E-Commerce. All rights reserved. Keep Your Ride Moving.
            </p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
  `;
}
