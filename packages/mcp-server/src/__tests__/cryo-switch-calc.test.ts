import { describe, it, expect } from "vitest";
import {
  insertionLoss, isolation, speed, powerDissipation,
  csCost, latching, forQubit, mechanism,
  bestUse, cryoSwitches,
} from "../cryo-switch-calc.js";

describe("insertionLoss", () => {
  it("superconducting squid lowest insertion loss", () => {
    expect(insertionLoss("superconducting_squid")).toBeGreaterThan(insertionLoss("semiconductor_gan_hemt"));
  });
});

describe("isolation", () => {
  it("ferrite circulator best isolation", () => {
    expect(isolation("ferrite_circulator")).toBeGreaterThan(isolation("semiconductor_gan_hemt"));
  });
});

describe("speed", () => {
  it("ferrite circulator fastest", () => {
    expect(speed("ferrite_circulator")).toBeGreaterThan(speed("mems_latching_cryo"));
  });
});

describe("powerDissipation", () => {
  it("mems latching lowest power dissipation", () => {
    expect(powerDissipation("mems_latching_cryo")).toBeGreaterThan(powerDissipation("semiconductor_gan_hemt"));
  });
});

describe("csCost", () => {
  it("superconducting squid most expensive", () => {
    expect(csCost("superconducting_squid")).toBeGreaterThan(csCost("semiconductor_gan_hemt"));
  });
});

describe("latching", () => {
  it("mems is latching", () => {
    expect(latching("mems_latching_cryo")).toBe(true);
  });
  it("ferrite circulator not latching", () => {
    expect(latching("ferrite_circulator")).toBe(false);
  });
});

describe("forQubit", () => {
  it("mems for qubit", () => {
    expect(forQubit("mems_latching_cryo")).toBe(true);
  });
  it("semiconductor not for qubit", () => {
    expect(forQubit("semiconductor_gan_hemt")).toBe(false);
  });
});

describe("mechanism", () => {
  it("ferrite uses magnetic ferrite nonreciprocal", () => {
    expect(mechanism("ferrite_circulator")).toBe("magnetic_ferrite_nonreciprocal");
  });
});

describe("bestUse", () => {
  it("mems best for qubit mux signal route", () => {
    expect(bestUse("mems_latching_cryo")).toBe("qubit_mux_signal_route");
  });
});

describe("cryoSwitches", () => {
  it("returns 5 types", () => {
    expect(cryoSwitches()).toHaveLength(5);
  });
});
