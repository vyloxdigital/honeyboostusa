/* HoneyBoost — main.js
   Hamburger nav, FAQ accordion, scroll effects
   ============================================ */

(function () {
  'use strict';

  /* Hamburger / mobile nav
  -------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* FAQ accordion
  -------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
    btn.setAttribute('aria-expanded', 'false');
  });

  /* Smooth scroll for anchor links
  -------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* Sticky header shadow on scroll
  -------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(0,0,0,0.35)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Intersection Observer — fade-in on scroll
  -------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = '.fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.55s ease,transform 0.55s ease}.fade-up.visible{opacity:1;transform:none}';
    document.head.appendChild(style);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(
      '.step-card,.ingredient-card,.review-card,.price-card,.faq-item,.badge-pill,.authority-badge'
    ).forEach(el => {
      el.classList.add('fade-up');
      io.observe(el);
    });
  }

})();
