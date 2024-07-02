import { fetchCollectionById } from '@/features/film/actions/collection.action';
import { parseIdFromSlug } from '@/utils/slugify.helper';
import { BackgroundImage } from '@mantine/core';
import { getTmdbImage, ImageSize } from '@/features/film/film.helper';
import classes from './page.module.css';
import { CollectionDetail } from '@/features/film/components/collection/CollectionDetail';
import { BackButton } from '@/features/app/BackButton';

export default async function Page({ params }: { params: { slug: string } }) {
  const collectionId = parseIdFromSlug(params.slug);
  const collection = await fetchCollectionById(Number(collectionId));

  return (
    <BackgroundImage
      className={classes.collectionBackground}
      // style={{ background: 'rgb(31,31,31)' }}
      src={getTmdbImage(collection.backdrop_path, ImageSize.ORIGINAL)}
    >
      <BackButton />
      <CollectionDetail collection={collection} />
    </BackgroundImage>
  );
}