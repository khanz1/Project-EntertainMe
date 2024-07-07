'use client';
import { Avatar, Tooltip } from '@mantine/core';
import { getTmdbImage } from '@/features/film/film.helper';
import React, { useEffect } from 'react';
import { type MovieDetail as TMovieDetail } from '@/features/film/types/movie.type';
import { IconHeart } from '@tabler/icons-react';
import classes from './MovieDetail.module.css';
import { useSession } from 'next-auth/react';
import { createFavorite, getIsFavoriteByUser, removeFavorite } from '@/features/favorites/favorite.action';
import { Favorites, ItemType } from '@prisma/client';

export type MovieDetailProps = {
  movie: TMovieDetail;
  ReviewWrapper: React.ReactNode;
  KeywordBadge: React.ReactNode;
  CreditWrapper: React.ReactNode;
  MediaWrapper: React.ReactNode;
  RecommendationWrapper: React.ReactNode;
  StreamAlert: React.ReactNode;
  StreamMovie: React.ReactNode;
  isStreamAvailable: boolean;
};

export enum MEDIA_TAB {
  VIDEO = 'Videos',
  BACKDROP = 'Backdrops',
  POSTER = 'Posters',
  LOGO = 'Logos',
}

export enum CAST_TAB {
  CAST = 'Cast',
  CREW = 'Crew',
}

export const FavoriteAction = ({ movie }: { movie: TMovieDetail }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const session = useSession();

  const fetchIsFavorite = async () => {
    const favorite = await getIsFavoriteByUser({
      userId: session?.data?.user.id!,
      movieId: movie.id.toString(),
    });
    setIsFavorite(!!favorite);
  };

  useEffect(() => {
    fetchIsFavorite();
  }, [session, movie]);

  const handleOnAddFavorite = async () => {
    await createFavorite({
      userId: session?.data?.user.id!,
      itemId: movie.id.toString(),
      itemType: ItemType.Movie,
      itemTitle: movie.title,
      itemImage: getTmdbImage(movie.poster_path),
      itemOverview: movie.overview,
      itemUrl: movie.homepage,
      itemRating: movie.vote_average,
    } as Favorites);

    await fetchIsFavorite();
  };

  const handleOnRemoveFavorite = async () => {
    await removeFavorite({
      userId: session?.data?.user.id!,
      movieId: movie.id.toString(),
    });
    await fetchIsFavorite();
  };

  return (
    <Tooltip label="Add to favorites">
      <Avatar color="blue">
        {isFavorite ? (
          <IconHeart size="1.5rem" className={classes.actionButton} color="red" fill="red"
                     onClick={handleOnRemoveFavorite} />
        ) : (
          <IconHeart size="1.5rem" className={classes.actionButton} onClick={handleOnAddFavorite} />
        )}
      </Avatar>
    </Tooltip>
  );
};