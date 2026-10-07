import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assetUrl, getPost } from '@/lib/api';
import { formatDate } from '@/lib/format';
import CmsImage from '@/components/CmsImage';
import Markdown from '@/components/Markdown';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage?.url ? [assetUrl(post.coverImage.url)] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="container-page max-w-3xl py-12 sm:py-16">
      <Link href="/blog" className="text-muted hover:text-fg text-sm">
        ← All posts
      </Link>

      <header className="mt-6">
        <p className="text-muted text-sm">
          <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
          {' · '}
          {post.readingTime} min read
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="text-muted mt-4 text-lg">{post.excerpt}</p>}

        {post.tags?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className="chip hover:underline">
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      {post.coverImage?.url && (
        <CmsImage
          image={post.coverImage}
          alt={post.title}
          preload
          sizes="(min-width: 768px) 720px, 100vw"
          className="border-line mt-10 rounded-2xl border"
        />
      )}

      <Markdown className="mt-10">{post.content}</Markdown>
    </article>
  );
}
