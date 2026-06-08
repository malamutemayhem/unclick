import { describe, it, expect } from "vitest";
import { Leaderboard } from "../leaderboard.js";

describe("Leaderboard", () => {
  it("addScore and getScore work", () => {
    const lb = new Leaderboard();
    lb.addScore("alice", 100);
    expect(lb.getScore("alice")).toBe(100);
  });

  it("addScore keeps highest score", () => {
    const lb = new Leaderboard();
    lb.addScore("alice", 100);
    lb.addScore("alice", 80);
    expect(lb.getScore("alice")).toBe(100);
    lb.addScore("alice", 120);
    expect(lb.getScore("alice")).toBe(120);
  });

  it("incrementScore adds to existing", () => {
    const lb = new Leaderboard();
    lb.addScore("bob", 50);
    lb.incrementScore("bob", 10);
    expect(lb.getScore("bob")).toBe(60);
  });

  it("incrementScore creates new entry", () => {
    const lb = new Leaderboard();
    lb.incrementScore("new", 25);
    expect(lb.getScore("new")).toBe(25);
  });

  it("topN returns ranked entries", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 30);
    lb.addScore("c", 20);
    const top = lb.topN(2);
    expect(top.length).toBe(2);
    expect(top[0].id).toBe("b");
    expect(top[0].rank).toBe(1);
    expect(top[1].id).toBe("c");
  });

  it("bottomN returns lowest entries", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 30);
    lb.addScore("c", 20);
    const bottom = lb.bottomN(1);
    expect(bottom[0].id).toBe("a");
  });

  it("getRank returns correct rank", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 30);
    lb.addScore("c", 20);
    expect(lb.getRank("b")).toBe(1);
    expect(lb.getRank("a")).toBe(3);
  });

  it("around returns neighborhood entries", () => {
    const lb = new Leaderboard();
    for (let i = 0; i < 10; i++) lb.addScore(`p${i}`, i * 10);
    const neighborhood = lb.around("p5", 1);
    expect(neighborhood.length).toBe(3);
  });

  it("percentile calculates correctly", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 20);
    lb.addScore("c", 30);
    lb.addScore("d", 40);
    const pct = lb.percentile("a");
    expect(pct).not.toBeNull();
    expect(pct!).toBeLessThan(50);
  });

  it("remove and clear work", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 20);
    lb.remove("a");
    expect(lb.size()).toBe(1);
    lb.clear();
    expect(lb.size()).toBe(0);
  });

  it("average and median compute correctly", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 10);
    lb.addScore("b", 20);
    lb.addScore("c", 30);
    expect(lb.average()).toBeCloseTo(20, 1);
    expect(lb.median()).toBe(20);
  });

  it("tiers groups entries by boundaries", () => {
    const lb = new Leaderboard();
    lb.addScore("a", 90);
    lb.addScore("b", 70);
    lb.addScore("c", 50);
    const t = lb.tiers([80, 60]);
    expect(t.get(">=80")!.length).toBe(1);
    expect(t.get(">=60")!.length).toBe(1);
    expect(t.get("below")!.length).toBe(1);
  });
});
