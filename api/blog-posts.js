// Lists blog posts for one locale's /blog index. Reads the Markdown files from
// content/blog/<locale> — bundled into this function via "functions" >
// "includeFiles" in vercel.json — and returns each file's frontmatter, newest
// first. Files starting with "_" (e.g. _TEMPLATE.md) are drafts and are skipped.
//
// Each locale has its OWN set of posts. They are not translations of each other
// and must never cross over: /es/blog lists only content/blog/es. That is why
// the locale is a required part of the lookup rather than a presentation
// detail — see content/blog/_TEMPLATE.md.

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'he'];

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

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  // en is the root locale, so a bare /api/blog-posts (no param) means English —
  // matching api/blog-post.js. An unknown locale falls back to en rather than
  // erroring, but it can never scan more than one locale's folder.
  const locale = LOCALES.includes(req.query.locale) ? req.query.locale : 'en';

  const dir = path.join(process.cwd(), 'content', 'blog', locale);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const posts = files
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    // The slug must be one api/blog-post.js would actually serve — same
    // /^[a-z0-9-]+$/ rule — so a misnamed file (My_Post.md) never appears on the
    // index only to 404 at its own URL and be absent from the sitemap.
    .filter((file) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(file.replace(/\.md$/, '')))
    .map((file) => {
      let meta;
      try {
        meta = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'));
      } catch {
        return null;
      }
      return {
        slug: file.replace(/\.md$/, ''),
        title: meta.title || '',
        date: meta.date || '',
        excerpt: meta.excerpt || '',
        // Optional explicit label (e.g. "Updated Jul 15, 2026"); the index prefers
        // it over the formatted date when present.
        dateLabel: meta.dateLabel || ''
      };
    })
    .filter((post) => post && post.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  // The edge cache keys on the full URL including the query string, so the
  // three locales cannot serve each other a cached list.
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  return res.status(200).json({ ok: true, locale, posts });
};
