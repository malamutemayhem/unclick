import { describe, expect, test } from "vitest";

import { runDuePass, type RunnerDeps, type DeliveryResult } from "./runner.js";
import type { ScheduleDoc } from "../memory/schedules.js";

function schedule(overrides: Partial<ScheduleDoc>): ScheduleDoc {
  return {
    kind: "schedule_doc_v1",
    name: "Test job",
    cadence: { every: "1h" },
    action: { kind: "note", message: "hello" },
    deliver_to: [],
    enabled: true,
    next_due_at: "2026-06-11T03:00:00.000Z",
    stats: { runs: 0, successes: 0, failures: 0 },
    created_at: "2026-06-11T00:00:00.000Z",
    ...overrides,
  };
}

interface CallLog {
  executed: Array<{ endpointId: string; params: Record<string, unknown> }>;
  recorded: Array<{ slug: string; outcome: string; summary: string }>;
  delivered: Array<{ target: string; message: string }>;
}

function fakeDeps(
  due: Array<{ slug: string; schedule: ScheduleDoc }>,
  options: { endpointOk?: boolean; playbookFound?: boolean } = {},
): { deps: RunnerDeps; log: CallLog } {
  const log: CallLog = { executed: [], recorded: [], delivered: [] };
  const deps: RunnerDeps = {
    async listDue() {
      return { due };
    },
    async execute(endpointId, params) {
      log.executed.push({ endpointId, params });
      return options.endpointOk === false
        ? { ok: false, endpoint_id: endpointId, lane: "integration", error: "boom" }
        : { ok: true, endpoint_id: endpointId, lane: "integration", result: { value: 42 } };
    },
    async getPlaybook(slug) {
      return options.playbookFound === false
        ? { found: false, error: "missing" }
        : { found: true, playbook: { goal: "Do the thing", steps: [{ tool: "x" }], status: "trusted" } };
    },
    async recordRun(slug, outcome, summary) {
      log.recorded.push({ slug, outcome, summary });
      return { recorded: true };
    },
    async deliver(target, message): Promise<DeliveryResult> {
      log.delivered.push({ target, message });
      return { target, delivered: true };
    },
  };
  return { deps, log };
}

describe("runDuePass", () => {
  test("executes a due endpoint action, records success, and delivers to boardroom by default", async () => {
    const { deps, log } = fakeDeps([
      {
        slug: "schedule-geo",
        schedule: schedule({
          name: "GEO check",
          action: { kind: "endpoint", endpoint_id: "geopass_run", params: { url: "https://unclick.world" } },
        }),
      },
    ]);

    const report = await runDuePass(deps, "2026-06-11T05:00:00.000Z");
    expect(report.due_count).toBe(1);
    expect(report.reports[0]?.outcome).toBe("success");
    expect(log.executed[0]?.endpointId).toBe("geopass_run");
    expect(log.recorded[0]).toMatchObject({ slug: "schedule-geo", outcome: "success" });
    expect(log.delivered[0]?.target).toBe("boardroom");
    expect(log.delivered[0]?.message).toContain("GEO check");
    expect(log.delivered[0]?.message).toContain("SUCCESS");
  });

  test("records failure when the endpoint reports an error, and still advances", async () => {
    const { deps, log } = fakeDeps(
      [
        {
          slug: "schedule-bad",
          schedule: schedule({
            name: "Bad job",
            action: { kind: "endpoint", endpoint_id: "broken_tool", params: {} },
          }),
        },
      ],
      { endpointOk: false },
    );

    const report = await runDuePass(deps);
    expect(report.reports[0]?.outcome).toBe("failure");
    expect(report.reports[0]?.summary).toContain("boom");
    expect(log.recorded[0]?.outcome).toBe("failure");
  });

  test("playbook actions deliver a wake packet instead of blind-executing tools", async () => {
    const { deps, log } = fakeDeps([
      {
        slug: "schedule-pb",
        schedule: schedule({
          name: "Morning briefing",
          action: { kind: "playbook", playbook_slug: "playbook-morning-briefing" },
        }),
      },
    ]);

    const report = await runDuePass(deps);
    expect(report.reports[0]?.outcome).toBe("success");
    expect(report.reports[0]?.summary).toContain("Wake packet");
    expect(report.reports[0]?.summary).toContain("playbook-morning-briefing");
    // No tool execution happened for a playbook action.
    expect(log.executed.length).toBe(0);
  });

  test("missing playbook is a recorded failure, not a silent skip", async () => {
    const { deps, log } = fakeDeps(
      [
        {
          slug: "schedule-pb",
          schedule: schedule({ action: { kind: "playbook", playbook_slug: "playbook-gone" } }),
        },
      ],
      { playbookFound: false },
    );

    await runDuePass(deps);
    expect(log.recorded[0]?.outcome).toBe("failure");
  });

  test("fans deliveries out to every configured target and survives a delivery throw", async () => {
    const { deps, log } = fakeDeps([
      {
        slug: "schedule-multi",
        schedule: schedule({
          name: "Multi target",
          deliver_to: ["boardroom", "telegram:12345"],
        }),
      },
    ]);
    const throwingDeliver = deps.deliver;
    deps.deliver = async (target, message) => {
      if (target.startsWith("telegram:")) throw new Error("telegram down");
      return throwingDeliver(target, message);
    };

    const report = await runDuePass(deps);
    expect(report.reports[0]?.deliveries).toHaveLength(2);
    expect(report.reports[0]?.deliveries[0]).toMatchObject({ target: "boardroom", delivered: true });
    expect(report.reports[0]?.deliveries[1]).toMatchObject({ target: "telegram:12345", delivered: false });
    // The run was still recorded before delivery, so the schedule advanced.
    expect(log.recorded).toHaveLength(1);
  });

  test("no due schedules means a quiet pass", async () => {
    const { deps, log } = fakeDeps([]);
    const report = await runDuePass(deps);
    expect(report.due_count).toBe(0);
    expect(report.reports).toHaveLength(0);
    expect(log.recorded).toHaveLength(0);
    expect(log.delivered).toHaveLength(0);
  });
});
