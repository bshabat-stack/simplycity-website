// Serves a single blog post page. vercel.json rewrites /blog/:slug — and the
// /es and /he equivalents — here instead of straight to BlogPost.dc.html, so
// that *this function*, not the static file, decides the HTTP status.
//
// That is the whole point: a Vercel rewrite always answers 200, so pointing a
// wildcard slug at the template made every bogus URL a soft 404 — the "we
// couldn't find that article" shell served as though it were a real page.
// Here, a slug with no Markdown behind it gets a genuine 404.
//
// On a hit we serve the locale's BlogPost.dc.html with the canonical and
// BlogPosting JSON-LD injected into <head>. Those are per-slug, which is
// exactly why the static template cannot carry them.
//
// There is deliberately NO hreflang here, unlike every other page on the site.
// Each locale has its own independent set of posts (content/blog/<locale>) —
// they are not translations of one another. hreflang asserts "the same page in
// another language", so pointing /blog/foo at /es/blog/foo would tell Google two
// unrelated articles are interchangeable and invite it to swap one for the other
// in results. It would also point at URLs that 404 whenever a slug exists in one
// locale only, which is the normal case. A self-referencing canonical is the
// whole of the correct markup here.

const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://simplycity-website.vercel.app';
const LOCALES = ['en', 'es', 'he'];

// en is the root locale, so its URL prefix is empty: /blog/x, not /en/blog/x.
const LOCALE_CONFIG = {
  en: { prefix: '', lang: 'en', template: 'BlogPost.dc.html', notFound: '404.html' },
  es: { prefix: '/es', lang: 'es-ES', template: 'es/BlogPost.dc.html', notFound: 'es/404.html' },
  he: { prefix: '/he', lang: 'he-IL', template: 'he/BlogPost.dc.html', notFound: 'he/404.html' }
};

// Lowercase, digits and hyphens only — the naming rule stated in
// content/blog/_TEMPLATE.md. It also has to reject "." and "/" so that a stray
// asset request like /blog/support.js can never be turned into a file path.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Same frontmatter shape api/blog-posts.js reads: a leading "---" block of
// "key: value" lines.
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

function postUrl(locale, slug) {
  return ORIGIN + LOCALE_CONFIG[locale].prefix + '/blog/' + slug;
}

function attr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function metaTag(kind, key, value) {
  return '<meta ' + kind + '="' + attr(key) + '" content="' + attr(value) + '">';
}

// og:image and friends must be absolute; frontmatter stores them site-root-relative.
function absoluteUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return ORIGIN + (value.charAt(0) === '/' ? value : '/' + value);
}

// "</script>" inside a JSON-LD string would close the tag early.
function jsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

// Optional per-post structured data: content/blog/<locale>/<slug>.schema.json holds
// an array of JSON-LD objects (Article, FAQPage, BreadcrumbList, …) authored
// alongside the post. Returns an array, or null if absent/unparseable — a broken
// sidecar must never 500 the page, it just falls back to the default BlogPosting.
function readSchema(root, locale, slug) {
  let raw;
  try {
    raw = fs.readFileSync(path.join(root, 'content', 'blog', locale, slug + '.schema.json'), 'utf8');
  } catch {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.length ? parsed : null;
    return parsed && typeof parsed === 'object' ? [parsed] : null;
  } catch {
    return null;
  }
}

