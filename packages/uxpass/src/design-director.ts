import {
  evaluateVisualAuditSnapshot,
  visualIssuesByKind,
  type VisualAuditIssue,
  type VisualAuditIssueKind,
  type VisualAuditSnapshot,
  type VisualAuditSummary,
} from "./visual-audit.js";

export type PageArchetype =
  | "data_grid"
  | "dashboard"
  | "form"
  | "content_page"
  | "unknown";

export type DesignDirectivePriority = "critical" | "high" | "medium" | "low";

export interface DesignDirective {
  id: string;
  priority: DesignDirectivePriority;
  title: string;
  why: string;
  actions: string[];
  evidence: {
    issue_kinds: VisualAuditIssueKind[];
    selectors: string[];
    issue_count: number;
  };
}

export interface VisualDesignDirectorReport {
  archetype: PageArchetype;
  issue_count: number;
  headline: string;
  directives: DesignDirective[];
  builder_brief: string;
  guardrails: string[];
}

const PRIORITY_WEIGHT: Record<DesignDirectivePriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

function compactText(value: string | undefined | null): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function visibleElements(snapshot: VisualAuditSnapshot) {
  return snapshot.elements.filter((element) => {
    if (element.visible === false) return false;
    return element.rect.width > 0 && element.rect.height > 0;
  });
}

export function inferPageArchetype(snapshot: VisualAuditSnapshot): PageArchetype {
  const elements = visibleElements(snapshot);
  const text = elements.map((element) => compactText(element.text).toLowerCase()).filter(Boolean);
  const tags = elements.map((element) => element.tagName.toLowerCase());
  const roles = elements.map((element) => (element.role ?? "").toLowerCase()).filter(Boolean);
  const classNames = elements.map((element) => element.className ?? "").join(" ").toLowerCase();

  const gridSignals =
    tags.filter((tag) => tag === "table" || tag === "tr" || tag === "td" || tag === "th").length
    + roles.filter((role) => ["grid", "row", "cell", "columnheader"].includes(role)).length
    + text.filter((value) => /\b(status|priority|worker|proof|progress|job|owner|state)\b/.test(value)).length;
  if (gridSignals >= 5 || /\btable\b|\bdata-grid\b|\brow\b/.test(classNames)) return "data_grid";

  const formSignals =
    tags.filter((tag) => ["form", "input", "select", "textarea", "label"].includes(tag)).length
    + roles.filter((role) => ["textbox", "combobox", "checkbox", "radio", "switch"].includes(role)).length;
  if (formSignals >= 4) return "form";

  const dashboardSignals = text.filter((value) => /\b(total|score|metric|alert|queue|active|backlog)\b/.test(value)).length;
  if (dashboardSignals >= 4) return "dashboard";

  const contentSignals = tags.filter((tag) => /^h[1-6]$/.test(tag) || ["p", "article", "section"].includes(tag)).length;
  if (contentSignals >= 6) return "content_page";

  return "unknown";
}

function issuesForKinds(summary: VisualAuditSummary, kinds: VisualAuditIssueKind[]): VisualAuditIssue[] {
  return kinds.flatMap((kind) => visualIssuesByKind(summary, kind));
}

function selectorsFor(issues: VisualAuditIssue[]): string[] {
  return Array.from(new Set(issues.map((issue) => issue.selector).filter((selector): selector is string => !!selector))).slice(0, 8);
}

function directive(
  id: string,
  priority: DesignDirectivePriority,
  title: string,
  why: string,
  actions: string[],
  kinds: VisualAuditIssueKind[],
  summary: VisualAuditSummary,
): DesignDirective | null {
  const issues = issuesForKinds(summary, kinds);
  if (issues.length === 0) return null;
  return {
    id,
    priority,
    title,
    why,
    actions,
    evidence: {
      issue_kinds: kinds,
      selectors: selectorsFor(issues),
      issue_count: issues.length,
    },
  };
}

function archetypeGuardrails(archetype: PageArchetype): string[] {
  if (archetype === "data_grid") {
    return [
      "Keep repeated rows dense but not cramped: one primary label, one owner/status cluster, one proof/action area.",
      "Use row expansion or a side panel for secondary metadata instead of adding more badges.",
      "Treat horizontal overflow and clipped text as release blockers on admin boards.",
    ];
  }
  if (archetype === "form") {
    return [
      "Keep labels, help text, errors, and actions visually adjacent.",
      "Prefer clear field grouping over extra explanatory copy.",
      "Make every input and action target comfortable on mobile.",
    ];
  }
  if (archetype === "dashboard") {
    return [
      "Prioritise scan order: state first, exceptions second, raw counts last.",
      "Do not let metric cards compete with the primary work list.",
      "Use consistent status language across cards, tables, and alerts.",
    ];
  }
  if (archetype === "content_page") {
    return [
      "Protect reading rhythm with generous line height and predictable section breaks.",
      "Keep actions visually quieter than the content unless they are the main task.",
      "Avoid hiding key meaning inside truncated headings.",
    ];
  }
  return [
    "Establish the page's primary task before adding more visual elements.",
    "Fix containment, hierarchy, target size, and contrast before decorative polish.",
    "Make the next useful action obvious above the fold.",
  ];
}

