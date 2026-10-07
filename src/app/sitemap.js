import { getPosts, getProjects } from '@/lib/api';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

// /sitemap.xml - tells search engines about every page, including each project and post.
export default async function sitemap() {
  const [projects, posts] = await Promise.all([getProjects({ limit: 100 }), getPosts({ limit: 100 })]);

  return [
    ...['', '/about', '/projects', '/blog', '/contact'].map((path) => ({ url: `${SITE_URL}${path}` })),
    ...projects.items.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.items.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}
