import { describe, expect, it } from "vitest";
import {
  DEFAULT_VIEW_PREFS,
  filterFeedByPrefs,
  filterFeedByScope,
  filterProfilesByPrefs,
  isAgentMuted,
  parseFeedScope,
} from "./prefs";

const msg = (author_agent_id: string | null, tags: string[] | null) => ({
  author_agent_id,
  tags,
});

const scopeMsg = (
  author_agent_id: string | null,
  tags: string[] | null,
  recipients: string[] | null = ["all"],
  author_name: string | null = "Agent",
) => ({ author_agent_id, tags, recipients, author_name });

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

  it("defaults the view to the viewer's team", () => {
    expect(DEFAULT_VIEW_PREFS.scope).toBe("my_team");
  });
});

describe("Boardroom feed scope", () => {
  const viewer = { agentId: "human-me", emoji: "😎" };

  const human = scopeMsg("human-me", ["fyi"], ["all"], "Chris");
  const teammate = scopeMsg("chatgpt-codex-worker-9", ["fyi"], ["all"], "Worker 9");
  const cron = scopeMsg("claude-worker3", ["heartbeat"], ["all"], "Popcorn");
  const system = scopeMsg("bot", ["event", "todo-completed"], ["all"], null);
  const toMe = scopeMsg("chatgpt-codex-worker-4", ["handoff"], ["😎"], "Worker 4");
  const all = [human, teammate, cron, system, toMe];

  it("passes everything through for the All scope", () => {
    expect(filterFeedByScope(all, "all", viewer)).toEqual(all);
  });

  it("hides platform/system posts for My team", () => {
    expect(filterFeedByScope(all, "my_team", viewer)).toEqual([human, teammate, cron, toMe]);
  });

  it("keeps only posts the viewer authored or that name them for Mine", () => {
    expect(filterFeedByScope(all, "assigned_to_me", viewer)).toEqual([human, toMe]);
  });

  it("matches the viewer by agent id in recipients too", () => {
    const byId = scopeMsg("someone", ["handoff"], ["human-me"], "Someone");
    expect(filterFeedByScope([byId], "assigned_to_me", viewer)).toEqual([byId]);
  });

  it("does not treat a broadcast as a personal assignment", () => {
    expect(filterFeedByScope([teammate], "assigned_to_me", viewer)).toEqual([]);
  });

  it("validates persisted scope values and falls back to the default", () => {
    expect(parseFeedScope("all")).toBe("all");
    expect(parseFeedScope("assigned_to_me")).toBe("assigned_to_me");
    expect(parseFeedScope("bogus")).toBe("my_team");
    expect(parseFeedScope(undefined)).toBe("my_team");
  });
});
