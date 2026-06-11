import { describe, it, expect } from "vitest";
import {
  reliability, planarity, thermalConduct, processSpeed,
  fillCost, conductive, forViainPad, fillMethod,
  bestUse, viaFills,
} from "../via-fill-calc.js";

describe("reliability", () => {
  it("plated shut copper most reliable", () => {
    expect(reliability("plated_shut_copper")).toBeGreaterThan(reliability("tented_solder_mask"));
  });
});

describe("planarity", () => {
  it("plated shut copper best planarity", () => {
    expect(planarity("plated_shut_copper")).toBeGreaterThan(planarity("tented_solder_mask"));
  });
});

describe("thermalConduct", () => {
  it("plated shut copper best thermal conductivity", () => {
    expect(thermalConduct("plated_shut_copper")).toBeGreaterThan(thermalConduct("non_conductive_resin"));
  });
});

describe("processSpeed", () => {
  it("tented solder mask fastest process", () => {
    expect(processSpeed("tented_solder_mask")).toBeGreaterThan(processSpeed("plated_shut_copper"));
  });
});

describe("fillCost", () => {
  it("plated shut copper most expensive", () => {
    expect(fillCost("plated_shut_copper")).toBeGreaterThan(fillCost("tented_solder_mask"));
  });
});

describe("conductive", () => {
  it("plated shut copper is conductive", () => {
    expect(conductive("plated_shut_copper")).toBe(true);
  });
  it("non conductive resin not conductive", () => {
    expect(conductive("non_conductive_resin")).toBe(false);
  });
});

describe("forViainPad", () => {
  it("plugged epoxy fill is for via in pad", () => {
    expect(forViainPad("plugged_epoxy_fill")).toBe(true);
  });
  it("tented solder mask not for via in pad", () => {
    expect(forViainPad("tented_solder_mask")).toBe(false);
  });
});

describe("fillMethod", () => {
  it("conductive paste uses silver paste screen", () => {
    expect(fillMethod("conductive_paste")).toBe("silver_paste_screen");
  });
});

describe("bestUse", () => {
  it("non conductive resin best for bga via in pad fill", () => {
    expect(bestUse("non_conductive_resin")).toBe("bga_via_in_pad_fill");
  });
});

describe("viaFills", () => {
  it("returns 5 types", () => {
    expect(viaFills()).toHaveLength(5);
  });
});
