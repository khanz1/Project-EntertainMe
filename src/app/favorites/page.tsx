import { getFavoritesByUser } from '@/features/favorites/favorite.action';
import { auth } from '@/auth';
import { Container, Group, rem } from '@mantine/core';
import { FavoriteList } from '@/features/favorites/components/FavoriteList';

export default async function Page() {
  const session = await auth();
  const favorites = await getFavoritesByUser({ userId: session!.user.id! });

  return (
    <Container pt={rem(120)} pb="xl">
      <Group gap="md">
        <FavoriteList favorites={favorites} />
      </Group>
    </Container>
  );
}
