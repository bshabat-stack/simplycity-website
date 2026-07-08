(function () {
  // The DC runtime re-injects helmet assets, so this file can execute twice — bind once.
  if (window.__scNavToggleBound) return;
  window.__scNavToggleBound = true;

  function getNav() { return document.querySelector('.site-nav'); }

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
