(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.side-nav-item');

  if (sections.length && navItems.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('id');
          navItems.forEach(function (item) {
            item.classList.toggle('active', item.getAttribute('data-section') === id);
          });
        });
      },
      { root: null, rootMargin: '-18% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  if (prefersReduced) {
    document.querySelectorAll('.reveal-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var revealEls = document.querySelectorAll('.reveal-stagger');
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
})();
