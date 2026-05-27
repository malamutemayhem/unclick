/**
 * legalpass-tool - MCP exposure for LegalPass.
 *
 * LegalPass is an issue-spotter only. These handlers expose the existing
 * LegalPass guardrails to MCP callers without pretending a full legal review
 * engine exists yet.
 */

import { createHash } from "node:crypto";

type DisclaimerLength = "chat" | "results" | "tos";

const DISCLAIMERS: Record<DisclaimerLength, string> = {
  chat:
    "LegalPass is an issue-spotter, not a lawyer. It surfaces risks in plain " +
    "English and does not give legal advice, take legal action on your behalf, " +
    "or replace counsel. For action on a specific matter, engage a qualified " +
    "human practitioner in your jurisdiction.",
  results:
    "These findings are issue-spotting output only. LegalPass is not a lawyer, " +
    "law firm, or substitute for one, and nothing here is legal advice or a " +
    "legal opinion about your situation. No solicitor-client or attorney-client " +
    "relationship is created. Items are flagged using a twelve-hat panel, with " +
    "every claim traced to a primary source by the Citation Verifier. " +
    "Jurisdictions named are routing hints, not warranties of coverage. Before " +
    "acting on any item, consult a qualified practitioner admitted in the " +
    "relevant jurisdiction. You can engage one through the LegalPass " +
    "marketplace bolt-on or any provider of your choice. LegalPass disclaims " +
    "liability for action or inaction taken on the basis of this report.",
  tos:
    "LegalPass is an automated issue-spotting service operated by UnClick. It " +
    "is not a lawyer, attorney, solicitor, barrister, law firm, or licensed " +
    "provider of legal services in any jurisdiction. Use of LegalPass does " +
    "not create a solicitor-client, attorney-client, or fiduciary relationship " +
    "between you and UnClick. Output is provided for informational purposes " +
    "only. It is not legal advice, a legal opinion, legal representation, " +
    "certification of compliance, or a guarantee that any document is " +
    "lawful. LegalPass does not draft, execute, file, or serve " +
    "any transactional legal instrument and does not recommend that you take " +
    "or refrain from any specific legal action. Findings reference primary " +
    "sources via the Citation Verifier hard-veto, but those references may " +
    "be incomplete or out of date. Jurisdictional routing is best-effort and " +
    "may be wrong; you are responsible for confirming jurisdiction with a " +
    "qualified practitioner. Where LegalPass surfaces an option to engage a " +
    "practitioner through the marketplace bolt-on, that practitioner contracts " +
    "with you directly and is solely responsible for services they provide. " +
    "To the fullest extent permitted by law, UnClick disclaims all liability " +
    "for loss, damage, or cost arising from action or inaction taken on the " +
    "basis of LegalPass output. Always consult a qualified practitioner " +
    "before acting on any finding, and treat the report as a starting point. " +
    "Rubrics are updated periodically; an item rated as a check today may be " +
    "rated otherwise tomorrow, and you should not rely on a stale report. " +
    "LegalPass does not retain privilege over uploads and does not assert " +
    "work-product protection. Where you face dispute resolution, statutes of " +
    "limitation, or any other deadline, LegalPass does not track or warn " +
    "you, and a missed deadline remains your responsibility. If a finding " +
    "conflicts with advice from a practitioner you have engaged, defer to " +
    "the practitioner. UnClick may update these terms, the rubrics, the hat " +
    "roster, and the routing logic at any time without notice, and continued " +
    "use constitutes acceptance.",
};

const FORBIDDEN_PHRASES: ReadonlyArray<{ phrase: string; reason: string }> = [
  { phrase: "should", reason: "directive verb - implies a recommendation" },
  { phrase: "must", reason: "directive verb - implies an obligation" },
  { phrase: "you need to", reason: "directive phrasing - implies an instruction" },
  { phrase: "you have to", reason: "directive phrasing - implies an instruction" },
  { phrase: "we recommend", reason: "first-person recommendation - prohibited" },
  { phrase: "this is illegal", reason: "definitive legal conclusion - prohibited" },
  { phrase: "you will win", reason: "outcome prediction - prohibited" },
  { phrase: "you will lose", reason: "outcome prediction - prohibited" },
];

const ALLOWED_PHRASES = ["appears", "may", "consider", "in similar contracts", "warrants review"];

