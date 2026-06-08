export type ASTNode =
  | { type: "program"; body: ASTNode[] }
  | { type: "number"; value: number }
  | { type: "string"; value: string }
  | { type: "identifier"; name: string }
  | { type: "binary"; op: string; left: ASTNode; right: ASTNode }
  | { type: "unary"; op: string; operand: ASTNode }
  | { type: "call"; callee: ASTNode; args: ASTNode[] }
  | { type: "assign"; target: string; value: ASTNode }
  | { type: "if"; condition: ASTNode; then: ASTNode; else?: ASTNode }
  | { type: "block"; body: ASTNode[] };

export type Visitor = {
  [K in ASTNode["type"]]?: (node: Extract<ASTNode, { type: K }>) => ASTNode | void;
};

export class ASTVisitor {
  static visit(node: ASTNode, visitor: Visitor): ASTNode {
    const handler = visitor[node.type] as ((node: ASTNode) => ASTNode | void) | undefined;
    const result = handler ? handler(node) : undefined;
    const current = result ?? node;
    return this.visitChildren(current, visitor);
  }

  private static visitChildren(node: ASTNode, visitor: Visitor): ASTNode {
    switch (node.type) {
      case "program":
        return { ...node, body: node.body.map((n) => this.visit(n, visitor)) };
      case "binary":
        return { ...node, left: this.visit(node.left, visitor), right: this.visit(node.right, visitor) };
      case "unary":
        return { ...node, operand: this.visit(node.operand, visitor) };
      case "call":
        return { ...node, callee: this.visit(node.callee, visitor), args: node.args.map((a) => this.visit(a, visitor)) };
      case "assign":
        return { ...node, value: this.visit(node.value, visitor) };
      case "if": {
        const elseNode = node.else ? this.visit(node.else, visitor) : undefined;
        return { ...node, condition: this.visit(node.condition, visitor), then: this.visit(node.then, visitor), else: elseNode };
      }
      case "block":
        return { ...node, body: node.body.map((n) => this.visit(n, visitor)) };
      default:
        return node;
    }
  }

  static collect<T>(node: ASTNode, predicate: (node: ASTNode) => T | null): T[] {
    const results: T[] = [];
    this.walk(node, (n) => {
      const result = predicate(n);
      if (result !== null) results.push(result);
    });
    return results;
  }

  static walk(node: ASTNode, callback: (node: ASTNode) => void): void {
    callback(node);
    switch (node.type) {
      case "program":
      case "block":
        node.body.forEach((n) => this.walk(n, callback));
        break;
      case "binary":
        this.walk(node.left, callback);
        this.walk(node.right, callback);
        break;
      case "unary":
        this.walk(node.operand, callback);
        break;
      case "call":
        this.walk(node.callee, callback);
        node.args.forEach((a) => this.walk(a, callback));
        break;
      case "assign":
        this.walk(node.value, callback);
        break;
      case "if":
        this.walk(node.condition, callback);
        this.walk(node.then, callback);
        if (node.else) this.walk(node.else, callback);
        break;
    }
  }

  static nodeCount(node: ASTNode): number {
    let count = 0;
    this.walk(node, () => count++);
    return count;
  }

  static identifiers(node: ASTNode): string[] {
    return this.collect(node, (n) => n.type === "identifier" ? n.name : null);
  }
}
