// Serves /sitemap.xml (vercel.json rewrites the URL here; the static file that
// used to sit at the repo root is gone, because Vercel serves files before
// rewrites and it would have shadowed this function).
//
// It emits the same 30 URLs the hand-maintained file did — 10 pages x 3 locales,
// at the clean URLs that byte-match each page's canonical — plus one entry per
// published blog post per locale, read from content/blog at request time. That
// last part is the reason this is a function at all: publishing a post is now
// "drop a .md file in content/blog", with no sitemap edit to remember.
//
// Still no lastmod/changefreq/priority, on purpose.
//
// PAGES is the hand-maintained list: add a page here when you add one to the
// site. The empty string is the homepage (/ , /es , /he).

const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://simplycity-website.vercel.app';
const LOCALES = ['en', 'es', 'he'];
const PREFIX = { en: '', es: '/es', he: '/he' };

// Same slug rule as api/blog-post.js — see publishedSlugs().
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const PAGES = [
  '',
  'about',
  'local-seo-agency',
  'local-seo-for-small-business',
  'google-business-profile-optimization',
  'local-seo-pricing',
  'results',
  'audit',
  'contact',
  'blog'
];

// The homepage is "/" in English but "/es" and "/he" elsewhere — no trailing
// slash, matching trailingSlash:false and the canonicals on the pages.
function url(locale, page) {
  if (!page) return ORIGIN + (locale === 'en' ? '/' : PREFIX[locale]);
  return ORIGIN + PREFIX[locale] + '/' + page;
}

// Two shapes of entry live in this sitemap, and the difference is deliberate.
//
// pageEntry(): the 10 site pages genuinely ARE translations of each other, so
// each gets the full en/es/he/x-default cluster.
//
// postEntry(): blog posts are NOT. Each locale has its own independent set of
// posts, so a post gets a <loc> under its own locale and nothing else — no
// hreflang, because there is no counterpart to point at.
function pageEntry(page) {
  const lines = [];
  for (const locale of LOCALES) {
    lines.push('  <url>', '    <loc>' + url(locale, page) + '</loc>');
    for (const alt of LOCALES) {
      lines.push('    <xhtml:link rel="alternate" hreflang="' + alt + '" href="' + url(alt, page) + '"/>');
    }
    lines.push('    <xhtml:link rel="alternate" hreflang="x-default" href="' + url('en', page) + '"/>');
    lines.push('  </url>');
  }
  return lines.join('\n');
}

function postEntry(locale, slug) {
  return ['  <url>', '    <loc>' + url(locale, 'blog/' + slug) + '</loc>', '  </url>'].join('\n');
}

// Must agree exactly with api/blog-post.js about what counts as published —
// a post listed here but 404ing there (or the reverse) is the bug this whole
// change set exists to remove. Hence the same frontmatter parse and the same
// slug charset, rather than a lookalike regex.
function parseFrontmatter(raw) {
  const meta = {};
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (block) {
    for (const line of block[1].split(/\r?\n/)) {
      const sep = line.indexOf(':');
      if (sep > 0) {
        meta[line.slice(0, sep).trim()] = line.slice(sep + 1).trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return meta;
}

// Same rules as api/blog-posts.js and api/blog-post.js: *.md, a leading "_"
// means draft, the slug must be lowercase/digits/hyphens, and a post with no
// title in its frontmatter is not published. The slug rule also means no slug
// can reach the XML needing escaping.
//
// Scoped to one locale's folder — a post is listed under its own locale only.
function publishedSlugs(locale) {
  const dir = path.join(process.cwd(), 'content', 'blog', locale);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => file.replace(/\.md$/, ''))
    .filter((slug) => SLUG.test(slug))
    .filter((slug) => {
      try {
        return Boolean(parseFrontmatter(fs.readFileSync(path.join(dir, slug + '.md'), 'utf8')).title);
      } catch {
        return false;
      }
    })
    .sort();
}

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method not allowed.');
  }

  const entries = [];

  // Translated pages: one clustered <url> per locale.
  for (const page of PAGES) {
    entries.push(pageEntry(page));
  }

  // Blog posts: each locale contributes only its own, exactly once. A slug that
  // exists solely in content/blog/en appears solely under /blog/.
  for (const locale of LOCALES) {
    for (const slug of publishedSlugs(locale)) {
      entries.push(postEntry(locale, slug));
    }
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    + '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + entries.join('\n') + '\n'
    + '</urlset>\n';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  return res.status(200).send(xml);
};
