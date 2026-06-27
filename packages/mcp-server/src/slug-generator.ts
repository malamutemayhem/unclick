const TRANSLITERATIONS: Record<string, string> = {
  "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a",
  "è": "e", "é": "e", "ê": "e", "ë": "e",
  "ì": "i", "í": "i", "î": "i", "ï": "i",
  "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o",
  "ù": "u", "ú": "u", "û": "u", "ü": "u",
  "ñ": "n", "ç": "c", "ß": "ss", "ø": "o",
  "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A",
  "È": "E", "É": "E", "Ê": "E", "Ë": "E",
  "Ì": "I", "Í": "I", "Î": "I", "Ï": "I",
  "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O",
  "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U",
  "Ñ": "N", "Ç": "C", "Ø": "O",
};

export interface SlugOptions {
  separator?: string;
  lowercase?: boolean;
  maxLength?: number;
  transliterate?: boolean;
  allowedChars?: RegExp;
}

export function slugify(input: string, options: SlugOptions = {}): string {
  const {
    separator = "-",
    lowercase = true,
    maxLength,
    transliterate = true,
    allowedChars = /[a-zA-Z0-9]/,
  } = options;

  let result = input.trim();

  if (transliterate) {
    result = result.split("").map((ch) => TRANSLITERATIONS[ch] ?? ch).join("");
  }

  if (lowercase) {
    result = result.toLowerCase();
  }

  let slug = "";
  let lastWasSep = false;

  for (const ch of result) {
    if (allowedChars.test(ch)) {
      slug += ch;
      lastWasSep = false;
    } else if (!lastWasSep && slug.length > 0) {
      slug += separator;
      lastWasSep = true;
    }
  }

  if (slug.endsWith(separator)) {
    slug = slug.slice(0, -separator.length);
  }

  if (maxLength !== undefined && slug.length > maxLength) {
    slug = slug.slice(0, maxLength);
    const lastSep = slug.lastIndexOf(separator);
    if (lastSep > maxLength * 0.5) {
      slug = slug.slice(0, lastSep);
    }
  }

  return slug;
}

export function uniqueSlug(input: string, existing: Set<string>, options: SlugOptions = {}): string {
  const base = slugify(input, options);
  if (!existing.has(base)) return base;
  const sep = options.separator ?? "-";
  let counter = 2;
  while (existing.has(base + sep + counter)) {
    counter++;
  }
  return base + sep + counter;
}

export function fileSlug(filename: string): string {
  const dot = filename.lastIndexOf(".");
  const name = dot > 0 ? filename.slice(0, dot) : filename;
  return slugify(name);
}

export function anchorSlug(heading: string): string {
  return slugify(heading, { separator: "-", lowercase: true });
}
