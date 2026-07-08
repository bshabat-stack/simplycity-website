// Lists blog posts for the /blog index. Reads the Markdown files from
// content/blog — bundled into this function via "functions" > "includeFiles"
// in vercel.json — and returns each file's frontmatter, newest first.
// Files starting with "_" (e.g. _TEMPLATE.md) are drafts and are skipped.

const fs = require('fs');
const path = require('path');

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

  const dir = path.join(process.cwd(), 'content', 'blog');
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const posts = files
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
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
        excerpt: meta.excerpt || ''
      };
    })
    .filter((post) => post && post.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  return res.status(200).json({ ok: true, posts });
};
