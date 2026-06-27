import { describe, it, expect } from "vitest";
import {
  flotation, traction, shoeWeight, bindingEase,
  shoeCost, heelLift, cramponSteel, frameMaterial,
  bestTerrain, snowshoes,
} from "../snowshoe-calc.js";

describe("flotation", () => {
  it("backcountry steep best flotation", () => {
    expect(flotation("backcountry_steep")).toBeGreaterThan(flotation("running_light"));
  });
});

describe("traction", () => {
  it("backcountry steep best traction", () => {
    expect(traction("backcountry_steep")).toBeGreaterThan(traction("recreational_flat"));
  });
});

describe("shoeWeight", () => {
  it("running light lightest", () => {
    expect(shoeWeight("running_light")).toBeLessThan(shoeWeight("mountaineering_crampon"));
  });
});

describe("bindingEase", () => {
  it("recreational flat easiest binding", () => {
    expect(bindingEase("recreational_flat")).toBeGreaterThan(bindingEase("mountaineering_crampon"));
  });
});

describe("shoeCost", () => {
  it("mountaineering crampon most expensive", () => {
    expect(shoeCost("mountaineering_crampon")).toBeGreaterThan(shoeCost("recreational_flat"));
  });
});

describe("heelLift", () => {
  it("hiking moderate has heel lift", () => {
    expect(heelLift("hiking_moderate")).toBe(true);
  });
  it("recreational flat does not", () => {
    expect(heelLift("recreational_flat")).toBe(false);
  });
});

describe("cramponSteel", () => {
  it("mountaineering crampon has steel crampons", () => {
    expect(cramponSteel("mountaineering_crampon")).toBe(true);
  });
  it("hiking moderate does not", () => {
    expect(cramponSteel("hiking_moderate")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("running light uses ultralight plastic flex", () => {
    expect(frameMaterial("running_light")).toBe("ultralight_plastic_flex");
  });
});

describe("bestTerrain", () => {
  it("backcountry steep for steep untracked powder", () => {
    expect(bestTerrain("backcountry_steep")).toBe("steep_untracked_powder");
  });
});

describe("snowshoes", () => {
  it("returns 5 types", () => {
    expect(snowshoes()).toHaveLength(5);
  });
});
