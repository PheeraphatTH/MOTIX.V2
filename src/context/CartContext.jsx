import React, { createContext, useContext, useState, useEffect } from 'react';
import { promotions } from '../data/promotions';

const CartContext = createContext(null);

// Pre-seeded demo members for presentation & testing
const DEFAULT_USERS = [
  {
    id: 'USR-001',
    name: 'สมชาย มั่นคง',
    email: 'somchai@motix.com',
    phone: '081-234-5678',
    password: 'password123',
    vehicleType: 'car',
    vehicleModel: 'Toyota Yaris ATIV 2023',
    tier: 'Gold Member',
    points: 350,
    registeredAt: '15 ม.ค. 2567',
  },
  {
    id: 'USR-002',
    name: 'อนันต์ สายซิ่ง',
    email: 'anan.biker@motix.com',
    phone: '089-876-5432',
    password: 'password123',
    vehicleType: 'motorcycle',
    vehicleModel: 'Honda CBR650R 2024',
    tier: 'Platinum Member',
    points: 820,
    registeredAt: '02 ก.พ. 2567',
  },
];

// Helper to sanitize an item into a uniform flat product structure
const sanitizeCartItem = (rawItem, selectedVehicleModel) => {
  if (!rawItem) return null;
  const p = rawItem.product || rawItem;
  const rawPrice = rawItem.price ?? p.price ?? 0;
  const price = Number(rawPrice);
  const quantity = Math.max(1, Number(rawItem.quantity) || 1);
  const id = rawItem.id || p.id || `item-${Math.random()}`;

  return {
    ...p,
    ...rawItem,
    id,
    name: rawItem.name || p.name || 'อะไหล่ MOTIX คุณภาพสูง',
    price: isNaN(price) ? 0 : price,
    oldPrice: Number(rawItem.oldPrice ?? p.oldPrice ?? 0),
    discount: Number(rawItem.discount ?? p.discount ?? 0),
    image: rawItem.image || p.image || '',
    brand: rawItem.brand || p.brand || 'MOTIX',
    sku: rawItem.sku || p.sku || 'MTX-PART',
    stock: Number(rawItem.stock ?? p.stock ?? 10),
    category: rawItem.category || p.category || 'อะไหล่ทั่วไป',
    compatibleVehicles: rawItem.compatibleVehicles || p.compatibleVehicles || [],
    quantity,
    vehicle: rawItem.vehicle || selectedVehicleModel || null,
    product: p, // Keep nested reference as well for full backwards compatibility
  };
};

