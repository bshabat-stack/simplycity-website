(function () {
  // The DC runtime re-injects helmet assets, so this file can execute twice — bind once.
  if (window.__scNavToggleBound) return;
  window.__scNavToggleBound = true;

  function getNav() { return document.querySelector('.site-nav'); }

  // Vercel serves these files at clean URLs (see vercel.json rewrites); local static servers
  // reach them by file name, with or without the .html suffix. All spellings must resolve
  // to the same page identity.
  var CLEAN_PATHS = {
    '/localseoagency.dc': '/local-seo-agency',
    '/localseoforsmallbusiness.dc': '/local-seo-for-small-business',
    '/googlebusinessprofileoptimization.dc': '/google-business-profile-optimization',
    '/pricing.dc': '/local-seo-pricing',
    '/results.dc': '/results',
    '/audit.dc': '/audit',
    '/about.dc': '/about',
    '/contact.dc': '/contact',
    '/blog.dc': '/blog'
  };

  function normalize(pathname) {
    var p = pathname.toLowerCase().replace(/\.html$/, '').replace(/\/$/, '') || '/';
    return CLEAN_PATHS[p] || p;
  }

  function markCurrentPage() {
    var nav = getNav();
    if (!nav) return;
    var here = normalize(window.location.pathname);
    var links = nav.querySelectorAll('.site-nav__menu a');
    var currentInSub = false;
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      // Same-page anchors (#how, #features) and the CTA resolve to a pathname match
      // on the wrong pages, so they never get the current-page treatment. Language
      // switcher links manage their own aria-current (scripts/lang-switcher.js).
      var isCurrent = !a.hash && !a.classList.contains('site-nav__cta') && !a.closest('.lang-switcher') && normalize(a.pathname) === here;
      if (isCurrent && a.getAttribute('aria-current') !== 'page') a.setAttribute('aria-current', 'page');
      if (!isCurrent && a.hasAttribute('aria-current')) a.removeAttribute('aria-current');
      if (isCurrent && a.closest('.site-nav__sub')) currentInSub = true;
    }
    var sublabel = nav.querySelector('.site-nav__sublabel');
    if (sublabel) sublabel.classList.toggle('site-nav__sublabel--current', currentInSub);
  }

  markCurrentPage();
  // The DC runtime can re-render the header after hydration, dropping the marking —
  // re-apply whenever nodes change. Attribute-only edits don't retrigger a childList observer.
  new MutationObserver(markCurrentPage).observe(document.documentElement, { childList: true, subtree: true });

  function setOpen(nav, open) {
    var toggle = nav.querySelector('.site-nav__toggle');
    nav.setAttribute('data-open', open ? 'true' : 'false');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open && window.innerWidth < 900 ? 'hidden' : '';
  }

  // Delegated listeners so the bindings survive the DC runtime re-rendering the header.
  document.addEventListener('click', function (e) {
    var nav = getNav();
    if (!nav) return;
    if (e.target.closest('.site-nav__toggle')) {
      setOpen(nav, nav.getAttribute('data-open') !== 'true');
      return;
    }
    var menu = nav.querySelector('.site-nav__menu');
    if (menu && menu.contains(e.target) && e.target.closest('a')) setOpen(nav, false);
  });

  document.addEventListener('keydown', function (e) {
    var nav = getNav();
    if (nav && e.key === 'Escape') setOpen(nav, false);
  });

  window.addEventListener('resize', function () {
    var nav = getNav();
    if (nav && window.innerWidth >= 900) setOpen(nav, false);
  });
})();
