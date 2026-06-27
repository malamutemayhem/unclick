export type FileType = "file" | "directory" | "symlink";

export interface Inode {
  id: number;
  type: FileType;
  size: number;
  data: string;
  links: number;
  permissions: number;
  created: number;
  modified: number;
  children?: Map<string, number>;
  target?: string;
}

export class InodeFS {
  private inodes = new Map<number, Inode>();
  private nextId = 0;
  private now: number;

  constructor() {
    this.now = Date.now();
    const rootId = this.allocInode("directory");
    const root = this.inodes.get(rootId)!;
    root.children = new Map();
    root.children.set(".", rootId);
    root.children.set("..", rootId);
  }

  private allocInode(type: FileType): number {
    const id = this.nextId++;
    this.inodes.set(id, {
      id,
      type,
      size: 0,
      data: "",
      links: 1,
      permissions: type === "directory" ? 0o755 : 0o644,
      created: this.now,
      modified: this.now,
    });
    return id;
  }

  private resolvePath(path: string): { parentId: number; name: string; inodeId: number | null } {
    const parts = path.split("/").filter((p) => p.length > 0);
    if (parts.length === 0) return { parentId: 0, name: "", inodeId: 0 };

    let currentId = 0;
    for (let i = 0; i < parts.length - 1; i++) {
      const inode = this.inodes.get(currentId);
      if (!inode || inode.type !== "directory" || !inode.children) return { parentId: currentId, name: parts[parts.length - 1], inodeId: null };
      const nextId = inode.children.get(parts[i]);
      if (nextId === undefined) return { parentId: currentId, name: parts[parts.length - 1], inodeId: null };
      currentId = nextId;
    }

    const parent = this.inodes.get(currentId);
    const name = parts[parts.length - 1];
    const childId = parent?.children?.get(name) ?? null;
    return { parentId: currentId, name, inodeId: childId };
  }

  createFile(path: string, data = ""): number | null {
    const { parentId, name, inodeId } = this.resolvePath(path);
    if (inodeId !== null) return null;
    const parent = this.inodes.get(parentId);
    if (!parent || parent.type !== "directory") return null;

    const id = this.allocInode("file");
    const inode = this.inodes.get(id)!;
    inode.data = data;
    inode.size = data.length;
    parent.children!.set(name, id);
    return id;
  }

  mkdir(path: string): number | null {
    const { parentId, name, inodeId } = this.resolvePath(path);
    if (inodeId !== null) return null;
    const parent = this.inodes.get(parentId);
    if (!parent || parent.type !== "directory") return null;

    const id = this.allocInode("directory");
    const inode = this.inodes.get(id)!;
    inode.children = new Map();
    inode.children.set(".", id);
    inode.children.set("..", parentId);
    parent.children!.set(name, id);
    return id;
  }

  read(path: string): string | null {
    const { inodeId } = this.resolvePath(path);
    if (inodeId === null) return null;
    const inode = this.inodes.get(inodeId);
    if (!inode || inode.type !== "file") return null;
    return inode.data;
  }

  write(path: string, data: string): boolean {
    const { inodeId } = this.resolvePath(path);
    if (inodeId === null) return false;
    const inode = this.inodes.get(inodeId);
    if (!inode || inode.type !== "file") return false;
    inode.data = data;
    inode.size = data.length;
    inode.modified = this.now;
    return true;
  }

  readdir(path: string): string[] | null {
    const { inodeId } = this.resolvePath(path);
    const id = path === "/" ? 0 : inodeId;
    if (id === null) return null;
    const inode = this.inodes.get(id);
    if (!inode || inode.type !== "directory" || !inode.children) return null;
    return [...inode.children.keys()].filter((k) => k !== "." && k !== "..");
  }

  unlink(path: string): boolean {
    const { parentId, name, inodeId } = this.resolvePath(path);
    if (inodeId === null) return false;
    const inode = this.inodes.get(inodeId);
    if (!inode || inode.type === "directory") return false;
    const parent = this.inodes.get(parentId);
    if (!parent) return false;
    parent.children!.delete(name);
    inode.links--;
    if (inode.links <= 0) this.inodes.delete(inodeId);
    return true;
  }

  stat(path: string): Omit<Inode, "data" | "children" | "target"> | null {
    const id = path === "/" ? 0 : this.resolvePath(path).inodeId;
    if (id === null) return null;
    const inode = this.inodes.get(id);
    if (!inode) return null;
    const { data, children, target, ...rest } = inode;
    return rest;
  }

  exists(path: string): boolean {
    if (path === "/") return true;
    return this.resolvePath(path).inodeId !== null;
  }

  get inodeCount(): number {
    return this.inodes.size;
  }
}
