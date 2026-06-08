export interface XmlNode {
  tag: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text?: string;
}

export class XPathEvaluator {
  static selectByTag(root: XmlNode, tagName: string): XmlNode[] {
    const results: XmlNode[] = [];
    const traverse = (node: XmlNode) => {
      if (node.tag === tagName) results.push(node);
      for (const child of node.children) {
        traverse(child);
      }
    };
    traverse(root);
    return results;
  }

  static selectByAttribute(root: XmlNode, attrName: string, attrValue?: string): XmlNode[] {
    const results: XmlNode[] = [];
    const traverse = (node: XmlNode) => {
      if (attrName in node.attributes) {
        if (attrValue === undefined || node.attributes[attrName] === attrValue) {
          results.push(node);
        }
      }
      for (const child of node.children) {
        traverse(child);
      }
    };
    traverse(root);
    return results;
  }

  static selectByPath(root: XmlNode, path: string): XmlNode[] {
    const parts = path.split("/").filter((p) => p.length > 0);
    let current: XmlNode[] = [root];

    for (const part of parts) {
      if (part === "*") {
        current = current.flatMap((n) => n.children);
      } else if (part.startsWith("@")) {
        return current.filter((n) => part.slice(1) in n.attributes);
      } else {
        current = current.flatMap((n) => n.children.filter((c) => c.tag === part));
      }
    }

    return current;
  }

  static getText(node: XmlNode): string {
    if (node.text) return node.text;
    return node.children.map((c) => XPathEvaluator.getText(c)).join("");
  }

  static count(root: XmlNode, tagName: string): number {
    return XPathEvaluator.selectByTag(root, tagName).length;
  }

  static first(root: XmlNode, tagName: string): XmlNode | null {
    const results = XPathEvaluator.selectByTag(root, tagName);
    return results[0] ?? null;
  }

  static parent(root: XmlNode, target: XmlNode): XmlNode | null {
    const findParent = (node: XmlNode): XmlNode | null => {
      for (const child of node.children) {
        if (child === target) return node;
        const found = findParent(child);
        if (found) return found;
      }
      return null;
    };
    return findParent(root);
  }

  static depth(root: XmlNode): number {
    if (root.children.length === 0) return 0;
    return 1 + Math.max(...root.children.map((c) => XPathEvaluator.depth(c)));
  }

  static nodeCount(root: XmlNode): number {
    let count = 1;
    for (const child of root.children) {
      count += XPathEvaluator.nodeCount(child);
    }
    return count;
  }

  static allTags(root: XmlNode): string[] {
    const tags = new Set<string>();
    const traverse = (node: XmlNode) => {
      tags.add(node.tag);
      for (const child of node.children) traverse(child);
    };
    traverse(root);
    return Array.from(tags);
  }
}
