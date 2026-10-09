// Centralized API configuration that handles local/fullstack environments and GitHub Pages static hosting

// Live MOTIX GitHub Pages Web Store
export const LIVE_STORE_URL = 'https://pheeraphatth.github.io/MOTIX.V2';
export const CLOUD_BACKEND_URL = 'http://localhost:3000';

export const isStaticHosting = () => {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return (
    host.includes('github.io') ||
    host.includes('github') ||
    (!host.includes('run.app') && host !== 'localhost' && host !== '127.0.0.1')
  );
};

export const getApiBase = () => {
  if (isStaticHosting()) {
    return CLOUD_BACKEND_URL;
  }
  return '';
};

export const getApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (isStaticHosting()) {
    return `${CLOUD_BACKEND_URL}${cleanPath}`;
  }
  return cleanPath;
};

/**
 * Returns the exact base URL of the store (including GitHub Pages repository subpath if present)
 * e.g. "https://username.github.io/motix-store" or "https://ais-pre-...run.app"
 */
export const getStoreBaseUrl = () => {
  if (typeof window === 'undefined') {
    return LIVE_STORE_URL;
  }

  const origin = window.location.origin;
  // If running on localhost/dev, point email links to GitHub Pages store or current origin
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return LIVE_STORE_URL;
  }

  // Strip trailing slashes, index.html, and hashes
  const pathname = window.location.pathname
    .replace(/\/index\.html$/i, '')
    .replace(/\/+$/, '');

  return `${origin}${pathname}`;
};



