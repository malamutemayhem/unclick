import { describe, it, expect } from "vitest";
import { TimeSeries } from "../time-series.js";

describe("TimeSeries", () => {
  it("adds and retrieves points", () => {
    const ts = new TimeSeries();
    ts.add(10, 1000);
    ts.add(20, 2000);
    expect(ts.size).toBe(2);
    expect(ts.latest(1)[0].value).toBe(20);
  });

  it("range query", () => {
    const ts = new TimeSeries();
    ts.add(1, 100);
    ts.add(2, 200);
    ts.add(3, 300);
    expect(ts.range(150, 250).length).toBe(1);
  });

  it("average", () => {
    const ts = new TimeSeries();
    ts.add(10, 1);
    ts.add(20, 2);
    ts.add(30, 3);
    expect(ts.average()).toBe(20);
  });

  it("min/max", () => {
    const ts = new TimeSeries();
    ts.add(5, 1);
    ts.add(15, 2);
    ts.add(10, 3);
    expect(ts.min()?.value).toBe(5);
    expect(ts.max()?.value).toBe(15);
  });

  it("rate of change", () => {
    const ts = new TimeSeries();
    ts.add(0, 0);
    ts.add(100, 1000);
    expect(ts.rateOfChange()).toBeCloseTo(0.1);
  });

  it("downsample", () => {
    const ts = new TimeSeries();
    ts.add(10, 100);
    ts.add(20, 150);
    ts.add(30, 200);
    ts.add(40, 250);
    const down = ts.downsample(200);
    expect(down.length).toBeLessThan(4);
  });

  it("prunes old data with maxAge", () => {
    const ts = new TimeSeries(100);
    ts.add(1, 1000);
    ts.add(2, 1050);
    ts.add(3, 1200);
    expect(ts.size).toBe(1);
  });

  it("clear empties", () => {
    const ts = new TimeSeries();
    ts.add(1, 1);
    ts.clear();
    expect(ts.size).toBe(0);
  });
});
