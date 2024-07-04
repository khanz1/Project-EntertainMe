'use server';

import { prisma } from '@/db/prisma/prisma';
import { Favorites } from '@prisma/client';

export type CreateFavoriteProps = Favorites;

export const createFavorite = async (props: CreateFavoriteProps) => {
  console.log(props);
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

export const removeFavorite = async ({ userId, movieId }: { userId: string, movieId: string }) => {
  return await prisma.favorites.delete({
    where: {
      userId_itemId: {
        userId,
        itemId: movieId,
      },
    },
  });

};

export const getIsFavoriteByUser = async ({ userId, movieId }: { userId: string, movieId: string }) => {
  return await prisma.favorites.findFirst({
    where: {
      userId,
      itemId: movieId,
    },
  });
};

export const getFavoritesByUser = async ({ userId }: { userId: string }): Promise<Favorites[]> => {
  return await prisma.favorites.findMany({
    where: {
      userId,
    },
  });
};