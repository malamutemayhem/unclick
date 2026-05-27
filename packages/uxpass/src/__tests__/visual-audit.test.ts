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
    expect(summary.byKind.badge_overload).toBe(1);
  });
});

describe("contrastRatio", () => {
  it("computes common contrast ratios", () => {
    expect(contrastRatio("rgb(255, 255, 255)", "rgb(0, 0, 0)")).toBe(21);
    expect(contrastRatio("rgb(120, 120, 120)", "rgb(120, 120, 120)")).toBe(1);
  });
});
