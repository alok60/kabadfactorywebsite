import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Menu,
  MapPin,
  MapPinned,
  Phone,
  Plus,
  QrCode,
  Recycle,
  Search,
  ShieldCheck,
  Smartphone,
  Truck,
  WalletCards,
  X
} from "lucide-react";
import { AuthProvider, useAuth } from "./auth";
import { apiFetch, type Category, type Session } from "./api";
import { navLinks, quickActions, routes, scrapSlugs, trustItems, type RouteDef } from "./content";
import { siteConfig } from "./config";
import { absoluteUrl } from "./seo";

type AppProps = {
  initialPath?: string;
};

type Address = {
  id: number;
  fullName: string;
  mobile: string;
  label: "home" | "office" | "other";
  line1: string;
  line2: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
};

type AddressDraft = Omit<Address, "id">;

type BookingErrors = Partial<Record<"items" | "weightRange" | "pickupDate" | "timeSlot" | "address" | "submit", string>>;
type AddressErrors = Partial<Record<keyof AddressDraft, string>>;

const emptyAddressDraft: AddressDraft = {
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

export default function App({ initialPath }: AppProps) {
  const [path, setPath] = useState(initialPath || getBrowserPath());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => setPath(getBrowserPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(nextPath: string) {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", nextPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPath(nextPath);
  }

  const routePath = pathOnly(path);
  const route = routes.find((item) => item.path === routePath) || notFoundRoute;

  return (
    <AuthProvider>
      <SiteFrame route={route} navigate={navigate}>
        <PageRouter route={route} navigate={navigate} currentPath={path} />
      </SiteFrame>
    </AuthProvider>
  );
}

function SiteFrame({ route, navigate, children }: { route: RouteDef; navigate: (path: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { session, logout } = useAuth();

  return (
    <div>
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2" href="#main">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-line bg-white shadow-sm lg:bg-white/[0.92] lg:shadow-none lg:backdrop-blur-xl">
        <div className="container-page flex min-h-[68px] items-center justify-between gap-3 sm:min-h-[76px] sm:gap-5">
          <a href="/" onClick={(event) => linkClick(event, "/", navigate)} className="flex min-w-0 items-center gap-3">
            <span className="flex h-12 w-36 shrink-0 items-center justify-center rounded-lg bg-white px-1 sm:h-14 sm:w-40 xl:w-44">
              <img src={siteConfig.assets.logo} alt="Kabad Factory" className="h-full w-full object-contain" />
            </span>
            <span className="sr-only">
              <strong className="block text-lg leading-5 text-ink">Kabad Factory</strong>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Innovators of Recycling</span>
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[0.85rem] font-bold text-muted xl:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => linkClick(event, link.href, navigate)} className={`nav-link hover:text-ink ${route.path === link.href ? "text-ink" : ""}`}>{link.label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={siteConfig.appDownloadUrl} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50">
              <Smartphone size={16} /> <span className="hidden 2xl:inline">Get the App</span><span className="2xl:hidden">App</span>
            </a>
            {session ? (
              <>
                <a href="/account" onClick={(event) => linkClick(event, "/account", navigate)} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-extrabold text-ink hover:border-brand-200 hover:bg-brand-50">Account</a>
                <button onClick={logout} className="rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink">Logout</button>
              </>
            ) : (
              <>
                <a href="/login" onClick={(event) => linkClick(event, "/login", navigate)} className="rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink">Login</a>
              </>
            )}
            <a href="/schedule-pickup" onClick={(event) => linkClick(event, "/schedule-pickup", navigate)} className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lift">Schedule Pickup</a>
          </div>
          <button className="shrink-0 rounded-xl border border-line bg-white p-2 text-ink shadow-sm lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </div>
        {open && (
          <div className="fixed inset-0 z-50 bg-ink/55 lg:hidden" onClick={() => setOpen(false)}>
            <div className="ml-auto flex h-full w-80 max-w-[88vw] flex-col gap-2 overflow-y-auto border-l border-brand-100 bg-white p-5 text-ink shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-12 w-36 items-center rounded-lg bg-white px-1"><img src={siteConfig.assets.logo} alt="Kabad Factory" className="h-full w-full object-contain" /></span>
                <button className="rounded-xl border border-line bg-white p-2 text-ink shadow-sm" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
              </div>
              {[...navLinks, { href: siteConfig.appDownloadUrl, label: "Get the App" }, { href: session ? "/account" : "/login", label: session ? "Account" : "Login" }].map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => { linkClick(event, link.href, navigate); setOpen(false); }} className="rounded-xl px-3 py-3 font-extrabold text-ink hover:bg-brand-50">{link.label}</a>
              ))}
              <a href="/schedule-pickup" onClick={(event) => { linkClick(event, "/schedule-pickup", navigate); setOpen(false); }} className="mt-3 rounded-full bg-brand-600 px-5 py-3 text-center font-extrabold text-white shadow-soft">Schedule Pickup</a>
            </div>
          </div>
        )}
      </header>
      <main id="main">{children}</main>
      <Footer navigate={navigate} current={route.path} />
    </div>
  );
}

function PageRouter({ route, navigate, currentPath }: { route: RouteDef; navigate: (path: string) => void; currentPath: string }) {
  if (route.kind === "home") return <HomePage navigate={navigate} />;
  if (route.kind === "rates") return <RatesPage route={route} navigate={navigate} />;
  if (route.kind === "schedule") return <SchedulePickupPage navigate={navigate} />;
  if (route.kind === "appComingSoon") return <AppComingSoonPage navigate={navigate} />;
  if (route.kind === "auth") return <AuthPage mode={route.path === "/register" ? "register" : "login"} navigate={navigate} currentPath={currentPath} />;
  if (route.kind === "account") return <AccountPage route={route} navigate={navigate} />;
  if (route.kind === "scrap") return <ScrapPage route={route} navigate={navigate} />;
  if (route.kind === "servicesIndex") return <PickupServicesPage route={route} navigate={navigate} />;
  if (route.kind === "service") return <ContentPage route={route} navigate={navigate} />;
  if (route.kind === "city") return <CityPage route={route} navigate={navigate} />;
  if (route.kind === "blog") return <BlogPage navigate={navigate} />;
  if (route.kind === "faq") return <FaqPage route={route} />;
  if (route.kind === "legal") return <LegalPage route={route} />;
  if (route.kind === "content") return <ContentPage route={route} navigate={navigate} />;
  return <NotFound navigate={navigate} />;
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <picture>
          <img src={siteConfig.assets.heroBanner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="eager" fetchPriority="high" />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/86 to-ink/36" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page grid min-h-[690px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.86fr]">
          <div className="reveal-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-brand-100 backdrop-blur">
              <MapDot /> Doorstep scrap pickup in Gwalior
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Sell Your Scrap the Smarter Way with Kabad Factory</h1>
            <p className="mt-5 max-w-2xl text-xl font-extrabold leading-8 text-brand-100">Kabad hai? Raddi hai? Fenkna nahi — Kabad Factory ko bechna hai!</p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/84">Check the latest scrap rates, schedule doorstep pickup and manage your pickups easily — all from one convenient platform.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pin-checker" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-6 py-3 font-black text-brand-700">
                Check Pickup Availability
              </a>
              <button onClick={() => navigate("/schedule-pickup")} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700">
                Schedule Pickup <ArrowRight size={18} />
              </button>
              <a href={siteConfig.appDownloadUrl} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-black text-white backdrop-blur">Get the App</a>
            </div>
            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3 text-sm text-white/74">
              {["Transparent rates", "Digital weighing", "Order tracking"].map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-center font-bold backdrop-blur">{item}</span>)}
            </div>
          </div>
          <div className="glass-panel reveal-up reveal-delay rounded-card border border-white/20 p-5 text-ink shadow-lift sm:p-7 lg:justify-self-end">
            <PinChecker onSchedule={() => navigate("/schedule-pickup")} />
          </div>
        </div>
      </section>
      <QuickActions navigate={navigate} />
      <RatesPreview navigate={navigate} />
      <ScrapCategoriesGrid navigate={navigate} />
      <HowItWorks />
      <PickupServicesTeaser navigate={navigate} />
      <WhyChoose />
      <AppDownloadSection navigate={navigate} />
      <BrandStory navigate={navigate} />
      <BusinessPickup navigate={navigate} />
      <FaqSection />
      <FinalCta navigate={navigate} />
    </>
  );
}

function PinChecker({ onSchedule }: { onSchedule: () => void }) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ serviceable: boolean; data?: { pickupCharge: number; distanceKm: number }; message?: string } | null>(null);
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
      const response = await apiFetch<{ serviceable: boolean; data: { pickupCharge: number; distanceKm: number }; message: string }>(`/serviceability/pincode?pincode=${pin}`);
      setResult(response);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unable to check pickup availability right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="pin-checker" aria-labelledby="pin-heading">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"><Search /></span>
        <div>
          <h2 id="pin-heading" className="text-xl font-black text-ink">Pickup Availability Checker</h2>
          <p className="text-sm text-muted">Enter your PIN to check local pickup availability.</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} placeholder="Enter PIN code" className="focus-ring min-h-12 flex-1 rounded-2xl border border-brand-100 bg-brand-50 px-4 font-bold text-ink" />
        <button onClick={check} disabled={loading} className="focus-ring rounded-2xl bg-ink px-5 py-3 font-black text-white disabled:opacity-60">{loading ? "Checking..." : "Check"}</button>
      </div>
      {error && <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
      {result?.serviceable && (
        <div className="mt-5 rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <p className="flex items-center gap-2 font-black text-brand-700"><CheckCircle2 size={19} /> Pickup available</p>
          <p className="mt-2 text-sm text-muted">
            {Number(result.data?.pickupCharge || 0) > 0 ? <>Pickup Charge: <strong className="text-ink">₹{Number(result.data?.pickupCharge).toFixed(0)}</strong></> : <strong className="text-ink">Free Pickup</strong>}
          </p>
          <button onClick={onSchedule} className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-black text-white">Schedule Pickup <ArrowRight size={16} /></button>
        </div>
      )}
    </section>
  );
}

