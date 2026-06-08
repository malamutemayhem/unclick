export class PermissionFlags {
  private value: number;

  constructor(value = 0) {
    this.value = value;
  }

  has(flag: number): boolean {
    return (this.value & flag) === flag;
  }

  add(flag: number): PermissionFlags {
    return new PermissionFlags(this.value | flag);
  }

  remove(flag: number): PermissionFlags {
    return new PermissionFlags(this.value & ~flag);
  }

  toggle(flag: number): PermissionFlags {
    return new PermissionFlags(this.value ^ flag);
  }

  combine(other: PermissionFlags): PermissionFlags {
    return new PermissionFlags(this.value | other.value);
  }

  intersect(other: PermissionFlags): PermissionFlags {
    return new PermissionFlags(this.value & other.value);
  }

  toNumber(): number {
    return this.value;
  }

  toArray(flagMap: Record<string, number>): string[] {
    return Object.entries(flagMap)
      .filter(([, flag]) => this.has(flag))
      .map(([name]) => name);
  }

  static from(flags: number[]): PermissionFlags {
    return new PermissionFlags(flags.reduce((acc, f) => acc | f, 0));
  }

  static fromNames(names: string[], flagMap: Record<string, number>): PermissionFlags {
    const value = names.reduce((acc, name) => {
      const flag = flagMap[name];
      return flag !== undefined ? acc | flag : acc;
    }, 0);
    return new PermissionFlags(value);
  }
}
