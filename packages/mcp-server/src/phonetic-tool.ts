import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const IPA_MAP: Record<string, string> = {
  a: "eɪ", b: "biː", c: "siː", d: "diː", e: "iː", f: "ɛf",
  g: "dʒiː", h: "eɪtʃ", i: "aɪ", j: "dʒeɪ", k: "keɪ", l: "ɛl",
  m: "ɛm", n: "ɛn", o: "oʊ", p: "piː", q: "kjuː", r: "ɑːr",
  s: "ɛs", t: "tiː", u: "juː", v: "viː", w: "dʌbljuː", x: "ɛks",
  y: "waɪ", z: "ziː",
};

const NATO_MAP: Record<string, string> = {
  a: "Alpha", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo", f: "Foxtrot",
  g: "Golf", h: "Hotel", i: "India", j: "Juliet", k: "Kilo", l: "Lima",
  m: "Mike", n: "November", o: "Oscar", p: "Papa", q: "Quebec", r: "Romeo",
  s: "Sierra", t: "Tango", u: "Uniform", v: "Victor", w: "Whiskey", x: "X-ray",
  y: "Yankee", z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
};

export async function phoneticSpell(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const format = args.format === "ipa" ? "ipa" : "nato";
  const map = format === "ipa" ? IPA_MAP : NATO_MAP;

  const spelled = [...text].map((ch) => {
    const lower = ch.toLowerCase();
    return { char: ch, phonetic: map[lower] || ch };
  });

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use format: ipa for IPA letter names", "Default is NATO phonetic alphabet"],
  };
  return stampMeta({
    input: text,
    format,
    spelled,
    phonetic_string: spelled.map((s) => s.phonetic).join(" "),
  }, meta);
}
