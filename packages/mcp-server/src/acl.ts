export type Permission = "read" | "write" | "delete" | "admin";

export interface AclEntry {
  principal: string;
  permissions: Set<Permission>;
}

export class AccessControlList {
  private entries = new Map<string, Set<Permission>>();
  private groups = new Map<string, Set<string>>();

  grant(principal: string, ...permissions: Permission[]): void {
    if (!this.entries.has(principal)) this.entries.set(principal, new Set());
    const perms = this.entries.get(principal)!;
    for (const p of permissions) perms.add(p);
  }

  revoke(principal: string, ...permissions: Permission[]): void {
    const perms = this.entries.get(principal);
    if (!perms) return;
    for (const p of permissions) perms.delete(p);
    if (perms.size === 0) this.entries.delete(principal);
  }

  check(principal: string, permission: Permission): boolean {
    const perms = this.entries.get(principal);
    if (perms) {
      if (perms.has("admin") || perms.has(permission)) return true;
    }
    for (const [group, members] of this.groups) {
      if (members.has(principal)) {
        const groupPerms = this.entries.get(`group:${group}`);
        if (groupPerms && (groupPerms.has("admin") || groupPerms.has(permission))) return true;
      }
    }
    return false;
  }

  addToGroup(principal: string, group: string): void {
    if (!this.groups.has(group)) this.groups.set(group, new Set());
    this.groups.get(group)!.add(principal);
  }

  removeFromGroup(principal: string, group: string): void {
    this.groups.get(group)?.delete(principal);
  }

  grantGroup(group: string, ...permissions: Permission[]): void {
    this.grant(`group:${group}`, ...permissions);
  }

  getPermissions(principal: string): Permission[] {
    const direct = this.entries.get(principal);
    const all = new Set<Permission>(direct ?? []);
    for (const [group, members] of this.groups) {
      if (members.has(principal)) {
        const groupPerms = this.entries.get(`group:${group}`);
        if (groupPerms) for (const p of groupPerms) all.add(p);
      }
    }
    return [...all];
  }

  listPrincipals(): string[] {
    return [...this.entries.keys()].filter((k) => !k.startsWith("group:"));
  }

  clear(): void {
    this.entries.clear();
    this.groups.clear();
  }
}
