import { describe, it, expect } from "vitest";
import {
  fixationRate, fabricSpeed, heatTransfer, colorFastness,
  tsCost, continuous, forPolyester, heatingConfig,
  bestUse, thermosolTypes,
} from "../thermosol-calc.js";

describe("fixationRate", () => {
  it("superheated steam best fixation rate", () => {
    expect(fixationRate("superheated_steam")).toBeGreaterThan(fixationRate("infrared_preheat"));
  });
});

describe("fabricSpeed", () => {
  it("combined ir hotair fastest fabric speed", () => {
    expect(fabricSpeed("combined_ir_hotair")).toBeGreaterThan(fabricSpeed("superheated_steam"));
  });
});

describe("heatTransfer", () => {
  it("contact drum best heat transfer", () => {
    expect(heatTransfer("contact_drum")).toBeGreaterThan(heatTransfer("hot_flue_chamber"));
  });
});

describe("colorFastness", () => {
  it("superheated steam best color fastness", () => {
    expect(colorFastness("superheated_steam")).toBeGreaterThan(colorFastness("infrared_preheat"));
  });
});

describe("tsCost", () => {
  it("combined ir hotair most expensive", () => {
    expect(tsCost("combined_ir_hotair")).toBeGreaterThan(tsCost("infrared_preheat"));
  });
});

describe("continuous", () => {
  it("hot flue chamber is continuous", () => {
    expect(continuous("hot_flue_chamber")).toBe(true);
  });
  it("superheated steam not continuous", () => {
    expect(continuous("superheated_steam")).toBe(false);
  });
});

describe("forPolyester", () => {
  it("hot flue chamber for polyester", () => {
    expect(forPolyester("hot_flue_chamber")).toBe(true);
  });
  it("superheated steam not for polyester", () => {
    expect(forPolyester("superheated_steam")).toBe(false);
  });
});

describe("heatingConfig", () => {
  it("contact drum uses heated chrome drum", () => {
    expect(heatingConfig("contact_drum")).toBe("heated_chrome_drum_contact_transfer_heat_fabric_wrap_fixation");
  });
});

describe("bestUse", () => {
  it("superheated steam for reactive dye cotton blend", () => {
    expect(bestUse("superheated_steam")).toBe("reactive_dye_cotton_polyester_blend_steam_fixation_wash_fast");
  });
});

describe("thermosolTypes", () => {
  it("returns 5 types", () => {
    expect(thermosolTypes()).toHaveLength(5);
  });
});
