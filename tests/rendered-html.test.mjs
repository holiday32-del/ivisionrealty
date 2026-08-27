import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function request(path = "/", host = "ivisionrealtycorp.com") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${host}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://${host}${path}`, {
      headers: { accept: "text/html", host },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function render(path = "/") {
  return request(path);
}

test("server-renders the primary routes", async () => {
  const routes = [
    ["/", /Real estate\./i],
    ["/services", /Services built around/i],
    ["/buy-with-us", /Buy With Us/i],
    ["/list-with-us", /List With Us/i],
    ["/appointment", /Choose a preferred day and time/i],
    ["/resources", /Real Estate &amp; Business Resources/i],
    ["/about", /Real estate is personal/i],
    ["/contact", /Tell us where you want to go next/i],
    ["/privacy", /Privacy Policy/i],
    ["/terms", /Website Terms/i],
    ["/disclosures", /Keller Williams search resources/i],
  ];

  for (const [path, marker] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), marker);
  }
});

test("ships branded metadata and no starter preview", async () => {
  const response = await render();
  const html = await response.text();
  const [layout, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(html, /IVISION Realty/i);
  assert.match(html, /https:\/\/ivisionrealtycorp\.com\/og\.png/i);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/ivisionrealtycorp\.com\/"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("redirects every alternate production hostname to the canonical domain", async () => {
  for (const host of ["ivisionrealty.com", "www.ivisionrealty.com", "www.ivisionrealtycorp.com"]) {
    const response = await request("/services?source=legacy", host);
    assert.equal(response.status, 301, host);
    assert.equal(response.headers.get("location"), "https://ivisionrealtycorp.com/services?source=legacy");
  }
});

test("publishes route-specific canonical URLs and social URLs", async () => {
  const routes = ["/", "/services", "/buy-with-us", "/list-with-us", "/appointment", "/resources", "/about", "/contact", "/privacy", "/terms", "/disclosures"];

  for (const path of routes) {
    const response = await render(path);
    const html = await response.text();
    const canonical = `https://ivisionrealtycorp.com${path === "/" ? "/" : path}`;
    assert.match(html, new RegExp(`<link[^>]+rel="canonical"[^>]+href="${canonical.replaceAll("/", "\\/")}"`, "i"), path);
    const socialUrl = path === "/" ? "https:\\/\\/ivisionrealtycorp\\.com\\/?" : canonical.replaceAll("/", "\\/");
    assert.match(html, new RegExp(`<meta[^>]+property="og:url"[^>]+content="${socialUrl}"`, "i"), path);
    assert.match(html, /<meta[^>]+property="og:image"[^>]+content="https:\/\/ivisionrealtycorp\.com\/og\.png"/i, path);
    assert.doesNotMatch(html, /https:\/\/(?:www\.)?ivisionrealty\.com/i, path);
  }
});

test("ships answer-engine schemas aligned with visible business information", async () => {
  const home = await render();
  const services = await render("/services");
  const homeHtml = await home.text();
  const servicesHtml = await services.text();

  assert.match(homeHtml, /"@type":\["RealEstateAgent","LocalBusiness"\]/i);
  assert.match(homeHtml, /"@type":"WebSite"/i);
  assert.match(homeHtml, /"@type":"FAQPage"/i);
  assert.match(homeHtml, /What areas does IVISION Realty serve\?/i);
  assert.match(homeHtml, /Greater Los Angeles, San Bernardino County, and select California markets based on service availability\./i);
  assert.match(homeHtml, /info@ivisionrealtycorp\.com/i);
  assert.match(homeHtml, /2922 Crenshaw Boulevard/i);
  assert.match(servicesHtml, /"@type":"BreadcrumbList"/i);
  assert.match(servicesHtml, /"@type":"ItemList"/i);
});

test("publishes canonical robots, sitemap, and llms resources", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    request("/robots.txt"),
    request("/sitemap.xml"),
    request("/llms.txt"),
  ]);
  const [robotsText, sitemapText, llmsText] = await Promise.all([
    robots.text(), sitemap.text(), llms.text(),
  ]);

  assert.equal(robots.status, 200);
  assert.match(robotsText, /Sitemap: https:\/\/ivisionrealtycorp\.com\/sitemap\.xml/i);
  assert.doesNotMatch(robotsText, /ivisionrealty\.com/i);
  assert.equal(sitemap.status, 200);
  assert.match(sitemapText, /<loc>https:\/\/ivisionrealtycorp\.com\/services<\/loc>/i);
  assert.match(sitemapText, /<loc>https:\/\/ivisionrealtycorp\.com\/resources<\/loc>/i);
  assert.match(sitemapText, /<loc>https:\/\/ivisionrealtycorp\.com\/buy-with-us<\/loc>/i);
  assert.match(sitemapText, /<loc>https:\/\/ivisionrealtycorp\.com\/list-with-us<\/loc>/i);
  assert.match(sitemapText, /<loc>https:\/\/ivisionrealtycorp\.com\/appointment<\/loc>/i);
  assert.doesNotMatch(sitemapText, /https:\/\/(?:www\.)?ivisionrealty\.com/i);
  assert.equal(llms.status, 200);
  assert.match(llms.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.match(llmsText, /info@ivisionrealtycorp\.com/i);
  assert.match(llmsText, /New Wide Lending/i);
});

