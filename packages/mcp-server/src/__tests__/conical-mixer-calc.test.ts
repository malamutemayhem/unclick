import { describe, it, expect } from "vitest";
import {
  blendQuality, throughput, deadZoneFree, scalability,
  cnCost, orbitScrew, forFragile, mixerConfig,
  bestUse, conicalMixerTypes,
} from "../conical-mixer-calc.js";

describe("blendQuality", () => {
  it("nauta orbit best blend quality", () => {
    expect(blendQuality("nauta_orbit")).toBeGreaterThan(blendQuality("heated_cone_react"));
  });
});

describe("throughput", () => {
  it("vertical ribbon highest throughput", () => {
    expect(throughput("vertical_ribbon")).toBeGreaterThan(throughput("vacuum_cone_dry"));
  });
});

describe("deadZoneFree", () => {
  it("planetary cone best dead zone free", () => {
    expect(deadZoneFree("planetary_cone")).toBeGreaterThan(deadZoneFree("vertical_ribbon"));
  });
});

describe("scalability", () => {
  it("nauta orbit best scalability", () => {
    expect(scalability("nauta_orbit")).toBeGreaterThan(scalability("planetary_cone"));
  });
});

describe("cnCost", () => {
  it("planetary cone most expensive", () => {
    expect(cnCost("planetary_cone")).toBeGreaterThan(cnCost("vertical_ribbon"));
  });
});

describe("orbitScrew", () => {
  it("nauta orbit uses orbit screw", () => {
    expect(orbitScrew("nauta_orbit")).toBe(true);
  });
  it("vertical ribbon no orbit screw", () => {
    expect(orbitScrew("vertical_ribbon")).toBe(false);
  });
});

describe("forFragile", () => {
  it("nauta orbit for fragile", () => {
    expect(forFragile("nauta_orbit")).toBe(true);
  });
  it("heated cone react not for fragile", () => {
    expect(forFragile("heated_cone_react")).toBe(false);
  });
});

describe("mixerConfig", () => {
  it("vacuum cone dry uses sealed low pressure gentle evap", () => {
    expect(mixerConfig("vacuum_cone_dry")).toBe("vacuum_cone_dry_conical_mixer_sealed_low_pressure_gentle_evap");
  });
});

describe("bestUse", () => {
  it("nauta orbit for pharma blend gentle screw no dead zone", () => {
    expect(bestUse("nauta_orbit")).toBe("pharma_blend_nauta_orbit_conical_mixer_gentle_screw_no_dead_zone");
  });
});

describe("conicalMixerTypes", () => {
  it("returns 5 types", () => {
    expect(conicalMixerTypes()).toHaveLength(5);
  });
});
