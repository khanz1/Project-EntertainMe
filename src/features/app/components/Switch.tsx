import { Switch } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { fCapitalizeSpace } from '@/utils/formatter.helper';
import { ItemType } from '@prisma/client';

export function SwitchSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageType = (searchParams.get('type') || ItemType.movie) as ItemType;

  useEffect(() => {
    if (!searchParams.get('type')) {
      const url = new URL(window.location.href);
      url.searchParams.set('type', pageType);
      router.push(url.toString());
    }
  }, [searchParams, pageType, router]);

  return (
    <Switch
      checked={pageType === ItemType.movie}
      onChange={(e) => {
        const type = e.currentTarget.checked
          ? ItemType.movie
          : ItemType.tv;

        const url = new URL(window.location.href);
        url.searchParams.set('type', type);
        url.searchParams.set('page', '1');
        router.push(url.toString());
      }}
      size="xl"
      color="dark.4"
      onLabel={fCapitalizeSpace(ItemType.movie)}
      offLabel={fCapitalizeSpace(ItemType.tv)}
    />
  );
}
