import { getCollection } from 'astro:content';
import { href, paths } from '../lib/site';
export async function GET() {
  const lessons = await getCollection('lessons', ({data}) => !data.draft);
  const routes = ['', 'about/', 'lessons/', ...paths.map(p=>`topics/${p.id}/`), ...lessons.map(l=>`lessons/${l.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>https://mmrjb.github.io${href(route)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
