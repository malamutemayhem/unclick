import { describe, it, expect } from "vitest";
import {
  surfaceFlat, jointFit, controlFeel, staveRange,
  planeCost, benchMount, forTaper, soleProfile,
  bestUse, sunPlanes,
} from "../sun-plane-calc.js";

describe("surfaceFlat", () => {
  it("long jointer flat flattest surface", () => {
    expect(surfaceFlat("long_jointer_flat")).toBeGreaterThan(surfaceFlat("hollow_round_concave"));
  });
});

describe("jointFit", () => {
  it("cooper jointer bench best joint fit", () => {
    expect(jointFit("cooper_jointer_bench")).toBeGreaterThan(jointFit("short_block_quick"));
  });
});

describe("controlFeel", () => {
  it("short block quick best control feel", () => {
    expect(controlFeel("short_block_quick")).toBeGreaterThan(controlFeel("cooper_jointer_bench"));
  });
});

describe("staveRange", () => {
  it("cooper jointer bench best stave range", () => {
    expect(staveRange("cooper_jointer_bench")).toBeGreaterThan(staveRange("short_block_quick"));
  });
});

describe("planeCost", () => {
  it("cooper jointer bench most expensive", () => {
    expect(planeCost("cooper_jointer_bench")).toBeGreaterThan(planeCost("short_block_quick"));
  });
});

describe("benchMount", () => {
  it("cooper jointer bench is bench mount", () => {
    expect(benchMount("cooper_jointer_bench")).toBe(true);
  });
  it("long jointer flat not bench mount", () => {
    expect(benchMount("long_jointer_flat")).toBe(false);
  });
});

describe("forTaper", () => {
  it("backing plane taper is for taper", () => {
    expect(forTaper("backing_plane_taper")).toBe(true);
  });
  it("long jointer flat not for taper", () => {
    expect(forTaper("long_jointer_flat")).toBe(false);
  });
});

describe("soleProfile", () => {
  it("hollow round concave uses concave round sole", () => {
    expect(soleProfile("hollow_round_concave")).toBe("concave_round_sole");
  });
});

describe("bestUse", () => {
  it("cooper jointer bench best for production stave joint", () => {
    expect(bestUse("cooper_jointer_bench")).toBe("production_stave_joint");
  });
});

describe("sunPlanes", () => {
  it("returns 5 types", () => {
    expect(sunPlanes()).toHaveLength(5);
  });
});
