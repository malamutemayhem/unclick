import { parseSkillMarkdown } from "./skillLibrary";

export const CATEGORIES = [
  "Utility",
  "Text",
  "Data",
  "Media",
  "Network",
  "Security",
  "Storage",
  "Platform",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CommunityTool {
  id: string;
  name: string;
  endpointUrl: string;
  description: string;
  category: Category;
  docsUrl?: string;
  githubUrl?: string;
  healthStatus: "live" | "under-review";
  submittedAt: string;
}

export type SkillRiskState = "quarantined" | "reviewed" | "native-ready";

export interface CuratedSkillPreview {
  id: string;
  name: string;
  category: string;
  source: string;
  provenance: string;
  license: string;
  version: string;
  contentHash: string;
  riskState: SkillRiskState;
  permissions: string[];
  receiptSummary: string;
  requirements: string[];
  reviewWarnings: string[];
  installState: string;
  description: string;
}

export const SKILL_LIBRARY_CATEGORIES = [
  "Review",
  "Research",
  "Planning",
  "Safety",
] as const;

const PR_REVIEW_COMPAT_SKILL = `---
name: PR Monitor and Reviewer
description: Reviews pull requests and records findings for humans.
license: MIT-0
version: 1.2.0
origin: OpenClaw compatibility input
repo: https://github.com/example/skills
commit: reviewed-later
permissions:
  - GitHub read after approval
metadata:
  openclaw:
    requires:
      bins:
        - gh
    install:
      - kind: node
        package: "@example/pr-monitor"
        bins: [pr-monitor]
---
# PR Monitor and Reviewer

Read pull request diffs, summarize risks, and leave a proof note for review. The package stays inert until UnClick review approves the fork.
`;

const RESEARCH_PACK_SKILL = `---
name: Research Pack
description: Collects source reading, synthesis, and proof notes for a human reviewer.
license: MIT
version: 0.1.0
origin: AgentSkills-compatible import draft
repo: https://github.com/example/research-pack
commit: native-rebuild-pending
domains:
  - docs.openclaw.ai
---
# Research Pack

Use browser read after approval, cite sources, and write a compact evidence note inside the UnClick review lane.
`;

export const CURATED_SKILL_PREVIEWS: CuratedSkillPreview[] = [
  buildCuratedSkillPreview({
    id: "pr-review-compat",
    category: "Review",
    markdown: PR_REVIEW_COMPAT_SKILL,
    installState: "Preview only, no live install or execution",
    provenance: "External SKILL.md pattern, quarantined for UnClick review",
  }),
  buildCuratedSkillPreview({
    id: "research-pack",
    category: "Research",
    markdown: RESEARCH_PACK_SKILL,
    installState: "Forkable draft, reversible copy path",
    provenance: "Content-only prompt package, pending native rebuild",
    riskState: "reviewed",
  }),
  {
    id: "skill-vetter",
    name: "Skill Vetter",
    category: "Safety",
    source: "UnClick-native candidate",
    provenance: "Built from ecosystem ideas under UnClick Safety Checker rules",
    license: "UnClick first-party",
    version: "native v0",
    contentHash: "first-party tracked",
    riskState: "native-ready",
    permissions: ["Catalog read", "Risk labels", "No external execution"],
    receiptSummary: "Native UnClick review tool. It inspects external skills without granting their requested permissions.",
    requirements: ["No external execution"],
    reviewWarnings: [],
    installState: "Native rebuild target",
    description: "Explains provenance, permissions, and risk so external skills stay discovery input rather than trust authority.",
  },
];

function buildCuratedSkillPreview({
  id,
  category,
  markdown,
  installState,
  provenance,
  riskState,
}: {
  id: string;
  category: string;
  markdown: string;
  installState: string;
  provenance: string;
  riskState?: SkillRiskState;
}): CuratedSkillPreview {
  const parsed = parseSkillMarkdown(markdown);
  const { spec } = parsed;
  return {
    id,
    name: spec.name,
    category,
    source: spec.source.origin,
    provenance,
    license: spec.license.value ?? "License review required",
    version: spec.upstreamVersion ?? "upstream preview",
    contentHash: spec.contentHash,
    riskState: riskState ?? (spec.reviewState === "needs_review" ? "quarantined" : "reviewed"),
    permissions: spec.permissionReceipt.grants.length > 0 ? spec.permissionReceipt.grants : ["No automatic grants"],
    receiptSummary: spec.permissionReceipt.summary,
    requirements: spec.permissionReceipt.requirements,
    reviewWarnings: spec.permissionReceipt.reviewWarnings,
    installState,
    description: spec.description,
  };
}

const STORAGE_KEY = "unclick_community_tools";

export function getCommunityTools(): CommunityTool[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCommunityTool(tool: CommunityTool): void {
  const existing = getCommunityTools();
  const updated = [...existing.filter((t) => t.id !== tool.id), tool];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export const TOOL_SUBMITTED_EVENT = "unclick:tool-submitted";
