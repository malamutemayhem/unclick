import { describe, it, expect } from "vitest";
import {
  thermalCond, bondStrength, processTemp, reliability,
  attachCost, reworkable, forPower, material,
  bestUse, dieAttachMethods,
} from "../die-attach-calc.js";

describe("thermalCond", () => {
  it("sintered silver best thermal conductivity", () => {
    expect(thermalCond("sintered_silver")).toBeGreaterThan(thermalCond("epoxy_adhesive"));
  });
});

describe("bondStrength", () => {
  it("sintered silver strongest bond", () => {
    expect(bondStrength("sintered_silver")).toBeGreaterThan(bondStrength("epoxy_adhesive"));
  });
});

describe("processTemp", () => {
  it("eutectic ausi highest process temp", () => {
    expect(processTemp("eutectic_ausi")).toBeGreaterThan(processTemp("epoxy_adhesive"));
  });
});

describe("reliability", () => {
  it("sintered silver most reliable", () => {
    expect(reliability("sintered_silver")).toBeGreaterThan(reliability("epoxy_adhesive"));
  });
});

describe("attachCost", () => {
  it("eutectic ausi most expensive", () => {
    expect(attachCost("eutectic_ausi")).toBeGreaterThan(attachCost("epoxy_adhesive"));
  });
});

describe("reworkable", () => {
  it("solder preform is reworkable", () => {
    expect(reworkable("solder_preform")).toBe(true);
  });
  it("epoxy adhesive not reworkable", () => {
    expect(reworkable("epoxy_adhesive")).toBe(false);
  });
});

describe("forPower", () => {
  it("sintered silver is for power", () => {
    expect(forPower("sintered_silver")).toBe(true);
  });
  it("epoxy adhesive not for power", () => {
    expect(forPower("epoxy_adhesive")).toBe(false);
  });
});

describe("material", () => {
  it("sintered silver uses nano silver paste", () => {
    expect(material("sintered_silver")).toBe("nano_silver_paste");
  });
});

describe("bestUse", () => {
  it("sintered silver best for sic power module", () => {
    expect(bestUse("sintered_silver")).toBe("sic_power_module");
  });
});

describe("dieAttachMethods", () => {
  it("returns 5 types", () => {
    expect(dieAttachMethods()).toHaveLength(5);
  });
});
