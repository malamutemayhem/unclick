export type TypeKind = "primitive" | "struct" | "enum" | "array" | "map" | "union" | "optional" | "alias";

export interface TypeDef {
  name: string;
  kind: TypeKind;
  fields?: Array<{ name: string; type: string; required: boolean }>;
  variants?: string[];
  elementType?: string;
  keyType?: string;
  valueType?: string;
  unionTypes?: string[];
  innerType?: string;
  aliasOf?: string;
  description?: string;
}

export class TypeRegistry {
  private types = new Map<string, TypeDef>();

  constructor() {
    this.registerPrimitive("string");
    this.registerPrimitive("number");
    this.registerPrimitive("boolean");
    this.registerPrimitive("null");
    this.registerPrimitive("any");
  }

  private registerPrimitive(name: string): void {
    this.types.set(name, { name, kind: "primitive" });
  }

  defineStruct(name: string, fields: Array<{ name: string; type: string; required?: boolean }>, description?: string): void {
    this.types.set(name, {
      name,
      kind: "struct",
      fields: fields.map((f) => ({ name: f.name, type: f.type, required: f.required ?? true })),
      description,
    });
  }

  defineEnum(name: string, variants: string[], description?: string): void {
    this.types.set(name, { name, kind: "enum", variants, description });
  }

  defineArray(name: string, elementType: string): void {
    this.types.set(name, { name, kind: "array", elementType });
  }

  defineMap(name: string, keyType: string, valueType: string): void {
    this.types.set(name, { name, kind: "map", keyType, valueType });
  }

  defineUnion(name: string, types: string[]): void {
    this.types.set(name, { name, kind: "union", unionTypes: types });
  }

  defineOptional(name: string, innerType: string): void {
    this.types.set(name, { name, kind: "optional", innerType });
  }

  defineAlias(name: string, aliasOf: string): void {
    this.types.set(name, { name, kind: "alias", aliasOf });
  }

  resolve(name: string): TypeDef | undefined {
    const def = this.types.get(name);
    if (def?.kind === "alias" && def.aliasOf) {
      return this.resolve(def.aliasOf);
    }
    return def;
  }

  get(name: string): TypeDef | undefined {
    return this.types.get(name);
  }

  has(name: string): boolean {
    return this.types.has(name);
  }

  validate(typeName: string, value: unknown): boolean {
    const def = this.resolve(typeName);
    if (!def) return false;

    switch (def.kind) {
      case "primitive":
        if (def.name === "any") return true;
        if (def.name === "null") return value === null;
        return typeof value === def.name;

      case "struct": {
        if (typeof value !== "object" || value === null) return false;
        const obj = value as Record<string, unknown>;
        if (!def.fields) return true;
        for (const field of def.fields) {
          if (field.required && !(field.name in obj)) return false;
          if (field.name in obj && !this.validate(field.type, obj[field.name])) return false;
        }
        return true;
      }

      case "enum":
        return typeof value === "string" && (def.variants?.includes(value) ?? false);

      case "array":
        return Array.isArray(value) && value.every((v) => this.validate(def.elementType!, v));

      case "optional":
        return value === null || value === undefined || this.validate(def.innerType!, value);

      case "union":
        return def.unionTypes?.some((t) => this.validate(t, value)) ?? false;

      default:
        return false;
    }
  }

  dependencies(typeName: string): Set<string> {
    const result = new Set<string>();
    const visit = (name: string) => {
      const def = this.types.get(name);
      if (!def || result.has(name)) return;
      result.add(name);
      if (def.fields) def.fields.forEach((f) => visit(f.type));
      if (def.elementType) visit(def.elementType);
      if (def.keyType) visit(def.keyType);
      if (def.valueType) visit(def.valueType);
      if (def.unionTypes) def.unionTypes.forEach(visit);
      if (def.innerType) visit(def.innerType);
      if (def.aliasOf) visit(def.aliasOf);
    };
    visit(typeName);
    result.delete(typeName);
    return result;
  }

  allTypes(): string[] {
    return [...this.types.keys()].sort();
  }

  typeCount(): number {
    return this.types.size;
  }
}
