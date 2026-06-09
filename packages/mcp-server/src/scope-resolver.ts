export interface ScopeSymbol {
  name: string;
  kind: "var" | "fn" | "param" | "type" | "const";
  scopeId: number;
  line?: number;
}

export interface Scope {
  id: number;
  parentId: number | null;
  symbols: Map<string, ScopeSymbol>;
  children: number[];
  name?: string;
}

export class ScopeResolver {
  private scopes: Scope[] = [];
  private currentScopeId = 0;
  private errors: { message: string; name: string; line?: number }[] = [];

  constructor() {
    this.scopes.push({
      id: 0,
      parentId: null,
      symbols: new Map(),
      children: [],
      name: "global",
    });
  }

  enterScope(name?: string): number {
    const id = this.scopes.length;
    const scope: Scope = {
      id,
      parentId: this.currentScopeId,
      symbols: new Map(),
      children: [],
      name,
    };
    this.scopes[this.currentScopeId].children.push(id);
    this.scopes.push(scope);
    this.currentScopeId = id;
    return id;
  }

  exitScope(): void {
    const parent = this.scopes[this.currentScopeId].parentId;
    if (parent !== null) {
      this.currentScopeId = parent;
    }
  }

  declare(name: string, kind: ScopeSymbol["kind"] = "var", line?: number): ScopeSymbol {
    const scope = this.scopes[this.currentScopeId];
    if (scope.symbols.has(name)) {
      this.errors.push({ message: `Duplicate declaration: ${name}`, name, line });
    }
    const sym: ScopeSymbol = { name, kind, scopeId: this.currentScopeId, line };
    scope.symbols.set(name, sym);
    return sym;
  }

  resolve(name: string): ScopeSymbol | null {
    let scopeId: number | null = this.currentScopeId;
    while (scopeId !== null) {
      const scope: Scope = this.scopes[scopeId];
      const sym = scope.symbols.get(name);
      if (sym) return sym;
      scopeId = scope.parentId;
    }
    return null;
  }

  resolveOrError(name: string, line?: number): ScopeSymbol | null {
    const sym = this.resolve(name);
    if (!sym) {
      this.errors.push({ message: `Undefined symbol: ${name}`, name, line });
    }
    return sym;
  }

  isShadowing(name: string): boolean {
    const current = this.scopes[this.currentScopeId].symbols.has(name);
    if (!current) return false;
    let scopeId = this.scopes[this.currentScopeId].parentId;
    while (scopeId !== null) {
      if (this.scopes[scopeId].symbols.has(name)) return true;
      scopeId = this.scopes[scopeId].parentId;
    }
    return false;
  }

  getScope(id: number): Scope {
    return this.scopes[id];
  }

  get currentScope(): number {
    return this.currentScopeId;
  }

  get scopeCount(): number {
    return this.scopes.length;
  }

  get scopeDepth(): number {
    let depth = 0;
    let id: number | null = this.currentScopeId;
    while (id !== null && id !== 0) {
      depth++;
      id = this.scopes[id].parentId;
    }
    return depth;
  }

  getErrors(): typeof this.errors {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  allSymbols(): ScopeSymbol[] {
    const result: ScopeSymbol[] = [];
    for (const scope of this.scopes) {
      for (const [, sym] of scope.symbols) {
        result.push(sym);
      }
    }
    return result;
  }

  symbolsInScope(scopeId: number): ScopeSymbol[] {
    const result: ScopeSymbol[] = [];
    let id: number | null = scopeId;
    while (id !== null) {
      const scope: Scope = this.scopes[id];
      for (const [, sym] of scope.symbols) {
        if (!result.some((s) => s.name === sym.name)) {
          result.push(sym);
        }
      }
      id = scope.parentId;
    }
    return result;
  }

  toDot(): string {
    const lines = ["digraph Scopes {"];
    for (const scope of this.scopes) {
      const syms = [...scope.symbols.values()].map((s) => `${s.kind} ${s.name}`).join("\\n");
      const label = scope.name ? `${scope.name}\\n${syms}` : `scope_${scope.id}\\n${syms}`;
      lines.push(`  ${scope.id} [label="${label}"];`);
      if (scope.parentId !== null) {
        lines.push(`  ${scope.parentId} -> ${scope.id};`);
      }
    }
    lines.push("}");
    return lines.join("\n");
  }
}
