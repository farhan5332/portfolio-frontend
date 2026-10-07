import { getAbout } from '@/lib/api';
import ContactForm from '@/components/ContactForm';
import { PageHeader } from '@/components/Section';
import SocialLinks from '@/components/SocialLinks';

export const metadata = {
  title: 'Contact',
  description: 'Have a question or a project in mind? Send me a message.',
};

export default async function ContactPage() {
  const about = await getAbout();

  return (
    <>
      <PageHeader title="Get in touch" description="Have a question or a project in mind? Send me a message and I'll reply as soon as I can." />

      <div className="container-page grid gap-10 py-10 md:grid-cols-[1fr_280px]">
        <ContactForm />

        <aside className="space-y-6 text-sm">
          {about?.email && (
            <div>
              <h2 className="text-muted">Email</h2>
              <a href={`mailto:${about.email}`} className="text-accent font-medium hover:underline">
                {about.email}
              </a>
            </div>
          )}
          {about?.phone && (
            <div>
              <h2 className="text-muted">Phone</h2>
              <p className="font-medium">{about.phone}</p>
            </div>
          )}
          {about?.location && (
            <div>
              <h2 className="text-muted">Location</h2>
              <p className="font-medium">{about.location}</p>
            </div>
          )}
          {about?.socials?.length > 0 && (
            <div>
              <h2 className="text-muted mb-1">Elsewhere</h2>
              <SocialLinks socials={about.socials} className="font-medium" />
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
