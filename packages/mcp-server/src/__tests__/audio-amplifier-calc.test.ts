import { describe, it, expect } from "vitest";
import {
  fidelity, efficiency, power, distortion,
  aaCost, solidState, forPortable, topology,
  bestUse, audioAmplifierTypes,
} from "../audio-amplifier-calc.js";

describe("fidelity", () => {
  it("class a highest fidelity", () => {
    expect(fidelity("class_a_single_ended")).toBeGreaterThan(fidelity("class_d_switching"));
  });
});

describe("efficiency", () => {
  it("class d most efficient", () => {
    expect(efficiency("class_d_switching")).toBeGreaterThan(efficiency("class_a_single_ended"));
  });
});

describe("power", () => {
  it("class h highest power", () => {
    expect(power("class_h_rail_switch")).toBeGreaterThan(power("class_a_single_ended"));
  });
});

describe("distortion", () => {
  it("class a lowest distortion", () => {
    expect(distortion("class_a_single_ended")).toBeLessThan(distortion("tube_valve_triode"));
  });
});

describe("aaCost", () => {
  it("class a most expensive", () => {
    expect(aaCost("class_a_single_ended")).toBeGreaterThan(aaCost("class_d_switching"));
  });
});

describe("solidState", () => {
  it("class d is solid state", () => {
    expect(solidState("class_d_switching")).toBe(true);
  });
  it("tube not solid state", () => {
    expect(solidState("tube_valve_triode")).toBe(false);
  });
});

describe("forPortable", () => {
  it("class d for portable", () => {
    expect(forPortable("class_d_switching")).toBe(true);
  });
  it("class a not for portable", () => {
    expect(forPortable("class_a_single_ended")).toBe(false);
  });
});

describe("topology", () => {
  it("tube uses vacuum transformer", () => {
    expect(topology("tube_valve_triode")).toBe("vacuum_tube_transformer_coupled");
  });
});

describe("bestUse", () => {
  it("class ab for home stereo", () => {
    expect(bestUse("class_ab_push_pull")).toBe("home_stereo_studio_monitor_amp");
  });
});

describe("audioAmplifierTypes", () => {
  it("returns 5 types", () => {
    expect(audioAmplifierTypes()).toHaveLength(5);
  });
});