test("loads the Zotabox widgets script from the document head", async () => {
  const response = await render();
  const html = await response.text();
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";

  assert.match(head, /<script[^>]+async[^>]+src="\/\/static\.zotabox\.com\/r\/z\/rzxfdfseby5r3kauq8yq9c00cbobgw3v\/widgets\.js"/i);
});

test("uses California-only service language and the approved search resources", async () => {
  const responses = await Promise.all([
    render("/"),
    render("/services"),
    render("/about"),
    render("/contact"),
  ]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join("\n");

  assert.doesNotMatch(html, /Nevada|Las Vegas|CA \+ NV/i);
  assert.match(html, /https:\/\/kwland\.com\//i);
  assert.match(html, /https:\/\/kwsela\.yourkwoffice\.com\/search\/sale\?viewport=33\.97252465497983%2C-118\.09295567700195%2C33\.93051816126121%2C-118\.15853032299805/i);
  assert.match(html, /https:\/\/www\.newwidelending\.com\/investment-property-loans/i);
  assert.match(html, /New Wide Lending/i);
});

test("publishes buyer, seller, appointment, and non-affiliate property resources", async () => {
  const responses = await Promise.all([render("/buy-with-us"), render("/list-with-us"), render("/appointment"), render("/disclosures")]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join("\n");

  assert.match(html, /free Keller Williams property search/i);
  assert.match(html, /jamesholidayhaven\.officialpropertyvalue\.com\/analysis\?p=d4def49d-d37b-4241-b556-4b4d95e77a94/i);
  assert.match(html, /mailto:info@ivisionrealtycorp\.com/i);
  assert.match(html, /not an affiliate link/i);
  assert.match(html, /not an appraisal/i);
  assert.doesNotMatch(html, /ext\. 704|Sacramento|Yahoo/i);
});

test("publishes the disclosed Empower affiliate resource", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /Empower Dashboard/i);
  assert.match(html, /track\.flexlinkspro\.com\/g\.ashx\?foid=156074\.13439\.1187369&amp;trid=1187318\.157618&amp;foc=16&amp;fot=9999&amp;fos=6/i);
  assert.match(html, /rel="sponsored noopener noreferrer"/i);
  assert.match(html, /IVISION Realty Corp may receive compensation if you use the Empower\s+or ABC Carpet &amp; Home links/i);
  assert.match(html, /this does not affect the price you pay/i);
  assert.doesNotMatch(html, /Earn \$160/i);
});

test("publishes the disclosed ABC Carpet and Home affiliate resource", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /ABC Carpet &amp; Home/i);
  assert.match(html, /track\.flexlinkspro\.com\/g\.ashx\?foid=156052\.9992&amp;trid=1187318\.189434&amp;foc=17&amp;fot=9999&amp;fos=6&amp;url=https%3a%2f%2fabchome\.com%2f/i);
  assert.match(html, /rel="sponsored noopener noreferrer"/i);
  assert.match(html, /may receive compensation if you use the Empower\s+or ABC Carpet &amp; Home links/i);
  assert.match(html, /this does not affect the price you\s+pay/i);
  assert.doesNotMatch(html, /8% of sales/i);
});

