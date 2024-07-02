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
import { Metadata, ResolvingMetadata } from 'next';

export type PageProps = {
  params: {
    slug: string;
  };
};


type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const movieId = parseIdFromSlug(params.slug);
  const movie = await fetchMovieById(movieId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const lqPosterImage = getTmdbImage(movie.poster_path, ImageSize.MEDIUM);
  const posterImage = getTmdbImage(movie.poster_path, ImageSize.LARGE);
  const backdropImage = getTmdbImage(movie.backdrop_path, ImageSize.LARGE);
  const canonicalUrl = 'https://entertainme.khanz1.dev';

  return {
    title: `${movie.title} | Entertain Me`,
    description: movie.overview,
    // icons: {
    //   icon: getTmdbImage(movie.poster_path, ImageSize.SMALL),
    //   shortcut: getTmdbImage(movie.poster_path, ImageSize.SMALL),
    //   apple: getTmdbImage(movie.poster_path, ImageSize.SMALL),
    //   other: {
    //     rel: 'apple-touch-icon-precomposed',
    //     url: getTmdbImage(movie.poster_path, ImageSize.SMALL),
    //   },
    // },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview,
      images: [posterImage, backdropImage], // Must be an absolute URL
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: movie.title,
      description: movie.overview,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Entertain Me',
      // images: {
      //   url: lqPosterImage,
      //   secureUrl: lqPosterImage,
      //   width: 256,
      //   height: 256,
      //   alt: `${movie.title} - Entertain Me`,
      // },
      images: [
        // {
        //   url: lqPosterImage,
        //   secureUrl: lqPosterImage,
        //   width: 256,
        //   height: 256,
        //   alt: `${movie.title} - Entertain Me`,
        // },
        {
          url: posterImage,
          secureUrl: posterImage,
          alt: `${movie.title} - Entertain Me`,
        },
        {
          url: backdropImage,
          secureUrl: backdropImage,
          alt: `${movie.title} - Entertain Me`,
        },
      ],
    },
  };
}

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
