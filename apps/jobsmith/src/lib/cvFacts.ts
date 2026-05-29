// apps/jobsmith/src/lib/cvFacts.ts
//
// The structured "master CV facts" a user maintains once. Every line that can
// appear in a generated CV traces back to one of these facts by id, so the
// draft can never invent experience: it can only select and reorder facts.

export interface CvBullet {
  id: string;
  text: string;
}

export interface ExperienceEntry {
  id: string;
  org: string;
  title: string;
  startDate: string; // MM/YYYY
  endDate: string; // MM/YYYY or "Present"
  bullets: CvBullet[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  qualification: string;
  year?: string; // YYYY
}

export interface SkillFact {
  id: string;
  text: string;
}

export interface MasterCvFacts {
  name: string;
  contact: string; // single line, e.g. "email | phone | location"
  summary?: { id: string; text: string };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillFact[];
}

// Flat (non-discriminated) on purpose: this repo compiles with strict:false,
// which disables reliable discriminated-union narrowing for consumers.
export interface ParseResult {
  ok: boolean;
  facts?: MasterCvFacts;
  error?: string;
}

const MONTH_YEAR_RE = /^(0[1-9]|1[0-2])\/\d{4}$/;
const YEAR_RE = /^\d{4}$/;

// A blank-but-valid starting point. Contains no claims: every field is a
// placeholder the user replaces with their own real facts.
export const CV_FACTS_TEMPLATE: MasterCvFacts = {
  name: "Your Name",
  contact: "your.email@example.com | City, State",
  summary: {
    id: "summary",
    text: "Replace with one or two true sentences describing your focus and strengths.",
  },
  experience: [
    {
      id: "exp-1",
      org: "Replace with employer name",
      title: "Replace with your job title",
      startDate: "01/2020",
      endDate: "Present",
      bullets: [
        { id: "exp-1-b1", text: "Replace with a real responsibility or outcome." },
        { id: "exp-1-b2", text: "Add another true bullet. Only claims you can defend." },
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Replace with institution",
      qualification: "Replace with qualification",
      year: "2010",
    },
  ],
  skills: [
    { id: "skill-1", text: "Replace with a real skill" },
    { id: "skill-2", text: "Add another real skill" },
  ],
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateDates(facts: MasterCvFacts): string[] {
  const issues: string[] = [];
  for (const exp of facts.experience) {
    if (!MONTH_YEAR_RE.test(exp.startDate)) {
      issues.push(`Experience "${exp.id}" startDate must be MM/YYYY`);
    }
    if (exp.endDate !== "Present" && !MONTH_YEAR_RE.test(exp.endDate)) {
      issues.push(`Experience "${exp.id}" endDate must be MM/YYYY or "Present"`);
    }
  }
  for (const edu of facts.education) {
    if (edu.year !== undefined && !YEAR_RE.test(edu.year)) {
      issues.push(`Education "${edu.id}" year must be YYYY`);
    }
  }
  return issues;
}

export function collectFactIds(facts: MasterCvFacts): string[] {
  const ids: string[] = [];
  if (facts.summary) ids.push(facts.summary.id);
  for (const exp of facts.experience) {
    ids.push(exp.id);
    for (const b of exp.bullets) ids.push(b.id);
  }
  for (const edu of facts.education) ids.push(edu.id);
  for (const skill of facts.skills) ids.push(skill.id);
  return ids;
}

export function parseMasterCvFacts(raw: string): ParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return {
      ok: false,
      error: `Not valid JSON: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "CV facts must be a JSON object" };
  }
  const obj = parsed as Record<string, unknown>;

  if (!isNonEmptyString(obj.name)) {
    return { ok: false, error: 'Field "name" is required' };
  }
  if (!isNonEmptyString(obj.contact)) {
    return { ok: false, error: 'Field "contact" is required' };
  }
  if (!Array.isArray(obj.experience)) {
    return { ok: false, error: 'Field "experience" must be an array' };
  }
  if (!Array.isArray(obj.education)) {
    return { ok: false, error: 'Field "education" must be an array' };
  }
  if (!Array.isArray(obj.skills)) {
    return { ok: false, error: 'Field "skills" must be an array' };
  }

  for (const exp of obj.experience as Record<string, unknown>[]) {
    if (
      !isNonEmptyString(exp.id) ||
      !isNonEmptyString(exp.org) ||
      !isNonEmptyString(exp.title) ||
      !isNonEmptyString(exp.startDate) ||
      !isNonEmptyString(exp.endDate) ||
      !Array.isArray(exp.bullets)
    ) {
      return {
        ok: false,
        error:
          "Each experience entry needs id, org, title, startDate, endDate, and a bullets array",
      };
    }
    for (const b of exp.bullets as Record<string, unknown>[]) {
      if (!isNonEmptyString(b.id) || !isNonEmptyString(b.text)) {
        return { ok: false, error: "Each bullet needs an id and text" };
      }
    }
  }
  for (const edu of obj.education as Record<string, unknown>[]) {
    if (
      !isNonEmptyString(edu.id) ||
      !isNonEmptyString(edu.institution) ||
      !isNonEmptyString(edu.qualification)
    ) {
      return {
        ok: false,
        error: "Each education entry needs id, institution, and qualification",
      };
    }
  }
  for (const skill of obj.skills as Record<string, unknown>[]) {
    if (!isNonEmptyString(skill.id) || !isNonEmptyString(skill.text)) {
      return { ok: false, error: "Each skill needs an id and text" };
    }
  }

  const facts = parsed as MasterCvFacts;
  const ids = collectFactIds(facts);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length > 0) {
    return {
      ok: false,
      error: `Fact ids must be unique. Duplicated: ${[...new Set(dupes)].join(", ")}`,
    };
  }

  return { ok: true, facts };
}
