export class HtmlEntity {
  private static readonly ENTITIES: Record<string, string> = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'",
    "&apos;": "'", "&nbsp;": " ", "&copy;": "©", "&reg;": "®",
    "&trade;": "™", "&euro;": "€", "&pound;": "£", "&yen;": "¥",
    "&cent;": "¢", "&deg;": "°", "&plusmn;": "±", "&times;": "×",
    "&divide;": "÷", "&micro;": "µ", "&para;": "¶", "&sect;": "§",
    "&bull;": "•", "&hellip;": "…", "&mdash;": "—", "&ndash;": "–",
    "&laquo;": "«", "&raquo;": "»", "&lsquo;": "‘", "&rsquo;": "’",
    "&ldquo;": "“", "&rdquo;": "”", "&hearts;": "♥", "&spades;": "♠",
    "&clubs;": "♣", "&diams;": "♦",
  };

  private static readonly REVERSE: Map<string, string> = new Map(
    Object.entries(HtmlEntity.ENTITIES).map(([entity, char]) => [char, entity]),
  );

  static decode(text: string): string {
    let result = text;
    for (const [entity, char] of Object.entries(HtmlEntity.ENTITIES)) {
      result = result.split(entity).join(char);
    }
    result = result.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
    result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    return result;
  }

  static encode(text: string): string {
    return text.replace(/[&<>"']/g, (ch) => {
      switch (ch) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case '"': return "&quot;";
        case "'": return "&#39;";
        default: return ch;
      }
    });
  }

  static encodeNonAscii(text: string): string {
    let result = "";
    for (const ch of text) {
      const code = ch.charCodeAt(0);
      if (code > 127) {
        result += `&#${code};`;
      } else {
        result += ch;
      }
    }
    return result;
  }

  static namedEntity(char: string): string | null {
    return HtmlEntity.REVERSE.get(char) || null;
  }

  static numericEntity(char: string): string {
    return `&#${char.charCodeAt(0)};`;
  }

  static hexEntity(char: string): string {
    return `&#x${char.charCodeAt(0).toString(16)};`;
  }

  static listEntities(): Array<{ entity: string; character: string }> {
    return Object.entries(HtmlEntity.ENTITIES).map(([entity, character]) => ({
      entity,
      character,
    }));
  }

  static isEncoded(text: string): boolean {
    return /&(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/.test(text);
  }

  static stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }
}
