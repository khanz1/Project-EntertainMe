import Link from 'next/link';
import { ActionIcon, Box, Center, Group, Image, Rating, ScrollArea, Stack, Text } from '@mantine/core';

import { IconArrowLeft } from '@tabler/icons-react';
import { parseMangaIdFromSlug } from '@/utils/slugify.helper';
import { fetchMangaByMangaId, fetchMangaCover, fetchStatisticsByMangaId } from '@/features/manga/manga.action';
import { getMangaCover, getMangaTitle } from '@/features/manga/manga.helper';
import { VolumeFeed } from '@/features/manga/components/VolumeFeed';

export type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const mangaId = parseMangaIdFromSlug(params.slug);
  if (!mangaId) {
    return null;
  }
  const [{ data: manga }, { statistics }] = await Promise.all([
    fetchMangaByMangaId(mangaId),
    fetchStatisticsByMangaId(mangaId),
  ]);

  const coverId = manga.relationships.find((r) => r.type === 'cover_art')?.id;

  if (!manga || !coverId) {
    return null;
  }
  const { data: cover } = await fetchMangaCover(coverId);

  return (
    <Box>
      <Link href="/">
        <ActionIcon
          style={{ position: 'absolute', top: '1%', left: '1%' }}
          variant="subtle"
          color="white"
          size="xl"
          radius="xs"
          aria-label="Button Back"
        >
          <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <Group wrap="nowrap" gap="xl">
        <Image
          src={coverId ? getMangaCover({
            fileName: cover.attributes.fileName,
            mangaId: mangaId,
          }) : ''}
          h="100vh"
          alt={getMangaTitle(manga)}
        />
        <ScrollArea h="100vh" w="100%" pr="xl">
          <Stack gap="xs" justify="center" py="xl">
            <Text tt="uppercase" ta="center" fw={700} size="xl">
              {getMangaTitle(manga)}
            </Text>

            {/*<Group gap="sm" justify="center">*/}
            {/*  {movie.genres.map((genre) => (*/}
            {/*    <Badge key={genre.id}>{genre.name}</Badge>*/}
            {/*  ))}*/}
            {/*</Group>*/}
            <Center>
              <Text mt="xs" ta="center" mb="md" maw={600}>
                {manga.attributes.description['en']}
              </Text>
            </Center>
            <Center>
              <Rating value={statistics[mangaId].rating.average / 2} fractions={2} readOnly />
            </Center>
            <Group>
              <VolumeFeed manga={manga} />
            </Group>
          </Stack>
        </ScrollArea>
      </Group>
    </Box>
  );
}
