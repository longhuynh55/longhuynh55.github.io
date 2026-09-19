// Scroll-reveal — vanilla JS, no libraries (DESIGN.md "Motion rules").
// Elements with `.reveal` fade + translateY(12px) into view via
// IntersectionObserver. Groups marked with `[data-stagger]` stagger their
// `.reveal` children by <= 60ms each. Disabled entirely when the user
// prefers reduced motion (CSS also forces the visible state).

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  // Apply per-item stagger delay inside each [data-stagger] group.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    group.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
          // Don't leak the stagger delay into future transitions.
          window.setTimeout(() => {
            (entry.target as HTMLElement).style.transitionDelay = '0ms';
          }, 600);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}
