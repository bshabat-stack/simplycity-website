(function () {
  // The DC runtime re-injects helmet assets, so this file can execute twice — bind once.
  if (window.__scBackToTopBound) return;
  window.__scBackToTopBound = true;

  function update() {
    var btn = document.querySelector('.back-to-top');
    if (btn) btn.classList.toggle('is-visible', window.scrollY > 480);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  // Delegated so the binding survives the DC runtime re-rendering the page.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.back-to-top')) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  update();
})();
