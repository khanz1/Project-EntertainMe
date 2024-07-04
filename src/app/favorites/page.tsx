import { getFavoritesByUser } from '@/features/favorites/favorite.action';
import { auth } from '@/auth';
import { Container, Group } from '@mantine/core';
import { FavoriteList } from '@/features/favorites/components/FavoriteList';

export default async function Page() {
  const session = await auth();
  const favorites = await getFavoritesByUser({ userId: session!.user.id! });

  return (
    <Container py="xl">
      <Group gap="md" align="center">
        <FavoriteList favorites={favorites} />
      </Group>
    </Container>
  );
}