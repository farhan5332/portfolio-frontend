import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { assetUrl, getAbout } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Site-wide SEO defaults, built from the About document in the CMS.
// Pages only set their own title, e.g. "Projects" -> "Projects | Your Name".
export async function generateMetadata() {
  const about = await getAbout();
  const name = about?.name || 'Portfolio';
  const title = about?.headline ? `${name} – ${about.headline}` : name;
  const description = about?.shortBio || `${name}'s portfolio: projects, blog and contact.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${name}` },
    description,
    openGraph: {
      title,
      description,
      siteName: name,
      type: 'website',
      images: about?.avatar?.url ? [assetUrl(about.avatar.url)] : [],
    },
    twitter: { card: 'summary' },
  };
}

export default async function RootLayout({ children }) {
  const about = await getAbout();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar name={about?.name} />
        <main className="flex-1">{children}</main>
        <Footer about={about} />
      </body>
    </html>
  );
}
