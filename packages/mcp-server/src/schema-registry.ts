export interface SchemaEntry {
  version: number;
  schema: Record<string, unknown>;
  createdAt: number;
}

export class SchemaRegistry {
  private schemas = new Map<string, SchemaEntry[]>();

  register(name: string, schema: Record<string, unknown>): number {
    if (!this.schemas.has(name)) {
      this.schemas.set(name, []);
    }
    const versions = this.schemas.get(name)!;
    const version = versions.length + 1;
    versions.push({ version, schema, createdAt: Date.now() });
    return version;
  }

  get(name: string, version?: number): SchemaEntry | undefined {
    const versions = this.schemas.get(name);
    if (!versions || versions.length === 0) return undefined;
    if (version !== undefined) {
      return versions.find((v) => v.version === version);
    }
    return versions[versions.length - 1];
  }

  getLatestVersion(name: string): number {
    const versions = this.schemas.get(name);
    return versions ? versions.length : 0;
  }

  listNames(): string[] {
    return [...this.schemas.keys()];
  }

  listVersions(name: string): number[] {
    const versions = this.schemas.get(name);
    return versions ? versions.map((v) => v.version) : [];
  }

  has(name: string, version?: number): boolean {
    if (version !== undefined) return this.get(name, version) !== undefined;
    return this.schemas.has(name);
  }

  get size(): number {
    return this.schemas.size;
  }
}
