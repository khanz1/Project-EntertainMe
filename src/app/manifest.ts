import { MetadataRoute } from 'next';
import { APP } from '@/constant';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.NAME,
    short_name: APP.NAME,
    description: APP.DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
