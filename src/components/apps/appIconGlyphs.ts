// Glyph selection for AppIcon. Built-in apps (no brand favicon) get a
// meaningful lucide icon instead of a bare letter: keyword families first
// (math, time, ciphers, graphs, text, ...), then the app's category. Kept out
// of AppIcon.tsx so the component file only exports a component.

import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  Calculator,
  CheckSquare,
  Clock,
  CloudSun,
  Code2,
  CreditCard,
  Dices,
  FileText,
  Gamepad2,
  Hash,
  Image as ImageGlyph,
  Lock,
  MapPin,
  MessageSquare,
  Music,
  Network,
  Newspaper,
  Palette,
  QrCode,
  Shield,
  ShoppingCart,
  Sparkles,
  Ticket,
  TrendingUp,
  Type,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Keyword glyphs, first match wins. Matched against "<slug> <name>" lowercased,
// so families of built-in tools share one recognisable symbol.
const KEYWORD_GLYPHS: Array<[RegExp, LucideIcon]> = [
  [/\bqr\b|qrserver/, QrCode],
  [/clock|time|epoch|countdown|timezone|date|cron/, Clock],
  [/color|colour|palette/, Palette],
  [/random|dice|shuffle|lorem|uuid|faker|yesno|coin.?flip/, Dices],
  [/cipher|rot13|vigenere|atbash|railfence|password|diceware|encrypt/, Lock],
  [/hash|crc32|checksum|soundex|metaphone/, Hash],
  [/graph|tree|path|sort|search|flow|scc|heap|trie|automaton|dijkstra|astar|bfs|dfs|union.?find|knapsack|matching|hull|toposort|fenwick|segment|suffix|lca|tsp|cluster|simplex|\bsat\b/, Network],
  [/text|string|word|char|palindrome|case|morse|braille|nato|phonetic|acronym|readab|slug|ipsum|diff|regex|token|ngram|tfidf|frequency|entropy/, Type],
  [/convert|converter|unit|base\b|roman|numeral|wavelength|pressure|temperature/, ArrowLeftRight],
  [/calc|math|matrix|prime|fib|gcd|lcm|percent|quadratic|stat|mean|variance|distribution|probabil|integral|derivative|equation|polynomial|number|integer|combinat|permutation|factorial|function|modular|theorem|series|root|interpol/, Calculator],
  [/json|csv|markdown|html|jwt|semver|cidr|encode|decode|base64|url/, Code2],
];

const CATEGORY_GLYPHS: Record<string, LucideIcon> = {
  "AI": Sparkles,
  "Developer & infra": Code2,
  "Money & payments": CreditCard,
  "Markets & crypto": TrendingUp,
  "Messaging & email": MessageSquare,
  "Social": Users,
  "News & reading": Newspaper,
  "Productivity": CheckSquare,
  "Shopping": ShoppingCart,
  "Music & video": Music,
  "Games & esports": Gamepad2,
  "Travel, maps & local": MapPin,
  "Weather & science": CloudSun,
  "Security": Shield,
  "Events & tickets": Ticket,
  "Content & CMS": FileText,
  "Books": BookOpen,
  "Images": ImageGlyph,
  "Utilities": Wrench,
  "Quality (XPass)": BadgeCheck,
};

/** Glyph an app resolves to when it has no favicon (null = letter chip). */
export function glyphFor(name: string, category: string, slug?: string): LucideIcon | null {
  const haystack = `${slug ?? ""} ${name}`.toLowerCase();
  for (const [pattern, icon] of KEYWORD_GLYPHS) {
    if (pattern.test(haystack)) return icon;
  }
  return CATEGORY_GLYPHS[category] ?? null;
}
