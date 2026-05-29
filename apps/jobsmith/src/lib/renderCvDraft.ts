// apps/jobsmith/src/lib/renderCvDraft.ts
//
// Compose a tailored, single-column CV draft from structured master CV facts
// plus a job description. Pure templating, no LLM. The renderer can only
// select, reorder, and omit real facts: it never writes a new bullet, so every
// emitted line carries the fact id it came from.

import type { JobDescription } from "./renderDraft";
import type { MasterCvFacts } from "./cvFacts";

export type CvSection = "Summary" | "Work Experience" | "Education" | "Skills";

export interface CvCitation {
  factId: string;
  section: CvSection;
  text: string;
  matchedKeywords: string[];
}

export interface CvDraftResult {
  draft: string;
  citations: CvCitation[]; // every emitted line, with its source fact id
  omittedBullets: CvCitation[]; // real facts left out for not matching the JD
  matchedKeywords: string[];
  warnings: string[];
}

const JD_STOPWORDS = new Set([
  "the", "and", "for", "you", "your", "our", "with", "will", "are", "this",
  "that", "have", "has", "from", "their", "they", "who", "what", "able",
  "role", "job", "work", "team", "teams", "company", "candidate", "position",
  "responsibilities", "requirements", "experience", "experienced", "years",
  "year", "ability", "including", "include", "includes", "strong", "excellent",
  "good", "great", "looking", "join", "within", "across", "into", "about",
  "while", "must", "should", "would", "can", "all", "any", "more", "other",
  "well", "also", "etc", "such", "plus", "per", "via", "not", "but", "out",
]);

function extractJdKeywords(text: string): string[] {
  const tokens = text.toLowerCase().split(/[^a-z0-9+#]+/).filter(Boolean);
  const keywords = new Set<string>();
  for (const token of tokens) {
    if (token.length < 3) continue;
    if (JD_STOPWORDS.has(token)) continue;
    keywords.add(token);
  }
  return [...keywords];
}

// Crude suffix stemming so "design" matches "designer" / "designing".
function stem(word: string): string {
  if (word.length <= 4) return word;
  return word.replace(/(ings?|ed|ers?|es|s)$/i, "");
}

function tokenStems(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9+#]+/)
      .filter(Boolean)
      .map(stem),
  );
}

function matchedKeywordsFor(text: string, keywords: string[]): string[] {
  const factStems = tokenStems(text);
  const out: string[] = [];
  for (const keyword of keywords) {
    if (factStems.has(stem(keyword))) out.push(keyword);
  }
  return out;
}

export function renderCvDraft(
  facts: MasterCvFacts,
  job: JobDescription,
): CvDraftResult {
  const keywords = extractJdKeywords(job.rawText);
  const citations: CvCitation[] = [];
  const omittedBullets: CvCitation[] = [];
  const matched = new Set<string>();
  const warnings: string[] = [];
  const lines: string[] = [facts.name, facts.contact];

  if (facts.summary && facts.summary.text.trim().length > 0) {
    const text = facts.summary.text.trim();
    lines.push("", "Summary", text);
    citations.push({
      factId: facts.summary.id,
      section: "Summary",
      text,
      matchedKeywords: [],
    });
  }

  lines.push("", "Work Experience");
  let anyBulletMatched = false;
  for (const exp of facts.experience) {
    lines.push("", `${exp.title}, ${exp.org}`, `${exp.startDate} - ${exp.endDate}`);
    const scored = exp.bullets.map((bullet) => ({
      bullet,
      keywords: matchedKeywordsFor(bullet.text, keywords),
    }));
    const kept = scored
      .filter((s) => s.keywords.length > 0)
      .sort((a, b) => b.keywords.length - a.keywords.length);
    for (const s of kept) {
      lines.push(`- ${s.bullet.text}`);
      s.keywords.forEach((k) => matched.add(k));
      anyBulletMatched = true;
      citations.push({
        factId: s.bullet.id,
        section: "Work Experience",
        text: s.bullet.text,
        matchedKeywords: s.keywords,
      });
    }
    for (const s of scored.filter((s) => s.keywords.length === 0)) {
      omittedBullets.push({
        factId: s.bullet.id,
        section: "Work Experience",
        text: s.bullet.text,
        matchedKeywords: [],
      });
    }
  }
  if (facts.experience.length > 0 && !anyBulletMatched) {
    warnings.push(
      "No experience bullet matched the job description. The draft lists role headers only: review your master CV facts or the job text.",
    );
  }

  if (facts.education.length > 0) {
    lines.push("", "Education");
    for (const edu of facts.education) {
      const text = edu.year
        ? `${edu.qualification}, ${edu.institution} (${edu.year})`
        : `${edu.qualification}, ${edu.institution}`;
      lines.push(text);
      citations.push({
        factId: edu.id,
        section: "Education",
        text,
        matchedKeywords: [],
      });
    }
  }

  if (facts.skills.length > 0) {
    const scored = facts.skills.map((skill) => ({
      skill,
      keywords: matchedKeywordsFor(skill.text, keywords),
    }));
    let shown = scored.filter((s) => s.keywords.length > 0);
    if (shown.length === 0) {
      shown = scored;
      warnings.push(
        "No skill matched the job description; showing all listed skills.",
      );
    } else {
      for (const s of scored.filter((s) => s.keywords.length === 0)) {
        omittedBullets.push({
          factId: s.skill.id,
          section: "Skills",
          text: s.skill.text,
          matchedKeywords: [],
        });
      }
    }
    lines.push("", "Skills", shown.map((s) => s.skill.text).join(", "));
    for (const s of shown) {
      s.keywords.forEach((k) => matched.add(k));
      citations.push({
        factId: s.skill.id,
        section: "Skills",
        text: s.skill.text,
        matchedKeywords: s.keywords,
      });
    }
  }

  return {
    draft: lines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    citations,
    omittedBullets,
    matchedKeywords: [...matched].sort(),
    warnings,
  };
}
