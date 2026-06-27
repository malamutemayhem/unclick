import { describe, it, expect } from "vitest";
import {
  inflateSpeed, maxPsi, portability, noiseLevel,
  inflatorCost, digitalGauge, autoShutoff, powerSource,
  bestUse, tireInflators,
} from "../tire-inflator-calc.js";

describe("inflateSpeed", () => {
  it("co2 cartridge quick fastest inflate", () => {
    expect(inflateSpeed("co2_cartridge_quick")).toBeGreaterThan(inflateSpeed("foot_pump_manual"));
  });
});

describe("maxPsi", () => {
  it("plug in ac 120v highest psi", () => {
    expect(maxPsi("plug_in_ac_120v")).toBeGreaterThan(maxPsi("co2_cartridge_quick"));
  });
});

describe("portability", () => {
  it("co2 cartridge quick most portable", () => {
    expect(portability("co2_cartridge_quick")).toBeGreaterThan(portability("plug_in_ac_120v"));
  });
});

describe("noiseLevel", () => {
  it("plug in ac 120v noisiest", () => {
    expect(noiseLevel("plug_in_ac_120v")).toBeGreaterThan(noiseLevel("foot_pump_manual"));
  });
});

describe("inflatorCost", () => {
  it("cordless battery most expensive", () => {
    expect(inflatorCost("cordless_battery")).toBeGreaterThan(inflatorCost("foot_pump_manual"));
  });
});

describe("digitalGauge", () => {
  it("corded 12v car has digital gauge", () => {
    expect(digitalGauge("corded_12v_car")).toBe(true);
  });
  it("foot pump manual does not", () => {
    expect(digitalGauge("foot_pump_manual")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("cordless battery has auto shutoff", () => {
    expect(autoShutoff("cordless_battery")).toBe(true);
  });
  it("co2 cartridge quick does not", () => {
    expect(autoShutoff("co2_cartridge_quick")).toBe(false);
  });
});

describe("powerSource", () => {
  it("foot pump manual uses leg pedal piston", () => {
    expect(powerSource("foot_pump_manual")).toBe("leg_pedal_piston");
  });
});

describe("bestUse", () => {
  it("co2 cartridge quick for bicycle race flat fix", () => {
    expect(bestUse("co2_cartridge_quick")).toBe("bicycle_race_flat_fix");
  });
});

describe("tireInflators", () => {
  it("returns 5 types", () => {
    expect(tireInflators()).toHaveLength(5);
  });
});
