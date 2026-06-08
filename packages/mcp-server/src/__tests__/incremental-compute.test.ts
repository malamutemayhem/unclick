import { describe, it, expect, beforeEach } from "vitest";
import {
  resetCells, input, computed, get, set,
  isDirty, cellCount, batch,
} from "../incremental-compute.js";

beforeEach(() => resetCells());

describe("input cells", () => {
  it("stores and retrieves values", () => {
    const a = input(42);
    expect(get(a)).toBe(42);
  });

  it("updates values", () => {
    const a = input(1);
    set(a, 2);
    expect(get(a)).toBe(2);
  });
});

describe("computed cells", () => {
  it("computes derived values", () => {
    const a = input(3);
    const b = input(4);
    const sum = computed(() => get<number>(a) + get<number>(b));
    expect(get(sum)).toBe(7);
  });

  it("recomputes on input change", () => {
    const a = input(5);
    const doubled = computed(() => get<number>(a) * 2);
    expect(get(doubled)).toBe(10);
    set(a, 10);
    expect(get(doubled)).toBe(20);
  });

  it("chains computations", () => {
    const a = input(2);
    const b = computed(() => get<number>(a) + 1);
    const c = computed(() => get<number>(b) * 3);
    expect(get(c)).toBe(9);
    set(a, 5);
    expect(get(c)).toBe(18);
  });

  it("marks dirty on change", () => {
    const a = input(1);
    const b = computed(() => get<number>(a) + 1);
    get(b);
    expect(isDirty(b)).toBe(false);
    set(a, 2);
    expect(isDirty(b)).toBe(true);
    get(b);
    expect(isDirty(b)).toBe(false);
  });

  it("skips recompute when value unchanged", () => {
    const a = input(5);
    const b = computed(() => get<number>(a) * 2);
    get(b);
    set(a, 5);
    expect(isDirty(b)).toBe(false);
  });
});

describe("cellCount", () => {
  it("counts all cells", () => {
    input(1);
    input(2);
    computed(() => 3);
    expect(cellCount()).toBe(3);
  });
});

describe("batch", () => {
  it("batches updates", () => {
    const a = input(1);
    const b = input(2);
    const sum = computed(() => get<number>(a) + get<number>(b));
    batch(() => {
      set(a, 10);
      set(b, 20);
    });
    expect(get(sum)).toBe(30);
  });
});
