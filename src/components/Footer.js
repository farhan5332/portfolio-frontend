import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function Footer({ about }) {
  return (
    <footer className="border-line mt-20 border-t">
      <div className="container-page text-muted flex flex-col items-center justify-between gap-4 py-8 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {about?.name || 'Portfolio'}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <SocialLinks socials={about?.socials} />
          <Link href="/contact" className="hover:text-fg">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
