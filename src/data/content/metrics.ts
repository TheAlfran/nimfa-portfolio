import type { Metric } from '../types';

// The stats row under the hero.
export const IMPACT_METRICS = [
  {
    id: 'experience-since',
    value: '2019',
    label: 'In office administration since',
    detail: 'Starting as a part-time secretary',
  },
  {
    id: 'organizations',
    value: '5',
    label: 'Organizations supported',
    detail: 'Private, academic & government',
  },
  {
    id: 'degree',
    value: 'BS CpE',
    label: 'Computer Engineering',
    detail: 'University of Science and Technology of Southern Philippines',
  },
  {
    id: 'flutter',
    value: 'Flutter',
    label: 'Mobile app development',
    detail: 'Built during OJT at the PSA',
  },
] satisfies Metric[];
