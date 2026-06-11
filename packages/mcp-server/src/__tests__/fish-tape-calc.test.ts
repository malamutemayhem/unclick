import { describe, it, expect } from "vitest";
import {
  pushStrength, flexibility, reachLength, durability,
  tapeCost, nonConductive, forConduit, material,
  bestUse, fishTapes,
} from "../fish-tape-calc.js";

describe("pushStrength", () => {
  it("steel round conduit strongest push", () => {
    expect(pushStrength("steel_round_conduit")).toBeGreaterThan(pushStrength("nylon_flex_pull"));
  });
});

describe("flexibility", () => {
  it("nylon flex pull most flexible", () => {
    expect(flexibility("nylon_flex_pull")).toBeGreaterThan(flexibility("steel_round_conduit"));
  });
});

describe("reachLength", () => {
  it("steel round conduit longest reach", () => {
    expect(reachLength("steel_round_conduit")).toBeGreaterThan(reachLength("glow_rod_luminous"));
  });
});

describe("durability", () => {
  it("steel round conduit most durable", () => {
    expect(durability("steel_round_conduit")).toBeGreaterThan(durability("glow_rod_luminous"));
  });
});

describe("tapeCost", () => {
  it("glow rod most expensive", () => {
    expect(tapeCost("glow_rod_luminous")).toBeGreaterThan(tapeCost("nylon_flex_pull"));
  });
});

describe("nonConductive", () => {
  it("fiberglass is non conductive", () => {
    expect(nonConductive("fiberglass_non_conduct")).toBe(true);
  });
  it("steel flat not non conductive", () => {
    expect(nonConductive("steel_flat_standard")).toBe(false);
  });
});

describe("forConduit", () => {
  it("steel flat standard is for conduit", () => {
    expect(forConduit("steel_flat_standard")).toBe(true);
  });
  it("nylon flex pull not for conduit", () => {
    expect(forConduit("nylon_flex_pull")).toBe(false);
  });
});

describe("material", () => {
  it("glow rod uses luminescent fiberglass", () => {
    expect(material("glow_rod_luminous")).toBe("luminescent_fiberglass");
  });
});

describe("bestUse", () => {
  it("nylon flex pull best for wall cavity fish", () => {
    expect(bestUse("nylon_flex_pull")).toBe("wall_cavity_fish");
  });
});

describe("fishTapes", () => {
  it("returns 5 types", () => {
    expect(fishTapes()).toHaveLength(5);
  });
});
