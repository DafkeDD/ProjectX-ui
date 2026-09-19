import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@projectx/ui"],
  outputFileTracingRoot: new URL("../../", import.meta.url).pathname,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
