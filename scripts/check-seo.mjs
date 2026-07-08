import { spawn } from "node:child_process";

const port = 3107;
const baseUrl = `http://127.0.0.1:${port}`;
const canonicalBase = "https://bondrefund.online";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForReady(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (serverExited) {
      throw new Error(`Dev server exited early with code ${serverExitCode}.\n${serverLogs.join("")}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await sleep(1000);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function extractAll(text, regex) {
  return [...text.matchAll(regex)].map((match) => match[1]);
}

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

const serverLogs = [];
const server = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
  shell: true,
});

server.stdout.on("data", (chunk) => {
  serverLogs.push(String(chunk));
});

server.stderr.on("data", (chunk) => {
  serverLogs.push(String(chunk));
});

let serverExited = false;
let serverExitCode = null;

server.on("exit", (code) => {
  serverExited = true;
  serverExitCode = code;
});

try {
  await waitForReady(`${baseUrl}/robots.txt`, 90000);

  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  ensure(robotsResponse.status === 200, "/robots.txt must return 200");
  const robotsText = await robotsResponse.text();
  ensure(!robotsText.includes("Disallow: /"), "robots.txt must not block the whole site");
  ensure(robotsText.includes(`Sitemap: ${canonicalBase}/sitemap.xml`), "robots.txt must include canonical sitemap URL");

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  ensure(sitemapResponse.status === 200, "/sitemap.xml must return 200");
  ensure((sitemapResponse.headers.get("content-type") || "").includes("xml"), "sitemap.xml must return XML content-type");
  const sitemapXml = await sitemapResponse.text();
  const sitemapUrls = extractAll(sitemapXml, /<loc>([^<]+)<\/loc>/g);
  ensure(sitemapUrls.length > 0, "sitemap.xml must contain URLs");

  const seenTitles = new Set();
  const seenDescriptions = new Set();

  for (const url of sitemapUrls) {
    ensure(url.startsWith(canonicalBase), `Sitemap URL must use canonical domain: ${url}`);
    ensure(!url.includes("/api/"), `Sitemap must not include API routes: ${url}`);
    ensure(!url.includes("/admin"), `Sitemap must not include admin routes: ${url}`);
    ensure(!url.includes("/preview"), `Sitemap must not include preview routes: ${url}`);

    const localUrl = url.replace(canonicalBase, baseUrl);
    const response = await fetch(localUrl, { redirect: "manual" });
    ensure(response.status === 200, `Sitemap URL must return 200: ${url} (got ${response.status})`);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) continue;

    const html = await response.text();
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);
    ensure(canonicalMatch, `Missing canonical tag: ${url}`);
    ensure(canonicalMatch[1] === url, `Canonical mismatch on ${url}: ${canonicalMatch[1]}`);

    const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/i);
    if (robotsMatch) {
      const robots = robotsMatch[1].toLowerCase();
      ensure(!robots.includes("noindex"), `Page must not be noindex: ${url}`);
      ensure(robots.includes("index"), `Page robots meta should include index: ${url}`);
      ensure(robots.includes("follow"), `Page robots meta should include follow: ${url}`);
    }

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    ensure(titleMatch, `Missing <title>: ${url}`);
    ensure(!seenTitles.has(titleMatch[1]), `Duplicate title detected: ${titleMatch[1]}`);
    seenTitles.add(titleMatch[1]);

    const descriptionMatch = html.match(/<meta name="description" content="([^"]+)"/i);
    ensure(descriptionMatch, `Missing meta description: ${url}`);
    ensure(!seenDescriptions.has(descriptionMatch[1]), `Duplicate meta description detected: ${descriptionMatch[1]}`);
    seenDescriptions.add(descriptionMatch[1]);
  }

  console.log(`SEO checks passed for ${sitemapUrls.length} sitemap URLs.`);
} finally {
  server.kill("SIGINT");
}
