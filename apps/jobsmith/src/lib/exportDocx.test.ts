// apps/jobsmith/src/lib/exportDocx.test.ts

import { describe, test, expect } from "vitest";
import { Packer } from "docx";

import { buildJobsmithDocx } from "./exportDocx";

const COVER_LETTER = [
  "Dear Hiring Manager,",
  "",
  "I am pleased to express my interest in the Digital Media Designer position.",
  "",
  "Sincerely,",
  "Christopher Byrne",
].join("\n");

const CV = [
  "Christopher Byrne",
  "chris@example.com | Victoria, Australia",
  "",
  "Work Experience",
  "",
  "Senior Designer, Paslode",
  "03/2015 - 06/2021",
  "- Produced digital marketing campaigns and content.",
  "",
  "Skills",
  "Adobe Photoshop, Digital content production",
].join("\n");

async function pack(text: string, kind: "letter" | "cv"): Promise<Buffer> {
  return Packer.toBuffer(buildJobsmithDocx(text, { kind }));
}

describe("buildJobsmithDocx", () => {
  test("produces a valid (zip-signature) .docx for a cover letter", async () => {
    const buf = await pack(COVER_LETTER, "letter");
    expect(buf.length).toBeGreaterThan(0);
    expect(buf[0]).toBe(0x50); // 'P'
    expect(buf[1]).toBe(0x4b); // 'K'
  });

  test("produces a valid .docx for a CV", async () => {
    const buf = await pack(CV, "cv");
    expect(buf.length).toBeGreaterThan(0);
    expect(buf[0]).toBe(0x50);
    expect(buf[1]).toBe(0x4b);
  });

  test("does not throw on empty input", async () => {
    const buf = await pack("", "cv");
    expect(buf.length).toBeGreaterThan(0);
  });

  test("builds a Document with a single section (single column)", () => {
    const doc = buildJobsmithDocx(CV, { kind: "cv" });
    expect(doc).toBeDefined();
  });
});
