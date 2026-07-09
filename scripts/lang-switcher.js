(function () {
  // The DC runtime re-injects helmet assets, so this file can execute twice — bind once.
  if (window.__scLangSwitcherBound) return;
  window.__scLangSwitcherBound = true;

  // A locale lives in the first path segment (/es/..., /he/...); English is the bare root.
  // Everything else about the path is identical across locales, so switching language is
  // a pure prefix swap — works for clean URLs (/local-seo-pricing) and raw file names
  // (/Pricing.dc.html) alike, and never points at the homepage from an inner page.
  function split(pathname) {
    var m = pathname.match(/^\/(es|he)(\/.*)?$/);
    if (m) return { locale: m[1], path: m[2] || '/' };
    return { locale: 'en', path: pathname || '/' };
  }

  function targetHref(lang) {
    var cur = split(window.location.pathname);
    var prefix = lang === 'en' ? '' : '/' + lang;
    // Locale homepage is /es, not /es/ — vercel.json sets trailingSlash:false.
    var path = cur.path === '/' && prefix ? prefix : prefix + cur.path;
    return path + window.location.search + window.location.hash;
  }

  function update() {
    var current = split(window.location.pathname).locale;
    var links = document.querySelectorAll('.lang-switcher a[data-lang]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var lang = a.getAttribute('data-lang');
      var href = targetHref(lang);
      if (a.getAttribute('href') !== href) a.setAttribute('href', href);
      var isCurrent = lang === current;
      if (isCurrent && a.getAttribute('aria-current') !== 'true') a.setAttribute('aria-current', 'true');
      if (!isCurrent && a.hasAttribute('aria-current')) a.removeAttribute('aria-current');
    }
  }

  update();
  // The DC runtime re-renders header/footer after hydration, resetting the template's
  // static hrefs — re-apply whenever nodes change (attribute edits don't retrigger this).
  new MutationObserver(update).observe(document.documentElement, { childList: true, subtree: true });

  // Remember the visitor's explicit choice for a year. The cookie is write-only for now:
  // nothing reads it or redirects on it — language only ever changes on click.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.lang-switcher a[data-lang]');
    if (!a) return;
    document.cookie = 'locale=' + a.getAttribute('data-lang') + '; path=/; max-age=31536000; SameSite=Lax';
  });
})();
