import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineColorScheme, MantineProvider } from '@mantine/core';
import { cookies } from 'next/headers';
import { NavbarProvider } from '@/features/app/NavbarProvider';
import React from 'react';
import { APP } from '@/constant';
import { Footer } from '@/features/app/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP.NAME,
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
      </body>
    </html>
  );
}
