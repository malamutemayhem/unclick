import { describe, expect, it } from "vitest";
import {
  HYDRATION_OWNER_FRESH_WINDOW_MS,
  planQueueHydrationSignals,
} from "./queue-hydration";

const NOW = Date.parse("2026-07-02T12:00:00Z");
const TENANT = "hash-a";

function iso(msAgo: number): string {
  return new Date(NOW - msAgo).toISOString();
}

describe("planQueueHydrationSignals", () => {
  it("flags a tenant with zero active jobs and unclaimed open backlog", () => {
    const plans = planQueueHydrationSignals({
      todos: [
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: null },
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: null },
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: "seat-x" },
      ],
      profilesByTenant: new Map(),
      nowMs: NOW,
    });
    expect(plans).toHaveLength(1);
    expect(plans[0].insert.action).toBe("queue_hydration_failure");
    expect(plans[0].insert.severity).toBe("action_needed");
    expect(plans[0].insert.payload).toMatchObject({
      active_jobs: 0,
      open_unassigned: 2,
      open_assigned: 1,
      in_progress: 0,
    });
  });

  it("stays quiet when an in_progress todo has a live owner", () => {
    const plans = planQueueHydrationSignals({
      todos: [
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: null },
        { api_key_hash: TENANT, status: "in_progress", assigned_to_agent_id: "seat-live" },
      ],
      profilesByTenant: new Map([
        [TENANT, [{ agent_id: "seat-live", last_seen_at: iso(10 * 60 * 1000) }]],
      ]),
      nowMs: NOW,
    });
    expect(plans).toHaveLength(0);
  });

  it("counts an in_progress todo with a quiet owner (seen > 24h ago) as inactive", () => {
    const plans = planQueueHydrationSignals({
      todos: [
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: null },
        { api_key_hash: TENANT, status: "in_progress", assigned_to_agent_id: "seat-quiet" },
      ],
      profilesByTenant: new Map([
        [
          TENANT,
          [{ agent_id: "seat-quiet", last_seen_at: iso(HYDRATION_OWNER_FRESH_WINDOW_MS + 60_000) }],
        ],
      ]),
      nowMs: NOW,
    });
    expect(plans).toHaveLength(1);
    expect(plans[0].insert.payload).toMatchObject({
      active_jobs: 0,
      in_progress: 1,
      open_unassigned: 1,
    });
  });

  it("stays quiet when there is no unclaimed open backlog", () => {
    const plans = planQueueHydrationSignals({
      todos: [
        { api_key_hash: TENANT, status: "open", assigned_to_agent_id: "seat-x" },
        { api_key_hash: TENANT, status: "in_progress", assigned_to_agent_id: "seat-quiet" },
      ],
      profilesByTenant: new Map(),
      nowMs: NOW,
    });
    expect(plans).toHaveLength(0);
  });

  it("plans independently per tenant", () => {
    const plans = planQueueHydrationSignals({
      todos: [
        { api_key_hash: "hash-a", status: "open", assigned_to_agent_id: null },
        { api_key_hash: "hash-b", status: "in_progress", assigned_to_agent_id: "seat-live" },
        { api_key_hash: "hash-b", status: "open", assigned_to_agent_id: null },
      ],
      profilesByTenant: new Map([
        ["hash-b", [{ agent_id: "seat-live", last_seen_at: iso(60_000) }]],
      ]),
      nowMs: NOW,
    });
    expect(plans).toHaveLength(1);
    expect(plans[0].api_key_hash).toBe("hash-a");
  });
});
