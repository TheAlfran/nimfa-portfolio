// Shapes of the portfolio content in src/data/content/. The content files are checked against
// these with `satisfies`, so a typo or missing field shows up as an error in the editor.

export type ProjectCategory = 'all' | 'administration' | 'finance' | 'technology';
export type OrganizationType = 'private' | 'academic' | 'government';
export type EmploymentType = 'full-time' | 'part-time' | 'job order' | 'internship';

/** "YYYY-MM" or "YYYY" — used for sorting and filtering */
export type YearMonth = `${number}-${number}` | `${number}`;

export interface Profile {
  name: string;
  shortTitle: string;
  title: string;
  location: string;
  email: string;
  /** Leave empty to hide */
  linkedin: string;
  heroHeadline: string;
  heroIntro: string;
  /** Longer profile paragraph (from the resume) — not shown on the page yet */
  about: string;
  contactHeadline: string;
  contactIntro: string;
  contactAvailability: string;
  workArrangements: string[];
  /** Options in the contact form's "Reason for Reaching Out" — the first is the default */
  contactTopics: [string, ...string[]];
  replyTime: string;
}

export interface ResumePdf {
  url: string;
  downloadName: string;
  details: string;
}

export interface SectionCopy {
  /** Matches the section's id on the page (used for #links) */
  id: string;
  eyebrow: string;
  title?: string;
  intro?: string;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface Competency {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Shown joined with " · " */
  deliverables: string[];
  /** Extra search words */
  tags: string[];
}

export interface FilterOption {
  id: ProjectCategory;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  organization: string;
  organizationType: OrganizationType;
  role: string;
  /** id of the matching role in career.ts */
  careerId: string;
  duration: string;
  startDate: YearMonth;
  /** null while it's the current role */
  endDate: YearMonth | null;
  impactHeadline: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string;
  execution: string[];
  /** Optional measurable results — leave empty if you don't have numbers. */
  outcomes: {
    metric: string;
    label: string;
  }[];
  tools: string[];
  /** Extra search words (acronyms, full names, synonyms) */
  tags: string[];
}

export interface CareerRole {
  id: string;
  period: string;
  startDate: YearMonth;
  /** null while it's the current role */
  endDate: YearMonth | null;
  role: string;
  company: string;
  organizationType: OrganizationType;
  employmentType: EmploymentType;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  level: string;
  institution: string;
  year: string;
  startYear: number;
  endYear: number;
  tags: string[];
}

export interface Skills {
  soft: string[];
  administrative: string[];
  finance: string[];
  technical: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  context: string;
}
