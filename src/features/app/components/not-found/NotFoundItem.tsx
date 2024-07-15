'use client';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './NotFoundItem.module.css';
import { useDiscoverContext } from '@/features/app/discover.context';

export const NotFoundItem = () => {
  const { searchFocus } = useDiscoverContext();
  return (
    <Container className={classes.root}>
      <Title className={classes.title}>Congratulations! 🥳 🎉 </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Wow! You discovered something unique! 🤩 Maybe you mistyped the title, or perhaps it&#39;s a hidden gem.
      </Text>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Either way, great job on your exploration! 🌟
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={searchFocus.toggle}>
          Let&#39;s discover again
        </Button>
      </Group>
    </Container>
  );
};
