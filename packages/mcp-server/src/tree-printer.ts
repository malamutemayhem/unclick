export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

export class TreePrinter {
  static render(node: TreeNode, prefix: string = "", isLast: boolean = true, isRoot: boolean = true): string {
    const lines: string[] = [];
    const connector = isRoot ? "" : isLast ? "└── " : "├── ";
    const childPrefix = isRoot ? "" : isLast ? "    " : "│   ";

    lines.push(prefix + connector + node.label);

    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const last = i === children.length - 1;
      lines.push(TreePrinter.render(child, prefix + childPrefix, last, false));
    }

    return lines.join("\n");
  }

  static fromPaths(paths: string[], separator: string = "/"): TreeNode {
    const root: TreeNode = { label: ".", children: [] };

    for (const path of paths) {
      const parts = path.split(separator).filter((p) => p.length > 0);
      let current = root;
      for (const part of parts) {
        let child = (current.children || []).find((c) => c.label === part);
        if (!child) {
          child = { label: part, children: [] };
          if (!current.children) current.children = [];
          current.children.push(child);
        }
        current = child;
      }
    }

    return root;
  }

  static fromObject(obj: Record<string, unknown>, label: string = "root"): TreeNode {
    const children: TreeNode[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        children.push(TreePrinter.fromObject(value as Record<string, unknown>, key));
      } else if (Array.isArray(value)) {
        children.push({
          label: `${key} [${value.length}]`,
          children: value.map((v, i) => ({
            label: typeof v === "object" ? `[${i}]` : `[${i}]: ${v}`,
            children: typeof v === "object" && v !== null
              ? TreePrinter.fromObject(v as Record<string, unknown>, `[${i}]`).children
              : undefined,
          })),
        });
      } else {
        children.push({ label: `${key}: ${value}` });
      }
    }
    return { label, children };
  }

  static depth(node: TreeNode): number {
    if (!node.children || node.children.length === 0) return 0;
    return 1 + Math.max(...node.children.map((c) => TreePrinter.depth(c)));
  }

  static nodeCount(node: TreeNode): number {
    let count = 1;
    for (const child of node.children || []) {
      count += TreePrinter.nodeCount(child);
    }
    return count;
  }

  static leafCount(node: TreeNode): number {
    if (!node.children || node.children.length === 0) return 1;
    return node.children.reduce((sum, c) => sum + TreePrinter.leafCount(c), 0);
  }

  static find(node: TreeNode, predicate: (n: TreeNode) => boolean): TreeNode | null {
    if (predicate(node)) return node;
    for (const child of node.children || []) {
      const found = TreePrinter.find(child, predicate);
      if (found) return found;
    }
    return null;
  }
}
