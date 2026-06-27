export type TypeKind = "int" | "float" | "bool" | "string" | "void" | "fn" | "array" | "any" | "never";

export interface Type {
  kind: TypeKind;
  params?: Type[];
  returnType?: Type;
  elementType?: Type;
}

export function tInt(): Type { return { kind: "int" }; }
export function tFloat(): Type { return { kind: "float" }; }
export function tBool(): Type { return { kind: "bool" }; }
export function tString(): Type { return { kind: "string" }; }
export function tVoid(): Type { return { kind: "void" }; }
export function tAny(): Type { return { kind: "any" }; }
export function tNever(): Type { return { kind: "never" }; }
export function tFn(params: Type[], returnType: Type): Type {
  return { kind: "fn", params, returnType };
}
export function tArray(elementType: Type): Type {
  return { kind: "array", elementType };
}

export function typeEqual(a: Type, b: Type): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "fn" && b.kind === "fn") {
    if (!a.params || !b.params) return false;
    if (a.params.length !== b.params.length) return false;
    for (let i = 0; i < a.params.length; i++) {
      if (!typeEqual(a.params[i], b.params[i])) return false;
    }
    return typeEqual(a.returnType!, b.returnType!);
  }
  if (a.kind === "array" && b.kind === "array") {
    return typeEqual(a.elementType!, b.elementType!);
  }
  return true;
}

export function isAssignable(target: Type, source: Type): boolean {
  if (target.kind === "any" || source.kind === "any") return true;
  if (source.kind === "never") return true;
  if (target.kind === "float" && source.kind === "int") return true;
  return typeEqual(target, source);
}

export function typeToString(t: Type): string {
  switch (t.kind) {
    case "fn": {
      const params = (t.params || []).map(typeToString).join(", ");
      return `(${params}) => ${typeToString(t.returnType!)}`;
    }
    case "array":
      return `${typeToString(t.elementType!)}[]`;
    default:
      return t.kind;
  }
}

export class TypeEnv {
  private scopes: Map<string, Type>[] = [new Map()];
  private errors: string[] = [];

  pushScope(): void {
    this.scopes.push(new Map());
  }

  popScope(): void {
    if (this.scopes.length > 1) this.scopes.pop();
  }

  define(name: string, type: Type): void {
    this.scopes[this.scopes.length - 1].set(name, type);
  }

  lookup(name: string): Type | null {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const t = this.scopes[i].get(name);
      if (t) return t;
    }
    return null;
  }

  checkAssignment(name: string, valueType: Type): boolean {
    const varType = this.lookup(name);
    if (!varType) {
      this.errors.push(`Undefined variable '${name}'`);
      return false;
    }
    if (!isAssignable(varType, valueType)) {
      this.errors.push(`Cannot assign ${typeToString(valueType)} to ${typeToString(varType)}`);
      return false;
    }
    return true;
  }

  checkCall(name: string, argTypes: Type[]): Type | null {
    const fnType = this.lookup(name);
    if (!fnType) {
      this.errors.push(`Undefined function '${name}'`);
      return null;
    }
    if (fnType.kind !== "fn") {
      this.errors.push(`'${name}' is not a function`);
      return null;
    }
    if (fnType.params!.length !== argTypes.length) {
      this.errors.push(`Expected ${fnType.params!.length} arguments, got ${argTypes.length}`);
      return null;
    }
    for (let i = 0; i < argTypes.length; i++) {
      if (!isAssignable(fnType.params![i], argTypes[i])) {
        this.errors.push(
          `Argument ${i}: cannot pass ${typeToString(argTypes[i])} as ${typeToString(fnType.params![i])}`
        );
        return null;
      }
    }
    return fnType.returnType!;
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  get scopeDepth(): number {
    return this.scopes.length;
  }
}
