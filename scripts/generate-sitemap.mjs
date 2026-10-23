import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const domain = process.env.WEBSITE_DOMAIN || "https://www.kabadfactory.com";
const today = new Date().toISOString().slice(0, 10);

const paths = [
  "/",
  "/about",
  "/pickup-services",
  "/contact",
  "/how-it-works",
  "/scrap-rates",
  "/schedule-pickup",
  "/gwalior",
  "/gwalior/scrap-rates",
  "/blog",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/sell-scrap/iron",
  "/sell-scrap/copper",
  "/sell-scrap/aluminium",
  "/sell-scrap/newspaper",
  "/sell-scrap/cardboard",
  "/sell-scrap/plastic",
  "/sell-scrap/e-waste",
  "/sell-scrap/ac",
  "/sell-scrap/refrigerator",
  "/services/doorstep-scrap-pickup",
  "/services/household-scrap-pickup",
  "/services/bulk-scrap-pickup",
  "/services/office-scrap-pickup",
  "/services/commercial-scrap-pickup",
  "/services/e-waste-pickup"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((url) => `  <url>
    <loc>${domain}${url === "/" ? "" : url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === "/" || url.includes("scrap-rates") ? "daily" : "weekly"}</changefreq>
    <priority>${url === "/" ? "1.0" : url.includes("schedule") ? "0.9" : "0.7"}</priority>
  </url>`).join("\n")}
</urlset>
`;

await fs.mkdir(path.join(root, "dist", "client"), { recursive: true });
await fs.writeFile(path.join(root, "dist", "client", "sitemap.xml"), sitemap);
