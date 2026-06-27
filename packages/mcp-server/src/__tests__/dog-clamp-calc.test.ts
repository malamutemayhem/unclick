import { describe, it, expect } from "vitest";
import {
  gripForce, setSpeed, holdSecure, removeEase,
  dogCost, adjustable, forRoundLog, legStyle,
  bestUse, dogClamps,
} from "../dog-clamp-calc.js";

describe("gripForce", () => {
  it("spike dog driven strongest grip", () => {
    expect(gripForce("spike_dog_driven")).toBeGreaterThan(gripForce("ring_dog_chain"));
  });
});

describe("setSpeed", () => {
  it("ring dog chain fastest set", () => {
    expect(setSpeed("ring_dog_chain")).toBeGreaterThan(setSpeed("spike_dog_driven"));
  });
});

describe("holdSecure", () => {
  it("spike dog driven most secure hold", () => {
    expect(holdSecure("spike_dog_driven")).toBeGreaterThan(holdSecure("ring_dog_chain"));
  });
});

describe("removeEase", () => {
  it("ring dog chain easiest remove", () => {
    expect(removeEase("ring_dog_chain")).toBeGreaterThan(removeEase("spike_dog_driven"));
  });
});

describe("dogCost", () => {
  it("adjustable dog screw most expensive", () => {
    expect(dogCost("adjustable_dog_screw")).toBeGreaterThan(dogCost("log_dog_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable dog screw is adjustable", () => {
    expect(adjustable("adjustable_dog_screw")).toBe(true);
  });
  it("log dog standard not adjustable", () => {
    expect(adjustable("log_dog_standard")).toBe(false);
  });
});

describe("forRoundLog", () => {
  it("log dog standard is for round log", () => {
    expect(forRoundLog("log_dog_standard")).toBe(true);
  });
  it("timber dog offset not for round log", () => {
    expect(forRoundLog("timber_dog_offset")).toBe(false);
  });
});

describe("legStyle", () => {
  it("ring dog chain uses ring chain loop", () => {
    expect(legStyle("ring_dog_chain")).toBe("ring_chain_loop");
  });
});

describe("bestUse", () => {
  it("adjustable dog screw best for variable size hold", () => {
    expect(bestUse("adjustable_dog_screw")).toBe("variable_size_hold");
  });
});

describe("dogClamps", () => {
  it("returns 5 types", () => {
    expect(dogClamps()).toHaveLength(5);
  });
});
