import "@/styles/reset.scss"
import "@/styles/globals.scss";
import "@/styles/font.scss";
import type { Metadata } from "next";
import PreventZoom from "@/component/PreventZoom"
import { AuthProvider } from "@/context/AuthContext";
import CsrLoading from "@/component/CsrLoading";
import { LoadingProvider } from '@/context/LoadingContext';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        {/* 뷰포트 설정으로 확대 방지 */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content" 
        />
      </head>
      <body>
        <div className="root">
          <PreventZoom />
          <AuthProvider>
            <LoadingProvider >
              <CsrLoading />
              {children}
            </LoadingProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
