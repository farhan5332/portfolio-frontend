import Link from 'next/link';
import { assetUrl } from '@/lib/api';
import CmsImage from './CmsImage';
import SocialLinks from './SocialLinks';

export default function Hero({ about }) {
  // Shown until the About document is filled in from the admin panel (or if the API is offline).
  if (!about) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to my portfolio</h1>
        <p className="text-muted mt-4">Content is on its way. Please check back soon.</p>
      </section>
    );
  }

  return (
    <section className="container-page grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
      <div>
        {about.availableForWork && (
          <p className="chip mb-5 gap-2 px-3 py-1">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Available for work
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Hi, I&apos;m <span className="text-accent">{about.name}</span>
        </h1>
        {about.headline && <p className="mt-4 text-xl font-medium sm:text-2xl">{about.headline}</p>}
        {about.shortBio && <p className="text-muted mt-4 max-w-xl text-lg">{about.shortBio}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            View my work
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get in touch
          </Link>
          {about.resumeUrl && (
            <a href={assetUrl(about.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Resume ↓
            </a>
          )}
        </div>

        <SocialLinks socials={about.socials} className="text-muted mt-8 text-sm" />
      </div>

      {about.avatar?.url && (
        <div className="border-line relative size-48 justify-self-center overflow-hidden rounded-full border-4 sm:size-64">
          {/* The largest thing on the first screen, so it is loaded first */}
          <CmsImage
            image={about.avatar}
            alt={about.name}
            fill
            preload
            sizes="(min-width: 640px) 256px, 192px"
            className="object-cover"
          />
        </div>
      )}

      {about.stats?.length > 0 && (
        <dl className="border-line grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4 md:col-span-2">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-3xl font-bold">{stat.value}</dd>
              <dt className="text-muted mt-1 text-sm">{stat.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
