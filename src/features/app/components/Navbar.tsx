'use client';
import cx from 'clsx';
import {
  Avatar,
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Image,
  Menu,
  rem,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import classes from './Navbar.module.css';
import { usePathname } from 'next/navigation';
import { IconChevronDown, IconHeart, IconHistory, IconLogout, IconMessage, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { APP } from '@/constant';
import { Session } from 'next-auth';
import { signOut } from '@/actions/user.action';
import { AppLogo } from '@/features/app/components/Logo';

type TLink = {
  link: string;
  label: string;
};

const links: TLink[] = [
  { link: '/discover', label: 'Discover' },
  // { link: '/', label: 'Home' },
  // { link: '/movies', label: 'Movies' },
  // { link: '/tv', label: 'TV Series' },
  // { link: '/manga', label: 'Manga' },
  // { link: '/about', label: 'About' },
];

const UserControl = ({ session }: { session: Session }) => {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar src={session.user.image} alt={session.user.name || ''} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {session.user.name}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/favorites"
          leftSection={
            <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} stroke={1.5} />
          }
        >
          Favorites
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconHistory style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[6]} stroke={1.5} />
          }
        >
          Watch History
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} stroke={1.5} />
          }
        >
          Your Comments
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
          Settings
        </Menu.Item>
        <Menu.Item
          onClick={handleSignOut}
          color="red"
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export const Navbar = ({ session }: { session: Session | null }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery(APP.MOBILE_BREAKPOINT);
  const [scroll] = useWindowScroll();

  const pathname = usePathname();

  return (
    <header data-page={pathname} data-scrolling={scroll.y > 100} className={classes.header}>
      <div className={classes.inner}>
        <Burger opened={opened} onClick={toggle} size="md" hiddenFrom="sm" mr="md" />

        <Group gap={5} className={classes.links} visibleFrom="sm">
          <Link href="/" className={classes.appNav}>
            <Group pl={{ base: 0, lg: 'sm' }} pr="sm" gap="xs" className={classes.appLogo} visibleFrom="sm">
              <Image
                src="/images/FantasyCatLogo.png"
                width={isMobile ? 40 : 40}
                height={isMobile ? 40 : 40}
                alt="Fantasy Cat Logo"
              />
              <Title order={3} fw="bold" fz={rem(18)}>
                EntertainMe
              </Title>
            </Group>
          </Link>
          {links.map(link => (
            <Link key={link.label} href={link.link} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </Group>
        <Group w={{ base: '100%', lg: 'inherit' }}>
          <Drawer
            opened={opened}
            onClose={toggle}
            title={
              <Group w="100%" justify="space-between">
                <AppLogo size={50} />
                {session ? (
                  <UserControl session={session} />
                ) : (
                  <Link href="/auth" onClick={toggle}>
                    <Button variant="default">Log in</Button>
                  </Link>
                )}
              </Group>
            }
          >
            {links.map(link => (
              <Link key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </Link>
            ))}
          </Drawer>
          <Box visibleFrom="lg">
            {session ? (
              <UserControl session={session} />
            ) : (
              <Link href="/auth">
                <Button variant="default">Log in</Button>
              </Link>
            )}
          </Box>
        </Group>
      </div>
    </header>
  );
};
