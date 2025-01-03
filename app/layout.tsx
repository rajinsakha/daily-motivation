import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from 'sonner'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'DailyMotive | Your Daily Dose of Inspiration',
  description: 'Start your day with a burst of motivation. DailyMotive delivers a fresh, inspiring quote every day to keep you energized and focused.',
  keywords: ['motivation', 'daily quotes', 'inspiration', 'self-improvement'],
  authors: [{ name: 'Rajin Sakha' }],
  openGraph: {
    title: 'DailyMotive',
    description: 'Your daily dose of motivation and inspiration',
    url: 'https://dailymotive.com',
    siteName: 'DailyMotive',
    images: [
      {
        url: 'https://dailymotive.com/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyMotive',
    description: 'Your daily dose of motivation and inspiration',
    images: ['https://dailymotive.com/twitter-image.jpg'], // Replace with your actual Twitter image URL
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
