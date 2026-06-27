import { describe, it, expect } from "vitest";
import { SkillRouter } from "../skill-router.js";

describe("SkillRouter", () => {
  function makeRouter() {
    const router = new SkillRouter();
    router.register({ name: "weather", description: "Get weather forecast", keywords: ["weather", "forecast", "temperature"], handler: () => "sunny" });
    router.register({ name: "email", description: "Send email messages", keywords: ["email", "send", "message"], handler: () => "sent" });
    router.register({ name: "calendar", description: "Manage calendar events", keywords: ["calendar", "schedule", "meeting"], handler: () => "scheduled" });
    return router;
  }

  it("matches by keyword", () => {
    const router = makeRouter();
    const result = router.match("weather forecast");
    expect(result?.skill.name).toBe("weather");
    expect(result?.score).toBeGreaterThan(0);
  });

  it("returns undefined for no match", () => {
    const router = makeRouter();
    expect(router.match("xyzzy foobar", 0.5)).toBeUndefined();
  });

  it("matchAll returns sorted results", () => {
    const router = makeRouter();
    const results = router.matchAll("send email message");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].skill.name).toBe("email");
  });

  it("route executes handler", () => {
    const router = makeRouter();
    expect(router.route("weather forecast")).toBe("sunny");
  });

  it("route returns undefined for no match", () => {
    const router = makeRouter();
    expect(router.route("xyzzy", 0.9)).toBeUndefined();
  });

  it("unregister removes skill", () => {
    const router = makeRouter();
    expect(router.unregister("weather")).toBe(true);
    expect(router.size).toBe(2);
    expect(router.unregister("weather")).toBe(false);
  });

  it("list returns all skills", () => {
    const router = makeRouter();
    expect(router.list().length).toBe(3);
  });

  it("size tracks count", () => {
    const router = new SkillRouter();
    expect(router.size).toBe(0);
    router.register({ name: "test", description: "test", keywords: ["test"], handler: () => null });
    expect(router.size).toBe(1);
  });
});
