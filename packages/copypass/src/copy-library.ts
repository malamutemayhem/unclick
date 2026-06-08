import {
  CopyPassCheckDefinitionSchema,
  type CopyPassCheckDefinition,
  type CopyPassCheckId,
  type CopyPassCopyBlock,
  type CopyPassFinding,
} from "./schema.js";

export const DEFAULT_COPYPASS_CHECKS: CopyPassCheckDefinition[] = [
  {
    id: "value-prop-clarity",
    label: "Value prop clarity",
    goal: "Hero and headline copy should say who it helps and what changes for them.",
    severity: "medium",
    recommended_fix:
      "Rewrite the line with a concrete audience, action, and outcome instead of broad platform language.",
  },
  {
    id: "cta-presence",
    label: "CTA presence",
    goal: "Hero and CTA blocks should include a clear next action.",
    severity: "medium",
    recommended_fix:
      "Add one direct call to action, such as Start, Try, Connect, Run, Book, or Open.",
  },
  {
    id: "proof-trust-gap",
    label: "Proof or trust signal",
    goal: "Primary copy should include a proof, safety, privacy, receipt, or trust signal.",
    severity: "low",
    recommended_fix:
      "Add a concrete receipt, customer proof, safety note, privacy note, or public evidence signal.",
  },
  {
    id: "testimonial-proof-gap",
    label: "Social proof needs evidence",
    goal: "Testimonials, ratings, endorsements, and trusted-by claims should point to evidence.",
    severity: "medium",
    recommended_fix:
      "Attach a public source, review, testimonial, case study, or receipt before using the social-proof claim.",
  },
  {
    id: "unsupported-superiority",
    label: "Unsupported superiority",
    goal: "Absolute or superiority claims should have public proof before they ship.",
    severity: "high",
    recommended_fix:
      "Replace the absolute claim with a qualified claim, or attach public proof in nearby copy.",
  },
  {
    id: "detector-evasion-claim",
    label: "Detector-evasion claim",
    goal: "Copy should not market AI-detector bypass, deception, or guaranteed undetectability.",
    severity: "high",
    recommended_fix:
      "Reposition the copy around quality, clarity, editing, and evidence instead of detector bypass claims.",
  },
  {
    id: "authorship-transparency",
    label: "Authorship transparency",
    goal: "AI-generated copy should not imply it is fully human-written or AI-free unless that is externally true.",
    severity: "high",
    recommended_fix:
      "Remove human-written or AI-free claims unless they are true and supported, or reframe around human review.",
  },
  {
    id: "placeholder-copy",
    label: "Placeholder language",
    goal: "Shipped copy should not contain stale placeholders or drafting markers.",
    severity: "medium",
    recommended_fix:
      "Replace the placeholder with final copy or remove the block until the message is ready.",
  },
  {
    id: "risky-guarantee-language",
    label: "Risky guarantee language",
    goal: "Copy should avoid guarantees around revenue, rankings, compliance, access, or outcomes.",
    severity: "high",
    recommended_fix:
      "Use advisory, evidence-backed language and remove outcome guarantees.",
  },
  {
    id: "internal-consistency",
    label: "Internal consistency",
    goal: "Adjacent copy should not contradict the offer, price, access rules, or proof posture.",
    severity: "high",
    recommended_fix:
      "Reconcile the conflicting claims or add context that makes the difference explicit.",
  },
  {
    id: "audience-tone-fit",
    label: "Audience and tone fit",
    goal: "Copy should match the surface and audience without distracting slang, hype, or mismatched formality.",
    severity: "medium",
    recommended_fix:
      "Rewrite in the audience's language and remove tone swings that do not fit the surface.",
  },
  {
    id: "ai-slop-language",
    label: "AI-slop language",
    goal: "Copy should avoid generic AI-writing tells, bloated transitions, and avoidable em dash styling.",
    severity: "medium",
    recommended_fix:
      "Replace generic AI-sounding phrases with concrete nouns, verbs, and proof-backed wording.",
  },
  {
    id: "misleading-urgency",
    label: "Misleading urgency",
    goal: "Urgency or scarcity language should be visibly true and supported.",
    severity: "high",
    recommended_fix:
      "Remove the urgency claim or add nearby evidence such as an actual deadline, quota, or availability reason.",
  },
  {
    id: "ui-honesty-gap",
    label: "Product-surface honesty",
    goal: "UI and product copy should not imply an automated capability is finished unless proof is visible.",
    severity: "high",
    recommended_fix:
      "Qualify the capability, name the proof boundary, or link to the receipt that supports the claim.",
  },
  {
    id: "display-copy-widow",
    label: "Display copy widow risk",
    goal: "Display headings should not drop one or two short words onto their own line (a hanger).",
    severity: "low",
    recommended_fix:
      "Bind the last two words with a non-breaking space, or apply text-wrap: balance (or pretty), so the heading keeps a tidy last line.",
  },
].map((check) => CopyPassCheckDefinitionSchema.parse(check));

