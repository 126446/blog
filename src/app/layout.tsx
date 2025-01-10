// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import ProjectsMenu from '@/components/ProjectsMenu';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "健宇的博客",
  description: "分享技术见解与生活感悟",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 w-full px-8 py-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm">
            <Link href="/" className="text-xl font-bold">健宇的博客</Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="hover:text-blue-500 transition-colors">首页</Link>
              <Link href="/blog" className="hover:text-blue-500 transition-colors">博客</Link>
              <Link href="/changelog" className="hover:text-blue-500 transition-colors">更新日志</Link>
              <Link href="/travel" className="hover:text-blue-500 transition-colors">旅行</Link>
              <ProjectsMenu />
            </div>
          </nav>
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
