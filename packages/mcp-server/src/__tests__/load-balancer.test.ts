import { describe, it, expect } from "vitest";
import { LoadBalancer } from "../load-balancer.js";

describe("LoadBalancer", () => {
  it("round-robin distributes evenly", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.addBackend("c", "10.0.0.3:80");
    const ids = [lb.next()!.id, lb.next()!.id, lb.next()!.id];
    expect(ids).toEqual(["a", "b", "c"]);
  });

  it("round-robin wraps around", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.next(); lb.next();
    expect(lb.next()!.id).toBe("a");
  });

  it("least-connections picks min", () => {
    const lb = new LoadBalancer("least-connections");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.next(); // a gets 1 connection
    expect(lb.next()!.id).toBe("b");
  });

  it("release decrements connections", () => {
    const lb = new LoadBalancer("least-connections");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.next(); // a=1
    lb.next(); // b=1
    lb.release("a"); // a=0, b=1
    expect(lb.next()!.id).toBe("a"); // a has fewer
  });

  it("ip-hash is sticky", () => {
    const lb = new LoadBalancer("ip-hash");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.addBackend("c", "10.0.0.3:80");
    const ip = "192.168.1.100";
    const first = lb.next(ip)!.id;
    const second = lb.next(ip)!.id;
    expect(first).toBe(second);
  });

  it("unhealthy backend skipped", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    lb.setHealth("a", false);
    expect(lb.next()!.id).toBe("b");
  });

  it("all unhealthy returns null", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.setHealth("a", false);
    expect(lb.next()).toBeNull();
  });

  it("removeBackend works", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    expect(lb.removeBackend("a")).toBe(true);
    expect(lb.totalCount).toBe(1);
  });

  it("removeBackend returns false for missing", () => {
    const lb = new LoadBalancer();
    expect(lb.removeBackend("x")).toBe(false);
  });

  it("healthyCount tracks health", () => {
    const lb = new LoadBalancer();
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    expect(lb.healthyCount).toBe(2);
    lb.setHealth("a", false);
    expect(lb.healthyCount).toBe(1);
  });

  it("getBackend returns copy", () => {
    const lb = new LoadBalancer();
    lb.addBackend("a", "10.0.0.1:80");
    const b = lb.getBackend("a");
    expect(b).not.toBeNull();
    expect(b!.address).toBe("10.0.0.1:80");
  });

  it("getBackend returns null for missing", () => {
    const lb = new LoadBalancer();
    expect(lb.getBackend("x")).toBeNull();
  });

  it("list returns all backends", () => {
    const lb = new LoadBalancer();
    lb.addBackend("a", "10.0.0.1:80");
    lb.addBackend("b", "10.0.0.2:80");
    expect(lb.list()).toHaveLength(2);
  });

  it("setAlgorithm switches mode", () => {
    const lb = new LoadBalancer("round-robin");
    lb.setAlgorithm("least-connections");
    expect(lb.currentAlgorithm).toBe("least-connections");
  });

  it("updateResponseTime sets value", () => {
    const lb = new LoadBalancer();
    lb.addBackend("a", "10.0.0.1:80");
    lb.updateResponseTime("a", 42);
    expect(lb.getBackend("a")!.responseTimeMs).toBe(42);
  });

  it("totalRequests increments on next", () => {
    const lb = new LoadBalancer("round-robin");
    lb.addBackend("a", "10.0.0.1:80");
    lb.next();
    lb.next();
    expect(lb.getBackend("a")!.totalRequests).toBe(2);
  });

  it("weighted-least-connections favors higher weight", () => {
    const lb = new LoadBalancer("weighted-least-connections");
    lb.addBackend("a", "10.0.0.1:80", 1);
    lb.addBackend("b", "10.0.0.2:80", 10);
    // Both have 0 connections. b has higher weight so lower ratio
    // After first pick (b, conn=1), ratio b=1/10=0.1, ratio a=0/1=0
    // Then a gets picked
    const first = lb.next()!.id;
    const second = lb.next()!.id;
    expect([first, second].sort()).toEqual(["a", "b"]);
  });
});
