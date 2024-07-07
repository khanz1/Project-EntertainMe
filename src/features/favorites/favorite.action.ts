'use server';

import { prisma } from '@/db/prisma/prisma';
import { Favorites } from '@prisma/client';

export type CreateFavoriteProps = Favorites;
export type FavoriteProps = {
  userId: string,
  itemId: string
}

export const createFavorite = async (props: CreateFavoriteProps) => {
  return await prisma.favorites.create({
    data: {
      itemId: props.itemId,
      itemType: props.itemType,
      userId: props.userId,
      itemTitle: props.itemTitle,
      itemImage: props.itemImage,
      itemUrl: props.itemUrl,
      itemRating: props.itemRating,
      itemOverview: props.itemOverview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const removeFavorite = async ({ userId, itemId }: FavoriteProps) => {
  return await prisma.favorites.delete({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
  });

};

export const getIsFavoriteByUser = async ({ userId, itemId }: FavoriteProps) => {
  return await prisma.favorites.findFirst({
    where: {
      userId,
      itemId,
    },
  });
};

export const getFavoritesByUser = async ({ userId }: Pick<FavoriteProps, 'userId'>): Promise<Favorites[]> => {
  return await prisma.favorites.findMany({
    where: {
      userId,
    },
  });
};