import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineColorScheme, MantineProvider } from '@mantine/core';
import { cookies } from 'next/headers';
import { NavbarProvider } from '@/features/app/components/NavbarProvider';
import React from 'react';
import { APP } from '@/constant';
import { Footer } from '@/features/app/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL(APP.WEB_URL),
  keywords: [
    'Streaming Movies',
    'Watch TV Series',
    'Anime Streaming',
    'Read Manga Online',
    'HD Movie Streaming',
    'Free TV Shows',
    'Anime Episodes',
    'Manga Reader',
    'Online Manga Library',
    'Movie Streaming Service',
    'TV Series Online',
    'Watch Anime Free',
    'Latest Movies Online',
    'Manga Collection',
    'Streaming Anime Episodes',
    'Read Manga Free',
    'HD TV Shows',
    'Popular Anime Streaming',
    'New Movie Releases',
    'Online TV Series',
    'Manga Chapters Online',
    'Anime Episodes Online',
    'Free Streaming Movies',
    'TV Series Streaming Service',
    'Latest Anime Episodes',
    'Manga Reading App',
    'Anime Streaming Site',
    'Movie Streaming Platform',
    'Best TV Shows Online',
    'Manga Library Online',
  ],
  title: {
    default: APP.NAME,
    template: '%s | Entertain Me',
  },
  description: APP.DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    title: APP.NAME,
    description: APP.DESCRIPTION,
    images: [
      {
        url: APP.LOGO_IMAGE_UHD,
        secureUrl: APP.LOGO_IMAGE_UHD,
        alt: APP.NAME,
      },
    ],
  },
  openGraph: {
    title: APP.NAME,
    description: APP.DESCRIPTION,
    type: 'website',
    url: APP.WEB_URL,
    siteName: APP.NAME,
    images: [
      {
        url: APP.LOGO_IMAGE_UHD,
        secureUrl: APP.LOGO_IMAGE_UHD,
        alt: APP.NAME,
      },
    ],
  },
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type Theme = 'light' | 'dark';

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  let theme: MantineColorScheme = 'dark';
  if (!themeCookie) {
    // cookieStore.set("theme", "dark");
  }
  // theme = themeCookie!.value as MantineColorScheme;
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme={theme}>
          <NavbarProvider />
          {children}
          <Footer />
        </MantineProvider>
        <GoogleAnalytics gaId="G-NV7QEV42CQ" />
      </body>
    </html>
  );
}
