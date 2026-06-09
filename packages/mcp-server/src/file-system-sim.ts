export interface FSNode {
  name: string;
  type: "file" | "directory";
  size: number;
  children: Map<string, FSNode>;
  content: string;
  createdAt: number;
  modifiedAt: number;
}

export class FileSystemSim {
  private root: FSNode;
  private now: number;

  constructor() {
    this.now = Date.now();
    this.root = this.createDir("/");
  }

  private createDir(name: string): FSNode {
    return {
      name,
      type: "directory",
      size: 0,
      children: new Map(),
      content: "",
      createdAt: this.now,
      modifiedAt: this.now,
    };
  }

  private resolvePath(path: string): string[] {
    return path.split("/").filter(p => p.length > 0);
  }

  private getNode(path: string): FSNode | null {
    const parts = this.resolvePath(path);
    let current = this.root;
    for (const part of parts) {
      if (current.type !== "directory") return null;
      const child = current.children.get(part);
      if (!child) return null;
      current = child;
    }
    return current;
  }

  private getParent(path: string): { parent: FSNode; name: string } | null {
    const parts = this.resolvePath(path);
    if (parts.length === 0) return null;
    const name = parts.pop()!;
    let current = this.root;
    for (const part of parts) {
      const child = current.children.get(part);
      if (!child || child.type !== "directory") return null;
      current = child;
    }
    return { parent: current, name };
  }

  mkdir(path: string): boolean {
    const result = this.getParent(path);
    if (!result) return false;
    if (result.parent.children.has(result.name)) return false;
    result.parent.children.set(result.name, this.createDir(result.name));
    return true;
  }

  writeFile(path: string, content: string): boolean {
    const result = this.getParent(path);
    if (!result) return false;
    const existing = result.parent.children.get(result.name);
    if (existing && existing.type === "directory") return false;

    const node: FSNode = {
      name: result.name,
      type: "file",
      size: content.length,
      children: new Map(),
      content,
      createdAt: existing ? existing.createdAt : this.now,
      modifiedAt: this.now,
    };
    result.parent.children.set(result.name, node);
    return true;
  }

  readFile(path: string): string | null {
    const node = this.getNode(path);
    if (!node || node.type !== "file") return null;
    return node.content;
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  isFile(path: string): boolean {
    const node = this.getNode(path);
    return node !== null && node.type === "file";
  }

  isDirectory(path: string): boolean {
    const node = this.getNode(path);
    return node !== null && node.type === "directory";
  }

  ls(path: string): string[] | null {
    const node = this.getNode(path);
    if (!node || node.type !== "directory") return null;
    return [...node.children.keys()].sort();
  }

  rm(path: string): boolean {
    const result = this.getParent(path);
    if (!result) return false;
    return result.parent.children.delete(result.name);
  }

  stat(path: string): { type: string; size: number; created: number; modified: number } | null {
    const node = this.getNode(path);
    if (!node) return null;
    return {
      type: node.type,
      size: node.size,
      created: node.createdAt,
      modified: node.modifiedAt,
    };
  }

  du(path: string): number {
    const node = this.getNode(path);
    if (!node) return 0;
    return this.computeSize(node);
  }

  private computeSize(node: FSNode): number {
    if (node.type === "file") return node.size;
    let total = 0;
    for (const child of node.children.values()) {
      total += this.computeSize(child);
    }
    return total;
  }

  tree(path: string, prefix = ""): string[] {
    const node = this.getNode(path);
    if (!node) return [];
    const lines: string[] = [];
    this.buildTree(node, prefix, lines);
    return lines;
  }

  private buildTree(node: FSNode, prefix: string, lines: string[]): void {
    lines.push(prefix + node.name);
    if (node.type === "directory") {
      const sorted = [...node.children.values()].sort((a, b) => a.name.localeCompare(b.name));
      for (const child of sorted) {
        this.buildTree(child, prefix + "  ", lines);
      }
    }
  }
}
