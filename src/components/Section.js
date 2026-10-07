import Link from 'next/link';

// A titled block of the page. `action` adds a "View all →" style link next to the title.
export default function Section({ id, eyebrow, title, description, action, children, className = '' }) {
  return (
    <section id={id} className={`container-page py-12 sm:py-16 ${className}`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          {eyebrow && <p className="text-accent mb-2 text-sm font-semibold tracking-wider uppercase">{eyebrow}</p>}
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          {description && <p className="text-muted mt-2">{description}</p>}
        </div>
        {action && (
          <Link href={action.href} className="text-accent text-sm font-medium hover:underline">
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// Heading for inner pages (/projects, /blog ...)
export function PageHeader({ title, description }) {
  return (
    <div className="container-page pt-12 pb-2 sm:pt-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && <p className="text-muted mt-3 max-w-2xl text-lg">{description}</p>}
    </div>
  );
}

export function EmptyState({ children }) {
  return <p className="card text-muted px-6 py-12 text-center">{children}</p>;
}
