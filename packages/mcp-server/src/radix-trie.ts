interface RadixNode<T> {
  key: string;
  value: T | undefined;
  children: RadixNode<T>[];
  isEnd: boolean;
}

export class RadixTrie<T> {
  private root: RadixNode<T>;
  private _size: number = 0;

  constructor() {
    this.root = { key: "", value: undefined, children: [], isEnd: false };
  }

  insert(key: string, value: T): void {
    this._insert(this.root, key, value);
  }

  private _insert(node: RadixNode<T>, remaining: string, value: T): void {
    if (remaining.length === 0) {
      if (!node.isEnd) this._size++;
      node.isEnd = true;
      node.value = value;
      return;
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const commonLen = this.commonPrefix(child.key, remaining);

      if (commonLen === 0) continue;

      if (commonLen === child.key.length && commonLen === remaining.length) {
        if (!child.isEnd) this._size++;
        child.isEnd = true;
        child.value = value;
        return;
      }

      if (commonLen === child.key.length) {
        this._insert(child, remaining.slice(commonLen), value);
        return;
      }

      const splitNode: RadixNode<T> = {
        key: child.key.slice(0, commonLen),
        value: undefined,
        children: [],
        isEnd: false,
      };
      child.key = child.key.slice(commonLen);
      splitNode.children.push(child);
      node.children[i] = splitNode;

      if (commonLen === remaining.length) {
        splitNode.isEnd = true;
        splitNode.value = value;
        this._size++;
      } else {
        const newChild: RadixNode<T> = {
          key: remaining.slice(commonLen),
          value,
          children: [],
          isEnd: true,
        };
        splitNode.children.push(newChild);
        this._size++;
      }
      return;
    }

    node.children.push({
      key: remaining, value, children: [], isEnd: true,
    });
    this._size++;
  }

  private commonPrefix(a: string, b: string): number {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }

  get(key: string): T | undefined {
    const node = this.findNode(this.root, key);
    return node?.isEnd ? node.value : undefined;
  }

  has(key: string): boolean {
    const node = this.findNode(this.root, key);
    return node?.isEnd === true;
  }

  private findNode(node: RadixNode<T>, remaining: string): RadixNode<T> | null {
    if (remaining.length === 0) return node;
    for (const child of node.children) {
      const commonLen = this.commonPrefix(child.key, remaining);
      if (commonLen === 0) continue;
      if (commonLen === child.key.length) {
        return this.findNode(child, remaining.slice(commonLen));
      }
      return null;
    }
    return null;
  }

  keysWithPrefix(prefix: string): string[] {
    const results: string[] = [];
    this.findAndCollectPrefix(this.root, prefix, "", results);
    return results;
  }

  private findAndCollectPrefix(node: RadixNode<T>, remaining: string, accumulated: string, results: string[]): void {
    if (remaining.length === 0) {
      this.collectKeys(node, accumulated, results);
      return;
    }
    for (const child of node.children) {
      const commonLen = this.commonPrefix(child.key, remaining);
      if (commonLen === 0) continue;
      if (commonLen >= remaining.length) {
        this.collectKeys(child, accumulated + child.key, results);
        return;
      }
      if (commonLen === child.key.length) {
        this.findAndCollectPrefix(child, remaining.slice(commonLen), accumulated + child.key, results);
        return;
      }
      return;
    }
  }

  private collectKeys(node: RadixNode<T>, prefix: string, results: string[]): void {
    if (node.isEnd) results.push(prefix);
    for (const child of node.children) {
      this.collectKeys(child, prefix + child.key, results);
    }
  }

  size(): number {
    return this._size;
  }

  keys(): string[] {
    const results: string[] = [];
    this.collectKeys(this.root, "", results);
    return results;
  }
}
