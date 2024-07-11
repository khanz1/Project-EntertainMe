import { fetchCollectionById } from '@/features/film/actions/collection.action';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackgroundImage } from '@mantine/core';
import { getTmdbImage } from '@/features/film/film.helper';
import classes from './page.module.css';
import { CollectionDetail } from '@/features/film/components/collection/CollectionDetail';
import { ImageSize } from '@/constant';
import { Metadata } from 'next';

export type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const collectionId = parseIdFromSlug(params.slug);
  const collection = await fetchCollectionById(Number(collectionId));

  const posterImage = getTmdbImage(collection.poster_path, ImageSize.LARGE);
  const backdropImage = getTmdbImage(collection.backdrop_path, ImageSize.LARGE);
  const canonicalUrl = 'https://entertainme.khanz1.dev';

  return {
    title: collection.name,
    description: collection.overview,
    twitter: {
      card: 'summary_large_image',
      title: collection.name,
      description: collection.overview,
      images: [posterImage, backdropImage],
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
      title: collection.name,
      description: collection.overview,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Entertain Me',
      images: [
        {
          url: posterImage,
          secureUrl: posterImage,
          alt: `${collection.name} - Entertain Me`,
        },
        {
          url: backdropImage,
          secureUrl: backdropImage,
          alt: `${collection.name} - Entertain Me`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const collectionId = parseIdFromSlug(params.slug);
  const collection = await fetchCollectionById(Number(collectionId));

  return (
    <BackgroundImage
      className={classes.collectionBackground}
      src={getTmdbImage(collection.backdrop_path, ImageSize.ORIGINAL)}
    >
      <CollectionDetail collection={collection} />
    </BackgroundImage>
  );
}
