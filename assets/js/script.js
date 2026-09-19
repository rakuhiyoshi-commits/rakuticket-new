(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initFaqAccordion();
    initFaqTabs();
    initSmoothScroll();
    initContactForm();
  });

  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var q = item.querySelector('.faq-question');
      if (!q) return;
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  function initFaqTabs() {
    var tabs = document.querySelectorAll('.faq-tab');
    if (!tabs.length) return;
    var items = document.querySelectorAll('.faq-item');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.category;
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        items.forEach(function (item) {
          if (target === 'all' || item.dataset.category === target) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
            item.classList.remove('open');
          }
        });
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector('form.contact-form');
    if (!form) return;

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (e) {
      var rows = form.querySelectorAll('.form-row');
      var firstInvalid = null;

      rows.forEach(function (row) {
        row.classList.remove('invalid');
      });

      var inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      inputs.forEach(function (input) {
        var row = input.closest('.form-row');
        if (!row) return;
        var value = (input.value || '').trim();
        var invalid = false;
        if (!value) invalid = true;
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) invalid = true;
        else if (input.type === 'tel' && !/^[\d\-+()\s]{6,}$/.test(value)) invalid = true;

        if (invalid) {
          row.classList.add('invalid');
          if (!firstInvalid) firstInvalid = row;
        }
      });

      var agree = form.querySelector('input[name="agree"]');
      if (agree && !agree.checked) {
        var agreeRow = agree.closest('.form-agree');
        if (agreeRow) agreeRow.style.border = '1px solid var(--color-danger)';
        if (!firstInvalid) firstInvalid = agreeRow;
      } else if (agree) {
        var ar = agree.closest('.form-agree');
        if (ar) ar.style.border = '';
      }

      if (firstInvalid) {
        e.preventDefault();
        var top = firstInvalid.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }
})();
