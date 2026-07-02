export const UI_TOOLBOX_GATE_IDS = [
  "source-provenance",
  "license-ok",
  "a11y-primitive",
  "design-system-fit",
  "mobile-fit",
  "reduced-motion",
  "performance-budget",
  "brand-fit",
  "product-specificity",
  "screenshot-proof",
] as const;

export type UIToolboxGateId = typeof UI_TOOLBOX_GATE_IDS[number];

export const UI_TOOLBOX_SOURCE_IDS = [
  "shadcn-ui",
  "radix-ui",
  "react-aria-components",
  "base-ui",
  "floating-ui",
  "motion",
  "framer-motion",
  "lucide-react",
  "styling-primitives",
  "21st-dev",
  "magic-ui",
  "aceternity-ui",
  "origin-ui",
  "cmdk",
  "sonner",
  "embla-carousel",
  "vaul",
  "ui-ux-pro-max",
] as const;

export type UIToolboxSourceId = typeof UI_TOOLBOX_SOURCE_IDS[number];
export type UIToolboxTier = "core" | "recommended" | "specialist" | "advisory" | "watch";
export type UIToolboxRisk = "low" | "medium" | "high";
export type UIToolboxAssessmentStatus = "approved" | "needs-proof" | "blocked" | "unknown-source";

export interface UIToolboxSource {
  id: UIToolboxSourceId;
  name: string;
  tier: UIToolboxTier;
  risk: UIToolboxRisk;
  url: string;
  best_for: string[];
  install_hint: string;
  use_when: string;
  avoid_when: string;
  required_gates: UIToolboxGateId[];
  notes: string;
}

export interface UIToolboxCandidateInput {
  source_id: string;
  component_name?: string;
  intended_use?: string;
  evidence?: Partial<Record<UIToolboxGateId, boolean | string>>;
}

export interface UIToolboxAssessment {
  source_id: string;
  source_name?: string;
  status: UIToolboxAssessmentStatus;
  tier?: UIToolboxTier;
  risk?: UIToolboxRisk;
  required_gates: UIToolboxGateId[];
  missing_gates: UIToolboxGateId[];
  warnings: string[];
  next_action: string;
}

export interface UIToolboxScoreboard {
  total: number;
  approved: number;
  needs_proof: number;
  blocked: number;
  unknown_source: number;
  by_tier: Partial<Record<UIToolboxTier, number>>;
  missing_gate_counts: Partial<Record<UIToolboxGateId, number>>;
  recommended_next_action: string;
}

export const UI_TOOLBOX_GATE_LABELS: Record<UIToolboxGateId, string> = {
  "source-provenance": "Source, author, install command, and origin URL are recorded.",
  "license-ok": "License or usage rights are acceptable for the target product.",
  "a11y-primitive": "Interactive behavior uses an accessibility-tested primitive or equivalent proof.",
  "design-system-fit": "Styles fit local tokens, spacing, components, and naming conventions.",
  "mobile-fit": "Mobile viewport proof shows no overlap, clipping, or unusable interaction.",
  "reduced-motion": "Motion respects prefers-reduced-motion and has a static fallback.",
  "performance-budget": "Bundle, animation, media, and layout-shift cost are inside budget.",
  "brand-fit": "The component supports the product tone instead of adding generic visual noise.",
  "product-specificity": "The surface shows real product mechanics and avoids generic AI/template sameness.",
  "screenshot-proof": "Before/after screenshots or visual run evidence exist for the target surface.",
};

const FOUNDATION_GATES: UIToolboxGateId[] = [
  "source-provenance",
  "license-ok",
  "a11y-primitive",
  "design-system-fit",
  "mobile-fit",
  "screenshot-proof",
];

const MOTION_GATES: UIToolboxGateId[] = [
  "source-provenance",
  "license-ok",
  "design-system-fit",
  "mobile-fit",
  "reduced-motion",
  "performance-budget",
  "brand-fit",
  "product-specificity",
  "screenshot-proof",
];

const COMMUNITY_GATES: UIToolboxGateId[] = [
  "source-provenance",
  "license-ok",
  "a11y-primitive",
  "design-system-fit",
  "mobile-fit",
  "reduced-motion",
  "performance-budget",
  "brand-fit",
  "product-specificity",
  "screenshot-proof",
];

