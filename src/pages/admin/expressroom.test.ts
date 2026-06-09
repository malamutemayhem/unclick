import { describe, expect, it } from "vitest";
import {
  EXPRESSROOM_INDUCTION_TEXT,
  EXPRESSROOM_GUARDRAILS,
  buildExpressRoomOfficialJobDescription,
  countReadyExpressRoomFields,
  type ExpressRoomDraft,
} from "./expressroom";

describe("DraftRoom model", () => {
  it("keeps the Manual draft lane clearly separated from official done work", () => {
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("DraftRoom");
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("visible first draft");
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("official Jobs Board");
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("Do not claim DONE from DraftRoom");
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("Warm smart-seat rule");
    expect(EXPRESSROOM_INDUCTION_TEXT).toContain("low-capacity unattended runner");
    expect(EXPRESSROOM_GUARDRAILS.join(" ")).toContain("untrusted");
    expect(EXPRESSROOM_GUARDRAILS.join(" ")).toContain("build or fit the smallest safe draft");
    expect(EXPRESSROOM_GUARDRAILS.join(" ")).toContain("exact blocker and next build step");
  });

  it("counts the required fields for a direct chat capture", () => {
    expect(
      countReadyExpressRoomFields({
        job_name_mirror: "Proof Ledger v2",
        short_description: "Build the evidence model.",
        brief_markdown: "User asked for structured proof.",
        supplied_code: "",
        supplied_code_status: "not_supplied",
      }),
    ).toBe(4);
  });

  it("builds a Jobs Board insertion brief from a Manual draft", () => {
    const draft: ExpressRoomDraft = {
      id: "11111111-1111-4111-8111-111111111111",
      job_name_mirror: "HarnessKit worker packet",
      official_todo_id: null,
      short_description: "Manual draft for worker induction.",
      brief_markdown: "# Intake\nChris wants a faster builder path.",
      supplied_code: "export const draft = true;",
      supplied_code_status: "partial",
      express_status: "draft",
      created_by_agent_id: "chat-seat",
      source_chat_session_id: "session-1",
      created_at: "2026-05-20T00:00:00Z",
      updated_at: "2026-05-20T00:00:00Z",
    };

    const description = buildExpressRoomOfficialJobDescription(draft);

    expect(description).toContain("Manual DraftRoom import.");
    expect(description).toContain("This is a Manual draft, not finished work.");
    expect(description).toContain("export const draft = true;");
    expect(description).toContain("normal UnClick review and proof gates");
    expect(description).toContain("Warm smart-seat rule");
    expect(description).toContain("smallest safe draft or the exact blocker");
    expect(description).toContain("Alarm bells");
    expect(description).toContain("Do not mark this official job done from the draft alone");
  });
});
