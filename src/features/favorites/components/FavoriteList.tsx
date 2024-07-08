'use client';

import { FavoriteCard, FavoriteCardMobile } from '@/features/favorites/components/FavoriteCard';
import { Favorites } from '@prisma/client';
import { useMediaQuery } from '@mantine/hooks';
import { APP } from '@/constant';

export type FavoriteListProps = {
  favorites: Favorites[];
}

export const FavoriteList = ({ favorites }: FavoriteListProps) => {
  const isMobile = useMediaQuery(APP.MOBILE_BREAKPOINT);
  return favorites.map((favorite) => {
    if (isMobile) {
      return <FavoriteCardMobile key={favorite.id} favorite={favorite} />;
    } else {
      return <FavoriteCard key={favorite.id} favorite={favorite} />;
    }
  });
};