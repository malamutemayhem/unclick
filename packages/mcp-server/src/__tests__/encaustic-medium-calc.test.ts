import { describe, it, expect } from "vitest";
import {
  fuseControl, transparency, layerBuild, workTime,
  mediumCost, pigmented, traditional, waxBase,
  bestUse, encausticMediums,
} from "../encaustic-medium-calc.js";

describe("fuseControl", () => {
  it("clear medium glaze best fuse control", () => {
    expect(fuseControl("clear_medium_glaze")).toBeGreaterThan(fuseControl("soy_wax_medium_soft"));
  });
});

describe("transparency", () => {
  it("clear medium glaze most transparent", () => {
    expect(transparency("clear_medium_glaze")).toBeGreaterThan(transparency("pigmented_wax_color"));
  });
});

describe("layerBuild", () => {
  it("microcrystal wax hard best layer build", () => {
    expect(layerBuild("microcrystal_wax_hard")).toBeGreaterThan(layerBuild("soy_wax_medium_soft"));
  });
});

describe("workTime", () => {
  it("soy wax medium soft longest work time", () => {
    expect(workTime("soy_wax_medium_soft")).toBeGreaterThan(workTime("microcrystal_wax_hard"));
  });
});

describe("mediumCost", () => {
  it("pigmented wax color most expensive", () => {
    expect(mediumCost("pigmented_wax_color")).toBeGreaterThan(mediumCost("soy_wax_medium_soft"));
  });
});

describe("pigmented", () => {
  it("pigmented wax color is pigmented", () => {
    expect(pigmented("pigmented_wax_color")).toBe(true);
  });
  it("beeswax damar standard not pigmented", () => {
    expect(pigmented("beeswax_damar_standard")).toBe(false);
  });
});

describe("traditional", () => {
  it("beeswax damar standard is traditional", () => {
    expect(traditional("beeswax_damar_standard")).toBe(true);
  });
  it("microcrystal wax hard not traditional", () => {
    expect(traditional("microcrystal_wax_hard")).toBe(false);
  });
});

describe("waxBase", () => {
  it("soy wax medium soft uses hydrogenated soy oil", () => {
    expect(waxBase("soy_wax_medium_soft")).toBe("hydrogenated_soy_oil");
  });
});

describe("bestUse", () => {
  it("beeswax damar standard best for traditional encaustic paint", () => {
    expect(bestUse("beeswax_damar_standard")).toBe("traditional_encaustic_paint");
  });
});

describe("encausticMediums", () => {
  it("returns 5 types", () => {
    expect(encausticMediums()).toHaveLength(5);
  });
});
