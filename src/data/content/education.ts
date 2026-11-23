import type { Education } from '../types';

export const EDUCATION = [
  {
    id: 'ustp-bscpe',
    degree: 'BS in Computer Engineering',
    level: 'college',
    institution: 'University of Science and Technology of Southern Philippines',
    year: '2018 — 2023',
    startYear: 2018,
    endYear: 2023,
    tags: ['USTP', 'BS CpE', 'computer engineering', 'college', 'degree'],
  },
  {
    id: 'liceo-shs-stem',
    degree: 'Senior High School — STEM',
    level: 'senior high school',
    institution: 'Liceo de Cagayan University',
    year: '2016 — 2018',
    startYear: 2016,
    endYear: 2018,
    tags: ['STEM', 'Science, Technology, Engineering and Mathematics', 'senior high school'],
  },
] satisfies Education[];
