export type VisualAuditSeverity = "critical" | "high" | "medium" | "low";

export type VisualAuditIssueKind =
  | "horizontal_overflow"
  | "clipped_text"
  | "text_out_of_bounds"
  | "small_target"
  | "low_contrast"
  | "badge_overload"
  | "dense_first_screen"
  | "weak_visual_hierarchy"
  | "nested_panel_clutter"
  | "unclear_primary_action"
  | "flat_type_scale"
  | "palette_indiscipline"
  | "unlabelled_action"
  | "crowded_action_cluster";

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
  "weak_visual_hierarchy",
  "nested_panel_clutter",
  "unclear_primary_action",
  "flat_type_scale",
  "palette_indiscipline",
  "unlabelled_action",
  "crowded_action_cluster",
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

function isFirstViewport(element: VisualAuditElement, snapshot: VisualAuditSnapshot): boolean {
  return element.rect.bottom > 0 && element.rect.top < snapshot.viewport.height;
}

function isHeadingLike(element: VisualAuditElement): boolean {
  const tag = element.tagName.toLowerCase();
  const role = (element.role ?? "").toLowerCase();
  return /^h[1-6]$/.test(tag) || role === "heading";
}

function visualWeight(element: VisualAuditElement): number {
  const raw = typeof element.fontWeight === "number"
    ? element.fontWeight
    : Number.parseInt(String(element.fontWeight ?? "400"), 10);
  return Number.isFinite(raw) ? raw : 400;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function isPanelLike(element: VisualAuditElement): boolean {
  if (isBadgeLike(element) || isInteractive(element)) return false;
  const tag = element.tagName.toLowerCase();
  if (!["div", "section", "article", "main", "aside", "li"].includes(tag)) return false;
  if (element.rect.width < 80 || element.rect.height < 48) return false;
  const klass = element.className ?? "";
  return /\b(card|panel|surface|container|box|rounded|border|shadow|sheet)\b/i.test(klass);
}

function rectContains(outer: VisualRect, inner: VisualRect): boolean {
  const tolerance = 2;
  const outerArea = outer.width * outer.height;
  const innerArea = inner.width * inner.height;
  return outerArea > innerArea * 1.15
    && inner.left >= outer.left - tolerance
    && inner.right <= outer.right + tolerance
    && inner.top >= outer.top - tolerance
    && inner.bottom <= outer.bottom + tolerance;
}

function isProminentAction(element: VisualAuditElement): boolean {
  if (!isCommandAction(element)) return false;
  const label = compactText(element.text) || compactText(element.ariaLabel) || compactText(element.title);
  const className = element.className ?? "";
  const hasComfortableSize = element.rect.width >= 64 && element.rect.height >= 32;
  const hasUsefulLabel = label.length >= 3;
  const namedPrimary = /\b(primary|cta|submit|confirm|save|continue)\b/i.test(className);
  return hasComfortableSize && hasUsefulLabel && (namedPrimary || element.tagName.toLowerCase() === "button");
}

function isCommandAction(element: VisualAuditElement): boolean {
  if (element.disabled) return false;
  const tag = element.tagName.toLowerCase();
  if (["button", "a", "summary"].includes(tag)) return true;
  const role = (element.role ?? "").toLowerCase();
  return ["button", "link", "menuitem", "tab"].includes(role);
}

function actionLabel(element: VisualAuditElement): string {
  return compactText(element.text) || compactText(element.ariaLabel) || compactText(element.title);
}

function isCompactAction(element: VisualAuditElement): boolean {
  const label = actionLabel(element);
  return element.rect.width <= 72 || element.rect.height <= 32 || (label.length > 0 && label.length <= 12);
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HslColor {
  h: number;
  s: number;
  l: number;
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

function rgbToHsl(color: RgbColor): HslColor {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

function nonNeutralColor(value: string | undefined): { key: string; hueBucket: number } | null {
  const parsed = parseColor(value);
  if (!parsed || parsed.a < 0.95) return null;
  const hsl = rgbToHsl(parsed);
  if (hsl.s < 0.18 || hsl.l < 0.08 || hsl.l > 0.94) return null;
  const hueBucket = Math.floor(hsl.h / 30) * 30;
  const saturationBand = Math.round((hsl.s * 100) / 10) * 10;
  const lightnessBand = Math.round((hsl.l * 100) / 10) * 10;
  return {
    key: `${hueBucket}:${saturationBand}:${lightnessBand}`,
    hueBucket,
  };
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

      if (isCommandAction(element) && actionLabel(element).length < 2) {
        pushIssue(issues, {
          kind: "unlabelled_action",
          severity: "high",
          title: "Interactive action has no useful accessible name",
          description: `${describeElement(element)} exposes no useful visible, title, or aria-label text.`,
          selector: element.selector,
          elementId: element.id,
          evidence: {
            text: compactText(element.text),
            aria_label: element.ariaLabel ?? null,
            title: element.title ?? null,
            role: element.role ?? null,
          },
          remediation: "Give icon-only and compact actions a clear aria-label or title, and use visible labels for primary actions.",
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

  const actionRows = new Map<number, VisualAuditElement[]>();
  for (const element of elements.filter((item) => isFirstViewport(item, snapshot) && isCommandAction(item))) {
    const rowKey = Math.round(element.rect.top / 10) * 10;
    const row = actionRows.get(rowKey) ?? [];
    row.push(element);
    actionRows.set(rowKey, row);
  }
  const crowdedActionThreshold = snapshot.viewport.width <= 480 ? 4 : 5;
  for (const row of actionRows.values()) {
    const compactActions = row.filter(isCompactAction);
    if (compactActions.length < crowdedActionThreshold) continue;
    const left = Math.min(...compactActions.map((element) => element.rect.left));
    const right = Math.max(...compactActions.map((element) => element.rect.right));
    pushIssue(issues, {
      kind: "crowded_action_cluster",
      severity: "medium",
      title: "Row has too many competing actions",
      description: `A single row exposes ${compactActions.length} compact action controls across ${Math.round(right - left)}px.`,
      evidence: {
        action_count: compactActions.length,
        labels: compactActions.map(actionLabel).filter(Boolean).slice(0, 12),
        viewport: snapshot.viewport,
      },
      remediation: "Collapse secondary controls into a menu, row expansion, or stepper summary so one primary action remains obvious.",
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

  if (firstScreenText.length >= 8) {
    const fontSizes = firstScreenText.map((element) => Math.round(element.fontSize ?? 14));
    const distinctSizes = new Set(fontSizes);
    const maxFontSize = Math.max(...fontSizes);
    const medianFontSize = median(fontSizes);
    const typeRatio = medianFontSize > 0 ? maxFontSize / medianFontSize : 1;
    if (distinctSizes.size <= 2 && (maxFontSize < 20 || typeRatio < 1.25)) {
      pushIssue(issues, {
        kind: "flat_type_scale",
        severity: "medium",
        title: "First viewport uses a flat type scale",
        description: `The first screen has ${firstScreenText.length} text fragments but only ${distinctSizes.size} distinct text sizes.`,
        evidence: {
          text_fragment_count: firstScreenText.length,
          distinct_font_sizes: Array.from(distinctSizes).sort((a, b) => a - b),
          max_font_size: maxFontSize,
          median_font_size: medianFontSize,
          type_ratio: Math.round(typeRatio * 100) / 100,
        },
        remediation: "Introduce a deliberate type scale with clear page, section, row, metadata, and control roles instead of relying on tiny size differences.",
      });
    }
  }

  if (firstScreenText.length >= 8) {
    const fontSizes = firstScreenText.map((element) => element.fontSize ?? 14);
    const maxFontSize = Math.max(...fontSizes);
    const medianFontSize = median(fontSizes);
    const maxWeight = Math.max(...firstScreenText.map(visualWeight));
    const headingCount = firstScreenText.filter(isHeadingLike).length;
    const prominentHeading = firstScreenText.some((element) => {
      const size = element.fontSize ?? 14;
      return isHeadingLike(element)
        || size >= Math.max(20, medianFontSize * 1.45)
        || (size >= medianFontSize * 1.25 && visualWeight(element) >= 700);
    });
    if (!prominentHeading) {
      pushIssue(issues, {
        kind: "weak_visual_hierarchy",
        severity: "medium",
        title: "First viewport lacks clear visual hierarchy",
        description: "The first screen has many text fragments but no visibly dominant heading or anchor element.",
        evidence: {
          text_fragment_count: firstScreenText.length,
          max_font_size: Math.round(maxFontSize * 10) / 10,
          median_font_size: Math.round(medianFontSize * 10) / 10,
          max_font_weight: maxWeight,
          heading_count: headingCount,
        },
        remediation: "Add a clear page heading, stronger section labels, or a dominant primary work area before adding more inline detail.",
      });
    }
  }

  const firstViewportElements = elements.filter((element) => isFirstViewport(element, snapshot));
  const colorTokens = new Map<string, number>();
  const hueBuckets = new Set<number>();
  let coloredBadgeCount = 0;
  for (const element of firstViewportElements) {
    const tokens = [nonNeutralColor(element.color), nonNeutralColor(element.backgroundColor)].filter(
      (token): token is { key: string; hueBucket: number } => token !== null,
    );
    if (tokens.length === 0) continue;
    if (isBadgeLike(element)) coloredBadgeCount++;
    for (const token of tokens) {
      colorTokens.set(token.key, (colorTokens.get(token.key) ?? 0) + 1);
      hueBuckets.add(token.hueBucket);
    }
  }
  if (
    colorTokens.size >= 10
    || (coloredBadgeCount >= 8 && hueBuckets.size >= 3)
    || (firstViewportElements.length >= 20 && hueBuckets.size >= 5)
  ) {
    pushIssue(issues, {
      kind: "palette_indiscipline",
      severity: "medium",
      title: "First viewport has an undisciplined colour system",
      description: `The first screen uses ${colorTokens.size} saturated colour tokens across ${hueBuckets.size} hue families.`,
      evidence: {
        saturated_color_token_count: colorTokens.size,
        hue_family_count: hueBuckets.size,
        colored_badge_count: coloredBadgeCount,
        top_tokens: Array.from(colorTokens.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([token, count]) => ({ token, count })),
      },
      remediation: "Limit status colours to named semantic roles, use neutral surfaces for structure, and reserve accent colour for the primary action or true exceptions.",
    });
  }

  const panels = elements.filter((element) => isFirstViewport(element, snapshot) && isPanelLike(element));
  const nestedPairs = panels.flatMap((outer) =>
    panels.filter((inner) => outer !== inner && rectContains(outer.rect, inner.rect)).map((inner) => ({ outer, inner })),
  );
  if (nestedPairs.length >= 3 || panels.length >= 10) {
    pushIssue(issues, {
      kind: "nested_panel_clutter",
      severity: "medium",
      title: "First viewport has nested panel clutter",
      description: `The first screen exposes ${panels.length} panel-like containers with ${nestedPairs.length} nested relationships.`,
      evidence: {
        panel_count: panels.length,
        nested_pair_count: nestedPairs.length,
        selectors: panels.map((element) => element.selector).filter(Boolean).slice(0, 10),
      },
      remediation: "Flatten page sections, remove cards inside cards, and use full-width bands or unframed layouts for structural regions.",
    });
  }

  const firstScreenActions = elements.filter((element) => isFirstViewport(element, snapshot) && isCommandAction(element));
  if (firstScreenActions.length > 0 && !firstScreenActions.some(isProminentAction)) {
    pushIssue(issues, {
      kind: "unclear_primary_action",
      severity: "medium",
      title: "First viewport lacks a clear primary action",
      description: "Interactive controls are present, but none has enough size and label clarity to read as the primary action.",
      evidence: {
        action_count: firstScreenActions.length,
        actions: firstScreenActions.map((element) => ({
          selector: element.selector,
          label: compactText(element.text) || compactText(element.ariaLabel) || compactText(element.title),
          width: element.rect.width,
          height: element.rect.height,
        })).slice(0, 10),
      },
      remediation: "Provide one clearly labelled primary action with stable dimensions, and demote secondary actions visually.",
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
