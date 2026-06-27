interface TreeNode {
  attribute?: string;
  label?: string;
  children?: Map<string, TreeNode>;
}

export class DecisionTreeID3 {
  private root: TreeNode | null = null;
  private attributes: string[] = [];

  train(data: Record<string, string>[], targetAttr: string): void {
    this.attributes = Object.keys(data[0]).filter((k) => k !== targetAttr);
    this.root = this.buildTree(data, this.attributes, targetAttr);
  }

  private buildTree(
    data: Record<string, string>[],
    attrs: string[],
    target: string
  ): TreeNode {
    const labels = data.map((d) => d[target]);
    const unique = new Set(labels);

    if (unique.size === 1) return { label: labels[0] };
    if (attrs.length === 0) return { label: this.majorityLabel(labels) };

    const bestAttr = this.bestAttribute(data, attrs, target);
    const node: TreeNode = { attribute: bestAttr, children: new Map() };

    const values = new Set(data.map((d) => d[bestAttr]));
    const remaining = attrs.filter((a) => a !== bestAttr);

    for (const val of values) {
      const subset = data.filter((d) => d[bestAttr] === val);
      if (subset.length === 0) {
        node.children!.set(val, { label: this.majorityLabel(labels) });
      } else {
        node.children!.set(val, this.buildTree(subset, remaining, target));
      }
    }

    return node;
  }

  predict(instance: Record<string, string>): string | null {
    return this.traverse(this.root, instance);
  }

  private traverse(node: TreeNode | null, instance: Record<string, string>): string | null {
    if (!node) return null;
    if (node.label !== undefined) return node.label;
    const val = instance[node.attribute!];
    const child = node.children?.get(val);
    if (!child) return null;
    return this.traverse(child, instance);
  }

  private bestAttribute(
    data: Record<string, string>[],
    attrs: string[],
    target: string
  ): string {
    let bestGain = -Infinity;
    let bestAttr = attrs[0];
    const baseEntropy = this.entropy(data.map((d) => d[target]));

    for (const attr of attrs) {
      const gain = baseEntropy - this.conditionalEntropy(data, attr, target);
      if (gain > bestGain) { bestGain = gain; bestAttr = attr; }
    }

    return bestAttr;
  }

  private entropy(labels: string[]): number {
    const freq = new Map<string, number>();
    for (const l of labels) freq.set(l, (freq.get(l) || 0) + 1);
    let h = 0;
    for (const count of freq.values()) {
      const p = count / labels.length;
      if (p > 0) h -= p * Math.log2(p);
    }
    return h;
  }

  private conditionalEntropy(
    data: Record<string, string>[],
    attr: string,
    target: string
  ): number {
    const groups = new Map<string, string[]>();
    for (const d of data) {
      const val = d[attr];
      if (!groups.has(val)) groups.set(val, []);
      groups.get(val)!.push(d[target]);
    }
    let ce = 0;
    for (const labels of groups.values()) {
      ce += (labels.length / data.length) * this.entropy(labels);
    }
    return ce;
  }

  private majorityLabel(labels: string[]): string {
    const freq = new Map<string, number>();
    for (const l of labels) freq.set(l, (freq.get(l) || 0) + 1);
    let max = 0;
    let result = labels[0];
    for (const [label, count] of freq) {
      if (count > max) { max = count; result = label; }
    }
    return result;
  }

  static informationGain(labels: string[], groups: Map<string, string[]>): number {
    const baseEntropy = new DecisionTreeID3().entropy(labels);
    let condEntropy = 0;
    for (const sub of groups.values()) {
      condEntropy += (sub.length / labels.length) * new DecisionTreeID3().entropy(sub);
    }
    return baseEntropy - condEntropy;
  }
}
