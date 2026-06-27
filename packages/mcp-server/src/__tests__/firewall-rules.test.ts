import { describe, it, expect } from "vitest";
import { Firewall } from "../firewall-rules.js";

describe("Firewall", () => {
  it("defaults to deny", () => {
    const fw = new Firewall("deny");
    const result = fw.evaluate({
      protocol: "tcp",
      direction: "inbound",
      sourceIp: "1.2.3.4",
      destIp: "10.0.0.1",
    });
    expect(result.action).toBe("deny");
    expect(result.matchedRule).toBeNull();
  });

  it("matches allow rule", () => {
    const fw = new Firewall("deny");
    fw.addRule({
      id: "r1",
      name: "Allow HTTP",
      priority: 1,
      action: "allow",
      protocol: "tcp",
      direction: "inbound",
      destPort: 80,
      enabled: true,
    });
    const result = fw.evaluate({
      protocol: "tcp",
      direction: "inbound",
      sourceIp: "1.2.3.4",
      destIp: "10.0.0.1",
      destPort: 80,
    });
    expect(result.action).toBe("allow");
  });

  it("respects priority order", () => {
    const fw = new Firewall("deny");
    fw.addRule({
      id: "r1",
      name: "Deny All",
      priority: 10,
      action: "deny",
      protocol: "any",
      direction: "both",
      enabled: true,
    });
    fw.addRule({
      id: "r2",
      name: "Allow HTTP",
      priority: 1,
      action: "allow",
      protocol: "tcp",
      direction: "inbound",
      destPort: 80,
      enabled: true,
    });
    const result = fw.evaluate({
      protocol: "tcp",
      direction: "inbound",
      sourceIp: "1.1.1.1",
      destIp: "10.0.0.1",
      destPort: 80,
    });
    expect(result.action).toBe("allow");
  });

  it("skips disabled rules", () => {
    const fw = new Firewall("deny");
    fw.addRule({
      id: "r1",
      name: "Allow SSH",
      priority: 1,
      action: "allow",
      protocol: "tcp",
      direction: "inbound",
      destPort: 22,
      enabled: false,
    });
    const result = fw.evaluate({
      protocol: "tcp",
      direction: "inbound",
      sourceIp: "1.1.1.1",
      destIp: "10.0.0.1",
      destPort: 22,
    });
    expect(result.action).toBe("deny");
  });

  it("removes rules", () => {
    const fw = new Firewall();
    fw.addRule({
      id: "r1",
      name: "Test",
      priority: 1,
      action: "allow",
      protocol: "any",
      direction: "both",
      enabled: true,
    });
    expect(fw.removeRule("r1")).toBe(true);
    expect(fw.ruleCount()).toBe(0);
  });

  it("enables and disables rules", () => {
    const fw = new Firewall();
    fw.addRule({
      id: "r1",
      name: "Test",
      priority: 1,
      action: "allow",
      protocol: "any",
      direction: "both",
      enabled: true,
    });
    fw.disableRule("r1");
    expect(fw.getRules()[0].enabled).toBe(false);
    fw.enableRule("r1");
    expect(fw.getRules()[0].enabled).toBe(true);
  });

  it("tracks allow and deny counts", () => {
    const fw = new Firewall("deny");
    fw.addRule({
      id: "r1",
      name: "Allow HTTP",
      priority: 1,
      action: "allow",
      protocol: "tcp",
      direction: "inbound",
      destPort: 80,
      enabled: true,
    });
    fw.evaluate({ protocol: "tcp", direction: "inbound", sourceIp: "1.1.1.1", destIp: "10.0.0.1", destPort: 80 });
    fw.evaluate({ protocol: "tcp", direction: "inbound", sourceIp: "1.1.1.1", destIp: "10.0.0.1", destPort: 22 });
    expect(fw.allowedCount()).toBe(1);
    expect(fw.deniedCount()).toBe(1);
  });

  it("clears log", () => {
    const fw = new Firewall();
    fw.evaluate({ protocol: "tcp", direction: "inbound", sourceIp: "1.1.1.1", destIp: "10.0.0.1" });
    fw.clearLog();
    expect(fw.getLog().length).toBe(0);
  });

  it("matches source IP", () => {
    const fw = new Firewall("deny");
    fw.addRule({
      id: "r1",
      name: "Block attacker",
      priority: 1,
      action: "deny",
      protocol: "any",
      direction: "inbound",
      sourceIp: "5.5.5.5",
      enabled: true,
    });
    const blocked = fw.evaluate({ protocol: "tcp", direction: "inbound", sourceIp: "5.5.5.5", destIp: "10.0.0.1" });
    expect(blocked.action).toBe("deny");
    expect(blocked.matchedRule!.id).toBe("r1");
  });
});
