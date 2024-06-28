import { useEffect, useState } from 'react';
import { checkStreamAvailability } from '@/features/film/actions/movie.action';
import { FILM_TYPE } from '@/features/film/types/film.type';
import { MovieDetail } from '@/features/film/types/movie.type';
import { Button, Group, Indicator, Text } from '@mantine/core';
import Link from 'next/link';
import { IconPlayerPlay } from '@tabler/icons-react';

export type StreamMovieProps = {
  movie: MovieDetail;
};

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
    <Indicator size={11} processing>
      <Button variant="subtle" component={Link} href={`/watch/${movie.id}`}>
        <Group gap="xs">
          <IconPlayerPlay size={20} />
          <Text>Streaming</Text>
        </Group>
      </Button>
    </Indicator>
  );
};
