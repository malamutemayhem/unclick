export interface BridgePort {
  portId: number;
  linkedBridge: string;
  cost: number;
  state: "blocking" | "listening" | "learning" | "forwarding" | "disabled";
  role: "root" | "designated" | "alternate" | "backup" | "none";
}

export interface BPDU {
  rootId: string;
  rootCost: number;
  senderId: string;
  portId: number;
}

export class STPBridge {
  readonly id: string;
  readonly priority: number;
  private ports = new Map<number, BridgePort>();
  private rootId: string;
  private rootCost: number;
  private rootPort: number | null;
  private nextPortId = 0;

  constructor(id: string, priority = 32768) {
    this.id = id;
    this.priority = priority;
    this.rootId = id;
    this.rootCost = 0;
    this.rootPort = null;
  }

  addPort(linkedBridge: string, cost: number): number {
    const portId = this.nextPortId++;
    this.ports.set(portId, {
      portId,
      linkedBridge,
      cost,
      state: "blocking",
      role: "none",
    });
    return portId;
  }

  generateBPDU(portId: number): BPDU {
    return {
      rootId: this.rootId,
      rootCost: this.rootCost,
      senderId: this.id,
      portId,
    };
  }

  receiveBPDU(portId: number, bpdu: BPDU): boolean {
    const port = this.ports.get(portId);
    if (!port) return false;

    let changed = false;

    if (this.isSuperior(bpdu.rootId, bpdu.rootCost + port.cost)) {
      this.rootId = bpdu.rootId;
      this.rootCost = bpdu.rootCost + port.cost;
      this.rootPort = portId;
      changed = true;
    }

    return changed;
  }

  private isSuperior(rootId: string, cost: number): boolean {
    if (rootId < this.rootId) return true;
    if (rootId === this.rootId && cost < this.rootCost) return true;
    return false;
  }

  computeRoles(): void {
    for (const [portId, port] of this.ports) {
      if (this.isRoot) {
        port.role = "designated";
        port.state = "forwarding";
      } else if (portId === this.rootPort) {
        port.role = "root";
        port.state = "forwarding";
      } else {
        port.role = "alternate";
        port.state = "blocking";
      }
    }
  }

  get isRoot(): boolean {
    return this.rootId === this.id;
  }

  get currentRoot(): string {
    return this.rootId;
  }

  get costToRoot(): number {
    return this.rootCost;
  }

  get rootPortId(): number | null {
    return this.rootPort;
  }

  getPort(portId: number): BridgePort | null {
    const p = this.ports.get(portId);
    return p ? { ...p } : null;
  }

  getPorts(): BridgePort[] {
    return [...this.ports.values()].map((p) => ({ ...p }));
  }

  get portCount(): number {
    return this.ports.size;
  }

  setPortState(portId: number, state: BridgePort["state"]): void {
    const p = this.ports.get(portId);
    if (p) p.state = state;
  }

  disablePort(portId: number): void {
    const p = this.ports.get(portId);
    if (p) {
      p.state = "disabled";
      p.role = "none";
    }
  }

  reset(): void {
    this.rootId = this.id;
    this.rootCost = 0;
    this.rootPort = null;
    for (const port of this.ports.values()) {
      port.state = "blocking";
      port.role = "none";
    }
  }
}

export function electRoot(bridges: STPBridge[]): void {
  for (const bridge of bridges) bridge.reset();

  let changed = true;
  let maxIter = bridges.length * 2;
  while (changed && maxIter-- > 0) {
    changed = false;
    for (const bridge of bridges) {
      for (const port of bridge.getPorts()) {
        const other = bridges.find((b) => b.id === port.linkedBridge);
        if (!other) continue;
        const bpdu = bridge.generateBPDU(port.portId);
        const otherPorts = other.getPorts();
        const otherPort = otherPorts.find((p) => p.linkedBridge === bridge.id);
        if (otherPort && other.receiveBPDU(otherPort.portId, bpdu)) {
          changed = true;
        }
      }
    }
  }

  for (const bridge of bridges) bridge.computeRoles();
}
