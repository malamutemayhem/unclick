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
  installState: string;
  description: string;
}

export const SKILL_LIBRARY_CATEGORIES = [
  "Review",
  "Research",
  "Planning",
  "Safety",
] as const;

export const CURATED_SKILL_PREVIEWS: CuratedSkillPreview[] = [
  {
    id: "pr-review-compat",
    name: "PR Monitor and Reviewer",
    category: "Review",
    source: "OpenClaw compatibility input",
    provenance: "External SKILL.md pattern, quarantined for UnClick review",
    license: "License review required",
    version: "upstream preview",
    contentHash: "pending import hash",
    riskState: "quarantined",
    permissions: ["GitHub read after approval", "No write access", "No credential access"],
    installState: "Preview only, no live install or execution",
    description: "Turns useful PR review procedures into inspectable UnClick skill candidates before any connector power is granted.",
  },
  {
    id: "research-pack",
    name: "Research Pack",
    category: "Research",
    source: "AgentSkills-compatible import draft",
    provenance: "Content-only prompt package, pending native rebuild",
    license: "Permissive source preferred",
    version: "v0 catalog draft",
    contentHash: "content hash generated on import",
    riskState: "reviewed",
    permissions: ["Browser read after approval", "No shell", "No OAuth scopes"],
    installState: "Forkable draft, reversible copy path",
    description: "Collects source reading, synthesis, and proof notes without giving the package direct runtime authority.",
  },
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
    installState: "Native rebuild target",
    description: "Explains provenance, permissions, and risk so external skills stay discovery input rather than trust authority.",
  },
];

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
