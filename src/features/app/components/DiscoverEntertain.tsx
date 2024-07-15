'use client';

import { CloseButton, FocusTrap, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useDiscoverContext } from '@/features/app/discover.context';

export const DiscoverEntertain = () => {
  const { searchFocusActive } = useDiscoverContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const recentSearch = searchParams.get('search');
  const [search, setSearch] = useState(recentSearch || '');
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
      console.log('asdf');
      router.push(url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div>
      <FocusTrap active={searchFocusActive}>
        <Input
          value={search}
          autoFocus
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Movie"
          leftSection={<IconSearch size={16} />}
          rightSectionPointerEvents="all"
          w={{ base: '100%', sm: 'inherit' }}
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.delete('search');
                router.push(url.toString());

                setSearch('');
              }}
              style={{
                cursor: 'pointer',
                display: search ? 'block' : 'none',
              }}
            />
          }
        />
      </FocusTrap>
    </div>
  );
};
