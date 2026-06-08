export interface Package {
  name: string;
  version: string;
  dependencies: Record<string, string>;
}

export interface ResolvedPackage {
  name: string;
  version: string;
  depth: number;
}

export class DependencyResolver {
  private packages = new Map<string, Package>();
  private resolved: ResolvedPackage[] = [];
  private conflicts: Array<{ package: string; required: string; available: string }> = [];

  register(pkg: Package): void {
    this.packages.set(`${pkg.name}@${pkg.version}`, pkg);
    const existing = this.packages.get(pkg.name);
    if (!existing) {
      this.packages.set(pkg.name, pkg);
    }
  }

  resolve(rootName: string): ResolvedPackage[] {
    this.resolved = [];
    this.conflicts = [];
    const visited = new Set<string>();
    this.visit(rootName, 0, visited, []);
    return [...this.resolved];
  }

  private visit(name: string, depth: number, visited: Set<string>, path: string[]): boolean {
    if (path.includes(name)) {
      return false;
    }
    if (visited.has(name)) return true;

    const pkg = this.packages.get(name);
    if (!pkg) return false;

    visited.add(name);
    const newPath = [...path, name];

    for (const [depName, requiredVersion] of Object.entries(pkg.dependencies)) {
      const depPkg = this.packages.get(depName);
      if (!depPkg) {
        this.conflicts.push({ package: depName, required: requiredVersion, available: "none" });
        continue;
      }
      if (!this.versionSatisfies(depPkg.version, requiredVersion)) {
        this.conflicts.push({ package: depName, required: requiredVersion, available: depPkg.version });
      }
      this.visit(depName, depth + 1, visited, newPath);
    }

    this.resolved.push({ name: pkg.name, version: pkg.version, depth });
    return true;
  }

  private versionSatisfies(actual: string, required: string): boolean {
    if (required === "*" || required === "latest") return true;
    if (required.startsWith("^")) {
      const reqParts = this.parseVersion(required.slice(1));
      const actParts = this.parseVersion(actual);
      if (!reqParts || !actParts) return false;
      return actParts[0] === reqParts[0] && (actParts[1] > reqParts[1] || (actParts[1] === reqParts[1] && actParts[2] >= reqParts[2]));
    }
    if (required.startsWith("~")) {
      const reqParts = this.parseVersion(required.slice(1));
      const actParts = this.parseVersion(actual);
      if (!reqParts || !actParts) return false;
      return actParts[0] === reqParts[0] && actParts[1] === reqParts[1] && actParts[2] >= reqParts[2];
    }
    if (required.startsWith(">=")) {
      return this.compareVersions(actual, required.slice(2)) >= 0;
    }
    return actual === required;
  }

  private parseVersion(v: string): [number, number, number] | null {
    const parts = v.split(".").map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return null;
    return [parts[0], parts[1], parts[2]];
  }

  private compareVersions(a: string, b: string): number {
    const pa = this.parseVersion(a);
    const pb = this.parseVersion(b);
    if (!pa || !pb) return 0;
    for (let i = 0; i < 3; i++) {
      if (pa[i] > pb[i]) return 1;
      if (pa[i] < pb[i]) return -1;
    }
    return 0;
  }

  getConflicts(): Array<{ package: string; required: string; available: string }> {
    return [...this.conflicts];
  }

  getInstallOrder(): string[] {
    return this.resolved.map((r) => r.name);
  }

  getDependencyTree(rootName: string): Record<string, string[]> {
    const tree: Record<string, string[]> = {};
    const pkg = this.packages.get(rootName);
    if (!pkg) return tree;
    tree[rootName] = Object.keys(pkg.dependencies);
    for (const depName of Object.keys(pkg.dependencies)) {
      const sub = this.getDependencyTree(depName);
      Object.assign(tree, sub);
    }
    return tree;
  }

  packageCount(): number {
    return new Set([...this.packages.values()].map((p) => p.name)).size;
  }
}