export const UI_TOOLBOX_SOURCES: UIToolboxSource[] = [
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    tier: "core",
    risk: "low",
    url: "https://ui.shadcn.com/",
    best_for: ["React", "Tailwind", "owned component code", "registry workflow"],
    install_hint: "Use the shadcn CLI, then own and adapt the copied component files.",
    use_when: "A React/Tailwind app needs polished baseline components that stay editable in-repo.",
    avoid_when: "The app is not React/Tailwind or the team cannot maintain copied component code.",
    required_gates: FOUNDATION_GATES,
    notes: "Default styled layer. Pair with Radix, React Aria, or Base UI for complex interaction semantics.",
  },
  {
    id: "radix-ui",
    name: "Radix UI Primitives",
    tier: "core",
    risk: "low",
    url: "https://www.radix-ui.com/primitives/docs",
    best_for: ["dialogs", "menus", "popovers", "tabs", "accessible primitives"],
    install_hint: "Install the specific @radix-ui/react-* primitive or use it through shadcn/ui.",
    use_when: "A custom control needs focus management, keyboard behavior, and ARIA handled by a proven primitive.",
    avoid_when: "The native HTML element already solves the interaction cleanly.",
    required_gates: FOUNDATION_GATES,
    notes: "Preferred accessibility floor for shadcn-style React apps already using Radix wrappers.",
  },
  {
    id: "react-aria-components",
    name: "React Aria Components",
    tier: "core",
    risk: "low",
    url: "https://react-spectrum.adobe.com/react-aria/components.html",
    best_for: ["forms", "pickers", "tables", "internationalization", "advanced accessibility"],
    install_hint: "Install react-aria-components and style with the local design system.",
    use_when: "A complex control needs strong accessibility, internationalization, and cross-device behavior.",
    avoid_when: "A small shadcn/Radix wrapper already fits the existing app with less surface area.",
    required_gates: FOUNDATION_GATES,
    notes: "Best heavy-duty accessibility option when components need more than basic primitives.",
  },
  {
    id: "base-ui",
    name: "Base UI",
    tier: "core",
    risk: "low",
    url: "https://base-ui.com/",
    best_for: ["unstyled components", "future-proof component libraries", "accessible app primitives"],
    install_hint: "Install @base-ui-components/react and style with local CSS or Tailwind.",
    use_when: "A project wants accessible unstyled primitives with direct control over every visual layer.",
    avoid_when: "The app already standardizes on Radix/shadcn and does not need another primitive layer.",
    required_gates: FOUNDATION_GATES,
    notes: "Strong modern primitive candidate from the Base UI, Radix, Floating UI, and MUI design lineage.",
  },
  {
    id: "floating-ui",
    name: "Floating UI",
    tier: "specialist",
    risk: "low",
    url: "https://floating-ui.com/docs/react",
    best_for: ["tooltips", "popovers", "dropdown positioning", "collision handling"],
    install_hint: "Use @floating-ui/react for interactions or @floating-ui/react-dom for positioning only.",
    use_when: "A floating element must stay anchored and avoid viewport collision across layouts.",
    avoid_when: "A complete accessible primitive such as Radix, React Aria, or Base UI already handles the whole control.",
    required_gates: FOUNDATION_GATES,
    notes: "Positioning engine, not a visual component library. Great underneath custom polished controls.",
  },
  {
    id: "motion",
    name: "Motion for React",
    tier: "core",
    risk: "medium",
    url: "https://motion.dev/docs/react",
    best_for: ["micro-interactions", "layout animation", "gesture animation", "motion design"],
    install_hint: "Install motion and import from motion/react for new React work.",
    use_when: "Animation improves comprehension, state change, or brand feel.",
    avoid_when: "The motion is decorative, blocks interaction, causes layout shift, or lacks reduced-motion fallback.",
    required_gates: MOTION_GATES,
    notes: "Preferred modern animation package for new work. Motion must be purposeful and prove reduced-motion behavior.",
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    tier: "watch",
    risk: "medium",
    url: "https://motion.dev/docs/react-installation",
    best_for: ["legacy compatibility", "existing codebases", "community snippets"],
    install_hint: "Prefer motion for new work; keep framer-motion only when the existing app or source component already uses it.",
    use_when: "A current component depends on framer-motion and migration would be more risk than value.",
    avoid_when: "Starting a new animation layer from scratch.",
    required_gates: MOTION_GATES,
    notes: "Common in older component snippets. Treat as compatibility, not the default recommendation.",
  },
  {
    id: "lucide-react",
    name: "Lucide React",
    tier: "core",
    risk: "low",
    url: "https://lucide.dev/",
    best_for: ["icons", "icon buttons", "toolbars", "navigation"],
    install_hint: "Use lucide-react icons for recognizable actions before inventing custom SVGs.",
    use_when: "A control needs a standard icon or icon-plus-label pattern.",
    avoid_when: "The icon meaning would be ambiguous without a label or tooltip.",
    required_gates: ["source-provenance", "license-ok", "design-system-fit", "mobile-fit", "screenshot-proof"],
    notes: "Baseline icon source for UIPass. Pair unfamiliar icons with tooltips or visible labels.",
  },
  {
    id: "styling-primitives",
    name: "clsx, tailwind-merge, class-variance-authority",
    tier: "core",
    risk: "low",
    url: "https://ui.shadcn.com/docs/installation",
    best_for: ["variants", "class merging", "component styling hygiene"],
    install_hint: "Use the repo's existing cn helper and variant pattern before adding a new styling abstraction.",
    use_when: "A component needs variants, sizes, states, or conditional Tailwind classes.",
    avoid_when: "A one-off style can stay simpler with plain className.",
    required_gates: ["source-provenance", "license-ok", "design-system-fit", "screenshot-proof"],
    notes: "Keeps copied components from becoming fragile Tailwind string soup.",
  },
  {
    id: "21st-dev",
    name: "21st.dev Community Components",
    tier: "recommended",
    risk: "medium",
    url: "https://21st.dev/community/components/s/21st-dev",
    best_for: ["AI-assisted UI sourcing", "React/Tailwind components", "shadcn registry URLs", "idea mining"],
    install_hint: "Use npx shadcn@latest add <21st registry URL>, then review and own the copied files.",
    use_when: "A project needs a faster starting point for a known UI pattern and the source has a clear author and registry URL.",
    avoid_when: "The component has unclear provenance, heavy visual effects, missing accessibility behavior, or no mobile proof.",
    required_gates: COMMUNITY_GATES,
    notes: "Highly useful discovery layer, but community components must pass provenance, accessibility, reduced-motion, mobile, and screenshot proof.",
  },
  {
    id: "magic-ui",
    name: "Magic UI",
    tier: "recommended",
    risk: "medium",
    url: "https://magicui.design/docs/components",
    best_for: ["animated accents", "landing-page polish", "micro-effects", "shadcn-adjacent components"],
    install_hint: "Install only the specific component or copy the source, then adapt tokens and motion.",
    use_when: "A page needs one tasteful effect that supports the product story.",
    avoid_when: "Multiple effects would dominate the interface or distract from the task.",
    required_gates: MOTION_GATES,
    notes: "Good sparkle when restrained. UIPass should reject effect stacking and motion without fallback.",
  },
  {
    id: "aceternity-ui",
    name: "Aceternity UI",
    tier: "recommended",
    risk: "medium",
    url: "https://ui.aceternity.com/components",
    best_for: ["hero sections", "scroll interactions", "animated landing components", "high-impact demos"],
    install_hint: "Use the shadcn-compatible install command when available; otherwise copy source with attribution notes.",
    use_when: "A marketing or showcase surface needs a memorable interaction and can afford the QA budget.",
    avoid_when: "The target is a dense admin/work tool, mobile viewport, or performance-sensitive route.",
    required_gates: COMMUNITY_GATES,
    notes: "Strong for wow moments. Strict gate: no giant spacer hacks, no unbounded scroll effects, no missing reduced-motion path.",
  },
  {
    id: "origin-ui",
    name: "Origin UI",
    tier: "recommended",
    risk: "medium",
    url: "https://originui.com/",
    best_for: ["application UI", "forms", "tables", "navigation", "copy-paste React/Tailwind patterns"],
    install_hint: "Copy the smallest useful pattern and map it to existing local components.",
    use_when: "A practical app control needs a polished variation faster than designing from zero.",
    avoid_when: "The copied pattern would bypass local design-system components or duplicate primitives.",
    required_gates: FOUNDATION_GATES,
    notes: "Useful pattern library for work-focused interfaces when adapted to local components.",
  },
  {
    id: "cmdk",
    name: "cmdk",
    tier: "specialist",
    risk: "low",
    url: "https://cmdk.paco.me/",
    best_for: ["command palettes", "searchable action menus"],
    install_hint: "Use through shadcn command wrappers where the repo already follows that pattern.",
    use_when: "The user needs fast keyboard-first navigation or command execution.",
    avoid_when: "A simple search field or menu is enough.",
    required_gates: FOUNDATION_GATES,
    notes: "High leverage for power-user admin surfaces when accessibility and keyboard behavior are verified.",
  },
  {
    id: "sonner",
    name: "Sonner",
    tier: "specialist",
    risk: "low",
    url: "https://sonner.emilkowal.ski/",
    best_for: ["toast notifications", "receipt feedback", "non-blocking status"],
    install_hint: "Use through existing shadcn toast/sonner wrappers when present.",
    use_when: "The user needs lightweight feedback after actions.",
    avoid_when: "The message is critical enough to require an inline error, modal, or persistent receipt.",
    required_gates: ["source-provenance", "license-ok", "design-system-fit", "mobile-fit", "screenshot-proof"],
    notes: "Good for action feedback, not a substitute for receipts or durable status.",
  },
  {
    id: "embla-carousel",
    name: "Embla Carousel",
    tier: "specialist",
    risk: "medium",
    url: "https://www.embla-carousel.com/",
    best_for: ["carousels", "sliders", "touch scrolling"],
    install_hint: "Use only when carousel behavior is genuinely needed and keyboard/touch proof exists.",
    use_when: "Content benefits from horizontal browsing and all items remain reachable without drag-only interaction.",
    avoid_when: "A grid, tabs, or simple list would be clearer.",
    required_gates: FOUNDATION_GATES,
    notes: "Carousels are often a UX smell. UIPass should force reachability and mobile proof.",
  },
  {
    id: "vaul",
    name: "Vaul",
    tier: "specialist",
    risk: "medium",
    url: "https://vaul.emilkowal.ski/",
    best_for: ["mobile drawers", "bottom sheets", "touch-first overlays"],
    install_hint: "Use when a bottom sheet is the right mobile interaction and desktop has an equivalent.",
    use_when: "A mobile surface needs a familiar drawer interaction with controlled focus and escape behavior.",
    avoid_when: "A normal dialog, page, or inline expansion would be simpler.",
    required_gates: FOUNDATION_GATES,
    notes: "Mobile-first overlays need extra focus, escape, and viewport testing.",
  },
  {
    id: "ui-ux-pro-max",
    name: "UI UX Pro Max Skill",
    tier: "advisory",
    risk: "medium",
    url: "https://ui-ux-pro-max-skill.com/docs/faq/",
    best_for: ["design research", "style search", "AI assistant guidance", "taste calibration"],
    install_hint: "Use uipro init for assistant-side design intelligence, not as a runtime component dependency.",
    use_when: "A worker needs design intelligence, style references, or UI critique prompts before building.",
    avoid_when: "A component source, license proof, runtime dependency, or visual evidence is required.",
    required_gates: ["source-provenance", "license-ok"],
    notes: "Advisory only. It can inform UIPass, but it cannot replace screenshots, accessibility proof, or source receipts.",
  },
];

