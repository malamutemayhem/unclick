const ONES: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19,
};

const TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};

const SCALES: Record<string, number> = {
  hundred: 100, thousand: 1000, million: 1000000, billion: 1000000000, trillion: 1000000000000,
};

export function wordsToNumber(text: string): number {
  const words = text.toLowerCase().replace(/-/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) throw new Error("Empty input");

  let result = 0;
  let current = 0;

  for (const word of words) {
    if (word === "and") continue;

    if (word in ONES) {
      current += ONES[word];
    } else if (word in TENS) {
      current += TENS[word];
    } else if (word === "hundred") {
      current *= 100;
    } else if (word in SCALES) {
      const scale = SCALES[word];
      if (current === 0) current = 1;
      if (scale >= 1000) {
        current *= scale;
        result += current;
        current = 0;
      }
    } else {
      throw new Error(`Unknown word: ${word}`);
    }
  }

  return result + current;
}

export function numberToWords(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + numberToWords(-n);

  const parts: string[] = [];

  if (n >= 1000000000) {
    parts.push(numberToWords(Math.floor(n / 1000000000)) + " billion");
    n %= 1000000000;
  }
  if (n >= 1000000) {
    parts.push(numberToWords(Math.floor(n / 1000000)) + " million");
    n %= 1000000;
  }
  if (n >= 1000) {
    parts.push(numberToWords(Math.floor(n / 1000)) + " thousand");
    n %= 1000;
  }
  if (n >= 100) {
    parts.push(numberToWords(Math.floor(n / 100)) + " hundred");
    n %= 100;
  }
  if (n > 0) {
    const onesKeys = Object.entries(ONES).find(([, v]) => v === n);
    const tensKeys = Object.entries(TENS).find(([, v]) => v === n);
    if (onesKeys) {
      parts.push(onesKeys[0]);
    } else if (tensKeys) {
      parts.push(tensKeys[0]);
    } else if (n > 20) {
      const ten = Math.floor(n / 10) * 10;
      const one = n % 10;
      const tenWord = Object.entries(TENS).find(([, v]) => v === ten)?.[0] ?? "";
      const oneWord = Object.entries(ONES).find(([, v]) => v === one)?.[0] ?? "";
      parts.push(tenWord + "-" + oneWord);
    }
  }

  return parts.join(" ");
}

export function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const mod100 = n % 100;
  const suffix = (mod100 >= 11 && mod100 <= 13) ? "th" : (suffixes[n % 10] ?? "th");
  return `${n}${suffix}`;
}
