import { describe, it, expect } from "vitest";
import {
  accuracy, bandwidth, isolation, routingEase,
  ctrlCost, shielded, forDifferential, geometry,
  bestUse, impedanceCtrls,
} from "../impedance-ctrl-calc.js";

describe("accuracy", () => {
  it("stripline inner best accuracy", () => {
    expect(accuracy("stripline_inner")).toBeGreaterThan(accuracy("microstrip_outer"));
  });
});

describe("bandwidth", () => {
  it("coplanar waveguide best bandwidth", () => {
    expect(bandwidth("coplanar_waveguide")).toBeGreaterThan(bandwidth("microstrip_outer"));
  });
});

describe("isolation", () => {
  it("stripline inner best isolation", () => {
    expect(isolation("stripline_inner")).toBeGreaterThan(isolation("microstrip_outer"));
  });
});

describe("routingEase", () => {
  it("microstrip outer easiest routing", () => {
    expect(routingEase("microstrip_outer")).toBeGreaterThan(routingEase("differential_pair"));
  });
});

describe("ctrlCost", () => {
  it("differential pair most expensive", () => {
    expect(ctrlCost("differential_pair")).toBeGreaterThan(ctrlCost("microstrip_outer"));
  });
});

describe("shielded", () => {
  it("stripline inner is shielded", () => {
    expect(shielded("stripline_inner")).toBe(true);
  });
  it("microstrip outer not shielded", () => {
    expect(shielded("microstrip_outer")).toBe(false);
  });
});

describe("forDifferential", () => {
  it("differential pair is for differential", () => {
    expect(forDifferential("differential_pair")).toBe(true);
  });
  it("microstrip outer not for differential", () => {
    expect(forDifferential("microstrip_outer")).toBe(false);
  });
});

describe("geometry", () => {
  it("coplanar waveguide uses trace with coplanar ground", () => {
    expect(geometry("coplanar_waveguide")).toBe("trace_with_coplanar_ground");
  });
});

describe("bestUse", () => {
  it("differential pair best for high speed serial link", () => {
    expect(bestUse("differential_pair")).toBe("high_speed_serial_link");
  });
});

describe("impedanceCtrls", () => {
  it("returns 5 types", () => {
    expect(impedanceCtrls()).toHaveLength(5);
  });
});
