export type Permission = "read" | "write" | "execute" | "delete" | "admin";

export interface ACLEntry {
  subject: string;
  permissions: Set<Permission>;
}

export class ACL {
  private entries = new Map<string, Map<string, Set<Permission>>>();

  grant(subject: string, resource: string, ...perms: Permission[]): void {
    if (!this.entries.has(resource)) {
      this.entries.set(resource, new Map());
    }
    const resourceAcl = this.entries.get(resource)!;
    if (!resourceAcl.has(subject)) {
      resourceAcl.set(subject, new Set());
    }
    const subjectPerms = resourceAcl.get(subject)!;
    for (const p of perms) subjectPerms.add(p);
  }

  revoke(subject: string, resource: string, ...perms: Permission[]): void {
    const resourceAcl = this.entries.get(resource);
    if (!resourceAcl) return;
    const subjectPerms = resourceAcl.get(subject);
    if (!subjectPerms) return;
    for (const p of perms) subjectPerms.delete(p);
    if (subjectPerms.size === 0) resourceAcl.delete(subject);
  }

  check(subject: string, resource: string, perm: Permission): boolean {
    const resourceAcl = this.entries.get(resource);
    if (!resourceAcl) return false;
    const subjectPerms = resourceAcl.get(subject);
    if (!subjectPerms) return false;
    return subjectPerms.has(perm);
  }

  getPermissions(subject: string, resource: string): Permission[] {
    const resourceAcl = this.entries.get(resource);
    if (!resourceAcl) return [];
    const subjectPerms = resourceAcl.get(subject);
    if (!subjectPerms) return [];
    return [...subjectPerms];
  }

  getSubjects(resource: string): string[] {
    const resourceAcl = this.entries.get(resource);
    if (!resourceAcl) return [];
    return [...resourceAcl.keys()];
  }
}

export class RBAC {
  private rolePermissions = new Map<string, Map<string, Set<Permission>>>();
  private userRoles = new Map<string, Set<string>>();
  private roleHierarchy = new Map<string, Set<string>>();

  addRole(role: string, parent?: string): void {
    if (!this.rolePermissions.has(role)) {
      this.rolePermissions.set(role, new Map());
    }
    if (parent) {
      if (!this.roleHierarchy.has(role)) {
        this.roleHierarchy.set(role, new Set());
      }
      this.roleHierarchy.get(role)!.add(parent);
    }
  }

  grantToRole(role: string, resource: string, ...perms: Permission[]): void {
    if (!this.rolePermissions.has(role)) this.addRole(role);
    const roleMap = this.rolePermissions.get(role)!;
    if (!roleMap.has(resource)) roleMap.set(resource, new Set());
    const permSet = roleMap.get(resource)!;
    for (const p of perms) permSet.add(p);
  }

  assignRole(user: string, role: string): void {
    if (!this.userRoles.has(user)) this.userRoles.set(user, new Set());
    this.userRoles.get(user)!.add(role);
  }

  removeRole(user: string, role: string): void {
    this.userRoles.get(user)?.delete(role);
  }

  private getEffectiveRoles(role: string, visited = new Set<string>()): Set<string> {
    if (visited.has(role)) return visited;
    visited.add(role);
    const parents = this.roleHierarchy.get(role);
    if (parents) {
      for (const parent of parents) {
        this.getEffectiveRoles(parent, visited);
      }
    }
    return visited;
  }

  check(user: string, resource: string, perm: Permission): boolean {
    const roles = this.userRoles.get(user);
    if (!roles) return false;

    for (const role of roles) {
      const effectiveRoles = this.getEffectiveRoles(role);
      for (const r of effectiveRoles) {
        const roleMap = this.rolePermissions.get(r);
        if (roleMap) {
          const perms = roleMap.get(resource);
          if (perms && perms.has(perm)) return true;
        }
      }
    }
    return false;
  }

  getUserRoles(user: string): string[] {
    return [...(this.userRoles.get(user) || [])];
  }

  getRolePermissions(role: string, resource: string): Permission[] {
    const roleMap = this.rolePermissions.get(role);
    if (!roleMap) return [];
    return [...(roleMap.get(resource) || [])];
  }
}
