import { useSyncExternalStore } from 'react';

// Phones = below Tailwind's `sm` breakpoint (640px).
const MOBILE_QUERY = '(max-width: 639px)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

/** True on phone-sized screens; updates when the window is resized or rotated. */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}
