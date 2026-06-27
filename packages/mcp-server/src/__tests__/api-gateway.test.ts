import { describe, it, expect } from "vitest";
import { APIGateway, type GatewayRequest } from "../api-gateway.js";

describe("APIGateway", () => {
  function makeReq(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", path: string, headers: Record<string, string> = {}): GatewayRequest {
    return { method, path, headers, params: {} };
  }

  it("routes requests to services", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/users", service: "user-service" });
    const res = gw.handle(makeReq("GET", "/api/users"));
    expect(res.status).toBe(200);
    expect(res.service).toBe("user-service");
  });

  it("returns 404 for unmatched routes", () => {
    const gw = new APIGateway();
    const res = gw.handle(makeReq("GET", "/unknown"));
    expect(res.status).toBe(404);
  });

  it("extracts path parameters", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/users/:id", service: "user-service" });
    const res = gw.handle(makeReq("GET", "/api/users/42"));
    expect(res.status).toBe(200);
    expect((res.body as Record<string, unknown>).params).toEqual({ id: "42" });
  });

  it("enforces authentication", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/secret", service: "secret-service", auth: true });
    const res = gw.handle(makeReq("GET", "/api/secret"));
    expect(res.status).toBe(401);
  });

  it("allows authenticated requests", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/secret", service: "secret-service", auth: true });
    const res = gw.handle(makeReq("GET", "/api/secret", { authorization: "Bearer token" }));
    expect(res.status).toBe(200);
  });

  it("applies rate limiting", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/data", service: "data-service", rateLimit: 2 });
    gw.handle(makeReq("GET", "/api/data"));
    gw.handle(makeReq("GET", "/api/data"));
    const res = gw.handle(makeReq("GET", "/api/data"));
    expect(res.status).toBe(429);
  });

  it("applies middleware", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/test", service: "test-service" });
    gw.use((_req, next) => {
      const res = next();
      res.headers["x-middleware"] = "applied";
      return res;
    });
    const res = gw.handle(makeReq("GET", "/api/test"));
    expect(res.headers["x-middleware"]).toBe("applied");
  });

  it("tracks request count", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/api/test", service: "test" });
    gw.handle(makeReq("GET", "/api/test"));
    gw.handle(makeReq("GET", "/api/test"));
    expect(gw.getRequestCount()).toBe(2);
  });

  it("lists routes", () => {
    const gw = new APIGateway();
    gw.addRoute({ method: "GET", path: "/a", service: "svc-a" });
    gw.addRoute({ method: "POST", path: "/b", service: "svc-b" });
    expect(gw.listRoutes().length).toBe(2);
    expect(gw.routeCount()).toBe(2);
  });
});
