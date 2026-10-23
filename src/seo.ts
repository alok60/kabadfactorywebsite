import { businessSchema, type RouteDef } from "./content";
import { siteConfig } from "./config";

export function absoluteUrl(path = "/") {
  return `${siteConfig.domain}${path === "/" ? "" : path}`;
}

export function seoTags(route: RouteDef) {
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
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  ].join("\n    ");
}

export function breadcrumbSchema(route: RouteDef) {
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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char] || char));
}
