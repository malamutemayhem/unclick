export type VisualAuditSeverity = "critical" | "high" | "medium" | "low";

export type VisualAuditIssueKind =
  | "horizontal_overflow"
  | "clipped_text"
  | "text_out_of_bounds"
  | "small_target"
  | "low_contrast"
  | "badge_overload"
  | "dense_first_screen";

export interface VisualRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface VisualAuditElement {
  id?: string;
  selector?: string;
  tagName: string;
  role?: string | null;
  text?: string;
  ariaLabel?: string | null;
  title?: string | null;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  rect: VisualRect;
  parentRect?: VisualRect | null;
  scrollWidth?: number;
  scrollHeight?: number;
  clientWidth?: number;
  clientHeight?: number;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  backgroundColor?: string;
}

export interface VisualAuditSnapshot {
  url?: string;
  capturedAt?: string;
  screenshotPath?: string | null;
  viewport: {
    name?: string;
    width: number;
    height: number;
  };
  document: {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
  };
  elements: VisualAuditElement[];
}

export interface VisualAuditIssue {
  kind: VisualAuditIssueKind;
  severity: VisualAuditSeverity;
  title: string;
  description: string;
  selector?: string;
  elementId?: string;
  evidence: Record<string, unknown>;
  remediation: string;
}

export interface VisualAuditSummary {
  issueCount: number;
  byKind: Record<VisualAuditIssueKind, number>;
  bySeverity: Record<VisualAuditSeverity, number>;
  issues: VisualAuditIssue[];
}

const ALL_KINDS: VisualAuditIssueKind[] = [
  "horizontal_overflow",
  "clipped_text",
  "text_out_of_bounds",
  "small_target",
  "low_contrast",
  "badge_overload",
  "dense_first_screen",
];

const ALL_SEVERITIES: VisualAuditSeverity[] = ["critical", "high", "medium", "low"];

const MIN_TOUCH_TARGET = 24;
const TEXT_CLIP_TOLERANCE = 2;

function compactText(value: string | undefined | null): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function visibleElements(snapshot: VisualAuditSnapshot): VisualAuditElement[] {
  return snapshot.elements.filter((element) => {
    if (element.visible === false) return false;
    const { width, height } = element.rect;
    return width > 0 && height > 0;
  });
}

function hasMeaningfulText(element: VisualAuditElement): boolean {
  return compactText(element.text).length >= 2;
}

function hasFallbackLabel(element: VisualAuditElement): boolean {
  return compactText(element.title).length > 0 || compactText(element.ariaLabel).length > 0;
}

function describeElement(element: VisualAuditElement): string {
  const selector = element.selector ? ` at ${element.selector}` : "";
  const text = compactText(element.text);
  return `${element.tagName.toLowerCase()}${selector}${text ? ` "${text.slice(0, 80)}"` : ""}`;
}

function isInteractive(element: VisualAuditElement): boolean {
  if (element.disabled) return false;
  const tag = element.tagName.toLowerCase();
  if (["button", "a", "input", "select", "textarea", "summary"].includes(tag)) return true;
  const role = (element.role ?? "").toLowerCase();
  if (["button", "link", "menuitem", "option", "checkbox", "radio", "switch", "tab"].includes(role)) return true;
  return /\bcursor-pointer\b|\bdata-\[state=/.test(element.className ?? "");
}

function isBadgeLike(element: VisualAuditElement): boolean {
  const text = compactText(element.text);
  if (text.length === 0 || text.length > 28) return false;
  const klass = element.className ?? "";
  const shortUpper = /^[A-Z0-9][A-Z0-9 /_-]{1,27}$/.test(text);
  return /\brounded\b|\bbadge\b|\bpill\b|\btag\b/i.test(klass) || shortUpper;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(value: string | undefined): RgbColor | null {
  if (!value) return null;
  const trimmed = value.trim();
  const rgb = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(",").map((part) => Number(part.trim()));
    if (parts.length >= 3 && parts.every((part, index) => index < 3 ? Number.isFinite(part) : true)) {
      return {
        r: parts[0],
        g: parts[1],
        b: parts[2],
        a: Number.isFinite(parts[3]) ? parts[3] : 1,
      };
    }
  }
  const hex = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const raw = hex[1];
    const full = raw.length === 3
      ? raw.split("").map((char) => `${char}${char}`).join("")
      : raw;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
      a: 1,
    };
  }
  return null;
}

function channelToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(color: RgbColor): number {
  return (0.2126 * channelToLinear(color.r)) + (0.7152 * channelToLinear(color.g)) + (0.0722 * channelToLinear(color.b));
}

export function contrastRatio(foreground: string | undefined, background: string | undefined): number | null {
  const fg = parseColor(foreground);
  const bg = parseColor(background);
  if (!fg || !bg || fg.a < 0.95 || bg.a < 0.95) return null;
  const lighter = Math.max(luminance(fg), luminance(bg));
  const darker = Math.min(luminance(fg), luminance(bg));
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

function contrastThreshold(element: VisualAuditElement): number {
  const fontSize = element.fontSize ?? 14;
  const rawWeight = typeof element.fontWeight === "number"
    ? element.fontWeight
    : Number.parseInt(String(element.fontWeight ?? "400"), 10);
  const weight = Number.isFinite(rawWeight) ? rawWeight : 400;
  const largeText = fontSize >= 18.66 || (fontSize >= 14 && weight >= 700);
  return largeText ? 3 : 4.5;
}

function pushIssue(issues: VisualAuditIssue[], issue: VisualAuditIssue): void {
  issues.push(issue);
}

export function evaluateVisualAuditSnapshot(snapshot: VisualAuditSnapshot): VisualAuditSummary {
  const issues: VisualAuditIssue[] = [];
  const elements = visibleElements(snapshot);
  const docOverflow = snapshot.document.scrollWidth - snapshot.document.clientWidth;

  if (docOverflow > TEXT_CLIP_TOLERANCE) {
    pushIssue(issues, {
      kind: "horizontal_overflow",
      severity: "high",
      title: "Page creates horizontal overflow",
      description: `Document is ${docOverflow}px wider than the viewport.`,
      evidence: {
        viewport_width: snapshot.document.clientWidth,
        scroll_width: snapshot.document.scrollWidth,
      },
      remediation: "Constrain wide children, tables, and fixed-width panels so the page never scrolls sideways on the tested viewport.",
    });
  }

  for (const element of elements) {
    const text = compactText(element.text);
    if (hasMeaningfulText(element)) {
      const clientWidth = element.clientWidth ?? element.rect.width;
      const clientHeight = element.clientHeight ?? element.rect.height;
      const clippedX = (element.scrollWidth ?? clientWidth) > clientWidth + TEXT_CLIP_TOLERANCE;
      const clippedY = (element.scrollHeight ?? clientHeight) > clientHeight + TEXT_CLIP_TOLERANCE;
      if ((clippedX || clippedY) && !hasFallbackLabel(element)) {
        pushIssue(issues, {
          kind: "clipped_text",
          severity: "high",
          title: "Visible text is clipped",
          description: `${describeElement(element)} is clipped without a full title or aria-label fallback.`,
          selector: element.selector,
          elementId: element.id,
          evidence: {
            text: text.slice(0, 120),
            client_width: clientWidth,
            scroll_width: element.scrollWidth ?? clientWidth,
            client_height: clientHeight,
            scroll_height: element.scrollHeight ?? clientHeight,
          },
          remediation: "Give the content room, wrap it, move lower-priority metadata to a detail panel, or provide a full hover/accessible label.",
        });
      }

      const outOfViewport = element.rect.left < -TEXT_CLIP_TOLERANCE
        || element.rect.right > snapshot.viewport.width + TEXT_CLIP_TOLERANCE;
      const parent = element.parentRect;
      const outOfParent = parent
        ? element.rect.left < parent.left - TEXT_CLIP_TOLERANCE
          || element.rect.right > parent.right + TEXT_CLIP_TOLERANCE
          || element.rect.top < parent.top - TEXT_CLIP_TOLERANCE
          || element.rect.bottom > parent.bottom + TEXT_CLIP_TOLERANCE
        : false;
      if (outOfViewport || outOfParent) {
        pushIssue(issues, {
          kind: "text_out_of_bounds",
          severity: "high",
          title: "Text runs outside its container",
          description: `${describeElement(element)} escapes ${outOfViewport ? "the viewport" : "its parent box"}.`,
          selector: element.selector,
          elementId: element.id,
          evidence: {
            text: text.slice(0, 120),
            rect: element.rect,
            parent_rect: element.parentRect ?? null,
            viewport: snapshot.viewport,
          },
          remediation: "Fix the layout constraint, grid track, min-width, or wrapping rule so text remains inside its visual box.",
        });
      }

      const ratio = contrastRatio(element.color, element.backgroundColor);
      const threshold = contrastThreshold(element);
      if (ratio !== null && ratio < threshold) {
        pushIssue(issues, {
          kind: "low_contrast",
          severity: "high",
          title: "Visible text misses contrast target",
          description: `${describeElement(element)} has ${ratio}:1 contrast, below ${threshold}:1.`,
          selector: element.selector,
          elementId: element.id,
          evidence: {
            text: text.slice(0, 120),
            contrast_ratio: ratio,
            required_ratio: threshold,
            color: element.color,
            background_color: element.backgroundColor,
          },
          remediation: "Increase foreground contrast or darken/lighten the background token for this state.",
        });
      }
    }

    if (isInteractive(element)) {
      const tooSmall = element.rect.width < MIN_TOUCH_TARGET || element.rect.height < MIN_TOUCH_TARGET;
      if (tooSmall) {
        pushIssue(issues, {
          kind: "small_target",
          severity: "high",
          title: "Interactive target is too small",
          description: `${describeElement(element)} is ${Math.round(element.rect.width)}x${Math.round(element.rect.height)}px.`,
          selector: element.selector,
          elementId: element.id,
          evidence: {
            width: element.rect.width,
            height: element.rect.height,
            minimum_css_px: MIN_TOUCH_TARGET,
          },
          remediation: "Increase hit area to at least 24 by 24 CSS pixels or add enough spacing to meet WCAG 2.2 target-size intent.",
        });
      }
    }
  }

  const chipRows = new Map<number, VisualAuditElement[]>();
  for (const element of elements.filter(isBadgeLike)) {
    const rowKey = Math.round(element.rect.top / 8) * 8;
    const row = chipRows.get(rowKey) ?? [];
    row.push(element);
    chipRows.set(rowKey, row);
  }
  for (const row of chipRows.values()) {
    if (row.length < 5) continue;
    const left = Math.min(...row.map((element) => element.rect.left));
    const right = Math.max(...row.map((element) => element.rect.right));
    pushIssue(issues, {
      kind: "badge_overload",
      severity: "medium",
      title: "Row has too many competing badges",
      description: `A single row exposes ${row.length} short badges across ${Math.round(right - left)}px.`,
      evidence: {
        badge_count: row.length,
        labels: row.map((element) => compactText(element.text)).filter(Boolean).slice(0, 12),
      },
      remediation: "Collapse secondary badges into a progress summary, detail drawer, or grouped status cell so the row scans cleanly.",
    });
  }

  const firstScreenText = elements.filter((element) => hasMeaningfulText(element) && element.rect.top < snapshot.viewport.height);
  const averageFontSize = firstScreenText.length > 0
    ? firstScreenText.reduce((sum, element) => sum + (element.fontSize ?? 14), 0) / firstScreenText.length
    : 0;
  if (firstScreenText.length > 95 && averageFontSize < 15) {
    pushIssue(issues, {
      kind: "dense_first_screen",
      severity: "medium",
      title: "First screen is too dense to scan",
      description: `First viewport has ${firstScreenText.length} visible text fragments with average type ${averageFontSize.toFixed(1)}px.`,
      evidence: {
        text_fragment_count: firstScreenText.length,
        average_font_size: Math.round(averageFontSize * 10) / 10,
        viewport: snapshot.viewport,
      },
      remediation: "Introduce stronger hierarchy, sectioning, progressive disclosure, or a detail panel before adding more inline metadata.",
    });
  }

  const byKind = Object.fromEntries(ALL_KINDS.map((kind) => [kind, 0])) as Record<VisualAuditIssueKind, number>;
  const bySeverity = Object.fromEntries(ALL_SEVERITIES.map((severity) => [severity, 0])) as Record<VisualAuditSeverity, number>;
  for (const issue of issues) {
    byKind[issue.kind]++;
    bySeverity[issue.severity]++;
  }

  return {
    issueCount: issues.length,
    byKind,
    bySeverity,
    issues,
  };
}

export function visualIssuesByKind(
  summary: VisualAuditSummary,
  kind: VisualAuditIssueKind,
): VisualAuditIssue[] {
  return summary.issues.filter((issue) => issue.kind === kind);
}
