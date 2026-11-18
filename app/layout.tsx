import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "希臘神話圖鑑｜神與凡人",
  description: "奧林帕斯主神、伊利亞德與奧德賽人物圖鑑及角色設計參考庫。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">{children}</body>
    </html>
  );
}
