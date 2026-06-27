export function inferSchema(value: unknown): Record<string, unknown> {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    const itemSchemas = value.map(inferSchema);
    const merged = mergeSchemas(itemSchemas);
    return { type: "array", items: merged };
  }
  switch (typeof value) {
    case "string": return { type: "string" };
    case "number": return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
    case "boolean": return { type: "boolean" };
    case "object": {
      const obj = value as Record<string, unknown>;
      const properties: Record<string, unknown> = {};
      const required: string[] = [];
      for (const [key, val] of Object.entries(obj)) {
        properties[key] = inferSchema(val);
        if (val !== undefined) required.push(key);
      }
      return { type: "object", properties, required };
    }
    default: return {};
  }
}

export function inferSchemaFromMultiple(values: unknown[]): Record<string, unknown> {
  if (values.length === 0) return {};
  if (values.length === 1) return inferSchema(values[0]);
  return mergeSchemas(values.map(inferSchema));
}

function mergeSchemas(schemas: Record<string, unknown>[]): Record<string, unknown> {
  if (schemas.length === 0) return {};
  if (schemas.length === 1) return schemas[0];

  const types = new Set(schemas.map((s) => s.type as string));
  if (types.size === 1) {
    const type = schemas[0].type;
    if (type === "object") {
      return mergeObjectSchemas(schemas);
    }
    return schemas[0];
  }

  if (types.size === 2 && types.has("integer") && types.has("number")) {
    return { type: "number" };
  }

  return { oneOf: schemas };
}

function mergeObjectSchemas(schemas: Record<string, unknown>[]): Record<string, unknown> {
  const allProps = new Map<string, Record<string, unknown>[]>();
  const allRequired = new Set<string>();
  let firstRequired = true;

  for (const schema of schemas) {
    const props = (schema.properties || {}) as Record<string, Record<string, unknown>>;
    const req = new Set((schema.required as string[]) || []);

    for (const [key, val] of Object.entries(props)) {
      if (!allProps.has(key)) allProps.set(key, []);
      allProps.get(key)!.push(val);
    }

    if (firstRequired) {
      for (const r of req) allRequired.add(r);
      firstRequired = false;
    } else {
      for (const r of allRequired) {
        if (!req.has(r)) allRequired.delete(r);
      }
    }
  }

  const properties: Record<string, unknown> = {};
  for (const [key, propSchemas] of allProps) {
    properties[key] = mergeSchemas(propSchemas);
  }

  return {
    type: "object",
    properties,
    required: [...allRequired],
  };
}
