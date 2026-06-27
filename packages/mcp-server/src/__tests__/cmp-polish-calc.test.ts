import { describe, it, expect } from "vitest";
import {
  removal, uniformity, selectivity, defects,
  cmpCost, slurryFree, forInterconnect, slurry,
  bestUse, cmpPolishes,
} from "../cmp-polish-calc.js";

describe("removal", () => {
  it("tungsten plug highest removal rate", () => {
    expect(removal("tungsten_plug")).toBeGreaterThan(removal("barrier_buff_touch"));
  });
});

describe("uniformity", () => {
  it("sti trench cmp best uniformity", () => {
    expect(uniformity("sti_trench_cmp")).toBeGreaterThan(uniformity("copper_damascene"));
  });
});

describe("selectivity", () => {
  it("sti trench cmp best selectivity", () => {
    expect(selectivity("sti_trench_cmp")).toBeGreaterThan(selectivity("oxide_ild_cmp"));
  });
});

describe("defects", () => {
  it("barrier buff touch fewest defects", () => {
    expect(defects("barrier_buff_touch")).toBeGreaterThan(defects("tungsten_plug"));
  });
});

describe("cmpCost", () => {
  it("copper damascene most expensive", () => {
    expect(cmpCost("copper_damascene")).toBeGreaterThan(cmpCost("oxide_ild_cmp"));
  });
});

describe("slurryFree", () => {
  it("oxide ild cmp not slurry free", () => {
    expect(slurryFree("oxide_ild_cmp")).toBe(false);
  });
});

describe("forInterconnect", () => {
  it("copper damascene for interconnect", () => {
    expect(forInterconnect("copper_damascene")).toBe(true);
  });
  it("oxide ild cmp not for interconnect", () => {
    expect(forInterconnect("oxide_ild_cmp")).toBe(false);
  });
});

describe("slurry", () => {
  it("sti trench cmp uses high selectivity ceria", () => {
    expect(slurry("sti_trench_cmp")).toBe("high_selectivity_ceria");
  });
});

describe("bestUse", () => {
  it("copper damascene best for beol copper interconnect", () => {
    expect(bestUse("copper_damascene")).toBe("beol_copper_interconnect");
  });
});

describe("cmpPolishes", () => {
  it("returns 5 types", () => {
    expect(cmpPolishes()).toHaveLength(5);
  });
});
