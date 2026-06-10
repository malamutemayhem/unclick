import { describe, it, expect } from "vitest";
import {
  soilPenetration, turningAbility, leverage, maneuverability,
  forkCost, stainlessSteel, dHandle, tineShape,
  bestTask, gardenForks,
} from "../garden-fork-calc.js";

describe("soilPenetration", () => {
  it("broadfork deep bed best soil penetration", () => {
    expect(soilPenetration("broadfork_deep_bed")).toBeGreaterThan(soilPenetration("pitch_fork_hay"));
  });
});

describe("turningAbility", () => {
  it("compost fork curved best turning ability", () => {
    expect(turningAbility("compost_fork_curved")).toBeGreaterThan(turningAbility("broadfork_deep_bed"));
  });
});

describe("leverage", () => {
  it("broadfork deep bed best leverage", () => {
    expect(leverage("broadfork_deep_bed")).toBeGreaterThan(leverage("border_fork_compact"));
  });
});

describe("maneuverability", () => {
  it("border fork compact most maneuverable", () => {
    expect(maneuverability("border_fork_compact")).toBeGreaterThan(maneuverability("broadfork_deep_bed"));
  });
});

describe("forkCost", () => {
  it("broadfork deep bed most expensive", () => {
    expect(forkCost("broadfork_deep_bed")).toBeGreaterThan(forkCost("pitch_fork_hay"));
  });
});

describe("stainlessSteel", () => {
  it("digging fork heavy is stainless steel", () => {
    expect(stainlessSteel("digging_fork_heavy")).toBe(true);
  });
  it("pitch fork hay is not", () => {
    expect(stainlessSteel("pitch_fork_hay")).toBe(false);
  });
});

describe("dHandle", () => {
  it("digging fork heavy has d handle", () => {
    expect(dHandle("digging_fork_heavy")).toBe(true);
  });
  it("broadfork deep bed does not", () => {
    expect(dHandle("broadfork_deep_bed")).toBe(false);
  });
});

describe("tineShape", () => {
  it("compost fork curved uses curved round prong", () => {
    expect(tineShape("compost_fork_curved")).toBe("curved_round_prong");
  });
});

describe("bestTask", () => {
  it("broadfork deep bed best for no till deep aeration", () => {
    expect(bestTask("broadfork_deep_bed")).toBe("no_till_deep_aeration");
  });
});

describe("gardenForks", () => {
  it("returns 5 types", () => {
    expect(gardenForks()).toHaveLength(5);
  });
});
