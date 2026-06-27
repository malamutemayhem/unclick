import { describe, it, expect } from "vitest";
import {
  exposureSpeed, detailResolve, durability, reclaimEase,
  emulCost, waterResist, filmBased, sensitizer,
  bestUse, photoEmuls,
} from "../photo-emul-calc.js";

describe("exposureSpeed", () => {
  it("sbq emulsion fast fastest exposure", () => {
    expect(exposureSpeed("sbq_emulsion_fast")).toBeGreaterThan(exposureSpeed("diazo_emulsion_standard"));
  });
});

describe("detailResolve", () => {
  it("capillary film precise best detail resolve", () => {
    expect(detailResolve("capillary_film_precise")).toBeGreaterThan(detailResolve("diazo_emulsion_standard"));
  });
});

describe("durability", () => {
  it("water resist plastisol most durable", () => {
    expect(durability("water_resist_plastisol")).toBeGreaterThan(durability("capillary_film_precise"));
  });
});

describe("reclaimEase", () => {
  it("capillary film precise easiest reclaim", () => {
    expect(reclaimEase("capillary_film_precise")).toBeGreaterThan(reclaimEase("water_resist_plastisol"));
  });
});

describe("emulCost", () => {
  it("capillary film precise most expensive", () => {
    expect(emulCost("capillary_film_precise")).toBeGreaterThan(emulCost("diazo_emulsion_standard"));
  });
});

describe("waterResist", () => {
  it("dual cure hybrid is water resist", () => {
    expect(waterResist("dual_cure_hybrid")).toBe(true);
  });
  it("sbq emulsion fast not water resist", () => {
    expect(waterResist("sbq_emulsion_fast")).toBe(false);
  });
});

describe("filmBased", () => {
  it("capillary film precise is film based", () => {
    expect(filmBased("capillary_film_precise")).toBe(true);
  });
  it("diazo emulsion standard not film based", () => {
    expect(filmBased("diazo_emulsion_standard")).toBe(false);
  });
});

describe("sensitizer", () => {
  it("dual cure hybrid uses dual cure diazo sbq", () => {
    expect(sensitizer("dual_cure_hybrid")).toBe("dual_cure_diazo_sbq");
  });
});

describe("bestUse", () => {
  it("diazo emulsion standard best for general water based ink", () => {
    expect(bestUse("diazo_emulsion_standard")).toBe("general_water_based_ink");
  });
});

describe("photoEmuls", () => {
  it("returns 5 types", () => {
    expect(photoEmuls()).toHaveLength(5);
  });
});
