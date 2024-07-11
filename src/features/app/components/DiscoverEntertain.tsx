'use client';

import { Input } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

export const DiscoverEntertain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recentSearch = searchParams.get('search');
  const [search, setSearch] = useState(recentSearch || '');
  const pathname = usePathname();
  const [debounced] = useDebouncedValue(search, 500);

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

  return (
    <div>
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search Movie"
        leftSection={<IconSearch size={16} />}
        w={{ base: '100%', sm: 'inherit' }}
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
    </div>
  );
};
