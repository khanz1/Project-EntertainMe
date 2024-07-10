import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { LayoutProps } from '@/app/layout';

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}