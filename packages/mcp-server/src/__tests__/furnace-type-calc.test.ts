import { describe, it, expect } from "vitest";
import {
  temperature, throughput, efficiency, controllability,
  fnCost, electric, forSteel, heating,
  bestUse, furnaceTypes,
} from "../furnace-type-calc.js";

describe("temperature", () => {
  it("eaf highest temperature", () => {
    expect(temperature("electric_arc_eaf_scrap")).toBeGreaterThan(temperature("muffle_chamber_laboratory"));
  });
});

describe("throughput", () => {
  it("blast furnace highest throughput", () => {
    expect(throughput("blast_furnace_iron_ore")).toBeGreaterThan(throughput("muffle_chamber_laboratory"));
  });
});

describe("efficiency", () => {
  it("induction most efficient", () => {
    expect(efficiency("induction_melt_crucible")).toBeGreaterThan(efficiency("blast_furnace_iron_ore"));
  });
});

describe("controllability", () => {
  it("induction most controllable", () => {
    expect(controllability("induction_melt_crucible")).toBeGreaterThan(controllability("rotary_kiln_cement_lime"));
  });
});

describe("fnCost", () => {
  it("blast furnace most expensive", () => {
    expect(fnCost("blast_furnace_iron_ore")).toBeGreaterThan(fnCost("muffle_chamber_laboratory"));
  });
});

describe("electric", () => {
  it("eaf is electric", () => {
    expect(electric("electric_arc_eaf_scrap")).toBe(true);
  });
  it("blast furnace not electric", () => {
    expect(electric("blast_furnace_iron_ore")).toBe(false);
  });
});

describe("forSteel", () => {
  it("eaf for steel", () => {
    expect(forSteel("electric_arc_eaf_scrap")).toBe(true);
  });
  it("muffle not for steel", () => {
    expect(forSteel("muffle_chamber_laboratory")).toBe(false);
  });
});

describe("heating", () => {
  it("induction uses electromagnetic coil", () => {
    expect(heating("induction_melt_crucible")).toBe("electromagnetic_coil_eddy_current");
  });
});

describe("bestUse", () => {
  it("blast furnace for pig iron", () => {
    expect(bestUse("blast_furnace_iron_ore")).toBe("primary_iron_smelting_pig_iron");
  });
});

describe("furnaceTypes", () => {
  it("returns 5 types", () => {
    expect(furnaceTypes()).toHaveLength(5);
  });
});
