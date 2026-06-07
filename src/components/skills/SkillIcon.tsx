// Small, consistent skill icon. Same fixed, rounded, category-tinted chip frame
// as AppIcon so the two libraries feel like one family and the grid never
// shifts. Skills have no brand domain to fetch a favicon from, so instead of a
// letter fallback we show a per-category glyph: it carries more meaning at a
// glance and keeps every row visually anchored.

import {
  Bug,
  ClipboardCheck,
  GitPullRequest,
  Globe,
  Brain,
  Microscope,
  Network,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_STYLE: Record<string, { tint: string; Icon: LucideIcon }> = {
  "agent-orchestration": { tint: "#61C1C4", Icon: Network },
  "browser-automation": { tint: "#22d3ee", Icon: Globe },
  "code-review": { tint: "#818cf8", Icon: SearchCheck },
  "debugging": { tint: "#fbbf24", Icon: Bug },
  "github-pr": { tint: "#c084fc", Icon: GitPullRequest },
  "memory-km": { tint: "#a78bfa", Icon: Brain },
  "research": { tint: "#38bdf8", Icon: Microscope },
  "safety": { tint: "#34d399", Icon: ShieldCheck },
  "security": { tint: "#f87171", Icon: ShieldAlert },
  "testing-qa": { tint: "#4ade80", Icon: ClipboardCheck },
};

const FALLBACK = { tint: "#9ca3af", Icon: Sparkles };

export function SkillIcon({ category, size = 22 }: { category: string; size?: number }) {
  const { tint, Icon } = CATEGORY_STYLE[category] ?? FALLBACK;
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border"
      style={{
        width: size,
        height: size,
        color: tint,
        borderColor: `${tint}33`,
        background: `${tint}1a`,
      }}
    >
      <Icon style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2} />
    </span>
  );
}
