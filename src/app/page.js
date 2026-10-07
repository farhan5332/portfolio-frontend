import Link from 'next/link';
import { getAbout, getExperience, getPosts, getProjects, getServices, getSkills, getTestimonials } from '@/lib/api';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import SkillsGrid from '@/components/SkillsGrid';
import Timeline from '@/components/Timeline';
import { PostCard, ProjectCard, ServiceCard, TestimonialCard } from '@/components/cards';

// Home page: every section comes from the CMS and is hidden while it has no content.
export default async function HomePage() {
  const [about, skills, featured, services, experience, testimonials, posts] = await Promise.all([
    getAbout(),
    getSkills(),
    getProjects({ featured: true, limit: 6 }),
    getServices(),
    getExperience(),
    getTestimonials(),
    getPosts({ limit: 3 }),
  ]);

  // No project is marked "featured" yet -> show the first few instead
  const projects = featured.items.length ? featured.items : (await getProjects({ limit: 3 })).items;

  return (
    <>
      <Hero about={about} />

      {skills.items.length > 0 && (
        <Section id="skills" eyebrow="Skills" title="What I work with">
          <SkillsGrid skills={skills.items} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section
          id="projects"
          eyebrow="Projects"
          title="Featured work"
          action={{ href: '/projects', label: 'All projects' }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </Section>
      )}

      {services.items.length > 0 && (
        <Section id="services" eyebrow="Services" title="How I can help">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </Section>
      )}

      {experience.items.length > 0 && (
        <Section id="experience" eyebrow="Experience" title="Where I've been">
          <Timeline items={experience.items} />
        </Section>
      )}

      {testimonials.items.length > 0 && (
        <Section id="testimonials" eyebrow="Testimonials" title="What people say">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.items.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        </Section>
      )}

      {posts.items.length > 0 && (
        <Section id="blog" eyebrow="Blog" title="Latest posts" action={{ href: '/blog', label: 'All posts' }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.items.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </Section>
      )}

      <section className="container-page py-12 sm:py-16">
        <div className="card bg-accent-soft px-6 py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Have a project in mind?</h2>
          <p className="text-muted mx-auto mt-3 max-w-xl">
            I&apos;m always happy to talk about new ideas, freelance work or full-time roles.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Let&apos;s talk
          </Link>
        </div>
      </section>
    </>
  );
}
