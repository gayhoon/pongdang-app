This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


pongdang
├── node_modules      # 프로젝트 의존성
├── public            # 정적 파일 (이미지, 아이콘 등)
├── src
│   ├── pages         # 페이지 컴포넌트 (라우팅)
│   │   ├── index.tsx # 기본 홈 페이지
│   │   └── _app.tsx  # 커스텀 앱 설정
│   └── styles        # 전역 스타일 파일
├── .eslintrc.json    # ESLint 설정 파일
├── next.config.js    # Next.js 설정 파일
├── package.json      # 프로젝트 의존성 및 스크립트 설정
└── tsconfig.json     # TypeScript 설정 파일