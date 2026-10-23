import {
  BadgeIndianRupee,
  Building2,
  CalendarCheck,
  CheckCircle2,
  FileText,
  Home,
  MapPin,
  PackageCheck,
  Recycle,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { siteConfig } from "./config";

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  ogImage?: string;
};

export type RouteDef = {
  path: string;
  label: string;
  kind:
    | "home"
    | "rates"
    | "schedule"
    | "auth"
    | "account"
    | "content"
    | "scrap"
    | "service"
    | "servicesIndex"
    | "city"
    | "blog"
    | "faq"
    | "legal"
    | "appComingSoon"
    | "notFound";
  seo: SeoMeta;
  h1?: string;
  intro?: string;
  keyword?: string;
  category?: string;
  icon?: string;
  noSitemap?: boolean;
  sections?: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
};

export const navLinks = [
  { href: "/", label: "Home1" },
  { href: "/about", label: "About Us" },
  { href: "/scrap-rates", label: "Scrap Rates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export const trustItems = [
  {
    icon: MapPin,
    title: "Check Your PIN",
    body: "Confirm pickup availability for your area before scheduling.",
  },
  {
    icon: Recycle,
    title: "Select Your Scrap",
    body: "Choose paper, metal, plastic, appliances, or e-waste.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule Pickup",
    body: "Pick your saved address, date, and convenient time slot.",
  },
  {
    icon: PackageCheck,
    title: "Weigh & Verify",
    body: "Scrap is checked and weighed during pickup.",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    body: "Final amount is calculated after verified pickup details.",
  },
];

export const scrapSlugs = [
  [
    "iron",
    "Iron",
    "Sell Iron Scrap in Gwalior",
    "iron rods, grills, mixed loha, machinery parts, and household metal scrap",
  ],
  [
    "copper",
    "Copper",
    "Sell Copper Scrap in Gwalior",
    "copper wire, pipes, motors, coils, and clean copper material",
  ],
  [
    "aluminium",
    "Aluminium",
    "Sell Aluminium Scrap in Gwalior",
    "aluminium utensils, profiles, sections, frames, and sheets",
  ],
  [
    "newspaper",
    "Newspaper",
    "Sell Newspaper Scrap in Gwalior",
    "old newspapers, raddi paper, magazines, and paper bundles",
  ],
  [
    "cardboard",
    "Cardboard",
    "Sell Cardboard Scrap in Gwalior",
    "cartons, packaging boxes, brown cardboard, and clean dry paperboard",
  ],
  [
    "plastic",
    "Plastic",
    "Sell Plastic Scrap in Gwalior",
    "plastic bottles, containers, mixed plastic, and reusable household plastic",
  ],
  [
    "e-waste",
    "E-Waste",
    "Sell E-Waste in Gwalior",
    "laptops, CPUs, wires, phones, batteries, and electronic scrap",
  ],
  [
    "ac",
    "AC",
    "Sell AC Scrap in Gwalior",
    "window AC, split AC, copper coils, compressors, and AC bodies",
  ],
  [
    "refrigerator",
    "Refrigerator",
    "Sell Refrigerator Scrap in Gwalior",
    "single-door fridges, double-door fridges, compressors, and appliance scrap",
  ],
] as const;

export const serviceSlugs = [
  [
    "doorstep-scrap-pickup",
    "Doorstep Scrap Pickup",
    "Doorstep Scrap Pickup in Gwalior",
    "Schedule pickup from home and let a verified executive collect recyclable scrap from your address.",
  ],
  [
    "household-scrap-pickup",
    "Household Scrap Pickup",
    "Household Scrap Pickup in Gwalior",
    "Clear common home scrap with a simple online booking and verified doorstep collection.",
  ],
  [
    "bulk-scrap-pickup",
    "Bulk Scrap Pickup",
    "Bulk Scrap Pickup in Gwalior",
    "Plan large scrap pickups for homes, societies, shops, schools, and local businesses.",
  ],
  [
    "office-scrap-pickup",
    "Office Scrap Pickup",
    "Office Scrap Pickup in Gwalior",
    "Dispose of paper, e-waste, packaging, and office junk with a documented pickup flow.",
  ],
  [
    "commercial-scrap-pickup",
    "Commercial Scrap Pickup",
    "Commercial Scrap Pickup in Gwalior",
    "Coordinate recurring or one-time commercial scrap collection with transparent rates and billing.",
  ],
  [
    "e-waste-pickup",
    "E-Waste Pickup",
    "E-Waste Pickup in Gwalior",
    "Schedule responsible pickup for wires, small electronics, computers, and other accepted e-waste.",
  ],
] as const;

const commonFaqs = [
  {
    question: "How do I sell scrap online in Gwalior?",
    answer:
      "Check your PIN code, select scrap items, choose a pickup date and time, then schedule the request. Kabad Factory confirms the pickup and an executive visits your address.",
  },
  {
    question: "Are scrap rates fixed?",
    answer:
      "Rates are managed from the Kabad Factory backend and may change with market conditions, scrap quality, and quantity. The website reads current rates from the same database used by the app.",
  },
  {
    question: "How is pickup charge calculated?",
    answer:
      "The backend checks the customer's pickup PIN code against active store PIN codes, applies the configured distance slabs and the 5 km buffer rule, then stores the charge snapshot on the order.",
  },
  {
    question: "When do I receive payment?",
    answer:
      "After the executive weighs and confirms collected scrap, the final payable amount is calculated and payment is completed according to the order workflow.",
  },
];

export const routes: RouteDef[] = [
  {
    path: "/",
    label: "Home",
    kind: "home",
    seo: {
      title:
        "Sell Scrap Online in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
      description:
        "Sell scrap online in Gwalior with Kabad Factory. Check pickup availability, view today's scrap rates, schedule doorstep scrap pickup, and track orders online.",
      canonical: "/",
    },
    h1: "Sell Scrap Online in Gwalior",
    faqs: commonFaqs,
  },
  {
    path: "/about",
    label: "About",
    kind: "content",
    seo: {
      title: "About Kabad Factory | Online Scrap Pickup & Recycling in Gwalior",
      description:
        "Learn how Kabad Factory makes online scrap pickup and recycling in Gwalior simple with doorstep pickup, transparent scrap rates, saved addresses, and app-based order tracking.",
      canonical: "/about",
    },
    h1: "About Kabad Factory",
    intro:
      "A cleaner, simpler way for Gwalior homes and businesses to sell recyclables from the doorstep.",
    sections: [
      {
        title: "Effortless Doorstep Pickup",
        body: "Schedule pickup from your home without carrying paper, metal, plastic, electronics, or household scrap to a local dealer.",
      },
      {
        title: "Transparent Scrap Rates",
        body: "View current prices and understand how your scrap value is calculated before the executive confirms final weight.",
      },
      {
        title: "Digital Convenience",
        body: "Manage pickups, saved addresses, order history, and account details through the website or Kabad Factory mobile app.",
      },
      {
        title: "Responsible Recycling",
        body: "Help keep recyclable material out of waste streams and put useful scrap back into productive circulation.",
      },
    ],
  },
  {
    path: "/pickup-services",
    label: "Pickup Services",
    kind: "servicesIndex",
    seo: {
      title:
        "Pickup Services in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
      description:
        "Explore Kabad Factory pickup services for household scrap, bulk scrap, office scrap, commercial scrap, e-waste and serviceable PIN areas in Gwalior.",
      canonical: "/pickup-services",
    },
    h1: "Pickup Services",
    intro:
      "Understand what Kabad Factory collects, where pickup is currently available, and how to check serviceability before booking.",
    faqs: commonFaqs,
  },
  {
    path: "/contact",
    label: "Contact",
    kind: "content",
    seo: {
      title: "Contact Kabad Factory Gwalior | Scrap Pickup Support",
      description:
        "Contact Kabad Factory for doorstep scrap pickup, bulk scrap collection, rates, orders, and customer support in Gwalior.",
      canonical: "/contact",
    },
    h1: "Contact Kabad Factory",
    intro: `${siteConfig.phone} | ${siteConfig.email} | ${siteConfig.address}`,
    sections: [
      {
        title: "Call or WhatsApp",
        body: `For pickup help, call ${siteConfig.phone} or use WhatsApp support during business hours.`,
      },
      {
        title: "Service Area",
        body: "Kabad Factory currently focuses on Gwalior and nearby serviceable PIN codes configured in the backend.",
      },
    ],
  },
  {
    path: "/how-it-works",
    label: "How It Works",
    kind: "content",
    seo: {
      title: "How Scrap Pickup Works | Kabad Factory Gwalior",
      description:
        "See how to check your PIN code, select scrap items, choose a pickup slot, and receive transparent payment with Kabad Factory.",
      canonical: "/how-it-works",
    },
    h1: "How Doorstep Scrap Pickup Works",
    sections: [
      {
        title: "1. Check Pickup Availability",
        body: "Enter your PIN code so the backend can verify serviceability and pickup charge using configured stores and charge slabs.",
      },
      {
        title: "2. Select Scrap Items",
        body: "Choose paper, metal, plastic, appliance, or e-waste categories and add an estimated weight.",
      },
      {
        title: "3. Schedule a Slot",
        body: "Login or register, select address, date and time, then create the pickup request.",
      },
      {
        title: "4. Weigh, Pay, and Bill",
        body: "The executive records actual weights, final payable amount, payment status, and bill details.",
      },
    ],
  },
  {
    path: "/scrap-rates",
    label: "Scrap Rates",
    kind: "rates",
    seo: {
      title: "Today's Scrap Rates in Gwalior | Kabad Factory",
      description:
        "Check current scrap rates in Gwalior for newspaper, iron, copper, aluminium, plastic, cardboard, e-waste, AC and more.",
      canonical: "/scrap-rates",
    },
    h1: "Today's Scrap Rates in Gwalior",
    faqs: commonFaqs,
  },
  {
    path: "/schedule-pickup",
    label: "Schedule Pickup",
    kind: "schedule",
    seo: {
      title: "Schedule Scrap Pickup Online in Gwalior | Kabad Factory",
      description:
        "Book a doorstep scrap pickup online with Kabad Factory using the same secure backend as the mobile app.",
      canonical: "/schedule-pickup",
    },
    h1: "Schedule Scrap Pickup",
  },
  {
    path: "/app-coming-soon",
    label: "App Coming Soon",
    kind: "appComingSoon",
    seo: {
      title: "Kabad Factory Mobile App Coming Soon",
      description:
        "The Kabad Factory Android and iOS mobile apps are currently under development.",
      canonical: "/app-coming-soon",
    },
    h1: "Our Mobile App Is Coming Soon!",
  },
  {
    path: "/gwalior",
    label: "Gwalior",
    kind: "city",
    seo: {
      title: "Online Kabadiwala in Gwalior | Sell Kabad Online | Kabad Factory",
      description:
        "Kabad Factory helps Gwalior customers sell scrap online, check rates, verify PIN serviceability, and book doorstep pickup.",
      canonical: "/gwalior",
    },
    h1: "Online Kabadiwala in Gwalior",
    intro:
      "A local-first page for customers searching kabadiwala near me, raddi wala near me, or doorstep scrap pickup in Gwalior.",
    faqs: commonFaqs,
  },
  {
    path: "/gwalior/scrap-rates",
    label: "Gwalior Scrap Rates",
    kind: "rates",
    seo: {
      title: "Scrap Rates Gwalior | Live Kabad Rates | Kabad Factory",
      description:
        "View current Gwalior scrap rates from the Kabad Factory backend and schedule a pickup from serviceable PIN codes.",
      canonical: "/gwalior/scrap-rates",
    },
    h1: "Scrap Rates Gwalior",
  },
  {
    path: "/blog",
    label: "Blog",
    kind: "blog",
    seo: {
      title: "Scrap Selling Guides | Kabad Factory Blog",
      description:
        "Helpful guides about selling scrap, preparing recyclable material, checking rates, and booking pickup in Gwalior.",
      canonical: "/blog",
    },
    h1: "Scrap Selling Guides",
  },
  {
    path: "/faq",
    label: "FAQ",
    kind: "faq",
    seo: {
      title: "Kabad Factory FAQ | Scrap Pickup Questions",
      description:
        "Answers about Kabad Factory scrap pickup, rates, pickup charges, orders, payment, and support.",
      canonical: "/faq",
    },
    h1: "Frequently Asked Questions",
    faqs: commonFaqs,
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
      noindex: true,
    },
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
      noindex: true,
    },
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
      noindex: true,
    },
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
      noindex: true,
    },
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    kind: "legal",
    seo: {
      title: "Privacy Policy | Kabad Factory",
      description:
        "Read Kabad Factory privacy practices for customer data, pickup orders, support requests, and account information.",
      canonical: "/privacy-policy",
    },
    h1: "Privacy Policy",
  },
  {
    path: "/terms",
    label: "Terms",
    kind: "legal",
    seo: {
      title: "Terms and Conditions | Kabad Factory",
      description:
        "Read Kabad Factory service terms for scrap pickup, rates, payment, pickup charges, and account usage.",
      canonical: "/terms",
    },
    h1: "Terms and Conditions",
  },
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
      canonical: `/sell-scrap/${slug}`,
    },
    h1,
    intro: `Book doorstep pickup for ${accepts} in Gwalior with current database-backed rates.`,
    sections: [
      { title: `What ${label} Scrap We Accept`, body: accepts },
      {
        title: "How Pricing Works",
        body: "Current rates come from the Kabad Factory backend. Final payment uses executive-confirmed actual weight and saved rate snapshots.",
      },
      {
        title: "Pickup Charges",
        body: "Pickup charge is calculated by the backend from your pickup PIN code and nearest active store, including the 5 km buffer rule.",
      },
    ],
    faqs: commonFaqs,
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
      canonical: `/services/${slug}`,
    },
    h1,
    intro,
    sections: [
      {
        title: "Who It Is For",
        body: "Homes, shops, offices, societies, and businesses that want organized pickup and transparent settlement.",
      },
      {
        title: "What You Can Track",
        body: "Pickup status, selected items, pickup charge, final payable amount, and downloadable bill after completion.",
      },
      {
        title: "Start Online",
        body: "Use the PIN checker and schedule form to create a pickup request directly on the website.",
      },
    ],
    faqs: commonFaqs,
  });
});

export const seoRoutes = routes.filter(
  (route) => !route.noSitemap && route.kind !== "notFound",
);

export const quickActions = [
  {
    href: "/pickup-services",
    title: "Doorstep Pickup",
    body: "Household, office and bulk collection",
    icon: Truck,
  },
  {
    href: "/scrap-rates",
    title: "Transparent Rates",
    body: "Check latest scrap prices",
    icon: BadgeIndianRupee,
  },
  {
    href: "/schedule-pickup",
    title: "Easy Scheduling",
    body: "Book a date and time online",
    icon: CalendarCheck,
  },
  {
    href: "/orders",
    title: "Order Tracking",
    body: "Track pickup status and charges",
    icon: FileText,
  },
];

export const businessSchema = {
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
    addressCountry: "IN",
  },
  areaServed: ["Gwalior", "Madhya Pradesh"],
  openingHours: "Mo-Sa 09:00-20:00",
  sameAs: [siteConfig.domain],
};

export const featureIcons = [
  Home,
  Recycle,
  ShieldCheck,
  Building2,
  CheckCircle2,
];
