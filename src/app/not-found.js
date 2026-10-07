import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-28 text-center">
      <p className="text-accent text-6xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="text-muted mt-2">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
