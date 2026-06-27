import { describe, it, expect } from "vitest";
import { RangeSet } from "../range-set.js";

describe("range-set", () => {
  it("add and contains", () => {
    const rs = new RangeSet();
    rs.add(1, 5);
    expect(rs.contains(3)).toBe(true);
    expect(rs.contains(5)).toBe(false);
    expect(rs.contains(0)).toBe(false);
  });

  it("merges overlapping ranges", () => {
    const rs = new RangeSet();
    rs.add(1, 5);
    rs.add(3, 8);
    expect(rs.size).toBe(1);
    expect(rs.toArray()).toEqual([{ start: 1, end: 8 }]);
  });

  it("merges adjacent ranges", () => {
    const rs = new RangeSet();
    rs.add(1, 3);
    rs.add(3, 5);
    expect(rs.size).toBe(1);
  });

  it("keeps separate ranges separate", () => {
    const rs = new RangeSet();
    rs.add(1, 3);
    rs.add(5, 7);
    expect(rs.size).toBe(2);
  });

  it("remove splits range", () => {
    const rs = new RangeSet();
    rs.add(1, 10);
    rs.remove(4, 6);
    expect(rs.contains(3)).toBe(true);
    expect(rs.contains(5)).toBe(false);
    expect(rs.contains(7)).toBe(true);
    expect(rs.size).toBe(2);
  });

  it("overlaps checks correctly", () => {
    const rs = new RangeSet();
    rs.add(5, 10);
    expect(rs.overlaps(8, 12)).toBe(true);
    expect(rs.overlaps(1, 4)).toBe(false);
  });

  it("totalLength sums all ranges", () => {
    const rs = new RangeSet();
    rs.add(0, 5);
    rs.add(10, 15);
    expect(rs.totalLength()).toBe(10);
  });
});
