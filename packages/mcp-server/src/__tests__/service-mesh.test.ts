import { describe, it, expect } from "vitest";
import { ServiceMesh } from "../service-mesh.js";

describe("ServiceMesh", () => {
  it("registers and resolves services", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    const instance = mesh.resolve("api");
    expect(instance).not.toBeNull();
    expect(instance!.host).toBe("10.0.0.1");
  });

  it("round-robin load balancing", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    mesh.register("api", "api-2", "10.0.0.2", 8080);
    const first = mesh.resolve("api", "round-robin")!.id;
    const second = mesh.resolve("api", "round-robin")!.id;
    expect(first).not.toBe(second);
  });

  it("deregisters instances", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    expect(mesh.deregister("api", "api-1")).toBe(true);
    expect(mesh.instanceCount("api")).toBe(0);
  });

  it("skips down instances", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    mesh.setStatus("api", "api-1", "down");
    expect(mesh.resolve("api")).toBeNull();
  });

  it("adds and retrieves routes", () => {
    const mesh = new ServiceMesh();
    mesh.addRoute("frontend", "api");
    const routes = mesh.getRoutes("frontend");
    expect(routes.length).toBe(1);
    expect(routes[0].destination).toBe("api");
  });

  it("manages circuit breaker", () => {
    const mesh = new ServiceMesh(3);
    expect(mesh.isCircuitOpen("api")).toBe(false);
    mesh.recordFailure("api");
    mesh.recordFailure("api");
    mesh.recordFailure("api");
    expect(mesh.isCircuitOpen("api")).toBe(true);
    mesh.recordSuccess("api");
    expect(mesh.isCircuitOpen("api")).toBe(false);
  });

  it("performs health checks", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    mesh.register("api", "api-2", "10.0.0.2", 8080);
    mesh.setStatus("api", "api-2", "degraded");
    const health = mesh.healthCheck().get("api")!;
    expect(health.total).toBe(2);
    expect(health.healthy).toBe(1);
    expect(health.degraded).toBe(1);
  });

  it("counts services", () => {
    const mesh = new ServiceMesh();
    mesh.register("api", "api-1", "10.0.0.1", 8080);
    mesh.register("db", "db-1", "10.0.1.1", 5432);
    expect(mesh.serviceCount()).toBe(2);
  });

  it("returns null for unknown service", () => {
    const mesh = new ServiceMesh();
    expect(mesh.resolve("unknown")).toBeNull();
  });
});
