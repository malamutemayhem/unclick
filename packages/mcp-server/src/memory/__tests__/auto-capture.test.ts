import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  autoCaptureFromTurn,
  captureSlug,
  codeAutoCaptureEnabled,
  deriveTags,
  deriveTitle,
  extractCodeBlocks,
  extractLibraryDocs,
  libraryAutoCaptureEnabled,
  looksLikeCode,
  type AutoCaptureBackend,
} from "../auto-capture.js";
import type { CodeInput, LibraryDocInput } from "../types.js";

const ON = { MEMORY_CODE_AUTOCAPTURE_ENABLED: "1", MEMORY_LIBRARY_AUTOCAPTURE_ENABLED: "1" };
const OFF: Record<string, string | undefined> = {};

function recordingBackend() {
  const codes: CodeInput[] = [];
  const docs: LibraryDocInput[] = [];
  const backend: AutoCaptureBackend = {
    async storeCode(data) {
      codes.push(data);
      return { id: `code-${codes.length}` };
    },
    async upsertLibraryDoc(data) {
      docs.push(data);
      return "ok";
    },
  };
  return { backend, codes, docs };
}

describe("flag helpers", () => {
  test("default off, honor 1/true", () => {
    assert.equal(codeAutoCaptureEnabled({}), false);
    assert.equal(libraryAutoCaptureEnabled({}), false);
    assert.equal(codeAutoCaptureEnabled({ MEMORY_CODE_AUTOCAPTURE_ENABLED: "1" }), true);
    assert.equal(libraryAutoCaptureEnabled({ MEMORY_LIBRARY_AUTOCAPTURE_ENABLED: "true" }), true);
    assert.equal(codeAutoCaptureEnabled({ MEMORY_CODE_AUTOCAPTURE_ENABLED: "0" }), false);
  });
});

describe("extractCodeBlocks", () => {
  test("captures a tagged code block and infers language", () => {
    const content = "Here:\n```ts\nconst sum = (a: number, b: number): number => {\n  return a + b;\n};\n```\nthanks";
    const blocks = extractCodeBlocks(content);
    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].language, "ts");
    assert.match(blocks[0].content, /const sum =/);
  });

  test("ignores doc-fenced blocks (those are library docs)", () => {
    const content = "```md\n# A long note about the architecture and how it all fits\n- one\n- two\n```";
    assert.equal(extractCodeBlocks(content).length, 0);
  });

  test("skips tiny blocks and untagged prose, keeps untagged code", () => {
    assert.equal(extractCodeBlocks("```\nhi\n```").length, 0, "too small");
    assert.equal(
      extractCodeBlocks("```\nThis is just a sentence fenced for emphasis, no code here at all.\n```").length,
      0,
      "untagged prose is not code",
    );
    const code = extractCodeBlocks("```\nfunction add(a, b) {\n  const total = a + b;\n  return total;\n}\n```");
    assert.equal(code.length, 1);
    assert.equal(code[0].language, "text");
  });

  test("dedups identical blocks within a turn", () => {
    const block = "```py\ndef compute(value):\n    result = value * 2\n    return result\n```";
    assert.equal(extractCodeBlocks(`${block}\n${block}`).length, 1);
  });

  test("looksLikeCode distinguishes code from prose", () => {
    assert.equal(looksLikeCode("const a = 1;"), true);
    assert.equal(looksLikeCode("just some plain words here"), false);
  });
});

describe("extractLibraryDocs", () => {
  test("captures a doc-fenced block over the size threshold", () => {
    const note = "x".repeat(300);
    const docs = extractLibraryDocs("```note\nDeploy runbook\n" + note + "\n```");
    assert.equal(docs.length, 1);
    assert.equal(docs[0].title, "Deploy runbook");
    assert.ok(docs[0].tags.includes("auto-captured"));
  });

  test("captures long structured prose when no doc fence is present", () => {
    const prose = "# Project conventions\n\n" + "We always do the following thing carefully. ".repeat(12) + "\n- rule one\n- rule two";
    const docs = extractLibraryDocs(prose);
    assert.equal(docs.length, 1);
    assert.equal(docs[0].title, "Project conventions");
  });

  test("ignores short chit-chat and unstructured short text", () => {
    assert.equal(extractLibraryDocs("hey, can you check the deploy?").length, 0);
    assert.equal(extractLibraryDocs("thanks that worked").length, 0);
  });

  test("does not capture code-only turns as library docs", () => {
    const content = "```ts\n" + "const x = 1;\n".repeat(40) + "```";
    assert.equal(extractLibraryDocs(content).length, 0);
  });
});

