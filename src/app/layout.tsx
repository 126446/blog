// src/app/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground';

export const metadata = {
  title: '个人博客',
  description: '分享技术与生活',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col relative">
          <ParticlesBackground />
          <Navbar />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
