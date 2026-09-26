/* VendingNI: count "Get in Touch Now!" and other mailto clicks. Cookieless (Ahrefs Web Analytics). */
(function () {
  'use strict';
  var SELECTOR = 'a[href^="mailto:info@vendingni.com"]';
  function position(a) {
    var explicit = a.getAttribute('data-cta-position');
    if (explicit) return explicit;
    if (a.closest('.top-contact-bar')) return 'topbar';
    if (a.classList.contains('nav-cta') || a.closest('nav, .site-navigation')) return 'nav';
    if (a.closest('footer')) return 'footer';
    if (a.classList.contains('tool-enquiry')) return 'tool';
    if (a.closest('.hero, .hero-container')) return 'hero';
    return 'body';
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest(SELECTOR) : null;
    if (!a) return;
    var all = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    var props = {
      page: window.location.pathname,
      position: position(a),
      cta_index: String(all.indexOf(a) + 1),
      cta_text: ((a.textContent || '').replace(/\s+/g, ' ').trim() || 'email').slice(0, 40)
    };
    try {
      if (window.AhrefsAnalytics && typeof window.AhrefsAnalytics.sendEvent === 'function') {
        window.AhrefsAnalytics.sendEvent('enquiry_click', { props: props });
      }
    } catch (err) { /* never block the mailto */ }
  }, true);
})();
