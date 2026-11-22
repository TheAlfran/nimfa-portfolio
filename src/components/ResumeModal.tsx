import { useState } from 'react';
import { Download } from 'lucide-react';
import { RESUME_PDF, RESUME_PROFILE } from '@/data/portfolioData';
import { RESUME_PAGES } from '@/data/resumePages';
import { ImageViewer } from './ImageViewer';
import { Modal } from './Modal';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

// The resume is shown as images of the PDF pages (made by `bun run resume:images`), so it looks
// the same everywhere — no browser PDF viewer, toolbar, or frame — and works on phones too.
// Clicking the resume opens a full-screen, zoomable view of the image; Download gives the real PDF.

const downloadButton =
  'inline-flex shrink-0 items-center justify-center gap-2 h-11 px-5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] max-sm:w-full max-sm:h-12 max-sm:text-base';

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const total = RESUME_PAGES.length;
  const [viewing, setViewing] = useState<number | null>(null);
  const pageAlt = (i: number) =>
    `Resume of ${RESUME_PROFILE.name}${total > 1 ? `, page ${i + 1} of ${total}` : ''}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId="resume-modal-title"
      closeLabel="Close resume"
      label="Resume"
    >
      <div className="px-5 md:px-7 pt-1 pb-6">
        {/* Name + Download: side by side on larger screens, stacked on phones */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="resume-modal-title"
              className="font-editorial text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tight leading-[1.2] text-[#0F172A]"
            >
              {RESUME_PROFILE.name}
            </h2>
            <p className="mt-1 text-base text-[#475569]">{RESUME_PROFILE.title}</p>
          </div>
          <a href={RESUME_PDF.url} download={RESUME_PDF.downloadName} className={downloadButton}>
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        <div className="mt-4 space-y-4">
          {RESUME_PAGES.map((page, i) => (
            <button
              key={page.src}
              type="button"
              onClick={() => setViewing(i)}
              className="block w-full overflow-hidden rounded-md border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              aria-label={`View the resume full screen${total > 1 ? ` (page ${i + 1} of ${total})` : ''}`}
            >
              <img
                src={page.src}
                width={page.width}
                height={page.height}
                alt={pageAlt(i)}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="block w-full h-auto"
              />
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-[#475569]">
          <span className="sm:hidden">Tap</span>
          <span className="max-sm:hidden">Click</span> the resume to view it full screen and zoom in.
        </p>
      </div>

      <ImageViewer
        image={
          viewing !== null && RESUME_PAGES[viewing]
            ? { ...RESUME_PAGES[viewing], alt: pageAlt(viewing) }
            : null
        }
        onClose={() => setViewing(null)}
      />
    </Modal>
  );
}
