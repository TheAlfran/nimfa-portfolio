// All portfolio content lives in src/data/content/ — one file per topic. Edit those to update the site.
// Their shapes are in ./types.ts. This file gathers everything in one place for the components.

export * from './types';
export { PROFILE, HERO_IMAGE, RESUME_PDF } from './content/profile';
export { SECTIONS } from './content/sections';
export { IMPACT_METRICS } from './content/metrics';
export { CORE_COMPETENCIES } from './content/competencies';
export { FILTER_OPTIONS } from './content/categories';
export { CASE_STUDIES } from './content/caseStudies';
export { CAREER_TIMELINE } from './content/career';
export { EDUCATION } from './content/education';
export { SKILLS } from './content/skills';
export { TESTIMONIALS } from './content/testimonials';

import { PROFILE } from './content/profile';
import { EDUCATION } from './content/education';
import { SKILLS } from './content/skills';

export const RESUME_PROFILE = {
  name: PROFILE.name,
  title: PROFILE.title,
  location: PROFILE.location,
  email: PROFILE.email,
  linkedin: PROFILE.linkedin,
  education: EDUCATION,
  coreTools: SKILLS.soft,
};
