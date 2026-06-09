import { describe, it, expect } from "vitest";
import { segmentIntersection } from "./segmentintersect-tool.js";

describe("segmentIntersection", () => {
  it("detects crossing segments", async () => {
    const r = (await segmentIntersection({
      segments: [
        { p1: { x: 0, y: 0 }, p2: { x: 4, y: 4 } },
        { p1: { x: 0, y: 4 }, p2: { x: 4, y: 0 } },
      ],
    })) as any;
    expect(r.intersection_count).toBe(1);
    expect(r.intersections[0].point.x).toBeCloseTo(2);
    expect(r.intersections[0].point.y).toBeCloseTo(2);
  });

  it("reports no intersection for parallel segments", async () => {
    const r = (await segmentIntersection({
      segments: [
        { p1: { x: 0, y: 0 }, p2: { x: 4, y: 0 } },
        { p1: { x: 0, y: 2 }, p2: { x: 4, y: 2 } },
      ],
    })) as any;
    expect(r.intersection_count).toBe(0);
  });

  it("detects endpoint touching", async () => {
    const r = (await segmentIntersection({
      segments: [
        { p1: { x: 0, y: 0 }, p2: { x: 2, y: 2 } },
        { p1: { x: 2, y: 2 }, p2: { x: 4, y: 0 } },
      ],
    })) as any;
    expect(r.intersection_count).toBe(1);
  });

  it("handles multiple segments", async () => {
    const r = (await segmentIntersection({
      segments: [
        { p1: { x: 0, y: 0 }, p2: { x: 10, y: 10 } },
        { p1: { x: 0, y: 10 }, p2: { x: 10, y: 0 } },
        { p1: { x: 5, y: 0 }, p2: { x: 5, y: 10 } },
      ],
    })) as any;
    expect(r.segment_count).toBe(3);
    expect(r.intersection_count).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await segmentIntersection({
      segments: [
        { p1: { x: 0, y: 0 }, p2: { x: 1, y: 1 } },
        { p1: { x: 2, y: 2 }, p2: { x: 3, y: 3 } },
      ],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
