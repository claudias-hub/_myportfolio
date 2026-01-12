(function () {
  const header = document.querySelector('.page-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav || !header) return;

  function openMenu() {
    header.classList.add('is-open');
    nav.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close main menu');
  }

  function closeMenu() {
    header.classList.remove('is-open');
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open main menu');
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true'
      ? closeMenu()
      : openMenu();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') closeMenu();
  });
})();
