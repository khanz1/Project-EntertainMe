import { MetadataRoute } from 'next';
import { APP } from '@/constant';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP.WEB_URL,
      lastModified: new Date(),
    },
    {
      url: `${APP.WEB_URL}/movies`,
      lastModified: new Date(),
    },
    {
      url: `${APP.WEB_URL}/tv`,
      lastModified: new Date(),
    },
    {
      url: `${APP.WEB_URL}/discover`,
      lastModified: new Date(),
    },
    {
      url: `${APP.WEB_URL}/collection`,
      lastModified: new Date(),
    },
  ];
}
