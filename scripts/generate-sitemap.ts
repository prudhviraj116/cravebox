import { writeFileSync } from "fs";
import { resolve } from "path";
import restaurants from "../src/data/restaurants.json";

const BASE_URL = "https://cravebox.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/restaurants", changefreq: "weekly", priority: "0.9" },
  { path: "/cart", changefreq: "monthly", priority: "0.5" },
  { path: "/checkout", changefreq: "monthly", priority: "0.5" },
  { path: "/profile", changefreq: "monthly", priority: "0.5" },
  { path: "/auth", changefreq: "monthly", priority: "0.5" },
  { path: "/settings", changefreq: "monthly", priority: "0.5" },
];

for (const restaurant of restaurants) {
  entries.push({
    path: `/menu/${restaurant.id}`,
    changefreq: "weekly",
    priority: "0.8",
  });
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
