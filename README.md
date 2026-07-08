# SimplyCity Website

Marketing website for SimplyCity, a local SEO agency for small businesses. Built from a Claude Design export (self-contained HTML pages that boot a small client-side rendering runtime — no build step required).

## Pages

- `index.html` — Home
- `Results.dc.html` — Results / case studies
- `Pricing.dc.html` — Pricing
- `Audit.dc.html` — Free-audit lead capture
- `About.dc.html` — About
- `Contact.dc.html` — Contact
- `Blog.dc.html` — Blog index (`/blog`)
- `BlogPost.dc.html` — Blog post template (`/blog/<slug>`)

Clean URLs are mapped in `vercel.json` (`/about`, `/contact`, `/blog`, …).

## Blog posts

Posts live in `content/blog/` as Markdown files with frontmatter (`title`,
`date`, `excerpt`). The filename is the URL slug: `why-reviews-matter.md`
is served at `/blog/why-reviews-matter`. Publishing a post is just adding
one file — see `content/blog/_TEMPLATE.md`. Files starting with `_` are
ignored. The index at `/blog` lists posts via the `api/blog-posts.js`
function; with zero posts it shows an empty state.

## Local preview

Serve the folder with any static file server, e.g.:

```
npx serve .
```

Then open `http://localhost:3000`.

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site — no build command or output directory needed.
