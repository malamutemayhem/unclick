export type SchemaType = {
  type: string;
  properties?: Record<string, SchemaType>;
  items?: SchemaType;
  required?: string[];
  enum?: any[];
  oneOf?: SchemaType[];
};

export function infer(value: unknown): SchemaType {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    const schemas = value.map((v) => infer(v));
    const unified = unify(schemas);
    return { type: "array", items: unified };
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const properties: Record<string, SchemaType> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(obj)) {
      properties[key] = infer(val);
      required.push(key);
    }
    return { type: "object", properties, required };
  }
  if (typeof value === "string") return { type: "string" };
  if (typeof value === "number") return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
  if (typeof value === "boolean") return { type: "boolean" };
  return {};
}

export function inferFromSamples(samples: unknown[]): SchemaType {
  if (samples.length === 0) return {};
  if (samples.length === 1) return infer(samples[0]);
  return unify(samples.map((s) => infer(s)));
}

function unify(schemas: SchemaType[]): SchemaType {
  const types = new Set(schemas.map((s) => s.type));
  if (types.size === 1) {
    const type = [...types][0];
    if (type === "object") return mergeObjectSchemas(schemas);
    if (type === "array") {
      const itemSchemas = schemas.map((s) => s.items).filter(Boolean) as SchemaType[];
      return { type: "array", items: itemSchemas.length > 0 ? unify(itemSchemas) : {} };
    }
    return { type };
  }
  return { oneOf: schemas };
}

function mergeObjectSchemas(schemas: SchemaType[]): SchemaType {
  const allKeys = new Set<string>();
  for (const s of schemas) {
    if (s.properties) for (const k of Object.keys(s.properties)) allKeys.add(k);
  }
  const properties: Record<string, SchemaType> = {};
  const allRequired = new Set<string>(allKeys);
  for (const key of allKeys) {
    const keySchemas: SchemaType[] = [];
    for (const s of schemas) {
      if (s.properties?.[key]) keySchemas.push(s.properties[key]);
      else allRequired.delete(key);
    }
    properties[key] = keySchemas.length > 0 ? unify(keySchemas) : {};
  }
  const result: SchemaType = { type: "object", properties };
  if (allRequired.size > 0) result.required = [...allRequired].sort();
  return result;
}
