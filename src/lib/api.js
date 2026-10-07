// Talks to the CMS backend (project-backend). Every page gets its content through these functions.

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace(/\/$/, '');

// Uploaded files are stored as "/uploads/x.png" on the API server, so give them the API's origin.
export const API_ORIGIN = new URL(API_URL).origin;
export const assetUrl = (url) => (url && url.startsWith('/') ? `${API_ORIGIN}${url}` : url || '');

// Production: pages are cached and refreshed at most once a minute, so edits made in the
// admin panel show up within 60 seconds. Development: always fresh.
const REVALIDATE = process.env.NODE_ENV === 'production' ? 60 : 0;

// Build "?a=1&b=2", skipping empty values
const toQuery = (params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString();
  return qs ? `?${qs}` : '';
};

// GET a path and return the parsed body, or null when the item doesn't exist or the API
// can't be reached. Pages then show an empty state instead of crashing.
const get = async (path) => {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) {
      if (res.status !== 404) console.error(`API ${res.status} for ${path}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`Cannot reach the API for ${path}: ${err.message}`);
    return null;
  }
};

const getOne = async (path) => (await get(path))?.data ?? null;

const getList = async (path, params) => {
  const body = await get(`${path}${toQuery(params)}`);
  return {
    items: body?.data ?? [],
    meta: body?.meta ?? { page: 1, limit: 0, total: 0, totalPages: 1 },
  };
};

export const getAbout = () => getOne('/about');
export const getSkills = () => getList('/skills', { limit: 100 });
export const getProjects = (params) => getList('/projects', params);
export const getProject = (slug) => getOne(`/projects/${encodeURIComponent(slug)}`);
export const getPosts = (params) => getList('/blogs', params);
export const getPost = (slug) => getOne(`/blogs/${encodeURIComponent(slug)}`);
export const getExperience = () => getList('/experience', { limit: 100 });
export const getTestimonials = () => getList('/testimonials', { limit: 100 });
export const getServices = () => getList('/services', { limit: 100 });

// Contact form (runs in the browser). Throws an Error with `fieldErrors` when validation fails.
export const sendContactMessage = async (values) => {
  let res;
  try {
    res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error('Could not reach the server. Please try again in a moment.');
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const error = new Error(body?.message || 'Something went wrong. Please try again.');
    error.fieldErrors = Object.fromEntries((body?.details ?? []).map((d) => [d.field, d.message]));
    throw error;
  }
  return body;
};
