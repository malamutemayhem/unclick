const IRREGULARS: [string, string][] = [
  ["child", "children"], ["person", "people"], ["man", "men"], ["woman", "women"],
  ["mouse", "mice"], ["goose", "geese"], ["tooth", "teeth"], ["foot", "feet"],
  ["ox", "oxen"], ["leaf", "leaves"], ["life", "lives"], ["knife", "knives"],
  ["wife", "wives"], ["self", "selves"], ["shelf", "shelves"],
];

const UNCOUNTABLE = new Set([
  "sheep", "fish", "deer", "series", "species", "money", "rice",
  "information", "equipment", "news", "software", "hardware",
]);

const PLURAL_RULES: [RegExp, string][] = [
  [/s$/i, "ses"],
  [/([^aeiou])y$/i, "$1ies"],
  [/(x|ch|ss|sh)$/i, "$1es"],
  [/([^aeiou]o)$/i, "$1es"],
  [/(f|fe)$/i, "ves"],
  [/is$/i, "es"],
  [/us$/i, "i"],
  [/on$/i, "a"],
  [/$/, "s"],
];

const SINGULAR_RULES: [RegExp, string][] = [
  [/ses$/i, "s"],
  [/ies$/i, "y"],
  [/(x|ch|ss|sh)es$/i, "$1"],
  [/ves$/i, "f"],
  [/i$/i, "us"],
  [/a$/i, "on"],
  [/s$/i, ""],
];

export function pluralize(word: string): string {
  if (UNCOUNTABLE.has(word.toLowerCase())) return word;
  const lower = word.toLowerCase();
  for (const [sing, plur] of IRREGULARS) {
    if (lower === sing) return matchCase(word, plur);
  }
  for (const [rule, replacement] of PLURAL_RULES) {
    if (rule.test(word)) return word.replace(rule, replacement);
  }
  return word + "s";
}

export function singularize(word: string): string {
  if (UNCOUNTABLE.has(word.toLowerCase())) return word;
  const lower = word.toLowerCase();
  for (const [sing, plur] of IRREGULARS) {
    if (lower === plur) return matchCase(word, sing);
  }
  for (const [rule, replacement] of SINGULAR_RULES) {
    if (rule.test(word)) return word.replace(rule, replacement);
  }
  return word;
}

export function isPlural(word: string): boolean {
  return pluralize(singularize(word)).toLowerCase() === word.toLowerCase();
}

export function isSingular(word: string): boolean {
  return singularize(pluralize(word)).toLowerCase() === word.toLowerCase();
}

export function inflect(word: string, count: number): string {
  return count === 1 ? singularize(word) : pluralize(word);
}

function matchCase(source: string, target: string): string {
  if (source === source.toUpperCase()) return target.toUpperCase();
  if (source[0] === source[0].toUpperCase()) return target[0].toUpperCase() + target.slice(1);
  return target;
}
