export class Stemmer {
  private static step1aRules: Array<[RegExp, string]> = [
    [/sses$/, "ss"],
    [/ies$/, "i"],
    [/ss$/, "ss"],
    [/s$/, ""],
  ];

  private static step1bRules: Array<[RegExp, string]> = [
    [/eed$/, "ee"],
    [/ed$/, ""],
    [/ing$/, ""],
  ];

  private static step2Rules: Array<[RegExp, string]> = [
    [/ational$/, "ate"],
    [/tional$/, "tion"],
    [/enci$/, "ence"],
    [/anci$/, "ance"],
    [/izer$/, "ize"],
    [/abli$/, "able"],
    [/alli$/, "al"],
    [/entli$/, "ent"],
    [/eli$/, "e"],
    [/ousli$/, "ous"],
    [/ization$/, "ize"],
    [/ation$/, "ate"],
    [/ator$/, "ate"],
    [/alism$/, "al"],
    [/iveness$/, "ive"],
    [/fulness$/, "ful"],
    [/ousness$/, "ous"],
    [/aliti$/, "al"],
    [/iviti$/, "ive"],
    [/biliti$/, "ble"],
  ];

  private static step3Rules: Array<[RegExp, string]> = [
    [/icate$/, "ic"],
    [/ative$/, ""],
    [/alize$/, "al"],
    [/iciti$/, "ic"],
    [/ical$/, "ic"],
    [/ful$/, ""],
    [/ness$/, ""],
  ];

  static stem(word: string): string {
    if (word.length <= 2) return word;
    let w = word.toLowerCase();

    if (w.startsWith("y")) w = "Y" + w.slice(1);

    for (const [re, rep] of Stemmer.step1aRules) {
      if (re.test(w)) {
        w = w.replace(re, rep);
        break;
      }
    }

    for (const [re, rep] of Stemmer.step1bRules) {
      if (re.test(w)) {
        const stem = w.replace(re, rep);
        if (re.source === "eed$") {
          if (Stemmer.measure(stem) > 0) w = stem;
        } else {
          if (Stemmer.hasVowel(stem)) {
            w = stem;
            if (/at$|bl$|iz$/.test(w)) w += "e";
            else if (/([^aeiouylsz])\1$/.test(w)) w = w.slice(0, -1);
            else if (Stemmer.measure(w) === 1 && Stemmer.cvc(w)) w += "e";
          }
        }
        break;
      }
    }

    if (/y$/.test(w) && Stemmer.hasVowel(w.slice(0, -1))) {
      w = w.slice(0, -1) + "i";
    }

    for (const [re, rep] of Stemmer.step2Rules) {
      if (re.test(w)) {
        const stem = w.replace(re, rep);
        if (Stemmer.measure(stem) > 0) w = stem;
        break;
      }
    }

    for (const [re, rep] of Stemmer.step3Rules) {
      if (re.test(w)) {
        const stem = w.replace(re, rep);
        if (Stemmer.measure(stem) > 0) w = stem;
        break;
      }
    }

    w = w.replace(/^Y/, "y");
    return w;
  }

  static stemMany(words: string[]): string[] {
    return words.map((w) => Stemmer.stem(w));
  }

  static stemSentence(sentence: string): string {
    return sentence
      .split(/\s+/)
      .map((w) => Stemmer.stem(w))
      .join(" ");
  }

  static group(words: string[]): Map<string, string[]> {
    const groups = new Map<string, string[]>();
    for (const word of words) {
      const root = Stemmer.stem(word);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root)!.push(word);
    }
    return groups;
  }

  private static measure(word: string): number {
    const pattern = word
      .toLowerCase()
      .replace(/[aeiou]+/g, "V")
      .replace(/[^V]+/g, "C");
    const matches = pattern.match(/VC/g);
    return matches ? matches.length : 0;
  }

  private static hasVowel(word: string): boolean {
    return /[aeiou]/i.test(word);
  }

  private static cvc(word: string): boolean {
    const len = word.length;
    if (len < 3) return false;
    const c1 = !/[aeiou]/i.test(word[len - 1]);
    const v = /[aeiou]/i.test(word[len - 2]);
    const c2 = !/[aeiou]/i.test(word[len - 3]);
    if (!c1 || !v || !c2) return false;
    return !/[wxy]/.test(word[len - 1]);
  }
}
