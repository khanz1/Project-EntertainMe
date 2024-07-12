import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
