import { describe, it, expect } from "vitest";
import {
  strandOpen, threadEase, ropeRange, durability,
  fidCost, hollow, forBraid, fidShape,
  bestUse, splicingFids,
} from "../splicing-fid-calc.js";

describe("strandOpen", () => {
  it("swedish push steel best strand open", () => {
    expect(strandOpen("swedish_push_steel")).toBeGreaterThan(strandOpen("wire_loop_thread"));
  });
});

describe("threadEase", () => {
  it("hollow tube pull easiest thread", () => {
    expect(threadEase("hollow_tube_pull")).toBeGreaterThan(threadEase("wood_cone_taper"));
  });
});

describe("ropeRange", () => {
  it("selma handle set widest rope range", () => {
    expect(ropeRange("selma_handle_set")).toBeGreaterThan(ropeRange("wire_loop_thread"));
  });
});

describe("durability", () => {
  it("swedish push steel most durable", () => {
    expect(durability("swedish_push_steel")).toBeGreaterThan(durability("wire_loop_thread"));
  });
});

describe("fidCost", () => {
  it("selma handle set most expensive", () => {
    expect(fidCost("selma_handle_set")).toBeGreaterThan(fidCost("wire_loop_thread"));
  });
});

describe("hollow", () => {
  it("hollow tube pull is hollow", () => {
    expect(hollow("hollow_tube_pull")).toBe(true);
  });
  it("wood cone taper not hollow", () => {
    expect(hollow("wood_cone_taper")).toBe(false);
  });
});

describe("forBraid", () => {
  it("hollow tube pull is for braid", () => {
    expect(forBraid("hollow_tube_pull")).toBe(true);
  });
  it("wood cone taper not for braid", () => {
    expect(forBraid("wood_cone_taper")).toBe(false);
  });
});

describe("fidShape", () => {
  it("swedish push steel uses flat blade push", () => {
    expect(fidShape("swedish_push_steel")).toBe("flat_blade_push");
  });
});

describe("bestUse", () => {
  it("selma handle set best for all size splice kit", () => {
    expect(bestUse("selma_handle_set")).toBe("all_size_splice_kit");
  });
});

describe("splicingFids", () => {
  it("returns 5 types", () => {
    expect(splicingFids()).toHaveLength(5);
  });
});
