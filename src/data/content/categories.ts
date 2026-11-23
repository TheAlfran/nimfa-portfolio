import type { FilterOption } from '../types';

// The filter tabs above the case studies.
export const FILTER_OPTIONS = [
  { id: 'all', label: 'All Work' },
  { id: 'administration', label: 'Administration' },
  { id: 'finance', label: 'Finance & Compliance' },
  { id: 'technology', label: 'Technology' },
] satisfies FilterOption[];
