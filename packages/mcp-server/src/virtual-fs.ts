export type FileType = "file" | "directory";

export interface FSNode {
  name: string;
  type: FileType;
  content?: string;
  children?: Map<string, FSNode>;
  created: number;
  modified: number;
  size: number;
}

export class VirtualFS {
  private root: FSNode;
  private time = 0;

  constructor() {
    this.root = this.createDir("/");
  }

  private now(): number {
    return this.time++;
  }

  private createDir(name: string): FSNode {
    return { name, type: "directory", children: new Map(), created: this.now(), modified: this.now(), size: 0 };
  }

  private createFile(name: string, content: string): FSNode {
    return { name, type: "file", content, created: this.now(), modified: this.now(), size: content.length };
  }

  private resolve(path: string): { parent: FSNode; name: string } | null {
    const parts = this.parsePath(path);
    if (parts.length === 0) return null;
    const name = parts.pop()!;
    let node = this.root;
    for (const part of parts) {
      const child = node.children?.get(part);
      if (!child || child.type !== "directory") return null;
      node = child;
    }
    return { parent: node, name };
  }

  private getNode(path: string): FSNode | null {
    if (path === "/") return this.root;
    const r = this.resolve(path);
    if (!r) return null;
    return r.parent.children?.get(r.name) ?? null;
  }

  private parsePath(path: string): string[] {
    return path.split("/").filter((p) => p.length > 0);
  }

  writeFile(path: string, content: string): boolean {
    const r = this.resolve(path);
    if (!r) return false;
    const existing = r.parent.children!.get(r.name);
    if (existing && existing.type === "directory") return false;
    if (existing) {
      existing.content = content;
      existing.modified = this.now();
      existing.size = content.length;
    } else {
      r.parent.children!.set(r.name, this.createFile(r.name, content));
    }
    return true;
  }

  readFile(path: string): string | null {
    const node = this.getNode(path);
    if (!node || node.type !== "file") return null;
    return node.content ?? "";
  }

  mkdir(path: string): boolean {
    const r = this.resolve(path);
    if (!r) return false;
    if (r.parent.children!.has(r.name)) return false;
    r.parent.children!.set(r.name, this.createDir(r.name));
    return true;
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  isFile(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === "file";
  }

  isDirectory(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === "directory";
  }

  ls(path: string): string[] {
    const node = this.getNode(path);
    if (!node || node.type !== "directory") return [];
    return [...node.children!.keys()].sort();
  }

  rm(path: string): boolean {
    const r = this.resolve(path);
    if (!r) return false;
    if (!r.parent.children!.has(r.name)) return false;
    r.parent.children!.delete(r.name);
    return true;
  }

  stat(path: string): { type: FileType; size: number; created: number; modified: number } | null {
    const node = this.getNode(path);
    if (!node) return null;
    return { type: node.type, size: node.size, created: node.created, modified: node.modified };
  }

  rename(oldPath: string, newPath: string): boolean {
    const oldR = this.resolve(oldPath);
    if (!oldR) return false;
    const node = oldR.parent.children!.get(oldR.name);
    if (!node) return false;
    const newR = this.resolve(newPath);
    if (!newR) return false;
    if (newR.parent.children!.has(newR.name)) return false;
    oldR.parent.children!.delete(oldR.name);
    node.name = newR.name;
    newR.parent.children!.set(newR.name, node);
    return true;
  }

  totalSize(): number {
    let total = 0;
    const walk = (node: FSNode) => {
      if (node.type === "file") total += node.size;
      if (node.children) {
        for (const child of node.children.values()) walk(child);
      }
    };
    walk(this.root);
    return total;
  }

  fileCount(): number {
    let count = 0;
    const walk = (node: FSNode) => {
      if (node.type === "file") count++;
      if (node.children) {
        for (const child of node.children.values()) walk(child);
      }
    };
    walk(this.root);
    return count;
  }
}
