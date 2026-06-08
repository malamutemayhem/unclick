import { describe, it, expect, vi, afterEach } from "vitest";
import { covidGlobal, covidCountry, covidVaccine } from "./diseasesh-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("diseasesh-tool", () => {
  it("covidGlobal returns worldwide stats", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ cases: 700000000, deaths: 7000000, recovered: 680000000 }),
    }));
    const r = await covidGlobal({}) as Record<string, unknown>;
    expect(r.cases).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("covidCountry returns country stats", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ country: "USA", cases: 100000000, deaths: 1000000 }),
    }));
    const r = await covidCountry({ country: "USA" }) as Record<string, unknown>;
    expect(r.country).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("covidCountry requires country", async () => {
    const r = await covidCountry({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("covidVaccine returns vaccine data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ totalCandidates: "300", data: [{ candidate: "Pfizer/BioNTech", mechanism: "mRNA" }] }),
    }));
    const r = await covidVaccine({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
