export type BValue = string | number | BValue[] | BDict;
export type BDict = Map<string, BValue>;

export function encode(value: BValue): string {
  if (typeof value === "number") {
    return `i${Math.floor(value)}e`;
  }
  if (typeof value === "string") {
    return `${value.length}:${value}`;
  }
  if (Array.isArray(value)) {
    return "l" + value.map(encode).join("") + "e";
  }
  if (value instanceof Map) {
    const keys = [...value.keys()].sort();
    return "d" + keys.map((k) => encode(k) + encode(value.get(k)!)).join("") + "e";
  }
  throw new Error("Unsupported type");
}

export function decode(input: string): BValue {
  let pos = 0;

  function parseValue(): BValue {
    if (input[pos] === "i") return parseInt_();
    if (input[pos] === "l") return parseList();
    if (input[pos] === "d") return parseDict();
    return parseString();
  }

  function parseInt_(): number {
    pos++;
    const end = input.indexOf("e", pos);
    const num = Number(input.slice(pos, end));
    pos = end + 1;
    return num;
  }

  function parseString(): string {
    const colon = input.indexOf(":", pos);
    const len = Number(input.slice(pos, colon));
    pos = colon + 1;
    const str = input.slice(pos, pos + len);
    pos += len;
    return str;
  }

  function parseList(): BValue[] {
    pos++;
    const items: BValue[] = [];
    while (input[pos] !== "e") {
      items.push(parseValue());
    }
    pos++;
    return items;
  }

  function parseDict(): BDict {
    pos++;
    const dict: BDict = new Map();
    while (input[pos] !== "e") {
      const key = parseString();
      const val = parseValue();
      dict.set(key, val);
    }
    pos++;
    return dict;
  }

  return parseValue();
}
