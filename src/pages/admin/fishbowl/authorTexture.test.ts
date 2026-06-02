import { describe, expect, it } from "vitest";
import {
  AUTHOR_TEXTURE,
  authorTexture,
  classifyAuthorType,
  isHumanAgentId,
  type FishbowlAuthorType,
} from "./authorTexture";

const msg = (
  author_agent_id: string | null,
  tags: string[] | null,
  author_name: string | null = "Some Agent",
) => ({ author_agent_id, tags, author_name });

describe("Boardroom author texture", () => {
  it("detects human agent ids by the human- prefix", () => {
    expect(isHumanAgentId("human-616d4beb")).toBe(true);
    expect(isHumanAgentId("chatgpt-codex-worker-7")).toBe(false);
    expect(isHumanAgentId(null)).toBe(false);
    expect(isHumanAgentId(undefined)).toBe(false);
  });

  it("classifies a human post regardless of tags", () => {
    expect(classifyAuthorType(msg("human-123", ["heartbeat"]))).toBe("human");
    expect(classifyAuthorType(msg("human-123", ["event"]))).toBe("human");
    expect(classifyAuthorType(msg("human-123", null))).toBe("human");
  });

  it("classifies heartbeat chatter as cron AI", () => {
    expect(classifyAuthorType(msg("claude-worker3", ["heartbeat"]))).toBe("cron");
    expect(classifyAuthorType(msg("claude-worker3", ["heartbeat", "fyi"]))).toBe("cron");
  });

  it("classifies platform events and unnamed posts as system", () => {
    expect(classifyAuthorType(msg("chatgpt-codex-worker-2", ["event", "todo-completed"]))).toBe(
      "system",
    );
    // Automated rows often arrive with no author_name.
    expect(classifyAuthorType(msg("some-bot", ["fyi"], null))).toBe("system");
    expect(classifyAuthorType(msg("some-bot", ["fyi"], "   "))).toBe("system");
  });

  it("classifies normal worker prose as interactive AI", () => {
    expect(classifyAuthorType(msg("chatgpt-codex-worker-9", ["fyi"]))).toBe("agent");
    expect(classifyAuthorType(msg("worker-11-admin-ui-polish", ["done"]))).toBe("agent");
    expect(classifyAuthorType(msg("worker-11-admin-ui-polish", null))).toBe("agent");
  });

  it("human takes precedence over a missing name", () => {
    expect(classifyAuthorType(msg("human-abc", null, null))).toBe("human");
  });

  it("returns a distinct, complete texture for every category", () => {
    const types: FishbowlAuthorType[] = ["human", "agent", "cron", "system"];
    const stripes = new Set<string>();
    for (const type of types) {
      const texture = AUTHOR_TEXTURE[type];
      expect(texture.containerClass).toContain("border-l");
      expect(texture.chipClass.length).toBeGreaterThan(0);
      stripes.add(texture.containerClass);
    }
    // Each category has its own stripe so they read differently at a glance.
    expect(stripes.size).toBe(types.length);
  });

  it("authorTexture echoes the resolved type alongside its styling", () => {
    const texture = authorTexture(msg("human-123", null));
    expect(texture.type).toBe("human");
    expect(texture.label).toBe("you");
    expect(texture.muted).toBe(false);

    const cron = authorTexture(msg("claude-worker3", ["heartbeat"]));
    expect(cron.type).toBe("cron");
    expect(cron.muted).toBe(true);
  });
});
