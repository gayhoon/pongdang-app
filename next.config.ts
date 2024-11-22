import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // .svg 확장자 처리
      use: ['@svgr/webpack'], // @svgr/webpack 사용
    });
    return config;
  },
};

export default nextConfig;
