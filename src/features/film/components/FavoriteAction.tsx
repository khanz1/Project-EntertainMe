'use client';
import type { MovieDetail as TMovieDetail } from '@/features/film/types/movie.type';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { createFavorite, getIsFavoriteByUser, removeFavorite } from '@/features/favorites/favorite.action';
import { Favorites, ItemType } from '@prisma/client';
import { getTmdbImage } from '@/features/film/film.helper';
import { Avatar, Tooltip } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import classes from '@/features/film/styles/Detail.module.css';
import { TVSeriesDetail } from '@/features/film/types/series.type';
import Link from 'next/link';
import { Manga, MangaFileSize } from '@/features/manga/manga.type';
import { fetchMangaCover, fetchStatisticsByMangaId } from '@/features/manga/manga.action';
import { getMangaCover } from '@/features/manga/manga.helper';

export type FavoriteActionProps =
  | {
      type: typeof ItemType.movie;
      item: TMovieDetail;
    }
  | {
      type: typeof ItemType.tv;
      item: TVSeriesDetail;
    }
  | {
      type: typeof ItemType.manga;
      item: Manga;
    };

export const FavoriteAction = ({ item, type }: FavoriteActionProps) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const session = useSession();

  const fetchIsFavorite = async () => {
    const favorite = await getIsFavoriteByUser({
      userId: session?.data?.user.id!,
      itemId: item.id.toString(),
    });
    setIsFavorite(!!favorite);
  };

  useEffect(() => {
    void fetchIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, item]);

  const handleOnAddFavorite = async () => {
    if (type === ItemType.manga) {
      const coverId = item.relationships.find(rel => {
        return rel.type === 'cover_art';
      })?.id;
      let cover;
      if (coverId) {
        const { data } = await fetchMangaCover(coverId);
        cover = data;
      }

      const statistic = await fetchStatisticsByMangaId(item.id);

      await createFavorite({
        userId: session?.data?.user.id!,
        itemId: item.id.toString(),
        itemType: type,
        itemTitle: item.attributes.title.en,
        itemImage: cover
          ? getMangaCover(
              {
                fileName: cover.attributes.fileName,
                mangaId: item.id,
              },
              MangaFileSize.ORIGINAL,
            )
          : null,
        itemOverview: item.attributes.description.en,
        itemUrl: `https://myanimelist.net/` + item.attributes.links.mal ?? '',
        itemRating: statistic.statistics[item.id]?.rating.average,
      } as Favorites);
      return;
    }
    await createFavorite({
      userId: session?.data?.user.id!,
      itemId: item.id.toString(),
      itemType: type,
      itemTitle: type === ItemType.movie ? item.title : item.name,
      itemImage: getTmdbImage(item.poster_path),
      itemOverview: item.overview,
      itemUrl: item.homepage,
      itemRating: item.vote_average,
    } as Favorites);

    await fetchIsFavorite();
  };

  const handleOnRemoveFavorite = async () => {
    await removeFavorite({
      userId: session?.data?.user.id!,
      itemId: item.id.toString(),
    });
    await fetchIsFavorite();
  };

  if (session.status === 'unauthenticated') {
    return (
      <Tooltip label="Sign in to add favorite">
        <Link href="/auth">
          <Avatar color="blue">
            <IconHeart size="1.5rem" className={classes.actionButton} onClick={handleOnAddFavorite} />
          </Avatar>
        </Link>
      </Tooltip>
    );
  }

  return (
    <Tooltip label="Add to favorite">
      <Avatar color="blue">
        {isFavorite ? (
          <IconHeart
            size="1.5rem"
            className={classes.actionButton}
            color="red"
            fill="red"
            onClick={handleOnRemoveFavorite}
          />
        ) : (
          <IconHeart size="1.5rem" className={classes.actionButton} onClick={handleOnAddFavorite} />
        )}
      </Avatar>
    </Tooltip>
  );
};