const VALUE_TERMS = [
  "helps",
  "ship",
  "review",
  "scan",
  "find",
  "reduce",
  "save",
  "protect",
  "connect",
  "context",
  "proof",
  "receipts",
  "checks",
  "workflow",
];

const VAGUE_TERMS = [
  "all-in-one",
  "game changing",
  "next generation",
  "next-gen",
  "powerful",
  "revolutionary",
  "simple",
  "smart",
  "solution",
  "transform",
  "world class",
];

const CTA_TERMS = [
  "book",
  "connect",
  "create",
  "get",
  "join",
  "open",
  "run",
  "scan",
  "start",
  "try",
];

const PROOF_TERMS = [
  "audit",
  "case study",
  "check",
  "checked",
  "checks",
  "customer",
  "evidence",
  "privacy",
  "proof",
  "receipt",
  "receipts",
  "safety",
  "security",
  "trusted",
  "verified",
];

const SOCIAL_PROOF_TERMS = [
  "as seen in",
  "customers love",
  "endorsed by",
  "featured in",
  "five-star",
  "loved by",
  "rated",
  "recommended by",
  "trusted by",
  "users love",
  "5-star",
];

const SOCIAL_PROOF_EVIDENCE_TERMS = [
  "case study",
  "customer quote",
  "evidence",
  "public proof",
  "receipt",
  "review",
  "source",
  "testimonial",
  "verified",
];

const SUPERIORITY_TERMS = [
  "#1",
  "best",
  "better than",
  "industry leading",
  "leading",
  "most advanced",
  "number one",
  "outperforms",
  "revolutionary",
  "safer than",
  "smarter than",
  "ultimate",
];

const PLACEHOLDER_TERMS = [
  "coming soon",
  "copy goes here",
  "insert copy",
  "lorem ipsum",
];

const GUARANTEE_TERMS = [
  "100%",
  "always",
  "compliance guaranteed",
  "guaranteed",
  "instant revenue",
  "never fail",
  "rank #1",
  "risk-free",
];

const DETECTOR_EVASION_TERMS = [
  "ai detection bypass",
  "bypass ai detection",
  "bypass ai detector",
  "beat ai detection",
  "beat ai detector",
  "evade ai detection",
  "evade detection",
  "gptzero safe",
  "pass gptzero",
  "pass turnitin",
  "turnitin safe",
  "turnitin-safe",
  "undetectable ai",
];

const AUTHORSHIP_TRANSPARENCY_TERMS = [
  "100% human",
  "ai-free",
  "human written",
  "human-written",
  "no ai generated",
  "no ai-generated",
  "not ai generated",
  "not ai-generated",
  "written by humans",
];

const AI_SLOP_TERMS = [
  "delve",
  "elevate",
  "game changing",
  "game-changing",
  "in today's digital landscape",
  "leverage",
  "not just",
  "revolutionize",
  "seamless",
  "tapestry",
  "transform your",
  "unlock",
  "whether you're",
];

const INFORMAL_TONE_TERMS = [
  "bro",
  "crush it",
  "heck yeah",
  "insane",
  "lol",
  "no-brainer",
  "skyrocket",
];

const FORMAL_SURFACE_KINDS = new Set(["pricing", "legal", "proof"]);

const URGENCY_TERMS = [
  "act now",
  "before it's gone",
  "don't miss out",
  "last chance",
  "limited time",
  "only today",
];

