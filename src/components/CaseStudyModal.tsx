import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/portfolioData';
import { MODAL_EASE } from '@/lib/motion';
import { useIsMobile } from '@/lib/useIsMobile';
import { Modal, ModalLabel } from './Modal';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  /** The list the modal steps through (the currently filtered case studies). */
  items: CaseStudy[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

/** Slide + fade between case studies; direction 1 = next (from the right), -1 = previous. */
const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 32 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease: MODAL_EASE } },
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

export function CaseStudyModal({ caseStudy, items, onClose, onNavigate }: CaseStudyModalProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isOpen = caseStudy !== null;
  const isMobile = useIsMobile();

  // Remember the last shown case study so the popup still has content while it fades out
  const [lastShown, setLastShown] = useState<CaseStudy | null>(caseStudy);
  if (caseStudy && caseStudy !== lastShown) setLastShown(caseStudy);
  const shown = caseStudy ?? lastShown;

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

  useEffect(() => {
    const el = contentRef.current;
    if (!isOpen || !el) return;
    const observer = new ResizeObserver(() => setContentHeight(el.offsetHeight));
    observer.observe(el);
    return () => {
      observer.disconnect();
      setContentHeight('auto');
    };
  }, [isOpen]);

  const index = shown ? items.findIndex((item) => item.id === shown.id) : -1;
  const total = items.length;
  const canNavigate = total > 1 && index !== -1;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      titleId="case-study-modal-title"
      closeLabel="Close case study"
      bodyRef={bodyRef}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go('prev');
        if (e.key === 'ArrowRight') go('next');
      }}
      label={
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={shown?.categoryLabel}
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {shown?.categoryLabel}
          </motion.span>
        </AnimatePresence>
      }
      footer={
        canNavigate && (
          <>
            <button
              type="button"
              onClick={() => go('prev')}
              className="group inline-flex items-center gap-2 -ml-2 px-2 py-1.5 rounded-md text-base font-medium text-[#1E293B] hover:text-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
              Previous
            </button>
            <span className="text-sm text-[#475569] tabular-nums">
              {index + 1} of {total}
            </span>
            <button
              type="button"
              onClick={() => go('next')}
              className="group inline-flex items-center gap-2 -mr-2 px-2 py-1.5 rounded-md text-base font-medium text-[#1E293B] hover:text-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            >
              Next
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>
          </>
        )
      }
    >
      {/* Animated height (larger screens) so the popup resizes smoothly between case studies */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isMobile ? 'auto' : contentHeight }}
        transition={{ duration: 0.32, ease: MODAL_EASE }}
      >
        <div ref={contentRef}>
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={direction}
            onExitComplete={() => bodyRef.current?.scrollTo({ top: 0 })}
          >
            {shown && (
              <motion.article
                key={shown.id}
                className="px-5 md:px-7 pt-1 pb-6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <CoverImage key={shown.image} src={shown.image} alt={shown.imageAlt} />

                <h2
                  id="case-study-modal-title"
                  className="font-editorial text-[1.625rem] md:text-[1.875rem] font-semibold tracking-tight leading-[1.2] text-[#0F172A] text-balance"
                >
                  {shown.title}
                </h2>
                <p className="mt-3 text-[17px] text-[#334155] leading-[1.65]">{shown.summary}</p>

                {/* Key facts */}
                <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 py-4 border-y border-[#E2E8F0]">
                  {[
                    { label: 'Organization', value: shown.organization },
                    { label: 'Period', value: shown.duration },
                    { label: 'Focus', value: shown.impactHeadline },
                  ].map(({ label, value }) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-sm font-medium text-[#475569]">{label}</dt>
                      <dd className="mt-0.5 text-base font-medium text-[#0F172A] leading-snug">{value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Measurable outcomes (only when provided) */}
                {shown.outcomes.length > 0 && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {shown.outcomes.map((item) => (
                      <div key={item.label}>
                        <div className="text-2xl font-semibold text-[#0F172A] tabular-nums">{item.metric}</div>
                        <div className="mt-1 text-base text-[#334155]">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <section className="mt-5">
                  <ModalLabel>Context</ModalLabel>
                  <p className="mt-2 text-[17px] text-[#1E293B] leading-[1.65]">{shown.challenge}</p>
                </section>

                <section className="mt-5">
                  <ModalLabel>What I Did</ModalLabel>
                  <ol className="mt-1.5 divide-y divide-[#E2E8F0]">
                    {shown.execution.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-3 py-2.5 first:pt-0 text-[17px] text-[#1E293B] leading-[1.6]"
                      >
                        <span className="w-6 shrink-0 text-sm font-semibold leading-[1.85] text-[#1D4ED8] tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {shown.tools.length > 0 && (
                  <section className="mt-5">
                    <ModalLabel>Tools &amp; Focus Areas</ModalLabel>
                    <p className="mt-2 text-base text-[#1E293B] leading-relaxed">{shown.tools.join(' · ')}</p>
                  </section>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Modal>
  );
}
