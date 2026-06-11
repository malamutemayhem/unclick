import { describe, it, expect } from "vitest";
import {
  speed, liquorRatio, evenness, fabricGentle,
  dmCost_, continuous, forKnit, method,
  bestUse, dyeingMachineTypes,
} from "../dyeing-machine-calc.js";

describe("speed", () => {
  it("pad batch fastest", () => {
    expect(speed("pad_batch")).toBeGreaterThan(speed("jigger"));
  });
});

describe("liquorRatio", () => {
  it("pad batch best liquor ratio", () => {
    expect(liquorRatio("pad_batch")).toBeGreaterThan(liquorRatio("jigger"));
  });
});

describe("evenness", () => {
  it("jet dyeing best evenness", () => {
    expect(evenness("jet_dyeing")).toBeGreaterThan(evenness("jigger"));
  });
});

describe("fabricGentle", () => {
  it("package dyeing most gentle", () => {
    expect(fabricGentle("package_dyeing")).toBeGreaterThan(fabricGentle("jigger"));
  });
});

describe("dmCost_", () => {
  it("package dyeing most expensive", () => {
    expect(dmCost_("package_dyeing")).toBeGreaterThan(dmCost_("jigger"));
  });
});

describe("continuous", () => {
  it("pad batch is continuous", () => {
    expect(continuous("pad_batch")).toBe(true);
  });
  it("jet dyeing not continuous", () => {
    expect(continuous("jet_dyeing")).toBe(false);
  });
});

describe("forKnit", () => {
  it("jet dyeing for knit", () => {
    expect(forKnit("jet_dyeing")).toBe(true);
  });
  it("jigger not for knit", () => {
    expect(forKnit("jigger")).toBe(false);
  });
});

describe("method", () => {
  it("beam dyeing uses perforated beam", () => {
    expect(method("beam_dyeing")).toBe("fabric_wound_on_perforated_beam_dye_pumped_through_radial");
  });
});

describe("bestUse", () => {
  it("open end rotor for denim towel", () => {
    expect(bestUse("jet_dyeing")).toBe("polyester_nylon_knit_fabric_rope_form_high_temp_disperse");
  });
});

describe("dyeingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(dyeingMachineTypes()).toHaveLength(5);
  });
});
