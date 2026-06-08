import { describe, it, expect } from "vitest";
import { Timeline } from "../timeline.js";

describe("timeline", () => {
  it("adds events in order", () => {
    const tl = new Timeline<string>();
    tl.add(3, "c");
    tl.add(1, "a");
    tl.add(2, "b");
    expect(tl.at(0)!.data).toBe("a");
    expect(tl.at(2)!.data).toBe("c");
  });

  it("range returns events in time window", () => {
    const tl = new Timeline<number>();
    tl.add(1, 10);
    tl.add(5, 50);
    tl.add(10, 100);
    const events = tl.range(2, 8);
    expect(events.length).toBe(1);
    expect(events[0].data).toBe(50);
  });

  it("before returns last event before time", () => {
    const tl = new Timeline<string>();
    tl.add(1, "a");
    tl.add(5, "b");
    tl.add(10, "c");
    expect(tl.before(7)!.data).toBe("b");
  });

  it("after returns first event after time", () => {
    const tl = new Timeline<string>();
    tl.add(1, "a");
    tl.add(5, "b");
    expect(tl.after(3)!.data).toBe("b");
  });

  it("closest returns nearest event", () => {
    const tl = new Timeline<string>();
    tl.add(1, "a");
    tl.add(10, "b");
    expect(tl.closest(3)!.data).toBe("a");
    expect(tl.closest(8)!.data).toBe("b");
  });

  it("tracks length", () => {
    const tl = new Timeline();
    tl.add(1, "x");
    tl.add(2, "y");
    expect(tl.length).toBe(2);
  });

  it("clear removes all", () => {
    const tl = new Timeline();
    tl.add(1, "x");
    tl.clear();
    expect(tl.length).toBe(0);
  });

  it("all returns sorted copy", () => {
    const tl = new Timeline<number>();
    tl.add(5, 50);
    tl.add(1, 10);
    const all = tl.all();
    expect(all[0].time).toBe(1);
    expect(all[1].time).toBe(5);
  });
});
