import { describe, expect, it } from "vitest";
import {
  EPHEMERAL_CACHE_CONTROL,
  applyPromptCaching,
  cacheControl,
  cacheableSystem,
  splitStablePrefix,
  withCachedTools,
  type TextBlock,
} from "./prompt-caching";

describe("cacheControl", () => {
  it("defaults to a 5m ephemeral breakpoint", () => {
    expect(cacheControl()).toEqual({ type: "ephemeral" });
    expect(EPHEMERAL_CACHE_CONTROL).toEqual({ type: "ephemeral" });
  });
  it("emits a 1h ttl when asked", () => {
    expect(cacheControl("1h")).toEqual({ type: "ephemeral", ttl: "1h" });
  });
});

describe("cacheableSystem", () => {
  it("wraps a stable prefix in a single cached text block", () => {
    expect(cacheableSystem("you are a helpful agent")).toEqual([
      { type: "text", text: "you are a helpful agent", cache_control: { type: "ephemeral" } },
    ]);
  });
});

describe("splitStablePrefix", () => {
  it("splits on the first delimiter into prefix + suffix", () => {
    expect(splitStablePrefix("STABLE---variable bit", "---")).toEqual({
      stablePrefix: "STABLE",
      variableSuffix: "variable bit",
    });
  });
  it("treats the whole string as variable when the delimiter is absent", () => {
    expect(splitStablePrefix("no delimiter here", "###")).toEqual({
      stablePrefix: "",
      variableSuffix: "no delimiter here",
    });
  });
  it("is safe with an empty delimiter", () => {
    expect(splitStablePrefix("abc", "")).toEqual({ stablePrefix: "", variableSuffix: "abc" });
  });
});

describe("withCachedTools", () => {
  it("marks only the last tool with a cache breakpoint and does not mutate input", () => {
    const tools = [{ name: "a" }, { name: "b" }];
    const out = withCachedTools(tools);
    expect(out[0]).toEqual({ name: "a" });
    expect(out[1]).toEqual({ name: "b", cache_control: { type: "ephemeral" } });
    // original untouched
    expect(tools[1]).toEqual({ name: "b" });
  });
  it("returns [] for an empty tools array", () => {
    expect(withCachedTools([])).toEqual([]);
  });
});

describe("applyPromptCaching", () => {
  it("normalizes a string system into a cached text block", () => {
    const req = { model: "m", system: "stable system", max_tokens: 100, messages: [] };
    const out = applyPromptCaching(req);
    expect(out.system).toEqual([
      { type: "text", text: "stable system", cache_control: { type: "ephemeral" } },
    ]);
    // input not mutated
    expect(req.system).toBe("stable system");
  });

  it("adds a breakpoint to the last block of an array system", () => {
    const system: TextBlock[] = [
      { type: "text", text: "rules" },
      { type: "text", text: "more rules" },
    ];
    const out = applyPromptCaching({ system, messages: [] });
    const outSystem = out.system as TextBlock[];
    expect(outSystem[0].cache_control).toBeUndefined();
    expect(outSystem[1].cache_control).toEqual({ type: "ephemeral" });
  });

  it("optionally caches tools too", () => {
    const out = applyPromptCaching(
      { system: "s", tools: [{ name: "x" }, { name: "y" }], messages: [] },
      { cacheTools: true, ttl: "1h" },
    );
    const tools = out.tools as Array<{ name: string; cache_control?: unknown }>;
    expect(tools[1].cache_control).toEqual({ type: "ephemeral", ttl: "1h" });
    expect((out.system as TextBlock[])[0].cache_control).toEqual({ type: "ephemeral", ttl: "1h" });
  });

  it("leaves a request without system or tools unchanged", () => {
    const req = { model: "m", messages: [{ role: "user", content: "hi" }] };
    const out = applyPromptCaching(req);
    expect(out).toEqual(req);
  });

  it("does not cache an empty/whitespace system", () => {
    const out = applyPromptCaching({ system: "   ", messages: [] });
    expect(out.system).toBe("   ");
  });
});
