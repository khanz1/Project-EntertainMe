import { Box } from '@mantine/core';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import React from 'react';
import classes from './MovieDetail.module.css';
import { fetchMovieById } from '@/features/film/actions/movie.action';
import { MovieDetail } from '@/features/film/components/movies/MovieDetail';

export type MovieDetailContainerProps = {
  children: React.ReactNode;
  movieId: number
}
export const MovieDetailContainer = async ({ children, movieId }: MovieDetailContainerProps) => {
  const movie = await fetchMovieById(movieId);

  return (
    <Box>
      <Box className={classes.overlay}
           style={{ background: `linear-gradient(to bottom, transparent 0%, var(--mantine-color-dark-8) 70%, var(--mantine-color-dark-8) 100%),  url('${getTmdbImage(movie.backdrop_path, ImageSize.ORIGINAL)}') no-repeat center center/cover` }}></Box>
      <Box className={classes.container}>
        <MovieDetail movie={movie}>
          {children}
        </MovieDetail>
      </Box>
    </Box>
  );
};