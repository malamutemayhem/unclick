import { describe, it, expect } from "vitest";
import {
  solderability, shelfLife, flatness, contactResist,
  finCost, leadFree, forFinePitch, composition,
  bestUse, pcbFinishes,
} from "../pcb-finish-calc.js";

describe("solderability", () => {
  it("hasl hot air best solderability", () => {
    expect(solderability("hasl_hot_air")).toBeGreaterThan(solderability("hard_gold_edge"));
  });
});

describe("shelfLife", () => {
  it("enig gold nickel longest shelf life", () => {
    expect(shelfLife("enig_gold_nickel")).toBeGreaterThan(shelfLife("osp_organic"));
  });
});

describe("flatness", () => {
  it("enig gold nickel flattest", () => {
    expect(flatness("enig_gold_nickel")).toBeGreaterThan(flatness("hasl_hot_air"));
  });
});

describe("contactResist", () => {
  it("hard gold edge lowest contact resistance", () => {
    expect(contactResist("hard_gold_edge")).toBeGreaterThan(contactResist("osp_organic"));
  });
});

describe("finCost", () => {
  it("hard gold edge most expensive", () => {
    expect(finCost("hard_gold_edge")).toBeGreaterThan(finCost("hasl_hot_air"));
  });
});

describe("leadFree", () => {
  it("enig gold nickel is lead free", () => {
    expect(leadFree("enig_gold_nickel")).toBe(true);
  });
  it("hasl hot air not lead free", () => {
    expect(leadFree("hasl_hot_air")).toBe(false);
  });
});

describe("forFinePitch", () => {
  it("enig gold nickel for fine pitch", () => {
    expect(forFinePitch("enig_gold_nickel")).toBe(true);
  });
  it("hasl hot air not for fine pitch", () => {
    expect(forFinePitch("hasl_hot_air")).toBe(false);
  });
});

describe("composition", () => {
  it("immersion silver uses displacement silver layer", () => {
    expect(composition("immersion_silver")).toBe("displacement_silver_layer");
  });
});

describe("bestUse", () => {
  it("hard gold edge best for edge connector dimm slot", () => {
    expect(bestUse("hard_gold_edge")).toBe("edge_connector_dimm_slot");
  });
});

describe("pcbFinishes", () => {
  it("returns 5 types", () => {
    expect(pcbFinishes()).toHaveLength(5);
  });
});
