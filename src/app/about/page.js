import Link from 'next/link';
import { assetUrl, getAbout, getExperience, getSkills } from '@/lib/api';
import CmsImage from '@/components/CmsImage';
import Markdown from '@/components/Markdown';
import Section, { EmptyState, PageHeader } from '@/components/Section';
import SkillsGrid from '@/components/SkillsGrid';
import SocialLinks from '@/components/SocialLinks';
import Timeline from '@/components/Timeline';

export const metadata = { title: 'About' };

export default async function AboutPage() {
  const [about, skills, experience] = await Promise.all([getAbout(), getSkills(), getExperience()]);

  if (!about) {
    return (
      <>
        <PageHeader title="About" />
        <div className="container-page py-10">
          <EmptyState>The about page hasn&apos;t been written yet.</EmptyState>
        </div>
      </>
    );
  }

  const work = experience.items.filter((item) => item.type === 'work');
  const education = experience.items.filter((item) => item.type === 'education');

  return (
    <>
      <PageHeader title={`About ${about.name}`} description={about.headline} />

      <div className="container-page grid gap-10 py-10 md:grid-cols-[280px_1fr]">
        <aside className="space-y-5">
          {about.avatar?.url && (
            <div className="border-line relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border">
              <CmsImage image={about.avatar} alt={about.name} fill preload sizes="280px" className="object-cover" />
            </div>
          )}
          <dl className="space-y-3 text-sm">
            {about.location && (
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="font-medium">{about.location}</dd>
              </div>
            )}
            {about.email && (
              <div>
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${about.email}`} className="text-accent font-medium hover:underline">
                    {about.email}
                  </a>
                </dd>
              </div>
            )}
            {about.phone && (
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="font-medium">{about.phone}</dd>
              </div>
            )}
          </dl>
          <SocialLinks socials={about.socials} className="text-muted text-sm" />
          <div className="flex flex-wrap gap-3">
            {about.resumeUrl && (
              <a href={assetUrl(about.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download resume
              </a>
            )}
            <Link href="/contact" className="btn btn-secondary">
              Contact me
            </Link>
          </div>
        </aside>

        <div>
          <Markdown>{about.bio || about.shortBio}</Markdown>

          {about.stats?.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="card p-4">
                  <dd className="text-2xl font-bold">{stat.value}</dd>
                  <dt className="text-muted mt-1 text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {skills.items.length > 0 && (
        <Section id="skills" title="Skills">
          <SkillsGrid skills={skills.items} />
        </Section>
      )}

      {work.length > 0 && (
        <Section id="experience" title="Experience">
          <Timeline items={work} />
        </Section>
      )}

      {education.length > 0 && (
        <Section id="education" title="Education">
          <Timeline items={education} />
        </Section>
      )}
    </>
  );
}
