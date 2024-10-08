import { auth } from '@/auth';
import React from 'react';
import { Navbar } from '@/features/app/components/Navbar';

export const NavbarProvider = async () => {
  const session = await auth();

  return <Navbar session={session} />;
};
