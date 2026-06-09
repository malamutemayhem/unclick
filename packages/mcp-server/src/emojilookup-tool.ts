import { stampMeta } from "./connector-meta.js";

const EMOJI_LIST: [string, string][] = [
  ["\u{1F600}", "grinning face"], ["\u{1F601}", "beaming face"], ["\u{1F602}", "face with tears of joy"],
  ["\u{1F603}", "grinning face with big eyes"], ["\u{1F604}", "grinning face with smiling eyes"],
  ["\u{1F605}", "grinning face with sweat"], ["\u{1F606}", "grinning squinting face"],
  ["\u{1F609}", "winking face"], ["\u{1F60A}", "smiling face with smiling eyes"],
  ["\u{1F60D}", "smiling face with heart-eyes"], ["\u{1F60E}", "smiling face with sunglasses"],
  ["\u{1F60F}", "smirking face"], ["\u{1F610}", "neutral face"], ["\u{1F612}", "unamused face"],
  ["\u{1F614}", "pensive face"], ["\u{1F615}", "confused face"], ["\u{1F616}", "confounded face"],
  ["\u{1F618}", "face blowing a kiss"], ["\u{1F61B}", "face with tongue"],
  ["\u{1F61C}", "winking face with tongue"], ["\u{1F61D}", "squinting face with tongue"],
  ["\u{1F620}", "angry face"], ["\u{1F621}", "pouting face"], ["\u{1F622}", "crying face"],
  ["\u{1F623}", "persevering face"], ["\u{1F624}", "face with steam from nose"],
  ["\u{1F625}", "sad but relieved face"], ["\u{1F628}", "fearful face"],
  ["\u{1F629}", "weary face"], ["\u{1F62D}", "loudly crying face"],
  ["\u{1F631}", "face screaming in fear"], ["\u{1F633}", "flushed face"],
  ["\u{1F634}", "sleeping face"], ["\u{1F637}", "face with medical mask"],
  ["\u{1F44D}", "thumbs up"], ["\u{1F44E}", "thumbs down"], ["\u{1F44F}", "clapping hands"],
  ["\u{1F44B}", "waving hand"], ["\u{1F4AA}", "flexed biceps"], ["\u{1F64F}", "folded hands"],
  ["\u{2764}\u{FE0F}", "red heart"], ["\u{1F494}", "broken heart"], ["\u{1F525}", "fire"],
  ["\u{2B50}", "star"], ["\u{1F31F}", "glowing star"], ["\u{1F4A5}", "collision"],
  ["\u{2705}", "check mark"], ["\u{274C}", "cross mark"], ["\u{26A0}\u{FE0F}", "warning"],
  ["\u{1F389}", "party popper"], ["\u{1F388}", "balloon"], ["\u{1F381}", "wrapped gift"],
  ["\u{1F3C6}", "trophy"], ["\u{1F4B0}", "money bag"], ["\u{231A}", "watch"],
  ["\u{1F4F1}", "mobile phone"], ["\u{1F4BB}", "laptop"], ["\u{1F4E7}", "email"],
  ["\u{1F512}", "locked"], ["\u{1F513}", "unlocked"], ["\u{1F50D}", "magnifying glass"],
  ["\u{1F680}", "rocket"], ["\u{2708}\u{FE0F}", "airplane"], ["\u{1F30D}", "globe"],
  ["\u{1F332}", "evergreen tree"], ["\u{1F33B}", "sunflower"], ["\u{1F436}", "dog face"],
  ["\u{1F431}", "cat face"], ["\u{1F60E}", "cool"], ["\u{1F4AF}", "hundred points"],
];

export async function emojiLookup(args: Record<string, unknown>) {
  const query = String(args.query ?? "").toLowerCase().trim();
  if (!query) return { error: "query is required (search term like 'heart', 'fire', 'smile')" };
  const matches = EMOJI_LIST
    .filter(([, name]) => name.toLowerCase().includes(query))
    .map(([emoji, name]) => ({ emoji, name }));
  return stampMeta({
    query, matches, count: matches.length,
  }, {
    source: "local emoji lookup",
    fetched_at: new Date().toISOString(),
    next_steps: ["search by keyword like smile, heart, hand", "count shows number of matches"],
  });
}
