import Link from 'next/link';
import { formatDate } from '@/lib/format';
import CmsImage from './CmsImage';

// Cards sit in a 1 / 2 / 3 column grid inside a 1152px page
const CARD_SIZES = '(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw';

function Cover({ image, title }) {
  return image?.url ? (
    <div className="relative aspect-video w-full">
      <CmsImage
        image={image}
        alt={title}
        fill
        sizes={CARD_SIZES}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div className="bg-accent-soft text-accent flex aspect-video w-full items-center justify-center text-4xl font-bold">
      {title?.[0]?.toUpperCase()}
    </div>
  );
}

export function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="overflow-hidden">
        <Cover image={project.coverImage} title={project.title} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {project.category && <p className="text-accent mb-1 text-xs font-semibold tracking-wider uppercase">{project.category}</p>}
        <h3 className="group-hover:text-accent text-lg font-semibold transition-colors">{project.title}</h3>
        {project.summary && <p className="text-muted mt-2 line-clamp-3 text-sm">{project.summary}</p>}
        {project.techStack?.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

export function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="overflow-hidden">
        <Cover image={post.coverImage} title={post.title} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-muted text-xs">
          {formatDate(post.publishedAt || post.createdAt)} · {post.readingTime} min read
        </p>
        <h3 className="group-hover:text-accent mt-2 text-lg font-semibold transition-colors">{post.title}</h3>
        {post.excerpt && <p className="text-muted mt-2 line-clamp-3 text-sm">{post.excerpt}</p>}
        {post.tags?.length > 0 && (
          <p className="text-accent mt-auto pt-4 text-xs font-medium">{post.tags.map((tag) => `#${tag}`).join('  ')}</p>
        )}
      </div>
    </Link>
  );
}

export function ServiceCard({ service }) {
  return (
    <div className="card flex flex-col p-6">
      <h3 className="text-lg font-semibold">{service.title}</h3>
      {service.description && <p className="text-muted mt-2 text-sm">{service.description}</p>}
      {service.features?.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {service.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-accent" aria-hidden="true">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {service.priceLabel && <p className="text-accent mt-auto pt-5 text-sm font-semibold">{service.priceLabel}</p>}
    </div>
  );
}

export function TestimonialCard({ testimonial: t }) {
  return (
    <figure className="card flex flex-col p-6">
      <p className="text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
        {'★'.repeat(t.rating)}
        <span className="opacity-30">{'★'.repeat(5 - t.rating)}</span>
      </p>
      <blockquote className="mt-3 flex-1 leading-relaxed">“{t.content}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.avatar?.url ? (
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <CmsImage image={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
          </span>
        ) : (
          <span className="bg-accent-soft text-accent flex size-10 shrink-0 items-center justify-center rounded-full font-semibold">
            {t.name[0].toUpperCase()}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold">{t.name}</span>
          <span className="text-muted block">{[t.role, t.company].filter(Boolean).join(' · ')}</span>
        </span>
      </figcaption>
    </figure>
  );
}
