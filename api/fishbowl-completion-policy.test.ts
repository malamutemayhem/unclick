import { describe, expect, it } from "vitest";
import { evaluateFishbowlCompletionPolicy } from "./lib/fishbowl-completion-policy";

const baseTodo = {
  id: "todo-1",
  title: "Memory Recall Check pollution fix",
  description: "Fix the repeated Most Accessed Facts list.",
  created_by_agent_id: "builder-seat",
};

describe("evaluateFishbowlCompletionPolicy", () => {
  it("blocks done when no proof comment exists", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: baseTodo,
      comments: [],
      closerAgentId: "reviewer-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "missing_proof" });
  });

  it("blocks self-created and self-closed jobs without independent proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: baseTodo,
      comments: [{ author_agent_id: "builder-seat", text: "PASS: tests passed; proof: npm test." }],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "independent_verifier_required" });
  });

  it("allows non-UI work with independent commit or test proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: baseTodo,
      comments: [{ author_agent_id: "reviewer-seat", text: "PASS: tests passed; proof: commit abc1234." }],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: true, code: "allowed" });
  });

  it("blocks completion when a newer blocker invalidates older proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: baseTodo,
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #997 merged and checks passed.",
          created_at: "2026-05-22T06:40:00Z",
        },
        {
          author_agent_id: "reviewer-seat",
          text: "BLOCKED: release/live proof is missing after publish failed.",
          created_at: "2026-05-22T06:43:00Z",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "missing_proof" });
  });

  it("blocks completion when a newer proof reset invalidates older proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: baseTodo,
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #997 merged and checks passed.",
          created_at: "2026-05-22T06:40:00Z",
        },
        {
          author_agent_id: "reviewer-seat",
          text: "Proof reset after live package publish failed.",
          created_at: "2026-05-22T06:43:00Z",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "missing_proof" });
  });

  it("allows backend automation completion-gate work without screenshot proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "AutoPilot completion gate: do not require screenshots for non-UI jobs",
        description:
          "SeatRelay backend/automation cleanup has PR/test/comment proof but Boardroom close hit ui_screenshot_required. Screenshot proof should be required only for UI/UX/live visual jobs.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #977 merged and tests passed; proof: commit d32673c.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: true, code: "allowed" });
  });

  it("blocks runtime tool work when PR proof lacks release or live availability proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "FidelityCopy: deterministic non-AI copy engine for FidelityPass",
        description:
          "Build the official non-AI Copy Machine under FidelityPass. AI workers may request exact copy/import/export/restore operations.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #997 merged and CI passed; proof: actions/runs/26272653066.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "release_or_live_proof_required" });
  });

  it("blocks scheduled wake routes when merge proof lacks live availability proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "Implement Cowork scheduled-task wake route",
        description: "Dry-run route validates due tasks, but live wake availability is still not proved.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #1260 merged and CI passed; proof: actions/runs/26270000000.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "release_or_live_proof_required" });
  });

  it("allows runtime tool work with registry and discovery proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "FidelityCopy: deterministic non-AI copy engine for FidelityPass",
        description:
          "Build the official non-AI Copy Machine under FidelityPass. AI workers may request exact copy/import/export/restore operations.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text:
            "PASS: PR #997 merged, npm view confirms registry latest 0.3.107, and fidelitycopy_copy tool discovery is available.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: true, code: "allowed" });
  });

  it("blocks coding work when proof only cites tests", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "TestPass API package-boundary cleanup v1",
        description: "Stop API routes from importing TestPass internals by relative source path.",
      },
      comments: [{ author_agent_id: "reviewer-seat", text: "PASS: tests passed; proof: npm test." }],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "git_proof_required" });
  });

  it("blocks coding work with screenshot proof but no Git or deploy proof", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "Architecture QC: Tools component split v1",
        description: "Build component split for the Tools UI.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: before/after screenshot proof captured at C:\\G\\Screenshots\\tools-after.png.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "git_proof_required" });
  });

  it("allows explicit no-code proof for non-code closure work", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "Automation playbook rank trigger methods",
        description: "Policy and routing update only.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: NO_CODE_NEEDED, Boardroom policy comment posted and no repository files changed.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: true, code: "allowed" });
  });

  it("blocks UI work when proof lacks screenshots", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "UIPass visual polish gate",
        description: "UI overhaul for the Jobs page.",
      },
      comments: [{ author_agent_id: "reviewer-seat", text: "PASS: tests passed; proof: npm test." }],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: false, code: "ui_screenshot_required" });
  });

  it("allows UI work when independent screenshot proof exists", () => {
    const result = evaluateFishbowlCompletionPolicy({
      todo: {
        ...baseTodo,
        title: "UIPass visual polish gate",
        description: "UI overhaul for the Jobs page.",
      },
      comments: [
        {
          author_agent_id: "reviewer-seat",
          text: "PASS: PR #913 and before/after screenshot proof captured at C:\\G\\Screenshots\\uipass-after.png.",
        },
      ],
      closerAgentId: "builder-seat",
    });

    expect(result).toMatchObject({ allowed: true, code: "allowed" });
  });
});
