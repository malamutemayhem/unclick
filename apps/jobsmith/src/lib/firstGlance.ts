// apps/jobsmith/src/lib/firstGlance.ts
//
// Simulates the recruiter's first-glance scan of a CV. Research basis
// (cv-checklists_3.md section L; consolidated checklist items 2 and 94):
// a recruiter spends roughly 8 seconds before filing a CV as yes, maybe,
// or no, and the scan order is fixed. About 3 seconds go to the top third
// of page 1 (name, contact, role target, summary tone), 2 seconds to the
// most recent role (title, dates, first bullet), 2 seconds to a keyword
// pattern-match against the job ad, and 1 second to a layout gut check.
// The first bullet of the most recent role is the most-read line on the
// entire document. This module scores that scan path only; the full rule
// pack covers everything below the fold.

import { extractJdKeywords } from "./renderCvDraft";

export type GlanceZone = "top-third" | "first-role" | "keywords" | "layout";
export type GlanceVerdict = "yes-pile" | "maybe-pile" | "needs-work";

export interface GlanceFinding {
  zone: GlanceZone;
  ok: boolean;
  label: string;
}

export interface FirstGlanceReport {
  verdict: GlanceVerdict;
  score: number; // 0 to 100 across the applicable scan-path weight
  findings: GlanceFinding[];
  topThirdLines: string[];
  firstBullet: string | null;
  matchedJdKeywords: string[];
}

// Weights mirror the published scan-time split (3s / 2s / 2s / 1s of 8s).
// They are a product heuristic, not a measured constant.
const WEIGHTS = {
  contactVisible: 6,
  roleHeadline: 14,
  proofEarly: 12,
  noGenericFiller: 8,
  summaryTight: 5,
  firstBulletStrongVerb: 10,
  firstBulletQuantified: 8,
  firstBulletShort: 7,
  keywordsInGlanceZone: 20,
  noWallOfText: 5,
  usesBullets: 5,
} as const;

const GENERIC_FILLER =
  /\b(passionate|highly motivated|results?-driven|results?-oriented|team player|proven track record|hard-?working|go-getter|self-starter|dynamic professional)\b/i;

const STRONG_OPENING_VERBS = new Set([
  "led", "built", "shipped", "designed", "launched", "drove", "owned",
  "scaled", "architected", "directed", "negotiated", "delivered", "created",
  "founded", "ran", "managed", "reduced", "increased", "grew", "won", "cut",
  "saved", "rebuilt", "migrated", "automated", "produced", "rolled",
]);

const ROLE_NOUN =
  /\b(designer|engineer|developer|manager|director|lead|head|analyst|producer|consultant|specialist|coordinator|architect|marketer|writer|editor|strategist|administrator|technician|scientist|officer)\b/i;

const CONTACT_SIGNAL =
  /[\w.+-]+@[\w-]+\.[\w.]+|\blinkedin\.com\/|\b(?:\+?\d[\d ()-]{7,})\b/i;

const BULLET_LINE = /^[ \t]*[-*•][ \t]+(.*)$/;

const METRIC_OR_SCOPE =
  /\d|%|\$|\bacross\b|\bteam of\b|\bend-to-end\b|\bnationwide\b/i;

interface ParsedCv {
  topThirdLines: string[];
  topHalfLines: string[];
  firstBullet: string | null;
  firstRoleBlock: string[];
}

function parseCv(text: string): ParsedCv {
  const lines = text.split(/\r?\n/);
  const nonEmpty = lines.filter((line) => line.trim().length > 0);
  const topThirdCount = Math.max(8, Math.ceil(nonEmpty.length / 3));
  const topThirdLines = nonEmpty.slice(0, topThirdCount);
  const topHalfLines = nonEmpty.slice(0, Math.max(12, Math.ceil(nonEmpty.length / 2)));

  // The first role block is everything from the experience heading (or the
  // first bullet, when there is no heading) up to the next blank-separated
  // role header. Only the first bullet inside it carries glance weight.
  let firstBullet: string | null = null;
  const firstRoleBlock: string[] = [];
  let inExperience = false;
  let bulletsSeen = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.length === 0) continue;
    if (/^(work experience|professional experience|experience|employment history)$/i.test(line)) {
      inExperience = true;
      continue;
    }
    const bullet = raw.match(BULLET_LINE);
    if (bullet) {
      if (firstBullet === null) firstBullet = bullet[1].trim();
      if (inExperience || bulletsSeen === 0) firstRoleBlock.push(line);
      bulletsSeen += 1;
      continue;
    }
    if (inExperience && firstRoleBlock.length === 0) {
      firstRoleBlock.push(line);
    } else if (inExperience && bulletsSeen > 0) {
      break; // next role header reached
    }
  }

  return { topThirdLines, topHalfLines, firstBullet, firstRoleBlock };
}

