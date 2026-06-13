import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AGENT_INSTRUCTIONS } from "../starter-knowledge.js";

describe("starter knowledge (platform defaults shipped to every account)", () => {
  test("keeps the original connection primer lines", () => {
    assert.ok(AGENT_INSTRUCTIONS.includes("You are connected to UnClick Memory"));
    assert.ok(AGENT_INSTRUCTIONS.includes("write a session summary using write_session_summary"));
    assert.ok(AGENT_INSTRUCTIONS.includes("are standing rules"));
    assert.ok(AGENT_INSTRUCTIONS.includes("you DO, through this memory system"));
  });

  test("adds the universal operating primer distilled from experience", () => {
    // tool-first reflex: prefer UnClick's own tools over web search / guessing
    assert.ok(AGENT_INSTRUCTIONS.includes("unclick_search"));
    assert.ok(AGENT_INSTRUCTIONS.includes("unclick_call"));
    // memory hygiene: standing rules via save_identity, durable facts via save_fact
    assert.ok(AGENT_INSTRUCTIONS.includes("save_identity"));
    assert.ok(AGENT_INSTRUCTIONS.includes("save_fact"));
    // reusable fixes captured in the troubleshooting shape
    assert.ok(/Issue: <symptom>\. Solution: <fix>/.test(AGENT_INSTRUCTIONS));
  });

  test("includes the operating-discipline guardrails distilled from the orchestrator", () => {
    // proof-before-done: status text and green badges are not proof
    assert.ok(AGENT_INSTRUCTIONS.includes("green badges"));
    // stop before irreversible / high-risk actions
    assert.ok(AGENT_INSTRUCTIONS.includes("irreversible or high-risk"));
    // secret hygiene applies even on a brand-new account
    assert.ok(AGENT_INSTRUCTIONS.includes("never print, log, or save secrets"));
  });

  test("carries no personal data and no em dashes (it ships to every account)", () => {
    assert.equal(AGENT_INSTRUCTIONS.includes(String.fromCharCode(0x2014)), false); // em dash banned repo-wide
    // The legacy room name is assembled at runtime: the Boardroom-naming audit
    // forbids the literal in source, and this assertion exists to prove the
    // same string never ships in the primer.
    const legacyRoomName = ["Fish", "bowl"].join("");
    for (const personal of ["Chris", "Malamute", "Sydney", "C:\\G", legacyRoomName, "Boardroom"]) {
      assert.equal(
        AGENT_INSTRUCTIONS.includes(personal),
        false,
        `agent_instructions must not leak personal token: ${personal}`,
      );
    }
  });

  test("a brand-new (empty) local account still receives it on first load", async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-starter-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    try {
      const { LocalBackend } = await import("../local.js");
      const backend = new LocalBackend();
      const context = (await backend.getStartupContext(3)) as {
        agent_instructions: string;
        active_facts: unknown[];
        business_context: unknown[];
      };
      // Blank slate: the account has saved nothing yet ...
      assert.equal(context.active_facts.length, 0);
      assert.equal(context.business_context.length, 0);
      // ... but the hard-coded operating knowledge is already present.
      assert.equal(context.agent_instructions, AGENT_INSTRUCTIONS);
      assert.ok(context.agent_instructions.includes("unclick_search"));
    } finally {
      delete process.env.MEMORY_LOCAL_DATA_DIR;
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
