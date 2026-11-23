import type { SectionCopy } from '../types';

// The small label and heading at the top of each section on the page.
export const SECTIONS = {
  whatIDo: {
    id: 'what-i-do',
    eyebrow: 'What I Do',
    title: 'Organized, reliable support for busy offices and teams.',
    intro: 'From day-to-day coordination to financial documents and compliance, I keep the details accurate and on schedule.',
  },
  work: {
    id: 'work',
    eyebrow: 'Selected Work',
    title: 'Highlights from my recent roles.',
  },
  experience: {
    id: 'experience',
    eyebrow: 'Career History',
    title: 'Experience across private, academic, and government offices.',
  },
  testimonials: {
    id: 'endorsements',
    eyebrow: 'Endorsements',
    title: 'What colleagues say about working with me.',
  },
  contact: { id: 'contact', eyebrow: 'Contact & Inquiries' },
} satisfies Record<string, SectionCopy>;
