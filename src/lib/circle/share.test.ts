import { describe, expect, it } from "vitest";
import {
  derivePillState,
  isNeutral,
  isTwoWay,
  isWired,
  SHARE_RESOURCES,
  shareGroups,
  type PermissionState,
} from "./share";

const base: PermissionState = {
  give_enabled: false,
  give_accepted: false,
  give_active: false,
  receive_enabled: false,
  receive_offered: false,
  receive_active: false,
};

describe("Circle share registry", () => {
  it("maps an empty state to a neutral pill", () => {
    const pill = derivePillState(base);
    expect(pill).toEqual({ give: "off", receive: "off" });
    expect(isNeutral(pill)).toBe(true);
    expect(isTwoWay(pill)).toBe(false);
  });

  it("shows outgoing-pending when you share but they have not accepted", () => {
    expect(derivePillState({ ...base, give_enabled: true })).toEqual({ give: "pending", receive: "off" });
  });

  it("shows incoming-pending when they offer but it is not active yet", () => {
    expect(derivePillState({ ...base, receive_offered: true })).toEqual({ give: "off", receive: "pending" });
    expect(derivePillState({ ...base, receive_enabled: true })).toEqual({ give: "off", receive: "pending" });
  });

  it("shows a two-way handshake only when both directions are active", () => {
    const pill = derivePillState({
      ...base,
      give_enabled: true,
      give_active: true,
      receive_enabled: true,
      receive_active: true,
    });
    expect(pill).toEqual({ give: "active", receive: "active" });
    expect(isTwoWay(pill)).toBe(true);
  });

  it("treats an undefined state as neutral (no crash)", () => {
    expect(derivePillState(undefined)).toEqual({ give: "off", receive: "off" });
  });

  it("exposes Memory as a collapsible group with its children", () => {
    const groups = shareGroups();
    const memory = groups.find((entry) => entry.group.id === "memory");
    expect(memory).toBeDefined();
    expect(memory?.children.map((child) => child.id)).toContain("memory.facts");
    expect(memory?.children.length).toBeGreaterThanOrEqual(6);
  });

  it("only wires resources that have a backend key and are not sensitive", () => {
    const memory = SHARE_RESOURCES.find((r) => r.id === "memory")!;
    const facts = SHARE_RESOURCES.find((r) => r.id === "memory.facts")!;
    const apps = SHARE_RESOURCES.find((r) => r.id === "apps")!;
    expect(isWired(memory)).toBe(true); // shared_memory is real today
    expect(isWired(facts)).toBe(false); // structure-only until its key ships
    expect(isWired(apps)).toBe(false); // sensitive: needs sign-off
  });

  it("keeps every child under a real top-level group", () => {
    const topIds = new Set(SHARE_RESOURCES.filter((r) => r.parentId === null).map((r) => r.id));
    for (const resource of SHARE_RESOURCES) {
      if (resource.parentId !== null) expect(topIds.has(resource.parentId)).toBe(true);
    }
  });
});
