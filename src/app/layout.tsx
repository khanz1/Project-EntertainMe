import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineColorScheme, MantineProvider } from '@mantine/core';
import { cookies } from 'next/headers';
import { NavbarProvider } from '@/features/app/NavbarProvider';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Entertain Me',
  description: 'Entertain Me is your ultimate destination for a diverse range of entertainment options designed to keep you engaged and relaxed. Whether you’re in the mood for movies, TV series, manga, music, or calming ambient sounds, Entertain Me has got you covered.\n',
  icons: [
    {
      url: '/images/FantasyCatLogo.png',
      rel: 'icon',
      type: 'image/x-icon',
    },
  ],
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
    </MantineProvider>
    </body>
    </html>
  );
}
