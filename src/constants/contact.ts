// constants/contact.ts
export const SUPPORT_PHONE_DEFAULT = "08065916415";
export const SUPPORT_PHONE_FISTULA = "08065916427";

// ─── Dynamic phone number config ────────────────────────────────
// Any page NOT listed below falls back to SUPPORT_PHONE_DEFAULT.

// Cost pages → 08065916427
export const COST_PHONE = "08065916427";
const COST_PHONE_PAGES = [
  "/piles/piles-laser-treatment-cost-in-Bangalore",
  "/fistula/anal-fistula-surgery-cost-in-Bangalore",
];

// Special pages → 08065916418
export const SPECIAL_PHONE = "08065916418";
const SPECIAL_PHONE_PAGES = [
  "/best-pilonidal-sinus-treatment-in-bangalore",
  "/best-rectal-prolapse-treatment-in-bangalore",
  "/expert-pediatric-anal-care-treatment-in-bangalore",
];
// Whole sections (the page itself and every page under it) → 08065916418
const SPECIAL_PHONE_SECTIONS = ["/colorectal-cancer"];
// ────────────────────────────────────────────────────────────────

export const WHATSAPP_URL = "https://wa.me/919380498256?text=Hi%2C%20I%20need%20help%20booking%20an%20appointment.";

export const toTel = (phone: string) => `tel:${phone}`;

// Strip a trailing slash and ignore case so "/page/" and "/Page" still match "/page".
const normalizePath = (pathname: string) =>
  pathname.replace(/\/+$/, "").toLowerCase();

const matches = (pages: string[], path: string) =>
  pages.some((p) => p.toLowerCase() === path);

const inSection = (sections: string[], path: string) =>
  sections.some((s) => path === s || path.startsWith(`${s}/`));

export function getPhoneForPath(pathname?: string | null) {
  const path = normalizePath(pathname ?? "");
  if (matches(COST_PHONE_PAGES, path)) return COST_PHONE;
  if (matches(SPECIAL_PHONE_PAGES, path)) return SPECIAL_PHONE;
  if (inSection(SPECIAL_PHONE_SECTIONS, path)) return SPECIAL_PHONE;
  return SUPPORT_PHONE_DEFAULT;
}

// Mobile → call, desktop → WhatsApp.
export const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
