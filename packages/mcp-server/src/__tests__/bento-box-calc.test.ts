import { describe, it, expect } from "vitest";
import {
  compartments, leakProof, portability, heatRetention,
  boxCost, microwaveSafe, dishwasherSafe, boxMaterial,
  bestMeal, bentoBoxes,
} from "../bento-box-calc.js";

describe("compartments", () => {
  it("stainless steel tiffin most compartments", () => {
    expect(compartments("stainless_steel_tiffin")).toBeGreaterThan(compartments("silicone_collapsible"));
  });
});

describe("leakProof", () => {
  it("insulated heated electric most leak proof", () => {
    expect(leakProof("insulated_heated_electric")).toBeGreaterThan(leakProof("traditional_lacquer_wood"));
  });
});

describe("portability", () => {
  it("silicone collapsible most portable", () => {
    expect(portability("silicone_collapsible")).toBeGreaterThan(portability("insulated_heated_electric"));
  });
});

describe("heatRetention", () => {
  it("insulated heated electric best heat retention", () => {
    expect(heatRetention("insulated_heated_electric")).toBeGreaterThan(heatRetention("plastic_compartment_snap"));
  });
});

describe("boxCost", () => {
  it("insulated heated electric most expensive", () => {
    expect(boxCost("insulated_heated_electric")).toBeGreaterThan(boxCost("plastic_compartment_snap"));
  });
});

describe("microwaveSafe", () => {
  it("plastic compartment snap is microwave safe", () => {
    expect(microwaveSafe("plastic_compartment_snap")).toBe(true);
  });
  it("stainless steel tiffin is not", () => {
    expect(microwaveSafe("stainless_steel_tiffin")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("stainless steel tiffin is dishwasher safe", () => {
    expect(dishwasherSafe("stainless_steel_tiffin")).toBe(true);
  });
  it("traditional lacquer wood is not", () => {
    expect(dishwasherSafe("traditional_lacquer_wood")).toBe(false);
  });
});

describe("boxMaterial", () => {
  it("traditional lacquer wood uses cedar urushi lacquer", () => {
    expect(boxMaterial("traditional_lacquer_wood")).toBe("cedar_urushi_lacquer");
  });
});

describe("bestMeal", () => {
  it("silicone collapsible best for travel hike space save", () => {
    expect(bestMeal("silicone_collapsible")).toBe("travel_hike_space_save");
  });
});

describe("bentoBoxes", () => {
  it("returns 5 types", () => {
    expect(bentoBoxes()).toHaveLength(5);
  });
});
