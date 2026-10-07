import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assetUrl, getProject } from '@/lib/api';
import { formatMonth } from '@/lib/format';
import CmsImage from '@/components/CmsImage';
import Markdown from '@/components/Markdown';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage?.url ? [assetUrl(project.coverImage.url)] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const period = [project.startDate, project.endDate].filter(Boolean).map(formatMonth).join(' – ');

  return (
    <article className="container-page max-w-4xl py-12 sm:py-16">
      <Link href="/projects" className="text-muted hover:text-fg text-sm">
        ← All projects
      </Link>

      <header className="mt-6">
        {project.category && <p className="text-accent text-sm font-semibold tracking-wider uppercase">{project.category}</p>}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        {project.summary && <p className="text-muted mt-4 text-lg">{project.summary}</p>}
        {period && <p className="text-muted mt-3 text-sm">{period}</p>}

        {project.techStack?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live site ↗
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Source code ↗
              </a>
            )}
          </div>
        )}
      </header>

      {project.coverImage?.url && (
        <CmsImage
          image={project.coverImage}
          alt={project.title}
          preload
          sizes="(min-width: 896px) 848px, 100vw"
          className="border-line mt-10 rounded-2xl border"
        />
      )}

      <Markdown className="mt-10">{project.description}</Markdown>

      {project.gallery?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <CmsImage
                key={image.url}
                image={image}
                alt={project.title}
                sizes="(min-width: 640px) 416px, 100vw"
                className="border-line rounded-xl border"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