const UI_AUTOMATION_TERMS = [
  "autopilot",
  "automatic",
  "automatically",
  "automated",
  "done for you",
  "fully built",
  "hands-off",
  "zero touch",
];

const CONSISTENCY_PAIRS = [
  ["free forever", "paid only"],
  ["no credit card", "credit card required"],
  ["cancel anytime", "annual contract"],
  ["zero setup", "setup fee"],
  ["no setup", "setup fee"],
  ["private by default", "public by default"],
] as const;

const SENSITIVE_COPY_PATTERN =
  /\b(api[_ -]?key|bearer|password|secret|sk-[a-z0-9_-]{8,}|token)\b/i;

export function getDefaultCopyPassChecks(): CopyPassCheckDefinition[] {
  return DEFAULT_COPYPASS_CHECKS.map((check) => ({ ...check }));
}

export function detectCopyPassFindings(
  blocks: CopyPassCopyBlock[],
  checks: CopyPassCheckDefinition[] = DEFAULT_COPYPASS_CHECKS,
): CopyPassFinding[] {
  const activeCheckIds = new Set(checks.map((check) => check.id));
  const checkById = new Map(checks.map((check) => [check.id, check]));

  const blockFindings = blocks.flatMap((block) => {
    const normalized = normalizeCopy(block.text);
    const isPolicyExample = isPolicyExampleCatalog(block, normalized);
    const findings: CopyPassFinding[] = [];

    if (
      isActive(activeCheckIds, "value-prop-clarity") &&
      isPrimaryBlock(block) &&
      containsAny(normalized, VAGUE_TERMS) &&
      !containsAny(normalized, VALUE_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "value-prop-clarity"),
          "Primary copy lacks a concrete value prop",
          "The copy leans on broad language without clearly naming the user, action, and outcome.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "cta-presence") &&
      (block.kind === "hero" || block.kind === "cta") &&
      !containsAny(normalized, CTA_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "cta-presence"),
          "Primary copy is missing a clear CTA",
          "The block does not include a direct next action.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "proof-trust-gap") &&
      (block.kind === "hero" || block.kind === "proof" || block.kind === "pricing") &&
      !containsAny(normalized, PROOF_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "proof-trust-gap"),
          "Primary copy is missing a trust signal",
          "The block does not show proof, safety, privacy, receipt, or public evidence language.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "unsupported-superiority") &&
      !isPolicyExample &&
      containsAny(normalized, SUPERIORITY_TERMS) &&
      !containsAny(normalized, PROOF_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "unsupported-superiority"),
          "Superiority claim needs proof",
          "The copy uses an absolute or superiority phrase without a nearby proof signal.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "testimonial-proof-gap") &&
      !isPolicyExample &&
      containsAny(normalized, SOCIAL_PROOF_TERMS) &&
      !containsAny(normalized, SOCIAL_PROOF_EVIDENCE_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "testimonial-proof-gap"),
          "Social-proof claim needs evidence",
          "The copy uses a testimonial, rating, endorsement, or trusted-by claim without a visible source.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "placeholder-copy") &&
      hasPlaceholderLanguage(normalized)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "placeholder-copy"),
          "Placeholder copy detected",
          "The block contains drafting language that should not ship.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "risky-guarantee-language") &&
      !isPolicyExample &&
      hasRiskyGuarantee(normalized)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "risky-guarantee-language"),
          "Outcome guarantee language detected",
          "The copy appears to promise a fixed result, access, compliance, revenue, or ranking outcome.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "detector-evasion-claim") &&
      !isPolicyExample &&
      containsAny(normalized, DETECTOR_EVASION_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "detector-evasion-claim"),
          "Detector-evasion claim detected",
          "The copy markets AI-detector bypass or guaranteed undetectability instead of quality review.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "authorship-transparency") &&
      !isPolicyExample &&
      containsAny(normalized, AUTHORSHIP_TRANSPARENCY_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "authorship-transparency"),
          "Human-authorship claim needs support",
          "The copy implies the text is fully human-written or AI-free, which can be misleading without proof.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "ai-slop-language") &&
      !isPolicyExample &&
      (containsAny(normalized, AI_SLOP_TERMS) || hasEmDash(block.text))
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "ai-slop-language"),
          "Generic AI-sounding language detected",
          "The copy uses a common AI-writing tell or avoidable em dash styling instead of direct, specific wording.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "audience-tone-fit") &&
      FORMAL_SURFACE_KINDS.has(block.kind) &&
      containsAny(normalized, INFORMAL_TONE_TERMS)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "audience-tone-fit"),
          "Tone does not fit the surface",
          "A formal surface uses casual hype or slang that may reduce trust.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "misleading-urgency") &&
      !isPolicyExample &&
      containsAny(normalized, URGENCY_TERMS) &&
      !hasUrgencySupport(normalized)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "misleading-urgency"),
          "Urgency claim needs support",
          "The copy creates urgency without showing a real deadline, quota, or availability reason.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "ui-honesty-gap") &&
      !isPolicyExample &&
      containsAny(normalized, UI_AUTOMATION_TERMS) &&
      !containsAny(normalized, PROOF_TERMS) &&
      !containsAny(normalized, ["beta", "when safe", "preview", "manual review"])
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "ui-honesty-gap"),
          "Automation claim needs a proof boundary",
          "The copy implies finished automation without naming receipts, checks, review, or a clear beta boundary.",
        ),
      );
    }

    if (
      isActive(activeCheckIds, "display-copy-widow") &&
      isDisplayBlock(block) &&
      hasWidowRisk(block.text)
    ) {
      findings.push(
        createFinding(
          block,
          requireCheck(checkById, "display-copy-widow"),
          "Display heading risks a one-word last line",
          "This heading is long enough to wrap, and its final short word is not bound, so it can drop onto its own line.",
        ),
      );
    }

    return findings;
  });

  return [
    ...blockFindings,
    ...detectInternalConsistencyFindings(
      blocks.filter((block) => !isPolicyExampleCatalog(block, normalizeCopy(block.text))),
      activeCheckIds,
      checkById,
    ),
  ];
}

