export interface Permission {
  resource: string;
  action: string;
  condition?: (context: Record<string, unknown>) => boolean;
}

export interface Role {
  name: string;
  permissions: Permission[];
  inherits?: string[];
}

export class RBAC {
  private roles = new Map<string, Role>();
  private userRoles = new Map<string, Set<string>>();

  addRole(name: string, permissions: Permission[] = [], inherits: string[] = []): void {
    this.roles.set(name, { name, permissions, inherits });
  }

  removeRole(name: string): boolean {
    return this.roles.delete(name);
  }

  assignRole(userId: string, roleName: string): void {
    if (!this.roles.has(roleName)) throw new Error(`Role "${roleName}" not found`);
    if (!this.userRoles.has(userId)) this.userRoles.set(userId, new Set());
    this.userRoles.get(userId)!.add(roleName);
  }

  revokeRole(userId: string, roleName: string): boolean {
    const roles = this.userRoles.get(userId);
    if (!roles) return false;
    return roles.delete(roleName);
  }

  getUserRoles(userId: string): string[] {
    const roles = this.userRoles.get(userId);
    return roles ? [...roles] : [];
  }

  can(userId: string, resource: string, action: string, context: Record<string, unknown> = {}): boolean {
    const roles = this.userRoles.get(userId);
    if (!roles) return false;
    for (const roleName of roles) {
      if (this.roleHasPermission(roleName, resource, action, context, new Set())) return true;
    }
    return false;
  }

  cannot(userId: string, resource: string, action: string, context: Record<string, unknown> = {}): boolean {
    return !this.can(userId, resource, action, context);
  }

  getPermissions(roleName: string): Permission[] {
    const visited = new Set<string>();
    return this.collectPermissions(roleName, visited);
  }

  getAllPermissions(userId: string): Permission[] {
    const roles = this.userRoles.get(userId);
    if (!roles) return [];
    const visited = new Set<string>();
    const permissions: Permission[] = [];
    for (const roleName of roles) {
      permissions.push(...this.collectPermissions(roleName, visited));
    }
    return permissions;
  }

  hasRole(userId: string, roleName: string): boolean {
    const roles = this.userRoles.get(userId);
    return roles ? roles.has(roleName) : false;
  }

  listRoles(): string[] {
    return [...this.roles.keys()];
  }

  private roleHasPermission(
    roleName: string,
    resource: string,
    action: string,
    context: Record<string, unknown>,
    visited: Set<string>
  ): boolean {
    if (visited.has(roleName)) return false;
    visited.add(roleName);

    const role = this.roles.get(roleName);
    if (!role) return false;

    for (const perm of role.permissions) {
      if (this.matchPermission(perm, resource, action, context)) return true;
    }

    if (role.inherits) {
      for (const parent of role.inherits) {
        if (this.roleHasPermission(parent, resource, action, context, visited)) return true;
      }
    }

    return false;
  }

  private matchPermission(
    perm: Permission,
    resource: string,
    action: string,
    context: Record<string, unknown>
  ): boolean {
    const resourceMatch = perm.resource === "*" || perm.resource === resource;
    const actionMatch = perm.action === "*" || perm.action === action;
    if (!resourceMatch || !actionMatch) return false;
    if (perm.condition && !perm.condition(context)) return false;
    return true;
  }

  private collectPermissions(roleName: string, visited: Set<string>): Permission[] {
    if (visited.has(roleName)) return [];
    visited.add(roleName);
    const role = this.roles.get(roleName);
    if (!role) return [];
    const perms = [...role.permissions];
    if (role.inherits) {
      for (const parent of role.inherits) {
        perms.push(...this.collectPermissions(parent, visited));
      }
    }
    return perms;
  }
}

export function allow(resource: string, action: string, condition?: Permission["condition"]): Permission {
  return { resource, action, condition };
}

export function allowAll(resource: string): Permission {
  return { resource, action: "*" };
}

export function superAdmin(): Permission {
  return { resource: "*", action: "*" };
}
