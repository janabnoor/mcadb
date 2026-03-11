/* ================================================================
   Nehru College of Management – Faculty Page
   JavaScript: Scroll reveal + tilt effect on circles
   ================================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── Intersection Observer: re-trigger animations on scroll ── */
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.faculty-item, .vm-card').forEach(function (el) {
      el.style.animationPlayState = 'paused';
      io.observe(el);
    });

    /* ── Mouse-tilt on circle-outer (desktop only) ── */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && window.innerWidth > 600) {
      document.querySelectorAll('.circle-outer').forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          const r  = el.getBoundingClientRect();
          const cx = r.left + r.width  / 2;
          const cy = r.top  + r.height / 2;
          const rx = ((e.clientY - cy) / (r.height / 2) * -7).toFixed(1);
          const ry = ((e.clientX - cx) / (r.width  / 2) *  7).toFixed(1);
          el.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        el.addEventListener('mouseleave', function () {
          el.style.transform = '';
        });
      });
    }

  });

})();
