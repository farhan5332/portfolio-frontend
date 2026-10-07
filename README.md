# Portfolio Frontend

Next.js 16 (App Router) + Tailwind CSS 4. Every piece of content comes from the custom CMS in
`project-backend` and is edited in its admin panel.

## Quick start

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Start the API first (`npm run dev` in `project-backend`, port 4000), then open http://localhost:3000.
If the API is offline the site still loads and shows empty states.

## Pages

| Route              | Content (API)                                                          |
| ------------------ | ---------------------------------------------------------------------- |
| `/`                | Hero (about), skills, featured projects, services, experience, testimonials, latest posts |
| `/about`           | Bio, contact details, stats, skills, work + education timeline         |
| `/projects`        | All published projects, `?category=` filter                            |
| `/projects/[slug]` | Case study (markdown), tech stack, links, gallery                      |
| `/blog`            | Published posts, `?page=` and `?tag=`                                  |
| `/blog/[slug]`     | Post (markdown)                                                        |
| `/contact`         | Contact form -> `POST /api/contact`                                    |
| `/sitemap.xml`, `/robots.txt` | Generated from the CMS content                              |

## How content is loaded

- `src/lib/api.js` is the only file that talks to the API. Pages are server components and call
  functions like `getProjects()` directly.
- In production, pages are cached and refreshed at most every 60 seconds, so an edit in the admin
  panel appears on the site within a minute. In development every request is fresh.
- Uploaded images are stored as `/uploads/...` on the API; `assetUrl()` turns them into full URLs.
- `components/CmsImage.js` renders them through `next/image`: each screen gets the size it needs, as
  AVIF or WebP, loaded lazily. Images linked from other websites stay plain `<img>` tags. (The
  optimizer is skipped while the API runs on localhost.)
- The contact form posts from the browser, so this site's URL must be listed in the backend's
  `CLIENT_URLS` (CORS).

## Folder structure

```
src/
  app/          routes (page.js per route), layout, global styles, sitemap, robots
  components/   Navbar, Footer, Hero, cards, SkillsGrid, Timeline, Markdown, ContactForm, CmsImage
  lib/          api.js (CMS requests), format.js (dates, grouping)
```

Colors live in `src/app/globals.css` as CSS variables (light + dark mode follow the visitor's system
setting). Change `--accent` there to re-theme the whole site.

## Scripts

| Command         | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm start`     | Serve the production build |
| `npm run lint`  | ESLint                     |

## Deployment (Vercel)

Deploy the backend first (see its README); you need its URL here.

1. Push this repo to GitHub.
2. **Vercel** → Add New → Project → import the repo. The Next.js defaults are correct.
3. Add two environment variables before deploying:

   | Name                   | Value                                                |
   | ---------------------- | ---------------------------------------------------- |
   | `NEXT_PUBLIC_API_URL`  | `https://<your-service>.onrender.com/api`            |
   | `NEXT_PUBLIC_SITE_URL` | this site's public URL, e.g. `https://your-site.vercel.app` |

4. Deploy, then tell the backend about this site: on Render set `CLIENT_URLS` to the same URL as
   `NEXT_PUBLIC_SITE_URL` (no trailing slash). Without it the contact form is blocked by CORS.

Both variables are read at build time, so redeploy after changing them.

**Custom domain:** add it under Vercel → Settings → Domains, then update `NEXT_PUBLIC_SITE_URL`
(redeploy) and add the new address to `CLIENT_URLS` on Render. `CLIENT_URLS` takes a comma-separated
list, so the `vercel.app` address can stay next to it.

**Netlify** works too: same two variables, build command `npm run build`.

After deploying, check the home page, one project, one blog post, `/sitemap.xml`, and send yourself
a message from `/contact`; it should appear under Messages in the admin panel.
