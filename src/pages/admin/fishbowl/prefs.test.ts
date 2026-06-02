import { describe, expect, it } from "vitest";
import {
  DEFAULT_VIEW_PREFS,
  filterFeedByPrefs,
  filterProfilesByPrefs,
  isAgentMuted,
} from "./prefs";

const msg = (author_agent_id: string | null, tags: string[] | null) => ({
  author_agent_id,
  tags,
});

describe("Boardroom view prefs", () => {
  it("treats the default prefs as a pass-through", () => {
    const messages = [msg("a", ["pr"]), msg("b", null), msg(null, ["fyi"])];
    expect(filterFeedByPrefs(messages, DEFAULT_VIEW_PREFS)).toEqual(messages);
  });

  it("drops posts from muted agents", () => {
    const prefs = { ...DEFAULT_VIEW_PREFS, mutedAgentIds: ["noisy"] };
    const messages = [msg("noisy", ["pr"]), msg("quiet", ["pr"])];
    expect(filterFeedByPrefs(messages, prefs).map((m) => m.author_agent_id)).toEqual([
      "quiet",
    ]);
  });

  it("keeps only messages matching an active tag filter", () => {
    const prefs = { ...DEFAULT_VIEW_PREFS, tagFilters: ["decision"] };
    const messages = [
      msg("a", ["decision"]),
      msg("b", ["fyi"]),
      msg("c", ["pr", "decision"]),
      msg("d", null),
    ];
    expect(filterFeedByPrefs(messages, prefs).map((m) => m.author_agent_id)).toEqual([
      "a",
      "c",
    ]);
  });

  it("combines mute and tag filters", () => {
    const prefs = {
      ...DEFAULT_VIEW_PREFS,
      mutedAgentIds: ["a"],
      tagFilters: ["pr"],
    };
    const messages = [msg("a", ["pr"]), msg("b", ["pr"]), msg("b", ["fyi"])];
    expect(filterFeedByPrefs(messages, prefs)).toEqual([msg("b", ["pr"])]);
  });

  it("removes muted agents from presence lists without copying when unmuted", () => {
    const profiles = [{ agent_id: "a" }, { agent_id: "b" }];
    expect(filterProfilesByPrefs(profiles, DEFAULT_VIEW_PREFS)).toBe(profiles);

    const prefs = { ...DEFAULT_VIEW_PREFS, mutedAgentIds: ["a"] };
    expect(filterProfilesByPrefs(profiles, prefs)).toEqual([{ agent_id: "b" }]);
  });

  it("guards isAgentMuted against null ids", () => {
    const prefs = { ...DEFAULT_VIEW_PREFS, mutedAgentIds: ["a"] };
    expect(isAgentMuted(prefs, null)).toBe(false);
    expect(isAgentMuted(prefs, "a")).toBe(true);
  });
});
