export interface Role {
  name: string;
  permissions: string[];
  inherits?: string[];
}

export class PermissionChecker {
  private roles = new Map<string, Role>();
  private assignments = new Map<string, Set<string>>();

  addRole(role: Role): void {
    this.roles.set(role.name, role);
  }

  removeRole(name: string): boolean {
    return this.roles.delete(name);
  }

  assign(userId: string, roleName: string): void {
    if (!this.assignments.has(userId)) this.assignments.set(userId, new Set());
    this.assignments.get(userId)!.add(roleName);
  }

  revoke(userId: string, roleName: string): boolean {
    return this.assignments.get(userId)?.delete(roleName) ?? false;
  }

  hasPermission(userId: string, permission: string): boolean {
    const userRoles = this.assignments.get(userId);
    if (!userRoles) return false;
    for (const roleName of userRoles) {
      if (this.roleHasPermission(roleName, permission, new Set())) return true;
    }
    return false;
  }

  getPermissions(userId: string): string[] {
    const perms = new Set<string>();
    const userRoles = this.assignments.get(userId);
    if (!userRoles) return [];
    for (const roleName of userRoles) {
      this.collectPermissions(roleName, perms, new Set());
    }
    return [...perms];
  }

  getRoles(userId: string): string[] {
    return [...(this.assignments.get(userId) ?? [])];
  }

  hasRole(userId: string, roleName: string): boolean {
    return this.assignments.get(userId)?.has(roleName) ?? false;
  }

  private roleHasPermission(roleName: string, permission: string, visited: Set<string>): boolean {
    if (visited.has(roleName)) return false;
    visited.add(roleName);
    const role = this.roles.get(roleName);
    if (!role) return false;
    if (role.permissions.includes(permission) || role.permissions.includes("*")) return true;
    if (role.inherits) {
      for (const parent of role.inherits) {
        if (this.roleHasPermission(parent, permission, visited)) return true;
      }
    }
    return false;
  }

  private collectPermissions(roleName: string, perms: Set<string>, visited: Set<string>): void {
    if (visited.has(roleName)) return;
    visited.add(roleName);
    const role = this.roles.get(roleName);
    if (!role) return;
    for (const p of role.permissions) perms.add(p);
    if (role.inherits) {
      for (const parent of role.inherits) this.collectPermissions(parent, perms, visited);
    }
  }
}
