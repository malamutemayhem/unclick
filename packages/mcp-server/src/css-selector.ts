export interface SelectorPart {
  type: "tag" | "class" | "id" | "attribute" | "pseudo" | "universal";
  value: string;
  operator?: string;
  attrValue?: string;
}

export interface ParsedSelector {
  parts: SelectorPart[];
  combinator?: string;
  specificity: [number, number, number];
}

export class CssSelectorParser {
  static parse(selector: string): ParsedSelector {
    const parts: SelectorPart[] = [];
    let remaining = selector.trim();

    while (remaining.length > 0) {
      if (remaining.startsWith("#")) {
        const match = remaining.match(/^#([\w-]+)/);
        if (match) {
          parts.push({ type: "id", value: match[1] });
          remaining = remaining.slice(match[0].length);
          continue;
        }
      }

      if (remaining.startsWith(".")) {
        const match = remaining.match(/^\.([\w-]+)/);
        if (match) {
          parts.push({ type: "class", value: match[1] });
          remaining = remaining.slice(match[0].length);
          continue;
        }
      }

      if (remaining.startsWith("[")) {
        const match = remaining.match(/^\[(\w+)(?:([~|^$*]?=)"?([^"\]]*)"?)?\]/);
        if (match) {
          parts.push({
            type: "attribute",
            value: match[1],
            operator: match[2],
            attrValue: match[3],
          });
          remaining = remaining.slice(match[0].length);
          continue;
        }
      }

      if (remaining.startsWith(":")) {
        const match = remaining.match(/^:([\w-]+)(?:\(([^)]*)\))?/);
        if (match) {
          parts.push({ type: "pseudo", value: match[1] + (match[2] ? `(${match[2]})` : "") });
          remaining = remaining.slice(match[0].length);
          continue;
        }
      }

      if (remaining.startsWith("*")) {
        parts.push({ type: "universal", value: "*" });
        remaining = remaining.slice(1);
        continue;
      }

      const tagMatch = remaining.match(/^([\w-]+)/);
      if (tagMatch) {
        parts.push({ type: "tag", value: tagMatch[1] });
        remaining = remaining.slice(tagMatch[0].length);
        continue;
      }

      remaining = remaining.slice(1);
    }

    return {
      parts,
      specificity: CssSelectorParser.calculateSpecificity(parts),
    };
  }

  static calculateSpecificity(parts: SelectorPart[]): [number, number, number] {
    let ids = 0;
    let classes = 0;
    let elements = 0;

    for (const part of parts) {
      switch (part.type) {
        case "id":
          ids++;
          break;
        case "class":
        case "attribute":
        case "pseudo":
          classes++;
          break;
        case "tag":
          elements++;
          break;
      }
    }

    return [ids, classes, elements];
  }

  static compareSpecificity(
    a: [number, number, number],
    b: [number, number, number],
  ): number {
    for (let i = 0; i < 3; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  }

  static specificitySummary(specificity: [number, number, number]): string {
    return specificity.join(",");
  }

  static isValid(selector: string): boolean {
    try {
      const result = CssSelectorParser.parse(selector);
      return result.parts.length > 0;
    } catch {
      return false;
    }
  }

  static partCount(selector: string): number {
    return CssSelectorParser.parse(selector).parts.length;
  }
}
