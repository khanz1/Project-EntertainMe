'use client';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import classes from '@/features/app/components/landing/page.module.css';
import { getTmdbImage } from '@/features/film/film.helper';
import { ImageSize } from '@/constant';
import { Button, Container, Group, ScrollArea, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { fSlug } from '@/utils/slugify.helper';
import { ResData } from '@/features/film/types/film.type';
import { Movie } from '@/features/film/types/movie.type';
import { IconCalendar, IconMovie, IconStarFilled } from '@tabler/icons-react';
import { FilmCard } from '@/features/film/components/FilmCard';
import { ItemType } from '@prisma/client';

export type HeroProps = {
  movies: ResData<Movie[]>;
};

const AUTO_PLAY_DELAY = 3500;

export const Hero = ({ movies }: HeroProps) => {
  const autoplay = useRef(Autoplay({ delay: AUTO_PLAY_DELAY }));
  return (
    <Carousel plugins={[autoplay.current]} slideSize="100%" align="start" slideGap="md" loop withControls={false}>
      {movies.results.slice(0, 10).map((movie, index) => (
        <CarouselSlide key={movie.id}>
          <div
            className={classes.root}
            style={{
              backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, var(--mantine-color-dark-7) 70%), linear-gradient(180deg, rgba(130, 201, 30, 0) 0%, var(--mantine-color-dark-7) 80%), url(${getTmdbImage(movie.backdrop_path, ImageSize.ORIGINAL)})`,
            }}
          >
            <Container size="xl" className={classes.inner}>
              <div className={classes.content}>
                <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                  Trending #{index + 1}
                </Text>
                <Title className={classes.title}>{movie.title}</Title>
                <Group py="md">
                  <Group gap="xs">
                    <IconMovie />
                    <Text>Movie</Text>
                  </Group>
                  <Group gap="xs">
                    <IconStarFilled />
                    <Text>{movie.vote_average?.toFixed(2)}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar />
                    <Text>{new Date(movie.release_date).toDateString()}</Text>
                  </Group>
                </Group>
                <Text
                  className={classes.description}
                  mt={30}
                  lineClamp={4}
                  dangerouslySetInnerHTML={{ __html: movie.overview }}
                />

                <Button
                  component={Link}
                  href={`/movies/${fSlug(movie.title, movie.id)}`}
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Watch Now
                </Button>
              </div>
            </Container>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export type TopRatedMoviesProps = {
  movies: ResData<Movie[]>;
};
export const TopRatedMovies = ({ movies }: TopRatedMoviesProps) => {
  return (
    <Container size="xl" mt="-13%">
      <Title order={2} my="sm" style={{ position: 'relative' }}>
        Top Rated
      </Title>
      <ScrollArea scrollbars="x" type="never">
        <Group wrap="nowrap">
          {movies.results.slice(0, 10).map(movie => (
            <FilmCard film={movie} type={ItemType.movie} key={movie.id} />
          ))}
        </Group>
      </ScrollArea>
    </Container>
  );
};
