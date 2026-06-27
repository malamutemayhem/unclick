import { describe, it, expect } from "vitest";
import {
  mixSpeed, dispersionQuality, batchSize, temperatureControl,
  bmxCost, pressurized, forRubber, mixerConfig,
  bestUse, banburyMixerTypes,
} from "../banbury-mixer-calc.js";

describe("mixSpeed", () => {
  it("ram pressurized fastest mix speed", () => {
    expect(mixSpeed("ram_pressurized")).toBeGreaterThan(mixSpeed("lab_scale"));
  });
});

describe("dispersionQuality", () => {
  it("intermeshing rotor best dispersion quality", () => {
    expect(dispersionQuality("intermeshing_rotor")).toBeGreaterThan(dispersionQuality("tangential_rotor"));
  });
});

describe("batchSize", () => {
  it("ram pressurized largest batch size", () => {
    expect(batchSize("ram_pressurized")).toBeGreaterThan(batchSize("lab_scale"));
  });
});

describe("temperatureControl", () => {
  it("lab scale best temperature control", () => {
    expect(temperatureControl("lab_scale")).toBeGreaterThan(temperatureControl("tangential_rotor"));
  });
});

describe("bmxCost", () => {
  it("ram pressurized most expensive", () => {
    expect(bmxCost("ram_pressurized")).toBeGreaterThan(bmxCost("lab_scale"));
  });
});

describe("pressurized", () => {
  it("all banbury mixers are pressurized", () => {
    expect(pressurized("tangential_rotor")).toBe(true);
    expect(pressurized("lab_scale")).toBe(true);
  });
});

describe("forRubber", () => {
  it("all banbury mixers for rubber", () => {
    expect(forRubber("tangential_rotor")).toBe(true);
    expect(forRubber("intermeshing_rotor")).toBe(true);
  });
});

describe("mixerConfig", () => {
  it("lab scale uses small batch precise temp", () => {
    expect(mixerConfig("lab_scale")).toBe("lab_scale_small_batch_precise_temp_control_r_and_d_formulation");
  });
});

describe("bestUse", () => {
  it("tangential rotor for tire rubber compound", () => {
    expect(bestUse("tangential_rotor")).toBe("tire_rubber_compound_high_volume_tangential_rotor_batch_mixing");
  });
});

describe("banburyMixerTypes", () => {
  it("returns 5 types", () => {
    expect(banburyMixerTypes()).toHaveLength(5);
  });
});
