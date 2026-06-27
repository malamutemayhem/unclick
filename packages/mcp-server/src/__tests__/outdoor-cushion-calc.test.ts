import { describe, it, expect } from "vitest";
import {
  comfort, fadeResistance, drySpeed, stainResist,
  cushionCost, machineWash, mildewResistant, fillType,
  bestUse, outdoorCushions,
} from "../outdoor-cushion-calc.js";

describe("comfort", () => {
  it("memory foam luxury most comfortable", () => {
    expect(comfort("memory_foam_luxury")).toBeGreaterThan(comfort("olefin_budget"));
  });
});

describe("fadeResistance", () => {
  it("sunbrella fade proof best fade resistance", () => {
    expect(fadeResistance("sunbrella_fade_proof")).toBeGreaterThan(fadeResistance("polyester_water_repel"));
  });
});

describe("drySpeed", () => {
  it("quick dry mesh core fastest drying", () => {
    expect(drySpeed("quick_dry_mesh_core")).toBeGreaterThan(drySpeed("memory_foam_luxury"));
  });
});

describe("stainResist", () => {
  it("sunbrella fade proof best stain resistance", () => {
    expect(stainResist("sunbrella_fade_proof")).toBeGreaterThan(stainResist("quick_dry_mesh_core"));
  });
});

describe("cushionCost", () => {
  it("memory foam luxury most expensive", () => {
    expect(cushionCost("memory_foam_luxury")).toBeGreaterThan(cushionCost("olefin_budget"));
  });
});

describe("machineWash", () => {
  it("sunbrella fade proof is machine wash", () => {
    expect(machineWash("sunbrella_fade_proof")).toBe(true);
  });
  it("memory foam luxury is not", () => {
    expect(machineWash("memory_foam_luxury")).toBe(false);
  });
});

describe("mildewResistant", () => {
  it("quick dry mesh core is mildew resistant", () => {
    expect(mildewResistant("quick_dry_mesh_core")).toBe(true);
  });
  it("olefin budget is not", () => {
    expect(mildewResistant("olefin_budget")).toBe(false);
  });
});

describe("fillType", () => {
  it("memory foam luxury uses gel memory foam dense", () => {
    expect(fillType("memory_foam_luxury")).toBe("gel_memory_foam_dense");
  });
});

describe("bestUse", () => {
  it("sunbrella fade proof best for full sun pool deck", () => {
    expect(bestUse("sunbrella_fade_proof")).toBe("full_sun_pool_deck");
  });
});

describe("outdoorCushions", () => {
  it("returns 5 types", () => {
    expect(outdoorCushions()).toHaveLength(5);
  });
});
