import { describe, it, expect } from "vitest";
import {
  resolution, speed, throughput, sampleSize,
  epCost, automated, forSequencing, matrix,
  bestUse, electrophoreses,
} from "../electrophoresis-calc.js";

describe("resolution", () => {
  it("two d gel highest resolution", () => {
    expect(resolution("two_d_gel_isoelectric")).toBeGreaterThan(resolution("agarose_gel_dna"));
  });
});

describe("speed", () => {
  it("capillary zone fastest", () => {
    expect(speed("capillary_zone_ce")).toBeGreaterThan(speed("pulsed_field_pfge"));
  });
});

describe("throughput", () => {
  it("capillary zone highest throughput", () => {
    expect(throughput("capillary_zone_ce")).toBeGreaterThan(throughput("two_d_gel_isoelectric"));
  });
});

describe("sampleSize", () => {
  it("capillary zone smallest sample size", () => {
    expect(sampleSize("capillary_zone_ce")).toBeGreaterThan(sampleSize("two_d_gel_isoelectric"));
  });
});

describe("epCost", () => {
  it("capillary zone most expensive", () => {
    expect(epCost("capillary_zone_ce")).toBeGreaterThan(epCost("sds_page_protein"));
  });
});

describe("automated", () => {
  it("capillary zone is automated", () => {
    expect(automated("capillary_zone_ce")).toBe(true);
  });
  it("sds page not automated", () => {
    expect(automated("sds_page_protein")).toBe(false);
  });
});

describe("forSequencing", () => {
  it("capillary zone for sequencing", () => {
    expect(forSequencing("capillary_zone_ce")).toBe(true);
  });
  it("sds page not for sequencing", () => {
    expect(forSequencing("sds_page_protein")).toBe(false);
  });
});

describe("matrix", () => {
  it("pulsed field uses agarose alternating field", () => {
    expect(matrix("pulsed_field_pfge")).toBe("agarose_alternating_field");
  });
});

describe("bestUse", () => {
  it("two d gel best for proteome map biomarker", () => {
    expect(bestUse("two_d_gel_isoelectric")).toBe("proteome_map_biomarker_discover");
  });
});

describe("electrophoreses", () => {
  it("returns 5 types", () => {
    expect(electrophoreses()).toHaveLength(5);
  });
});
