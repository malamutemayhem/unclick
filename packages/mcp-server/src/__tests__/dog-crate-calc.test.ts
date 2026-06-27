import { describe, it, expect } from "vitest";
import {
  ventilation, portability, security, aesthetics,
  crateCost, airlineApproved, collapsible, frameMaterial,
  bestDog, dogCrates,
} from "../dog-crate-calc.js";

describe("ventilation", () => {
  it("wire folding standard best ventilation", () => {
    expect(ventilation("wire_folding_standard")).toBeGreaterThan(ventilation("furniture_end_table"));
  });
});

describe("portability", () => {
  it("soft fabric portable most portable", () => {
    expect(portability("soft_fabric_portable")).toBeGreaterThan(portability("heavy_duty_escape_proof"));
  });
});

describe("security", () => {
  it("heavy duty escape proof most secure", () => {
    expect(security("heavy_duty_escape_proof")).toBeGreaterThan(security("soft_fabric_portable"));
  });
});

describe("aesthetics", () => {
  it("furniture end table best aesthetics", () => {
    expect(aesthetics("furniture_end_table")).toBeGreaterThan(aesthetics("heavy_duty_escape_proof"));
  });
});

describe("crateCost", () => {
  it("heavy duty escape proof most expensive", () => {
    expect(crateCost("heavy_duty_escape_proof")).toBeGreaterThan(crateCost("wire_folding_standard"));
  });
});

describe("airlineApproved", () => {
  it("plastic airline travel is airline approved", () => {
    expect(airlineApproved("plastic_airline_travel")).toBe(true);
  });
  it("wire folding standard is not", () => {
    expect(airlineApproved("wire_folding_standard")).toBe(false);
  });
});

describe("collapsible", () => {
  it("wire folding standard is collapsible", () => {
    expect(collapsible("wire_folding_standard")).toBe(true);
  });
  it("furniture end table is not", () => {
    expect(collapsible("furniture_end_table")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("furniture end table uses solid hardwood veneer", () => {
    expect(frameMaterial("furniture_end_table")).toBe("solid_hardwood_veneer");
  });
});

describe("bestDog", () => {
  it("heavy duty escape proof best for anxious strong chewer", () => {
    expect(bestDog("heavy_duty_escape_proof")).toBe("anxious_strong_chewer");
  });
});

describe("dogCrates", () => {
  it("returns 5 types", () => {
    expect(dogCrates()).toHaveLength(5);
  });
});
