import Image from 'next/image';
import { API_ORIGIN, assetUrl } from '@/lib/api';

// The image optimizer refuses to fetch from localhost, so it is skipped in development.
const LOCAL_API = /^https?:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(API_ORIGIN);

// An image chosen in the admin panel.
// - Uploaded files (on the API server) go through next/image: resized per screen, AVIF/WebP, lazy.
// - Images linked from any other website can't be optimized, so they stay a plain <img>.
//
// Pass `fill` when the parent has a fixed shape (cards, avatars). Otherwise the image is as
// wide as its container and keeps its own proportions.
export default function CmsImage({ image, alt, sizes = '100vw', fill = false, preload = false, className = '' }) {
  if (!image?.url) return null;

  const src = assetUrl(image.url);
  const label = image.alt || alt || '';

  if (!src.startsWith(`${API_ORIGIN}/uploads/`)) {
    return (
      <img
        src={src}
        alt={label}
        loading={preload ? 'eager' : 'lazy'}
        className={`${fill ? 'absolute inset-0 size-full' : 'h-auto w-full'} ${className}`}
      />
    );
  }

  return fill ? (
    <Image src={src} alt={label} fill sizes={sizes} preload={preload} unoptimized={LOCAL_API} className={className} />
  ) : (
    // width/height only reserve space while loading; h-auto then follows the real proportions
    <Image
      src={src}
      alt={label}
      width={1600}
      height={900}
      sizes={sizes}
      preload={preload}
      unoptimized={LOCAL_API}
      className={`h-auto w-full ${className}`}
    />
  );
}
