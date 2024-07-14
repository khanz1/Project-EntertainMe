import { Center, Group, Loader, rem } from '@mantine/core';

export default function Loading() {
  return (
    <Center py={rem(150)}>
      <Group gap="sm">
        <Loader size="xl" type="dots" />
        {/*<Text size="xl">Loading...</Text>*/}
      </Group>
    </Center>
  );
}
