const siteUrl = (process.env.SITE_URL || "https://bondrefund.online").replace(/\/$/, "");
const sitemapUrl = process.env.SITEMAP_URL || `${siteUrl}/sitemap.xml`;
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const key = process.env.INDEXNOW_KEY || "a0e6bbddf2634be08a0de94d2c6bc951";
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `${siteUrl}/${key}.txt`;
const host = new URL(siteUrl).host;

function unique(values) {
  return [...new Set(values)];
}

function sitemapUrls(xml) {
  return unique(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1].trim())
      .filter((url) => url.startsWith(`${siteUrl}/`) || url === siteUrl),
  );
}

async function getUrls() {
  if (process.env.INDEXNOW_URLS) {
    return unique(
      process.env.INDEXNOW_URLS.split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    );
  }

  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Could not read sitemap ${sitemapUrl}: ${response.status}`);
  }

  return sitemapUrls(await response.text());
}

async function submitChunk(urlList) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`IndexNow returned ${response.status}: ${body || response.statusText}`);
  }

  return response.status;
}

async function main() {
  const urls = await getUrls();

  if (!urls.length) {
    throw new Error("No URLs found to submit.");
  }

  console.log(`Submitting ${urls.length} ${host} URLs to IndexNow`);
  console.log(`Key file: ${keyLocation}`);

  for (let index = 0; index < urls.length; index += 10000) {
    const chunk = urls.slice(index, index + 10000);
    const status = await submitChunk(chunk);
    console.log(`Submitted ${chunk.length} URLs: HTTP ${status}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
