import { Switch } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ENTERTAIN_TYPE } from '../film/types/film.type';
import { fCapitalizeSpace } from '@/utils/formatter.helper';

export function SwitchSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageType = (searchParams.get('type') || ENTERTAIN_TYPE.MOVIE) as ENTERTAIN_TYPE;

  useEffect(() => {
    if (!searchParams.get('type')) {
      const url = new URL(window.location.href);
      url.searchParams.set('type', pageType);
      router.push(url.toString());
    }
  }, [searchParams, pageType, router]);

  return (
    <Switch
      checked={pageType === ENTERTAIN_TYPE.MOVIE}
      onChange={(e) => {
        const type = e.currentTarget.checked
          ? ENTERTAIN_TYPE.MOVIE
          : ENTERTAIN_TYPE.TV;

        const url = new URL(window.location.href);
        url.searchParams.set('type', type);
        url.searchParams.set('page', '1');
        router.push(url.toString());
      }}
      size="xl"
      color="dark.4"
      onLabel={fCapitalizeSpace(ENTERTAIN_TYPE.MOVIE)}
      offLabel={fCapitalizeSpace(ENTERTAIN_TYPE.TV)}
    />
  );
}
