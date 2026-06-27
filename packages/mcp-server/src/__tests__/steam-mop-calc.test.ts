import { describe, it, expect } from "vitest";
import {
  steamPower, heatUpTime, tankSize, maneuverability,
  mopCost, chemicalFree, vacuumBuiltIn, padType,
  bestFloor, steamMops,
} from "../steam-mop-calc.js";

describe("steamPower", () => {
  it("cylinder canister most steam power", () => {
    expect(steamPower("cylinder_canister")).toBeGreaterThan(steamPower("handheld_portable"));
  });
});

describe("heatUpTime", () => {
  it("handheld portable fastest heat up", () => {
    expect(heatUpTime("handheld_portable")).toBeGreaterThan(heatUpTime("cylinder_canister"));
  });
});

describe("tankSize", () => {
  it("cylinder canister largest tank", () => {
    expect(tankSize("cylinder_canister")).toBeGreaterThan(tankSize("handheld_portable"));
  });
});

describe("maneuverability", () => {
  it("handheld portable most maneuverable", () => {
    expect(maneuverability("handheld_portable")).toBeGreaterThan(maneuverability("cylinder_canister"));
  });
});

describe("mopCost", () => {
  it("steam vacuum combo most expensive", () => {
    expect(mopCost("steam_vacuum_combo")).toBeGreaterThan(mopCost("handheld_portable"));
  });
});

describe("chemicalFree", () => {
  it("upright standard is chemical free", () => {
    expect(chemicalFree("upright_standard")).toBe(true);
  });
  it("handheld portable is also chemical free", () => {
    expect(chemicalFree("handheld_portable")).toBe(true);
  });
});

describe("vacuumBuiltIn", () => {
  it("steam vacuum combo has vacuum built in", () => {
    expect(vacuumBuiltIn("steam_vacuum_combo")).toBe(true);
  });
  it("upright standard does not", () => {
    expect(vacuumBuiltIn("upright_standard")).toBe(false);
  });
});

describe("padType", () => {
  it("spin scrub uses rotating microfiber disc", () => {
    expect(padType("spin_scrub")).toBe("rotating_microfiber_disc");
  });
});

describe("bestFloor", () => {
  it("cylinder canister for whole house deep clean", () => {
    expect(bestFloor("cylinder_canister")).toBe("whole_house_deep_clean");
  });
});

describe("steamMops", () => {
  it("returns 5 types", () => {
    expect(steamMops()).toHaveLength(5);
  });
});