function RatesPreview({ navigate }: { navigate: (path: string) => void }) {
  const { categories, loading } = useCategories();
  const preview = categories.slice(0, 6);
  return (
    <section className="container-page py-16">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <SectionIntro eyebrow="Latest rates" title="Today's Scrap Rates in Gwalior" body="See current prices before you schedule. Rates are loaded from the Kabad Factory backend." />
        <button onClick={() => navigate("/scrap-rates")} className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-5 py-3 font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50">View All Rates <ChevronRight size={17} /></button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(loading ? Array.from({ length: 6 }) : preview).map((item, index) => (
          <div key={index} className="card group flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            <div>
              <h3 className="font-black text-ink">{isCategory(item) ? item.name : "Loading rate"}</h3>
              <p className="text-sm text-muted">Current listed rate</p>
            </div>
            <p className="text-xl font-black text-brand-700">{isCategory(item) ? formatRate(item) : "--"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActions({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page -mt-12 relative z-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(({ href, title, body, icon: Icon }) => (
          <button key={href} onClick={() => navigate(href)} className="card group flex min-h-32 items-center gap-4 p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white"><Icon /></span>
            <span>
              <strong className="block text-base text-ink">{title}</strong>
              <span className="mt-1 block text-sm text-muted">{body}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function RatesPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  const { categories, loading, error, reload } = useCategories();
  const [search, setSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const availableMaterials = MATERIAL_CATEGORY_ORDER;
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return categories.filter((item) =>
      (selectedMaterial === "All" || materialCategory(item) === selectedMaterial) &&
      (!query || item.name.toLocaleLowerCase().includes(query))
    );
  }, [categories, search, selectedMaterial]);
  const groupedCategories = useMemo(() => {
    const groups = new Map<string, Category[]>();
    filteredCategories.forEach((item) => {
      const material = materialCategory(item);
      groups.set(material, [...(groups.get(material) || []), item]);
    });
    return (selectedMaterial === "All" ? availableMaterials : [selectedMaterial])
      .map((material) => ({ material, items: groups.get(material) || [] }))
      .filter((group) => group.items.length > 0);
  }, [availableMaterials, filteredCategories, selectedMaterial]);

  return (
    <>
      <PageHero route={route} />
      <section className="container-page pb-16">
        {error && <RetryBox message={error} onRetry={reload} />}
        <div className="mx-auto max-w-6xl">
          <label className="relative block">
            <span className="sr-only">Search scrap materials</span>
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-brand-700" size={22} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search any materials..." className="focus-ring min-h-16 w-full rounded-2xl border border-brand-100 bg-white py-4 pl-14 pr-12 text-base font-semibold text-ink shadow-soft placeholder:text-muted" />
            {search && <button type="button" onClick={() => setSearch("")} className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-muted hover:bg-brand-50 hover:text-ink" aria-label="Clear search"><X size={20} /></button>}
          </label>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Material categories">
            {["All", ...availableMaterials].map((material) => (
              <button key={material} type="button" onClick={() => setSelectedMaterial(material)} className={`focus-ring shrink-0 rounded-full px-5 py-2.5 text-sm font-extrabold transition ${selectedMaterial === material ? "bg-brand-600 text-white shadow-soft" : "bg-slate-100 text-ink hover:bg-brand-50"}`}>
                {material}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-wide text-brand-700">Current rates</p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">{selectedMaterial === "All" ? "Scrap Items" : `${selectedMaterial} Scrap Items`}</h1>
          </div>
          {loading ? <RatesLoadingCards /> : groupedCategories.length ? (
            <div className="mt-8 space-y-10">
              {groupedCategories.map((group) => (
                <section key={group.material} aria-labelledby={`material-${group.material}`}>
                  <h2 id={`material-${group.material}`} className="mb-4 text-xl font-black text-ink">{group.material}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {group.items.map((item) => <ScrapRateCard key={item.id} item={item} />)}
                  </div>
                </section>
              ))}
            </div>
          ) : <div className="mt-8 rounded-card border border-dashed border-brand-200 bg-brand-50 p-8 text-center"><p className="font-black text-ink">No scrap items match your search.</p><p className="mt-2 text-sm text-muted">Try another material name or clear the search.</p>{search && <button type="button" onClick={() => setSearch("")} className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm font-black text-white">Clear search</button>}</div>}
        </div>
      </section>
    </>
  );
}

function AppComingSoonPage({ navigate }: { navigate: (path: string) => void }) {
  return <section className="container-page flex min-h-[calc(100vh-76px)] items-center py-12">
    <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-card border border-brand-100 bg-white shadow-lift lg:grid-cols-[1fr_0.9fr]">
      <div className="p-8 sm:p-12">
        <img src={siteConfig.assets.logo} alt="Kabad Factory" className="h-16 w-52 object-contain object-left" />
        <p className="mt-10 text-sm font-black uppercase tracking-wide text-brand-700">Kabad Factory app</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl">Our Mobile App Is Coming Soon!</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">We're working on a better way to manage your scrap pickups. Our mobile app is coming soon.</p>
        <div className="mt-7 flex flex-wrap gap-3"><span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700">Android in development</span><span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-ink">iOS in development</span></div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => navigate("/")} className="rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft">Return to homepage</button><a href={`mailto:${siteConfig.email}`} className="rounded-full border border-brand-100 px-6 py-3 text-center font-black text-brand-700">Contact support</a></div>
      </div>
      <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-brand-50 p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.25),_transparent_55%)]" />
        <div className="relative grid h-56 w-36 place-items-center rounded-[2.5rem] border-8 border-ink bg-white shadow-lift"><Recycle size={68} className="text-brand-600" /><span className="absolute bottom-7 text-xs font-black text-brand-700">RECYCLE</span></div>
        <Smartphone className="absolute bottom-10 right-10 text-brand-700/30" size={88} aria-hidden="true" />
      </div>
    </div>
  </section>;
}

const MATERIAL_CATEGORY_ORDER = ["Paper", "Plastic", "Metal", "E-waste", "Glass", "Rubber", "Other", "Textile"];

function materialCategory(item: Category) {
  return MATERIAL_CATEGORY_ORDER.includes(item.category || "") ? item.category! : "Other";
}

function ScrapRateCard({ item }: { item: Category }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <article className="flex min-h-32 items-center gap-4 rounded-card bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-brand-700 shadow-sm">
      {item.iconUrl && !imageFailed ? <img src={item.iconUrl} alt="" className="h-full w-full object-cover" onError={() => setImageFailed(true)} /> : <Recycle size={28} aria-hidden="true" />}
    </div>
    <div className="min-w-0"><h3 className="truncate font-black text-ink" title={item.name}>{item.name}</h3><p className="mt-1 text-lg font-black text-brand-700">{formatRate(item)}</p></div>
  </article>;
}

function RatesLoadingCards() {
  return <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-card bg-brand-50" />)}</div>;
}

function SchedulePickupPage({ navigate }: { navigate: (path: string) => void }) {
  const { session } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [weightRange, setWeightRange] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState<AddressDraft>(emptyAddressDraft);
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [errors, setErrors] = useState<BookingErrors>({});
  const [pickupCharge, setPickupCharge] = useState<number | null>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successCharge, setSuccessCharge] = useState<number | null>(null);
  const [successBooking, setSuccessBooking] = useState<{ id: number; date: string; slot: string; address: string; items: string[] } | null>(null);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");

  const activeCategories = useMemo(() => categories.filter((item: Category & { isActive?: boolean; status?: string }) => item.isActive !== false && item.status !== "Hidden"), [categories]);
  const availableMaterials = MATERIAL_CATEGORY_ORDER;
  const visibleCategories = useMemo(() => {
    const query = itemSearch.trim().toLocaleLowerCase();
    return activeCategories.filter((item) => (selectedMaterial === "All" || materialCategory(item) === selectedMaterial) && (!query || item.name.toLocaleLowerCase().includes(query)));
  }, [activeCategories, itemSearch, selectedMaterial]);
  const visibleGroups = useMemo(() => (selectedMaterial === "All" ? availableMaterials.map((material) => ({ material, items: visibleCategories.filter((item) => materialCategory(item) === material) })).filter((group) => group.items.length) : [{ material: selectedMaterial, items: visibleCategories }]), [availableMaterials, selectedMaterial, visibleCategories]);
  const selectedAddress = addresses.find((item) => item.id === selectedAddressId) || null;
  const selectedItems = useMemo(() => selected.map((categoryId) => ({ categoryId, estimatedQuantity: estimateQuantity(weightRange) })), [selected, weightRange]);
  const quickDates = useMemo(() => nextDates(14), []);
  const canSubmit = Boolean(selected.length && weightRange && pickupDate && timeSlot && selectedAddressId);

  useEffect(() => {
    if (!session) return;
    loadAddresses();
  }, [session]);

  useEffect(() => {
    if (!session || !selectedAddress?.pincode) {
      setPickupCharge(null);
      return;
    }
    let ignore = false;
    apiFetch<{ serviceable: boolean; data?: { pickupCharge: number } }>(`/serviceability/pincode?pincode=${encodeURIComponent(selectedAddress.pincode)}`)
      .then((response) => {
        if (!ignore) setPickupCharge(response.serviceable ? Number(response.data?.pickupCharge || 0) : null);
      })
      .catch(() => {
        if (!ignore) setPickupCharge(null);
      });
    return () => {
      ignore = true;
    };
  }, [selectedAddress?.pincode, session]);

  async function loadAddresses(preferredAddressId?: number) {
    if (!session) return;
    setPageLoading(true);
    try {
      const response = await apiFetch<{ data: Address[] }>("/addresses", { token: session.token });
      const nextAddresses = response.data || [];
      setAddresses(nextAddresses);
      const defaultAddress = nextAddresses.find((item) => item.isDefault) || nextAddresses[0];
      const nextId = preferredAddressId || selectedAddressId || defaultAddress?.id || null;
      setSelectedAddressId(nextAddresses.some((item) => item.id === nextId) ? nextId : defaultAddress?.id || null);
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
      const saved = await apiFetch<Address & { duplicate?: boolean }>("/addresses", {
        method: "POST",
        token: session.token,
        body: JSON.stringify(prepareAddressPayload(addressDraft))
      });
      await loadAddresses(saved.id);
      setAddressDraft(emptyAddressDraft);
      setAddressErrors({});
      setErrors((current) => ({ ...current, address: undefined }));
      setShowAddressForm(false);
    } catch (err: any) {
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
      const booking = await apiFetch<{ pickup: { id?: number; pickupCharge: number } }>("/bookings", {
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
      const charge = Number(booking.pickup?.pickupCharge || 0);
      setPickupCharge(charge);
      setSuccessBooking({ id: booking.pickup?.id || 0, date: pickupDate, slot: timeSlot, address: selectedAddress ? formatAddress(selectedAddress) : "", items: selected.map((id) => activeCategories.find((item) => item.id === id)?.name || "Scrap item") });
      setSuccessCharge(charge);
      resetForm();
    } catch (err) {
      setErrors((current) => ({ ...current, submit: err instanceof Error ? err.message : "Could not schedule pickup. Please try again." }));
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <PageShell title="Schedule Scrap Pickup" subtitle="Login or register first, then continue booking your doorstep scrap pickup online.">
        <div className="mx-auto max-w-xl card p-6">
          <h2 className="text-2xl font-black text-ink">Continue to schedule pickup</h2>
          <p className="mt-3 text-muted">The website uses the same authenticated booking API as the mobile app, so your pickup, address, charge, and order history stay connected.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate("/login?next=/schedule-pickup")} className="rounded-full bg-brand-600 px-6 py-3 font-black text-white">Login</button>
            <button onClick={() => navigate("/register?next=/schedule-pickup")} className="rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700">New user? Register</button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Schedule Scrap Pickup" subtitle="Select items, estimated weight, saved address, pickup charge, date, and slot. The same backend creates your pickup as the mobile app.">
      <div className="mb-5 grid gap-2 md:grid-cols-6">
        {["Select Items", "Weight", "Pickup Address", "Pickup Charge", "Date / Time", "Review"].map((step, index) => (
          <div key={step} className={`min-w-0 rounded-2xl border px-3 py-2 text-xs font-black transition sm:text-sm ${scheduleStepComplete(index, { selected, weightRange, selectedAddressId, pickupCharge, pickupDate, timeSlot }) ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`}>
            <span className="mr-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px]">{index + 1}</span>{step}
          </div>
        ))}
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-5">
        <div className="min-w-0 space-y-4">
          <section className="card reveal-up min-w-0 p-4 sm:p-5">
            <SectionHeader icon={<Truck />} title="Select Items" error={errors.items} />
            <p className="mt-2 text-sm text-muted">Raddi ho ya loha, plastic ho ya purana samaan - Kabad Factory sab le jayega.</p>
            <label className="relative mt-5 block">
              <span className="sr-only">Search scrap materials</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-700" size={19} />
              <input value={itemSearch} onChange={(event) => setItemSearch(event.target.value)} placeholder="Search any materials..." className="focus-ring min-h-12 w-full rounded-2xl border border-brand-100 bg-brand-50 py-3 pl-11 pr-11 text-sm font-semibold text-ink placeholder:text-muted" />
              {itemSearch && <button type="button" onClick={() => setItemSearch("")} aria-label="Clear search" className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-muted hover:bg-white"><X size={18} /></button>}
            </label>
            <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Material categories">
              {["All", ...availableMaterials].map((material) => <button key={material} type="button" onClick={() => setSelectedMaterial(material)} className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-extrabold ${selectedMaterial === material ? "bg-brand-600 text-white" : "bg-slate-100 text-ink hover:bg-brand-50"}`}>{material}</button>)}
            </div>
            {categoriesLoading && !activeCategories.length ? <div className="mt-4 grid gap-2 sm:grid-cols-2 2xl:grid-cols-4">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-20 animate-pulse rounded-2xl bg-brand-50" />)}</div> : <div className="mt-4 space-y-5">{visibleGroups.map((group) => <div key={group.material}><h3 className="mb-2 font-black text-ink">{group.material}</h3><div className="grid min-w-0 gap-2 sm:grid-cols-2 2xl:grid-cols-4">{group.items.map((item) => <ScheduleCategoryItem key={item.id} item={item} selected={selected.includes(item.id)} onToggle={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} />)}</div></div>)}</div>}
            {!categoriesLoading && !visibleCategories.length && <p className="mt-5 rounded-2xl bg-brand-50 p-4 text-sm font-bold text-muted">No scrap items match your search. Try another material name or category.</p>}
          </section>

          <section className="card reveal-up min-w-0 p-4 sm:p-5">
            <SectionHeader icon={<WalletCards />} title="Estimated Weight / Quantity" error={errors.weightRange} />
            <div className="mt-4 flex flex-wrap gap-2">
              {weightRanges.map((range) => (
                <button key={range} onClick={() => setWeightRange(range)} className={`rounded-full border px-4 py-2 text-sm font-black transition ${weightRange === range ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted hover:border-brand-200"}`}>{range}</button>
              ))}
            </div>
          </section>

          <section className="card reveal-up min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionHeader icon={<MapPinned />} title="Saved Address" error={errors.address} />
              <button onClick={() => setShowAddressForm(true)} className="inline-flex items-center gap-2 rounded-full border border-brand-100 px-4 py-2 text-sm font-black text-brand-700"><Plus size={16} /> Add Address</button>
            </div>
            {pageLoading ? (
              <div className="mt-4 h-28 animate-pulse rounded-2xl bg-brand-50" />
            ) : addresses.length > 0 ? (
              <div className="mt-4 min-w-0"><label className="sr-only" htmlFor="pickup-address">Saved pickup address</label><select id="pickup-address" value={selectedAddressId || ""} onChange={(event) => setSelectedAddressId(Number(event.target.value) || null)} className="focus-ring min-h-12 w-full min-w-0 rounded-2xl border border-brand-100 bg-white px-3 text-sm font-bold text-ink">{addresses.map((item) => <option key={item.id} value={item.id}>{`${humanize(item.label)}${item.isDefault ? " (Default)" : ""} — ${formatAddress(item)}`}</option>)}</select>{selectedAddress && <div className="mt-3 min-w-0 rounded-2xl bg-brand-50 p-3"><strong className="text-ink">{humanize(selectedAddress.label)}{selectedAddress.isDefault ? " · Default" : ""}</strong><p className="mt-1 break-words text-sm leading-6 text-muted">{formatAddress(selectedAddress)}</p><p className="mt-1 text-sm font-bold text-ink">{selectedAddress.fullName} | {selectedAddress.mobile}</p></div>}</div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4">
                <p className="font-black text-ink">No saved address found</p>
                <p className="mt-1 text-sm text-muted">Add your pickup address once, then use it for faster repeat bookings.</p>
              </div>
            )}

            {showAddressForm && (
              <AddressForm draft={addressDraft} setDraft={setAddressDraft} errors={addressErrors} saving={savingAddress} onSave={saveAddress} onCancel={() => addresses.length ? setShowAddressForm(false) : undefined} />
            )}
          </section>

          <section className="card reveal-up min-w-0 p-4 sm:p-5">
            <SectionHeader icon={<CalendarDays />} title="Pickup Date / Time" error={errors.pickupDate || errors.timeSlot} />
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {quickDates.map((date) => (
                <button key={date.value} onClick={() => setPickupDate(date.value)} className={`min-w-[88px] rounded-2xl border px-3 py-3 text-center transition ${pickupDate === date.value ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-ink"}`}>
                  <span className="block text-xs font-black uppercase">{date.isToday ? "Today" : date.day}</span>
                  <span className="mt-1 block text-xl font-black">{date.date}</span>
                  <span className="block text-xs font-bold">{date.month}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {timeSlots.map((slot) => (
                <button key={slot} onClick={() => setTimeSlot(slot)} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${timeSlot === slot ? "border-brand-600 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`}><Clock className="mr-2 inline" size={16} />{slot}</button>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="card min-w-0 p-4 sm:p-5">
            <h2 className="text-xl font-black text-ink">Review Pickup</h2>
            <div className="mt-4 space-y-4 text-sm">
              <ReviewRow label="Items" value={selected.length ? `${selected.length} selected` : "Select scrap items"} />
              <ReviewRow label="Estimated weight" value={weightRange || "Choose range"} />
              <ReviewRow label="Pickup address" value={selectedAddress ? `${selectedAddress.line1}, ${selectedAddress.pincode}` : "Select saved address"} />
              <ReviewRow label="Pickup charge" value={pickupCharge === null ? "Calculated by backend" : pickupCharge > 0 ? `₹${pickupCharge.toFixed(0)}` : "Free Pickup"} strong />
              <ReviewRow label="Slot" value={pickupDate && timeSlot ? `${readableDate(pickupDate)} | ${timeSlot}` : "Choose date and time"} />
            </div>
            {errors.submit && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{errors.submit}</p>}
            <button onClick={submit} disabled={loading || !canSubmit} className="mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Scheduling..." : "Schedule Pickup"}</button>
            <a href={siteConfig.appDownloadUrl} className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-brand-100 px-5 py-3 text-sm font-black text-brand-700"><Smartphone size={17} /> Schedule Faster with the App</a>
          </div>
        </aside>
      </div>

      {successCharge !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="success-pop max-w-md card p-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700"><CheckCircle2 size={34} /></div>
            <h2 id="success-title" className="mt-5 text-2xl font-black text-ink">Pickup scheduled successfully</h2>
            {successBooking && <div className="mt-4 rounded-2xl bg-brand-50 p-4 text-left text-sm"><p className="font-black text-brand-700">Booking reference: #KF{successBooking.id}</p><p className="mt-2 text-muted">{readableDate(successBooking.date)} · {successBooking.slot}</p><p className="mt-1 text-muted">{successBooking.address}</p><p className="mt-2 font-bold text-ink">{successBooking.items.join(", ")}</p></div>}
            <p className="mt-2 font-bold text-muted">Pickup Charge: {successCharge > 0 ? `₹${successCharge.toFixed(0)}` : "Free"}</p>
            <button onClick={() => { setSuccessCharge(null); setSuccessBooking(null); navigate("/orders"); }} className="mt-6 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white">View bookings</button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

function ScheduleCategoryItem({ item, selected, onToggle }: { item: Category; selected: boolean; onToggle: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <button onClick={onToggle} className={`group flex min-w-0 items-center justify-between gap-2 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${selected ? "border-brand-500 bg-brand-50 shadow-soft" : "border-brand-100 bg-white hover:border-brand-200"}`} aria-pressed={selected}>
    <span className="flex min-w-0 items-center gap-2"><span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-50 text-brand-700">{item.iconUrl && !imageFailed ? <img src={item.iconUrl} alt="" className="h-full w-full object-cover" onError={() => setImageFailed(true)} /> : <Recycle size={18} />}</span><span className="min-w-0"><strong className="block break-words text-sm leading-tight text-ink">{item.name}</strong><span className="mt-1 block text-xs text-muted">{formatRate(item)}</span></span></span>
    {selected && <CheckCircle2 className="shrink-0 text-brand-600" />}
  </button>;
}

function AuthPage({ mode, navigate, currentPath }: { mode: "login" | "register"; navigate: (path: string) => void; currentPath: string }) {
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
      const session = await apiFetch<Session>(`/auth/${mode}`, { method: "POST", body: JSON.stringify(payload) });
      setSession(session);
      navigate(redirectPath || "/account");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Authentication failed.");
    }
  }

  return (
    <PageShell title={mode === "register" ? "Create Account" : "Login"} subtitle="Use the same secure mobile number and password flow as the mobile application.">
      <div className="mx-auto max-w-md card p-6">
        {mode === "register" && <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />}
        <Field label="Mobile Number" value={form.mobile} onChange={(value) => setForm({ ...form, mobile: value.replace(/\D/g, "").slice(0, 10) })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value.slice(0, 20) })} />
        {mode === "login" && <button onClick={() => setForgot(true)} className="mt-2 text-sm font-bold text-brand-700">Forgot Password?</button>}
        {message && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{message}</p>}
        <button onClick={submit} className="mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white">{mode === "register" ? "Register" : "Login"}</button>
        <button onClick={() => navigate(authSwitchPath(mode, redirectPath))} className="mt-4 w-full text-sm font-bold text-brand-700">{mode === "register" ? "Already registered? Login" : "New user? Register"}</button>
      </div>
      {forgot && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4">
          <div className="max-w-md card p-6">
            <h2 className="text-xl font-black text-ink">Reset Password</h2>
            <p className="mt-3 text-muted">To reset your password, please contact our support team on WhatsApp at {siteConfig.phone}. Our team will help you set a new password.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a className="rounded-2xl bg-brand-600 px-5 py-3 text-center font-black text-white" href={`https://wa.me/${siteConfig.phonePlain}?text=${encodeURIComponent("Hi, I need help resetting my account password.")}`}>Contact on WhatsApp</a>
              <button className="rounded-2xl border border-brand-100 px-5 py-3 font-black text-brand-700" onClick={() => setForgot(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

function AccountPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  const { session, loading, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session || route.path !== "/orders") return;
    apiFetch<{ data: any[] }>("/bookings?page=1&limit=10&status=all", { token: session.token })
      .then((response) => setOrders(response.data || []))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load orders."));
  }, [route.path, session]);

  if (loading) return <PageShell title="Account" subtitle="Restoring your session..." />;
  if (!session) return <PageShell title="Login Required" subtitle="Please login to view account pages."><button onClick={() => navigate("/login")} className="rounded-full bg-brand-600 px-5 py-3 font-black text-white">Login</button></PageShell>;

  return (
    <PageShell title={route.path === "/orders" ? "Orders" : "Account"} subtitle={`Welcome, ${session.user.name || session.user.mobile}.`}>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="card p-5">
          <p className="font-black text-ink">{session.user.name || "Kabad Factory User"}</p>
          <p className="mt-1 text-sm text-muted">{session.user.mobile}</p>
          <button onClick={() => navigate("/orders")} className="mt-5 w-full rounded-2xl border border-brand-100 px-4 py-3 text-left font-bold text-brand-700">Orders</button>
          <button onClick={logout} className="mt-3 w-full rounded-2xl bg-ink px-4 py-3 font-bold text-white">Logout</button>
        </aside>
        <section className="card p-5">
          {route.path !== "/orders" ? (
            <div>
              <h2 className="text-xl font-black text-ink">Manage your pickup journey</h2>
              <p className="mt-2 text-muted">Use Orders to view pickup status, item details, pickup charges, and bills.</p>
            </div>
          ) : error ? <RetryBox message={error} onRetry={() => navigate("/orders")} /> : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-2xl border border-brand-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-black text-ink">#KF{order.id}</h2>
                      <p className="text-sm text-muted">{order.pickupDate} | {order.timeSlot}</p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-700">{order.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{[order.line1, order.city, order.pincode].filter(Boolean).join(", ")}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-ink">
                    <span>{order.itemCount || 0} items</span>
                    <span>Pickup ₹{Number(order.pickupCharge || 0).toFixed(0)}</span>
                    <span>{order.status === "completed" ? `Total ₹${Number(order.totalAmount || 0).toFixed(0)}` : "Total Pending"}</span>
                  </div>
                </article>
              ))}
              {!orders.length && <p className="text-muted">No orders found.</p>}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

function ScrapPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  return (
    <>
      <PageHero route={route} action={() => navigate("/schedule-pickup")} actionLabel="Schedule Pickup" />
      <ContentBlocks route={route} />
      <RatesPreview navigate={navigate} />
      <FaqSection />
    </>
  );
}

function ContentPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  if (route.path === "/about") return <AboutPage route={route} navigate={navigate} />;

  return (
    <>
      <PageHero route={route} action={() => navigate("/schedule-pickup")} actionLabel="Schedule Pickup" />
      <ContentBlocks route={route} />
      <section className="container-page pb-16">
        <div className="card flex flex-col items-start justify-between gap-5 bg-brand-900 p-7 text-white md:flex-row md:items-center">
          <div><h2 className="text-2xl font-black">Ready to sell scrap?</h2><p className="mt-2 text-brand-100">Check your PIN code and schedule a pickup online.</p></div>
          <button onClick={() => navigate("/schedule-pickup")} className="rounded-full bg-white px-6 py-3 font-black text-brand-700">Schedule Pickup</button>
        </div>
      </section>
    </>
  );
}

function AboutPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        <img src={siteConfig.assets.heroBanner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/84 to-ink/35" />
        <div className="container-page reveal-up">
          <Breadcrumb path={route.path} />
          <h1 className="mt-5 max-w-4xl text-4xl font-black sm:text-6xl">About Kabad Factory</h1>
          <p className="mt-5 max-w-3xl text-xl font-bold leading-9 text-brand-100">A cleaner, simpler way to sell recyclables from home.</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/84">Kabad Factory brings current scrap rates, doorstep pickup, saved addresses and order tracking into one easy digital experience for Gwalior customers.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate("/pickup-services")} className="rounded-full bg-white px-6 py-3 text-center font-black text-brand-700">Explore Services</button>
            <button onClick={() => navigate("/schedule-pickup")} className="rounded-full bg-brand-600 px-6 py-3 font-black text-white">Schedule Pickup</button>
            <a href={siteConfig.appDownloadUrl} className="rounded-full border border-white/25 px-6 py-3 text-center font-black text-white">Download App</a>
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <SectionIntro eyebrow="Our Mission" title="Easy, transparent recycling — one doorstep at a time" body="Whether it is paper, metal, plastic, electronics, or household scrap, our goal is to help customers recycle responsibly without carrying scrap to a local dealer." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(route.sections || []).map((section, index) => {
            const Icon = [Truck, BadgeCheck, Smartphone, Recycle][index] || ShieldCheck;
            return (
              <article key={section.title} className="card reveal-up p-5 transition hover:-translate-y-1 hover:border-brand-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Icon /></div>
                <h2 className="mt-5 text-xl font-black text-ink">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{section.body}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-700">Our Vision</p>
            <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">A cleaner city where selling scrap is as simple as ordering a service online.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Doorstep pickup from saved addresses", "Current scrap rates from backend", "Pickup charge before confirmation", "Orders and bills in one account"].map((item) => (
              <div key={item} className="rounded-2xl border border-brand-100 bg-brand-50 p-4 font-bold text-ink"><CheckCircle2 className="mb-3 text-brand-700" />{item}</div>
            ))}
          </div>
        </div>
      </section>
      <AppDownloadSection navigate={navigate} />
    </>
  );
}

function PickupServicesPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  const services = [
    ["Doorstep Scrap Pickup", "Book collection from home for paper, metal, plastic, appliances and mixed recyclable scrap."],
    ["Household Scrap Pickup", "Clear everyday home scrap without visiting a local dealer or weighing shop."],
    ["Bulk Scrap Pickup", "Plan larger pickups for homes, societies, shops and local businesses."],
    ["Office Scrap Pickup", "Dispose of office paper, packaging, old electronics and workspace scrap with documented status."],
    ["Commercial Scrap Pickup", "Coordinate one-time or repeat scrap collection for business material."],
    ["E-Waste Pickup", "Schedule responsible pickup for accepted wires, devices, computer parts and small electronics."]
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white">
        <img src={siteConfig.assets.heroBanner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/88 to-brand-900/42" />
        <div className="container-page">
          <Breadcrumb path={route.path} />
          <h1 className="mt-5 max-w-4xl text-4xl font-black sm:text-6xl">{route.h1}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-100">{route.intro}</p>
          <button onClick={() => navigate("/schedule-pickup")} className="mt-8 rounded-full bg-white px-6 py-3 font-black text-brand-700">Schedule Pickup</button>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionIntro eyebrow="Our Pickup Services" title="What Kabad Factory Collects" body="Doorstep pickup is designed for homes, offices and local businesses that want a clean, transparent way to sell scrap." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, body]) => (
            <article key={title} className="card p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
              <Truck className="text-brand-700" />
              <h2 className="mt-4 text-xl font-black text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionIntro eyebrow="Where We Serve" title="Currently focused on Gwalior serviceable PIN codes" body="Availability and pickup charges are checked from the backend using the customer's PIN code and configured pickup-charge rules." />
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-muted">
              <span className="rounded-full border border-line bg-brand-50 px-4 py-2">Gwalior</span>
              <span className="rounded-full border border-line bg-brand-50 px-4 py-2">PIN-based serviceability</span>
              <span className="rounded-full border border-line bg-brand-50 px-4 py-2">Transparent pickup charge</span>
            </div>
          </div>
          <div className="card p-5 sm:p-7">
            <PinChecker onSchedule={() => navigate("/schedule-pickup")} />
          </div>
        </div>
      </section>

      <AppDownloadSection navigate={navigate} />
      <FaqSection />
    </>
  );
}

function CityPage({ route, navigate }: { route: RouteDef; navigate: (path: string) => void }) {
  return (
    <>
      <PageHero route={route} action={() => navigate("/schedule-pickup")} actionLabel="Book Pickup" />
      <section className="container-page grid gap-5 pb-16 md:grid-cols-3">
        {["Online Kabadiwala Gwalior", "Scrap Pickup Gwalior", "Raddi Wala Near Me"].map((title) => (
          <div key={title} className="card p-5">
            <h2 className="text-xl font-black text-ink">{title}</h2>
            <p className="mt-2 text-muted">Kabad Factory connects local pickup availability, current scrap rates, and digital order tracking for Gwalior customers.</p>
          </div>
        ))}
      </section>
      <RatesPreview navigate={navigate} />
      <FaqSection />
    </>
  );
}

function BlogPage({ navigate }: { navigate: (path: string) => void }) {
  const posts = [
    ["How to Prepare Scrap Before Pickup", "Sort paper, metal, plastic and e-waste separately for faster weighing and clearer settlement."],
    ["Why Scrap Rates Change", "Scrap values move with commodity prices, material quality, and quantity."],
    ["How Pickup Charges Work", "Kabad Factory calculates pickup charges using backend store PIN, customer PIN, active slabs, and distance buffer."]
  ];
  return (
    <PageShell title="Scrap Selling Guides" subtitle="Useful, local-first guides for customers selling scrap online in Gwalior.">
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map(([title, body]) => <article key={title} className="card p-5"><h2 className="text-xl font-black text-ink">{title}</h2><p className="mt-3 text-muted">{body}</p></article>)}
      </div>
      <button onClick={() => navigate("/schedule-pickup")} className="mt-8 rounded-full bg-brand-600 px-6 py-3 font-black text-white">Schedule Pickup</button>
    </PageShell>
  );
}

function FaqPage({ route }: { route: RouteDef }) {
  return <PageShell title={route.h1 || "FAQ"} subtitle={route.seo.description}><FaqSection plain /></PageShell>;
}

function LegalPage({ route }: { route: RouteDef }) {
  return (
    <PageShell title={route.h1 || route.label} subtitle={route.seo.description}>
      <div className="card max-w-none p-6">
        <h2>Service Information</h2>
        <p>Kabad Factory uses customer account data, pickup addresses, selected scrap items, pricing data, and order status information to provide doorstep scrap pickup and support.</p>
        <h2>Customer Responsibility</h2>
        <p>Customers should provide accurate mobile numbers, pickup addresses, PIN codes, selected items, and scheduling details.</p>
        <h2>Contact</h2>
        <p>For questions, contact {siteConfig.email} or {siteConfig.phone}.</p>
      </div>
    </PageShell>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
      <SectionIntro eyebrow="Simple flow" title="How It Works" body="From PIN check to verified pickup, the process stays simple and transparent." />
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {trustItems.map(({ icon: Icon, title, body }, index) => (
          <div key={title} className="card group p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            <div className="flex h-12 w-12 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white"><Icon /></div>
            <p className="mt-5 text-sm font-black text-amber">Step {index + 1}</p>
            <h3 className="mt-1 text-base font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="py-16">
      <div className="container-page grid gap-8 lg:grid-cols-2">
        <div>
          <SectionIntro eyebrow="Why Kabad Factory" title="Doorstep Pickup. Transparent Rates. Easy Recycling." body="Sell scrap online with clearer pricing, saved addresses, pickup tracking, and a cleaner service experience." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Current rates from backend", "PIN-based serviceability", "Pickup charge before booking", "Orders and bills in one account"].map((item) => (
            <div key={item} className="rounded-card border border-line bg-white p-5 font-bold text-ink shadow-soft"><ShieldCheck className="mb-3 text-brand-700" />{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppDownloadSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page py-16">
      <div className="grid overflow-hidden rounded-card border border-line bg-white shadow-soft lg:grid-cols-[1fr_0.82fr]">
        <div className="p-7 md:p-10">
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">Get the App</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black text-ink sm:text-4xl">Take Kabad Factory with You</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">Schedule pickups, manage addresses and track your orders faster with the Kabad Factory app.</p>
          <p className="mt-4 font-black text-brand-700">Ghar ka kabad ab tension nahi — pickup schedule karo aur becho aasani se.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.appDownloadUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-black text-white"><Smartphone size={18} /> Get the App</a>
            <button onClick={() => navigate("/schedule-pickup")} className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700">Schedule on Website <ArrowRight size={18} /></button>
          </div>
          <div className="mt-7 flex max-w-sm items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white text-brand-700"><QrCode size={46} /></div>
            <p className="text-sm font-bold text-muted">Our Android and iOS apps are in development. Tap Get the App for the latest availability information.</p>
          </div>
        </div>
        <div className="relative min-h-[360px] bg-brand-50">
          <img src={siteConfig.assets.appMockup} alt="Kabad Factory mobile app mockup showing schedule, saved addresses, rates and orders" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function ScrapCategoriesGrid({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page py-16">
      <SectionIntro eyebrow="What can you sell?" title="Sell Your Recyclables with Kabad Factory" body="Choose from common household, office, appliance, paper, metal, plastic and e-waste categories." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scrapSlugs.map(([slug, label]) => (
          <button key={slug} onClick={() => navigate(`/sell-scrap/${slug}`)} className="card group flex items-center justify-between p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            <span><strong className="block text-ink">{label}</strong><span className="text-sm text-muted">Rates, pickup, FAQ</span></span><ChevronRight className="text-brand-700" />
          </button>
        ))}
      </div>
    </section>
  );
}

function PickupServicesTeaser({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page py-16">
      <div className="grid gap-8 rounded-card border border-line bg-brand-50 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">Pickup Services</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Household, bulk, office and e-waste pickup in one place.</h2>
          <p className="mt-4 leading-7 text-muted">See what Kabad Factory collects, where service is available, and check your PIN before scheduling.</p>
          <button onClick={() => navigate("/pickup-services")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700">Explore Pickup Services <ArrowRight size={18} /></button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Doorstep Scrap Pickup", "Household Scrap Pickup", "Bulk Scrap Pickup", "Office Scrap Pickup", "Commercial Scrap Pickup", "E-Waste Pickup"].map((item) => (
            <div key={item} className="rounded-card border border-line bg-white p-4 font-extrabold text-ink shadow-soft"><CheckCircle2 className="mb-3 text-brand-700" />{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="bg-white py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">About Kabad Factory</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Your Scrap Has Value. Sell It from Home.</h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted">Kabad Factory helps customers sell scrap online with current rates, doorstep pickup, saved addresses and order tracking. It is built for a cleaner city and a more convenient recycling experience.</p>
          <button onClick={() => navigate("/about")} className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:border-brand-200 hover:bg-brand-50">Learn More <ChevronRight size={17} /></button>
        </div>
      </div>
    </section>
  );
}

function BusinessPickup({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page py-16">
      <div className="relative isolate overflow-hidden rounded-card bg-brand-900 p-7 text-white shadow-soft md:p-10">
        <img src={siteConfig.assets.heroBanner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/92 to-brand-900/45" />
        <div className="max-w-3xl reveal-up">
          <p className="text-sm font-black uppercase tracking-wide text-brand-100">Bulk and business pickup</p>
          <h2 className="mt-3 text-3xl font-black">Office, commercial, and large scrap collection</h2>
          <p className="mt-4 text-brand-100">Plan bigger pickups with item-wise collection details, pickup charge visibility, and completion billing.</p>
          <button onClick={() => navigate("/pickup-services")} className="mt-6 rounded-full bg-white px-6 py-3 font-black text-brand-700">Explore Services</button>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="container-page pb-16">
      <div className="rounded-card border border-line bg-white p-7 text-center shadow-soft md:p-10">
        <h2 className="text-3xl font-black text-ink sm:text-4xl">Ready to sell your scrap?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Check pickup availability, compare current rates and schedule a convenient doorstep pickup.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => navigate("/schedule-pickup")} className="rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:bg-brand-700">Schedule Pickup</button>
          <button onClick={() => navigate("/scrap-rates")} className="rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:bg-brand-50">Check Scrap Rates</button>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ plain = false }: { plain?: boolean }) {
  const faqs = routes.find((route) => route.path === "/")?.faqs || [];
  return (
    <section className={plain ? "" : "container-page py-14"}>
      {!plain && <SectionIntro eyebrow="FAQ" title="Questions customers ask before selling scrap" body="Clear answers help search visibility and reduce support calls." />}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="cursor-pointer text-base font-black text-ink">{faq.question}</summary>
            <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContentBlocks({ route }: { route: RouteDef }) {
  return (
    <section className="container-page grid gap-5 py-12 md:grid-cols-3">
      {(route.sections || []).map((section) => (
        <article key={section.title} className="card p-5">
          <h2 className="text-xl font-black text-ink">{section.title}</h2>
          <p className="mt-3 leading-7 text-muted">{section.body}</p>
        </article>
      ))}
    </section>
  );
}

function PageHero({ route, action, actionLabel }: { route: RouteDef; action?: () => void; actionLabel?: string }) {
  return (
    <section className="bg-brand-50 py-16">
      <div className="container-page">
        <Breadcrumb path={route.path} />
        <h1 className="mt-5 max-w-4xl text-4xl font-black text-ink sm:text-5xl">{route.h1 || route.label}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{route.intro || route.seo.description}</p>
        {action && <button onClick={action} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white">{actionLabel || "Continue"} <ArrowRight size={18} /></button>}
      </div>
    </section>
  );
}

function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <>
      <section className="bg-brand-50 py-14">
        <div className="container-page">
          <h1 className="text-4xl font-black text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{subtitle}</p>
        </div>
      </section>
      <section className="container-page py-12">{children}</section>
    </>
  );
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-wide text-brand-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl leading-7 text-muted">{body}</p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", error }: { label: string; value: string; onChange: (value: string) => void; type?: string; error?: string }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <input className={`focus-ring mt-2 min-h-12 w-full rounded-2xl border bg-white px-4 text-ink ${error ? "border-red-300" : "border-brand-100"}`} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      {error && <span className="mt-2 block text-sm font-bold text-red-700">{error}</span>}
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <select className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-brand-100 bg-brand-50 px-4 text-ink" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function AddressForm({ draft, setDraft, errors, saving, onSave, onCancel }: { draft: AddressDraft; setDraft: React.Dispatch<React.SetStateAction<AddressDraft>>; errors: AddressErrors; saving: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4">
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field label="Full Name" value={draft.fullName} onChange={(value) => setDraft((current) => ({ ...current, fullName: value }))} error={errors.fullName} />
        <Field label="Mobile" value={draft.mobile} onChange={(value) => setDraft((current) => ({ ...current, mobile: value.replace(/\D/g, "").slice(0, 15) }))} error={errors.mobile} />
        <Field label="Address Line" value={draft.line1} onChange={(value) => setDraft((current) => ({ ...current, line1: value }))} error={errors.line1} />
        <Field label="Street / Locality" value={draft.line2} onChange={(value) => setDraft((current) => ({ ...current, line2: value }))} error={errors.line2} />
        <Field label="Landmark" value={draft.landmark || ""} onChange={(value) => setDraft((current) => ({ ...current, landmark: value }))} error={errors.landmark} />
        <Field label="City" value={draft.city} onChange={(value) => setDraft((current) => ({ ...current, city: value }))} error={errors.city} />
        <Field label="State" value={draft.state} onChange={(value) => setDraft((current) => ({ ...current, state: value }))} error={errors.state} />
        <Field label="PIN Code" value={draft.pincode} onChange={(value) => setDraft((current) => ({ ...current, pincode: value.replace(/\D/g, "").slice(0, 6) }))} error={errors.pincode} />
      </div>
      <div className="mt-4">
        <span className="text-sm font-bold text-ink">Address Type</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["home", "office", "other"] as const).map((label) => (
            <button key={label} onClick={() => setDraft((current) => ({ ...current, label }))} className={`rounded-full border px-4 py-2 text-sm font-black ${draft.label === label ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted"}`}>{humanize(label)}</button>
          ))}
        </div>
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm font-bold text-ink">
        <input type="checkbox" checked={Boolean(draft.isDefault)} onChange={(event) => setDraft((current) => ({ ...current, isDefault: event.target.checked }))} className="h-5 w-5 accent-brand-600" />
        Set as Default
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button onClick={onSave} disabled={saving} className="rounded-2xl bg-brand-600 px-5 py-3 font-black text-white disabled:opacity-60">{saving ? "Saving..." : "Save Address"}</button>
        <button onClick={onCancel} type="button" className="rounded-2xl border border-brand-100 bg-white px-5 py-3 font-black text-brand-700">Cancel</button>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, error }: { icon: React.ReactNode; title: string; error?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">{icon}</span>
        <h2 className="text-xl font-black text-ink">{title}</h2>
      </div>
      {error && <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
    </div>
  );
}

function ReviewRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-brand-50 pb-3 last:border-b-0">
      <span className="text-muted">{label}</span>
      <span className={`max-w-[58%] text-right ${strong ? "text-lg font-black text-brand-700" : "font-bold text-ink"}`}>{value}</span>
    </div>
  );
}

function Breadcrumb({ path }: { path: string }) {
  const parts = path.split("/").filter(Boolean);
  return (
    <nav className="flex flex-wrap gap-2 text-sm font-bold text-muted" aria-label="Breadcrumb">
      <a href="/" className="text-brand-700">Home</a>
      {parts.map((part, index) => <span key={index}>/ {part.replace(/-/g, " ")}</span>)}
    </nav>
  );
}

function Footer({ navigate }: { navigate: (path: string) => void; current: string }) {
  const links = ["/about", "/pickup-services", "/scrap-rates", "/how-it-works", "/contact", "/blog", "/gwalior", "/privacy-policy", "/terms"];
  return (
    <footer className="border-t border-line bg-white py-12">
      <div className="container-page grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <img src={siteConfig.assets.logo} alt="Kabad Factory" className="h-16 w-48 object-contain object-left" />
          <p className="mt-4 max-w-md text-muted">Sell scrap online from home with doorstep pickup, transparent rates, saved addresses and order tracking.</p>
          <p className="mt-4 text-sm font-bold text-ink">{siteConfig.address}</p>
          <p className="text-sm text-muted">{siteConfig.hours}</p>
        </div>
        <div>
          <h3 className="font-black text-ink">Quick Links</h3>
          <div className="mt-3 grid gap-2">
            {links.map((href) => <a key={href} href={href} onClick={(event) => linkClick(event, href, navigate)} className="text-sm font-semibold text-muted hover:text-brand-700">{hrefLabel(href)}</a>)}
          </div>
        </div>
        <div>
          <h3 className="font-black text-ink">Contact</h3>
          <a className="mt-3 flex items-center gap-2 text-sm font-bold text-brand-700" href={`tel:${siteConfig.phonePlain}`}><Phone size={16} /> {siteConfig.phone}</a>
          <a className="mt-2 block text-sm font-semibold text-muted" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-black text-white" href={siteConfig.appDownloadUrl}><Smartphone size={16} /> Download App</a>
        </div>
      </div>
    </footer>
  );
}

function NotFound({ navigate }: { navigate: (path: string) => void }) {
  return <PageShell title="Page not found" subtitle="The page you opened does not exist."><button className="rounded-full bg-brand-600 px-5 py-3 font-black text-white" onClick={() => navigate("/")}>Go Home</button></PageShell>;
}

function RetryBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700"><p className="font-bold">{message}</p><button onClick={onRetry} className="mt-3 rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white">Retry</button></div>;
}

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reload() {
    setLoading(true);
    setError("");
    apiFetch<{ data: Category[] }>("/categories")
      .then((response) => setCategories(response.data || []))
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load scrap rates."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    reload();
  }, []);

  return { categories, loading, error, reload };
}

function linkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string, navigate: (path: string) => void) {
  if (href.startsWith("http")) return;
  event.preventDefault();
  navigate(href);
}

function getBrowserPath() {
  if (typeof window === "undefined") return "/";
  return `${window.location.pathname}${window.location.search}`;
}

function pathOnly(path: string) {
  return path.split("?")[0] || "/";
}

function queryValue(path: string, key: string) {
  const query = path.split("?")[1] || "";
  return new URLSearchParams(query).get(key);
}

function safeRedirectPath(value: string | null) {
  if (!value) return "";
  try {
    const decoded = decodeURIComponent(value);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return "";
    return routes.some((route) => route.path === pathOnly(decoded)) ? decoded : "";
  } catch {
    return "";
  }
}

function authSwitchPath(mode: "login" | "register", redirectPath: string) {
  const target = mode === "register" ? "/login" : "/register";
  return redirectPath ? `${target}?next=${encodeURIComponent(redirectPath)}` : target;
}

function isCategory(value: unknown): value is Category {
  return Boolean(value && typeof value === "object" && "name" in value);
}

function formatRate(item: Category) {
  const unit = item.unit === "piece" ? "pcs" : item.unit || "kg";
  return `₹${Number(item.price || 0).toFixed(0)}/${unit}`;
}

function hrefLabel(href: string) {
  return href === "/" ? "Home" : href.split("/").filter(Boolean).pop()!.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function estimateQuantity(range: string) {
  if (range === "0-10 kg") return 10;
  if (range === "10-30 kg") return 30;
  if (range === "30-50 kg") return 50;
  if (range === "50-200 kg") return 200;
  return 250;
}

function validateBooking(values: { selected: number[]; weightRange: string; pickupDate: string; timeSlot: string; selectedAddressId: number | null }) {
  const errors: BookingErrors = {};
  if (!values.selected.length) errors.items = "Please select at least one scrap item.";
  if (!values.weightRange) errors.weightRange = "Please select the estimated weight.";
  if (!values.selectedAddressId) errors.address = "Please select a saved pickup address.";
  if (!values.pickupDate) errors.pickupDate = "Please select a pickup date.";
  if (!values.timeSlot) errors.timeSlot = "Please select a time slot.";
  return errors;
}

function validateAddress(draft: AddressDraft) {
  const errors: AddressErrors = {};
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

function prepareAddressPayload(draft: AddressDraft) {
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

function serverFieldErrors(error: any) {
  const fieldErrors = error?.details?.fieldErrors || {};
  const mapped: AddressErrors = {};
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    mapped[field as keyof AddressErrors] = Array.isArray(messages) ? String(messages[0]) : String(messages);
  });
  return mapped;
}

function scheduleStepComplete(index: number, values: { selected: number[]; weightRange: string; selectedAddressId: number | null; pickupCharge: number | null; pickupDate: string; timeSlot: string }) {
  if (index === 0) return values.selected.length > 0;
  if (index === 1) return Boolean(values.weightRange);
  if (index === 2) return Boolean(values.selectedAddressId);
  if (index === 3) return values.pickupCharge !== null || Boolean(values.selectedAddressId);
  if (index === 4) return Boolean(values.pickupDate && values.timeSlot);
  return Boolean(values.selected.length && values.weightRange && values.selectedAddressId && values.pickupDate && values.timeSlot);
}

function nextDates(count: number) {
  const formatterDay = new Intl.DateTimeFormat("en-IN", { weekday: "short" });
  const formatterMonth = new Intl.DateTimeFormat("en-IN", { month: "short" });
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return { value: formatDateValue(date), day: formatterDay.format(date), date: String(date.getDate()), month: formatterMonth.format(date), isToday: index === 0 };
  });
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readableDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${value}T00:00:00`));
}

function formatAddress(item: Address) {
  return [item.line1, item.line2, item.landmark, item.city, item.state, `PIN: ${item.pincode}`].filter(Boolean).join(", ");
}

function humanize(value = "") {
  return String(value).split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function clean(value: string) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function nextDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function MapDot() {
  return <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden />;
}

const notFoundRoute: RouteDef = {
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
    document.querySelector("link[rel='canonical']")?.setAttribute("href", absoluteUrl(route.seo.canonical));
  }
}
