import { MetadataRoute } from 'next';
import { APP } from '@/constant';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/movies/*', '/manga/*', '/tv/*', '/discover', '/collection'],
      disallow: [],
    },
    sitemap: `${APP.WEB_URL}/sitemap.xml`,
  };
}
