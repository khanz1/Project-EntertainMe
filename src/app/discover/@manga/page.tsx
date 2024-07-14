import { Box, Group } from '@mantine/core';
import { fetchManga } from '@/features/manga/manga.action';
import { MangaCard } from '@/features/manga/components/MangaCard';
import { Pagination } from '@/features/app/components/discover/Pagination';

const PAGE_SIZE = 20;

type PageProps = {
  searchParams: {
    search?: string;
    page?: string;
    filter?: string;
  };
};
export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams.page || 1);
  const search = searchParams.search || '';

  const mangaList = await fetchManga({
    page,
    pageSize: PAGE_SIZE,
    searchTerm: search,
  });

  return (
    <Box>
      <Group gap="sm">
        {mangaList.data.map(manga => (
          <MangaCard manga={manga} key={manga.id} />
        ))}
      </Group>
      <Pagination totalPages={Math.ceil(mangaList.total / 20)} />
    </Box>
  );
}
