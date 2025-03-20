import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // ✅ Strict Mode 비활성화(이게 활성화 되어있으면 개발 모드가 실행되고 이는 useEffect를 두번 실행하는 문제 발생함)
  images: {
    domains: ["pongdangserver.shop"], // 외부 이미지 도메인 허용
    remotePatterns: [
      {
        // 로컬개발시 [체인지]
        // protocol: "http",
        // hostname: "localhost",
        
        // 운영올릴때 [체인지]
        protocol: "https",
        hostname: "pongdangserver.shop",

        port: "8090",
        pathname: "/uploads/**", // ✅ 업로드된 이미지 폴더 허용
      },
    ],
  },
  eslint: {
    // 배포시에만 ESLint 비활성화
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // .svg 확장자 처리
      use: ["@svgr/webpack"], // @svgr/webpack 사용
    });
    return config;
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
};

export default nextConfig;
