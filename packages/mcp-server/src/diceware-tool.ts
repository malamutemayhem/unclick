import { stampMeta } from "./connector-meta.js";

export async function dicewarePassphrase(args: Record<string, unknown>) {
  const wordCount = Math.min(Math.max(Number(args.words) || 6, 3), 12);
  const separator = String(args.separator || "-");
  const wordList = [
    "abacus", "abbey", "absorb", "acid", "acme", "acre", "adapt", "adrift", "adult", "aerial",
    "afford", "agenda", "aisle", "alarm", "album", "alert", "alias", "alibi", "alien", "alley",
    "alpha", "amber", "ample", "anchor", "angel", "angle", "ankle", "anvil", "apart", "apple",
    "arena", "argue", "armor", "array", "arrow", "asset", "atlas", "attic", "audio", "avid",
    "bacon", "badge", "bagel", "baker", "balm", "banjo", "barge", "baron", "basin", "batch",
    "beach", "beard", "beast", "begin", "bench", "bevel", "birch", "blade", "blank", "blast",
    "blaze", "bliss", "block", "bloom", "board", "bonus", "booth", "bound", "brave", "bread",
    "brick", "bride", "brisk", "broad", "brook", "brush", "budge", "bulge", "bunch", "burst",
    "cabin", "cable", "camel", "candy", "cargo", "cedar", "chain", "chalk", "chaos", "charm",
    "chase", "cheap", "chess", "chief", "chord", "chunk", "claim", "clasp", "clean", "clerk",
    "cliff", "climb", "clock", "clone", "cloth", "cloud", "coach", "coast", "cobra", "comet",
    "coral", "couch", "cover", "crane", "crash", "crawl", "cream", "crest", "crisp", "cross",
    "crowd", "crush", "cubic", "curse", "curve", "cycle", "dairy", "dance", "dazed", "debug",
    "decay", "decoy", "delta", "demon", "depot", "depth", "derby", "digit", "disco", "ditch",
    "dodge", "donor", "donut", "doubt", "draft", "drain", "dread", "drift", "drink", "drone",
    "dryly", "dwarf", "eager", "eagle", "earth", "easel", "edgy", "eject", "elder", "elite",
    "ember", "empty", "endow", "enemy", "entry", "envoy", "equal", "error", "essay", "evade",
    "event", "exact", "exile", "exult", "fable", "facet", "faith", "fauna", "feast", "fence",
    "ferry", "fetch", "fiber", "field", "fifth", "fight", "filth", "final", "flame", "flask",
    "flock", "flood", "flora", "fluid", "flush", "focal", "forge", "forum", "fossil", "found",
    "frame", "fresh", "front", "frost", "fruit", "fungi", "gamma", "gauge", "ghost", "giant",
    "giddy", "gland", "gleam", "glide", "globe", "glyph", "golem", "gorge", "grace", "grain",
    "grant", "graph", "grasp", "gravel", "greed", "grief", "grill", "grind", "grove", "guard",
    "guess", "guide", "guilt", "guise", "haven", "hazel", "heart", "heist", "hiker", "hoist",
    "honor", "hover", "human", "humid", "humor", "hydro", "hyper", "ideal", "igloo", "image",
    "index", "inner", "input", "ivory", "jazzy", "jewel", "juice", "jumbo", "karma", "kayak",
    "knack", "knelt", "label", "lance", "latch", "layer", "leapt", "ledge", "legal", "lever",
    "liner", "linen", "llama", "lodge", "logic", "lotus", "lucky", "lunar", "lunch", "lunge",
    "macro", "manor", "maple", "marsh", "mason", "match", "mayor", "media", "mercy", "merit",
    "metal", "micro", "mimic", "minor", "mirth", "model", "modem", "moist", "molar", "month",
    "moral", "motor", "motto", "mount", "mourn", "muddy", "mural", "noble", "north", "notch",
    "novel", "nudge", "nylon", "oasis", "ocean", "olive", "omega", "onset", "opera", "orbit",
    "organ", "outer", "oxide", "ozone", "panel", "panic", "pasta", "patch", "pause", "pearl",
    "pedal", "penny", "phase", "photo", "piano", "pilot", "pixel", "pizza", "plank", "plaza",
    "plumb", "plume", "polar", "polka", "pouch", "pound", "power", "pride", "prism", "probe",
    "prong", "prose", "prowl", "prune", "psalm", "pulse", "punch", "pupil", "purge", "quail",
    "quest", "quota", "radar", "rally", "range", "rapid", "raven", "razor", "realm", "rebel",
    "reign", "relay", "relic", "remit", "repay", "rider", "ridge", "rigid", "risky", "rival",
    "river", "roast", "robot", "rogue", "roman", "royal", "rugby", "rumor", "rural", "rusty",
  ];
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const idx = Math.floor(Math.random() * wordList.length);
    words.push(wordList[idx]);
  }
  const passphrase = words.join(separator);
  return stampMeta(
    { passphrase, word_count: wordCount, separator, entropy_bits: Math.round(wordCount * Math.log2(wordList.length)) },
    { source: "local-diceware", fetched_at: new Date().toISOString(), next_steps: ["Increase word count for stronger passphrases.", "Change separator to space, period, or underscore."] },
  );
}