describe("helpers", () => {
  test("deriveTitle strips markdown markers and caps length", () => {
    assert.equal(deriveTitle("## Heading here\nbody"), "Heading here");
    assert.equal(deriveTitle(""), "Captured note");
    assert.ok(deriveTitle("y".repeat(200)).length <= 120);
  });

  test("deriveTags returns provenance plus keywords, deduped slug-safe", () => {
    const tags = deriveTags("deployment deployment vercel vercel vercel pipeline");
    assert.ok(tags.includes("auto-captured"));
    assert.ok(tags.includes("conversation"));
    assert.ok(tags.includes("vercel"));
  });

  test("captureSlug is stable per content", () => {
    const a = captureSlug("auto-doc", "same content");
    const b = captureSlug("auto-doc", "same content");
    const c = captureSlug("auto-doc", "different");
    assert.equal(a, b);
    assert.notEqual(a, c);
    assert.match(a, /^auto-doc-[0-9a-f]{12}$/);
  });
});

describe("autoCaptureFromTurn", () => {
  test("does nothing when both flags are off", async () => {
    const { backend, codes, docs } = recordingBackend();
    const res = await autoCaptureFromTurn(
      backend,
      { session_id: "s1", role: "user", content: "```ts\nconst x = 1;\nconst y = 2;\nconst z = x + y;\nconsole.log(z);\n```" },
      OFF,
    );
    assert.deepEqual(res, { code_captured: 0, docs_captured: 0 });
    assert.equal(codes.length, 0);
    assert.equal(docs.length, 0);
  });

  test("captures code from a user turn when the code flag is on", async () => {
    const { backend, codes } = recordingBackend();
    const res = await autoCaptureFromTurn(
      backend,
      { session_id: "s1", role: "user", content: "```ts\nconst x = 1;\nconst y = 2;\nconst z = x + y;\nconsole.log(z);\n```" },
      { MEMORY_CODE_AUTOCAPTURE_ENABLED: "1" },
    );
    assert.equal(res.code_captured, 1);
    assert.equal(codes.length, 1);
    assert.equal(codes[0].session_id, "s1");
    assert.equal(codes[0].language, "ts");
  });

  test("captures a library doc from a user turn when the library flag is on", async () => {
    const { backend, docs } = recordingBackend();
    const note = "```note\nRunbook\n" + "details ".repeat(60) + "\n```";
    const res = await autoCaptureFromTurn(
      backend,
      { session_id: "s1", role: "user", content: note },
      { MEMORY_LIBRARY_AUTOCAPTURE_ENABLED: "1" },
    );
    assert.equal(res.docs_captured, 1);
    assert.equal(docs.length, 1);
    assert.equal(docs[0].category, "captured");
    assert.match(docs[0].slug, /^auto-doc-[0-9a-f]{12}$/);
  });

  test("skips assistant turns even with flags on", async () => {
    const { backend, codes, docs } = recordingBackend();
    const res = await autoCaptureFromTurn(
      backend,
      { session_id: "s1", role: "assistant", content: "```ts\nconst x = 1;\nconst y = 2;\nconst z = x + y;\nconsole.log(z);\n```" },
      ON,
    );
    assert.deepEqual(res, { code_captured: 0, docs_captured: 0 });
    assert.equal(codes.length, 0);
    assert.equal(docs.length, 0);
  });

  test("swallows backend errors (best-effort, never throws)", async () => {
    const backend: AutoCaptureBackend = {
      async storeCode() {
        throw new Error("boom");
      },
      async upsertLibraryDoc() {
        throw new Error("boom");
      },
    };
    const res = await autoCaptureFromTurn(
      backend,
      { session_id: "s1", role: "user", content: "```ts\nconst x = 1;\nconst y = 2;\nconst z = x + y;\nconsole.log(z);\n```" },
      ON,
    );
    assert.equal(res.code_captured, 0);
  });
});
