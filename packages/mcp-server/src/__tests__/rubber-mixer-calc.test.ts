import { describe, it, expect } from "vitest";
import {
  mixQuality, throughput, temperatureControl, dispersion,
  rmxCost, enclosed, forTire, mixerConfig,
  bestUse, rubberMixerTypes,
} from "../rubber-mixer-calc.js";

describe("mixQuality", () => {
  it("intermesh rotor best mix quality", () => {
    expect(mixQuality("intermesh_rotor")).toBeGreaterThan(mixQuality("two_roll_mill"));
  });
});

describe("throughput", () => {
  it("continuous mixer highest throughput", () => {
    expect(throughput("continuous_mixer")).toBeGreaterThanOrEqual(throughput("tangential_rotor"));
  });
});

describe("temperatureControl", () => {
  it("intermesh rotor best temperature control", () => {
    expect(temperatureControl("intermesh_rotor")).toBeGreaterThan(temperatureControl("tangential_rotor"));
  });
});

describe("dispersion", () => {
  it("intermesh rotor best dispersion", () => {
    expect(dispersion("intermesh_rotor")).toBeGreaterThan(dispersion("two_roll_mill"));
  });
});

describe("rmxCost", () => {
  it("intermesh rotor most expensive", () => {
    expect(rmxCost("intermesh_rotor")).toBeGreaterThan(rmxCost("two_roll_mill"));
  });
});

describe("enclosed", () => {
  it("internal mixer is enclosed", () => {
    expect(enclosed("internal_mixer")).toBe(true);
  });
  it("two roll mill not enclosed", () => {
    expect(enclosed("two_roll_mill")).toBe(false);
  });
});

describe("forTire", () => {
  it("internal mixer for tire", () => {
    expect(forTire("internal_mixer")).toBe(true);
  });
  it("tangential rotor not for tire", () => {
    expect(forTire("tangential_rotor")).toBe(false);
  });
});

describe("mixerConfig", () => {
  it("continuous mixer uses screw barrel feed mix discharge", () => {
    expect(mixerConfig("continuous_mixer")).toBe("continuous_mixer_rubber_screw_barrel_feed_mix_discharge_nonstop");
  });
});

describe("bestUse", () => {
  it("two roll mill for rubber lab small batch", () => {
    expect(bestUse("two_roll_mill")).toBe("rubber_lab_two_roll_mill_open_mix_small_batch_compound_develop");
  });
});

describe("rubberMixerTypes", () => {
  it("returns 5 types", () => {
    expect(rubberMixerTypes()).toHaveLength(5);
  });
});
