import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  createBoardroomAlias,
  getLegacyUsageCounts,
  isLegacyNameCleared,
  recordLegacyNameUse,
  resetLegacyUsageCounts,
  setLegacyUsageSink,
  type LegacyNameUsage,
} from "./boardroom-compat.js";

describe("boardroom-compat alarmed redirects", () => {
  let alarms: LegacyNameUsage[];

  beforeEach(() => {
    alarms = [];
    resetLegacyUsageCounts();
    setLegacyUsageSink((usage) => alarms.push(usage));
  });

  afterEach(() => {
    setLegacyUsageSink(null);
    resetLegacyUsageCounts();
  });

  it("treats an unused legacy name as cleared", () => {
    expect(isLegacyNameCleared("evaluateFishbowlCompletionPolicy")).toBe(true);
    expect(getLegacyUsageCounts()).toEqual({});
  });

  it("delegates through the alias and returns the real result", () => {
    const add = (a: number, b: number) => a + b;
    const legacyAdd = createBoardroomAlias("fishbowlAdd", "boardroomAdd", add);
    expect(legacyAdd(2, 3)).toBe(5);
  });

  it("alarms and counts every legacy call until reset", () => {
    const legacyAdd = createBoardroomAlias(
      "fishbowlAdd",
      "boardroomAdd",
      (a: number, b: number) => a + b,
    );

    legacyAdd(1, 1);
    legacyAdd(2, 2);

    expect(getLegacyUsageCounts()).toEqual({ fishbowlAdd: 2 });
    expect(isLegacyNameCleared("fishbowlAdd")).toBe(false);
    expect(alarms).toHaveLength(2);
    expect(alarms[0]).toMatchObject({
      legacyName: "fishbowlAdd",
      canonicalName: "boardroomAdd",
      context: "function-alias",
    });
    expect(typeof alarms[0].at).toBe("string");

    resetLegacyUsageCounts();
    expect(isLegacyNameCleared("fishbowlAdd")).toBe(true);
  });

  it("records direct (non-function) legacy uses too", () => {
    recordLegacyNameUse("FISHBOWL_WAKE_TOKEN", "BOARDROOM_WAKE_TOKEN", "env-var");
    recordLegacyNameUse("FISHBOWL_WAKE_TOKEN", "BOARDROOM_WAKE_TOKEN", "env-var");
    recordLegacyNameUse("mc_fishbowl_todos", "mc_boardroom_todos", "db-table");

    expect(getLegacyUsageCounts()).toEqual({
      FISHBOWL_WAKE_TOKEN: 2,
      mc_fishbowl_todos: 1,
    });
    expect(alarms.map((a) => a.context)).toEqual(["env-var", "env-var", "db-table"]);
  });
});