const FIXTURE_CHECKS: ReadonlyArray<{
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  terms: string[];
  finding: string;
}> = [
  {
    id: "privacy-controller-contact",
    title: "Controller or operator contact path",
    severity: "high",
    terms: ["contact", "privacy"],
    finding: "The public fixture text did not include the configured privacy contact signal.",
  },
  {
    id: "privacy-data-use",
    title: "Data collection and use disclosure",
    severity: "high",
    terms: ["collect", "use"],
    finding: "The public fixture text did not include the configured data collection and use signal.",
  },
  {
    id: "privacy-retention-transfer",
    title: "Retention or transfer disclosure",
    severity: "medium",
    terms: ["retain", "third party"],
    finding: "The public fixture text did not include the configured retention or transfer signal.",
  },
  {
    id: "tos-liability-indemnity",
    title: "Liability and indemnity visibility",
    severity: "high",
    terms: ["liability", "indemnity"],
    finding: "The public fixture text did not include the configured liability and indemnity signal.",
  },
  {
    id: "tos-variation-termination",
    title: "Variation or termination signal",
    severity: "medium",
    terms: ["terminate", "change"],
    finding: "The public fixture text did not include the configured variation or termination signal.",
  },
  {
    id: "tos-dispute-contact",
    title: "Dispute or support contact path",
    severity: "medium",
    terms: ["dispute", "support"],
    finding: "The public fixture text did not include the configured dispute or support signal.",
  },
  {
    id: "oss-manifest-licence",
    title: "Dependency licence manifest",
    severity: "high",
    terms: ["license", "dependency"],
    finding: "The public fixture text did not include the configured dependency licence signal.",
  },
  {
    id: "oss-attribution-copyleft",
    title: "Attribution or copyleft marker",
    severity: "medium",
    terms: ["attribution", "copyleft"],
    finding: "The public fixture text did not include the configured attribution or copyleft signal.",
  },
  {
    id: "oss-patent-notice",
    title: "Patent or notice signal",
    severity: "low",
    terms: ["patent", "notice"],
    finding: "The public fixture text did not include the configured patent or notice signal.",
  },
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function disclaimerLength(value: unknown): DisclaimerLength {
  return value === "chat" || value === "tos" ? value : "results";
}

function normalizeText(value: string): string {
  return value.toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}

function buildRunId(input: unknown): string {
  return `legalpass_${createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex")
    .slice(0, 12)}`;
}

function fixtureSummary(text: string) {
  const normalized = normalizeText(text);
  const items = FIXTURE_CHECKS.map((check) => {
    const passed = check.terms.every((term) => normalized.includes(normalizeText(term)));
    return {
      item_id: check.id,
      title: check.title,
      severity: check.severity,
      verdict: passed ? "check" : "fail",
      finding: passed
        ? `${check.title} appears in the public fixture text.`
        : `${check.finding} This is an issue-spotting flag only.`,
    };
  });
  const check = items.filter((item) => item.verdict === "check").length;
  const fail = items.filter((item) => item.verdict === "fail").length;
  return {
    total: items.length,
    check,
    fail,
    pass_rate: Math.round((check / items.length) * 100),
    items,
  };
}

export function lintLegalPassVerdict(text: string): Array<{ phrase: string; index: number; reason: string }> {
  const issues: Array<{ phrase: string; index: number; reason: string }> = [];
  for (const { phrase, reason } of FORBIDDEN_PHRASES) {
    const pattern = new RegExp(`\\b${escapeRegex(phrase)}\\b`, "gi");
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      issues.push({ phrase, index: match.index, reason });
    }
  }
  return issues.sort((a, b) => a.index - b.index);
}

export async function legalpassRun(args: Record<string, unknown>): Promise<unknown> {
  const packId = typeof args.pack_id === "string" && args.pack_id ? args.pack_id : "legalpass-mvp-v0";
  const target = args.target && typeof args.target === "object" && !Array.isArray(args.target)
    ? args.target as Record<string, unknown>
    : null;
  const profile = typeof args.profile === "string" ? args.profile : "smoke";
  const jurisdictions = Array.isArray(args.jurisdictions) ? args.jurisdictions.filter((item) => typeof item === "string") : [];

  if (!target || typeof target.kind !== "string") {
    return { error: "target.kind is required" };
  }

  const fixtureText = typeof args.fixture_text === "string" ? args.fixture_text.trim() : "";
  if (fixtureText) {
    const summary = fixtureSummary(fixtureText);
    return {
      status: "complete",
      pass: "legalpass",
      run_id: buildRunId({ packId, target, profile, jurisdictions, fixtureText }),
      pack_id: packId,
      target,
      profile,
      jurisdictions,
      summary: {
        total: summary.total,
        check: summary.check,
        fail: summary.fail,
        pass_rate: summary.pass_rate,
      },
      items: summary.items,
      disclaimer: DISCLAIMERS.results,
      note:
        "LegalPass ran a deterministic public fixture issue-spotter pass. It did not fetch private data, draft legal text, or give legal advice.",
      safety: {
        issue_spotter_only: true,
        no_legal_advice: true,
        no_transactional_instrument: true,
      },
    };
  }

  return {
    status: "planned",
    pass: "legalpass",
    pack_id: packId,
    target,
    profile,
    jurisdictions,
    disclaimer: DISCLAIMERS.chat,
    note:
      "LegalPass MCP exposure is scaffold-only. It returns the guarded run plan now; full 12-hat execution lands in a later LegalPass engine chip.",
    safety: {
      issue_spotter_only: true,
      no_legal_advice: true,
      no_transactional_instrument: true,
    },
  };
}

export async function legalpassVerdict(args: Record<string, unknown>): Promise<unknown> {
  const verdictText = typeof args.verdict_text === "string" ? args.verdict_text : "";
  const length = disclaimerLength(args.disclaimer_length);
  const issues = verdictText ? lintLegalPassVerdict(verdictText) : [];
  return {
    ok: issues.length === 0,
    safe_to_emit: issues.length === 0,
    issues,
    allowed_framing: ALLOWED_PHRASES,
    disclaimer_length: length,
    disclaimer: DISCLAIMERS[length],
  };
}
