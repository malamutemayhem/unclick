export type Permission = string;

export interface Capability {
  id: string;
  resource: string;
  permissions: Set<Permission>;
  owner: string;
  revoked: boolean;
  attenuations: Permission[];
}

export class CapabilitySystem {
  private capabilities = new Map<string, Capability>();
  private nextId = 1;
  private revocationLog: Array<{ capId: string; revokedBy: string; time: number }> = [];

  grant(owner: string, resource: string, permissions: Permission[]): string {
    const id = `cap_${this.nextId++}`;
    this.capabilities.set(id, {
      id,
      resource,
      permissions: new Set(permissions),
      owner,
      revoked: false,
      attenuations: [],
    });
    return id;
  }

  check(capId: string, resource: string, permission: Permission): boolean {
    const cap = this.capabilities.get(capId);
    if (!cap) return false;
    if (cap.revoked) return false;
    if (cap.resource !== resource) return false;
    return cap.permissions.has(permission);
  }

  attenuate(capId: string, newOwner: string, subset: Permission[]): string | null {
    const original = this.capabilities.get(capId);
    if (!original || original.revoked) return null;

    const valid = subset.every((p) => original.permissions.has(p));
    if (!valid) return null;

    const newId = `cap_${this.nextId++}`;
    this.capabilities.set(newId, {
      id: newId,
      resource: original.resource,
      permissions: new Set(subset),
      owner: newOwner,
      revoked: false,
      attenuations: [...original.attenuations, capId],
    });
    return newId;
  }

  revoke(capId: string, revokedBy: string): boolean {
    const cap = this.capabilities.get(capId);
    if (!cap || cap.revoked) return false;
    cap.revoked = true;
    this.revocationLog.push({ capId, revokedBy, time: Date.now() });
    this.revokeDescendants(capId, revokedBy);
    return true;
  }

  private revokeDescendants(parentId: string, revokedBy: string): void {
    for (const [, cap] of this.capabilities) {
      if (!cap.revoked && cap.attenuations.includes(parentId)) {
        cap.revoked = true;
        this.revocationLog.push({ capId: cap.id, revokedBy, time: Date.now() });
        this.revokeDescendants(cap.id, revokedBy);
      }
    }
  }

  isRevoked(capId: string): boolean {
    const cap = this.capabilities.get(capId);
    return !cap || cap.revoked;
  }

  listCapabilities(owner: string): Capability[] {
    const result: Capability[] = [];
    for (const cap of this.capabilities.values()) {
      if (cap.owner === owner && !cap.revoked) result.push(cap);
    }
    return result;
  }

  permissionsFor(capId: string): Permission[] {
    const cap = this.capabilities.get(capId);
    if (!cap || cap.revoked) return [];
    return [...cap.permissions];
  }

  revocationHistory(): Array<{ capId: string; revokedBy: string; time: number }> {
    return [...this.revocationLog];
  }

  totalCapabilities(): number {
    return this.capabilities.size;
  }

  activeCapabilities(): number {
    let count = 0;
    for (const cap of this.capabilities.values()) {
      if (!cap.revoked) count++;
    }
    return count;
  }
}
