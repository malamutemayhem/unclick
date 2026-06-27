export class Permissions {
  private flags: number;

  constructor(flags: number = 0) {
    this.flags = flags;
  }

  has(permission: number): boolean {
    return (this.flags & permission) === permission;
  }

  hasAny(...permissions: number[]): boolean {
    for (const p of permissions) {
      if (this.has(p)) return true;
    }
    return false;
  }

  hasAll(...permissions: number[]): boolean {
    for (const p of permissions) {
      if (!this.has(p)) return false;
    }
    return true;
  }

  grant(...permissions: number[]): this {
    for (const p of permissions) this.flags |= p;
    return this;
  }

  revoke(...permissions: number[]): this {
    for (const p of permissions) this.flags &= ~p;
    return this;
  }

  toggle(permission: number): this {
    this.flags ^= permission;
    return this;
  }

  get value(): number {
    return this.flags;
  }

  toArray(knownFlags: Record<string, number>): string[] {
    const result: string[] = [];
    for (const [name, flag] of Object.entries(knownFlags)) {
      if (this.has(flag)) result.push(name);
    }
    return result;
  }

  equals(other: Permissions): boolean {
    return this.flags === other.flags;
  }

  clone(): Permissions {
    return new Permissions(this.flags);
  }

  static combine(...permissions: Permissions[]): Permissions {
    let flags = 0;
    for (const p of permissions) flags |= p.flags;
    return new Permissions(flags);
  }

  static fromArray(flags: number[]): Permissions {
    let value = 0;
    for (const f of flags) value |= f;
    return new Permissions(value);
  }
}

export function definePermissions<T extends Record<string, number>>(defs: T): T {
  return Object.freeze({ ...defs });
}
