// apps/jobsmith/src/lib/riskAudit.ts
//
// Pure scanners for the Jobsmith risk dashboard:
//  - tone: em-dashes, curly quotes, and AI-era tell words
//  - quantified claims: anything numeric the writer should be able to defend
//  - age signals: visible years and long experience spans
// None of these block sending. They surface things to review before applying.

export interface ToneFinding {
  kind: "em-dash" | "curly-quote" | "gpt-tell";
  label: string;
  count: number;
}

export interface AgeFinding {
  kind: "year" | "long-experience";
  label: string;
}

// Stems (word-start prefixes) of words that read as AI-generated filler.
const GPT_TELL_STEMS: string[] = [
  "delv",
  "tapestr",
  "intricat",
  "meticulous",
  "pivotal",
  "underscor",
  "testament",
  "bolster",
  "fostering",
  "showcas",
  "leverag",
  "seamless",
  "holistic",
  "embark",
  "nuanc",
  "multifacet",
  "synerg",
];

export function scanTone(text: string): ToneFinding[] {
  const findings: ToneFinding[] = [];

  const emDashes = (text.match(/—/g) ?? []).length;
  if (emDashes > 0) {
    findings.push({
      kind: "em-dash",
      label: "Em-dash used; replace with a comma, colon, or brackets",
      count: emDashes,
    });
  }

  const curly = (text.match(/[‘’“”]/g) ?? []).length;
  if (curly > 0) {
    findings.push({
      kind: "curly-quote",
      label: "Curly quotes present; some ATS parsers mangle them",
      count: curly,
    });
  }

  for (const stem of GPT_TELL_STEMS) {
    const matches = text.match(new RegExp(`\\b${stem}[a-z]*\\b`, "gi"));
    if (matches && matches.length > 0) {
      findings.push({
        kind: "gpt-tell",
        label: `AI-era tell word: "${matches[0].toLowerCase()}"`,
        count: matches.length,
      });
    }
  }

  return findings;
}

export function extractQuantifiedClaims(text: string): string[] {
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const claims: string[] = [];
  for (const sentence of sentences) {
    if (/\d/.test(sentence) || /\bpercent\b/i.test(sentence)) {
      if (!claims.includes(sentence)) claims.push(sentence);
    }
  }
  return claims.slice(0, 25);
}

export function scanAgeSignals(text: string): AgeFinding[] {
  const findings: AgeFinding[] = [];

  const years = text.match(/\b(?:19[5-9]\d|20[0-2]\d)\b/g);
  if (years && years.length > 0) {
    const unique = [...new Set(years)].sort();
    findings.push({
      kind: "year",
      label: `Year(s) visible (${unique.join(", ")}); consider whether a graduation year is needed`,
    });
  }

  let maxYears = 0;
  const spanRe = /(\d+)\s*\+?\s*years?/gi;
  let match: RegExpExecArray | null;
  while ((match = spanRe.exec(text)) !== null) {
    maxYears = Math.max(maxYears, Number(match[1]));
  }
  if (maxYears > 15) {
    findings.push({
      kind: "long-experience",
      label: `An experience span of ${maxYears} years is a strong age signal`,
    });
  }

  return findings;
}
