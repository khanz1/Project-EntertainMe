import { auth } from '@/auth';
import React from 'react';
import { Navbar } from '@/features/app/Navbar';


export const NavbarProvider = async () => {
  const session = await auth();

  console.log(session, ' .>>SAD');

  return <Navbar session={session} />;
};