import { describe, it, expect } from "vitest";
import {
  lineSpace, layerCount, thermal, electrical,
  subCost, finePitch, forHpc, material,
  bestUse, packageSubstrates,
} from "../package-substrate-calc.js";

describe("lineSpace", () => {
  it("silicon interposer finest line space", () => {
    expect(lineSpace("silicon_interposer")).toBeGreaterThan(lineSpace("ceramic_htcc"));
  });
});

describe("layerCount", () => {
  it("organic buildup most layers", () => {
    expect(layerCount("organic_buildup")).toBeGreaterThan(layerCount("silicon_interposer"));
  });
});

describe("thermal", () => {
  it("ceramic htcc best thermal", () => {
    expect(thermal("ceramic_htcc")).toBeGreaterThan(thermal("organic_buildup"));
  });
});

describe("electrical", () => {
  it("silicon interposer best electrical", () => {
    expect(electrical("silicon_interposer")).toBeGreaterThan(electrical("organic_buildup"));
  });
});

describe("subCost", () => {
  it("silicon interposer most expensive", () => {
    expect(subCost("silicon_interposer")).toBeGreaterThan(subCost("organic_buildup"));
  });
});

describe("finePitch", () => {
  it("silicon interposer is fine pitch", () => {
    expect(finePitch("silicon_interposer")).toBe(true);
  });
  it("organic buildup not fine pitch", () => {
    expect(finePitch("organic_buildup")).toBe(false);
  });
});

describe("forHpc", () => {
  it("silicon interposer is for hpc", () => {
    expect(forHpc("silicon_interposer")).toBe(true);
  });
  it("organic buildup not for hpc", () => {
    expect(forHpc("organic_buildup")).toBe(false);
  });
});

describe("material", () => {
  it("silicon interposer uses tsv si rdl", () => {
    expect(material("silicon_interposer")).toBe("tsv_si_rdl");
  });
});

describe("bestUse", () => {
  it("glass core best for next gen chiplet bridge", () => {
    expect(bestUse("glass_core")).toBe("next_gen_chiplet_bridge");
  });
});

describe("packageSubstrates", () => {
  it("returns 5 types", () => {
    expect(packageSubstrates()).toHaveLength(5);
  });
});
