export interface VNode {
  tag: string;
  props: Record<string, string>;
  children: (VNode | string)[];
}

export interface Patch {
  type: "CREATE" | "REMOVE" | "REPLACE" | "UPDATE_PROPS" | "UPDATE_TEXT" | "REORDER";
  path: number[];
  node?: VNode | string;
  props?: { set: Record<string, string>; remove: string[] };
  oldText?: string;
  newText?: string;
}

export function h(
  tag: string,
  props: Record<string, string> | null,
  ...children: (VNode | string)[]
): VNode {
  return { tag, props: props || {}, children };
}

export function render(node: VNode | string): string {
  if (typeof node === "string") return escapeHtml(node);
  const attrs = Object.entries(node.props)
    .map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
    .join("");
  const voidTags = new Set([
    "br", "hr", "img", "input", "meta", "link", "area", "base", "col", "embed",
  ]);
  if (voidTags.has(node.tag)) return `<${node.tag}${attrs} />`;
  const inner = node.children.map(render).join("");
  return `<${node.tag}${attrs}>${inner}</${node.tag}>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function diff(oldTree: VNode | string, newTree: VNode | string, path: number[] = []): Patch[] {
  const patches: Patch[] = [];

  if (typeof oldTree === "string" && typeof newTree === "string") {
    if (oldTree !== newTree) {
      patches.push({ type: "UPDATE_TEXT", path, oldText: oldTree, newText: newTree });
    }
    return patches;
  }

  if (typeof oldTree === "string" || typeof newTree === "string") {
    patches.push({ type: "REPLACE", path, node: newTree });
    return patches;
  }

  if (oldTree.tag !== newTree.tag) {
    patches.push({ type: "REPLACE", path, node: newTree });
    return patches;
  }

  const propPatch = diffProps(oldTree.props, newTree.props);
  if (propPatch.set && (Object.keys(propPatch.set).length > 0 || propPatch.remove.length > 0)) {
    patches.push({ type: "UPDATE_PROPS", path, props: propPatch });
  }

  const maxLen = Math.max(oldTree.children.length, newTree.children.length);
  for (let i = 0; i < maxLen; i++) {
    const childPath = [...path, i];
    if (i >= oldTree.children.length) {
      patches.push({ type: "CREATE", path: childPath, node: newTree.children[i] });
    } else if (i >= newTree.children.length) {
      patches.push({ type: "REMOVE", path: childPath });
    } else {
      patches.push(...diff(oldTree.children[i], newTree.children[i], childPath));
    }
  }

  return patches;
}

function diffProps(
  oldProps: Record<string, string>,
  newProps: Record<string, string>
): { set: Record<string, string>; remove: string[] } {
  const set: Record<string, string> = {};
  const remove: string[] = [];
  for (const key of Object.keys(newProps)) {
    if (newProps[key] !== oldProps[key]) set[key] = newProps[key];
  }
  for (const key of Object.keys(oldProps)) {
    if (!(key in newProps)) remove.push(key);
  }
  return { set, remove };
}

export function patch(tree: VNode | string, patches: Patch[]): VNode | string {
  let result = clone(tree);
  const sorted = [...patches].sort((a, b) => {
    if (a.path.length !== b.path.length) return a.path.length - b.path.length;
    for (let i = 0; i < a.path.length; i++) {
      if (a.path[i] !== b.path[i]) return a.path[i] - b.path[i];
    }
    return 0;
  });
  for (const p of sorted) {
    result = applyPatch(result, p, 0);
  }
  return result;
}

function clone(node: VNode | string): VNode | string {
  if (typeof node === "string") return node;
  return { tag: node.tag, props: { ...node.props }, children: node.children.map(clone) };
}

function applyPatch(node: VNode | string, p: Patch, depth: number): VNode | string {
  if (depth === p.path.length) {
    switch (p.type) {
      case "REPLACE":
      case "CREATE":
        return clone(p.node!);
      case "UPDATE_TEXT":
        return p.newText!;
      case "UPDATE_PROPS":
        if (typeof node === "string") return node;
        const updated = { ...node, props: { ...node.props } };
        for (const [k, v] of Object.entries(p.props!.set)) updated.props[k] = v;
        for (const k of p.props!.remove) delete updated.props[k];
        return updated;
      default:
        return node;
    }
  }
  if (typeof node === "string") return node;
  const idx = p.path[depth];
  const newChildren = [...node.children];
  if (p.type === "REMOVE" && depth === p.path.length - 1) {
    newChildren.splice(idx, 1);
    return { ...node, children: newChildren };
  }
  if (p.type === "CREATE" && depth === p.path.length - 1) {
    newChildren.splice(idx, 0, clone(p.node!));
    return { ...node, children: newChildren };
  }
  if (idx < newChildren.length) {
    newChildren[idx] = applyPatch(newChildren[idx], p, depth + 1);
  }
  return { ...node, children: newChildren };
}

export function flatten(node: VNode | string): (VNode | string)[] {
  if (typeof node === "string") return [node];
  const result: (VNode | string)[] = [node];
  for (const child of node.children) {
    result.push(...flatten(child));
  }
  return result;
}

export function querySelector(node: VNode, selector: string): VNode | null {
  if (matches(node, selector)) return node;
  for (const child of node.children) {
    if (typeof child === "string") continue;
    const found = querySelector(child, selector);
    if (found) return found;
  }
  return null;
}

export function querySelectorAll(node: VNode, selector: string): VNode[] {
  const results: VNode[] = [];
  if (matches(node, selector)) results.push(node);
  for (const child of node.children) {
    if (typeof child === "string") continue;
    results.push(...querySelectorAll(child, selector));
  }
  return results;
}

function matches(node: VNode, selector: string): boolean {
  if (selector.startsWith(".")) {
    const cls = selector.slice(1);
    const classes = (node.props["class"] || "").split(/\s+/);
    return classes.includes(cls);
  }
  if (selector.startsWith("#")) {
    return node.props["id"] === selector.slice(1);
  }
  return node.tag === selector;
}
