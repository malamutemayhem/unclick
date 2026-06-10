import { describe, it, expect } from "vitest";
import {
  liftForce, dialSafe, handRange, easeOfUse,
  removerCost, leverAction, forCanon, jawType,
  bestUse, handRemovers,
} from "../hand-remover-calc.js";

describe("liftForce", () => {
  it("canon pinion pull strongest lift", () => {
    expect(liftForce("canon_pinion_pull")).toBeGreaterThan(liftForce("suction_cup_dial"));
  });
});

describe("dialSafe", () => {
  it("suction cup dial safest for dial", () => {
    expect(dialSafe("suction_cup_dial")).toBeGreaterThan(dialSafe("friction_fit_pry"));
  });
});

describe("handRange", () => {
  it("universal jaw grip widest hand range", () => {
    expect(handRange("universal_jaw_grip")).toBeGreaterThan(handRange("suction_cup_dial"));
  });
});

describe("easeOfUse", () => {
  it("presto lever lift easiest to use", () => {
    expect(easeOfUse("presto_lever_lift")).toBeGreaterThan(easeOfUse("canon_pinion_pull"));
  });
});

describe("removerCost", () => {
  it("universal jaw grip most expensive", () => {
    expect(removerCost("universal_jaw_grip")).toBeGreaterThan(removerCost("friction_fit_pry"));
  });
});

describe("leverAction", () => {
  it("presto lever lift has lever action", () => {
    expect(leverAction("presto_lever_lift")).toBe(true);
  });
  it("suction cup dial no lever action", () => {
    expect(leverAction("suction_cup_dial")).toBe(false);
  });
});

describe("forCanon", () => {
  it("canon pinion pull is for canon", () => {
    expect(forCanon("canon_pinion_pull")).toBe(true);
  });
  it("presto lever lift not for canon", () => {
    expect(forCanon("presto_lever_lift")).toBe(false);
  });
});

describe("jawType", () => {
  it("universal jaw grip uses adjustable v jaw", () => {
    expect(jawType("universal_jaw_grip")).toBe("adjustable_v_jaw");
  });
});

describe("bestUse", () => {
  it("suction cup dial best for dial lift safe", () => {
    expect(bestUse("suction_cup_dial")).toBe("dial_lift_safe");
  });
});

describe("handRemovers", () => {
  it("returns 5 types", () => {
    expect(handRemovers()).toHaveLength(5);
  });
});
