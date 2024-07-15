'use client';
import React, { createContext } from 'react';
import { useDisclosure } from '@mantine/hooks';

export type TDiscoverContext = {
  searchFocusActive: boolean;
  searchFocus: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};
export const DiscoverContext = createContext<TDiscoverContext>({
  searchFocusActive: false,
  searchFocus: {
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
});

export const DiscoverContextProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const [searchFocusActive, searchFocus] = useDisclosure(false);
  return <DiscoverContext.Provider value={{ searchFocusActive, searchFocus }}>{children}</DiscoverContext.Provider>;
};

export const useDiscoverContext = () => React.useContext(DiscoverContext);