const SOURCES_BY_ID = new Map<string, UIToolboxSource>(
  UI_TOOLBOX_SOURCES.map((source) => [source.id, source]),
);

function hasGateEvidence(value: boolean | string | undefined): boolean {
  if (value === true) return true;
  return typeof value === "string" && value.trim().length > 0;
}

function countByTier(assessments: UIToolboxAssessment[]): Partial<Record<UIToolboxTier, number>> {
  const out: Partial<Record<UIToolboxTier, number>> = {};
  for (const assessment of assessments) {
    if (!assessment.tier) continue;
    out[assessment.tier] = (out[assessment.tier] ?? 0) + 1;
  }
  return out;
}

function countMissingGates(assessments: UIToolboxAssessment[]): Partial<Record<UIToolboxGateId, number>> {
  const out: Partial<Record<UIToolboxGateId, number>> = {};
  for (const assessment of assessments) {
    for (const gate of assessment.missing_gates) {
      out[gate] = (out[gate] ?? 0) + 1;
    }
  }
  return out;
}

export function getUIToolboxSource(sourceId: string): UIToolboxSource | undefined {
  return SOURCES_BY_ID.get(sourceId);
}

export function recommendedUIToolboxSources(): UIToolboxSource[] {
  return UI_TOOLBOX_SOURCES.filter((source) => source.tier === "core" || source.tier === "recommended");
}

