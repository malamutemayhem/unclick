import { describe, it, expect } from "vitest";
import {
  flexibility, solderEase, structStrength, aesthetic,
  cameCost, forBorder, leadFree, cameProfile,
  bestUse, leadCames,
} from "../lead-came-calc.js";

describe("flexibility", () => {
  it("h channel standard most flexible", () => {
    expect(flexibility("h_channel_standard")).toBeGreaterThan(flexibility("zinc_came_rigid"));
  });
});

describe("solderEase", () => {
  it("h channel standard easiest solder", () => {
    expect(solderEase("h_channel_standard")).toBeGreaterThan(solderEase("zinc_came_rigid"));
  });
});

describe("structStrength", () => {
  it("zinc came rigid strongest structure", () => {
    expect(structStrength("zinc_came_rigid")).toBeGreaterThan(structStrength("round_face_decorative"));
  });
});

describe("aesthetic", () => {
  it("round face decorative best aesthetic", () => {
    expect(aesthetic("round_face_decorative")).toBeGreaterThan(aesthetic("zinc_came_rigid"));
  });
});

describe("cameCost", () => {
  it("zinc came rigid most expensive", () => {
    expect(cameCost("zinc_came_rigid")).toBeGreaterThan(cameCost("h_channel_standard"));
  });
});

describe("forBorder", () => {
  it("u channel border is for border", () => {
    expect(forBorder("u_channel_border")).toBe(true);
  });
  it("h channel standard not for border", () => {
    expect(forBorder("h_channel_standard")).toBe(false);
  });
});

describe("leadFree", () => {
  it("zinc came rigid is lead free", () => {
    expect(leadFree("zinc_came_rigid")).toBe(true);
  });
  it("h channel standard not lead free", () => {
    expect(leadFree("h_channel_standard")).toBe(false);
  });
});

describe("cameProfile", () => {
  it("h channel standard uses h shape double channel", () => {
    expect(cameProfile("h_channel_standard")).toBe("h_shape_double_channel");
  });
});

describe("bestUse", () => {
  it("round face decorative best for decorative window", () => {
    expect(bestUse("round_face_decorative")).toBe("decorative_window");
  });
});

describe("leadCames", () => {
  it("returns 5 types", () => {
    expect(leadCames()).toHaveLength(5);
  });
});
