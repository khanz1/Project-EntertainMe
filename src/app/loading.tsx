import { Center, Group, Loader, rem } from '@mantine/core';

export default function Loading() {
  return (
    <Center pt={rem(50)}>
      <Group gap="sm">
        <Loader size="xl" type="dots" />
        {/*<Text size="xl">Loading...</Text>*/}
      </Group>
    </Center>
  );
}