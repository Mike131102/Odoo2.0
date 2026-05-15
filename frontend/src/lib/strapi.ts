import type { StrapiResponse, Homepage, Service, FAQ, BlogPost, Global } from '../types/strapi';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

if (!STRAPI_URL && import.meta.env.MODE !== 'development') {
  console.warn('[strapi.ts] PUBLIC_STRAPI_URL is not set — using http://localhost:1337');
}

const BASE_URL = STRAPI_URL || 'http://localhost:1337';

async function fetchStrapi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`[Strapi] ${res.status} ${res.statusText}: ${path}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.warn(`[Strapi] unreachable: ${path} — ${message}`);
    return null;
  }
}

export async function getHomepage(): Promise<Homepage | null> {
  const res = await fetchStrapi<StrapiResponse<Homepage>>('/api/homepage?status=published');
  return res?.data ?? null;
}

export async function getServices(): Promise<Service[]> {
  const res = await fetchStrapi<StrapiResponse<Service[]>>(
    '/api/services?sort=order:asc&pagination[limit]=10&status=published'
  );
  return res?.data ?? [];
}

export async function getFaqs(): Promise<FAQ[]> {
  const res = await fetchStrapi<StrapiResponse<FAQ[]>>(
    '/api/faqs?sort=order:asc&pagination[limit]=20&status=published'
  );
  return res?.data ?? [];
}

export async function getBlogPosts(limit = 3): Promise<BlogPost[]> {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 3;
  const res = await fetchStrapi<StrapiResponse<BlogPost[]>>(
    `/api/blog-posts?sort=publishedAt:desc&pagination[limit]=${safeLimit}&status=published`
  );
  return res?.data ?? [];
}

export async function getGlobal(): Promise<Global | null> {
  const res = await fetchStrapi<StrapiResponse<Global>>('/api/global');
  return res?.data ?? null;
}