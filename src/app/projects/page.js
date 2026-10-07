import Link from 'next/link';
import { getProjects } from '@/lib/api';
import { EmptyState, PageHeader } from '@/components/Section';
import { ProjectCard } from '@/components/cards';

export const metadata = {
  title: 'Projects',
  description: 'A selection of things I have designed and built.',
};

// /projects            all published projects
// /projects?category=Web%20App   only one category
export default async function ProjectsPage({ searchParams }) {
  const { category = '' } = await searchParams;
  const all = await getProjects({ limit: 100 });

  const categories = [...new Set(all.items.map((project) => project.category).filter(Boolean))];
  const projects = category
    ? all.items.filter((project) => project.category.toLowerCase() === category.toLowerCase())
    : all.items;

  return (
    <>
      <PageHeader title="Projects" description="A selection of things I have designed and built." />

      <div className="container-page py-10">
        {categories.length > 1 && (
          <nav className="mb-8 flex flex-wrap gap-2" aria-label="Filter by category">
            {['', ...categories].map((name) => {
              const active = name.toLowerCase() === category.toLowerCase();
              return (
                <Link
                  key={name || 'all'}
                  href={name ? `/projects?category=${encodeURIComponent(name)}` : '/projects'}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active ? 'border-accent bg-accent text-accent-fg' : 'border-line text-muted hover:text-fg'
                  }`}
                >
                  {name || 'All'}
                </Link>
              );
            })}
          </nav>
        )}

        {projects.length === 0 ? (
          <EmptyState>No projects to show yet.</EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
