import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { X } from 'lucide-react';
import { MODAL_EASE } from '@/lib/motion';

/**
 * Shared popup used by every modal on the site, so they all look and behave the same:
 * - Phones: full screen, with the close button pinned at the top and the footer pinned at the bottom.
 * - Larger screens: a centered card on a dimmed background.
 * - Esc / close button / clicking the backdrop closes it; focus moves in and back out; page scroll is locked.
 * - Prints cleanly (only the popup's content is printed).
 */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the heading inside the popup, for screen readers */
  titleId: string;
  /** Small text at the top left (e.g. a category or "Resume") */
  label: ReactNode;
  /** Extra buttons shown at the top right, before the close button */
  actions?: ReactNode;
  /** Pinned footer (e.g. Previous / Next) */
  footer?: ReactNode;
  /** Accessible name for the close button */
  closeLabel?: string;
  /** Extra keyboard shortcuts while open (Esc is handled already) */
  onKeyDown?: (e: KeyboardEvent) => void;
  /** Gives the parent access to the scrolling area (e.g. to scroll back to top) */
  bodyRef?: RefObject<HTMLDivElement | null>;
  /** Keep the card the same height on larger screens (content scrolls) so it never resizes */
  fixedHeight?: boolean;
  /** Narrower card on larger screens (for portrait content like the resume) */
  narrow?: boolean;
  children: ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <AnimatePresence>{props.open && <ModalFrame key="modal" {...props} />}</AnimatePresence>
  );
}

function ModalFrame({
  onClose,
  titleId,
  label,
  actions,
  footer,
  closeLabel = 'Close',
  onKeyDown,
  bodyRef,
  fixedHeight,
  narrow,
  children,
}: ModalProps) {
  // While the closing animation plays, stop the invisible layer from blocking taps/clicks.
  const isPresent = useIsPresent();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keep the latest handlers without re-running effects on every render
  const handlersRef = useRef({ onClose, onKeyDown });
  useEffect(() => {
    handlersRef.current = { onClose, onKeyDown };
  });

  // Keyboard shortcuts + lock page scroll while open
  useEffect(() => {
    if (!isPresent) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlersRef.current.onClose();
      else handlersRef.current.onKeyDown?.(e);
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isPresent]);

  // Move focus into the popup on open, and give it back to whatever opened it on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus?.({ preventScroll: true });
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-modal-overlay=""
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center bg-[#0F172A]/50 sm:p-4"
      style={{ pointerEvents: isPresent ? 'auto' : 'none' }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        data-modal-panel=""
        className={`relative w-full h-dvh ${fixedHeight ? 'sm:h-[88svh]' : 'sm:h-auto'} ${narrow ? 'sm:max-w-xl' : 'sm:max-w-3xl'} sm:max-h-[94svh] flex flex-col bg-white sm:rounded-xl sm:shadow-[0_24px_64px_-16px_rgba(15,23,42,0.35)] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.28, ease: MODAL_EASE }}
      >
        {/* Top bar — pinned on phones */}
        <div className="no-print flex shrink-0 items-center justify-between gap-4 px-5 md:px-7 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 sm:pt-3 sm:pb-0 max-sm:border-b max-sm:border-[#E2E8F0] max-sm:mb-4">
          <div className="min-w-0 truncate text-sm font-medium text-[#475569]">{label}</div>
          <div className="flex shrink-0 items-center gap-2 -mr-2">
            {actions}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={bodyRef}
          data-modal-body=""
          className={`min-h-0 flex-1 ${fixedHeight ? 'scrollbar-gutter-stable' : 'sm:flex-initial'} overflow-y-auto overflow-x-hidden overscroll-contain`}
        >
          {children}
        </div>

        {/* Footer — pinned at the bottom */}
        {footer && (
          <div className="no-print flex shrink-0 items-center justify-between gap-4 px-5 md:px-7 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] border-t border-[#E2E8F0] bg-white">
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Small section heading used inside modals ("Context", "Experience", ...) */
export function ModalLabel({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-[#0F172A]">{children}</h3>;
}
