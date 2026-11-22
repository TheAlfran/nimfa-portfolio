// All portfolio content lives here — edit this file to update the site.
// Images go in public/images/ (paths below are served from there). Until an
// image exists, a neat placeholder is shown instead.

export type ProjectCategory = 'all' | 'administration' | 'finance' | 'technology';

export interface CaseStudy {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  organization: string;
  duration: string;
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
}

export interface Competency {
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface CareerRole {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  context: string;
}

export const PROFILE = {
  name: 'Nimfa Mae Sumalinog',
  shortTitle: 'Administrative & Operations Professional',
  title: 'Operations Officer · Administrative Assistant',
  location: 'Cagayan de Oro City, Philippines',
  email: 'sumalinognimfa@gmail.com',
  linkedin: '',
  heroHeadline: 'Keeping offices organized, documents in order, and teams moving forward.',
  heroIntro:
    'Administrative assistant who prioritizes organization, enjoys solving problems, and pays close attention to detail — with experience managing schedules, financial documents, and client interactions across private, academic, and government offices.',
  contactHeadline: 'Open to administrative and operations roles.',
  contactIntro:
    "Looking for a detail-oriented administrative assistant or operations officer who works well with a team? I'd be glad to hear from you.",
  contactAvailability: 'Cagayan de Oro City · On-site & Hybrid',
};

export const HERO_IMAGE = '/images/profile.jpg';

// Your resume PDF (in public/). Replace the file to update it; keep the same name or change it here.
export const RESUME_PDF = {
  url: '/Nimfa-Mae-Sumalinog-Resume.pdf',
  downloadName: 'Nimfa-Mae-Sumalinog-Resume.pdf',
  details: 'PDF · 1 page',
};

export const IMPACT_METRICS = [
  {
    value: '2019',
    label: 'In office administration since',
    detail: 'Starting as a part-time secretary',
  },
  {
    value: '5',
    label: 'Organizations supported',
    detail: 'Private, academic & government',
  },
  {
    value: 'BS CpE',
    label: 'Computer Engineering',
    detail: 'University of Science and Technology of Southern Philippines',
  },
  {
    value: 'Flutter',
    label: 'Mobile app development',
    detail: 'Built during OJT at the PSA',
  },
];

export const CORE_COMPETENCIES: Competency[] = [
  {
    number: '01.',
    title: 'Administrative & Secretarial Support',
    description:
      'Managing schedules, email communications, and essential company documents, and providing secretarial support to executives and internal departments.',
    deliverables: 'Scheduling · Correspondence · Document Processing',
  },
  {
    number: '02.',
    title: 'Financial Documents & Compliance',
    description:
      'Tracking cheque issuance and processing, organizing BIR forms across business units, and serving as secretariat for planning and budget submissions.',
    deliverables: 'Cheque Administration · BIR Forms · OPCR / LIB / PPMP',
  },
  {
    number: '03.',
    title: 'Training Coordination & Technology',
    description:
      'Facilitating TESDA assessment, training, and scholarship processes — backed by a Computer Engineering degree and hands-on Flutter mobile development.',
    deliverables: 'TESDA Processes · Client Support · Data Entry · Flutter',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tesda-processing',
    title: 'TESDA Assessment, Training & Scholarship Processing',
    category: 'administration',
    categoryLabel: 'Operations',
    year: '2024',
    organization: 'Jamaican F&B Training and Assessment Center Inc.',
    duration: 'September 2024 — Present',
    impactHeadline: 'Facilitating TESDA-related processes end to end',
    summary:
      'As Operations Officer, I facilitate TESDA-related processes for assessment, training, and scholarship applications, and keep company communications and documents up to date.',
    image: '/images/work-tesda.jpg',
    imageAlt: 'Training center operations',
    challenge:
      'Assessment training and scholarship applications involve many documents and deadlines that need to be processed accurately for each applicant.',
    execution: [
      'Facilitate TESDA-related processes for assessment training and scholarship applications.',
      'Update email communications with applicants and partners.',
      'Process essential company documents.',
    ],
    outcomes: [],
    tools: ['Email', 'Document Processing', 'TESDA Processes'],
  },
  {
    id: 'cheque-bir-admin',
    title: 'Cheque Administration & BIR Form Management',
    category: 'finance',
    categoryLabel: 'Finance & Compliance',
    year: '2023',
    organization: 'He and Sons Corporation',
    duration: 'September 2023 — July 2024',
    impactHeadline: 'Supporting smooth financial operations across business units',
    summary:
      'As Admin Assistant, I tracked cheque issuance and processing and managed Bureau of Internal Revenue (BIR) forms across different business units.',
    image: '/images/work-finance.jpg',
    imageAlt: 'Organized financial documents',
    challenge:
      'Cheques are issued for many purposes across the organization, and BIR forms come from several business units — all of which need to be tracked and kept compliant.',
    execution: [
      'Tracked the issuance and processing of cheques for various purposes throughout the organization.',
      'Managed and organized all forms pertaining to the BIR across different business units.',
      'Oversaw cheque administration, ensured regulatory compliance, and supported internal departments.',
    ],
    outcomes: [],
    tools: ['Cheque Tracking', 'BIR Forms', 'Records Management'],
  },
  {
    id: 'ustp-secretariat',
    title: 'Planning & Budget Submission Secretariat',
    category: 'administration',
    categoryLabel: 'Administration',
    year: '2024',
    organization: 'University of Science and Technology of Southern Philippines',
    duration: 'July — August 2024',
    impactHeadline: 'Secretariat for OPCR, LIB, and PPMP submissions',
    summary:
      'As Secretary III (Job Order), I acted as secretariat for the submission and evaluation of planning and budget documents and supported the office of the VCFA.',
    image: '/images/work-ustp.jpg',
    imageAlt: 'University administrative office',
    challenge:
      'University offices submit performance, budget, and procurement plans (OPCR, LIB, PPMP) that must be collected and evaluated on schedule.',
    execution: [
      'Acted as secretariat for the submission and evaluation of OPCR, LIB, and PPMP.',
      'Handled the submission of Accomplishment Reports.',
      'Provided secretarial support to the Executive Assistant of the VCFA.',
    ],
    outcomes: [],
    tools: ['OPCR', 'LIB', 'PPMP', 'Accomplishment Reports'],
  },
  {
    id: 'psa-flutter',
    title: 'Data Entry & Flutter Mobile App Development',
    category: 'technology',
    categoryLabel: 'Technology',
    year: '2023',
    organization: 'Philippine Statistics Authority — Northern Mindanao',
    duration: 'February — March 2023',
    impactHeadline: 'On-the-job training in data entry and mobile development',
    summary:
      'During my OJT at the Philippine Statistics Authority, I worked on data entry and mobile app development using Flutter.',
    image: '/images/work-psa.jpg',
    imageAlt: 'Mobile app development',
    challenge:
      'An on-the-job training placement combining day-to-day data work with building a mobile application.',
    execution: [
      'Performed data entry for the regional office.',
      'Developed a mobile application using Flutter.',
    ],
    outcomes: [],
    tools: ['Flutter', 'Data Entry'],
  },
];

export const CAREER_TIMELINE: CareerRole[] = [
  {
    period: 'Sep 2024 — Present',
    role: 'Operations Officer',
    company: 'Jamaican F&B Training and Assessment Center Inc.',
    location: '',
    summary:
      'Facilitating TESDA-related processes and keeping company communications and documents up to date.',
    highlights: [
      'Facilitate TESDA-related processes for assessment training and scholarship applications.',
      'Update email communications and process essential company documents.',
    ],
  },
  {
    period: 'Jul 2024 — Aug 2024',
    role: 'Secretary III / Job Order',
    company: 'University of Science and Technology of Southern Philippines',
    location: 'Cagayan de Oro City',
    summary:
      'Secretariat support for planning and budget submissions and for the office of the VCFA.',
    highlights: [
      'Acted as secretariat for the submission and evaluation of OPCR, LIB, and PPMP.',
      'Handled the submission of Accomplishment Reports.',
      'Provided secretarial support to the Executive Assistant of the VCFA.',
    ],
  },
  {
    period: 'Sep 2023 — Jul 2024',
    role: 'Admin Assistant',
    company: 'He and Sons Corporation',
    location: '',
    summary:
      'Supported the smooth financial operations of the company through cheque administration and BIR compliance.',
    highlights: [
      'Tracked the issuance and processing of cheques for various purposes throughout the organization.',
      'Managed and organized all forms pertaining to the Bureau of Internal Revenue (BIR) across different business units.',
      'Oversaw cheque administration, ensured regulatory compliance, and supported internal departments.',
    ],
  },
  {
    period: 'Feb 2023 — Mar 2023',
    role: 'OJT — Data Entry & Mobile App Developer (Flutter)',
    company: 'Philippine Statistics Authority — Northern Mindanao',
    location: 'Northern Mindanao',
    summary: 'On-the-job training in data entry and Flutter mobile app development.',
    highlights: [],
  },
  {
    period: '2019 — 2023',
    role: 'Secretary (Part-Time)',
    company: 'MJ Consulting Environmental and Engineering Services',
    location: '',
    summary:
      "Administrative, logistical, and technical tasks supporting the organization's training initiatives and enhancing the overall client experience.",
    highlights: [],
  },
];

// Add quotes from managers, clients, or teachers here. The section is hidden while this is empty.
export const TESTIMONIALS: Testimonial[] = [];

export const RESUME_PROFILE = {
  name: PROFILE.name,
  title: PROFILE.title,
  location: PROFILE.location,
  email: PROFILE.email,
  linkedin: PROFILE.linkedin,
  education: [
    {
      degree: 'BS in Computer Engineering',
      institution: 'University of Science and Technology of Southern Philippines',
      year: '2018 — 2023',
    },
    {
      degree: 'Senior High School — STEM',
      institution: 'Liceo de Cagayan University',
      year: '2016 — 2018',
    },
  ],
  coreTools: [
    'Project Management',
    'Time Management',
    'Effective Communication',
    'Critical Thinking',
    'Teamwork',
    'Adaptability',
    'Patience',
  ],
};
