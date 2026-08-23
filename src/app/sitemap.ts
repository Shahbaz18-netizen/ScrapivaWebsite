import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scrapiva.com'; // Production domain
  
  const routes = [
    '',
    '/about',
    '/for-businesses',
    '/book-pickup',
    '/scrap-prices-siliguri',
    '/how-it-works',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/scrap-prices-siliguri' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/for-businesses' || route === '/book-pickup' ? 0.9 : 0.7,
  }));
}
