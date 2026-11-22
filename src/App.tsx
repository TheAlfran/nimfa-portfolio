import { type FormEvent, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import {
  CAREER_TIMELINE,
  CASE_STUDIES,
  CORE_COMPETENCIES,
  type CaseStudy,
  HERO_IMAGE,
  IMPACT_METRICS,
  PROFILE,
  type ProjectCategory,
  RESUME_PROFILE,
  TESTIMONIALS,
} from '@/data/portfolioData';
import { Header } from '@/components/Header';
import { ResilientImage } from '@/components/ResilientImage';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { ResumeModal } from '@/components/ResumeModal';
import { sendContactMessage } from '@/lib/contact';

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'administration', label: 'Administration' },
  { id: 'finance', label: 'Finance & Compliance' },
  { id: 'technology', label: 'Technology' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'Job Opportunity',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSending, setFormSending] = useState(false);

  const contactRef = useRef<HTMLElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleNavigateCaseStudy = (direction: 'prev' | 'next') => {
    if (!selectedCaseStudy) return;
    const list = filteredProjects.length > 0 ? filteredProjects : CASE_STUDIES;
    const currentIndex = list.findIndex((item) => item.id === selectedCaseStudy.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % list.length
        : (currentIndex - 1 + list.length) % list.length;
    setSelectedCaseStudy(list[nextIndex]);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formSending) return;
    setFormError(null);

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please complete your name, email address, and message before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid work or personal email address.');
      return;
    }

    const botcheck = new FormData(e.currentTarget).get('botcheck');

    setFormSending(true);
    try {
      await sendContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        company: formState.company.trim(),
        topic: formState.topic,
        message: trimmedMessage,
        botcheck: typeof botcheck === 'string' ? botcheck : '',
      });
      setFormSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setFormSending(false);
    }
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      company: '',
      topic: 'Job Opportunity',
      message: '',
    });
    setFormError(null);
    setFormSubmitted(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
        <Header onContactClick={scrollToContact} />

        <main className="no-print">
          {/* Hero Split Section */}
          <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-12 lg:py-8 lg:min-h-[calc(100svh-4rem)] lg:flex lg:flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch lg:items-center lg:flex-1">
              {/* Left Column: Typographic Hierarchy */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:[@media(max-height:800px)]:space-y-4"
              >
                <p className="text-sm font-medium text-[#475569]">
                  {PROFILE.shortTitle} <span aria-hidden="true">·</span> {PROFILE.location}
                </p>

                <h1 className="font-editorial text-[clamp(2.25rem,4vw,3.5rem)] lg:[@media(max-height:800px)]:text-[2.6rem] font-semibold tracking-tight leading-[1.1] text-[#0F172A] text-balance max-w-2xl">
                  {PROFILE.heroHeadline}
                </h1>

                <p className="text-base md:text-lg lg:[@media(max-height:800px)]:text-base text-[#475569] leading-relaxed max-w-[60ch]">
                  {PROFILE.heroIntro}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    See My Work
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#0F172A] bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <FileText className="w-4 h-4 text-[#475569]" />
                    View Resume
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Editorial Portrait */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="h-full min-h-[340px] lg:min-h-0 lg:h-[clamp(300px,calc(100svh-22rem),540px)] rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white">
                  <ResilientImage
                    src={HERO_IMAGE}
                    alt={`Portrait of ${PROFILE.name}`}
                    fallbackLabel={`Add your photo at public/images/profile.jpg`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column KPI Strip Below Hero Split */}
            <div className="mt-14 lg:mt-8 lg:[@media(max-height:800px)]:mt-6 pt-10 pb-8 lg:pt-8 lg:pb-6 lg:[@media(max-height:800px)]:pt-5 lg:[@media(max-height:800px)]:pb-4 border-y border-[#E2E8F0] grid grid-cols-2 lg:grid-cols-4 gap-8">
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="font-mono text-3xl md:text-4xl font-medium tracking-tight text-[#0F172A] tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-[#1E293B]">
                    {metric.label}
                  </div>
                  <div className="text-xs text-[#64748B]">{metric.detail}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 1: What I Do */}
          <section id="what-i-do" className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 scroll-mt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-medium text-[#1D4ED8]">
                  What I Do
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                  Organized, reliable support for busy offices and teams.
                </h2>
              </div>
              <p className="text-sm text-[#475569] max-w-[42ch] leading-relaxed">
                From day-to-day coordination to financial documents and compliance, I keep the details
                accurate and on schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {CORE_COMPETENCIES.map((item) => (
                <article
                  key={item.number}
                  className="pt-6 border-t border-[#CBD5E1] flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <span className="font-mono text-sm font-medium text-[#1D4ED8] tabular-nums block">
                      {item.number}
                    </span>
                    <h3 className="text-lg font-semibold text-[#0F172A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-[#64748B] pt-2">
                    {item.deliverables}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Section 2: Selected Office Case Studies */}
          <section
            id="work"
            className="bg-white border-y border-[#E2E8F0] py-16 md:py-20 scroll-mt-16"
          >
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs font-medium text-[#1D4ED8]">
                    Selected Work
                  </p>
                  <h2 className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                    Highlights from my recent roles.
                  </h2>
                </div>

                {/* Interactive Segmented Filter Control */}
                <div
                  role="tablist"
                  aria-label="Filter case studies by discipline"
                  className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0] self-start lg:self-auto"
                >
                  {FILTER_OPTIONS.map((option) => {
                    const isActive = activeCategory === option.id;
                    return (
                      <button
                        key={option.id}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(option.id)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                          isActive
                            ? 'bg-white text-[#0F172A] shadow-xs'
                            : 'text-[#475569] hover:text-[#0F172A]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bento-Balanced 2-Column Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden flex flex-col transition-colors duration-150 hover:border-[#CBD5E1]"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCaseStudy(project)}
                      className="text-left flex flex-col h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#E2E8F0]">
                        <ResilientImage
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackLabel={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 bg-white">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs text-[#64748B]">
                            <span className="font-medium text-[#334155]">
                              {project.categoryLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{project.year}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.organization}</span>
                          </div>

                          <h3 className="font-editorial text-xl md:text-2xl font-semibold tracking-tight text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors duration-150">
                            {project.title}
                          </h3>

                          <p className="text-sm text-[#475569] leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold text-[#0F172A]">
                            {project.impactHeadline}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] whitespace-nowrap shrink-0">
                            Read Brief
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Career Progression */}
          <section id="experience" className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 scroll-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#1D4ED8]">
                  Career History
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                  Experience across private, academic, and government offices.
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0F172A] bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#475569]" />
                View Resume (PDF)
              </button>
            </div>

            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {CAREER_TIMELINE.map((role) => (
                <div
                  key={role.period}
                  className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                >
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="font-mono text-xs font-medium text-[#1D4ED8] tabular-nums">
                      {role.period}
                    </div>
                    <div className="text-base font-semibold text-[#0F172A]">
                      {role.company}
                    </div>
                    {role.location && <div className="text-xs text-[#64748B]">{role.location}</div>}
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {role.role}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed max-w-[68ch]">
                      {role.summary}
                    </p>
                    <ul className="space-y-2 pt-1">
                      {role.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed"
                        >
                          <span className="font-mono text-xs text-[#64748B] tabular-nums pt-0.5 shrink-0">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Endorsements (hidden while TESTIMONIALS is empty) */}
          {TESTIMONIALS.length > 0 && (
          <section
            id="endorsements"
            className="bg-white border-y border-[#E2E8F0] py-16 md:py-20 scroll-mt-16"
          >
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="space-y-3 mb-12 max-w-2xl">
                <p className="text-xs font-medium text-[#1D4ED8]">
                  Endorsements
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                  What colleagues say about working with me.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TESTIMONIALS.map((item) => (
                  <figure
                    key={item.author}
                    className="p-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="text-xs font-medium text-[#64748B]">
                        {item.context}
                      </div>
                      <blockquote className="text-base text-[#1E293B] leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    <figcaption className="pt-5 border-t border-[#E2E8F0]">
                      <div className="text-sm font-semibold text-[#0F172A]">
                        {item.author}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {item.role} <span aria-hidden="true">·</span> {item.organization}
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
          )}

          {/* Section 5: Direct Contact & Consultation */}
          <section
            ref={contactRef}
            id="contact"
            className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 scroll-mt-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#1D4ED8]">
                    Contact &amp; Inquiries
                  </p>
                  <h2 className="font-editorial text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] text-balance">
                    {PROFILE.contactHeadline}
                  </h2>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed max-w-[46ch]">
                  {PROFILE.contactIntro}
                </p>

                <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-[#475569] shrink-0" />
                      <span className="text-sm font-medium text-[#0F172A] truncate">
                        {RESUME_PROFILE.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#334155] bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#15803D]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <MapPin className="w-4 h-4 text-[#475569] shrink-0" />
                    <span>{PROFILE.contactAvailability}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Validated Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-6 md:p-8 rounded-2xl border border-[#E2E8F0] bg-white">
                  {formSubmitted ? (
                    <div className="py-8 space-y-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#15803D]">
                        <Check className="w-5 h-5" />
                      </div>
                      <h3 className="font-editorial text-2xl font-semibold text-[#0F172A]">
                        Message sent
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed max-w-[52ch]">
                        Thank you, {formState.name}. Your message about{' '}
                        <span className="font-medium text-[#0F172A]">{formState.topic}</span>{' '}
                        is in my inbox. I'll reply to {formState.email} as soon as I can.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center px-4 py-2 text-xs font-medium text-[#334155] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                      {/* Spam trap: hidden from people, but bots fill it in and Web3Forms drops those */}
                      <input
                        type="checkbox"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-[#334155]"
                          >
                            Full Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder="Jordan Blake"
                            className="w-full px-3.5 py-2.5 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-[#334155]"
                          >
                            Email
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState((prev) => ({ ...prev, email: e.target.value }))
                            }
                            placeholder="jordan@company.com"
                            className="w-full px-3.5 py-2.5 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-company"
                            className="block text-xs font-semibold text-[#334155]"
                          >
                            Company{' '}
                            <span className="font-normal text-[#64748B]">(optional)</span>
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            autoComplete="organization"
                            maxLength={120}
                            value={formState.company}
                            onChange={(e) =>
                              setFormState((prev) => ({ ...prev, company: e.target.value }))
                            }
                            placeholder="Company or organization"
                            className="w-full px-3.5 py-2.5 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-topic"
                            className="block text-xs font-semibold text-[#334155]"
                          >
                            Reason for Reaching Out
                          </label>
                          <div className="relative">
                            <select
                              id="contact-topic"
                              value={formState.topic}
                              onChange={(e) =>
                                setFormState((prev) => ({ ...prev, topic: e.target.value }))
                              }
                              className="w-full appearance-none pl-3.5 pr-10 py-2.5 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg cursor-pointer focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15"
                            >
                              <option value="Job Opportunity">Job Opportunity</option>
                              <option value="Freelance / Part-Time Work">Freelance / Part-Time Work</option>
                              <option value="General Inquiry">General Inquiry</option>
                            </select>
                            <ChevronDown
                              aria-hidden="true"
                              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-[#334155]"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder="Tell me a little about the role or how I can help."
                          className="w-full px-3.5 py-2.5 text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 resize-y"
                        />
                      </div>

                      {formError && (
                        <p
                          role="alert"
                          className="text-xs font-medium text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3.5 py-2.5"
                        >
                          {formError}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-4 pt-1">
                        <span className="text-xs text-[#64748B]">
                          I usually reply within a few days
                        </span>
                        <button
                          type="submit"
                          disabled={formSending}
                          aria-busy={formSending}
                          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                        >
                          {formSending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Inquiry
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="border-t border-[#E2E8F0] bg-white py-8 no-print">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>
              &copy; {CURRENT_YEAR} {RESUME_PROFILE.name} <span aria-hidden="true">·</span>{' '}
              {PROFILE.shortTitle}
            </div>
            <div className="flex items-center gap-6">
              <a href="#what-i-do" className="hover:text-[#0F172A] transition-colors whitespace-nowrap">
                What I Do
              </a>
              <a href="#work" className="hover:text-[#0F172A] transition-colors whitespace-nowrap">
                Work
              </a>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="hover:text-[#0F172A] transition-colors whitespace-nowrap cursor-pointer"
              >
                Resume
              </button>
              <a href="/" className="hover:text-[#0F172A] transition-colors whitespace-nowrap">
                Back to top
              </a>
            </div>
          </div>
        </footer>

        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          items={filteredProjects.length > 0 ? filteredProjects : CASE_STUDIES}
          onClose={() => setSelectedCaseStudy(null)}
          onNavigate={handleNavigateCaseStudy}
        />

        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </MotionConfig>
  );
}