function rankedJdKeywords(jobText: string, limit: number): string[] {
  const keywords = extractJdKeywords(jobText);
  const lower = jobText.toLowerCase();
  return keywords
    .map((keyword) => ({
      keyword,
      count: lower.split(keyword).length - 1,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((entry) => entry.keyword);
}

export function auditFirstGlance(cvText: string, jobText = ""): FirstGlanceReport {
  const parsed = parseCv(cvText);
  const findings: GlanceFinding[] = [];
  let score = 0;
  let applicableWeight = 0;

  const add = (zone: GlanceZone, ok: boolean, weight: number, label: string) => {
    findings.push({ zone, ok, label });
    applicableWeight += weight;
    if (ok) score += weight;
  };

  const topThird = parsed.topThirdLines.join("\n");

  add(
    "top-third",
    CONTACT_SIGNAL.test(topThird),
    WEIGHTS.contactVisible,
    "Contact details sit in the top third where the reader expects them",
  );

  const headlineLine = parsed.topThirdLines.find((line) => ROLE_NOUN.test(line));
  add(
    "top-third",
    Boolean(headlineLine),
    WEIGHTS.roleHeadline,
    "A role-shaped headline tells the reader what to hire you for in the first 3 seconds",
  );

  add(
    "top-third",
    /\d|%|\$/.test(topThird),
    WEIGHTS.proofEarly,
    "At least one concrete number or proof point appears above the fold",
  );

  add(
    "top-third",
    !GENERIC_FILLER.test(topThird),
    WEIGHTS.noGenericFiller,
    "No generic filler (passionate, results-driven, team player) in the first impression",
  );

  let densestRun = 0;
  let run = 0;
  for (const line of parsed.topThirdLines) {
    run = BULLET_LINE.test(line) || line.length <= 90 ? 0 : run + 1;
    densestRun = Math.max(densestRun, run);
  }
  add(
    "top-third",
    densestRun < 3,
    WEIGHTS.summaryTight,
    "The opening reads as a scannable block, not a wall of prose",
  );

  const firstBulletWords = parsed.firstBullet
    ? parsed.firstBullet.split(/\s+/).filter(Boolean)
    : [];
  const opener = firstBulletWords[0]?.toLowerCase().replace(/[^a-z]/g, "") ?? "";
  add(
    "first-role",
    STRONG_OPENING_VERBS.has(opener),
    WEIGHTS.firstBulletStrongVerb,
    "The first bullet of the most recent role (the most-read line on the CV) opens with a strong verb",
  );
  add(
    "first-role",
    parsed.firstBullet !== null && METRIC_OR_SCOPE.test(parsed.firstBullet),
    WEIGHTS.firstBulletQuantified,
    "That first bullet carries a number or clear scope, not just a duty",
  );
  add(
    "first-role",
    firstBulletWords.length > 0 && firstBulletWords.length <= 30,
    WEIGHTS.firstBulletShort,
    "That first bullet fits in one breath (30 words or fewer)",
  );

  let matchedJdKeywords: string[] = [];
  if (jobText.trim().length > 0) {
    const topKeywords = rankedJdKeywords(jobText, 12);
    const glanceZone = `${topThird}\n${parsed.firstRoleBlock.join("\n")}`.toLowerCase();
    matchedJdKeywords = topKeywords.filter((keyword) => glanceZone.includes(keyword));
    const proportion = Math.min(1, matchedJdKeywords.length / 4);
    findings.push({
      zone: "keywords",
      ok: matchedJdKeywords.length >= 4,
      label:
        matchedJdKeywords.length > 0
          ? `Job-ad language visible at first glance: ${matchedJdKeywords.slice(0, 6).join(", ")}`
          : "None of the job ad's most-used words appear in the glance zone",
    });
    applicableWeight += WEIGHTS.keywordsInGlanceZone;
    score += Math.round(WEIGHTS.keywordsInGlanceZone * proportion);
  }

  let wallRun = 0;
  let maxWallRun = 0;
  for (const line of parsed.topHalfLines) {
    wallRun = line.length > 90 && !BULLET_LINE.test(line) ? wallRun + 1 : 0;
    maxWallRun = Math.max(maxWallRun, wallRun);
  }
  add(
    "layout",
    maxWallRun < 3,
    WEIGHTS.noWallOfText,
    "No dense text wall in the top half; the eye can land somewhere",
  );
  add(
    "layout",
    parsed.firstBullet !== null,
    WEIGHTS.usesBullets,
    "Bullets exist, so the page passes the one-second layout gut check",
  );

  const normalised = applicableWeight > 0 ? Math.round((score / applicableWeight) * 100) : 0;
  const verdict: GlanceVerdict =
    normalised >= 80 ? "yes-pile" : normalised >= 55 ? "maybe-pile" : "needs-work";

  return {
    verdict,
    score: normalised,
    findings,
    topThirdLines: parsed.topThirdLines,
    firstBullet: parsed.firstBullet,
    matchedJdKeywords,
  };
}
