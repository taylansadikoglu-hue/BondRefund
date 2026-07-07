# BondRefund.online

A production-ready static SEO website for Australian renters, built with Next.js, TypeScript, Tailwind CSS and the App Router.

## What is included

- Home page
- Seven renter calculators
- Guides index
- 30 starter guide pages under `/guides/[slug]`
- About, Contact, Privacy Policy, Terms and Disclaimer pages
- `sitemap.xml` and `robots.txt`
- Open Graph metadata
- FAQ JSON-LD on calculator pages
- Internal linking between calculators and guides
- Placeholder ad slots
- Disabled affiliate CTA component
- Email capture placeholder for “Get the free moving checklist”
- Analytics placeholder in `app/layout.tsx`

## Local setup

```bash
cd bondrefund-online
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push the `bondrefund-online` project to a Git repository.
2. Import the repository in Vercel.
3. Set the framework preset to Next.js.
4. Use the default build command: `npm run build`.
5. Use the default output handled by Vercel.
6. Add `bondrefund.online` as the production domain.

## Connect the CrazyDomains domain

In Vercel:

1. Open the project settings.
2. Go to Domains.
3. Add `bondrefund.online` and `www.bondrefund.online`.
4. Vercel will show the exact DNS records it expects.

In CrazyDomains DNS:

- For the root domain `bondrefund.online`, add the A record Vercel provides, commonly `76.76.21.21`.
- For `www`, add a CNAME pointing to `cname.vercel-dns.com`.
- Remove conflicting old A, AAAA or CNAME records for the same host names.
- Wait for DNS propagation, then verify the domain in Vercel.

Keep the final values from Vercel as the source of truth because Vercel can change instructions by project or account.

## Where to add monetisation later

- Display ads: add AdSense values in Vercel environment variables:
  - `NEXT_PUBLIC_ADSENSE_CLIENT`
  - `NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT`
  - `NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT`
- Ads.txt: `/ads.txt` is generated automatically from `NEXT_PUBLIC_ADSENSE_CLIENT`.
- Affiliate links: add approved URLs to:
  - `NEXT_PUBLIC_AFFILIATE_MOVERS_URL`
  - `NEXT_PUBLIC_AFFILIATE_CLEANING_URL`
  - `NEXT_PUBLIC_AFFILIATE_UTILITIES_URL`
- Lead generation: add forms or provider widgets beside calculators, keeping user consent and privacy clear.
- Analytics: add Google Analytics, Plausible or another script in `app/layout.tsx` where the placeholder comment is located.

Copy `.env.example` to `.env.local` for local testing.

## Adding new guides

Add a new entry to `lib/guides.ts` with:

- slug
- title
- description
- related calculator slugs

The route, sitemap entry and guide page will be generated automatically.

## Updating calculator logic

Calculator UI and formulas live in `components/CalculatorClient.tsx`. The formulas are commented so assumptions are transparent. Calculator metadata, FAQs, examples and related guide links live in `lib/calculators.ts`.

## Legal and financial note

Every calculator and guide includes the disclaimer: “This is general information only and not legal or financial advice.”
