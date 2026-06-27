import { describe, it, expect } from "vitest";
import {
  holdFirm, rotateEase, setupSpeed, pieceRange,
  spitCost, rotatable, forSmall, mountMethod,
  bestUse, spitSticks,
} from "../spit-stick-calc.js";

describe("holdFirm", () => {
  it("vise clamp jaw firmest hold", () => {
    expect(holdFirm("vise_clamp_jaw")).toBeGreaterThan(holdFirm("ring_clamp_hold"));
  });
});

describe("rotateEase", () => {
  it("engraver ball rotate easiest rotation", () => {
    expect(rotateEase("engraver_ball_rotate")).toBeGreaterThan(rotateEase("vise_clamp_jaw"));
  });
});

describe("setupSpeed", () => {
  it("ring clamp hold fastest setup", () => {
    expect(setupSpeed("ring_clamp_hold")).toBeGreaterThan(setupSpeed("shellac_mount_heat"));
  });
});

describe("pieceRange", () => {
  it("pitch block press widest piece range", () => {
    expect(pieceRange("pitch_block_press")).toBeGreaterThan(pieceRange("ring_clamp_hold"));
  });
});

describe("spitCost", () => {
  it("engraver ball rotate most expensive", () => {
    expect(spitCost("engraver_ball_rotate")).toBeGreaterThan(spitCost("shellac_mount_heat"));
  });
});

describe("rotatable", () => {
  it("engraver ball rotate is rotatable", () => {
    expect(rotatable("engraver_ball_rotate")).toBe(true);
  });
  it("vise clamp jaw not rotatable", () => {
    expect(rotatable("vise_clamp_jaw")).toBe(false);
  });
});

describe("forSmall", () => {
  it("ring clamp hold is for small", () => {
    expect(forSmall("ring_clamp_hold")).toBe(true);
  });
  it("shellac mount heat not for small", () => {
    expect(forSmall("shellac_mount_heat")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("engraver ball rotate uses ball socket rotate", () => {
    expect(mountMethod("engraver_ball_rotate")).toBe("ball_socket_rotate");
  });
});

describe("bestUse", () => {
  it("engraver ball rotate best for precision rotate engrave", () => {
    expect(bestUse("engraver_ball_rotate")).toBe("precision_rotate_engrave");
  });
});

describe("spitSticks", () => {
  it("returns 5 types", () => {
    expect(spitSticks()).toHaveLength(5);
  });
});
