# Google Ask Maps blog — Technical SEO & Backend Handoff

Companion to `google-ask-maps.md`. Everything an engineer needs to publish the post on the SimplyCity Vercel site (`simplycity-website.vercel.app`) with full technical SEO. Target URL: `https://simplycity-website.vercel.app/blog/google-ask-maps`.

---

## 1. How the post maps to the existing template

The live blog index (`/blog`) renders each post from these variables:

```
{{ post.dateLabel }}
## [{{ post.title }}](/blog/{{ post.slug }})
{{ post.excerpt }}
Read article →
```

So the post object **must** expose at minimum: `title`, `slug`, `excerpt`, `dateLabel`, plus a `body` for the `/blog/{slug}` page. The frontmatter in `google-ask-maps.md` provides those four exactly, plus extra fields for `<head>`. Field names are best-guesses from the rendered template — **confirm they match the site's actual post schema** (data file, CMS collection, or content directory) and rename if needed. Nothing else in the post depends on names being exact.

| Template variable | Value |
|---|---|
| `title` | Google Ask Maps: How to Make Sure Your Business Gets Recommended by AI |
| `slug` | `google-ask-maps` |
| `excerpt` | Google's Ask Maps AI now recommends local businesses by name — not a ranked list. Here's how it decides, and the five Google Business Profile changes that get your business recommended. |
| `dateLabel` | Updated Jul 15, 2026 |

---

## 2. On-page SEO — the meta block

The `<head>` for `/blog/google-ask-maps` should render exactly this. The title tag is intentionally shorter than the H1 (H1 keeps the fuller headline; the title tag is trimmed to ~52 chars to avoid SERP truncation).

```html
<title>Google Ask Maps: Get Your Business Recommended by AI</title>
<meta name="description" content="Google's new Ask Maps AI recommends local businesses by name. Learn how it works and the 5 profile changes your business needs to show up." />
<link rel="canonical" href="https://simplycity-website.vercel.app/blog/google-ask-maps" />
<meta name="robots" content="index, follow, max-image-preview:large" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="Google Ask Maps: Get Your Business Recommended by AI" />
<meta property="og:description" content="Google's new Ask Maps AI recommends local businesses by name. Learn how it works and the 5 profile changes your business needs to show up." />
<meta property="og:url" content="https://simplycity-website.vercel.app/blog/google-ask-maps" />
<meta property="og:image" content="https://simplycity-website.vercel.app/blog/google-ask-maps/hero.jpg" />
<meta property="og:image:alt" content="Google Ask Maps showing a restaurant recommendation in Barcelona" />
<meta property="og:site_name" content="SimplyCity" />
<meta property="article:published_time" content="2026-07-15" />
<meta property="article:modified_time" content="2026-07-15" />
<meta property="article:author" content="Ben Shabat" />

<!-- Twitter/X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Google Ask Maps: Get Your Business Recommended by AI" />
<meta name="twitter:description" content="Google's new Ask Maps AI recommends local businesses by name. Learn how it works and the 5 profile changes your business needs to show up." />
<meta name="twitter:image" content="https://simplycity-website.vercel.app/blog/google-ask-maps/hero.jpg" />

<!-- hreflang — ONLY add each line once the translated post actually exists at that URL -->
<link rel="alternate" hreflang="en" href="https://simplycity-website.vercel.app/blog/google-ask-maps" />
<!-- <link rel="alternate" hreflang="es" href="https://simplycity-website.vercel.app/es/blog/google-ask-maps" /> -->
<!-- <link rel="alternate" hreflang="he" href="https://simplycity-website.vercel.app/he/blog/google-ask-maps" /> -->
<link rel="alternate" hreflang="x-default" href="https://simplycity-website.vercel.app/blog/google-ask-maps" />
```

Lengths (verified): title tag 52 chars, meta description 136 chars — both inside Google's display limits.

---

## 3. Structured data (JSON-LD)

Add all three blocks to the post page. `Article` + `FAQPage` make the post eligible for rich results and materially help AI/LLM answer engines — which is on-theme for a post about AI recommendation. Paste inside `<head>` or before `</body>`.

### 3a. Article

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Google Ask Maps: How to Make Sure Your Business Gets Recommended by AI",
  "description": "Google's new Ask Maps AI recommends local businesses by name. Learn how it works and the 5 profile changes your business needs to show up.",
  "image": "https://simplycity-website.vercel.app/blog/google-ask-maps/hero.jpg",
  "datePublished": "2026-07-15",
  "dateModified": "2026-07-15",
  "author": {
    "@type": "Person",
    "name": "Ben Shabat",
    "description": "Content marketing strategist with 8+ years writing across fintech and B2B tech."
  },
  "publisher": {
    "@type": "Organization",
    "name": "SimplyCity",
    "logo": {
      "@type": "ImageObject",
      "url": "https://simplycity-website.vercel.app/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://simplycity-website.vercel.app/blog/google-ask-maps"
  }
}
</script>
```

### 3b. FAQPage (mirrors the 7 FAQs in the post — keep them in sync if edited)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Google Ask Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ask Maps is a conversational AI search feature inside Google Maps, launched in March 2026 and powered by Google Gemini. Users ask natural-language questions and receive AI-generated recommendations for specific local businesses, rather than a ranked list."
      }
    },
    {
      "@type": "Question",
      "name": "Is Google Ask Maps available in Spain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Google Ask Maps is live in Spain, including Barcelona, as of its March 2026 launch, with a full global rollout announced for the end of 2026. It is currently active across the US, UK, Spain, and other major European markets."
      }
    },
    {
      "@type": "Question",
      "name": "How does Ask Maps decide which businesses to recommend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ask Maps draws on three signals: Google Business Profile completeness and specificity; review sentiment analysis of the language customers use; and GBP attributes such as outdoor seating or good for groups. Businesses with detailed signals across all three are recommended more consistently."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a separate strategy for Ask Maps vs. regular Google Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Ask Maps uses the same Google Business Profile data as regular Google Maps. Completing your profile, setting attributes, generating specific reviews, and listing services improves both simultaneously — though Ask Maps weights attribute specificity and review language more heavily."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to see results after optimising for Ask Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GBP profile changes can show visible results within days to two weeks. Meaningful ranking improvements typically appear within four to eight weeks of consistent optimisation, and review-velocity gains compound over time."
      }
    },
    {
      "@type": "Question",
      "name": "My competitor has far more reviews than me. Can I still appear in Ask Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Ask Maps matches on multiple dimensions, not just review count. A business with 50 specific, well-responded reviews and a fully completed GBP can outrank a competitor with 300 generic reviews for attribute-specific queries."
      }
    },
    {
      "@type": "Question",
      "name": "Does my Google Business Profile help with ChatGPT or Perplexity recommendations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not directly — ChatGPT and Perplexity do not use GBP data the way Google does. But a well-optimised GBP creates consistent entity signals across your website, Google's Knowledge Graph, directories, and review platforms, which influences how third-party AI platforms describe your business."
      }
    }
  ]
}
</script>
```

