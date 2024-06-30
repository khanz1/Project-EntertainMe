import { Box } from '@mantine/core';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackButton } from '@/features/app/BackButton';
import classes from '@/features/film/components/movies/MovieDetail.module.css';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import React from 'react';
import { MovieDetail } from '@/features/film/components/movies/MovieDetail';
import { checkStreamAvailability, fetchMovieById } from '@/features/film/actions/movie.action';
import {
  CreditWrapper,
  MediaWrapper,
  RecommendationWrapper,
  ReviewWrapper,
} from '@/features/film/components/movies/MovieWrapper';
import { KeywordBadge } from '@/features/film/components/movies/KeywordBadge';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { StreamAlert, StreamMovie } from '@/features/film/components/movies/MovieStream';

export type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const movieId = parseIdFromSlug(params.slug);
  const [movie, isStreamAvailable] = await Promise.all([
    fetchMovieById(movieId),
    checkStreamAvailability({
      type: FILM_TYPE.MOVIE,
      movieId,
    }),
  ]);

  return (
    <Box style={{ background: 'var(--mantine-color-dark-8)', minHeight: '100vh' }}>
      <BackButton />
      <Box className={classes.overlay}
           style={{ background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%),  url('${getTmdbImage(movie.backdrop_path, ImageSize.ORIGINAL)}') no-repeat center center/cover` }}></Box>
      <Box className={classes.container}>
        <MovieDetail movie={movie}
                     isStreamAvailable={isStreamAvailable}
                     KeywordBadge={<KeywordBadge movieId={movie.id} />}
                     CreditWrapper={<CreditWrapper movieId={movie.id} />}
                     ReviewWrapper={<ReviewWrapper movieId={movieId} />}
                     MediaWrapper={<MediaWrapper movieId={movie.id} />}
                     RecommendationWrapper={<RecommendationWrapper movieId={movie.id} />}
                     StreamAlert={<StreamAlert isStreamAvailable={isStreamAvailable} />}
                     StreamMovie={<StreamMovie isStreamAvailable={isStreamAvailable} movie={movie} />}
        />

      </Box>
    </Box>
  );
}
