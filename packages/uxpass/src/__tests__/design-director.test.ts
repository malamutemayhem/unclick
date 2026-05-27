import { describe, expect, it } from "vitest";
import {
  buildVisualDesignDirectorReport,
  inferPageArchetype,
} from "../design-director.js";
import type { VisualAuditSnapshot } from "../visual-audit.js";

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

const jobsBoardSnapshot: VisualAuditSnapshot = {
  viewport: { name: "desktop", width: 390, height: 844 },
  document: { scrollWidth: 540, scrollHeight: 1000, clientWidth: 390, clientHeight: 844 },
  elements: [
    {
      selector: ".jobs-table",
      tagName: "div",
      role: "grid",
      className: "data-grid",
      text: "Job State Priority Worker Proof Progress",
      visible: true,
      rect: rect(0, 0, 540, 60),
      parentRect: rect(0, 0, 390, 844),
      scrollWidth: 540,
      scrollHeight: 60,
      clientWidth: 390,
      clientHeight: 60,
      fontSize: 12,
      color: "rgb(220, 220, 220)",
      backgroundColor: "rgb(10, 10, 10)",
    },
    {
      selector: ".job-title",
      tagName: "div",
      text: "FidelityCopy deterministic non-AI copy engine for long exact source packets",
      visible: true,
      rect: rect(8, 72, 120, 18),
      parentRect: rect(8, 72, 120, 18),
      scrollWidth: 420,
      scrollHeight: 18,
      clientWidth: 120,
      clientHeight: 18,
      fontSize: 13,
      color: "rgb(130, 130, 130)",
      backgroundColor: "rgb(130, 130, 130)",
    },
    {
      selector: ".tiny-action",
      tagName: "button",
      role: "button",
      text: "x",
      visible: true,
      rect: rect(8, 100, 18, 18),
      scrollWidth: 18,
      scrollHeight: 18,
      clientWidth: 18,
      clientHeight: 18,
      fontSize: 12,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    },
    ...["NEEDS PROOF", "URGENT", "BRIEF", "BUILD", "PROOF"].map((label, index) => ({
      selector: `.chip-${index}`,
      tagName: "span",
      className: "rounded badge",
      text: label,
      visible: true,
      rect: rect(36 + index * 60, 100, 54, 20),
      scrollWidth: 54,
      scrollHeight: 20,
      clientWidth: 54,
      clientHeight: 20,
      fontSize: 12,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    })),
  ],
};

const formSnapshot: VisualAuditSnapshot = {
  viewport: { name: "desktop", width: 1024, height: 768 },
  document: { scrollWidth: 1024, scrollHeight: 768, clientWidth: 1024, clientHeight: 768 },
  elements: ["Name", "Email", "Company", "Notes"].flatMap((label, index) => ([
    {
      selector: `.label-${index}`,
      tagName: "label",
      text: label,
      visible: true,
      rect: rect(40, 40 + index * 64, 120, 24),
      fontSize: 14,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    },
    {
      selector: `.input-${index}`,
      tagName: "input",
      role: "textbox",
      visible: true,
      rect: rect(180, 40 + index * 64, 320, 36),
      fontSize: 14,
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
    },
  ])),
};

describe("inferPageArchetype", () => {
  it("detects data-heavy boards from grid roles and row language", () => {
    expect(inferPageArchetype(jobsBoardSnapshot)).toBe("data_grid");
  });

  it("detects forms from labels and inputs", () => {
    expect(inferPageArchetype(formSnapshot)).toBe("form");
  });
});

describe("buildVisualDesignDirectorReport", () => {
  it("turns visual issues into a builder-ready design brief", () => {
    const report = buildVisualDesignDirectorReport(jobsBoardSnapshot);
    expect(report.archetype).toBe("data_grid");
    expect(report.issue_count).toBeGreaterThan(0);
    expect(report.directives.map((directive) => directive.id)).toEqual(
      expect.arrayContaining([
        "layout-containment",
        "silent-truncation",
        "composition-hierarchy",
        "density-hierarchy",
        "interaction-targets",
        "contrast-tokens",
      ]),
    );
    expect(report.builder_brief).toMatch(/before\/after screenshot proof/i);
    expect(report.guardrails.join(" ")).toMatch(/row expansion|side panel/i);
  });

  it("returns a quiet maintain-baseline brief when no issues are found", () => {
    const report = buildVisualDesignDirectorReport(formSnapshot);
    expect(report.issue_count).toBe(0);
    expect(report.directives).toEqual([]);
    expect(report.builder_brief).toMatch(/Keep the visual baseline/i);
  });
});
