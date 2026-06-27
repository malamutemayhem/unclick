import { describe, it, expect } from "vitest";
import {
  blockArea, carvingDepthMm, inkCoverageMl, pressurePsi,
  registrationMarks, printRunCapacity, dryingTimeMin,
  repeatWidth, fabricNeededM2, carvingTimeHours, blockWoods,
} from "../blockprint-calc.js";

describe("blockArea", () => {
  it("positive area", () => {
    expect(blockArea(20, 15)).toBe(300);
  });
});

describe("carvingDepthMm", () => {
  it("fine shallower than coarse", () => {
    expect(carvingDepthMm("fine")).toBeLessThan(carvingDepthMm("coarse"));
  });
});

describe("inkCoverageMl", () => {
  it("positive ml", () => {
    expect(inkCoverageMl(100, 2)).toBeGreaterThan(0);
  });
});

describe("pressurePsi", () => {
  it("heavy fabric more pressure", () => {
    expect(pressurePsi(100, "heavy")).toBeGreaterThan(pressurePsi(100, "light"));
  });
});

describe("registrationMarks", () => {
  it("single color = 0", () => {
    expect(registrationMarks(1)).toBe(0);
  });
  it("3 colors = 4 marks", () => {
    expect(registrationMarks(3)).toBe(4);
  });
});

describe("printRunCapacity", () => {
  it("boxwood most durable", () => {
    expect(printRunCapacity("boxwood")).toBeGreaterThan(printRunCapacity("sycamore"));
  });
});

describe("dryingTimeMin", () => {
  it("oil takes longest", () => {
    expect(dryingTimeMin("oil", 50)).toBeGreaterThan(dryingTimeMin("water", 50));
  });
});

describe("repeatWidth", () => {
  it("less than block width", () => {
    expect(repeatWidth(20, 2)).toBeLessThan(20);
  });
});

describe("fabricNeededM2", () => {
  it("positive area", () => {
    expect(fabricNeededM2(5, 18, 15)).toBeGreaterThan(0);
  });
});

describe("carvingTimeHours", () => {
  it("ultra takes longest", () => {
    expect(carvingTimeHours(100, "ultra")).toBeGreaterThan(carvingTimeHours(100, "coarse"));
  });
});

describe("blockWoods", () => {
  it("returns 5 woods", () => {
    expect(blockWoods()).toHaveLength(5);
  });
});
