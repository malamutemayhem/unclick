import { stampMeta } from "./connector-meta.js";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

function pick() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

function sentence() {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = Array.from({ length: len }, pick);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

export async function loremGenerate(args: Record<string, unknown>) {
  const paragraphs = Math.min(Math.max(Number(args.paragraphs) || 3, 1), 20);
  const sentencesPerParagraph = Math.min(Math.max(Number(args.sentences) || 5, 1), 15);
  const result = Array.from({ length: paragraphs }, () =>
    Array.from({ length: sentencesPerParagraph }, sentence).join(" ")
  );
  const text = result.join("\n\n");
  return stampMeta({ text, paragraphs: result.length, word_count: text.split(/\s+/).length, character_count: text.length }, {
    source: "local lorem ipsum generator",
    fetched_at: new Date().toISOString(),
    next_steps: ["use as placeholder text in designs", "adjust paragraphs and sentences for length"],
  });
}
