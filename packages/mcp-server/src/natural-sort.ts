export class NaturalSort {
  static compare(a: string, b: string): number {
    const partsA = NaturalSort.tokenize(a.toLowerCase());
    const partsB = NaturalSort.tokenize(b.toLowerCase());
    const len = Math.min(partsA.length, partsB.length);

    for (let i = 0; i < len; i++) {
      const pa = partsA[i];
      const pb = partsB[i];
      const numA = Number(pa);
      const numB = Number(pb);
      const aIsNum = !isNaN(numA) && pa.length > 0;
      const bIsNum = !isNaN(numB) && pb.length > 0;

      if (aIsNum && bIsNum) {
        if (numA !== numB) return numA - numB;
      } else if (aIsNum !== bIsNum) {
        return aIsNum ? -1 : 1;
      } else {
        const cmp = pa.localeCompare(pb);
        if (cmp !== 0) return cmp;
      }
    }

    return partsA.length - partsB.length;
  }

  static sort(items: string[]): string[] {
    return [...items].sort(NaturalSort.compare);
  }

  static sortBy<T>(items: T[], key: (item: T) => string): T[] {
    return [...items].sort((a, b) => NaturalSort.compare(key(a), key(b)));
  }

  static sortDescending(items: string[]): string[] {
    return [...items].sort((a, b) => NaturalSort.compare(b, a));
  }

  static groupByPrefix(items: string[], separator: string = "-"): Record<string, string[]> {
    const groups: Record<string, string[]> = {};
    for (const item of items) {
      const idx = item.indexOf(separator);
      const prefix = idx === -1 ? item : item.substring(0, idx);
      if (!groups[prefix]) groups[prefix] = [];
      groups[prefix].push(item);
    }
    for (const key of Object.keys(groups)) {
      groups[key] = NaturalSort.sort(groups[key]);
    }
    return groups;
  }

  static isNaturalOrder(items: string[]): boolean {
    for (let i = 1; i < items.length; i++) {
      if (NaturalSort.compare(items[i - 1], items[i]) > 0) return false;
    }
    return true;
  }

  static min(items: string[]): string {
    return NaturalSort.sort(items)[0];
  }

  static max(items: string[]): string {
    return NaturalSort.sort(items)[items.length - 1];
  }

  private static tokenize(str: string): string[] {
    const tokens: string[] = [];
    let current = "";
    let inNumber = false;

    for (const ch of str) {
      const isDigit = ch >= "0" && ch <= "9";
      if (isDigit !== inNumber && current.length > 0) {
        tokens.push(current);
        current = "";
      }
      current += ch;
      inNumber = isDigit;
    }

    if (current.length > 0) tokens.push(current);
    return tokens;
  }
}
