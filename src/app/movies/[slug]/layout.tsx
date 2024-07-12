import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
// import { LayoutProps } from '@/app/layout';

export type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function Layout({ children, modal }: Readonly<LayoutProps>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {children}
      {modal}
    </SessionProvider>
  );
}
