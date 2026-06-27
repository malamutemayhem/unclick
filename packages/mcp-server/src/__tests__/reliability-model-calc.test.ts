import { describe, it, expect } from "vitest";
import {
  accuracy, coverage, easeOfUse, industryAccept,
  rmCost, physBased, forMilitary, approach,
  bestUse, reliabilityModels,
} from "../reliability-model-calc.js";

describe("accuracy", () => {
  it("fides physics based most accurate", () => {
    expect(accuracy("fides_physics_based")).toBeGreaterThan(accuracy("mil_hdbk_217f"));
  });
});

describe("coverage", () => {
  it("mil hdbk 217f widest coverage", () => {
    expect(coverage("mil_hdbk_217f")).toBeGreaterThan(coverage("siemens_sn29500"));
  });
});

describe("easeOfUse", () => {
  it("mil hdbk 217f easiest to use", () => {
    expect(easeOfUse("mil_hdbk_217f")).toBeGreaterThan(easeOfUse("fides_physics_based"));
  });
});

describe("industryAccept", () => {
  it("mil hdbk 217f most accepted", () => {
    expect(industryAccept("mil_hdbk_217f")).toBeGreaterThan(industryAccept("fides_physics_based"));
  });
});

describe("rmCost", () => {
  it("fides physics based most expensive", () => {
    expect(rmCost("fides_physics_based")).toBeGreaterThan(rmCost("mil_hdbk_217f"));
  });
});

describe("physBased", () => {
  it("fides physics based is physics based", () => {
    expect(physBased("fides_physics_based")).toBe(true);
  });
  it("mil hdbk 217f not physics based", () => {
    expect(physBased("mil_hdbk_217f")).toBe(false);
  });
});

describe("forMilitary", () => {
  it("mil hdbk 217f for military", () => {
    expect(forMilitary("mil_hdbk_217f")).toBe(true);
  });
  it("telcordia sr332 not for military", () => {
    expect(forMilitary("telcordia_sr332")).toBe(false);
  });
});

describe("approach", () => {
  it("fides physics based uses mission profile physics", () => {
    expect(approach("fides_physics_based")).toBe("mission_profile_physics");
  });
});

describe("bestUse", () => {
  it("mil hdbk 217f best for defense contract bid", () => {
    expect(bestUse("mil_hdbk_217f")).toBe("defense_contract_bid");
  });
});

describe("reliabilityModels", () => {
  it("returns 5 types", () => {
    expect(reliabilityModels()).toHaveLength(5);
  });
});