export function assessUIToolboxCandidate(input: UIToolboxCandidateInput): UIToolboxAssessment {
  const source = getUIToolboxSource(input.source_id);
  if (!source) {
    return {
      source_id: input.source_id,
      status: "unknown-source",
      required_gates: ["source-provenance", "license-ok", "screenshot-proof"],
      missing_gates: ["source-provenance", "license-ok", "screenshot-proof"],
      warnings: ["Unknown UI toolbox source. Do not use until it has a registry entry and review gates."],
      next_action: "Add the source to the UIPass toolbox registry or choose a recommended source.",
    };
  }

  const missing = source.required_gates.filter((gate) => !hasGateEvidence(input.evidence?.[gate]));
  const warnings: string[] = [];

  if (source.tier === "advisory") {
    warnings.push("Advisory source only. It can guide design decisions but cannot be treated as a component source.");
  }
  if (source.tier === "watch") {
    warnings.push("Watch-tier source. Prefer the current core source unless compatibility requires this one.");
  }
  if (source.risk !== "low") {
    warnings.push(`${source.risk} risk source. Keep the copied surface small and require visual proof.`);
  }

  const blocked = source.tier === "advisory";
  const status: UIToolboxAssessmentStatus = blocked
    ? "blocked"
    : missing.length === 0
      ? "approved"
      : "needs-proof";

  return {
    source_id: source.id,
    source_name: source.name,
    status,
    tier: source.tier,
    risk: source.risk,
    required_gates: source.required_gates,
    missing_gates: missing,
    warnings,
    next_action: status === "approved"
      ? "Use the smallest component slice, adapt it to local patterns, and keep the UIPass proof with the change."
      : status === "blocked"
        ? "Use this for research only, then choose a component source from the core or recommended toolbox."
        : `Collect missing proof: ${missing.map((gate) => UI_TOOLBOX_GATE_LABELS[gate]).join(" ")}`,
  };
}

