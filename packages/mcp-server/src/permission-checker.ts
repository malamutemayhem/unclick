export interface Permission {
  resource: string;
  action: string;
}

export interface Role {
  name: string;
  permissions: Permission[];
  inherits?: string[];
}

export class PermissionChecker {
  private roles = new Map<string, Role>();

  addRole(role: Role): void {
    this.roles.set(role.name, role);
  }

  can(roleName: string, resource: string, action: string): boolean {
    return this.getEffectivePermissions(roleName, new Set()).some(
      (p) => matchPermission(p, resource, action),
    );
  }

  getEffectivePermissions(roleName: string, visited = new Set<string>()): Permission[] {
    if (visited.has(roleName)) return [];
    visited.add(roleName);

    const role = this.roles.get(roleName);
    if (!role) return [];

    const inherited = (role.inherits ?? []).flatMap((r) =>
      this.getEffectivePermissions(r, visited),
    );
    return [...inherited, ...role.permissions];
  }

  listRoles(): string[] {
    return [...this.roles.keys()];
  }
}

function matchPermission(perm: Permission, resource: string, action: string): boolean {
  return (perm.resource === "*" || perm.resource === resource) &&
    (perm.action === "*" || perm.action === action);
}
