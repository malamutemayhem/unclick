export function expand(template: string, vars: Record<string, string | number | string[] | undefined>): string {
  return template.replace(/\{([+#./;?&]?)([^}]+)\}/g, (_match, operator: string, expression: string) => {
    const names = expression.split(",").map((n: string) => n.trim());
    const values = names
      .map((name) => {
        const explode = name.endsWith("*");
        const cleanName = explode ? name.slice(0, -1) : name;
        const val = vars[cleanName];
        if (val === undefined || val === null) return null;
        return { name: cleanName, value: val, explode };
      })
      .filter((v): v is { name: string; value: string | number | string[]; explode: boolean } => v !== null);

    if (values.length === 0) return "";

    switch (operator) {
      case "+":
        return values.map((v) => encodeValue(v.value, true)).join(",");
      case "#":
        return "#" + values.map((v) => encodeValue(v.value, true)).join(",");
      case ".":
        return "." + values.map((v) => encodeValue(v.value, false)).join(".");
      case "/":
        return "/" + values.map((v) => encodeValue(v.value, false)).join("/");
      case ";":
        return values.map((v) => {
          const encoded = encodeValue(v.value, false);
          return ";" + v.name + (encoded ? "=" + encoded : "");
        }).join("");
      case "?":
        return "?" + values.map((v) => v.name + "=" + encodeValue(v.value, false)).join("&");
      case "&":
        return "&" + values.map((v) => v.name + "=" + encodeValue(v.value, false)).join("&");
      default:
        return values.map((v) => encodeValue(v.value, false)).join(",");
    }
  });
}

function encodeValue(value: string | number | string[], reserved: boolean): string {
  if (Array.isArray(value)) {
    return value.map((v) => encode(String(v), reserved)).join(",");
  }
  return encode(String(value), reserved);
}

function encode(str: string, reserved: boolean): string {
  if (reserved) return encodeURI(str);
  return encodeURIComponent(str);
}

export function extractVarNames(template: string): string[] {
  const names = new Set<string>();
  const regex = /\{[+#./;?&]?([^}]+)\}/g;
  let match;
  while ((match = regex.exec(template)) !== null) {
    match[1].split(",").forEach((n) => {
      names.add(n.trim().replace(/\*$/, ""));
    });
  }
  return [...names];
}

export function isTemplate(str: string): boolean {
  return /\{[^}]+\}/.test(str);
}
