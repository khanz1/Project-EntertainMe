'use client';

import { FavoriteCard } from '@/features/favorites/components/FavoriteCard';
import { Favorites } from '@prisma/client';

export type FavoriteListProps = {
  favorites: Favorites[];
}

export const FavoriteList = ({ favorites }: FavoriteListProps) => {
  return favorites.map((favorite) => (
    <FavoriteCard key={favorite.id} favorite={favorite} />
  ));
};