export function buildUIToolboxScoreboard(candidates: UIToolboxCandidateInput[]): UIToolboxScoreboard {
  const assessments = candidates.map((candidate) => assessUIToolboxCandidate(candidate));
  const approved = assessments.filter((assessment) => assessment.status === "approved").length;
  const needsProof = assessments.filter((assessment) => assessment.status === "needs-proof").length;
  const blocked = assessments.filter((assessment) => assessment.status === "blocked").length;
  const unknown = assessments.filter((assessment) => assessment.status === "unknown-source").length;
  const missingGateCounts = countMissingGates(assessments);

  let recommendedNextAction = "Start with shadcn/ui plus Radix, React Aria, Base UI, or Motion when the target needs them.";
  if (blocked > 0 || unknown > 0) {
    recommendedNextAction = "Replace blocked or unknown sources before implementation.";
  } else if (needsProof > 0) {
    const topMissing = Object.entries(missingGateCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([gate]) => gate)[0];
    recommendedNextAction = topMissing
      ? `Close the most common missing gate first: ${UI_TOOLBOX_GATE_LABELS[topMissing as UIToolboxGateId]}`
      : "Collect missing UIPass proof before implementation.";
  } else if (approved > 0) {
    recommendedNextAction = "Implementation can proceed with small slices, screenshots, and local design-system adaptation.";
  }

  return {
    total: candidates.length,
    approved,
    needs_proof: needsProof,
    blocked,
    unknown_source: unknown,
    by_tier: countByTier(assessments),
    missing_gate_counts: missingGateCounts,
    recommended_next_action: recommendedNextAction,
  };
}
