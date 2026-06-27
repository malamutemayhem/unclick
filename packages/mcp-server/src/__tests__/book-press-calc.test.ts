import { describe, it, expect } from "vitest";
import {
  pressForce, platSize, portability, buildQuality,
  pressCost, forBinding, hasPlough, pressFrame,
  bestTask, bookPresses,
} from "../book-press-calc.js";

describe("pressForce", () => {
  it("nipping press cast strongest press force", () => {
    expect(pressForce("nipping_press_cast")).toBeGreaterThan(pressForce("flower_press_bolt"));
  });
});

describe("platSize", () => {
  it("copy press screw largest plat size", () => {
    expect(platSize("copy_press_screw")).toBeGreaterThan(platSize("flower_press_bolt"));
  });
});

describe("portability", () => {
  it("flower press bolt most portable", () => {
    expect(portability("flower_press_bolt")).toBeGreaterThan(portability("nipping_press_cast"));
  });
});

describe("buildQuality", () => {
  it("nipping press cast best build quality", () => {
    expect(buildQuality("nipping_press_cast")).toBeGreaterThan(buildQuality("flower_press_bolt"));
  });
});

describe("pressCost", () => {
  it("nipping press cast most expensive", () => {
    expect(pressCost("nipping_press_cast")).toBeGreaterThan(pressCost("flower_press_bolt"));
  });
});

describe("forBinding", () => {
  it("nipping press cast is for binding", () => {
    expect(forBinding("nipping_press_cast")).toBe(true);
  });
  it("flower press bolt is not for binding", () => {
    expect(forBinding("flower_press_bolt")).toBe(false);
  });
});

describe("hasPlough", () => {
  it("lying press plough has plough", () => {
    expect(hasPlough("lying_press_plough")).toBe(true);
  });
  it("nipping press cast does not have plough", () => {
    expect(hasPlough("nipping_press_cast")).toBe(false);
  });
});

describe("pressFrame", () => {
  it("nipping press cast uses cast iron frame", () => {
    expect(pressFrame("nipping_press_cast")).toBe("cast_iron_frame");
  });
});

describe("bestTask", () => {
  it("lying press plough best for trim edge plough", () => {
    expect(bestTask("lying_press_plough")).toBe("trim_edge_plough");
  });
});

describe("bookPresses", () => {
  it("returns 5 types", () => {
    expect(bookPresses()).toHaveLength(5);
  });
});
