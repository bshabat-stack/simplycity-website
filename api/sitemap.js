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

function entry(locale, page) {
  const lines = ['  <url>', '    <loc>' + url(locale, page) + '</loc>'];
  for (const alt of LOCALES) {
    lines.push('    <xhtml:link rel="alternate" hreflang="' + alt + '" href="' + url(alt, page) + '"/>');
  }
  lines.push('    <xhtml:link rel="alternate" hreflang="x-default" href="' + url('en', page) + '"/>');
  lines.push('  </url>');
  return lines.join('\n');
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
function publishedSlugs() {
  const dir = path.join(process.cwd(), 'content', 'blog');
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

  const pages = PAGES.concat(publishedSlugs().map((slug) => 'blog/' + slug));

  const entries = [];
  for (const page of pages) {
    for (const locale of LOCALES) {
      entries.push(entry(locale, page));
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
