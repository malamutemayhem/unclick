import { afterEach, describe, expect, it, vi } from "vitest";

import { buildCapabilityBriefing, searchToolIndex } from "../memory/tool-awareness.js";
import { TOOL_INDEX } from "../memory/tool-index.generated.js";
import { ptvSearch } from "../ptv-tool.js";

describe("generated tool index", () => {
  it("is populated with apps and tools", () => {
    expect(TOOL_INDEX.length).toBeGreaterThan(100);
    expect(TOOL_INDEX.every((e) => e.tools.length > 0)).toBe(true);
  });

  it("includes PTV with its search tool", () => {
    const ptv = TOOL_INDEX.find((e) => e.app === "ptv");
    expect(ptv?.tools.some((t) => t.name === "ptv_search")).toBe(true);
  });
});

describe("searchToolIndex routing", () => {
  it("routes a train question to PTV tools", () => {
    const hits = searchToolIndex("next train departures station");
    expect(hits.some((h) => h.name.startsWith("ptv_"))).toBe(true);
  });

  it("routes a price question to a crypto tool", () => {
    const hits = searchToolIndex("bitcoin price");
    expect(hits.some((h) => h.name.includes("crypto"))).toBe(true);
  });
});

describe("inward capability briefing", () => {
  it("nudges agents to prefer an UnClick tool over web search", () => {
    const b = buildCapabilityBriefing();
    expect(b.instruction.toLowerCase()).toContain("web search");
    expect(b.how).toContain("unclick_search");
    expect(b.areas.length).toBeGreaterThan(10);
  });

  it("surfaces a public-transport area that points at PTV", () => {
    const b = buildCapabilityBriefing();
    expect(b.areas.some((a) => /transport/i.test(a) && /PTV/.test(a))).toBe(true);
  });
});

describe("ptv_search schema/impl alignment", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("errors on the advertised arg name when nothing is provided", async () => {
    const res = await ptvSearch({});
    expect(res).toEqual({ error: "search_term is required." });
  });

  it("reads the advertised `search_term` argument", async () => {
    const fetchMock = vi.fn(async (..._args: unknown[]) => ({ ok: true, json: async () => ({ stops: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await ptvSearch({ search_term: "Brighton Beach" });
    expect(fetchMock).toHaveBeenCalled();
    expect(String(fetchMock.mock.calls[0][0])).toContain("Brighton%20Beach");
  });

  it("still accepts the legacy `query` alias", async () => {
    const fetchMock = vi.fn(async (..._args: unknown[]) => ({ ok: true, json: async () => ({ stops: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await ptvSearch({ query: "Flinders Street" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("Flinders%20Street");
  });
});
