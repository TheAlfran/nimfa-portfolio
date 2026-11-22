import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import { CAREER_TIMELINE, CORE_COMPETENCIES, RESUME_PROFILE } from '@/data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/75 backdrop-blur-xs p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-4 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0] no-print">
          <span className="text-xs font-medium text-[#64748B]">
            Resume
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume view"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Surface */}
        <div className="p-6 md:p-10 space-y-8">
          <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
            <h2
              id="resume-modal-title"
              className="font-editorial text-3xl font-semibold tracking-tight text-[#0F172A]"
            >
              {RESUME_PROFILE.name}
            </h2>
            <p className="text-base font-medium text-[#1D4ED8]">
              {RESUME_PROFILE.title}
            </p>
            <p className="text-xs text-[#64748B]">
              {RESUME_PROFILE.location} <span aria-hidden="true">·</span> {RESUME_PROFILE.email}
              {RESUME_PROFILE.linkedin && (
                <>
                  {' '}<span aria-hidden="true">·</span> {RESUME_PROFILE.linkedin}
                </>
              )}
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wide text-[#64748B]">
              Core Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CORE_COMPETENCIES.map((item) => (
                <div key={item.number} className="space-y-1.5">
                  <div className="text-sm font-semibold text-[#0F172A]">
                    {item.title}
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {item.deliverables}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5 pt-4 border-t border-[#E2E8F0]">
            <h3 className="text-xs font-semibold tracking-wide text-[#64748B]">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {CAREER_TIMELINE.map((role) => (
                <div key={role.period} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-semibold text-[#0F172A]">
                      {role.role} <span className="font-normal text-[#64748B]">— {role.company}</span>
                    </div>
                    <div className="font-mono text-xs text-[#64748B] tabular-nums shrink-0">
                      {role.period}
                    </div>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {role.summary}
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#334155]">
                    {role.highlights.map((hl, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E2E8F0]">
            <section className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wide text-[#64748B]">
                Education &amp; Credentials
              </h3>
              <div className="space-y-3">
                {RESUME_PROFILE.education.map((edu) => (
                  <div key={edu.degree} className="space-y-0.5">
                    <div className="text-sm font-medium text-[#0F172A]">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {edu.institution} <span aria-hidden="true">·</span>{' '}
                      <span className="tabular-nums">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wide text-[#64748B]">
                Skills
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                {RESUME_PROFILE.coreTools.join(' · ')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