test("publishes approved FlexOffers resources with disclosures and safe links", async () => {
  const responses = await Promise.all([render("/services"), render("/resources")]);
  const [servicesHtml, resourcesHtml] = await Promise.all(responses.map((response) => response.text()));
  const html = `${servicesHtml}\n${resourcesHtml}`;
  const approvedLinks = [
    ["Housecall Pro", "https://fxo.co/JEtC"],
    ["SuperMoney Business Financing", "https://fxo.co/JEtF"],
    ["Yale Home", "https://fxo.co/JEtG"],
    ["Good Greek Moving &amp; Storage", "https://fxo.co/JEtH"],
    ["Buildium", "https://fxo.co/JEtI"],
  ];

  for (const [name, url] of approvedLinks) {
    assert.match(html, new RegExp(name, "i"));
    assert.match(html, new RegExp(`href="${url.replaceAll("/", "\\/")}"[^>]+rel="sponsored noopener noreferrer"[^>]+target="_blank"`, "i"));
  }

  assert.match(servicesHtml, /Property Owner &amp; Service Professional Resources/i);
  assert.match(servicesHtml, /Moving &amp; Relocation Resources/i);
  assert.match(servicesHtml, /Compare Business Financing Options/i);
  assert.match(servicesHtml, /Homeowner Resources/i);
  assert.match(html, /Affiliate Disclosure:/i);
  assert.match(html, /Approval is not guaranteed\./i);
  assert.doesNotMatch(html, /cheapest|lowest|best|#1|guaranteed approval|guaranteed funding/i);
});

test("keeps IRA Financial affiliate placement out of public UI pending approval", async () => {
  const responses = await Promise.all([render("/"), render("/services"), render("/resources"), render("/about"), render("/contact")]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join("\n");
  const affiliateSource = await readFile(new URL("../app/affiliate-resources.tsx", import.meta.url), "utf8");

  assert.match(affiliateSource, /IRA Financial affiliate placement pending advertiser copy approval/i);
  assert.match(affiliateSource, /https:\/\/fxo\.co\/JEtD/i);
  assert.match(affiliateSource, /pending-copy-approval/i);
  assert.doesNotMatch(html, /IRA Financial/i);
  assert.doesNotMatch(html, /https:\/\/fxo\.co\/JEtD/i);
});

test("publishes the current phone number and office address", async () => {
  const responses = await Promise.all([render("/"), render("/contact")]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join("\n");

  assert.match(html, /\(888\) 451-9328 ext\. 701/i);
  assert.match(html, /tel:\+18884519328;ext=701/i);
  assert.match(html, /2922 Crenshaw Boulevard/i);
  assert.match(html, /Los Angeles, CA 90016/i);
  assert.doesNotMatch(html, /214-8474|272-7124|Jefferson|90066/i);
});

test("publishes the current contact email address", async () => {
  const responses = await Promise.all([render("/"), render("/contact")]);
  const html = (await Promise.all(responses.map((response) => response.text()))).join("\n");

  assert.match(html, /info@ivisionrealtycorp\.com/i);
  assert.match(html, /mailto:info@ivisionrealtycorp\.com/i);
  assert.doesNotMatch(html, /info@ivisionrealty\.com/i);
});

test("uses the refreshed hero photography", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const assets = [
    "services-hero-v2.png",
    "about-hero-v2.png",
    "property-search-hero-v2.png",
  ];

  for (const asset of assets) {
    await access(new URL(`../public/${asset}`, import.meta.url));
    assert.match(css, new RegExp(asset.replaceAll(".", "\\.")));
  }
});

test("uses distinct modern photography in the requested content sections", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const requestedAssets = [
    "about-relationship-v3.jpg",
    "services-business-v3.jpg",
    "contact-office-v3.jpg",
  ];
  const publicDirectory = new URL("../public/", import.meta.url);
  const imageNames = (await readdir(publicDirectory)).filter((name) => /\.(?:jpe?g|png|webp)$/i.test(name));
  const imageBuffers = new Map(
    await Promise.all(imageNames.map(async (name) => [name, await readFile(new URL(name, publicDirectory))])),
  );

  for (const asset of requestedAssets) {
    await access(new URL(asset, publicDirectory));
    assert.match(css, new RegExp(asset.replaceAll(".", "\\.")));

    for (const [otherName, otherBuffer] of imageBuffers) {
      if (otherName !== asset) {
        assert.equal(imageBuffers.get(asset)?.equals(otherBuffer), false, `${asset} duplicates ${otherName}`);
      }
    }
  }
});
