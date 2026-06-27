import { describe, it, expect } from "vitest";
import {
  pushForce, comfort, durability, gripControl,
  thimbleCost, closedTop, adjustableFit, thimbleMaterial,
  bestTask, thimbles,
} from "../thimble-calc.js";

describe("pushForce", () => {
  it("metal closed top strongest push", () => {
    expect(pushForce("metal_closed_top")).toBeGreaterThan(pushForce("silicone_flexible_soft"));
  });
});

describe("comfort", () => {
  it("silicone flexible soft most comfortable", () => {
    expect(comfort("silicone_flexible_soft")).toBeGreaterThan(comfort("metal_closed_top"));
  });
});

describe("durability", () => {
  it("metal closed top most durable", () => {
    expect(durability("metal_closed_top")).toBeGreaterThan(durability("ceramic_porcelain_decor"));
  });
});

describe("gripControl", () => {
  it("rubber grip dot best grip", () => {
    expect(gripControl("rubber_grip_dot")).toBeGreaterThan(gripControl("ceramic_porcelain_decor"));
  });
});

describe("thimbleCost", () => {
  it("ceramic porcelain decor most expensive", () => {
    expect(thimbleCost("ceramic_porcelain_decor")).toBeGreaterThan(thimbleCost("rubber_grip_dot"));
  });
});

describe("closedTop", () => {
  it("metal closed top has closed top", () => {
    expect(closedTop("metal_closed_top")).toBe(true);
  });
  it("leather coin pad does not", () => {
    expect(closedTop("leather_coin_pad")).toBe(false);
  });
});

describe("adjustableFit", () => {
  it("leather coin pad has adjustable fit", () => {
    expect(adjustableFit("leather_coin_pad")).toBe(true);
  });
  it("metal closed top does not", () => {
    expect(adjustableFit("metal_closed_top")).toBe(false);
  });
});

describe("thimbleMaterial", () => {
  it("metal closed top uses nickel plated brass", () => {
    expect(thimbleMaterial("metal_closed_top")).toBe("nickel_plated_brass");
  });
});

describe("bestTask", () => {
  it("leather coin pad best for hand quilting long session", () => {
    expect(bestTask("leather_coin_pad")).toBe("hand_quilting_long_session");
  });
});

describe("thimbles", () => {
  it("returns 5 types", () => {
    expect(thimbles()).toHaveLength(5);
  });
});