// Everything here is server-rendered into <head> so it is present pre-JS for
// crawlers and social scrapers (which don't run the client framework). The extra
// SEO fields are all optional: a minimal title/date/excerpt post still gets a
// title, description, canonical and BlogPosting exactly as before.
//
// Self-referencing canonical, and deliberately NO hreflang — see the header
// comment on why posts carry none.
function headTags(root, locale, slug, meta) {
  const url = postUrl(locale, slug);
  const title = meta.metaTitle || meta.title;
  // <title> mirrors loadPost() in the template exactly: metaTitle verbatim when
  // set, else the brand-suffixed title — so the pre-JS and post-JS titles agree.
  const docTitle = meta.metaTitle || (meta.title + ' | SimplyCity Blog');
  const description = meta.metaDescription || meta.excerpt || '';
  const image = absoluteUrl(meta.ogImage); // absolute — og/twitter image requires it
  const tags = [];

  // The static <title> and <meta name="description"> were removed from the
  // BlogPost templates so the ones injected here are the only copies.
  tags.push('<title>' + attr(docTitle) + '</title>');
  if (description) tags.push(metaTag('name', 'description', description));
  tags.push(metaTag('name', 'robots', 'index, follow, max-image-preview:large'));
  tags.push('<link rel="canonical" href="' + attr(url) + '">');
  // Preload the hero with the SAME root-relative path as its <img>, so the two
  // match in every environment (an absolute prod URL wouldn't match on preview).
  if (meta.ogImage) tags.push('<link rel="preload" as="image" href="' + attr(meta.ogImage) + '">');

  // Open Graph
  tags.push(metaTag('property', 'og:type', 'article'));
  tags.push(metaTag('property', 'og:title', title));
  if (description) tags.push(metaTag('property', 'og:description', description));
  tags.push(metaTag('property', 'og:url', url));
  tags.push(metaTag('property', 'og:site_name', 'SimplyCity'));
  if (image) {
    tags.push(metaTag('property', 'og:image', image));
    if (meta.ogImageAlt) tags.push(metaTag('property', 'og:image:alt', meta.ogImageAlt));
  }
  const published = meta.publishDate || meta.date;
  if (published) tags.push(metaTag('property', 'article:published_time', published));
  if (meta.updatedDate) tags.push(metaTag('property', 'article:modified_time', meta.updatedDate));
  if (meta.author) tags.push(metaTag('property', 'article:author', meta.author));

  // Twitter
  tags.push(metaTag('name', 'twitter:card', 'summary_large_image'));
  tags.push(metaTag('name', 'twitter:title', title));
  if (description) tags.push(metaTag('name', 'twitter:description', description));
  if (image) tags.push(metaTag('name', 'twitter:image', image));

  // Structured data: the sidecar wins when present; otherwise the default
  // BlogPosting keeps minimal posts covered.
  const schema = readSchema(root, locale, slug);
  if (schema) {
    for (const block of schema) {
      tags.push('<script type="application/ld+json">\n' + jsonLd(block) + '\n</script>');
    }
  } else {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: LOCALE_CONFIG[locale].lang,
      publisher: { '@type': 'Organization', name: 'SimplyCity', url: ORIGIN }
    };
    if (meta.excerpt) article.description = meta.excerpt;
    if (/^\d{4}-\d{2}-\d{2}$/.test(meta.date || '')) article.datePublished = meta.date;
    tags.push('<script type="application/ld+json">\n' + jsonLd(article) + '\n</script>');
  }

  return tags.join('\n');
}

function send(res, status, body, contentType, cache) {
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', cache);
  return res.status(status).send(body);
}

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const root = process.cwd();
  const locale = LOCALES.includes(req.query.locale) ? req.query.locale : 'en';
  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';

  // A short s-maxage on misses so that publishing a post can't be shadowed by a
  // cached 404 for long.
  const miss = () => {
    let body = '';
    try {
      body = fs.readFileSync(path.join(root, LOCALE_CONFIG[locale].notFound), 'utf8');
    } catch {
      body = '<!DOCTYPE html><meta charset="utf-8"><meta name="robots" content="noindex">'
        + '<title>404</title><p>Not found. <a href="/blog">Browse all articles</a></p>';
    }
    return send(res, 404, body, 'text/html; charset=utf-8', 'public, s-maxage=60');
  };

  if (!SLUG.test(slug)) return miss();

  // Scoped to the requesting locale's folder, so a slug published only in English
  // genuinely does not exist at /he/blog/<slug> — it 404s rather than falling back.
  // `locale` comes from the LOCALES whitelist and `slug` from SLUG (which rejects
  // "." and "/"), so this path can never escape content/blog.
  let meta;
  try {
    meta = parseFrontmatter(fs.readFileSync(path.join(root, 'content', 'blog', locale, slug + '.md'), 'utf8'));
  } catch {
    return miss();
  }
  // A post with no title in its frontmatter is treated as unpublished, exactly
  // as api/blog-posts.js does when building the index — otherwise a post could
  // 200 here and still be absent from /blog.
  if (!meta.title) return miss();

  let html;
  try {
    html = fs.readFileSync(path.join(root, LOCALE_CONFIG[locale].template), 'utf8');
  } catch {
    return send(res, 500, 'Blog post template missing.', 'text/plain; charset=utf-8', 'no-store');
  }

  html = html.replace('</head>', headTags(root, locale, slug, meta) + '\n</head>');

  return send(res, 200, html, 'text/html; charset=utf-8', 'public, s-maxage=300, stale-while-revalidate=86400');
};
