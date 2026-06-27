import { describe, it, expect } from "vitest";
import {
  thickness, uniformity, adhesion, throughput,
  platingCost, electrolytic, forBlindVia, chemProcess,
  bestUse, pcbPlatings,
} from "../pcb-plating-calc.js";

describe("thickness", () => {
  it("acid copper electro best thickness", () => {
    expect(thickness("acid_copper_electro")).toBeGreaterThan(thickness("carbon_conductive"));
  });
});

describe("uniformity", () => {
  it("electroless copper best uniformity", () => {
    expect(uniformity("electroless_copper")).toBeGreaterThan(uniformity("carbon_conductive"));
  });
});

describe("adhesion", () => {
  it("acid copper electro best adhesion", () => {
    expect(adhesion("acid_copper_electro")).toBeGreaterThan(adhesion("carbon_conductive"));
  });
});

describe("throughput", () => {
  it("carbon conductive fastest throughput", () => {
    expect(throughput("carbon_conductive")).toBeGreaterThan(throughput("electroless_copper"));
  });
});

describe("platingCost", () => {
  it("tin electro etch most expensive", () => {
    expect(platingCost("tin_electro_etch")).toBeGreaterThan(platingCost("carbon_conductive"));
  });
});

describe("electrolytic", () => {
  it("acid copper electro is electrolytic", () => {
    expect(electrolytic("acid_copper_electro")).toBe(true);
  });
  it("electroless copper not electrolytic", () => {
    expect(electrolytic("electroless_copper")).toBe(false);
  });
});

describe("forBlindVia", () => {
  it("acid copper electro is for blind via", () => {
    expect(forBlindVia("acid_copper_electro")).toBe(true);
  });
  it("carbon conductive not for blind via", () => {
    expect(forBlindVia("carbon_conductive")).toBe(false);
  });
});

describe("chemProcess", () => {
  it("electroless copper uses formaldehyde reduction", () => {
    expect(chemProcess("electroless_copper")).toBe("formaldehyde_reduction");
  });
});

describe("bestUse", () => {
  it("carbon conductive best for low cost double side board", () => {
    expect(bestUse("carbon_conductive")).toBe("low_cost_double_side_board");
  });
});

describe("pcbPlatings", () => {
  it("returns 5 types", () => {
    expect(pcbPlatings()).toHaveLength(5);
  });
});