*(The 8th FAQ in the post — "What if I don't have time to manage my GBP" — is a CTA rather than an informational Q&A, so it's intentionally omitted from schema to avoid a promotional-content flag in Rich Results.)*

### 3c. BreadcrumbList

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplycity-website.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://simplycity-website.vercel.app/blog" },
    { "@type": "ListItem", "position": 3, "name": "Google Ask Maps", "item": "https://simplycity-website.vercel.app/blog/google-ask-maps" }
  ]
}
</script>
```

Validate all three at https://search.google.com/test/rich-results before shipping.

---

## 4. Images — assets to produce

Store under `/public/blog/google-ask-maps/`. Serve WebP/AVIF with dimensions set (prevents CLS). The post body has 3 inline `<!-- IMAGE -->` markers plus the hero.

| File | Placement | Alt text |
|---|---|---|
| `hero.jpg` | Top / OG image | Google Ask Maps showing a restaurant recommendation in Barcelona |
| `signal-1-attributes.jpg` | After "Signal 1" | Google Business Profile attributes section showing checkboxes for a restaurant |
| `scenario-comparison.jpg` | In "A real-world scenario" | Incomplete vs optimised Google Business Profile for a restaurant, side by side |
| `client-ranking.jpg` (optional) | Near client results | SimplyCity client ranked #1 on Google Maps in Barcelona |

Every `<img>` needs the `alt` above, explicit `width`/`height`, and `loading="lazy"` on everything except the hero (hero should be eager / preloaded for LCP).

---

## 5. Backend / Vercel changes required

These are site-level gaps found while inspecting the live site — they block or weaken the post's SEO regardless of the post itself.

1. **`sitemap.xml` is missing** (`/sitemap.xml` returns empty). Generate one and add the new post URL:
   ```xml
   <url>
     <loc>https://simplycity-website.vercel.app/blog/google-ask-maps</loc>
     <lastmod>2026-07-15</lastmod>
     <changefreq>monthly</changefreq>
   </url>
   ```
   Ideally auto-generate at build time so future posts are included automatically.

2. **`robots.txt` is missing** (`/robots.txt` returns empty). Add:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://simplycity-website.vercel.app/sitemap.xml
   ```
   Do **not** block AI crawlers (GPTBot, PerplexityBot, Google-Extended) — this post's whole goal is AI/LLM visibility.

3. **Blog index is templated but has no live posts** ("New articles are on the way"). Wire the post data source so `/blog` renders the new card and the "empty state" message is conditionally hidden once ≥1 post exists.

4. **`/blog/{slug}` route** must exist and render the post body, meta block (§2), and schema (§3). Confirm the dynamic route is built/pre-rendered for `google-ask-maps`.

5. **Author entity** — no author/bio component was visible. Add a small author block (name + bio from frontmatter) at the foot of the post. Bylines and bios are a real ranking/E-E-A-T signal and help AI answer engines attribute authority.

6. **Internal links** — the post links to `/google-business-profile-optimization`, `/local-seo-for-small-business`, `/local-seo-agency`, `/results`, and `/audit?source=blog`. All are live in the site nav (verified). Add at least one **inbound** link back to the post — from `/google-business-profile-optimization` and/or the `/blog` "Local SEO guide" resource slot — so the post isn't orphaned.

7. **RSS/JSON feed (optional)** — if you plan a content cadence, emit `/blog/feed.xml` at build time. Helps distribution and AI ingestion.

---

## 6. Fix before publishing (content/consistency flags)

- **Dates set to launch day.** Both `datePublished` and `dateModified` are **2026-07-15** (published = updated), so nothing is backdated relative to indexing. The source doc's earlier "June 3, 2026" date has been dropped per instruction.
- **Citations name sources but not linkable URLs** (Rio SEO, BrightLocal, Search Engine Land, Blogging Wizard, Map Ranks, Google guidance). For E-E-A-T and AI trust, convert the strongest 3–4 into real outbound `rel="noopener"` links to the primary source. Left as plain text for now since exact URLs weren't in the source.
- **`og:image` / logo files** referenced in schema (`hero.jpg`, `logo.png`) must exist at those paths before launch or the rich result / social card will fail validation.
