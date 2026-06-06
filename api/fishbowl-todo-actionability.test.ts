import { describe, expect, it } from "vitest";
import {
  classifyTodoActionability,
  isRoleAssignee,
  LIVE_OWNER_MS,
  ROLE_ASSIGNEES,
  STALE_IN_PROGRESS_MS,
  STALE_OPEN_ASSIGNED_MS,
  type TodoActionability,
} from "./lib/fishbowl-todo-actionability";

const NOW = Date.parse("2026-05-26T12:00:00.000Z");
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

// ISO timestamp whose age relative to NOW is exactly `ageMs`.
const at = (ageMs: number) => new Date(NOW - ageMs).toISOString();

// The original inline closure returned null for the fresh case; the helper
// returns "fresh_owner_do_not_touch". This maps the helper result back to the
// legacy shape so parity assertions read against the documented old behavior.
const legacyOf = (reason: TodoActionability): string | null =>
  reason === "fresh_owner_do_not_touch" ? null : reason;

describe("exported constants (verbatim from memory-admin.ts)", () => {
  it("preserves the staleness/liveness thresholds", () => {
    expect(STALE_OPEN_ASSIGNED_MS).toBe(6 * 60 * 60 * 1000);
    expect(STALE_IN_PROGRESS_MS).toBe(6 * 60 * 60 * 1000);
    expect(LIVE_OWNER_MS).toBe(60 * 60 * 1000);
  });

  it("preserves the role-assignee list", () => {
    expect([...ROLE_ASSIGNEES].sort()).toEqual(
      [
        "master",
        "coordinator",
        "builder",
        "reviewer",
        "watcher",
        "planner",
        "tester",
        "safety",
        "messenger",
        "pinballwake-job-runner",
      ].sort(),
    );
  });
});

describe("classifyTodoActionability - one per state", () => {
  it("unassigned_open: open todo with no assignee", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: null,
        updatedAt: at(0),
        nowMs: NOW,
      }),
    ).toBe("unassigned_open");
  });

  it("role_assigned_open: open todo assigned to a role identity", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "builder",
        updatedAt: at(0),
        ownerLastSeenAt: at(0),
        nowMs: NOW,
      }),
    ).toBe("role_assigned_open");
  });

  it("stale_assigned_open: open, older than 6h, owner dormant", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      }),
    ).toBe("stale_assigned_open");
  });

  it("stale_in_progress: in_progress, older than 6h, owner dormant", () => {
    expect(
      classifyTodoActionability({
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      }),
    ).toBe("stale_in_progress");
  });

  it("fresh_owner_do_not_touch: everything else", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(1 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      }),
    ).toBe("fresh_owner_do_not_touch");
  });
});

describe("fresh-owner guards", () => {
  it("human assignee younger than 6h stays fresh even if owner is dormant", () => {
    expect(
      classifyTodoActionability({
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: at(3 * HOUR),
        ownerLastSeenAt: at(5 * HOUR),
        nowMs: NOW,
      }),
    ).toBe("fresh_owner_do_not_touch");
  });

  it("human assignee older than 6h stays fresh when owner was seen within 1h (open)", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(8 * HOUR),
        ownerLastSeenAt: at(30 * MINUTE),
        nowMs: NOW,
      }),
    ).toBe("fresh_owner_do_not_touch");
  });

  it("human assignee older than 6h stays fresh when owner was seen within 1h (in_progress)", () => {
    expect(
      classifyTodoActionability({
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: at(8 * HOUR),
        ownerLastSeenAt: at(30 * MINUTE),
        nowMs: NOW,
      }),
    ).toBe("fresh_owner_do_not_touch");
  });
});

describe("isRoleAssignee role-prefix matches", () => {
  it("matches the three reserved prefixes", () => {
    expect(isRoleAssignee("codex-forge-123")).toBe(true);
    expect(isRoleAssignee("claude-pc-tether-7")).toBe(true);
    expect(isRoleAssignee("claude-code-pc-tether-abc")).toBe(true);
  });

  it("trims and lowercases before matching", () => {
    expect(isRoleAssignee("  Codex-Forge-9 ")).toBe(true);
    expect(isRoleAssignee("BUILDER")).toBe(true);
  });

  it("does not match plain human identities", () => {
    expect(isRoleAssignee("alice")).toBe(false);
    expect(isRoleAssignee("forge-codex")).toBe(false);
    expect(isRoleAssignee("")).toBe(false);
  });

  it("classifies open prefixed assignees as role_assigned_open", () => {
    for (const id of ["codex-forge-1", "claude-pc-tether-2", "claude-code-pc-tether-3"]) {
      expect(
        classifyTodoActionability({
          status: "open",
          assignedToAgentId: id,
          updatedAt: at(0),
          nowMs: NOW,
        }),
      ).toBe("role_assigned_open");
    }
  });
});

