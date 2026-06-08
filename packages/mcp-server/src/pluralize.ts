const IRREGULAR: Record<string, string> = {
  child: "children", person: "people", man: "men", woman: "women",
  mouse: "mice", goose: "geese", tooth: "teeth", foot: "feet",
  ox: "oxen", leaf: "leaves", life: "lives", knife: "knives",
  wife: "wives", half: "halves", shelf: "shelves", self: "selves",
  calf: "calves", wolf: "wolves", loaf: "loaves",
};

const UNCOUNTABLE = new Set([
  "sheep", "fish", "deer", "species", "series", "money",
  "rice", "information", "equipment", "news", "homework",
  "advice", "furniture", "luggage", "traffic", "music",
]);

export function pluralize(word: string, count?: number): string {
  if (count === 1) return word;
  const lower = word.toLowerCase();
  if (UNCOUNTABLE.has(lower)) return word;
  if (IRREGULAR[lower]) {
    const plural = IRREGULAR[lower];
    return word[0] === word[0].toUpperCase()
      ? plural[0].toUpperCase() + plural.slice(1)
      : plural;
  }
  if (lower.endsWith("s") || lower.endsWith("sh") || lower.endsWith("ch") || lower.endsWith("x") || lower.endsWith("z")) {
    return word + "es";
  }
  if (lower.endsWith("y") && !/[aeiou]y$/i.test(word)) {
    return word.slice(0, -1) + "ies";
  }
  if (lower.endsWith("f")) {
    return word.slice(0, -1) + "ves";
  }
  if (lower.endsWith("fe")) {
    return word.slice(0, -2) + "ves";
  }
  return word + "s";
}

export function singularize(word: string): string {
  const lower = word.toLowerCase();
  if (UNCOUNTABLE.has(lower)) return word;
  for (const [sing, plur] of Object.entries(IRREGULAR)) {
    if (lower === plur) {
      return word[0] === word[0].toUpperCase()
        ? sing[0].toUpperCase() + sing.slice(1)
        : sing;
    }
  }
  if (lower.endsWith("ies") && lower.length > 3) return word.slice(0, -3) + "y";
  if (lower.endsWith("ves")) return word.slice(0, -3) + "f";
  if (lower.endsWith("ses") || lower.endsWith("shes") || lower.endsWith("ches") || lower.endsWith("xes") || lower.endsWith("zes")) {
    return word.slice(0, -2);
  }
  if (lower.endsWith("s") && !lower.endsWith("ss")) return word.slice(0, -1);
  return word;
}

export function withCount(word: string, count: number): string {
  return `${count} ${pluralize(word, count)}`;
}
