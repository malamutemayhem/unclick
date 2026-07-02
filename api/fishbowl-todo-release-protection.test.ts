import { describe, expect, it } from "vitest";
import {
  FISHBOWL_TODO_RELEASE_PROTECTED_IDS,
  fishbowlTodoReleaseProtectedReason,
} from "./lib/fishbowl-todo-release-protection";

describe("fishbowlTodoReleaseProtectedReason", () => {
  it("protects only the exact AFK canary seed id", () => {
    const [seedId] = [...FISHBOWL_TODO_RELEASE_PROTECTED_IDS];

    expect(
      fishbowlTodoReleaseProtectedReason({
        id: seedId,
        status: "open",
        assigned_to_agent_id: "pinballwake-autonomous-runner",
      }),
    ).toBe("canary_seed_protected");

    expect(
      fishbowlTodoReleaseProtectedReason({
        id: "11111111-2222-3333-4444-555555555555",
        status: "open",
        assigned_to_agent_id: "pinballwake-autonomous-runner",
      }),
    ).toBeNull();
  });

  it("protects human and manual Boardroom work", () => {
    expect(
      fishbowlTodoReleaseProtectedReason({
        id: "t",
        status: "human_blocker",
        assigned_to_agent_id: "worker-1",
      }),
    ).toBe("human_blocker_protected");

    expect(
      fishbowlTodoReleaseProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "human-operator",
      }),
    ).toBe("human_owned_work_protected");

    expect(
      fishbowlTodoReleaseProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "worker-1",
        title: "manual-only deploy step",
      }),
    ).toBe("manual_only_protected");
  });
});
