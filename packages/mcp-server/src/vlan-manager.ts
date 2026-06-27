export interface VlanConfig {
  id: number;
  name: string;
  subnet?: string;
  ports: Set<number>;
  tagged: Set<number>;
}

export interface TrunkPort {
  portId: number;
  allowedVlans: Set<number>;
  nativeVlan: number;
}

export class VlanManager {
  private vlans = new Map<number, VlanConfig>();
  private trunks = new Map<number, TrunkPort>();
  private portVlan = new Map<number, number>();

  createVlan(id: number, name: string, subnet?: string): void {
    if (id < 1 || id > 4094) throw new Error("VLAN ID must be 1-4094");
    this.vlans.set(id, {
      id,
      name,
      subnet,
      ports: new Set(),
      tagged: new Set(),
    });
  }

  deleteVlan(id: number): boolean {
    const vlan = this.vlans.get(id);
    if (!vlan) return false;
    for (const port of vlan.ports) {
      this.portVlan.delete(port);
    }
    this.vlans.delete(id);
    return true;
  }

  assignPort(vlanId: number, portId: number): void {
    const vlan = this.vlans.get(vlanId);
    if (!vlan) throw new Error(`VLAN ${vlanId} not found`);
    const oldVlan = this.portVlan.get(portId);
    if (oldVlan !== undefined) {
      this.vlans.get(oldVlan)?.ports.delete(portId);
    }
    vlan.ports.add(portId);
    this.portVlan.set(portId, vlanId);
  }

  removePort(portId: number): boolean {
    const vlanId = this.portVlan.get(portId);
    if (vlanId === undefined) return false;
    this.vlans.get(vlanId)?.ports.delete(portId);
    this.portVlan.delete(portId);
    return true;
  }

  configureTrunk(portId: number, allowedVlans: number[], nativeVlan = 1): void {
    this.trunks.set(portId, {
      portId,
      allowedVlans: new Set(allowedVlans),
      nativeVlan,
    });
    for (const vlanId of allowedVlans) {
      this.vlans.get(vlanId)?.tagged.add(portId);
    }
  }

  removeTrunk(portId: number): boolean {
    const trunk = this.trunks.get(portId);
    if (!trunk) return false;
    for (const vlanId of trunk.allowedVlans) {
      this.vlans.get(vlanId)?.tagged.delete(portId);
    }
    this.trunks.delete(portId);
    return true;
  }

  getPortVlan(portId: number): number | null {
    return this.portVlan.get(portId) ?? null;
  }

  isTrunk(portId: number): boolean {
    return this.trunks.has(portId);
  }

  getTrunk(portId: number): TrunkPort | null {
    const t = this.trunks.get(portId);
    if (!t) return null;
    return { portId: t.portId, allowedVlans: new Set(t.allowedVlans), nativeVlan: t.nativeVlan };
  }

  canForward(srcPort: number, dstPort: number): boolean {
    const srcVlan = this.portVlan.get(srcPort);
    const dstVlan = this.portVlan.get(dstPort);

    if (srcVlan !== undefined && dstVlan !== undefined) {
      return srcVlan === dstVlan;
    }

    if (srcVlan !== undefined && this.trunks.has(dstPort)) {
      return this.trunks.get(dstPort)!.allowedVlans.has(srcVlan);
    }

    if (this.trunks.has(srcPort) && dstVlan !== undefined) {
      return this.trunks.get(srcPort)!.allowedVlans.has(dstVlan);
    }

    return false;
  }

  getVlan(id: number): VlanConfig | null {
    const v = this.vlans.get(id);
    if (!v) return null;
    return { id: v.id, name: v.name, subnet: v.subnet, ports: new Set(v.ports), tagged: new Set(v.tagged) };
  }

  listVlans(): VlanConfig[] {
    return [...this.vlans.values()].map((v) => ({
      id: v.id,
      name: v.name,
      subnet: v.subnet,
      ports: new Set(v.ports),
      tagged: new Set(v.tagged),
    }));
  }

  get vlanCount(): number {
    return this.vlans.size;
  }

  get trunkCount(): number {
    return this.trunks.size;
  }
}
