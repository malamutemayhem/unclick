import { describe, it, expect } from "vitest";
import {
  seismicActivity, volcanicActivity, mountainBuilding,
  spreadRateCmPerYear, tsunamiRisk, createsOceanFloor,
  destroysCrust, exampleLocation, trenchFormation, tectonicBoundaries,
} from "../tectonic-plate-calc.js";

describe("seismicActivity", () => {
  it("subduction has highest seismic activity", () => {
    expect(seismicActivity("subduction")).toBeGreaterThan(
      seismicActivity("hotspot")
    );
  });
});

describe("volcanicActivity", () => {
  it("hotspot has high volcanic activity", () => {
    expect(volcanicActivity("hotspot")).toBeGreaterThan(
      volcanicActivity("transform")
    );
  });
});

describe("mountainBuilding", () => {
  it("convergent builds most mountains", () => {
    expect(mountainBuilding("convergent")).toBeGreaterThan(
      mountainBuilding("divergent")
    );
  });
});

describe("spreadRateCmPerYear", () => {
  it("hotspot has highest rate", () => {
    expect(spreadRateCmPerYear("hotspot")).toBeGreaterThan(
      spreadRateCmPerYear("convergent")
    );
  });
});

describe("tsunamiRisk", () => {
  it("subduction has highest tsunami risk", () => {
    expect(tsunamiRisk("subduction")).toBeGreaterThan(
      tsunamiRisk("hotspot")
    );
  });
});

describe("createsOceanFloor", () => {
  it("divergent creates ocean floor", () => {
    expect(createsOceanFloor("divergent")).toBe(true);
  });
  it("convergent does not", () => {
    expect(createsOceanFloor("convergent")).toBe(false);
  });
});

describe("destroysCrust", () => {
  it("subduction destroys crust", () => {
    expect(destroysCrust("subduction")).toBe(true);
  });
  it("divergent does not", () => {
    expect(destroysCrust("divergent")).toBe(false);
  });
});

describe("exampleLocation", () => {
  it("transform example is san andreas", () => {
    expect(exampleLocation("transform")).toBe("san_andreas");
  });
});

describe("trenchFormation", () => {
  it("subduction forms most trenches", () => {
    expect(trenchFormation("subduction")).toBeGreaterThan(
      trenchFormation("divergent")
    );
  });
});

describe("tectonicBoundaries", () => {
  it("returns 5 types", () => {
    expect(tectonicBoundaries()).toHaveLength(5);
  });
});
