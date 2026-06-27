interface RadixNode<V> {
  key: string;
  value: V | undefined;
  children: RadixNode<V>[];
  isEnd: boolean;
}

function createNode<V>(key: string, value?: V): RadixNode<V> {
  return { key, value, children: [], isEnd: value !== undefined };
}

function commonPrefixLength(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

export class RadixTree<V = boolean> {
  private root: RadixNode<V> = createNode("");
  private count = 0;

  get size(): number { return this.count; }

  insert(key: string, value: V = true as unknown as V): void {
    this.insertNode(this.root, key, value);
  }

  private insertNode(node: RadixNode<V>, key: string, value: V): void {
    if (key === "") {
      if (!node.isEnd) this.count++;
      node.value = value;
      node.isEnd = true;
      return;
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const prefixLen = commonPrefixLength(child.key, key);

      if (prefixLen === 0) continue;

      if (prefixLen === child.key.length && prefixLen === key.length) {
        if (!child.isEnd) this.count++;
        child.value = value;
        child.isEnd = true;
        return;
      }

      if (prefixLen === child.key.length) {
        this.insertNode(child, key.slice(prefixLen), value);
        return;
      }

      const splitNode = createNode<V>(child.key.slice(0, prefixLen));
      const remainder = createNode<V>(child.key.slice(prefixLen), child.value);
      remainder.children = child.children;
      remainder.isEnd = child.isEnd;

      child.key = splitNode.key;
      child.value = undefined;
      child.isEnd = false;
      child.children = [remainder];

      if (prefixLen === key.length) {
        if (!child.isEnd) this.count++;
        child.value = value;
        child.isEnd = true;
      } else {
        child.children.push(createNode<V>(key.slice(prefixLen), value));
        this.count++;
      }
      return;
    }

    node.children.push(createNode<V>(key, value));
    this.count++;
  }

  get(key: string): V | undefined {
    const node = this.findNode(this.root, key);
    return node?.isEnd ? node.value : undefined;
  }

  has(key: string): boolean {
    const node = this.findNode(this.root, key);
    return node?.isEnd === true;
  }

  private findNode(node: RadixNode<V>, key: string): RadixNode<V> | undefined {
    if (key === "") return node;

    for (const child of node.children) {
      const prefixLen = commonPrefixLength(child.key, key);
      if (prefixLen === 0) continue;
      if (prefixLen === child.key.length) {
        return this.findNode(child, key.slice(prefixLen));
      }
      return undefined;
    }
    return undefined;
  }

  delete(key: string): boolean {
    const result = this.deleteNode(this.root, key);
    if (result) this.count--;
    return result;
  }

  private deleteNode(node: RadixNode<V>, key: string): boolean {
    if (key === "") {
      if (!node.isEnd) return false;
      node.isEnd = false;
      node.value = undefined;
      return true;
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const prefixLen = commonPrefixLength(child.key, key);
      if (prefixLen === child.key.length) {
        const deleted = this.deleteNode(child, key.slice(prefixLen));
        if (deleted && !child.isEnd && child.children.length === 0) {
          node.children.splice(i, 1);
        } else if (deleted && !child.isEnd && child.children.length === 1) {
          const only = child.children[0];
          child.key = child.key + only.key;
          child.value = only.value;
          child.isEnd = only.isEnd;
          child.children = only.children;
        }
        return deleted;
      }
    }
    return false;
  }

  keysWithPrefix(prefix: string): string[] {
    const results: string[] = [];
    const found = this.findPrefixNode(this.root, prefix, "");
    if (found) this.collectKeys(found.node, found.accum, results);
    return results;
  }

  private findPrefixNode(node: RadixNode<V>, prefix: string, accum: string): { node: RadixNode<V>; accum: string } | undefined {
    if (prefix === "") return { node, accum };

    for (const child of node.children) {
      const prefixLen = commonPrefixLength(child.key, prefix);
      if (prefixLen === 0) continue;
      if (prefixLen === prefix.length) return { node: child, accum: accum + child.key };
      if (prefixLen === child.key.length) {
        return this.findPrefixNode(child, prefix.slice(prefixLen), accum + child.key);
      }
      return undefined;
    }
    return undefined;
  }

  private collectKeys(node: RadixNode<V>, prefix: string, results: string[]): void {
    if (node.isEnd) results.push(prefix);
    for (const child of node.children) {
      this.collectKeys(child, prefix + child.key, results);
    }
  }

  keys(): string[] {
    const results: string[] = [];
    this.collectKeys(this.root, "", results);
    return results;
  }

  clear(): void {
    this.root = createNode("");
    this.count = 0;
  }
}
