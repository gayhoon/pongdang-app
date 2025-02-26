import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8090",
        pathname: "/uploads/**", // ✅ 업로드된 이미지 폴더 허용
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // .svg 확장자 처리
      use: ["@svgr/webpack"], // @svgr/webpack 사용
    });
    return config;
  },
};

export default nextConfig;
