import { useEffect, useState } from 'react';
import { checkStreamAvailability } from '@/features/film/actions/movie.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { MovieDetail } from '@/features/film/types/movie.type';
import { Button } from '@mantine/core';
import Link from 'next/link';

export type StreamMovieProps = {
  movie: MovieDetail;
}

export const StreamMovie = ({ movie }: StreamMovieProps) => {
  const [isStreamAvailable, setIsStreamAvailable] = useState<boolean>(false);

  useEffect(() => {
    checkStreamAvailability({
      movieId: movie.id,
      type: FILM_TYPE.MOVIE,
    }).then(setIsStreamAvailable);
  }, [movie]);

  if (!isStreamAvailable) {
    return null;
  }

  return (
    <Link href={`/watch/${movie.id}`}>
      <Button>Watch</Button>
    </Link>
  );
};