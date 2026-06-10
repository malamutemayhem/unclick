import { describe, it, expect } from "vitest";
import {
  settingForce, stoneProtect, controlFeel, finishQuality,
  toolCost, polishes, forProng, tipShape,
  bestSetting, bezelPushers,
} from "../bezel-pusher-calc.js";

describe("settingForce", () => {
  it("prong pusher claw most setting force", () => {
    expect(settingForce("prong_pusher_claw")).toBeGreaterThan(settingForce("burnisher_curved_polish"));
  });
});

describe("stoneProtect", () => {
  it("cup pusher round best stone protect", () => {
    expect(stoneProtect("cup_pusher_round")).toBeGreaterThan(stoneProtect("prong_pusher_claw"));
  });
});

describe("controlFeel", () => {
  it("rocking roller smooth best control", () => {
    expect(controlFeel("rocking_roller_smooth")).toBeGreaterThan(controlFeel("burnisher_curved_polish"));
  });
});

describe("finishQuality", () => {
  it("burnisher curved polish best finish quality", () => {
    expect(finishQuality("burnisher_curved_polish")).toBeGreaterThan(finishQuality("prong_pusher_claw"));
  });
});

describe("toolCost", () => {
  it("rocking roller smooth more expensive than flat blade", () => {
    expect(toolCost("rocking_roller_smooth")).toBeGreaterThan(toolCost("flat_blade_standard"));
  });
});

describe("polishes", () => {
  it("burnisher curved polish polishes", () => {
    expect(polishes("burnisher_curved_polish")).toBe(true);
  });
  it("flat blade standard does not polish", () => {
    expect(polishes("flat_blade_standard")).toBe(false);
  });
});

describe("forProng", () => {
  it("prong pusher claw is for prong", () => {
    expect(forProng("prong_pusher_claw")).toBe(true);
  });
  it("flat blade standard is not for prong", () => {
    expect(forProng("flat_blade_standard")).toBe(false);
  });
});

describe("tipShape", () => {
  it("cup pusher round uses concave cup tip", () => {
    expect(tipShape("cup_pusher_round")).toBe("concave_cup_tip");
  });
});

describe("bestSetting", () => {
  it("rocking roller smooth best for fine bezel smooth", () => {
    expect(bestSetting("rocking_roller_smooth")).toBe("fine_bezel_smooth");
  });
});

describe("bezelPushers", () => {
  it("returns 5 types", () => {
    expect(bezelPushers()).toHaveLength(5);
  });
});
