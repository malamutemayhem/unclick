import { describe, it, expect } from "vitest";
import {
  writeSurface, eraseClean, boardSize, portabilityScore,
  boardCost, magnetic, savesDigital, surfaceMaterial,
  bestRoom, whiteboards,
} from "../whiteboard-calc.js";

describe("writeSurface", () => {
  it("glass frameless best write surface", () => {
    expect(writeSurface("glass_frameless")).toBeGreaterThan(writeSurface("desktop_small"));
  });
});

describe("eraseClean", () => {
  it("glass frameless cleanest erase", () => {
    expect(eraseClean("glass_frameless")).toBeGreaterThan(eraseClean("wall_mount_steel"));
  });
});

describe("boardSize", () => {
  it("wall mount steel largest board", () => {
    expect(boardSize("wall_mount_steel")).toBeGreaterThan(boardSize("desktop_small"));
  });
});

describe("portabilityScore", () => {
  it("desktop small most portable", () => {
    expect(portabilityScore("desktop_small")).toBeGreaterThan(portabilityScore("wall_mount_steel"));
  });
});

describe("boardCost", () => {
  it("smart digital most expensive", () => {
    expect(boardCost("smart_digital")).toBeGreaterThan(boardCost("desktop_small"));
  });
});

describe("magnetic", () => {
  it("wall mount steel is magnetic", () => {
    expect(magnetic("wall_mount_steel")).toBe(true);
  });
  it("desktop small is not", () => {
    expect(magnetic("desktop_small")).toBe(false);
  });
});

describe("savesDigital", () => {
  it("smart digital saves digital", () => {
    expect(savesDigital("smart_digital")).toBe(true);
  });
  it("glass frameless does not", () => {
    expect(savesDigital("glass_frameless")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("glass frameless uses tempered glass panel", () => {
    expect(surfaceMaterial("glass_frameless")).toBe("tempered_glass_panel");
  });
});

describe("bestRoom", () => {
  it("mobile rolling for meeting room flexible", () => {
    expect(bestRoom("mobile_rolling")).toBe("meeting_room_flexible");
  });
});

describe("whiteboards", () => {
  it("returns 5 types", () => {
    expect(whiteboards()).toHaveLength(5);
  });
});
