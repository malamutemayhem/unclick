// apps/jobsmith/src/lib/renderCvDraft.test.ts

import { describe, test, expect } from "vitest";

import { renderCvDraft } from "./renderCvDraft";
import { collectFactIds, type MasterCvFacts } from "./cvFacts";

const FACTS: MasterCvFacts = {
  name: "Jane Smith",
  contact: "jane@example.com | Victoria, Australia",
  summary: { id: "sum", text: "Designer focused on digital content." },
  experience: [
    {
      id: "exp1",
      org: "Paslode",
      title: "Senior Designer",
      startDate: "03/2015",
      endDate: "06/2021",
      bullets: [
        { id: "b1", text: "Produced digital marketing campaigns and content." },
        { id: "b2", text: "Managed print catalogue layout for hardware lines." },
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "RMIT",
      qualification: "Diploma of Graphic Design",
      year: "2008",
    },
  ],
  skills: [
    { id: "sk1", text: "Adobe Photoshop" },
    { id: "sk2", text: "Digital content production" },
    { id: "sk3", text: "Forklift operation" },
  ],
};

const DESIGN_JD = {
  rawText:
    "Digital Media Designer\nWe need digital content and marketing campaign skills. Photoshop required.",
};

describe("renderCvDraft", () => {
  test("renders header, standard ATS headings, and MM/YYYY dates", () => {
    const result = renderCvDraft(FACTS, DESIGN_JD);
    expect(result.draft).toContain("Jane Smith");
    expect(result.draft).toContain("Work Experience");
    expect(result.draft).toContain("Education");
    expect(result.draft).toContain("Skills");
    expect(result.draft).toContain("Senior Designer, Paslode");
    expect(result.draft).toContain("03/2015 - 06/2021");
  });

  test("keeps bullets that match the job description", () => {
    const result = renderCvDraft(FACTS, DESIGN_JD);
    expect(result.draft).toContain(
      "- Produced digital marketing campaigns and content.",
    );
  });

  test("omits bullets that do not match, never invents", () => {
    const result = renderCvDraft(FACTS, DESIGN_JD);
    expect(result.draft).not.toContain("Managed print catalogue");
    const omittedIds = result.omittedBullets.map((c) => c.factId);
    expect(omittedIds).toContain("b2");
    expect(omittedIds).toContain("sk3");
  });

  test("every emitted bullet line traces to a real fact id and text", () => {
    const result = renderCvDraft(FACTS, DESIGN_JD);
    const validIds = new Set(collectFactIds(FACTS));
    for (const citation of result.citations) {
      expect(validIds.has(citation.factId)).toBe(true);
    }
    const bulletLines = result.draft
      .split(/\r?\n/)
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2));
    const citationTexts = new Set(result.citations.map((c) => c.text));
    for (const line of bulletLines) {
      expect(citationTexts.has(line)).toBe(true);
    }
  });

  test("reports matched keywords from the job description", () => {
    const result = renderCvDraft(FACTS, DESIGN_JD);
    expect(result.matchedKeywords).toContain("digital");
    expect(result.matchedKeywords).toContain("content");
  });

  test("warns when no experience bullet matches the job description", () => {
    const result = renderCvDraft(FACTS, {
      rawText: "Forklift Operator\nHeavy lifting and warehouse logistics.",
    });
    expect(result.warnings.some((w) => /No experience bullet/.test(w))).toBe(
      true,
    );
  });
});