export function normalizeCopy(value: string): string {
  return value.toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}

function isPrimaryBlock(block: CopyPassCopyBlock): boolean {
  return block.kind === "hero" || block.kind === "headline";
}

function isDisplayBlock(block: CopyPassCopyBlock): boolean {
  return block.kind === "hero" || block.kind === "headline";
}

/**
 * Heuristic widow ("hanger") risk for display headings, from text alone: long
 * enough to wrap, ending in a short word, and not already bound with a
 * non-breaking space. CSS text-wrap: balance also clears the real defect; this
 * is a low-severity nudge to apply one of those fixes.
 */
function hasWidowRisk(value: string): boolean {
  if (value.includes("\u00A0")) return false; // already bound with a non-breaking space
  const words = value.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length < 6) return false; // short headings rarely wrap into a hanger
  const lastWord = words[words.length - 1];
  return lastWord.length <= 5; // a tiny trailing word ("acts.", "that.") is the classic orphan
}

function isPolicyExampleCatalog(block: CopyPassCopyBlock, normalized: string): boolean {
  if (block.kind !== "doc") return false;

  const sourceContext = normalizeCopy(
    [
      block.label ?? "",
      block.source_path ?? "",
      block.source_url ?? "",
    ].join(" "),
  );
  const catalogContext = `${sourceContext} ${normalized}`;

  const hasGuardrailContext = containsAny(catalogContext, [
    "banned",
    "forbidden",
    "blocked",
    "disallowed",
    "do not use",
    "guardrail",
    "linter",
    "marketing copy audit",
    "passguard",
    "policy",
  ]);
  const hasExampleContext = containsAny(catalogContext, [
    "allowed framing",
    "banned phrase",
    "banned phrases",
    "example",
    "examples",
    "phrase",
    "phrases",
    "term",
    "terms",
    "wording",
  ]);
  const hasRiskTerm = containsAny(normalized, [
    ...SUPERIORITY_TERMS,
    ...SOCIAL_PROOF_TERMS,
    ...GUARANTEE_TERMS,
    ...DETECTOR_EVASION_TERMS,
    ...AUTHORSHIP_TRANSPARENCY_TERMS,
    ...AI_SLOP_TERMS,
    ...URGENCY_TERMS,
    ...UI_AUTOMATION_TERMS,
  ]);

  return hasGuardrailContext && hasExampleContext && hasRiskTerm;
}

