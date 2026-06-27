export interface Capability {
  id: number;
  resource: string;
  permissions: Set<string>;
  attenuations: string[];
  revoked: boolean;
  parent: number | null;
}

export class CapabilitySystem {
  private capabilities = new Map<number, Capability>();
  private nextId = 0;
  private log: { action: string; capId: number; detail?: string }[] = [];

  mint(resource: string, permissions: string[]): number {
    const id = this.nextId++;
    this.capabilities.set(id, {
      id,
      resource,
      permissions: new Set(permissions),
      attenuations: [],
      revoked: false,
      parent: null,
    });
    this.log.push({ action: "mint", capId: id, detail: `${resource}:${permissions.join(",")}` });
    return id;
  }

  attenuate(capId: number, subset: string[]): number | null {
    const parent = this.capabilities.get(capId);
    if (!parent || parent.revoked) return null;

    for (const p of subset) {
      if (!parent.permissions.has(p)) return null;
    }

    const id = this.nextId++;
    this.capabilities.set(id, {
      id,
      resource: parent.resource,
      permissions: new Set(subset),
      attenuations: [...parent.attenuations, `from:${capId}`],
      revoked: false,
      parent: capId,
    });
    this.log.push({ action: "attenuate", capId: id, detail: `parent:${capId}` });
    return id;
  }

  check(capId: number, permission: string): boolean {
    const cap = this.capabilities.get(capId);
    if (!cap || cap.revoked) return false;
    if (!cap.permissions.has(permission)) return false;
    if (cap.parent !== null) {
      return this.check(cap.parent, permission);
    }
    return true;
  }

  revoke(capId: number): number {
    let count = 0;
    const revokeCap = (id: number) => {
      const cap = this.capabilities.get(id);
      if (!cap || cap.revoked) return;
      cap.revoked = true;
      count++;
      this.log.push({ action: "revoke", capId: id });
      for (const [childId, child] of this.capabilities) {
        if (child.parent === id) {
          revokeCap(childId);
        }
      }
    };
    revokeCap(capId);
    return count;
  }

  isValid(capId: number): boolean {
    const cap = this.capabilities.get(capId);
    if (!cap || cap.revoked) return false;
    if (cap.parent !== null) return this.isValid(cap.parent);
    return true;
  }

  getCapability(capId: number): Capability | undefined {
    return this.capabilities.get(capId);
  }

  getPermissions(capId: number): string[] {
    const cap = this.capabilities.get(capId);
    if (!cap || cap.revoked) return [];
    return [...cap.permissions];
  }

  children(capId: number): number[] {
    const result: number[] = [];
    for (const [id, cap] of this.capabilities) {
      if (cap.parent === capId) result.push(id);
    }
    return result;
  }

  get totalCount(): number {
    return this.capabilities.size;
  }

  get activeCount(): number {
    let count = 0;
    for (const [, cap] of this.capabilities) {
      if (!cap.revoked) count++;
    }
    return count;
  }

  getLog(): typeof this.log {
    return [...this.log];
  }

  clearLog(): void {
    this.log = [];
  }
}
