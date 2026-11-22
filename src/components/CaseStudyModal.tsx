import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { CaseStudy } from '@/data/portfolioData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  /** The list the modal steps through (the currently filtered case studies). */
  items: CaseStudy[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Slide + fade between case studies; direction 1 = next (from the right), -1 = previous. */
const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 32 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: EASE },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -32,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  }),
};

/** Shows the cover photo only when it actually exists — no empty placeholder. */
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className="mb-5 aspect-[21/9] w-full overflow-hidden rounded-lg bg-[#F1F5F9]">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-[#0F172A]">
      {children}
    </h3>
  );
}

export function CaseStudyModal({ caseStudy, items, onClose, onNavigate }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isOpen = caseStudy !== null;

  // Which way the content slides: 1 = next, -1 = previous
  const [direction, setDirection] = useState(1);
  // Height of the current case study, so the popup grows/shrinks smoothly instead of snapping
  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');

  const go = useCallback(
    (dir: 'prev' | 'next') => {
      setDirection(dir === 'next' ? 1 : -1);
      onNavigate(dir);
    },
    [onNavigate],
  );

  // Keyboard shortcuts + lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go('prev');
      if (e.key === 'ArrowRight') go('next');
    };

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, go]);

  // Move focus into the dialog on open, and give it back to the card that opened it on close
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus?.({ preventScroll: true });
  }, [isOpen]);

  // Track the content's height so the popup can animate between case studies
  useEffect(() => {
    const el = contentRef.current;
    if (!isOpen || !el) return;
    const observer = new ResizeObserver(() => setContentHeight(el.offsetHeight));
    observer.observe(el);
    return () => {
      observer.disconnect();
      // Start from the natural height next time the popup opens
      setContentHeight('auto');
    };
  }, [isOpen]);

  const index = caseStudy ? items.findIndex((item) => item.id === caseStudy.id) : -1;
  const total = items.length;
  const canNavigate = total > 1 && index !== -1;

  return (
    <AnimatePresence>
      {caseStudy && (
        <motion.div
          key="case-study-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F172A]/50 sm:p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative w-full sm:max-w-3xl max-h-[92svh] sm:max-h-[94svh] flex flex-col bg-white rounded-t-xl sm:rounded-xl shadow-[0_24px_64px_-16px_rgba(15,23,42,0.35)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-7 pt-3 pb-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={caseStudy.categoryLabel}
                  className="text-sm font-medium text-[#475569]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {caseStudy.categoryLabel}
                </motion.span>
              </AnimatePresence>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="-mr-2 inline-flex items-center justify-center w-10 h-10 rounded-md text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable body */}
            <motion.div
              ref={scrollRef}
              className="min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
              initial={false}
              animate={{ height: contentHeight }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div ref={contentRef}>
                <AnimatePresence
                  mode="wait"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => scrollRef.current?.scrollTo({ top: 0 })}
                >
              <motion.article
                key={caseStudy.id}
                className="px-5 md:px-7 pt-1 pb-6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <CoverImage key={caseStudy.image} src={caseStudy.image} alt={caseStudy.imageAlt} />

                <h2
                  id="case-study-modal-title"
                  className="font-editorial text-[1.625rem] md:text-[1.875rem] font-semibold tracking-tight leading-[1.2] text-[#0F172A] text-balance"
                >
                  {caseStudy.title}
                </h2>
                <p className="mt-3 text-[17px] text-[#334155] leading-[1.65]">
                  {caseStudy.summary}
                </p>

                {/* Key facts */}
                <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 py-4 border-y border-[#E2E8F0]">
                  {[
                    { label: 'Organization', value: caseStudy.organization },
                    { label: 'Period', value: caseStudy.duration },
                    { label: 'Focus', value: caseStudy.impactHeadline },
                  ].map(({ label, value }) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-sm font-medium text-[#475569]">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-base font-medium text-[#0F172A] leading-snug">{value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Measurable outcomes (only when provided) */}
                {caseStudy.outcomes.length > 0 && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {caseStudy.outcomes.map((item) => (
                      <div key={item.label}>
                        <div className="font-mono text-2xl font-semibold text-[#0F172A] tabular-nums">
                          {item.metric}
                        </div>
                        <div className="mt-1 text-base text-[#334155]">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <section className="mt-5">
                  <Label>Context</Label>
                  <p className="mt-2 text-[17px] text-[#1E293B] leading-[1.65]">
                    {caseStudy.challenge}
                  </p>
                </section>

                <section className="mt-5">
                  <Label>What I Did</Label>
                  <ol className="mt-1.5 divide-y divide-[#E2E8F0]">
                    {caseStudy.execution.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-3 py-2.5 first:pt-0 text-[17px] text-[#1E293B] leading-[1.6]"
                      >
                        <span className="w-6 shrink-0 pt-[3px] font-mono text-sm font-medium text-[#1D4ED8] tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {caseStudy.tools.length > 0 && (
                  <section className="mt-5">
                    <Label>Tools &amp; Focus Areas</Label>
                    <p className="mt-2 text-base text-[#1E293B] leading-relaxed">
                      {caseStudy.tools.join(' · ')}
                    </p>
                  </section>
                )}
              </motion.article>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Footer navigation */}
            {canNavigate && (
              <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-2.5 border-t border-[#E2E8F0] bg-white">
                <button
                  type="button"
                  onClick={() => go('prev')}
                  className="group inline-flex items-center gap-2 -ml-2 px-2 py-1.5 rounded-md text-base font-medium text-[#1E293B] hover:text-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
                  Previous
                </button>
                <span className="font-mono text-sm text-[#475569] tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => go('next')}
                  className="group inline-flex items-center gap-2 -mr-2 px-2 py-1.5 rounded-md text-base font-medium text-[#1E293B] hover:text-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                >
                  Next
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
