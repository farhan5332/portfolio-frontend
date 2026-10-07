'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

// Shown when a page crashes while rendering, instead of a blank screen.
export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page py-28 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted mt-2">This page couldn&apos;t be loaded. Please try again.</p>
      <button type="button" className="btn btn-primary mt-8" onClick={() => retry()}>
        Try again
      </button>
    </div>
  );
}
