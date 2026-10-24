var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { Truck, BadgeIndianRupee, CalendarCheck, FileText, MapPin, Recycle, PackageCheck, Wallet, Smartphone, Menu, X, Phone, ArrowRight, Search, WalletCards, MapPinned, Plus, CalendarDays, Clock, CheckCircle2, ChevronRight, ShieldCheck, QrCode, BadgeCheck } from "lucide-react";
const siteConfig = {
  name: "Kabad Factory",
  domain: "https://www.kabadfactory.com",
  apiBaseUrl: "https://api.kabadfactory.com/api",
  //https://api.kabadfactory.com/api
  phone: "+91 8319060820",
  phonePlain: "918319060820",
  email: "contact@kabadfactory.com",
  address: "Thatipur, Gwalior, Madhya Pradesh, India",
  city: "Gwalior",
  region: "Madhya Pradesh",
  hours: "Mon-Sat: 9:00 AM - 8:00 PM",
  appDownloadUrl: "/app-coming-soon",
  assets: {
    heroBanner: "/assets/kabad-hero-banner.png",
    appMockup: "/assets/kabad-app-mockup.png",
    logo: "/assets/kabad-factory-logo.png"
  }
};
async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);
  const response = await fetch(`${siteConfig.apiBaseUrl}${path}`, {
    ...options,
    headers
  });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof data === "object" && data && "message" in data ? String(data.message) : "Something went wrong. Please try again.";
    throw new Error(message);
  }
  return data;
}
const AuthContext = createContext({
  session: null,
  loading: true,
  setSession: () => {
  },
  logout: () => {
  }
});
function AuthProvider({ children }) {
  const [session, setStoredSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const raw = localStorage.getItem("kabadFactorySession");
    if (!raw) {
      setLoading(false);
      return;
    }
    const parsed = JSON.parse(raw);
    apiFetch("/auth/me", { token: parsed.token }).then((response) => setStoredSession({ ...parsed, user: response.user })).catch(() => localStorage.removeItem("kabadFactorySession")).finally(() => setLoading(false));
  }, []);
  function setSession(next) {
    setStoredSession(next);
    if (next) localStorage.setItem("kabadFactorySession", JSON.stringify(next));
    else localStorage.removeItem("kabadFactorySession");
  }
  const value = useMemo(() => ({
    session,
    loading,
    setSession,
    logout: () => setSession(null)
  }), [loading, session]);
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  return useContext(AuthContext);
}
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/scrap-rates", label: "Scrap Rates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" }
];
const trustItems = [
  { icon: MapPin, title: "Check Your PIN", body: "Confirm pickup availability for your area before scheduling." },
  { icon: Recycle, title: "Select Your Scrap", body: "Choose paper, metal, plastic, appliances, or e-waste." },
  { icon: CalendarCheck, title: "Schedule Pickup", body: "Pick your saved address, date, and convenient time slot." },
  { icon: PackageCheck, title: "Weigh & Verify", body: "Scrap is checked and weighed during pickup." },
  { icon: Wallet, title: "Get Paid", body: "Final amount is calculated after verified pickup details." }
];
const scrapSlugs = [
  ["iron", "Iron", "Sell Iron Scrap in Gwalior", "iron rods, grills, mixed loha, machinery parts, and household metal scrap"],
  ["copper", "Copper", "Sell Copper Scrap in Gwalior", "copper wire, pipes, motors, coils, and clean copper material"],
  ["aluminium", "Aluminium", "Sell Aluminium Scrap in Gwalior", "aluminium utensils, profiles, sections, frames, and sheets"],
  ["newspaper", "Newspaper", "Sell Newspaper Scrap in Gwalior", "old newspapers, raddi paper, magazines, and paper bundles"],
  ["cardboard", "Cardboard", "Sell Cardboard Scrap in Gwalior", "cartons, packaging boxes, brown cardboard, and clean dry paperboard"],
  ["plastic", "Plastic", "Sell Plastic Scrap in Gwalior", "plastic bottles, containers, mixed plastic, and reusable household plastic"],
  ["e-waste", "E-Waste", "Sell E-Waste in Gwalior", "laptops, CPUs, wires, phones, batteries, and electronic scrap"],
  ["ac", "AC", "Sell AC Scrap in Gwalior", "window AC, split AC, copper coils, compressors, and AC bodies"],
  ["refrigerator", "Refrigerator", "Sell Refrigerator Scrap in Gwalior", "single-door fridges, double-door fridges, compressors, and appliance scrap"]
];
const serviceSlugs = [
  ["doorstep-scrap-pickup", "Doorstep Scrap Pickup", "Doorstep Scrap Pickup in Gwalior", "Schedule pickup from home and let a verified executive collect recyclable scrap from your address."],
  ["household-scrap-pickup", "Household Scrap Pickup", "Household Scrap Pickup in Gwalior", "Clear common home scrap with a simple online booking and verified doorstep collection."],
  ["bulk-scrap-pickup", "Bulk Scrap Pickup", "Bulk Scrap Pickup in Gwalior", "Plan large scrap pickups for homes, societies, shops, schools, and local businesses."],
  ["office-scrap-pickup", "Office Scrap Pickup", "Office Scrap Pickup in Gwalior", "Dispose of paper, e-waste, packaging, and office junk with a documented pickup flow."],
  ["commercial-scrap-pickup", "Commercial Scrap Pickup", "Commercial Scrap Pickup in Gwalior", "Coordinate recurring or one-time commercial scrap collection with transparent rates and billing."],
  ["e-waste-pickup", "E-Waste Pickup", "E-Waste Pickup in Gwalior", "Schedule responsible pickup for wires, small electronics, computers, and other accepted e-waste."]
];
const commonFaqs = [
  {
    question: "How do I sell scrap online in Gwalior?",
    answer: "Check your PIN code, select scrap items, choose a pickup date and time, then schedule the request. Kabad Factory confirms the pickup and an executive visits your address."
  },
  {
    question: "Are scrap rates fixed?",
    answer: "Rates are managed from the Kabad Factory backend and may change with market conditions, scrap quality, and quantity. The website reads current rates from the same database used by the app."
  },
  {
    question: "How is pickup charge calculated?",
    answer: "The backend checks the customer's pickup PIN code against active store PIN codes, applies the configured distance slabs and the 5 km buffer rule, then stores the charge snapshot on the order."
  },
  {
    question: "When do I receive payment?",
    answer: "After the executive weighs and confirms collected scrap, the final payable amount is calculated and payment is completed according to the order workflow."
  }
];
const routes = [
  {
    path: "/",
    label: "Home",
    kind: "home",
    seo: {
      title: "Sell Scrap Online in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
      description: "Sell scrap online in Gwalior with Kabad Factory. Check pickup availability, view today's scrap rates, schedule doorstep scrap pickup, and track orders online.",
      canonical: "/"
    },
    h1: "Sell Scrap Online in Gwalior",
    faqs: commonFaqs
  },
  {
    path: "/about",
    label: "About",
    kind: "content",
    seo: {
      title: "About Kabad Factory | Online Scrap Pickup & Recycling in Gwalior",
      description: "Learn how Kabad Factory makes online scrap pickup and recycling in Gwalior simple with doorstep pickup, transparent scrap rates, saved addresses, and app-based order tracking.",
      canonical: "/about"
    },
    h1: "About Kabad Factory",
    intro: "A cleaner, simpler way for Gwalior homes and businesses to sell recyclables from the doorstep.",
    sections: [
      { title: "Effortless Doorstep Pickup", body: "Schedule pickup from your home without carrying paper, metal, plastic, electronics, or household scrap to a local dealer." },
      { title: "Transparent Scrap Rates", body: "View current prices and understand how your scrap value is calculated before the executive confirms final weight." },
      { title: "Digital Convenience", body: "Manage pickups, saved addresses, order history, and account details through the website or Kabad Factory mobile app." },
      { title: "Responsible Recycling", body: "Help keep recyclable material out of waste streams and put useful scrap back into productive circulation." }
    ]
  },
  {
    path: "/pickup-services",
    label: "Pickup Services",
    kind: "servicesIndex",
    seo: {
      title: "Pickup Services in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
      description: "Explore Kabad Factory pickup services for household scrap, bulk scrap, office scrap, commercial scrap, e-waste and serviceable PIN areas in Gwalior.",
      canonical: "/pickup-services"
    },
    h1: "Pickup Services",
    intro: "Understand what Kabad Factory collects, where pickup is currently available, and how to check serviceability before booking.",
    faqs: commonFaqs
  },
  {
    path: "/contact",
    label: "Contact",
    kind: "content",
    seo: {
      title: "Contact Kabad Factory Gwalior | Scrap Pickup Support",
      description: "Contact Kabad Factory for doorstep scrap pickup, bulk scrap collection, rates, orders, and customer support in Gwalior.",
      canonical: "/contact"
    },
    h1: "Contact Kabad Factory",
    intro: `${siteConfig.phone} | ${siteConfig.email} | ${siteConfig.address}`,
    sections: [
      { title: "Call or WhatsApp", body: `For pickup help, call ${siteConfig.phone} or use WhatsApp support during business hours.` },
      { title: "Service Area", body: "Kabad Factory currently focuses on Gwalior and nearby serviceable PIN codes configured in the backend." }
    ]
  },
  {
    path: "/how-it-works",
    label: "How It Works",
    kind: "content",
    seo: {
      title: "How Scrap Pickup Works | Kabad Factory Gwalior",
      description: "See how to check your PIN code, select scrap items, choose a pickup slot, and receive transparent payment with Kabad Factory.",
      canonical: "/how-it-works"
    },
    h1: "How Doorstep Scrap Pickup Works",
    sections: [
      { title: "1. Check Pickup Availability", body: "Enter your PIN code so the backend can verify serviceability and pickup charge using configured stores and charge slabs." },
      { title: "2. Select Scrap Items", body: "Choose paper, metal, plastic, appliance, or e-waste categories and add an estimated weight." },
      { title: "3. Schedule a Slot", body: "Login or register, select address, date and time, then create the pickup request." },
      { title: "4. Weigh, Pay, and Bill", body: "The executive records actual weights, final payable amount, payment status, and bill details." }
    ]
  },
  {
    path: "/scrap-rates",
    label: "Scrap Rates",
    kind: "rates",
    seo: {
      title: "Today's Scrap Rates in Gwalior | Kabad Factory",
      description: "Check current scrap rates in Gwalior for newspaper, iron, copper, aluminium, plastic, cardboard, e-waste, AC and more.",
      canonical: "/scrap-rates"
    },
    h1: "Today's Scrap Rates in Gwalior",
    faqs: commonFaqs
  },
  {
    path: "/schedule-pickup",
    label: "Schedule Pickup",
    kind: "schedule",
    seo: {
      title: "Schedule Scrap Pickup Online in Gwalior | Kabad Factory",
      description: "Book a doorstep scrap pickup online with Kabad Factory using the same secure backend as the mobile app.",
      canonical: "/schedule-pickup"
    },
    h1: "Schedule Scrap Pickup"
  },
  {
    path: "/app-coming-soon",
    label: "App Coming Soon",
    kind: "appComingSoon",
    seo: {
      title: "Kabad Factory Mobile App Coming Soon",
      description: "The Kabad Factory Android and iOS mobile apps are currently under development.",
      canonical: "/app-coming-soon"
    },
    h1: "Our Mobile App Is Coming Soon!"
  },
  {
    path: "/gwalior",
    label: "Gwalior",
    kind: "city",
    seo: {
      title: "Online Kabadiwala in Gwalior | Sell Kabad Online | Kabad Factory",
      description: "Kabad Factory helps Gwalior customers sell scrap online, check rates, verify PIN serviceability, and book doorstep pickup.",
      canonical: "/gwalior"
    },
    h1: "Online Kabadiwala in Gwalior",
    intro: "A local-first page for customers searching kabadiwala near me, raddi wala near me, or doorstep scrap pickup in Gwalior.",
    faqs: commonFaqs
  },
  {
    path: "/gwalior/scrap-rates",
    label: "Gwalior Scrap Rates",
    kind: "rates",
    seo: {
      title: "Scrap Rates Gwalior | Live Kabad Rates | Kabad Factory",
      description: "View current Gwalior scrap rates from the Kabad Factory backend and schedule a pickup from serviceable PIN codes.",
      canonical: "/gwalior/scrap-rates"
    },
    h1: "Scrap Rates Gwalior"
  },
  {
    path: "/blog",
    label: "Blog",
    kind: "blog",
    seo: {
      title: "Scrap Selling Guides | Kabad Factory Blog",
      description: "Helpful guides about selling scrap, preparing recyclable material, checking rates, and booking pickup in Gwalior.",
      canonical: "/blog"
    },
    h1: "Scrap Selling Guides"
  },
  {
    path: "/faq",
    label: "FAQ",
    kind: "faq",
    seo: {
      title: "Kabad Factory FAQ | Scrap Pickup Questions",
      description: "Answers about Kabad Factory scrap pickup, rates, pickup charges, orders, payment, and support.",
      canonical: "/faq"
    },
    h1: "Frequently Asked Questions",
    faqs: commonFaqs
  },
  {
    path: "/login",
    label: "Login",
    kind: "auth",
    noSitemap: true,
    seo: {
      title: "Login | Kabad Factory",
      description: "Login to your Kabad Factory account.",
      canonical: "/login",
      noindex: true
    }
  },
  {
    path: "/register",
    label: "Register",
    kind: "auth",
    noSitemap: true,
    seo: {
      title: "Register | Kabad Factory",
      description: "Create a Kabad Factory account.",
      canonical: "/register",
      noindex: true
    }
  },
  {
    path: "/account",
    label: "Account",
    kind: "account",
    noSitemap: true,
    seo: {
      title: "Account | Kabad Factory",
      description: "Manage your Kabad Factory account.",
      canonical: "/account",
      noindex: true
    }
  },
  {
    path: "/orders",
    label: "Orders",
    kind: "account",
    noSitemap: true,
    seo: {
      title: "Orders | Kabad Factory",
      description: "View your Kabad Factory pickup orders.",
      canonical: "/orders",
      noindex: true
    }
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    kind: "legal",
    seo: {
      title: "Privacy Policy | Kabad Factory",
      description: "Read Kabad Factory privacy practices for customer data, pickup orders, support requests, and account information.",
      canonical: "/privacy-policy"
    },
    h1: "Privacy Policy"
  },
  {
    path: "/terms",
    label: "Terms",
    kind: "legal",
    seo: {
      title: "Terms and Conditions | Kabad Factory",
      description: "Read Kabad Factory service terms for scrap pickup, rates, payment, pickup charges, and account usage.",
      canonical: "/terms"
    },
    h1: "Terms and Conditions"
  }
];
scrapSlugs.forEach(([slug, label, h1, accepts]) => {
  routes.push({
    path: `/sell-scrap/${slug}`,
    label,
    kind: "scrap",
    category: label,
    seo: {
      title: `${h1} | Today's Rates & Doorstep Pickup | Kabad Factory`,
      description: `${h1} with Kabad Factory. Check current ${label.toLowerCase()} scrap rate, pickup availability, charges, accepted material and online scheduling.`,
      canonical: `/sell-scrap/${slug}`
    },
    h1,
    intro: `Book doorstep pickup for ${accepts} in Gwalior with current database-backed rates.`,
    sections: [
      { title: `What ${label} Scrap We Accept`, body: accepts },
      { title: "How Pricing Works", body: "Current rates come from the Kabad Factory backend. Final payment uses executive-confirmed actual weight and saved rate snapshots." },
      { title: "Pickup Charges", body: "Pickup charge is calculated by the backend from your pickup PIN code and nearest active store, including the 5 km buffer rule." }
    ],
    faqs: commonFaqs
  });
});
serviceSlugs.forEach(([slug, label, h1, intro]) => {
  routes.push({
    path: `/services/${slug}`,
    label,
    kind: "service",
    seo: {
      title: `${h1} | Kabad Factory`,
      description: `${intro} Check PIN availability, rates, and schedule online with Kabad Factory.`,
      canonical: `/services/${slug}`
    },
    h1,
    intro,
    sections: [
      { title: "Who It Is For", body: "Homes, shops, offices, societies, and businesses that want organized pickup and transparent settlement." },
      { title: "What You Can Track", body: "Pickup status, selected items, pickup charge, final payable amount, and downloadable bill after completion." },
      { title: "Start Online", body: "Use the PIN checker and schedule form to create a pickup request directly on the website." }
    ],
    faqs: commonFaqs
  });
});
routes.filter((route) => !route.noSitemap && route.kind !== "notFound");
const quickActions = [
  { href: "/pickup-services", title: "Doorstep Pickup", body: "Household, office and bulk collection", icon: Truck },
  { href: "/scrap-rates", title: "Transparent Rates", body: "Check latest scrap prices", icon: BadgeIndianRupee },
  { href: "/schedule-pickup", title: "Easy Scheduling", body: "Book a date and time online", icon: CalendarCheck },
  { href: "/orders", title: "Order Tracking", body: "Track pickup status and charges", icon: FileText }
];
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.domain,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thatipur",
    addressLocality: "Gwalior",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN"
  },
  areaServed: ["Gwalior", "Madhya Pradesh"],
  openingHours: "Mo-Sa 09:00-20:00",
  sameAs: [siteConfig.domain]
};
function absoluteUrl(path = "/") {
  return `${siteConfig.domain}${path === "/" ? "" : path}`;
}
function seoTags(route) {
  const canonical = absoluteUrl(route.seo.canonical);
  const robots = route.seo.noindex ? "noindex,nofollow" : "index,follow";
  const schema = route.kind === "home" ? businessSchema : breadcrumbSchema(route);
  return [
    `<title>${escapeHtml(route.seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.seo.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(route.seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.seo.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${siteConfig.name}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`
  ].join("\n    ");
}
function breadcrumbSchema(route) {
  const parts = route.path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: siteConfig.domain }];
  let current = "";
  parts.forEach((part) => {
    current += `/${part}`;
    items.push({
      name: part.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "),
      item: absoluteUrl(current)
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char] || char);
}
const emptyAddressDraft = {
  fullName: "",
  mobile: "",
  label: "home",
  line1: "",
  line2: "",
  landmark: "",
  city: siteConfig.city,
  state: siteConfig.region,
  pincode: "",
  isDefault: true
};
const weightRanges = ["0-10 kg", "10-30 kg", "30-50 kg", "50-200 kg", "More than 200 kg"];
const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 2:00 PM", "2:00 PM - 5:00 PM", "5:00 PM - 8:00 PM"];
function App({ initialPath }) {
  const [path, setPath] = useState(initialPath || getBrowserPath());
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => setPath(getBrowserPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  function navigate(nextPath) {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", nextPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPath(nextPath);
  }
  const routePath = pathOnly(path);
  const route = routes.find((item) => item.path === routePath) || notFoundRoute;
  return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(SiteFrame, { route, navigate, children: /* @__PURE__ */ jsx(PageRouter, { route, navigate, currentPath: path }) }) });
}
function SiteFrame({ route, navigate, children }) {
  const [open, setOpen] = useState(false);
  const { session, logout } = useAuth();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("a", { className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2", href: "#main", children: "Skip to content" }),
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 border-b border-line bg-white shadow-sm lg:bg-white/[0.92] lg:shadow-none lg:backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "container-page flex min-h-[68px] items-center justify-between gap-3 sm:min-h-[76px] sm:gap-5", children: [
        /* @__PURE__ */ jsxs("a", { href: "/", onClick: (event) => linkClick(event, "/", navigate), className: "flex min-w-0 items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-12 w-36 shrink-0 items-center justify-center rounded-lg bg-white px-1 sm:h-14 sm:w-40 xl:w-44", children: /* @__PURE__ */ jsx("img", { src: siteConfig.assets.logo, alt: "Kabad Factory", className: "h-full w-full object-contain" }) }),
          /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
            /* @__PURE__ */ jsx("strong", { className: "block text-lg leading-5 text-ink", children: "Kabad Factory" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-brand-700", children: "Innovators of Recycling" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-5 text-[0.85rem] font-bold text-muted xl:flex", children: navLinks.map((link) => /* @__PURE__ */ jsx("a", { href: link.href, onClick: (event) => linkClick(event, link.href, navigate), className: `nav-link hover:text-ink ${route.path === link.href ? "text-ink" : ""}`, children: link.label }, link.href)) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-2 lg:flex", children: [
          /* @__PURE__ */ jsxs("a", { href: siteConfig.appDownloadUrl, className: "inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50", children: [
            /* @__PURE__ */ jsx(Smartphone, { size: 16 }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "hidden 2xl:inline", children: "Get the App" }),
            /* @__PURE__ */ jsx("span", { className: "2xl:hidden", children: "App" })
          ] }),
          session ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("a", { href: "/account", onClick: (event) => linkClick(event, "/account", navigate), className: "rounded-full border border-line bg-white px-4 py-2 text-sm font-extrabold text-ink hover:border-brand-200 hover:bg-brand-50", children: "Account" }),
            /* @__PURE__ */ jsx("button", { onClick: logout, className: "rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink", children: "Logout" })
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("a", { href: "/login", onClick: (event) => linkClick(event, "/login", navigate), className: "rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink", children: "Login" }) }),
          /* @__PURE__ */ jsx("a", { href: "/schedule-pickup", onClick: (event) => linkClick(event, "/schedule-pickup", navigate), className: "rounded-full bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lift", children: "Schedule Pickup" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "shrink-0 rounded-xl border border-line bg-white p-2 text-ink shadow-sm lg:hidden", onClick: () => setOpen(true), "aria-label": "Open menu", children: /* @__PURE__ */ jsx(Menu, {}) })
      ] }),
      open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-ink/55 lg:hidden", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "ml-auto flex h-full w-80 max-w-[88vw] flex-col gap-2 overflow-y-auto border-l border-brand-100 bg-white p-5 text-ink shadow-2xl", onClick: (event) => event.stopPropagation(), children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-12 w-36 items-center rounded-lg bg-white px-1", children: /* @__PURE__ */ jsx("img", { src: siteConfig.assets.logo, alt: "Kabad Factory", className: "h-full w-full object-contain" }) }),
          /* @__PURE__ */ jsx("button", { className: "rounded-xl border border-line bg-white p-2 text-ink shadow-sm", onClick: () => setOpen(false), "aria-label": "Close menu", children: /* @__PURE__ */ jsx(X, {}) })
        ] }),
        [...navLinks, { href: siteConfig.appDownloadUrl, label: "Get the App" }, { href: session ? "/account" : "/login", label: session ? "Account" : "Login" }].map((link) => /* @__PURE__ */ jsx("a", { href: link.href, onClick: (event) => {
          linkClick(event, link.href, navigate);
          setOpen(false);
        }, className: "rounded-xl px-3 py-3 font-extrabold text-ink hover:bg-brand-50", children: link.label }, link.href)),
        /* @__PURE__ */ jsx("a", { href: "/schedule-pickup", onClick: (event) => {
          linkClick(event, "/schedule-pickup", navigate);
          setOpen(false);
        }, className: "mt-3 rounded-full bg-brand-600 px-5 py-3 text-center font-extrabold text-white shadow-soft", children: "Schedule Pickup" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("main", { id: "main", children }),
    /* @__PURE__ */ jsx(Footer, { navigate, current: route.path })
  ] });
}
function PageRouter({ route, navigate, currentPath }) {
  if (route.kind === "home") return /* @__PURE__ */ jsx(HomePage, { navigate });
  if (route.kind === "rates") return /* @__PURE__ */ jsx(RatesPage, { route, navigate });
  if (route.kind === "schedule") return /* @__PURE__ */ jsx(SchedulePickupPage, { navigate });
  if (route.kind === "appComingSoon") return /* @__PURE__ */ jsx(AppComingSoonPage, { navigate });
  if (route.kind === "auth") return /* @__PURE__ */ jsx(AuthPage, { mode: route.path === "/register" ? "register" : "login", navigate, currentPath });
  if (route.kind === "account") return /* @__PURE__ */ jsx(AccountPage, { route, navigate });
  if (route.kind === "scrap") return /* @__PURE__ */ jsx(ScrapPage, { route, navigate });
  if (route.kind === "servicesIndex") return /* @__PURE__ */ jsx(PickupServicesPage, { route, navigate });
  if (route.kind === "service") return /* @__PURE__ */ jsx(ContentPage, { route, navigate });
  if (route.kind === "city") return /* @__PURE__ */ jsx(CityPage, { route, navigate });
  if (route.kind === "blog") return /* @__PURE__ */ jsx(BlogPage, { navigate });
  if (route.kind === "faq") return /* @__PURE__ */ jsx(FaqPage, { route });
  if (route.kind === "legal") return /* @__PURE__ */ jsx(LegalPage, { route });
  if (route.kind === "content") return /* @__PURE__ */ jsx(ContentPage, { route, navigate });
  return /* @__PURE__ */ jsx(NotFound, { navigate });
}
function HomePage({ navigate }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden bg-ink text-white", children: [
      /* @__PURE__ */ jsx("picture", { children: /* @__PURE__ */ jsx("img", { src: siteConfig.assets.heroBanner, alt: "", className: "absolute inset-0 -z-20 h-full w-full object-cover", loading: "eager", fetchPriority: "high" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/86 to-ink/36" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container-page grid min-h-[690px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.86fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "reveal-up", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-brand-100 backdrop-blur", children: [
            /* @__PURE__ */ jsx(MapDot, {}),
            " Doorstep scrap pickup in Gwalior"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl", children: "Sell Your Scrap the Smarter Way with Kabad Factory" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-2xl text-xl font-extrabold leading-8 text-brand-100", children: "Kabad hai? Raddi hai? Fenkna nahi — Kabad Factory ko bechna hai!" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-lg leading-8 text-white/84", children: "Check the latest scrap rates, schedule doorstep pickup and manage your pickups easily — all from one convenient platform." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsx("a", { href: "#pin-checker", className: "focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-6 py-3 font-black text-brand-700", children: "Check Pickup Availability" }),
            /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/schedule-pickup"), className: "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700", children: [
              "Schedule Pickup ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
            ] }),
            /* @__PURE__ */ jsx("a", { href: siteConfig.appDownloadUrl, className: "focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-black text-white backdrop-blur", children: "Get the App" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-9 grid max-w-2xl grid-cols-3 gap-3 text-sm text-white/74", children: ["Transparent rates", "Digital weighing", "Order tracking"].map((item) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/15 bg-white/10 px-3 py-2 text-center font-bold backdrop-blur", children: item }, item)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "glass-panel reveal-up reveal-delay rounded-card border border-white/20 p-5 text-ink shadow-lift sm:p-7 lg:justify-self-end", children: /* @__PURE__ */ jsx(PinChecker, { onSchedule: () => navigate("/schedule-pickup") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(QuickActions, { navigate }),
    /* @__PURE__ */ jsx(RatesPreview, { navigate }),
    /* @__PURE__ */ jsx(ScrapCategoriesGrid, { navigate }),
    /* @__PURE__ */ jsx(HowItWorks, {}),
    /* @__PURE__ */ jsx(PickupServicesTeaser, { navigate }),
    /* @__PURE__ */ jsx(WhyChoose, {}),
    /* @__PURE__ */ jsx(AppDownloadSection, { navigate }),
    /* @__PURE__ */ jsx(BrandStory, { navigate }),
    /* @__PURE__ */ jsx(BusinessPickup, { navigate }),
    /* @__PURE__ */ jsx(FaqSection, {}),
    /* @__PURE__ */ jsx(FinalCta, { navigate })
  ] });
}
function PinChecker({ onSchedule }) {
  var _a2, _b;
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  async function check() {
    const pin = pincode.replace(/\D/g, "").slice(0, 6);
    setPincode(pin);
    if (!/^\d{6}$/.test(pin)) {
      setError("Enter a valid 6 digit PIN code.");
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch(`/serviceability/pincode?pincode=${pin}`);
      setResult(response);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unable to check pickup availability right now.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("section", { id: "pin-checker", "aria-labelledby": "pin-heading", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700", children: /* @__PURE__ */ jsx(Search, {}) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { id: "pin-heading", className: "text-xl font-black text-ink", children: "Pickup Availability Checker" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted", children: "Enter your PIN to check local pickup availability." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsx("input", { value: pincode, onChange: (event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", maxLength: 6, placeholder: "Enter PIN code", className: "focus-ring min-h-12 flex-1 rounded-2xl border border-brand-100 bg-brand-50 px-4 font-bold text-ink" }),
      /* @__PURE__ */ jsx("button", { onClick: check, disabled: loading, className: "focus-ring rounded-2xl bg-ink px-5 py-3 font-black text-white disabled:opacity-60", children: loading ? "Checking..." : "Check" })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700", children: error }),
    (result == null ? void 0 : result.serviceable) && /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-brand-200 bg-brand-50 p-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 font-black text-brand-700", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 19 }),
        " Pickup available"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted", children: Number(((_a2 = result.data) == null ? void 0 : _a2.pickupCharge) || 0) > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Pickup Charge: ",
        /* @__PURE__ */ jsxs("strong", { className: "text-ink", children: [
          "₹",
          Number((_b = result.data) == null ? void 0 : _b.pickupCharge).toFixed(0)
        ] })
      ] }) : /* @__PURE__ */ jsx("strong", { className: "text-ink", children: "Free Pickup" }) }),
      /* @__PURE__ */ jsxs("button", { onClick: onSchedule, className: "mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-black text-white", children: [
        "Schedule Pickup ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
      ] })
    ] })
  ] });
}
function RatesPreview({ navigate }) {
  const { categories, loading } = useCategories();
  const preview = categories.slice(0, 6);
  return /* @__PURE__ */ jsxs("section", { className: "container-page py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-5 md:flex-row md:items-end", children: [
      /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Latest rates", title: "Today's Scrap Rates in Gwalior", body: "See current prices before you schedule. Rates are loaded from the Kabad Factory backend." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/scrap-rates"), className: "inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-5 py-3 font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50", children: [
        "View All Rates ",
        /* @__PURE__ */ jsx(ChevronRight, { size: 17 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: (loading ? Array.from({ length: 6 }) : preview).map((item, index) => /* @__PURE__ */ jsxs("div", { className: "card group flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-black text-ink", children: isCategory(item) ? item.name : "Loading rate" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted", children: "Current listed rate" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-brand-700", children: isCategory(item) ? formatRate(item) : "--" })
    ] }, index)) })
  ] });
}
function QuickActions({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page -mt-12 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: quickActions.map(({ href, title, body, icon: Icon }) => /* @__PURE__ */ jsxs("button", { onClick: () => navigate(href), className: "card group flex min-h-32 items-center gap-4 p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", children: [
    /* @__PURE__ */ jsx("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white", children: /* @__PURE__ */ jsx(Icon, {}) }),
    /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("strong", { className: "block text-base text-ink", children: title }),
      /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm text-muted", children: body })
    ] })
  ] }, href)) }) });
}
function RatesPage({ route, navigate }) {
  const { categories, loading, error, reload } = useCategories();
  const [search, setSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const availableMaterials = MATERIAL_CATEGORY_ORDER;
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return categories.filter(
      (item) => (selectedMaterial === "All" || materialCategory(item) === selectedMaterial) && (!query || item.name.toLocaleLowerCase().includes(query))
    );
  }, [categories, search, selectedMaterial]);
  const groupedCategories = useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    filteredCategories.forEach((item) => {
      const material = materialCategory(item);
      groups.set(material, [...groups.get(material) || [], item]);
    });
    return (selectedMaterial === "All" ? availableMaterials : [selectedMaterial]).map((material) => ({ material, items: groups.get(material) || [] })).filter((group) => group.items.length > 0);
  }, [availableMaterials, filteredCategories, selectedMaterial]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { route }),
    /* @__PURE__ */ jsxs("section", { className: "container-page pb-16", children: [
      error && /* @__PURE__ */ jsx(RetryBox, { message: error, onRetry: reload }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsxs("label", { className: "relative block", children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search scrap materials" }),
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-brand-700", size: 22 }),
          /* @__PURE__ */ jsx("input", { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search any materials...", className: "focus-ring min-h-16 w-full rounded-2xl border border-brand-100 bg-white py-4 pl-14 pr-12 text-base font-semibold text-ink shadow-soft placeholder:text-muted" }),
          search && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSearch(""), className: "focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-muted hover:bg-brand-50 hover:text-ink", "aria-label": "Clear search", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 flex gap-2 overflow-x-auto pb-2", "aria-label": "Material categories", children: ["All", ...availableMaterials].map((material) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedMaterial(material), className: `focus-ring shrink-0 rounded-full px-5 py-2.5 text-sm font-extrabold transition ${selectedMaterial === material ? "bg-brand-600 text-white shadow-soft" : "bg-slate-100 text-ink hover:bg-brand-50"}`, children: material }, material)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: "Current rates" }),
          /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-black text-ink sm:text-4xl", children: selectedMaterial === "All" ? "Scrap Items" : `${selectedMaterial} Scrap Items` })
        ] }),
        loading ? /* @__PURE__ */ jsx(RatesLoadingCards, {}) : groupedCategories.length ? /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-10", children: groupedCategories.map((group) => /* @__PURE__ */ jsxs("section", { "aria-labelledby": `material-${group.material}`, children: [
          /* @__PURE__ */ jsx("h2", { id: `material-${group.material}`, className: "mb-4 text-xl font-black text-ink", children: group.material }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: group.items.map((item) => /* @__PURE__ */ jsx(ScrapRateCard, { item }, item.id)) })
        ] }, group.material)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-card border border-dashed border-brand-200 bg-brand-50 p-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "font-black text-ink", children: "No scrap items match your search." }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted", children: "Try another material name or clear the search." }),
          search && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSearch(""), className: "mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm font-black text-white", children: "Clear search" })
        ] })
      ] })
    ] })
  ] });
}
function AppComingSoonPage({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page flex min-h-[calc(100vh-76px)] items-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid w-full max-w-5xl overflow-hidden rounded-card border border-brand-100 bg-white shadow-lift lg:grid-cols-[1fr_0.9fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-12", children: [
      /* @__PURE__ */ jsx("img", { src: siteConfig.assets.logo, alt: "Kabad Factory", className: "h-16 w-52 object-contain object-left" }),
      /* @__PURE__ */ jsx("p", { className: "mt-10 text-sm font-black uppercase tracking-wide text-brand-700", children: "Kabad Factory app" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl", children: "Our Mobile App Is Coming Soon!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-lg leading-8 text-muted", children: "We're working on a better way to manage your scrap pickups. Our mobile app is coming soon." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700", children: "Android in development" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-ink", children: "iOS in development" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => navigate("/"), className: "rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft", children: "Return to homepage" }),
        /* @__PURE__ */ jsx("a", { href: `mailto:${siteConfig.email}`, className: "rounded-full border border-brand-100 px-6 py-3 text-center font-black text-brand-700", children: "Contact support" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-72 items-center justify-center overflow-hidden bg-brand-50 p-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.25),_transparent_55%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative grid h-56 w-36 place-items-center rounded-[2.5rem] border-8 border-ink bg-white shadow-lift", children: [
        /* @__PURE__ */ jsx(Recycle, { size: 68, className: "text-brand-600" }),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-7 text-xs font-black text-brand-700", children: "RECYCLE" })
      ] }),
      /* @__PURE__ */ jsx(Smartphone, { className: "absolute bottom-10 right-10 text-brand-700/30", size: 88, "aria-hidden": "true" })
    ] })
  ] }) });
}
const MATERIAL_CATEGORY_ORDER = ["Paper", "Plastic", "Metal", "E-waste", "Glass", "Rubber", "Other", "Textile"];
function materialCategory(item) {
  return MATERIAL_CATEGORY_ORDER.includes(item.category || "") ? item.category : "Other";
}
function ScrapRateCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false);
  return /* @__PURE__ */ jsxs("article", { className: "flex min-h-32 items-center gap-4 rounded-card bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-soft", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-brand-700 shadow-sm", children: item.iconUrl && !imageFailed ? /* @__PURE__ */ jsx("img", { src: item.iconUrl, alt: "", className: "h-full w-full object-cover", onError: () => setImageFailed(true) }) : /* @__PURE__ */ jsx(Recycle, { size: 28, "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "truncate font-black text-ink", title: item.name, children: item.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-black text-brand-700", children: formatRate(item) })
    ] })
  ] });
}
function RatesLoadingCards() {
  return /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-32 animate-pulse rounded-card bg-brand-50" }, index)) });
}
function SchedulePickupPage({ navigate }) {
  const { session } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [weightRange, setWeightRange] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState(emptyAddressDraft);
  const [addressErrors, setAddressErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [pickupCharge, setPickupCharge] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successCharge, setSuccessCharge] = useState(null);
  const [successBooking, setSuccessBooking] = useState(null);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const activeCategories = useMemo(() => categories.filter((item) => item.isActive !== false && item.status !== "Hidden"), [categories]);
  const availableMaterials = MATERIAL_CATEGORY_ORDER;
  const visibleCategories = useMemo(() => {
    const query = itemSearch.trim().toLocaleLowerCase();
    return activeCategories.filter((item) => (selectedMaterial === "All" || materialCategory(item) === selectedMaterial) && (!query || item.name.toLocaleLowerCase().includes(query)));
  }, [activeCategories, itemSearch, selectedMaterial]);
  const visibleGroups = useMemo(() => selectedMaterial === "All" ? availableMaterials.map((material) => ({ material, items: visibleCategories.filter((item) => materialCategory(item) === material) })).filter((group) => group.items.length) : [{ material: selectedMaterial, items: visibleCategories }], [availableMaterials, selectedMaterial, visibleCategories]);
  const selectedAddress = addresses.find((item) => item.id === selectedAddressId) || null;
  const selectedItems = useMemo(() => selected.map((categoryId) => ({ categoryId, estimatedQuantity: estimateQuantity(weightRange) })), [selected, weightRange]);
  const quickDates = useMemo(() => nextDates(14), []);
  const canSubmit = Boolean(selected.length && weightRange && pickupDate && timeSlot && selectedAddressId);
  useEffect(() => {
    if (!session) return;
    loadAddresses();
  }, [session]);
  useEffect(() => {
    if (!session || !(selectedAddress == null ? void 0 : selectedAddress.pincode)) {
      setPickupCharge(null);
      return;
    }
    let ignore = false;
    apiFetch(`/serviceability/pincode?pincode=${encodeURIComponent(selectedAddress.pincode)}`).then((response) => {
      var _a2;
      if (!ignore) setPickupCharge(response.serviceable ? Number(((_a2 = response.data) == null ? void 0 : _a2.pickupCharge) || 0) : null);
    }).catch(() => {
      if (!ignore) setPickupCharge(null);
    });
    return () => {
      ignore = true;
    };
  }, [selectedAddress == null ? void 0 : selectedAddress.pincode, session]);
  async function loadAddresses(preferredAddressId) {
    if (!session) return;
    setPageLoading(true);
    try {
      const response = await apiFetch("/addresses", { token: session.token });
      const nextAddresses = response.data || [];
      setAddresses(nextAddresses);
      const defaultAddress = nextAddresses.find((item) => item.isDefault) || nextAddresses[0];
      const nextId = preferredAddressId || selectedAddressId || (defaultAddress == null ? void 0 : defaultAddress.id) || null;
      setSelectedAddressId(nextAddresses.some((item) => item.id === nextId) ? nextId : (defaultAddress == null ? void 0 : defaultAddress.id) || null);
      setShowAddressForm(nextAddresses.length === 0);
    } catch (err) {
      setErrors((current) => ({ ...current, address: err instanceof Error ? err.message : "Could not load saved addresses." }));
    } finally {
      setPageLoading(false);
    }
  }
  async function saveAddress() {
    if (!session || savingAddress) return;
    const validation = validateAddress(addressDraft);
    setAddressErrors(validation);
    if (Object.keys(validation).length) return;
    setSavingAddress(true);
    try {
      const saved = await apiFetch("/addresses", {
        method: "POST",
        token: session.token,
        body: JSON.stringify(prepareAddressPayload(addressDraft))
      });
      await loadAddresses(saved.id);
      setAddressDraft(emptyAddressDraft);
      setAddressErrors({});
      setErrors((current) => ({ ...current, address: void 0 }));
      setShowAddressForm(false);
    } catch (err) {
      setAddressErrors(serverFieldErrors(err));
      if (!Object.keys(serverFieldErrors(err)).length) {
        setErrors((current) => ({ ...current, address: err instanceof Error ? err.message : "Could not save address." }));
      }
    } finally {
      setSavingAddress(false);
    }
  }
  function resetForm() {
    setSelected([]);
    setWeightRange("");
    setPickupDate("");
    setTimeSlot("");
    setErrors({});
  }
  async function submit() {
    var _a2, _b;
    if (!session) {
      navigate("/login?next=/schedule-pickup");
      return;
    }
    if (loading) return;
    const validation = validateBooking({ selected, weightRange, pickupDate, timeSlot, selectedAddressId });
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setLoading(true);
    try {
      const booking = await apiFetch("/bookings", {
        method: "POST",
        token: session.token,
        body: JSON.stringify({
          addressId: selectedAddressId,
          estimatedWeightRange: weightRange,
          pickupDate,
          timeSlot,
          instructions: "",
          items: selectedItems
        })
      });
      const charge = Number(((_a2 = booking.pickup) == null ? void 0 : _a2.pickupCharge) || 0);
      setPickupCharge(charge);
      setSuccessBooking({ id: ((_b = booking.pickup) == null ? void 0 : _b.id) || 0, date: pickupDate, slot: timeSlot, address: selectedAddress ? formatAddress(selectedAddress) : "", items: selected.map((id) => {
        var _a3;
        return ((_a3 = activeCategories.find((item) => item.id === id)) == null ? void 0 : _a3.name) || "Scrap item";
      }) });
      setSuccessCharge(charge);
      resetForm();
    } catch (err) {
      setErrors((current) => ({ ...current, submit: err instanceof Error ? err.message : "Could not schedule pickup. Please try again." }));
    } finally {
      setLoading(false);
    }
  }
  if (!session) {
    return /* @__PURE__ */ jsx(PageShell, { title: "Schedule Scrap Pickup", subtitle: "Login or register first, then continue booking your doorstep scrap pickup online.", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-xl card p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-ink", children: "Continue to schedule pickup" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted", children: "The website uses the same authenticated booking API as the mobile app, so your pickup, address, charge, and order history stay connected." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => navigate("/login?next=/schedule-pickup"), className: "rounded-full bg-brand-600 px-6 py-3 font-black text-white", children: "Login" }),
        /* @__PURE__ */ jsx("button", { onClick: () => navigate("/register?next=/schedule-pickup"), className: "rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700", children: "New user? Register" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(PageShell, { title: "Schedule Scrap Pickup", subtitle: "Select items, estimated weight, saved address, pickup charge, date, and slot. The same backend creates your pickup as the mobile app.", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5 grid gap-2 md:grid-cols-6", children: ["Select Items", "Weight", "Pickup Address", "Pickup Charge", "Date / Time", "Review"].map((step, index) => /* @__PURE__ */ jsxs("div", { className: `min-w-0 rounded-2xl border px-3 py-2 text-xs font-black transition sm:text-sm ${scheduleStepComplete(index, { selected, weightRange, selectedAddressId, pickupCharge, pickupDate, timeSlot }) ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`, children: [
      /* @__PURE__ */ jsx("span", { className: "mr-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px]", children: index + 1 }),
      step
    ] }, step)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "card reveal-up min-w-0 p-4 sm:p-5", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: /* @__PURE__ */ jsx(Truck, {}), title: "Select Items", error: errors.items }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted", children: "Raddi ho ya loha, plastic ho ya purana samaan - Kabad Factory sab le jayega." }),
          /* @__PURE__ */ jsxs("label", { className: "relative mt-5 block", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search scrap materials" }),
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-700", size: 19 }),
            /* @__PURE__ */ jsx("input", { value: itemSearch, onChange: (event) => setItemSearch(event.target.value), placeholder: "Search any materials...", className: "focus-ring min-h-12 w-full rounded-2xl border border-brand-100 bg-brand-50 py-3 pl-11 pr-11 text-sm font-semibold text-ink placeholder:text-muted" }),
            itemSearch && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setItemSearch(""), "aria-label": "Clear search", className: "focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-muted hover:bg-white", children: /* @__PURE__ */ jsx(X, { size: 18 }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex max-w-full gap-2 overflow-x-auto pb-2", "aria-label": "Material categories", children: ["All", ...availableMaterials].map((material) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedMaterial(material), className: `focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-extrabold ${selectedMaterial === material ? "bg-brand-600 text-white" : "bg-slate-100 text-ink hover:bg-brand-50"}`, children: material }, material)) }),
          categoriesLoading && !activeCategories.length ? /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-2 2xl:grid-cols-4", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-20 animate-pulse rounded-2xl bg-brand-50" }, index)) }) : /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-5", children: visibleGroups.map((group) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 font-black text-ink", children: group.material }),
            /* @__PURE__ */ jsx("div", { className: "grid min-w-0 gap-2 sm:grid-cols-2 2xl:grid-cols-4", children: group.items.map((item) => /* @__PURE__ */ jsx(ScheduleCategoryItem, { item, selected: selected.includes(item.id), onToggle: () => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]) }, item.id)) })
          ] }, group.material)) }),
          !categoriesLoading && !visibleCategories.length && /* @__PURE__ */ jsx("p", { className: "mt-5 rounded-2xl bg-brand-50 p-4 text-sm font-bold text-muted", children: "No scrap items match your search. Try another material name or category." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "card reveal-up min-w-0 p-4 sm:p-5", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: /* @__PURE__ */ jsx(WalletCards, {}), title: "Estimated Weight / Quantity", error: errors.weightRange }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: weightRanges.map((range) => /* @__PURE__ */ jsx("button", { onClick: () => setWeightRange(range), className: `rounded-full border px-4 py-2 text-sm font-black transition ${weightRange === range ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted hover:border-brand-200"}`, children: range }, range)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "card reveal-up min-w-0 p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx(SectionHeader, { icon: /* @__PURE__ */ jsx(MapPinned, {}), title: "Saved Address", error: errors.address }),
            /* @__PURE__ */ jsxs("button", { onClick: () => setShowAddressForm(true), className: "inline-flex items-center gap-2 rounded-full border border-brand-100 px-4 py-2 text-sm font-black text-brand-700", children: [
              /* @__PURE__ */ jsx(Plus, { size: 16 }),
              " Add Address"
            ] })
          ] }),
          pageLoading ? /* @__PURE__ */ jsx("div", { className: "mt-4 h-28 animate-pulse rounded-2xl bg-brand-50" }) : addresses.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-4 min-w-0", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "pickup-address", children: "Saved pickup address" }),
            /* @__PURE__ */ jsx("select", { id: "pickup-address", value: selectedAddressId || "", onChange: (event) => setSelectedAddressId(Number(event.target.value) || null), className: "focus-ring min-h-12 w-full min-w-0 rounded-2xl border border-brand-100 bg-white px-3 text-sm font-bold text-ink", children: addresses.map((item) => /* @__PURE__ */ jsx("option", { value: item.id, children: `${humanize(item.label)}${item.isDefault ? " (Default)" : ""} — ${formatAddress(item)}` }, item.id)) }),
            selectedAddress && /* @__PURE__ */ jsxs("div", { className: "mt-3 min-w-0 rounded-2xl bg-brand-50 p-3", children: [
              /* @__PURE__ */ jsxs("strong", { className: "text-ink", children: [
                humanize(selectedAddress.label),
                selectedAddress.isDefault ? " · Default" : ""
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 break-words text-sm leading-6 text-muted", children: formatAddress(selectedAddress) }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm font-bold text-ink", children: [
                selectedAddress.fullName,
                " | ",
                selectedAddress.mobile
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-black text-ink", children: "No saved address found" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted", children: "Add your pickup address once, then use it for faster repeat bookings." })
          ] }),
          showAddressForm && /* @__PURE__ */ jsx(AddressForm, { draft: addressDraft, setDraft: setAddressDraft, errors: addressErrors, saving: savingAddress, onSave: saveAddress, onCancel: () => addresses.length ? setShowAddressForm(false) : void 0 })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "card reveal-up min-w-0 p-4 sm:p-5", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: /* @__PURE__ */ jsx(CalendarDays, {}), title: "Pickup Date / Time", error: errors.pickupDate || errors.timeSlot }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-3 overflow-x-auto pb-2", children: quickDates.map((date) => /* @__PURE__ */ jsxs("button", { onClick: () => setPickupDate(date.value), className: `min-w-[88px] rounded-2xl border px-3 py-3 text-center transition ${pickupDate === date.value ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-ink"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "block text-xs font-black uppercase", children: date.isToday ? "Today" : date.day }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xl font-black", children: date.date }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold", children: date.month })
          ] }, date.value)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: timeSlots.map((slot) => /* @__PURE__ */ jsxs("button", { onClick: () => setTimeSlot(slot), className: `rounded-2xl border px-4 py-3 text-sm font-black transition ${timeSlot === slot ? "border-brand-600 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`, children: [
            /* @__PURE__ */ jsx(Clock, { className: "mr-2 inline", size: 16 }),
            slot
          ] }, slot)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "min-w-0 lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxs("div", { className: "card min-w-0 p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: "Review Pickup" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx(ReviewRow, { label: "Items", value: selected.length ? `${selected.length} selected` : "Select scrap items" }),
          /* @__PURE__ */ jsx(ReviewRow, { label: "Estimated weight", value: weightRange || "Choose range" }),
          /* @__PURE__ */ jsx(ReviewRow, { label: "Pickup address", value: selectedAddress ? `${selectedAddress.line1}, ${selectedAddress.pincode}` : "Select saved address" }),
          /* @__PURE__ */ jsx(ReviewRow, { label: "Pickup charge", value: pickupCharge === null ? "Calculated by backend" : pickupCharge > 0 ? `₹${pickupCharge.toFixed(0)}` : "Free Pickup", strong: true }),
          /* @__PURE__ */ jsx(ReviewRow, { label: "Slot", value: pickupDate && timeSlot ? `${readableDate(pickupDate)} | ${timeSlot}` : "Choose date and time" })
        ] }),
        errors.submit && /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700", children: errors.submit }),
        /* @__PURE__ */ jsx("button", { onClick: submit, disabled: loading || !canSubmit, className: "mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60", children: loading ? "Scheduling..." : "Schedule Pickup" }),
        /* @__PURE__ */ jsxs("a", { href: siteConfig.appDownloadUrl, className: "mt-3 flex items-center justify-center gap-2 rounded-2xl border border-brand-100 px-5 py-3 text-sm font-black text-brand-700", children: [
          /* @__PURE__ */ jsx(Smartphone, { size: 17 }),
          " Schedule Faster with the App"
        ] })
      ] }) })
    ] }),
    successCharge !== null && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm", role: "dialog", "aria-modal": "true", "aria-labelledby": "success-title", children: /* @__PURE__ */ jsxs("div", { className: "success-pop max-w-md card p-7 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 34 }) }),
      /* @__PURE__ */ jsx("h2", { id: "success-title", className: "mt-5 text-2xl font-black text-ink", children: "Pickup scheduled successfully" }),
      successBooking && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl bg-brand-50 p-4 text-left text-sm", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-black text-brand-700", children: [
          "Booking reference: #KF",
          successBooking.id
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-muted", children: [
          readableDate(successBooking.date),
          " · ",
          successBooking.slot
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted", children: successBooking.address }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-bold text-ink", children: successBooking.items.join(", ") })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 font-bold text-muted", children: [
        "Pickup Charge: ",
        successCharge > 0 ? `₹${successCharge.toFixed(0)}` : "Free"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setSuccessCharge(null);
        setSuccessBooking(null);
        navigate("/orders");
      }, className: "mt-6 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white", children: "View bookings" })
    ] }) })
  ] });
}
function ScheduleCategoryItem({ item, selected, onToggle }) {
  const [imageFailed, setImageFailed] = useState(false);
  return /* @__PURE__ */ jsxs("button", { onClick: onToggle, className: `group flex min-w-0 items-center justify-between gap-2 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${selected ? "border-brand-500 bg-brand-50 shadow-soft" : "border-brand-100 bg-white hover:border-brand-200"}`, "aria-pressed": selected, children: [
    /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-50 text-brand-700", children: item.iconUrl && !imageFailed ? /* @__PURE__ */ jsx("img", { src: item.iconUrl, alt: "", className: "h-full w-full object-cover", onError: () => setImageFailed(true) }) : /* @__PURE__ */ jsx(Recycle, { size: 18 }) }),
      /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("strong", { className: "block break-words text-sm leading-tight text-ink", children: item.name }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-muted", children: formatRate(item) })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsx(CheckCircle2, { className: "shrink-0 text-brand-600" })
  ] });
}
function AuthPage({ mode, navigate, currentPath }) {
  const { setSession } = useAuth();
  const [form, setForm] = useState({ name: "", mobile: "", password: "" });
  const [message, setMessage] = useState("");
  const [forgot, setForgot] = useState(false);
  const redirectPath = safeRedirectPath(queryValue(currentPath, "next") || queryValue(currentPath, "redirect"));
  async function submit() {
    setMessage("");
    try {
      const cleanMobile = form.mobile.replace(/\D/g, "");
      if (!/^\d{10}$/.test(cleanMobile)) return setMessage("Please enter a 10 digit mobile number.");
      if (form.password.length < 6) return setMessage("Password must be at least 6 characters.");
      const payload = mode === "register" ? { name: form.name.trim(), mobile: cleanMobile, password: form.password } : { mobile: cleanMobile, password: form.password };
      const session = await apiFetch(`/auth/${mode}`, { method: "POST", body: JSON.stringify(payload) });
      setSession(session);
      navigate(redirectPath || "/account");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Authentication failed.");
    }
  }
  return /* @__PURE__ */ jsxs(PageShell, { title: mode === "register" ? "Create Account" : "Login", subtitle: "Use the same secure mobile number and password flow as the mobile application.", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md card p-6", children: [
      mode === "register" && /* @__PURE__ */ jsx(Field, { label: "Name", value: form.name, onChange: (value) => setForm({ ...form, name: value }) }),
      /* @__PURE__ */ jsx(Field, { label: "Mobile Number", value: form.mobile, onChange: (value) => setForm({ ...form, mobile: value.replace(/\D/g, "").slice(0, 10) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Password", type: "password", value: form.password, onChange: (value) => setForm({ ...form, password: value.slice(0, 20) }) }),
      mode === "login" && /* @__PURE__ */ jsx("button", { onClick: () => setForgot(true), className: "mt-2 text-sm font-bold text-brand-700", children: "Forgot Password?" }),
      message && /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700", children: message }),
      /* @__PURE__ */ jsx("button", { onClick: submit, className: "mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white", children: mode === "register" ? "Register" : "Login" }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate(authSwitchPath(mode, redirectPath)), className: "mt-4 w-full text-sm font-bold text-brand-700", children: mode === "register" ? "Already registered? Login" : "New user? Register" })
    ] }),
    forgot && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md card p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: "Reset Password" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-muted", children: [
        "To reset your password, please contact our support team on WhatsApp at ",
        siteConfig.phone,
        ". Our team will help you set a new password."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("a", { className: "rounded-2xl bg-brand-600 px-5 py-3 text-center font-black text-white", href: `https://wa.me/${siteConfig.phonePlain}?text=${encodeURIComponent("Hi, I need help resetting my account password.")}`, children: "Contact on WhatsApp" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-2xl border border-brand-100 px-5 py-3 font-black text-brand-700", onClick: () => setForgot(false), children: "Close" })
      ] })
    ] }) })
  ] });
}
function AccountPage({ route, navigate }) {
  const { session, loading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!session || route.path !== "/orders") return;
    apiFetch("/bookings?page=1&limit=10&status=all", { token: session.token }).then((response) => setOrders(response.data || [])).catch((err) => setError(err instanceof Error ? err.message : "Could not load orders."));
  }, [route.path, session]);
  if (loading) return /* @__PURE__ */ jsx(PageShell, { title: "Account", subtitle: "Restoring your session..." });
  if (!session) return /* @__PURE__ */ jsx(PageShell, { title: "Login Required", subtitle: "Please login to view account pages.", children: /* @__PURE__ */ jsx("button", { onClick: () => navigate("/login"), className: "rounded-full bg-brand-600 px-5 py-3 font-black text-white", children: "Login" }) });
  return /* @__PURE__ */ jsx(PageShell, { title: route.path === "/orders" ? "Orders" : "Account", subtitle: `Welcome, ${session.user.name || session.user.mobile}.`, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-5 lg:grid-cols-[300px_1fr]", children: [
    /* @__PURE__ */ jsxs("aside", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-black text-ink", children: session.user.name || "Kabad Factory User" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted", children: session.user.mobile }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/orders"), className: "mt-5 w-full rounded-2xl border border-brand-100 px-4 py-3 text-left font-bold text-brand-700", children: "Orders" }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "mt-3 w-full rounded-2xl bg-ink px-4 py-3 font-bold text-white", children: "Logout" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "card p-5", children: route.path !== "/orders" ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: "Manage your pickup journey" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted", children: "Use Orders to view pickup status, item details, pickup charges, and bills." })
    ] }) : error ? /* @__PURE__ */ jsx(RetryBox, { message: error, onRetry: () => navigate("/orders") }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      orders.map((order) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-brand-100 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-black text-ink", children: [
              "#KF",
              order.id
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted", children: [
              order.pickupDate,
              " | ",
              order.timeSlot
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-700", children: order.status })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted", children: [order.line1, order.city, order.pincode].filter(Boolean).join(", ") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-3 text-sm font-bold text-ink", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            order.itemCount || 0,
            " items"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Pickup ₹",
            Number(order.pickupCharge || 0).toFixed(0)
          ] }),
          /* @__PURE__ */ jsx("span", { children: order.status === "completed" ? `Total ₹${Number(order.totalAmount || 0).toFixed(0)}` : "Total Pending" })
        ] })
      ] }, order.id)),
      !orders.length && /* @__PURE__ */ jsx("p", { className: "text-muted", children: "No orders found." })
    ] }) })
  ] }) });
}
function ScrapPage({ route, navigate }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { route, action: () => navigate("/schedule-pickup"), actionLabel: "Schedule Pickup" }),
    /* @__PURE__ */ jsx(ContentBlocks, { route }),
    /* @__PURE__ */ jsx(RatesPreview, { navigate }),
    /* @__PURE__ */ jsx(FaqSection, {})
  ] });
}
function ContentPage({ route, navigate }) {
  if (route.path === "/about") return /* @__PURE__ */ jsx(AboutPage, { route, navigate });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { route, action: () => navigate("/schedule-pickup"), actionLabel: "Schedule Pickup" }),
    /* @__PURE__ */ jsx(ContentBlocks, { route }),
    /* @__PURE__ */ jsx("section", { className: "container-page pb-16", children: /* @__PURE__ */ jsxs("div", { className: "card flex flex-col items-start justify-between gap-5 bg-brand-900 p-7 text-white md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Ready to sell scrap?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-brand-100", children: "Check your PIN code and schedule a pickup online." })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/schedule-pickup"), className: "rounded-full bg-white px-6 py-3 font-black text-brand-700", children: "Schedule Pickup" })
    ] }) })
  ] });
}
function AboutPage({ route, navigate }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden bg-ink py-20 text-white", children: [
      /* @__PURE__ */ jsx("img", { src: siteConfig.assets.heroBanner, alt: "", className: "absolute inset-0 -z-20 h-full w-full object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/84 to-ink/35" }),
      /* @__PURE__ */ jsxs("div", { className: "container-page reveal-up", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { path: route.path }),
        /* @__PURE__ */ jsx("h1", { className: "mt-5 max-w-4xl text-4xl font-black sm:text-6xl", children: "About Kabad Factory" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-xl font-bold leading-9 text-brand-100", children: "A cleaner, simpler way to sell recyclables from home." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-lg leading-8 text-white/84", children: "Kabad Factory brings current scrap rates, doorstep pickup, saved addresses and order tracking into one easy digital experience for Gwalior customers." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => navigate("/pickup-services"), className: "rounded-full bg-white px-6 py-3 text-center font-black text-brand-700", children: "Explore Services" }),
          /* @__PURE__ */ jsx("button", { onClick: () => navigate("/schedule-pickup"), className: "rounded-full bg-brand-600 px-6 py-3 font-black text-white", children: "Schedule Pickup" }),
          /* @__PURE__ */ jsx("a", { href: siteConfig.appDownloadUrl, className: "rounded-full border border-white/25 px-6 py-3 text-center font-black text-white", children: "Download App" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container-page py-14", children: [
      /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Our Mission", title: "Easy, transparent recycling — one doorstep at a time", body: "Whether it is paper, metal, plastic, electronics, or household scrap, our goal is to help customers recycle responsibly without carrying scrap to a local dealer." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: (route.sections || []).map((section, index) => {
        const Icon = [Truck, BadgeCheck, Smartphone, Recycle][index] || ShieldCheck;
        return /* @__PURE__ */ jsxs("article", { className: "card reveal-up p-5 transition hover:-translate-y-1 hover:border-brand-200", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700", children: /* @__PURE__ */ jsx(Icon, {}) }),
          /* @__PURE__ */ jsx("h2", { className: "mt-5 text-xl font-black text-ink", children: section.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-muted", children: section.body })
        ] }, section.title);
      }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-14", children: /* @__PURE__ */ jsxs("div", { className: "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: "Our Vision" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-black text-ink sm:text-4xl", children: "A cleaner city where selling scrap is as simple as ordering a service online." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: ["Doorstep pickup from saved addresses", "Current scrap rates from backend", "Pickup charge before confirmation", "Orders and bills in one account"].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-brand-100 bg-brand-50 p-4 font-bold text-ink", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mb-3 text-brand-700" }),
        item
      ] }, item)) })
    ] }) }),
    /* @__PURE__ */ jsx(AppDownloadSection, { navigate })
  ] });
}
function PickupServicesPage({ route, navigate }) {
  const services = [
    ["Doorstep Scrap Pickup", "Book collection from home for paper, metal, plastic, appliances and mixed recyclable scrap."],
    ["Household Scrap Pickup", "Clear everyday home scrap without visiting a local dealer or weighing shop."],
    ["Bulk Scrap Pickup", "Plan larger pickups for homes, societies, shops and local businesses."],
    ["Office Scrap Pickup", "Dispose of office paper, packaging, old electronics and workspace scrap with documented status."],
    ["Commercial Scrap Pickup", "Coordinate one-time or repeat scrap collection for business material."],
    ["E-Waste Pickup", "Schedule responsible pickup for accepted wires, devices, computer parts and small electronics."]
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden bg-brand-900 py-20 text-white", children: [
      /* @__PURE__ */ jsx("img", { src: siteConfig.assets.heroBanner, alt: "", className: "absolute inset-0 -z-20 h-full w-full object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/88 to-brand-900/42" }),
      /* @__PURE__ */ jsxs("div", { className: "container-page", children: [
        /* @__PURE__ */ jsx(Breadcrumb, { path: route.path }),
        /* @__PURE__ */ jsx("h1", { className: "mt-5 max-w-4xl text-4xl font-black sm:text-6xl", children: route.h1 }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-lg leading-8 text-brand-100", children: route.intro }),
        /* @__PURE__ */ jsx("button", { onClick: () => navigate("/schedule-pickup"), className: "mt-8 rounded-full bg-white px-6 py-3 font-black text-brand-700", children: "Schedule Pickup" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container-page py-16", children: [
      /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Our Pickup Services", title: "What Kabad Factory Collects", body: "Doorstep pickup is designed for homes, offices and local businesses that want a clean, transparent way to sell scrap." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: services.map(([title, body]) => /* @__PURE__ */ jsxs("article", { className: "card p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", children: [
        /* @__PURE__ */ jsx(Truck, { className: "text-brand-700" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-black text-ink", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-muted", children: body })
      ] }, title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Where We Serve", title: "Currently focused on Gwalior serviceable PIN codes", body: "Availability and pickup charges are checked from the backend using the customer's PIN code and configured pickup-charge rules." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3 text-sm font-bold text-muted", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-line bg-brand-50 px-4 py-2", children: "Gwalior" }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-line bg-brand-50 px-4 py-2", children: "PIN-based serviceability" }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-line bg-brand-50 px-4 py-2", children: "Transparent pickup charge" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "card p-5 sm:p-7", children: /* @__PURE__ */ jsx(PinChecker, { onSchedule: () => navigate("/schedule-pickup") }) })
    ] }) }),
    /* @__PURE__ */ jsx(AppDownloadSection, { navigate }),
    /* @__PURE__ */ jsx(FaqSection, {})
  ] });
}
function CityPage({ route, navigate }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHero, { route, action: () => navigate("/schedule-pickup"), actionLabel: "Book Pickup" }),
    /* @__PURE__ */ jsx("section", { className: "container-page grid gap-5 pb-16 md:grid-cols-3", children: ["Online Kabadiwala Gwalior", "Scrap Pickup Gwalior", "Raddi Wala Near Me"].map((title) => /* @__PURE__ */ jsxs("div", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted", children: "Kabad Factory connects local pickup availability, current scrap rates, and digital order tracking for Gwalior customers." })
    ] }, title)) }),
    /* @__PURE__ */ jsx(RatesPreview, { navigate }),
    /* @__PURE__ */ jsx(FaqSection, {})
  ] });
}
function BlogPage({ navigate }) {
  const posts = [
    ["How to Prepare Scrap Before Pickup", "Sort paper, metal, plastic and e-waste separately for faster weighing and clearer settlement."],
    ["Why Scrap Rates Change", "Scrap values move with commodity prices, material quality, and quantity."],
    ["How Pickup Charges Work", "Kabad Factory calculates pickup charges using backend store PIN, customer PIN, active slabs, and distance buffer."]
  ];
  return /* @__PURE__ */ jsxs(PageShell, { title: "Scrap Selling Guides", subtitle: "Useful, local-first guides for customers selling scrap online in Gwalior.", children: [
    /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-3", children: posts.map(([title, body]) => /* @__PURE__ */ jsxs("article", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted", children: body })
    ] }, title)) }),
    /* @__PURE__ */ jsx("button", { onClick: () => navigate("/schedule-pickup"), className: "mt-8 rounded-full bg-brand-600 px-6 py-3 font-black text-white", children: "Schedule Pickup" })
  ] });
}
function FaqPage({ route }) {
  return /* @__PURE__ */ jsx(PageShell, { title: route.h1 || "FAQ", subtitle: route.seo.description, children: /* @__PURE__ */ jsx(FaqSection, { plain: true }) });
}
function LegalPage({ route }) {
  return /* @__PURE__ */ jsx(PageShell, { title: route.h1 || route.label, subtitle: route.seo.description, children: /* @__PURE__ */ jsxs("div", { className: "card max-w-none p-6", children: [
    /* @__PURE__ */ jsx("h2", { children: "Service Information" }),
    /* @__PURE__ */ jsx("p", { children: "Kabad Factory uses customer account data, pickup addresses, selected scrap items, pricing data, and order status information to provide doorstep scrap pickup and support." }),
    /* @__PURE__ */ jsx("h2", { children: "Customer Responsibility" }),
    /* @__PURE__ */ jsx("p", { children: "Customers should provide accurate mobile numbers, pickup addresses, PIN codes, selected items, and scheduling details." }),
    /* @__PURE__ */ jsx("h2", { children: "Contact" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "For questions, contact ",
      siteConfig.email,
      " or ",
      siteConfig.phone,
      "."
    ] })
  ] }) });
}
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container-page", children: [
    /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Simple flow", title: "How It Works", body: "From PIN check to verified pickup, the process stays simple and transparent." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-5", children: trustItems.map(({ icon: Icon, title, body }, index) => /* @__PURE__ */ jsxs("div", { className: "card group p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white", children: /* @__PURE__ */ jsx(Icon, {}) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm font-black text-amber", children: [
        "Step ",
        index + 1
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-1 text-base font-black text-ink", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-muted", children: body })
    ] }, title)) })
  ] }) });
}
function WhyChoose() {
  return /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "container-page grid gap-8 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "Why Kabad Factory", title: "Doorstep Pickup. Transparent Rates. Easy Recycling.", body: "Sell scrap online with clearer pricing, saved addresses, pickup tracking, and a cleaner service experience." }) }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: ["Current rates from backend", "PIN-based serviceability", "Pickup charge before booking", "Orders and bills in one account"].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-line bg-white p-5 font-bold text-ink shadow-soft", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mb-3 text-brand-700" }),
      item
    ] }, item)) })
  ] }) });
}
function AppDownloadSection({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid overflow-hidden rounded-card border border-line bg-white shadow-soft lg:grid-cols-[1fr_0.82fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-7 md:p-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: "Get the App" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 max-w-2xl text-3xl font-black text-ink sm:text-4xl", children: "Take Kabad Factory with You" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-lg leading-8 text-muted", children: "Schedule pickups, manage addresses and track your orders faster with the Kabad Factory app." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-black text-brand-700", children: "Ghar ka kabad ab tension nahi — pickup schedule karo aur becho aasani se." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("a", { href: siteConfig.appDownloadUrl, className: "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-black text-white", children: [
          /* @__PURE__ */ jsx(Smartphone, { size: 18 }),
          " Get the App"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/schedule-pickup"), className: "inline-flex items-center justify-center gap-2 rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700", children: [
          "Schedule on Website ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex max-w-sm items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white text-brand-700", children: /* @__PURE__ */ jsx(QrCode, { size: 46 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-muted", children: "Our Android and iOS apps are in development. Tap Get the App for the latest availability information." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative min-h-[360px] bg-brand-50", children: /* @__PURE__ */ jsx("img", { src: siteConfig.assets.appMockup, alt: "Kabad Factory mobile app mockup showing schedule, saved addresses, rates and orders", className: "h-full w-full object-cover", loading: "lazy" }) })
  ] }) });
}
function ScrapCategoriesGrid({ navigate }) {
  return /* @__PURE__ */ jsxs("section", { className: "container-page py-16", children: [
    /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "What can you sell?", title: "Sell Your Recyclables with Kabad Factory", body: "Choose from common household, office, appliance, paper, metal, plastic and e-waste categories." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: scrapSlugs.map(([slug, label]) => /* @__PURE__ */ jsxs("button", { onClick: () => navigate(`/sell-scrap/${slug}`), className: "card group flex items-center justify-between p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { className: "block text-ink", children: label }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted", children: "Rates, pickup, FAQ" })
      ] }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "text-brand-700" })
    ] }, slug)) })
  ] });
}
function PickupServicesTeaser({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 rounded-card border border-line bg-brand-50 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: "Pickup Services" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-black text-ink sm:text-4xl", children: "Household, bulk, office and e-waste pickup in one place." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 leading-7 text-muted", children: "See what Kabad Factory collects, where service is available, and check your PIN before scheduling." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/pickup-services"), className: "mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700", children: [
        "Explore Pickup Services ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: ["Doorstep Scrap Pickup", "Household Scrap Pickup", "Bulk Scrap Pickup", "Office Scrap Pickup", "Commercial Scrap Pickup", "E-Waste Pickup"].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-line bg-white p-4 font-extrabold text-ink shadow-soft", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "mb-3 text-brand-700" }),
      item
    ] }, item)) })
  ] }) });
}
function BrandStory({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: "About Kabad Factory" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-black text-ink sm:text-4xl", children: "Your Scrap Has Value. Sell It from Home." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg leading-8 text-muted", children: "Kabad Factory helps customers sell scrap online with current rates, doorstep pickup, saved addresses and order tracking. It is built for a cleaner city and a more convenient recycling experience." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/about"), className: "mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:border-brand-200 hover:bg-brand-50", children: [
        "Learn More ",
        /* @__PURE__ */ jsx(ChevronRight, { size: 17 })
      ] })
    ] })
  ] }) });
}
function BusinessPickup({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxs("div", { className: "relative isolate overflow-hidden rounded-card bg-brand-900 p-7 text-white shadow-soft md:p-10", children: [
    /* @__PURE__ */ jsx("img", { src: siteConfig.assets.heroBanner, alt: "", className: "absolute inset-0 -z-20 h-full w-full object-cover", loading: "lazy" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/92 to-brand-900/45" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl reveal-up", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-100", children: "Bulk and business pickup" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-black", children: "Office, commercial, and large scrap collection" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-brand-100", children: "Plan bigger pickups with item-wise collection details, pickup charge visibility, and completion billing." }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/pickup-services"), className: "mt-6 rounded-full bg-white px-6 py-3 font-black text-brand-700", children: "Explore Services" })
    ] })
  ] }) });
}
function FinalCta({ navigate }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page pb-16", children: /* @__PURE__ */ jsxs("div", { className: "rounded-card border border-line bg-white p-7 text-center shadow-soft md:p-10", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-ink sm:text-4xl", children: "Ready to sell your scrap?" }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted", children: "Check pickup availability, compare current rates and schedule a convenient doorstep pickup." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col justify-center gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/schedule-pickup"), className: "rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:bg-brand-700", children: "Schedule Pickup" }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/scrap-rates"), className: "rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:bg-brand-50", children: "Check Scrap Rates" })
    ] })
  ] }) });
}
function FaqSection({ plain = false }) {
  var _a2;
  const faqs = ((_a2 = routes.find((route) => route.path === "/")) == null ? void 0 : _a2.faqs) || [];
  return /* @__PURE__ */ jsxs("section", { className: plain ? "" : "container-page py-14", children: [
    !plain && /* @__PURE__ */ jsx(SectionIntro, { eyebrow: "FAQ", title: "Questions customers ask before selling scrap", body: "Clear answers help search visibility and reduce support calls." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2", children: faqs.map((faq) => /* @__PURE__ */ jsxs("details", { className: "card p-5", children: [
      /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-base font-black text-ink", children: faq.question }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-muted", children: faq.answer })
    ] }, faq.question)) })
  ] });
}
function ContentBlocks({ route }) {
  return /* @__PURE__ */ jsx("section", { className: "container-page grid gap-5 py-12 md:grid-cols-3", children: (route.sections || []).map((section) => /* @__PURE__ */ jsxs("article", { className: "card p-5", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: section.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 leading-7 text-muted", children: section.body })
  ] }, section.title)) });
}
function PageHero({ route, action, actionLabel }) {
  return /* @__PURE__ */ jsx("section", { className: "bg-brand-50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container-page", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { path: route.path }),
    /* @__PURE__ */ jsx("h1", { className: "mt-5 max-w-4xl text-4xl font-black text-ink sm:text-5xl", children: route.h1 || route.label }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-lg leading-8 text-muted", children: route.intro || route.seo.description }),
    action && /* @__PURE__ */ jsxs("button", { onClick: action, className: "mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white", children: [
      actionLabel || "Continue",
      " ",
      /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
    ] })
  ] }) });
}
function PageShell({ title, subtitle, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-brand-50 py-14", children: /* @__PURE__ */ jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black text-ink sm:text-5xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-lg leading-8 text-muted", children: subtitle })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "container-page py-12", children })
  ] });
}
function SectionIntro({ eyebrow, title, body }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-wide text-brand-700", children: eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-black text-ink sm:text-4xl", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl leading-7 text-muted", children: body })
  ] });
}
function Field({ label, value, onChange, type = "text", error }) {
  return /* @__PURE__ */ jsxs("label", { className: "mt-4 block", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-ink", children: label }),
    /* @__PURE__ */ jsx("input", { className: `focus-ring mt-2 min-h-12 w-full rounded-2xl border bg-white px-4 text-ink ${error ? "border-red-300" : "border-brand-100"}`, type, value, onChange: (event) => onChange(event.target.value) }),
    error && /* @__PURE__ */ jsx("span", { className: "mt-2 block text-sm font-bold text-red-700", children: error })
  ] });
}
function AddressForm({ draft, setDraft, errors, saving, onSave, onCancel }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-x-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Field, { label: "Full Name", value: draft.fullName, onChange: (value) => setDraft((current) => ({ ...current, fullName: value })), error: errors.fullName }),
      /* @__PURE__ */ jsx(Field, { label: "Mobile", value: draft.mobile, onChange: (value) => setDraft((current) => ({ ...current, mobile: value.replace(/\D/g, "").slice(0, 15) })), error: errors.mobile }),
      /* @__PURE__ */ jsx(Field, { label: "Address Line", value: draft.line1, onChange: (value) => setDraft((current) => ({ ...current, line1: value })), error: errors.line1 }),
      /* @__PURE__ */ jsx(Field, { label: "Street / Locality", value: draft.line2, onChange: (value) => setDraft((current) => ({ ...current, line2: value })), error: errors.line2 }),
      /* @__PURE__ */ jsx(Field, { label: "Landmark", value: draft.landmark || "", onChange: (value) => setDraft((current) => ({ ...current, landmark: value })), error: errors.landmark }),
      /* @__PURE__ */ jsx(Field, { label: "City", value: draft.city, onChange: (value) => setDraft((current) => ({ ...current, city: value })), error: errors.city }),
      /* @__PURE__ */ jsx(Field, { label: "State", value: draft.state, onChange: (value) => setDraft((current) => ({ ...current, state: value })), error: errors.state }),
      /* @__PURE__ */ jsx(Field, { label: "PIN Code", value: draft.pincode, onChange: (value) => setDraft((current) => ({ ...current, pincode: value.replace(/\D/g, "").slice(0, 6) })), error: errors.pincode })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-ink", children: "Address Type" }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: ["home", "office", "other"].map((label) => /* @__PURE__ */ jsx("button", { onClick: () => setDraft((current) => ({ ...current, label })), className: `rounded-full border px-4 py-2 text-sm font-black ${draft.label === label ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted"}`, children: humanize(label) }, label)) })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "mt-4 flex items-center gap-3 text-sm font-bold text-ink", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: Boolean(draft.isDefault), onChange: (event) => setDraft((current) => ({ ...current, isDefault: event.target.checked })), className: "h-5 w-5 accent-brand-600" }),
      "Set as Default"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsx("button", { onClick: onSave, disabled: saving, className: "rounded-2xl bg-brand-600 px-5 py-3 font-black text-white disabled:opacity-60", children: saving ? "Saving..." : "Save Address" }),
      /* @__PURE__ */ jsx("button", { onClick: onCancel, type: "button", className: "rounded-2xl border border-brand-100 bg-white px-5 py-3 font-black text-brand-700", children: "Cancel" })
    ] })
  ] });
}
function SectionHeader({ icon, title, error }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700", children: icon }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-ink", children: title })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700", children: error })
  ] });
}
function ReviewRow({ label, value, strong = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-brand-50 pb-3 last:border-b-0", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted", children: label }),
    /* @__PURE__ */ jsx("span", { className: `max-w-[58%] text-right ${strong ? "text-lg font-black text-brand-700" : "font-bold text-ink"}`, children: value })
  ] });
}
function Breadcrumb({ path }) {
  const parts = path.split("/").filter(Boolean);
  return /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap gap-2 text-sm font-bold text-muted", "aria-label": "Breadcrumb", children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-brand-700", children: "Home" }),
    parts.map((part, index) => /* @__PURE__ */ jsxs("span", { children: [
      "/ ",
      part.replace(/-/g, " ")
    ] }, index))
  ] });
}
function Footer({ navigate }) {
  const links = ["/about", "/pickup-services", "/scrap-rates", "/how-it-works", "/contact", "/blog", "/gwalior", "/privacy-policy", "/terms"];
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-line bg-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "container-page grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("img", { src: siteConfig.assets.logo, alt: "Kabad Factory", className: "h-16 w-48 object-contain object-left" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-muted", children: "Sell scrap online from home with doorstep pickup, transparent rates, saved addresses and order tracking." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-bold text-ink", children: siteConfig.address }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted", children: siteConfig.hours })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-black text-ink", children: "Quick Links" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2", children: links.map((href) => /* @__PURE__ */ jsx("a", { href, onClick: (event) => linkClick(event, href, navigate), className: "text-sm font-semibold text-muted hover:text-brand-700", children: hrefLabel(href) }, href)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-black text-ink", children: "Contact" }),
      /* @__PURE__ */ jsxs("a", { className: "mt-3 flex items-center gap-2 text-sm font-bold text-brand-700", href: `tel:${siteConfig.phonePlain}`, children: [
        /* @__PURE__ */ jsx(Phone, { size: 16 }),
        " ",
        siteConfig.phone
      ] }),
      /* @__PURE__ */ jsx("a", { className: "mt-2 block text-sm font-semibold text-muted", href: `mailto:${siteConfig.email}`, children: siteConfig.email }),
      /* @__PURE__ */ jsxs("a", { className: "mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-black text-white", href: siteConfig.appDownloadUrl, children: [
        /* @__PURE__ */ jsx(Smartphone, { size: 16 }),
        " Download App"
      ] })
    ] })
  ] }) });
}
function NotFound({ navigate }) {
  return /* @__PURE__ */ jsx(PageShell, { title: "Page not found", subtitle: "The page you opened does not exist.", children: /* @__PURE__ */ jsx("button", { className: "rounded-full bg-brand-600 px-5 py-3 font-black text-white", onClick: () => navigate("/"), children: "Go Home" }) });
}
function RetryBox({ message, onRetry }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700", children: [
    /* @__PURE__ */ jsx("p", { className: "font-bold", children: message }),
    /* @__PURE__ */ jsx("button", { onClick: onRetry, className: "mt-3 rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white", children: "Retry" })
  ] });
}
function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function reload() {
    setLoading(true);
    setError("");
    apiFetch("/categories").then((response) => setCategories(response.data || [])).catch((err) => setError(err instanceof Error ? err.message : "Could not load scrap rates.")).finally(() => setLoading(false));
  }
  useEffect(() => {
    reload();
  }, []);
  return { categories, loading, error, reload };
}
function linkClick(event, href, navigate) {
  if (href.startsWith("http")) return;
  event.preventDefault();
  navigate(href);
}
function getBrowserPath() {
  if (typeof window === "undefined") return "/";
  return `${window.location.pathname}${window.location.search}`;
}
function pathOnly(path) {
  return path.split("?")[0] || "/";
}
function queryValue(path, key) {
  const query = path.split("?")[1] || "";
  return new URLSearchParams(query).get(key);
}
function safeRedirectPath(value) {
  if (!value) return "";
  try {
    const decoded = decodeURIComponent(value);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return "";
    return routes.some((route) => route.path === pathOnly(decoded)) ? decoded : "";
  } catch {
    return "";
  }
}
function authSwitchPath(mode, redirectPath) {
  const target = mode === "register" ? "/login" : "/register";
  return redirectPath ? `${target}?next=${encodeURIComponent(redirectPath)}` : target;
}
function isCategory(value) {
  return Boolean(value && typeof value === "object" && "name" in value);
}
function formatRate(item) {
  const unit = item.unit === "piece" ? "pcs" : item.unit || "kg";
  return `₹${Number(item.price || 0).toFixed(0)}/${unit}`;
}
function hrefLabel(href) {
  return href === "/" ? "Home" : href.split("/").filter(Boolean).pop().replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function estimateQuantity(range) {
  if (range === "0-10 kg") return 10;
  if (range === "10-30 kg") return 30;
  if (range === "30-50 kg") return 50;
  if (range === "50-200 kg") return 200;
  return 250;
}
function validateBooking(values) {
  const errors = {};
  if (!values.selected.length) errors.items = "Please select at least one scrap item.";
  if (!values.weightRange) errors.weightRange = "Please select the estimated weight.";
  if (!values.selectedAddressId) errors.address = "Please select a saved pickup address.";
  if (!values.pickupDate) errors.pickupDate = "Please select a pickup date.";
  if (!values.timeSlot) errors.timeSlot = "Please select a time slot.";
  return errors;
}
function validateAddress(draft) {
  const errors = {};
  if (!draft.fullName.trim()) errors.fullName = "Full name is required.";
  if (!draft.mobile.trim()) errors.mobile = "Mobile number is required.";
  else if (!/^\d{10,15}$/.test(draft.mobile.replace(/\D/g, ""))) errors.mobile = "Please enter a valid mobile number.";
  if (!draft.line1.trim()) errors.line1 = "House, flat, or building is required.";
  if (!draft.line2.trim()) errors.line2 = "Street or locality is required.";
  if (!draft.city.trim()) errors.city = "City is required.";
  if (!draft.state.trim()) errors.state = "State is required.";
  if (!draft.pincode.trim()) errors.pincode = "PIN code is required.";
  else if (!/^[0-9A-Za-z -]{4,12}$/.test(draft.pincode.trim())) errors.pincode = "Please enter a valid PIN code.";
  if (!draft.label) errors.label = "Address type is required.";
  return errors;
}
function prepareAddressPayload(draft) {
  return {
    fullName: clean(draft.fullName),
    mobile: draft.mobile.replace(/\D/g, ""),
    label: draft.label,
    line1: clean(draft.line1),
    line2: clean(draft.line2),
    landmark: clean(draft.landmark || ""),
    city: clean(draft.city),
    state: clean(draft.state),
    pincode: String(draft.pincode || "").replace(/\s+/g, "").toUpperCase(),
    isDefault: Boolean(draft.isDefault)
  };
}
function serverFieldErrors(error) {
  var _a2;
  const fieldErrors = ((_a2 = error == null ? void 0 : error.details) == null ? void 0 : _a2.fieldErrors) || {};
  const mapped = {};
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    mapped[field] = Array.isArray(messages) ? String(messages[0]) : String(messages);
  });
  return mapped;
}
function scheduleStepComplete(index, values) {
  if (index === 0) return values.selected.length > 0;
  if (index === 1) return Boolean(values.weightRange);
  if (index === 2) return Boolean(values.selectedAddressId);
  if (index === 3) return values.pickupCharge !== null || Boolean(values.selectedAddressId);
  if (index === 4) return Boolean(values.pickupDate && values.timeSlot);
  return Boolean(values.selected.length && values.weightRange && values.selectedAddressId && values.pickupDate && values.timeSlot);
}
function nextDates(count) {
  const formatterDay = new Intl.DateTimeFormat("en-IN", { weekday: "short" });
  const formatterMonth = new Intl.DateTimeFormat("en-IN", { month: "short" });
  return Array.from({ length: count }, (_, index) => {
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() + index);
    return { value: formatDateValue(date), day: formatterDay.format(date), date: String(date.getDate()), month: formatterMonth.format(date), isToday: index === 0 };
  });
}
function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function readableDate(value) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(/* @__PURE__ */ new Date(`${value}T00:00:00`));
}
function formatAddress(item) {
  return [item.line1, item.line2, item.landmark, item.city, item.state, `PIN: ${item.pincode}`].filter(Boolean).join(", ");
}
function humanize(value = "") {
  return String(value).split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}
function MapDot() {
  return /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-brand-600", "aria-hidden": true });
}
const notFoundRoute = {
  path: "/404",
  label: "404",
  kind: "notFound",
  seo: {
    title: "Page Not Found | Kabad Factory",
    description: "This Kabad Factory page was not found.",
    canonical: "/404",
    noindex: true
  }
};
if (typeof window !== "undefined") {
  const route = routes.find((item) => item.path === window.location.pathname);
  if (route) {
    document.title = route.seo.title;
    (_a = document.querySelector("link[rel='canonical']")) == null ? void 0 : _a.setAttribute("href", absoluteUrl(route.seo.canonical));
  }
}
function render(url) {
  return renderToString(/* @__PURE__ */ jsx(App, { initialPath: url }));
}
function tags(url) {
  const route = routes.find((item) => item.path === url) || routes.find((item) => item.path === "/");
  return seoTags(route);
}
export {
  render,
  tags
};
