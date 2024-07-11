import { Image } from '@mantine/core';
import React from 'react';

export type AppLogoProps = {
  size?: number;
};

export const AppLogo = ({ size = 30 }: AppLogoProps) => {
  return <Image src="/images/FantasyCatLogo.png" width={size} height={size} alt="Fantasy Cat Logo" />;
};
