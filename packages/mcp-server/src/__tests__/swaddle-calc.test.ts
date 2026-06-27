import { describe, it, expect } from "vitest";
import {
  wrapSecure, breathability, easeOfUse, transitionFriendly,
  swaddleCost, machineWash, hipSafe, fabricType,
  bestAge, swaddles,
} from "../swaddle-calc.js";

describe("wrapSecure", () => {
  it("velcro pod easy most secure wrap", () => {
    expect(wrapSecure("velcro_pod_easy")).toBeGreaterThan(wrapSecure("muslin_wrap_classic"));
  });
});

describe("breathability", () => {
  it("muslin wrap classic most breathable", () => {
    expect(breathability("muslin_wrap_classic")).toBeGreaterThan(breathability("weighted_calming"));
  });
});

describe("easeOfUse", () => {
  it("velcro pod easy easiest to use", () => {
    expect(easeOfUse("velcro_pod_easy")).toBeGreaterThan(easeOfUse("muslin_wrap_classic"));
  });
});

describe("transitionFriendly", () => {
  it("arms up starfish most transition friendly", () => {
    expect(transitionFriendly("arms_up_starfish")).toBeGreaterThan(transitionFriendly("muslin_wrap_classic"));
  });
});

describe("swaddleCost", () => {
  it("weighted calming most expensive", () => {
    expect(swaddleCost("weighted_calming")).toBeGreaterThan(swaddleCost("muslin_wrap_classic"));
  });
});

describe("machineWash", () => {
  it("all swaddles are machine washable", () => {
    expect(machineWash("muslin_wrap_classic")).toBe(true);
    expect(machineWash("weighted_calming")).toBe(true);
  });
});

describe("hipSafe", () => {
  it("velcro pod easy is hip safe", () => {
    expect(hipSafe("velcro_pod_easy")).toBe(true);
  });
  it("weighted calming is not", () => {
    expect(hipSafe("weighted_calming")).toBe(false);
  });
});

describe("fabricType", () => {
  it("muslin wrap classic uses organic cotton muslin layer", () => {
    expect(fabricType("muslin_wrap_classic")).toBe("organic_cotton_muslin_layer");
  });
});

describe("bestAge", () => {
  it("arms up starfish best for rolling transition phase", () => {
    expect(bestAge("arms_up_starfish")).toBe("rolling_transition_phase");
  });
});

describe("swaddles", () => {
  it("returns 5 types", () => {
    expect(swaddles()).toHaveLength(5);
  });
});
