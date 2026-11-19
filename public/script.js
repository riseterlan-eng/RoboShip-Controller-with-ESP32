const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const header = document.querySelector('.site-header');
const heroVisual = document.querySelector('.hero-visual');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll(
    '.intro-grid, .spec-strip, .feature-card, .workflow-heading, .workflow-step, .protocol-note, .launch-card, .quickstart',
  ).forEach((element) => {
    element.classList.add('scroll-reveal');
    revealObserver.observe(element);
  });
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const activeLink = navigation.querySelector(`a[href="#${entry.target.id}"]`);
      navigation.querySelectorAll('a[aria-current="location"]').forEach((link) => {
        link.removeAttribute('aria-current');
      });
      activeLink?.setAttribute('aria-current', 'location');
    }
  }, { rootMargin: '-34% 0px -56% 0px' });

  document.querySelectorAll('.hero[id], main section[id]').forEach((section) => {
    sectionObserver.observe(section);
  });
}

const updateScrollState = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState, { passive: true });
updateScrollState();

if (heroVisual && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.setProperty('--boat-x', `${x * -7}px`);
    heroVisual.style.setProperty('--boat-y', `${y * -6}px`);
    heroVisual.style.setProperty('--radar-x', `${x * 4}px`);
    heroVisual.style.setProperty('--radar-y', `${y * 4}px`);
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.removeProperty('--boat-x');
    heroVisual.style.removeProperty('--boat-y');
    heroVisual.style.removeProperty('--radar-x');
    heroVisual.style.removeProperty('--radar-y');
  });
}

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Buka menu navigasi' : 'Tutup menu navigasi');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu navigasi');
    navigation.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu navigasi');
    navigation.classList.remove('is-open');
    menuButton.focus();
  }
});
