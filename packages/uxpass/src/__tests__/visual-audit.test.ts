import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  evaluateVisualAuditSnapshot,
  type VisualAuditSnapshot,
} from "../visual-audit.js";

function rect(left: number, top: number, width: number, height: number) {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

const cleanSnapshot: VisualAuditSnapshot = {
  viewport: { name: "desktop", width: 1280, height: 800 },
  document: { scrollWidth: 1280, scrollHeight: 800, clientWidth: 1280, clientHeight: 800 },
  elements: [
    {
      selector: "h1",
      tagName: "h1",
      text: "Clean product surface",
      visible: true,
      rect: rect(80, 80, 420, 48),
      scrollWidth: 420,
      scrollHeight: 48,
      clientWidth: 420,
      clientHeight: 48,
      fontSize: 32,
      fontWeight: 700,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    },
    {
      selector: "button",
      tagName: "button",
      role: "button",
      text: "Continue",
      visible: true,
      rect: rect(80, 150, 120, 40),
      scrollWidth: 120,
      scrollHeight: 40,
      clientWidth: 120,
      clientHeight: 40,
      fontSize: 14,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(15, 23, 42)",
    },
  ],
};

describe("evaluateVisualAuditSnapshot", () => {
  it("returns no issues for a clean visual snapshot", () => {
    const summary = evaluateVisualAuditSnapshot(cleanSnapshot);
    expect(summary.issueCount).toBe(0);
    expect(summary.bySeverity.high).toBe(0);
  });

  it("flags clipped text without a full fallback label", () => {
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: [
        {
          selector: ".title",
          tagName: "div",
          text: "A long title that is cropped",
          visible: true,
          rect: rect(10, 10, 80, 20),
          scrollWidth: 180,
          scrollHeight: 20,
          clientWidth: 80,
          clientHeight: 20,
          fontSize: 14,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        },
      ],
    });
    expect(summary.byKind.clipped_text).toBe(1);
    expect(summary.issues[0].remediation).toMatch(/room|wrap|detail/i);
  });

  it("does not flag clipped text when a full accessible fallback exists", () => {
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: [
        {
          selector: ".title",
          tagName: "div",
          text: "A long title that is cropped",
          title: "A long title that is cropped",
          visible: true,
          rect: rect(10, 10, 80, 20),
          scrollWidth: 180,
          scrollHeight: 20,
          clientWidth: 80,
          clientHeight: 20,
          fontSize: 14,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        },
      ],
    });
    expect(summary.byKind.clipped_text).toBe(0);
  });

  it("flags small interactive targets and row badge overload", () => {
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: [
        {
          selector: ".icon",
          tagName: "button",
          role: "button",
          text: "x",
          visible: true,
          rect: rect(10, 10, 18, 18),
          scrollWidth: 18,
          scrollHeight: 18,
          clientWidth: 18,
          clientHeight: 18,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        },
        ...["HIGH", "URGENT", "ACTIVE", "BUILD", "PROOF"].map((label, index) => ({
          selector: `.badge-${index}`,
          tagName: "span",
          text: label,
          className: "rounded badge",
          visible: true,
          rect: rect(40 + index * 56, 20, 48, 20),
          scrollWidth: 48,
          scrollHeight: 20,
          clientWidth: 48,
          clientHeight: 20,
          fontSize: 12,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        })),
      ],
    });
    expect(summary.byKind.small_target).toBe(1);
    expect(summary.byKind.unlabelled_action).toBe(1);
    expect(summary.byKind.badge_overload).toBe(1);
  });

  it("flags weak hierarchy and unclear action prominence", () => {
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: [
        ...Array.from({ length: 10 }, (_, index) => ({
          selector: `.flat-${index}`,
          tagName: "span",
          text: `Flat label ${index}`,
          visible: true,
          rect: rect(10 + index * 40, 20 + index * 18, 36, 14),
          scrollWidth: 36,
          scrollHeight: 14,
          clientWidth: 36,
          clientHeight: 14,
          fontSize: 12,
          fontWeight: 400,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        })),
        {
          selector: ".tiny-action",
          tagName: "button",
          role: "button",
          text: "x",
          visible: true,
          rect: rect(10, 230, 18, 18),
          scrollWidth: 18,
          scrollHeight: 18,
          clientWidth: 18,
          clientHeight: 18,
          color: "rgb(255, 255, 255)",
          backgroundColor: "rgb(0, 0, 0)",
        },
      ],
    });
    expect(summary.byKind.weak_visual_hierarchy).toBe(1);
    expect(summary.byKind.flat_type_scale).toBe(1);
    expect(summary.byKind.unclear_primary_action).toBe(1);
  });

  it("flags noisy, undisciplined colour systems", () => {
    const colours = [
      "rgb(220, 38, 38)",
      "rgb(234, 88, 12)",
      "rgb(202, 138, 4)",
      "rgb(22, 163, 74)",
      "rgb(8, 145, 178)",
      "rgb(37, 99, 235)",
      "rgb(124, 58, 237)",
      "rgb(219, 39, 119)",
    ];
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: colours.map((colour, index) => ({
        selector: `.status-${index}`,
        tagName: "span",
        className: "rounded badge",
        text: `STATE ${index}`,
        visible: true,
        rect: rect(10 + index * 70, 20, 62, 20),
        scrollWidth: 62,
        scrollHeight: 20,
        clientWidth: 62,
        clientHeight: 20,
        fontSize: 12,
        color: "rgb(255, 255, 255)",
        backgroundColor: colour,
      })),
    });
    expect(summary.byKind.palette_indiscipline).toBe(1);
  });

  it("flags nested panel clutter", () => {
    const summary = evaluateVisualAuditSnapshot({
      ...cleanSnapshot,
      elements: [
        {
          selector: ".outer",
          tagName: "div",
          className: "card rounded border",
          visible: true,
          rect: rect(10, 10, 500, 360),
        },
        {
          selector: ".middle",
          tagName: "section",
          className: "panel rounded shadow",
          visible: true,
          rect: rect(24, 24, 460, 300),
        },
        {
          selector: ".inner",
          tagName: "div",
          className: "surface rounded border",
          visible: true,
          rect: rect(40, 40, 420, 240),
        },
      ],
    });
    expect(summary.byKind.nested_panel_clutter).toBe(1);
  });
});

describe("contrastRatio", () => {
  it("computes common contrast ratios", () => {
    expect(contrastRatio("rgb(255, 255, 255)", "rgb(0, 0, 0)")).toBe(21);
    expect(contrastRatio("rgb(120, 120, 120)", "rgb(120, 120, 120)")).toBe(1);
  });
});
