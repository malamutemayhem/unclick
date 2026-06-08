export interface EmojiInfo {
  emoji: string;
  name: string;
  category: string;
}

export class EmojiParser {
  private static readonly SHORTCODES: Record<string, string> = {
    ":smile:": "\u{1F604}", ":laugh:": "\u{1F602}", ":wink:": "\u{1F609}",
    ":heart:": "\u{2764}\u{FE0F}", ":thumbsup:": "\u{1F44D}", ":thumbsdown:": "\u{1F44E}",
    ":fire:": "\u{1F525}", ":star:": "\u{2B50}", ":check:": "\u{2705}",
    ":x:": "\u{274C}", ":warning:": "\u{26A0}\u{FE0F}", ":rocket:": "\u{1F680}",
    ":bug:": "\u{1F41B}", ":bulb:": "\u{1F4A1}", ":memo:": "\u{1F4DD}",
    ":tada:": "\u{1F389}", ":wave:": "\u{1F44B}", ":clap:": "\u{1F44F}",
    ":eyes:": "\u{1F440}", ":100:": "\u{1F4AF}", ":cry:": "\u{1F622}",
    ":angry:": "\u{1F620}", ":cool:": "\u{1F60E}", ":think:": "\u{1F914}",
    ":pray:": "\u{1F64F}", ":muscle:": "\u{1F4AA}", ":sparkles:": "\u{2728}",
    ":zap:": "\u{26A1}", ":gear:": "\u{2699}\u{FE0F}", ":lock:": "\u{1F512}",
  };

  static parseShortcodes(text: string): string {
    return text.replace(/:[\w]+:/g, (match) => EmojiParser.SHORTCODES[match] || match);
  }

  static toShortcode(emoji: string): string | null {
    for (const [code, e] of Object.entries(EmojiParser.SHORTCODES)) {
      if (e === emoji) return code;
    }
    return null;
  }

  static stripEmojis(text: string): string {
    return text
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{2705}\u{274C}\u{2728}\u{26A0}\u{FE0F}\u{26A1}\u{2699}\u{FE0F}]/gu,
        "",
      )
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  static containsEmoji(text: string): boolean {
    return /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2705}\u{274C}\u{2728}]/u.test(text);
  }

  static listShortcodes(): string[] {
    return Object.keys(EmojiParser.SHORTCODES).sort();
  }

  static search(query: string): Array<{ shortcode: string; emoji: string }> {
    const lower = query.toLowerCase();
    return Object.entries(EmojiParser.SHORTCODES)
      .filter(([code]) => code.slice(1, -1).includes(lower))
      .map(([shortcode, emoji]) => ({ shortcode, emoji }));
  }

  static count(text: string): number {
    const matches = text.match(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2705}\u{274C}\u{2728}]/gu,
    );
    return matches ? matches.length : 0;
  }

  static sentiment(text: string): "positive" | "negative" | "neutral" {
    const positive = new Set(["\u{1F604}", "\u{1F602}", "\u{1F609}", "\u{2764}\u{FE0F}", "\u{1F44D}", "\u{1F525}",
      "\u{2B50}", "\u{2705}", "\u{1F680}", "\u{1F389}", "\u{1F44F}", "\u{1F4AF}", "\u{1F60E}", "\u{1F4AA}", "\u{2728}"]);
    const negative = new Set(["\u{1F44E}", "\u{274C}", "\u{1F41B}", "\u{1F622}", "\u{1F620}"]);

    let pos = 0;
    let neg = 0;
    for (const ch of text) {
      if (positive.has(ch)) pos++;
      if (negative.has(ch)) neg++;
    }
    if (pos > neg) return "positive";
    if (neg > pos) return "negative";
    return "neutral";
  }
}
