import { formatPeriod } from '@/lib/format';

// Vertical timeline of work / education entries (newest first, as the API returns them).
export default function Timeline({ items }) {
  return (
    <ol className="border-line relative ml-2 space-y-8 border-l pl-8">
      {items.map((item) => (
        <li key={item._id} className="relative">
          <span
            className={`border-bg absolute top-1.5 -left-[39px] size-3.5 rounded-full border-2 ${
              item.current ? 'bg-accent' : 'bg-muted'
            }`}
            aria-hidden="true"
          />
          <p className="text-muted text-sm">
            {formatPeriod(item)}
            {item.location && ` · ${item.location}`}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
          <p className="text-accent text-sm font-medium">
            {item.organization}
            <span className="chip ml-2 capitalize">{item.type}</span>
          </p>
          {item.description && <p className="text-muted mt-3 text-sm whitespace-pre-line">{item.description}</p>}
          {item.highlights?.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