describe("unparseable / missing timestamps take the +Infinity age path", () => {
  it("missing todo timestamps make an assigned open todo stale", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "alice",
        nowMs: NOW,
      }),
    ).toBe("stale_assigned_open");
  });

  it("unparseable timestamps make an in_progress todo stale", () => {
    expect(
      classifyTodoActionability({
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: "not-a-date",
        ownerLastSeenAt: "garbage",
        nowMs: NOW,
      }),
    ).toBe("stale_in_progress");
  });

  it("falls back from missing updatedAt to createdAt", () => {
    expect(
      classifyTodoActionability({
        status: "open",
        assignedToAgentId: "alice",
        createdAt: at(1 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      }),
    ).toBe("fresh_owner_do_not_touch");
  });
});

describe("parity table vs documented old-inline expectations", () => {
  // `legacy` is exactly what the old inline closure in memory-admin.ts returned
  // (null for the fresh case). The helper output, mapped through legacyOf, must
  // match it for every row.
  const rows: Array<{
    name: string;
    input: Parameters<typeof classifyTodoActionability>[0];
    legacy: string | null;
  }> = [
    {
      name: "open, no assignee",
      input: { status: "open", assignedToAgentId: "", updatedAt: at(0), nowMs: NOW },
      legacy: "unassigned_open",
    },
    {
      name: "open, whitespace assignee trims to empty",
      input: { status: "open", assignedToAgentId: "   ", updatedAt: at(0), nowMs: NOW },
      legacy: "unassigned_open",
    },
    {
      name: "open, fresh role assignee",
      input: {
        status: "open",
        assignedToAgentId: "builder",
        updatedAt: at(0),
        ownerLastSeenAt: at(0),
        nowMs: NOW,
      },
      legacy: "role_assigned_open",
    },
    {
      name: "open, stale role assignee still role_assigned_open (role precedes staleness)",
      input: {
        status: "open",
        assignedToAgentId: "codex-forge-9",
        updatedAt: at(10 * HOUR),
        ownerLastSeenAt: at(10 * HOUR),
        nowMs: NOW,
      },
      legacy: "role_assigned_open",
    },
    {
      name: "open, human assignee, stale, dormant owner",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      },
      legacy: "stale_assigned_open",
    },
    {
      name: "open, stale todo but owner seen within 1h => fresh",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(30 * MINUTE),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "open, todo younger than 6h => fresh",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(3 * HOUR),
        ownerLastSeenAt: at(5 * HOUR),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "in_progress, human assignee, stale, dormant owner",
      input: {
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      },
      legacy: "stale_in_progress",
    },
    {
      name: "in_progress, stale todo but owner seen within 1h => fresh",
      input: {
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(30 * MINUTE),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "in_progress, stale role assignee => stale_in_progress (role precedence is open-only)",
      input: {
        status: "in_progress",
        assignedToAgentId: "builder",
        updatedAt: at(10 * HOUR),
        ownerLastSeenAt: at(10 * HOUR),
        nowMs: NOW,
      },
      legacy: "stale_in_progress",
    },
    {
      name: "in_progress, fresh role assignee => fresh",
      input: {
        status: "in_progress",
        assignedToAgentId: "builder",
        updatedAt: at(2 * HOUR),
        ownerLastSeenAt: at(10 * HOUR),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "open, missing timestamps => Infinity age => stale",
      input: { status: "open", assignedToAgentId: "alice", nowMs: NOW },
      legacy: "stale_assigned_open",
    },
    {
      name: "in_progress, unparseable timestamps => Infinity age => stale",
      input: {
        status: "in_progress",
        assignedToAgentId: "alice",
        updatedAt: "garbage",
        ownerLastSeenAt: "garbage",
        nowMs: NOW,
      },
      legacy: "stale_in_progress",
    },
    {
      name: "open, updatedAt missing falls back to recent createdAt => fresh",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        createdAt: at(1 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "open, todoAge exactly 6h is not > 6h => fresh (strict boundary)",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(6 * HOUR),
        ownerLastSeenAt: at(2 * HOUR),
        nowMs: NOW,
      },
      legacy: null,
    },
    {
      name: "open, ownerAge exactly 1h is not > 1h => owner live => fresh (strict boundary)",
      input: {
        status: "open",
        assignedToAgentId: "alice",
        updatedAt: at(7 * HOUR),
        ownerLastSeenAt: at(1 * HOUR),
        nowMs: NOW,
      },
      legacy: null,
    },
  ];

  it.each(rows)("matches old inline expectation: $name", ({ input, legacy }) => {
    expect(legacyOf(classifyTodoActionability(input))).toBe(legacy);
  });
});
