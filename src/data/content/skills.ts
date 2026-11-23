import type { Skills } from '../types';

// `soft` matches the skills listed on the resume; the other groups are for search.
export const SKILLS = {
  soft: [
    'Project Management',
    'Time Management',
    'Effective Communication',
    'Critical Thinking',
    'Teamwork',
    'Adaptability',
    'Patience',
  ],
  administrative: [
    'Scheduling',
    'Email Correspondence',
    'Document Processing',
    'Records Management',
    'Secretariat Support',
    'Client Support',
  ],
  finance: [
    'Cheque Administration',
    'BIR Forms',
    'Regulatory Compliance',
    'OPCR / LIB / PPMP Submissions',
    'Accomplishment Reports',
  ],
  technical: ['Data Entry', 'Flutter Mobile App Development'],
} satisfies Skills;