export const CartProvider = ({ children }) => {
  // 1. Registered Users database in LocalStorage (No Backend Database Required)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('motix_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(u => u && typeof u === 'object' && u.email);
        }
      }
      localStorage.setItem('motix_registered_users', JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // 2. Active Logged-in User
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('motix_user');
      if (!saved) return null;
      let parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object') return null;

      // Extract values safely even if corrupted with nested objects from previous sessions
      let name = 'สมาชิก MOTIX';
      if (typeof parsed.name === 'string') {
        name = parsed.name;
      } else if (typeof parsed.name === 'object' && parsed.name !== null && typeof parsed.name.name === 'string') {
        name = parsed.name.name;
      }

      let email = 'member@motix.com';
      if (typeof parsed.email === 'string') {
        email = parsed.email;
      } else if (typeof parsed.email === 'object' && parsed.email !== null) {
        email = typeof parsed.email.email === 'string'
          ? parsed.email.email
          : (typeof parsed.email.name === 'string' ? parsed.email.name : 'member@motix.com');
      }

      let phone = '';
      if (typeof parsed.phone === 'string') {
        phone = parsed.phone;
      } else if (typeof parsed.phone === 'object' && parsed.phone !== null && typeof parsed.phone.phone === 'string') {
        phone = parsed.phone.phone;
      }

      let tier = typeof parsed.tier === 'string' ? parsed.tier : 'Gold Member';
      let points = typeof parsed.points === 'number' ? parsed.points : (Number(parsed.points) || 100);
      let vehicleModel = typeof parsed.vehicleModel === 'string' ? parsed.vehicleModel : '';
      let registeredAt = typeof parsed.registeredAt === 'string' ? parsed.registeredAt : 'สมาชิกทั่วไป';

      const cleanUser = {
        id: typeof parsed.id === 'string' ? parsed.id : 'USR-SAVED',
        name,
        email,
        phone,
        tier,
        points,
        vehicleModel,
        registeredAt,
      };

      // Immediately write back the clean user so subsequent loads never have corrupted nested objects
      localStorage.setItem('motix_user', JSON.stringify(cleanUser));
      return cleanUser;
    } catch {
      try { localStorage.removeItem('motix_user'); } catch {}
      return null;
    }
  });

  // 3. Vehicle Finder state
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    try {
      const saved = localStorage.getItem('motix_selected_vehicle');
      return saved ? JSON.parse(saved) : { type: 'car', brand: '', model: '', year: '' };
    } catch {
      return { type: 'car', brand: '', model: '', year: '' };
    }
  });

  // 4. Cart state (with automatic migration & sanity check)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('motix_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(item => sanitizeCartItem(item))
        .filter(item => item !== null);
    } catch {
      return [];
    }
  });

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('motix_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 7. Quick View modal product
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // 8. Toast Notification state
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('motix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('motix_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('motix_selected_vehicle', JSON.stringify(selectedVehicle));
  }, [selectedVehicle]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('motix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('motix_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('motix_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  // ================= CART OPERATIONS =================
  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const qty = Math.max(1, Number(quantity) || 1);
    const sanitized = sanitizeCartItem(product, selectedVehicle.model || null);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => String(item.id) === String(sanitized.id) || String(item.product?.id) === String(sanitized.id)
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const existingItem = newCart[existingIndex];
        const newQty = (Number(existingItem.quantity) || 0) + qty;
        newCart[existingIndex] = {
          ...existingItem,
          ...sanitized,
          quantity: newQty,
        };
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...sanitized,
            quantity: qty,
          },
        ];
      }
    });

    showToast(`เพิ่ม "${sanitized.name}" (${qty} ชิ้น) ลงในตะกร้าแล้ว!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prev =>
      prev.filter(
        item => String(item.id) !== String(productId) && String(item.product?.id) !== String(productId)
      )
    );
    showToast('ลบสินค้าออกจากตะกร้าเรียบร้อย', 'info');
  };

  const updateQuantity = (productId, newQty) => {
    const qty = Number(newQty);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (String(item.id) === String(productId) || String(item.product?.id) === String(productId)) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem('motix_cart');
  };

  // ================= WISHLIST OPERATIONS =================
  const toggleWishlist = (product) => {
    if (!product) return;
    const sanitized = sanitizeCartItem(product);
    setWishlist(prev => {
      const exists = prev.some(item => String(item.id) === String(sanitized.id));
      if (exists) {
        showToast(`นำ "${sanitized.name}" ออกจากรายการโปรดแล้ว`, 'info');
        return prev.filter(item => String(item.id) !== String(sanitized.id));
      } else {
        showToast(`บันทึก "${sanitized.name}" ในรายการโปรดแล้ว!`, 'success');
        return [...prev, sanitized];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => String(item.id) === String(productId));
  };

  // ================= VEHICLE FILTER =================
  const updateVehicleFilter = (filter) => {
    setSelectedVehicle(filter);
    if (filter.model) {
      showToast(`กรองอะไหล่ตรงรุ่นสำหรับ ${filter.brand} ${filter.model} (${filter.year || 'ทุกปี'})`, 'info');
    }
  };

  const clearVehicleFilter = () => {
    setSelectedVehicle({ type: 'car', brand: '', model: '', year: '' });
    showToast('ล้างตัวกรองรุ่นรถแล้ว แสดงอะไหล่ทั้งหมด', 'info');
  };

  // ================= COUPON OPERATIONS =================
  const applyCoupon = (code) => {
    if (!code) return { success: false, message: 'กรุณาระบุโค้ดส่วนลด' };
    const cleanCode = code.trim().toUpperCase();

    // Special welcome coupon for new members
    if (cleanCode === 'WELCOME100') {
      const welcomeCoupon = {
        code: 'WELCOME100',
        title: 'ส่วนลดต้อนรับสมาชิกใหม่ MOTIX',
        discount: 'ลด ฿100',
        discountAmount: 100,
        discountPercent: 0,
        minSpend: 500,
      };
      setAppliedCoupon(welcomeCoupon);
      showToast('ใช้โค้ดต้อนรับสมาชิกใหม่ WELCOME100 สำเร็จ! (ลด ฿100)', 'success');
      return { success: true, message: 'ใช้โค้ดสำเร็จ' };
    }

    const found = promotions.find(p => p.code === cleanCode);
    if (found) {
      setAppliedCoupon(found);
      showToast(`ใช้โค้ดส่วนลด "${found.code}" สำเร็จ! (${found.discount})`, 'success');
      return { success: true, message: 'ใช้โค้ดสำเร็จ' };
    } else {
      showToast('ไม่พบโค้ดส่วนลดนี้ หรือโค้ดหมดอายุ', 'error');
      return { success: false, message: 'โค้ดไม่ถูกต้อง' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('ยกเลิกโค้ดส่วนลดแล้ว', 'info');
  };

  // ================= CALCULATIONS =================
  const cartSubtotal = cart.reduce((sum, item) => {
    const p = Number(item.price ?? item.product?.price ?? 0);
    const q = Number(item.quantity) || 1;
    return sum + (isNaN(p) ? 0 : p * q);
  }, 0);

  const cartTotalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent > 0) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount > 0) {
      discountAmount = appliedCoupon.discountAmount;
    } else if (appliedCoupon.code === 'FREESHIP') {
      discountAmount = 0; // Free shipping handled below
    }
  }

  const shippingFee =
    cartSubtotal >= 1500 || appliedCoupon?.code === 'FREESHIP' || cartSubtotal === 0 ? 0 : 60;
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // ================= USER REGISTRATION & AUTH (LocalStorage - No DB) =================
  /**
   * Register a new member and save directly to localStorage (motix_registered_users)
   */
  const registerUser = ({ name, email, phone = '', password, vehicleType = 'car', vehicleModel = '' }) => {
    try {
      const cleanEmail = String(email || '').trim().toLowerCase();
      if (!cleanEmail) {
        return { success: false, message: 'กรุณาระบุอีเมลที่ถูกต้อง' };
      }

      // Check duplicate safely
      const existing = (registeredUsers || []).find(
        u => u?.email && String(u.email).toLowerCase() === cleanEmail
      );
      if (existing) {
        return {
          success: false,
          message: 'อีเมลนี้ถูกลงทะเบียนไว้แล้ว กรุณาเข้าสู่ระบบหรือใช้อีเมลอื่น',
        };
      }

      const newUser = {
        id: `USR-${Date.now()}`,
        name: String(name || 'สมาชิกใหม่').trim(),
        email: cleanEmail,
        phone: String(phone || '').trim(),
        password: String(password || ''),
        vehicleType,
        vehicleModel: String(vehicleModel || '').trim() || 'ยังไม่ได้ระบุ',
        tier: 'Gold Member',
        points: 100, // Welcome points
        coupons: ['WELCOME100'],
        registeredAt: new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      const updatedUsers = [newUser, ...(registeredUsers || [])];
      setRegisteredUsers(updatedUsers);
      setUser(newUser);

      // Write immediately to localStorage so data is NEVER lost even if user refreshes immediately
      try {
        localStorage.setItem('motix_registered_users', JSON.stringify(updatedUsers));
        localStorage.setItem('motix_user', JSON.stringify(newUser));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }

      // Auto-update selected vehicle if provided
      if (newUser.vehicleModel && newUser.vehicleModel !== 'ยังไม่ได้ระบุ') {
        setSelectedVehicle(prev => ({
          ...prev,
          type: vehicleType,
          model: newUser.vehicleModel,
        }));
      }

      showToast(`ยินดีต้อนรับคุณ ${newUser.name} สมัครสมาชิก MOTIX สำเร็จ! (+100 แต้ม)`, 'success');
      return { success: true, user: newUser };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง' };
    }
  };


  /**
   * Login user with email & password check against localStorage registered users
   */
  const loginUser = (credentials, optionalName) => {
    try {
      // If called with object { email, password }
      if (typeof credentials === 'object' && credentials !== null) {
        const email = String(credentials.email || '').trim().toLowerCase();
        const password = String(credentials.password || '');

        // Direct mock/demo login
        if (credentials.name && !credentials.password) {
          const demoUser = {
            id: `USR-${Date.now()}`,
            name: credentials.name,
            email: credentials.email || 'demo@motix.com',
            phone: credentials.phone || '081-234-5678',
            tier: 'Gold Member',
            points: credentials.points || 250,
            vehicleModel: 'Toyota Yaris ATIV 2023',
            registeredAt: 'สมาชิกทั่วไป',
          };
          setUser(demoUser);
          showToast(`ยินดีต้อนรับ ${demoUser.name} เข้าสู่ระบบ`, 'success');
          return { success: true, user: demoUser };
        }

        // Standard email/password check: read fresh directly from localStorage if available
        let usersList = Array.isArray(registeredUsers) ? registeredUsers : DEFAULT_USERS;
        try {
          const stored = localStorage.getItem('motix_registered_users');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              usersList = parsed;
            }
          }
        } catch {}

        const found = usersList.find(
          u => u?.email && String(u.email).toLowerCase().trim() === email && String(u.password) === password
        );

        if (found) {
          setUser(found);
          try {
            localStorage.setItem('motix_user', JSON.stringify(found));
          } catch {}
          showToast(`ยินดีต้อนรับคุณ ${found.name || 'สมาชิก'} เข้าสู่ระบบ`, 'success');
          return { success: true, user: found };
        } else {
          // Check if email exists but wrong password
          const emailExists = usersList.some(
            u => u?.email && String(u.email).toLowerCase().trim() === email
          );
          const errorMsg = emailExists ? 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' : 'ไม่พบบัญชีผู้ใช้นี้ กรุณาตรวจสอบอีเมลหรือสมัครสมาชิกใหม่';
          showToast(errorMsg, 'error');
          return { success: false, message: errorMsg };
        }
      }


      // Backwards compatible signature: loginUser(email, name)
      const emailStr = String(credentials || 'user@example.com');
      const nameStr = optionalName || 'คุณสมาชิก MOTIX';
      const fallbackUser = {
        id: 'USR-MOCK',
        name: nameStr,
        email: emailStr,
        phone: '081-234-5678',
        tier: 'Gold Member',
        points: 250,
        vehicleModel: 'Toyota Yaris ATIV 2023',
        registeredAt: 'สมาชิกทั่วไป',
      };
      setUser(fallbackUser);
      showToast(`ยินดีต้อนรับ ${nameStr} เข้าสู่ระบบ`, 'success');
      return { success: true, user: fallbackUser };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
  };

  const logoutUser = () => {
    setUser(null);
    showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        // Cart state & operations
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Prices & totals (providing both naming conventions for safety)
        cartSubtotal,
        cartDiscount: discountAmount,
        discountAmount,
        cartShipping: shippingFee,
        shippingFee,
        cartTotal: cartGrandTotal,
        cartGrandTotal,
        cartTotalItems,

        // Coupons
        appliedCoupon,
        applyCoupon,
        removeCoupon,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Vehicle Filter
        selectedVehicle,
        updateVehicleFilter,
        clearVehicleFilter,

        // Quick View
        quickViewProduct,
        setQuickViewProduct,

        // Member / Auth system (LocalStorage Database)
        user,
        registeredUsers,
        registerUser,
        loginUser,
        logoutUser,

        // Toast
        toast,
        showToast,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

