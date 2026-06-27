import { describe, it, expect } from "vitest";
import { fragment, FragmentReassembler } from "../ip-fragmentation.js";

describe("fragment", () => {
  it("no fragmentation when data fits MTU", () => {
    const data = Array.from({ length: 100 }, (_, i) => i);
    const frags = fragment(data, 1500, 1);
    expect(frags).toHaveLength(1);
    expect(frags[0].moreFragments).toBe(false);
    expect(frags[0].offset).toBe(0);
  });

  it("fragments data exceeding MTU", () => {
    const data = Array.from({ length: 200 }, (_, i) => i % 256);
    const frags = fragment(data, 60, 42);
    expect(frags.length).toBeGreaterThan(1);
    expect(frags[frags.length - 1].moreFragments).toBe(false);
    for (let i = 0; i < frags.length - 1; i++) {
      expect(frags[i].moreFragments).toBe(true);
    }
  });

  it("preserves all data across fragments", () => {
    const data = Array.from({ length: 300 }, (_, i) => i % 256);
    const frags = fragment(data, 100, 1);
    const reassembled: number[] = [];
    for (const f of frags) reassembled.push(...f.data);
    expect(reassembled).toEqual(data);
  });

  it("sets correct fragment fields", () => {
    const data = Array.from({ length: 100 }, () => 0);
    const frags = fragment(data, 1500, 7, "10.0.0.1", "10.0.0.2", 17, 128);
    expect(frags[0].id).toBe(7);
    expect(frags[0].srcIp).toBe("10.0.0.1");
    expect(frags[0].dstIp).toBe("10.0.0.2");
    expect(frags[0].protocol).toBe(17);
    expect(frags[0].ttl).toBe(128);
  });

  it("offsets are 8-byte aligned for intermediate fragments", () => {
    const data = Array.from({ length: 200 }, () => 0);
    const frags = fragment(data, 60, 1);
    for (let i = 0; i < frags.length - 1; i++) {
      expect(frags[i].data.length % 8).toBe(0);
    }
  });
});

describe("FragmentReassembler", () => {
  it("reassembles fragments in order", () => {
    const data = Array.from({ length: 200 }, (_, i) => i % 256);
    const frags = fragment(data, 60, 1, "10.0.0.1", "10.0.0.2");
    const reassembler = new FragmentReassembler();

    let result: number[] | null = null;
    for (const f of frags) {
      result = reassembler.receive(f);
    }
    expect(result).not.toBeNull();
    expect(result).toEqual(data);
  });

  it("reassembles fragments out of order", () => {
    const data = Array.from({ length: 200 }, (_, i) => i % 256);
    const frags = fragment(data, 60, 1, "10.0.0.1", "10.0.0.2");
    const reassembler = new FragmentReassembler();

    const reversed = [...frags].reverse();
    let result: number[] | null = null;
    for (const f of reversed) {
      result = reassembler.receive(f);
    }
    expect(result).not.toBeNull();
    expect(result).toEqual(data);
  });

  it("returns null for incomplete", () => {
    const data = Array.from({ length: 200 }, (_, i) => i % 256);
    const frags = fragment(data, 60, 1, "10.0.0.1", "10.0.0.2");
    const reassembler = new FragmentReassembler();

    const result = reassembler.receive(frags[0]);
    expect(result).toBeNull();
    expect(reassembler.pendingCount).toBe(1);
  });

  it("tracks completed reassemblies", () => {
    const data = [1, 2, 3];
    const frags = fragment(data, 1500, 1, "10.0.0.1", "10.0.0.2");
    const reassembler = new FragmentReassembler();
    reassembler.receive(frags[0]);
    expect(reassembler.completedCount).toBe(1);
  });

  it("clear resets state", () => {
    const reassembler = new FragmentReassembler();
    const frags = fragment([1, 2, 3], 1500, 1, "10.0.0.1", "10.0.0.2");
    reassembler.receive(frags[0]);
    reassembler.clear();
    expect(reassembler.pendingCount).toBe(0);
    expect(reassembler.completedCount).toBe(0);
  });
});
