'use client';

import { em, Group, Image, Input } from '@mantine/core';
import classes from './Navbar.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconSearch, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';

type TLink = {
  link: string;
  label: string;
}

const links: TLink[] = [
  // { link: '/', label: 'Home' },
  // { link: '/movies', label: 'Movies' },
  // { link: '/tv', label: 'TV Series' },
  // { link: '/manga', label: 'Manga' },
  // { link: '/about', label: 'About' },
];
export const Navbar = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const router = useRouter();
  const searchParams = useSearchParams();
  const recentSearch = searchParams.get('search');
  const [search, setSearch] = useState(recentSearch || '');
  const pathname = usePathname();
  const [debounced] = useDebouncedValue(search, 500);
  console.log(search, debounced, '< asd');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search) {
      const url = new URL(window.location.href);
      url.searchParams.set('search', debounced);
      url.searchParams.set('page', '1');
      url.searchParams.delete('filter');
      router.push(url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  if (
    pathname.startsWith('/movies/') ||
    pathname.startsWith('/watch/') ||
    pathname.startsWith('/tv/') ||
    pathname.startsWith('/read/') ||
    pathname.startsWith('/manga/') ||
    pathname.startsWith('/collection/')
  ) {
    return null;
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group pl={isMobile ? 0 : 'sm'} pr="sm">
          <Image src="/images/FantasyCatLogo.png" width={isMobile ? 40 : 50} height={isMobile ? 40 : 50}
                 alt="Fantasy Cat Logo" />
        </Group>
        <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
          {links.map((link) => (
            <Link key={link.label} href={link.link} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </Group>
        <Group w={isMobile ? '100%' : 'inherit'}>
          {/*<SwitchSearch />*/}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Movie"
            leftSection={<IconSearch size={16} />}
            w={isMobile ? '100%' : 'inherit'}
            rightSection={
              <IconX
                size={16}
                style={{
                  cursor: 'pointer',
                  display: search ? 'block' : 'none',
                }}
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('search');
                  router.push(url.toString());
                }}
              />
            }
          />
        </Group>
      </div>
    </header>
  );
};
