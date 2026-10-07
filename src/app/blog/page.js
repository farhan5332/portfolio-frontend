import Link from 'next/link';
import { getPosts } from '@/lib/api';
import { EmptyState, PageHeader } from '@/components/Section';
import { PostCard } from '@/components/cards';

export const metadata = {
  title: 'Blog',
  description: 'Notes on web development, projects and things I am learning.',
};

const PAGE_SIZE = 9;

// /blog?page=2&tag=react
const pageHref = (page, tag) => {
  const qs = new URLSearchParams({ ...(tag && { tag }), ...(page > 1 && { page: String(page) }) }).toString();
  return qs ? `/blog?${qs}` : '/blog';
};

export default async function BlogPage({ searchParams }) {
  const { page: pageParam, tag = '' } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const { items: posts, meta } = await getPosts({ page, limit: PAGE_SIZE, tag });

  return (
    <>
      <PageHeader title="Blog" description="Notes on web development, projects and things I am learning." />

      <div className="container-page py-10">
        {tag && (
          <p className="mb-6 text-sm">
            Posts tagged <span className="chip">#{tag}</span>{' '}
            <Link href="/blog" className="text-accent ml-2 hover:underline">
              Clear
            </Link>
          </p>
        )}

        {posts.length === 0 ? (
          <EmptyState>{tag ? 'No posts with this tag.' : 'No posts yet. Check back soon.'}</EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {meta.totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-between text-sm" aria-label="Pagination">
            {page > 1 ? (
              <Link href={pageHref(page - 1, tag)} className="btn btn-secondary">
                ← Newer
              </Link>
            ) : (
              <span />
            )}
            <span className="text-muted">
              Page {meta.page} of {meta.totalPages}
            </span>
            {page < meta.totalPages ? (
              <Link href={pageHref(page + 1, tag)} className="btn btn-secondary">
                Older →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
