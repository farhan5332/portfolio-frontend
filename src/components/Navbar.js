'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ name }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="border-line bg-bg/85 sticky top-0 z-30 border-b backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {name || 'Portfolio'}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href) ? 'text-accent bg-accent-soft' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="hover:bg-surface rounded-lg p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-line border-t md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href) ? 'text-accent bg-accent-soft' : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
