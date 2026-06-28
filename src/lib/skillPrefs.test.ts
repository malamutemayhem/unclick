import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  SKILL_PREFS_STORAGE_KEY,
  loadDisabledSkills,
  saveDisabledSkills,
} from "./skillPrefs";

describe("skillPrefs", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it("defaults to nothing disabled (all skills on)", () => {
    expect(loadDisabledSkills()).toEqual([]);
  });

  it("round-trips the disabled set and de-duplicates", () => {
    saveDisabledSkills(["coordinator-router", "deep-research-analyst", "coordinator-router"]);
    expect(loadDisabledSkills().sort()).toEqual(["coordinator-router", "deep-research-analyst"]);
  });

  it("ignores corrupt or non-array payloads", () => {
    window.localStorage.setItem(SKILL_PREFS_STORAGE_KEY, "{ not json");
    expect(loadDisabledSkills()).toEqual([]);

    window.localStorage.setItem(SKILL_PREFS_STORAGE_KEY, JSON.stringify({ disabled: ["x"] }));
    expect(loadDisabledSkills()).toEqual([]);
  });

  it("drops non-string and empty entries", () => {
    window.localStorage.setItem(SKILL_PREFS_STORAGE_KEY, JSON.stringify(["ok", 1, "", null, "fine"]));
    expect(loadDisabledSkills().sort()).toEqual(["fine", "ok"]);
  });
});
