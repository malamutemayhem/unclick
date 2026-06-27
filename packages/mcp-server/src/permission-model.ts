export type Action = "create" | "read" | "update" | "delete" | "execute" | "admin";

export interface Role {
  name: string;
  permissions: Set<string>;
  inherits: string[];
}

export interface Policy {
  id: string;
  effect: "allow" | "deny";
  actions: Action[];
  resource: string;
  condition?: (context: Record<string, unknown>) => boolean;
}

export class RBAC {
  private roles = new Map<string, Role>();
  private userRoles = new Map<string, Set<string>>();
  private policies: Policy[] = [];
  private nextPolicyId = 1;

  addRole(name: string, permissions: string[] = [], inherits: string[] = []): void {
    this.roles.set(name, { name, permissions: new Set(permissions), inherits });
  }

  assignRole(userId: string, roleName: string): boolean {
    if (!this.roles.has(roleName)) return false;
    const roles = this.userRoles.get(userId) ?? new Set();
    roles.add(roleName);
    this.userRoles.set(userId, roles);
    return true;
  }

  revokeRole(userId: string, roleName: string): boolean {
    const roles = this.userRoles.get(userId);
    if (!roles) return false;
    return roles.delete(roleName);
  }

  addPolicy(effect: "allow" | "deny", actions: Action[], resource: string, condition?: (ctx: Record<string, unknown>) => boolean): string {
    const id = `policy_${this.nextPolicyId++}`;
    this.policies.push({ id, effect, actions, resource, condition });
    return id;
  }

  resolvePermissions(roleName: string, visited = new Set<string>()): Set<string> {
    if (visited.has(roleName)) return new Set();
    visited.add(roleName);
    const role = this.roles.get(roleName);
    if (!role) return new Set();
    const perms = new Set(role.permissions);
    for (const parent of role.inherits) {
      for (const p of this.resolvePermissions(parent, visited)) {
        perms.add(p);
      }
    }
    return perms;
  }

  userPermissions(userId: string): Set<string> {
    const roles = this.userRoles.get(userId);
    if (!roles) return new Set();
    const perms = new Set<string>();
    for (const roleName of roles) {
      for (const p of this.resolvePermissions(roleName)) {
        perms.add(p);
      }
    }
    return perms;
  }

  check(userId: string, action: Action, resource: string, context: Record<string, unknown> = {}): boolean {
    let allowed = false;
    for (const policy of this.policies) {
      if (!policy.actions.includes(action)) continue;
      if (!this.matchResource(policy.resource, resource)) continue;
      if (policy.condition && !policy.condition(context)) continue;
      if (policy.effect === "deny") return false;
      allowed = true;
    }

    if (allowed) return true;

    const perms = this.userPermissions(userId);
    const permStr = `${resource}:${action}`;
    return perms.has(permStr) || perms.has(`${resource}:*`) || perms.has("*:*");
  }

  private matchResource(pattern: string, resource: string): boolean {
    if (pattern === "*") return true;
    if (pattern === resource) return true;
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1);
      return resource.startsWith(prefix);
    }
    return false;
  }

  getUserRoles(userId: string): string[] {
    const roles = this.userRoles.get(userId);
    return roles ? [...roles].sort() : [];
  }

  roleCount(): number {
    return this.roles.size;
  }

  policyCount(): number {
    return this.policies.length;
  }
}