function isActive(activeCheckIds: Set<CopyPassCheckId>, checkId: CopyPassCheckId): boolean {
  return activeCheckIds.has(checkId);
}

function containsAny(value: string, terms: string[]): boolean {
  return terms.some((term) => containsTerm(value, term));
}

function containsTerm(value: string, term: string): boolean {
  const escaped = escapeRegExp(term);
  const startsWithWord = /^[a-z0-9]/i.test(term);
  const endsWithWord = /[a-z0-9]$/i.test(term);
  const prefix = startsWithWord ? "(?:^|[^a-z0-9])" : "";
  const suffix = endsWithWord ? "(?=$|[^a-z0-9])" : "";
  return new RegExp(`${prefix}${escaped}${suffix}`, "i").test(value);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasEmDash(value: string): boolean {
  return /[\u2013\u2014]/u.test(value);
}

function hasUrgencySupport(value: string): boolean {
  return /\b\d{1,2}\s*(hours?|days?|seats?|spots?|places?)\b/i.test(value) ||
    /\b(deadline|until|ends|expires|capacity|quota)\b/i.test(value);
}

function hasPlaceholderLanguage(value: string): boolean {
  return containsAny(value, PLACEHOLDER_TERMS) ||
    /\b(todo|tbd)\b/i.test(value) ||
    /\bplaceholder\s+(text|copy|headline|body)\s+(here|goes here)\b/i.test(value);
}

function hasRiskyGuarantee(value: string): boolean {
  const neutralized = value
    .replace(
      /\b(?:not|no|never|without|cannot|can't|does not|doesn't|do not|don't|is not|isn't|are not|aren't)\s+(?:a\s+)?guarantee(?:d|s)?\b/g,
      "",
    )
    .replace(/\bdoes not guarantee\b/g, "")
    .replace(/\bno guarantee(?:s|d)?\b/g, "");

  return containsAny(neutralized, GUARANTEE_TERMS);
}

function detectInternalConsistencyFindings(
  blocks: CopyPassCopyBlock[],
  activeCheckIds: Set<CopyPassCheckId>,
  checkById: Map<CopyPassCheckId, CopyPassCheckDefinition>,
): CopyPassFinding[] {
  if (!isActive(activeCheckIds, "internal-consistency")) return [];

  const allCopy = normalizeCopy(blocks.map((block) => block.text).join(" "));
  const matchedPair = CONSISTENCY_PAIRS.find(([left, right]) =>
    allCopy.includes(left) && allCopy.includes(right)
  );
  if (!matchedPair) return [];

  const firstBlock = blocks[0];
  if (!firstBlock) return [];

  return [
    createFinding(
      firstBlock,
      requireCheck(checkById, "internal-consistency"),
      "Copy set contains conflicting offer language",
      `The inspected copy contains both "${matchedPair[0]}" and "${matchedPair[1]}".`,
    ),
  ];
}

function requireCheck(
  checkById: Map<CopyPassCheckId, CopyPassCheckDefinition>,
  checkId: CopyPassCheckId,
): CopyPassCheckDefinition {
  const check = checkById.get(checkId);
  if (!check) {
    throw new Error(`CopyPass check ${checkId} is not configured.`);
  }
  return check;
}

function createFinding(
  block: CopyPassCopyBlock,
  check: CopyPassCheckDefinition,
  title: string,
  summary: string,
): CopyPassFinding {
  return {
    id: `${block.id}.${check.id}`,
    check_id: check.id,
    severity: check.severity,
    title,
    summary,
    evidence: redactEvidence(block.text),
    suggested_fix: check.recommended_fix,
    block_id: block.id,
    source_path: block.source_path,
    source_url: block.source_url,
  };
}

function redactEvidence(value: string): string {
  if (SENSITIVE_COPY_PATTERN.test(value)) {
    return "[redacted-sensitive-copy-fragment]";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, 220);
}
