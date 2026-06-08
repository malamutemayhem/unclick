import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function metaphone(word: string): string {
  let w = word.toUpperCase().replace(/[^A-Z]/g, "");
  if (!w) return "";

  // Drop initial silent letters
  if (/^(KN|GN|PN|AE|WR)/.test(w)) w = w.slice(1);

  let result = "";
  for (let i = 0; i < w.length; i++) {
    const c = w[i];
    const prev = i > 0 ? w[i - 1] : "";
    const next = i < w.length - 1 ? w[i + 1] : "";

    if (c === prev && c !== "C") continue;

    switch (c) {
      case "B": if (prev !== "M") result += "B"; break;
      case "C":
        if ("EIY".includes(next)) result += "S";
        else result += "K";
        break;
      case "D":
        if (next === "G" && "EIY".includes(w[i + 2] || "")) result += "J";
        else result += "T";
        break;
      case "F": result += "F"; break;
      case "G":
        if (next === "H" && !"AEIOU".includes(w[i + 2] || "")) { i++; break; }
        if (i > 0 && "EIY".includes(next)) result += "J";
        else if (prev !== "G") result += "K";
        break;
      case "H":
        if ("AEIOU".includes(next) && !"AEIOU".includes(prev)) result += "H";
        break;
      case "J": result += "J"; break;
      case "K": if (prev !== "C") result += "K"; break;
      case "L": result += "L"; break;
      case "M": result += "M"; break;
      case "N": result += "N"; break;
      case "P":
        if (next === "H") { result += "F"; i++; }
        else result += "P";
        break;
      case "Q": result += "K"; break;
      case "R": result += "R"; break;
      case "S":
        if (next === "H" || (next === "I" && (w[i + 2] === "O" || w[i + 2] === "A"))) {
          result += "X"; i++;
        } else result += "S";
        break;
      case "T":
        if (next === "H") { result += "0"; i++; }
        else if (next === "I" && (w[i + 2] === "O" || w[i + 2] === "A")) {
          result += "X"; i++;
        } else result += "T";
        break;
      case "V": result += "F"; break;
      case "W": case "Y":
        if ("AEIOU".includes(next)) result += c;
        break;
      case "X": result += "KS"; break;
      case "Z": result += "S"; break;
      default:
        if (i === 0 && "AEIOU".includes(c)) result += c;
        break;
    }
  }
  return result;
}

export async function metaphoneEncode(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const words = text.split(/\s+/);
  const codes = words.map((w) => ({ word: w, metaphone: metaphone(w) }));

  const compare = typeof args.compare === "string" ? args.compare.trim() : "";
  let match: boolean | null = null;
  if (compare) {
    match = metaphone(words[0]) === metaphone(compare);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use compare parameter to check if two words sound alike"],
  };
  return stampMeta({ codes, ...(match !== null ? { match, compare } : {}) }, meta);
}
