type SchemaType = "string" | "number" | "boolean" | "object" | "array" | "null";

interface SchemaNode {
  type: SchemaType | SchemaType[];
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  required?: string[];
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  description?: string;
}

class SchemaProperty {
  private schema: SchemaNode;
  private _isRequired = false;

  constructor(type: SchemaType) {
    this.schema = { type };
  }

  description(desc: string): SchemaProperty {
    this.schema.description = desc;
    return this;
  }

  required(): SchemaProperty {
    this._isRequired = true;
    return this;
  }

  default(value: unknown): SchemaProperty {
    this.schema.default = value;
    return this;
  }

  enum(values: unknown[]): SchemaProperty {
    this.schema.enum = values;
    return this;
  }

  min(value: number): SchemaProperty {
    if (this.schema.type === "string") this.schema.minLength = value;
    else this.schema.minimum = value;
    return this;
  }

  max(value: number): SchemaProperty {
    if (this.schema.type === "string") this.schema.maxLength = value;
    else this.schema.maximum = value;
    return this;
  }

  pattern(re: string): SchemaProperty {
    this.schema.pattern = re;
    return this;
  }

  items(itemSchema: SchemaProperty): SchemaProperty {
    this.schema.items = itemSchema.build();
    return this;
  }

  build(): SchemaNode {
    return { ...this.schema };
  }

  isRequired(): boolean {
    return this._isRequired;
  }
}

export class SchemaBuilder {
  private properties: Record<string, SchemaProperty> = {};
  private desc?: string;

  description(desc: string): SchemaBuilder {
    this.desc = desc;
    return this;
  }

  string(name: string): SchemaProperty {
    const prop = new SchemaProperty("string");
    this.properties[name] = prop;
    return prop;
  }

  number(name: string): SchemaProperty {
    const prop = new SchemaProperty("number");
    this.properties[name] = prop;
    return prop;
  }

  boolean(name: string): SchemaProperty {
    const prop = new SchemaProperty("boolean");
    this.properties[name] = prop;
    return prop;
  }

  array(name: string): SchemaProperty {
    const prop = new SchemaProperty("array");
    this.properties[name] = prop;
    return prop;
  }

  object(name: string): SchemaProperty {
    const prop = new SchemaProperty("object");
    this.properties[name] = prop;
    return prop;
  }

  build(): SchemaNode {
    const props: Record<string, SchemaNode> = {};
    const required: string[] = [];

    for (const [name, prop] of Object.entries(this.properties)) {
      props[name] = prop.build();
      if (prop.isRequired()) required.push(name);
    }

    const schema: SchemaNode = {
      type: "object",
      properties: props,
    };
    if (required.length > 0) schema.required = required;
    if (this.desc) schema.description = this.desc;
    return schema;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export function schema(): SchemaBuilder {
  return new SchemaBuilder();
}
