// Fixed locale + UTC so the server and the browser always print the same text.
const format = (value, options) =>
  value ? new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC', ...options }) : '';

// "Sep 24, 2026"
export const formatDate = (value) => format(value, { year: 'numeric', month: 'short', day: 'numeric' });

// "Sep 2026"
export const formatMonth = (value) => format(value, { year: 'numeric', month: 'short' });

// "Jan 2025 – Present"
export const formatPeriod = ({ startDate, endDate, current }) => {
  const end = current || !endDate ? 'Present' : formatMonth(endDate);
  return startDate ? `${formatMonth(startDate)} – ${end}` : end;
};

// { Frontend: [...], Backend: [...] } keeping the order the API returned
export const groupBy = (items, key) => {
  const groups = {};
  for (const item of items) (groups[item[key] || 'Other'] ??= []).push(item);
  return groups;
};
