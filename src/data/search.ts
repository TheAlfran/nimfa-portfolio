// A ready-made search over all portfolio content, for a future search box.
// Usage: searchPortfolio('bir')  →  results sorted best match first.

import {
  CAREER_TIMELINE,
  CASE_STUDIES,
  CORE_COMPETENCIES,
  EDUCATION,
  IMPACT_METRICS,
  SECTIONS,
  SKILLS,
  type SectionCopy,
} from './portfolioData';

export type SearchResultType = 'caseStudy' | 'career' | 'competency' | 'education' | 'skill' | 'metric' | 'section';

export interface SearchEntry {
  type: SearchResultType;
  /** id of the item in its content file */
  id: string;
  title: string;
  subtitle: string;
  /** Section on the page to jump to */
  href: string;
  /** Title words (matches here rank higher) */
  primary: string;
  /** Everything else that's searchable */
  secondary: string;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '');

const join = (...parts: (string | string[] | null | undefined)[]) =>
  normalize(parts.flat().filter(Boolean).join(' '));

export const SEARCH_INDEX: SearchEntry[] = [
  ...CASE_STUDIES.map((c) => ({
    type: 'caseStudy' as const,
    id: c.id,
    title: c.title,
    subtitle: `${c.organization} · ${c.year}`,
    href: '#work',
    primary: join(c.title, c.tags, c.tools),
    secondary: join(c.categoryLabel, c.organization, c.role, c.summary, c.challenge, c.execution, c.impactHeadline, c.duration),
  })),
  ...CAREER_TIMELINE.map((r) => ({
    type: 'career' as const,
    id: r.id,
    title: r.role,
    subtitle: `${r.company} · ${r.period}`,
    href: '#experience',
    primary: join(r.role, r.company, r.tags),
    secondary: join(r.summary, r.highlights, r.location, r.period, r.employmentType, r.organizationType),
  })),
  ...CORE_COMPETENCIES.map((c) => ({
    type: 'competency' as const,
    id: c.id,
    title: c.title,
    subtitle: c.deliverables.join(' · '),
    href: '#what-i-do',
    primary: join(c.title, c.tags, c.deliverables),
    secondary: join(c.description),
  })),
  ...EDUCATION.map((e) => ({
    type: 'education' as const,
    id: e.id,
    title: e.degree,
    subtitle: `${e.institution} · ${e.year}`,
    href: '#experience',
    primary: join(e.degree, e.institution, e.tags),
    secondary: join(e.level, e.year),
  })),
  ...Object.entries(SKILLS).flatMap(([group, skills]) =>
    skills.map((skill) => ({
      type: 'skill' as const,
      id: `${group}:${skill}`,
      title: skill,
      subtitle: `${group[0].toUpperCase()}${group.slice(1)} skill`,
      href: '#what-i-do',
      primary: join(skill),
      secondary: join(group),
    })),
  ),
  ...IMPACT_METRICS.map((m) => ({
    type: 'metric' as const,
    id: m.id,
    title: `${m.value} — ${m.label}`,
    subtitle: m.detail,
    href: '#',
    primary: join(m.value, m.label),
    secondary: join(m.detail),
  })),
  ...Object.values(SECTIONS as Record<string, SectionCopy>).map((s) => ({
    type: 'section' as const,
    id: s.id,
    title: s.eyebrow,
    subtitle: s.title ?? '',
    href: `#${s.id}`,
    primary: join(s.eyebrow, s.title),
    secondary: join(s.intro),
  })),
];

/** Every word of the query must appear somewhere; title/tag matches rank first. */
export function searchPortfolio(query: string, limit = 20): SearchEntry[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return SEARCH_INDEX.map((entry) => {
    let score = 0;
    for (const word of words) {
      if (entry.primary.includes(word)) score += 3;
      else if (entry.secondary.includes(word)) score += 1;
      else return null;
    }
    return { entry, score };
  })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
