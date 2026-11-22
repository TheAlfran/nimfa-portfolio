// Smooth in-page navigation without "#" in the address bar.
// Links like <a href="#work"> scroll to the section with id="work", and <a href="/">
// scrolls back to the top, while the URL stays as just "/".

function scrollToTarget(id: string, behavior: ScrollBehavior = 'smooth') {
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior });
}

function cleanUrl() {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

export function setupCleanScroll() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const link = (e.target as Element | null)?.closest?.('a[href]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.getAttribute('href') ?? '';
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(href.slice(1));
      cleanUrl();
    } else if (href === '/' && window.location.pathname === '/') {
      e.preventDefault();
      scrollToTarget('top');
      cleanUrl();
    }
  });

  // If someone opens an old link with a hash (e.g. /#work), jump there, then tidy the URL.
  const initial = window.location.hash.slice(1);
  if (initial) {
    window.addEventListener(
      'load',
      () => {
        // Wait for React and fonts to settle so the section is at its final position.
        void document.fonts.ready.then(() =>
          requestAnimationFrame(() => {
            scrollToTarget(initial, 'instant');
            cleanUrl();
          }),
        );
      },
      { once: true },
    );
  }
}
