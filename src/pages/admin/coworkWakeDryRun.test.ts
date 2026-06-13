import { describe, expect, it } from "vitest";
import {
  computeCoworkWakeDryRun,
  formatCoworkWakeDryRunProof,
} from "./coworkWakeDryRun";
import type { ScheduledTask } from "./scheduledTasksCatalog";

const FIXTURE: ScheduledTask[] = [
  {
    id: "five-min",
    name: "Five Minute Task",
    cron: "*/5 * * * *",
    description: "fixture task",
    workflowFile: ".github/workflows/five-min.yml",
    owner: "TestPass",
  },
  {
    id: "daily",
    name: "Daily Task",
    cron: "17 16 * * *",
    description: "fixture task",
    workflowFile: ".github/workflows/daily.yml",
    owner: "Dogfood",
  },
];

describe("computeCoworkWakeDryRun", () => {
  it("is always non-mutating and reports the checked count", () => {
    const receipt = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 1, 0)), FIXTURE);
    expect(receipt.mutating).toBe(false);
    expect(receipt.kind).toBe("cowork-wake-dry-run");
    expect(receipt.checkedCount).toBe(2);
  });

  it("truncates the evaluated instant to the minute", () => {
    const receipt = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 5, 42)), FIXTURE);
    expect(receipt.evaluatedAtUtc).toBe("2026-06-02T09:05:00.000Z");
  });

  it("reports only the tasks due at the evaluated minute", () => {
    // 16:17 UTC matches the daily cron only (minute 17 is not a */5 multiple).
    const daily = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 16, 17, 0)), FIXTURE);
    expect(daily.dueTasks.map((task) => task.id)).toEqual(["daily"]);

    // 16:15 UTC matches the five-minute cron only.
    const fiveMin = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 16, 15, 0)), FIXTURE);
    expect(fiveMin.dueTasks.map((task) => task.id)).toEqual(["five-min"]);

    const none = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 1, 0)), FIXTURE);
    expect(none.dueTasks).toHaveLength(0);
  });

  it("stamps wouldWakeAtUtc to the evaluated minute", () => {
    const receipt = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 5, 0)), FIXTURE);
    expect(receipt.dueTasks[0]?.wouldWakeAtUtc).toBe("2026-06-02T09:05:00.000Z");
  });
});

describe("formatCoworkWakeDryRunProof", () => {
  it("renders a no-wake proof line", () => {
    const receipt = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 1, 0)), FIXTURE);
    const proof = formatCoworkWakeDryRunProof(receipt);
    expect(proof).toContain("0 of 2");
    expect(proof).toContain("dry run");
  });

  it("renders a wake proof line naming due tasks and stays non-mutating in wording", () => {
    const receipt = computeCoworkWakeDryRun(new Date(Date.UTC(2026, 5, 2, 9, 5, 0)), FIXTURE);
    const proof = formatCoworkWakeDryRunProof(receipt);
    expect(proof).toContain("Five Minute Task");
    expect(proof).toContain("nothing dispatched");
  });
});
