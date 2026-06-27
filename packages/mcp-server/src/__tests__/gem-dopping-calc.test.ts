import { describe, it, expect } from "vitest";
import {
  holdStrength, alignAccuracy, removeEase, reuseCount,
  dopCost, heatNeeded, adjustable, bondAgent,
  bestUse, gemDoppings,
} from "../gem-dopping-calc.js";

describe("holdStrength", () => {
  it("epoxy dop bond strongest hold", () => {
    expect(holdStrength("epoxy_dop_bond")).toBeGreaterThan(holdStrength("wax_dop_stick"));
  });
});

describe("alignAccuracy", () => {
  it("transfer jig align most accurate", () => {
    expect(alignAccuracy("transfer_jig_align")).toBeGreaterThan(alignAccuracy("cyanoacrylate_instant"));
  });
});

describe("removeEase", () => {
  it("vacuum chuck hold easiest remove", () => {
    expect(removeEase("vacuum_chuck_hold")).toBeGreaterThan(removeEase("epoxy_dop_bond"));
  });
});

describe("reuseCount", () => {
  it("transfer jig align most reusable", () => {
    expect(reuseCount("transfer_jig_align")).toBeGreaterThan(reuseCount("epoxy_dop_bond"));
  });
});

describe("dopCost", () => {
  it("vacuum chuck hold most expensive", () => {
    expect(dopCost("vacuum_chuck_hold")).toBeGreaterThan(dopCost("wax_dop_stick"));
  });
});

describe("heatNeeded", () => {
  it("wax dop stick needs heat", () => {
    expect(heatNeeded("wax_dop_stick")).toBe(true);
  });
  it("epoxy dop bond no heat needed", () => {
    expect(heatNeeded("epoxy_dop_bond")).toBe(false);
  });
});

describe("adjustable", () => {
  it("vacuum chuck hold is adjustable", () => {
    expect(adjustable("vacuum_chuck_hold")).toBe(true);
  });
  it("epoxy dop bond not adjustable", () => {
    expect(adjustable("epoxy_dop_bond")).toBe(false);
  });
});

describe("bondAgent", () => {
  it("wax dop stick uses lapidary dop wax", () => {
    expect(bondAgent("wax_dop_stick")).toBe("lapidary_dop_wax");
  });
});

describe("bestUse", () => {
  it("transfer jig align best for precise facet transfer", () => {
    expect(bestUse("transfer_jig_align")).toBe("precise_facet_transfer");
  });
});

describe("gemDoppings", () => {
  it("returns 5 types", () => {
    expect(gemDoppings()).toHaveLength(5);
  });
});
