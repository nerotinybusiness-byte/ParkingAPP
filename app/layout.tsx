import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ParkShare Czech Republic',
  description: 'Smart parking marketplace for Prague',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: '#f9f9f8', fontFamily: 'Figtree, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
