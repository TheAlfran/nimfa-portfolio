import type { Profile, ResumePdf } from '../types';

export const PROFILE = {
  name: 'Nimfa Mae Sumalinog',
  shortTitle: 'Administrative & Operations Professional',
  title: 'Operations Officer · Administrative Assistant',
  location: 'Cagayan de Oro City, Philippines',
  email: 'sumalinognimfa@gmail.com',
  linkedin: '',
  heroHeadline: 'Keeping offices organized, documents in order, and teams moving forward.',
  heroIntro: 'Administrative assistant who prioritizes organization, enjoys solving problems, and pays close attention to detail — with experience managing schedules, financial documents, and client interactions across private, academic, and government offices.',
  about: "Administrative assistant that prioritizes organization, has a keen interest in addressing problems, and pays close attention to detail. Competent in administrative and office administration, with a track record in managing schedules and customer interactions. Outstanding interpersonal skills and a cooperative mindset. Eager to contribute to the accomplishment of the company's objectives and join a varied team.",
  contactHeadline: 'Open to administrative and operations roles.',
  contactIntro: "Looking for a detail-oriented administrative assistant or operations officer who works well with a team? I'd be glad to hear from you.",
  contactAvailability: 'Cagayan de Oro City · On-site & Hybrid',
  workArrangements: ['On-site', 'Hybrid'],
  contactTopics: ['Job Opportunity', 'Freelance / Part-Time Work', 'General Inquiry'],
  replyTime: 'I usually reply within a few days',
} satisfies Profile;

// Your photo (in public/images/). Until it exists, a neat placeholder is shown instead.
export const HERO_IMAGE = '/images/profile.jpg';

// Your resume PDF (in public/). Replace the file to update it; keep the same name or change it here.
export const RESUME_PDF = {
  url: '/Nimfa-Mae-Sumalinog-Resume.pdf',
  downloadName: 'Nimfa-Mae-Sumalinog-Resume.pdf',
  details: 'PDF · 1 page',
} satisfies ResumePdf;
