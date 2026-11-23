import type { Competency } from '../types';

// The "What I Do" cards.
export const CORE_COMPETENCIES = [
  {
    id: 'admin-support',
    number: '01.',
    title: 'Administrative & Secretarial Support',
    description: 'Managing schedules, email communications, and essential company documents, and providing secretarial support to executives and internal departments.',
    deliverables: ['Scheduling', 'Correspondence', 'Document Processing'],
    tags: [
      'administration',
      'secretary',
      'scheduling',
      'email',
      'documents',
      'executive support',
    ],
  },
  {
    id: 'finance-compliance',
    number: '02.',
    title: 'Financial Documents & Compliance',
    description: 'Tracking cheque issuance and processing, organizing BIR forms across business units, and serving as secretariat for planning and budget submissions.',
    deliverables: ['Cheque Administration', 'BIR Forms', 'OPCR / LIB / PPMP'],
    tags: [
      'finance',
      'compliance',
      'cheque',
      'check',
      'BIR',
      'tax',
      'budget',
      'OPCR',
      'LIB',
      'PPMP',
    ],
  },
  {
    id: 'training-technology',
    number: '03.',
    title: 'Training Coordination & Technology',
    description: 'Facilitating TESDA assessment, training, and scholarship processes — backed by a Computer Engineering degree and hands-on Flutter mobile development.',
    deliverables: ['TESDA Processes', 'Client Support', 'Data Entry', 'Flutter'],
    tags: [
      'TESDA',
      'training',
      'scholarship',
      'assessment',
      'technology',
      'data entry',
      'Flutter',
      'mobile app',
      'computer engineering',
    ],
  },
] satisfies Competency[];
