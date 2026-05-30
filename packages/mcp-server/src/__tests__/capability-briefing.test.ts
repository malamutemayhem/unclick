import { afterEach, describe, expect, it, vi } from "vitest";

import { buildCapabilityBriefing } from "../memory/tool-awareness.js";
import { ptvSearch } from "../ptv-tool.js";

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
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => ({ stops: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await ptvSearch({ search_term: "Brighton Beach" });
    expect(fetchMock).toHaveBeenCalled();
    expect(String(fetchMock.mock.calls[0][0])).toContain("Brighton%20Beach");
  });

  it("still accepts the legacy `query` alias", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => ({ stops: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await ptvSearch({ query: "Flinders Street" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("Flinders%20Street");
  });
});
