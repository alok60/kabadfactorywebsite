import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const clientDir = path.join(root, "dist", "client");
const template = await fs.readFile(path.join(clientDir, "index.html"), "utf-8");
const serverEntry = await import(pathToFileURL(path.join(root, "dist", "server", "entry-server.js")));

const routePaths = [
  "/",
  "/about",
  "/pickup-services",
  "/contact",
  "/how-it-works",
  "/scrap-rates",
  "/schedule-pickup",
  "/app-coming-soon",
  "/gwalior",
  "/gwalior/scrap-rates",
  "/blog",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/login",
  "/register",
  "/account",
  "/orders",
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

await Promise.all(routePaths.map(async (url) => {
  const html = template
    .replace("<!--app-html-->", serverEntry.render(url))
    .replace("<!--seo-tags-->", serverEntry.tags(url));
  const output = url === "/" ? path.join(clientDir, "index.html") : path.join(clientDir, url, "index.html");
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, html);
}));
