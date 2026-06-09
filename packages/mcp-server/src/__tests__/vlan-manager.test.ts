import { describe, it, expect } from "vitest";
import { VlanManager } from "../vlan-manager.js";

describe("VlanManager", () => {
  it("creates a VLAN", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "Engineering", "10.10.10.0/24");
    expect(vm.vlanCount).toBe(1);
    const v = vm.getVlan(10)!;
    expect(v.name).toBe("Engineering");
  });

  it("rejects invalid VLAN ID", () => {
    const vm = new VlanManager();
    expect(() => vm.createVlan(0, "Bad")).toThrow();
    expect(() => vm.createVlan(4095, "Bad")).toThrow();
  });

  it("deletes a VLAN", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "Test");
    expect(vm.deleteVlan(10)).toBe(true);
    expect(vm.vlanCount).toBe(0);
  });

  it("deleteVlan returns false for missing", () => {
    const vm = new VlanManager();
    expect(vm.deleteVlan(99)).toBe(false);
  });

  it("assigns port to VLAN", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "Test");
    vm.assignPort(10, 1);
    expect(vm.getPortVlan(1)).toBe(10);
    expect(vm.getVlan(10)!.ports.has(1)).toBe(true);
  });

  it("moves port between VLANs", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.createVlan(20, "B");
    vm.assignPort(10, 1);
    vm.assignPort(20, 1);
    expect(vm.getPortVlan(1)).toBe(20);
    expect(vm.getVlan(10)!.ports.has(1)).toBe(false);
  });

  it("assignPort throws for missing VLAN", () => {
    const vm = new VlanManager();
    expect(() => vm.assignPort(99, 1)).toThrow();
  });

  it("removePort works", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "Test");
    vm.assignPort(10, 1);
    expect(vm.removePort(1)).toBe(true);
    expect(vm.getPortVlan(1)).toBeNull();
  });

  it("configureTrunk sets up trunk port", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.createVlan(20, "B");
    vm.configureTrunk(24, [10, 20]);
    expect(vm.isTrunk(24)).toBe(true);
    const trunk = vm.getTrunk(24)!;
    expect(trunk.allowedVlans.has(10)).toBe(true);
    expect(trunk.allowedVlans.has(20)).toBe(true);
  });

  it("removeTrunk clears trunk config", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.configureTrunk(24, [10]);
    expect(vm.removeTrunk(24)).toBe(true);
    expect(vm.isTrunk(24)).toBe(false);
  });

  it("canForward same VLAN access ports", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "Test");
    vm.assignPort(10, 1);
    vm.assignPort(10, 2);
    expect(vm.canForward(1, 2)).toBe(true);
  });

  it("canForward blocks different VLANs", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.createVlan(20, "B");
    vm.assignPort(10, 1);
    vm.assignPort(20, 2);
    expect(vm.canForward(1, 2)).toBe(false);
  });

  it("canForward access to trunk with allowed VLAN", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.assignPort(10, 1);
    vm.configureTrunk(24, [10, 20]);
    expect(vm.canForward(1, 24)).toBe(true);
  });

  it("listVlans returns all", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.createVlan(20, "B");
    expect(vm.listVlans()).toHaveLength(2);
  });

  it("trunkCount tracks trunks", () => {
    const vm = new VlanManager();
    vm.createVlan(10, "A");
    vm.configureTrunk(24, [10]);
    vm.configureTrunk(25, [10]);
    expect(vm.trunkCount).toBe(2);
  });
});