function headlineFor(archetype: PageArchetype, summary: VisualAuditSummary): string {
  if (summary.issueCount === 0) return "No browser-backed visual issues detected.";
  if (archetype === "data_grid") return "This data-heavy surface needs containment and scan-order repair before polish.";
  if (archetype === "form") return "This form needs target, contrast, and field-grouping repair before polish.";
  if (archetype === "dashboard") return "This dashboard needs clearer hierarchy and exception handling before polish.";
  return "This surface needs layout containment and hierarchy repair before visual polish.";
}

function builderBrief(report: Omit<VisualDesignDirectorReport, "builder_brief">): string {
  if (report.directives.length === 0) {
    return `UXPass director: ${report.archetype}. Keep the visual baseline, then verify with screenshots across mobile, tablet, and desktop.`;
  }
  const top = report.directives.slice(0, 3).map((item, index) => {
    const action = item.actions[0] ?? item.title;
    return `${index + 1}. ${item.title}: ${action}`;
  });
  return [
    `UXPass director: ${report.archetype}. ${report.headline}`,
    ...top,
    "Do not count the fix complete without before/after screenshot proof and a rerun of the visual audit.",
  ].join("\n");
}

export function buildVisualDesignDirectorReport(
  snapshot: VisualAuditSnapshot,
  summary: VisualAuditSummary = evaluateVisualAuditSnapshot(snapshot),
): VisualDesignDirectorReport {
  const archetype = inferPageArchetype(snapshot);
  const rawDirectives = [
    directive(
      "layout-containment",
      "high",
      "Repair layout containment first",
      "Text or page content is escaping its viewport or parent box, which makes every later polish pass unreliable.",
      [
        "Replace fixed-width children with minmax(0, 1fr), max-width, wrapping, or responsive grid tracks.",
        "Audit tables, badge groups, and metadata cells at mobile and desktop widths.",
        "Block release until horizontal scroll and text escape are gone.",
      ],
      ["horizontal_overflow", "text_out_of_bounds"],
      summary,
    ),
    directive(
      "silent-truncation",
      "high",
      "Stop silent truncation",
      "Users cannot trust the interface when important labels are cropped without a full visible, hover, or accessible fallback.",
      [
        "Let primary names wrap to two lines or move long metadata into an expanded row/detail panel.",
        "Keep truncation only for secondary data and provide a full title or aria-label.",
        "Retest the longest real job, project, or customer name, not a short fixture.",
      ],
      ["clipped_text"],
      summary,
    ),
    directive(
      "density-hierarchy",
      "medium",
      "Reduce competing inline metadata",
      "Badge-heavy and text-heavy first screens make the page look busy while hiding the actual next action.",
      [
        "Collapse secondary chips into one summary state or a grouped progress cell.",
        "Give rows a clear scan path: primary label, state, owner, proof/action.",
        "Move low-priority detail into expansion, hover, or a side panel.",
      ],
      ["badge_overload", "dense_first_screen"],
      summary,
    ),
    directive(
      "interaction-targets",
      "high",
      "Make controls comfortable to hit",
      "Tiny buttons and links create mistakes, especially in dense admin surfaces.",
      [
        "Increase every interactive hit area to at least 24 by 24 CSS pixels.",
        "Use icon buttons with stable dimensions and tooltips instead of tiny text fragments.",
        "Keep adjacent controls spaced enough that touch and mouse use are both reliable.",
      ],
      ["small_target"],
      summary,
    ),
    directive(
      "contrast-tokens",
      "high",
      "Fix contrast at the token level",
      "Low contrast usually repeats across badges, buttons, and muted metadata, so one-off colour tweaks do not hold.",
      [
        "Adjust foreground/background token pairs rather than individual component overrides.",
        "Verify normal text reaches 4.5:1 and large/bold text reaches 3:1.",
        "Retest dark and light themes before claiming the fix.",
      ],
      ["low_contrast"],
      summary,
    ),
  ].filter((item): item is DesignDirective => item !== null);

  const directives = rawDirectives.sort((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]);
  const reportWithoutBrief = {
    archetype,
    issue_count: summary.issueCount,
    headline: headlineFor(archetype, summary),
    directives,
    guardrails: archetypeGuardrails(archetype),
  };

  return {
    ...reportWithoutBrief,
    builder_brief: builderBrief(reportWithoutBrief),
  };
}
