import type { NextConfig } from "next";
// next.config.js
const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
