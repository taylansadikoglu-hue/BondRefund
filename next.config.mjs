import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  async redirects() {
    return [
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/guides/end-of-lease-carpet-cleaning-cost",
        destination: "/calculators/end-of-lease-cleaning-calculator",
        permanent: true,
      },
      {
        source: "/guides/perth-moving-costs",
        destination: "/guides/moving-costs-australia",
        permanent: true,
      },
      {
        source: "/calculators",
        destination: "/#calculators",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
