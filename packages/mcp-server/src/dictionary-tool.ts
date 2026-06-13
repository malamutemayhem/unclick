// Free Dictionary API - word definitions, phonetics, and examples.
// No API key required - completely free and open.
// Base URL: https://api.dictionaryapi.dev/api/v2/

import { stampMeta } from "./connector-meta.js";

const DICTIONARY_BASE = "https://api.dictionaryapi.dev/api/v2";
const DICTIONARY_TIMEOUT_MS = Number(process.env.DICTIONARY_TIMEOUT_MS) || 10000;

interface PhoneticEntry {
  text?: string;
  audio?: string;
}

interface DefinitionEntry {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

interface MeaningEntry {
  partOfSpeech: string;
  definitions: DefinitionEntry[];
}

interface WordEntry {
  word: string;
  phonetic?: string;
  phonetics?: PhoneticEntry[];
  meanings?: MeaningEntry[];
}

async function dictFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DICTIONARY_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${DICTIONARY_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Free Dictionary API request timed out after ${DICTIONARY_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Free Dictionary API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Free Dictionary API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (res.status === 404) {
    throw new Error("WORD_NOT_FOUND");
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Free Dictionary API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

function normalizeEntry(entry: WordEntry) {
  return {
    word: entry.word,
    phonetic: entry.phonetic ?? null,
    phonetics: (entry.phonetics ?? []).map((p) => ({
      text: p.text ?? null,
      audio: p.audio ?? null,
    })),
    meanings: (entry.meanings ?? []).map((m) => ({
      partOfSpeech: m.partOfSpeech,
      definitions: m.definitions.map((d) => ({
        definition: d.definition,
        example: d.example ?? null,
        synonyms: d.synonyms ?? [],
        antonyms: d.antonyms ?? [],
      })),
    })),
  };
}

// ─── dictionary_lookup ────────────────────────────────────────────────────────
// GET /entries/en/{word}

export async function dictionaryLookup(args: Record<string, unknown>): Promise<unknown> {
  const word = String(args.word ?? "").trim();
  if (!word) return { error: "word is required." };

  try {
    const data = await dictFetch<WordEntry[]>(`/entries/en/${encodeURIComponent(word)}`);

    if (!data || data.length === 0) {
      return { error: `No definition found for "${word}".` };
    }

    const entry = normalizeEntry(data[0]);
    return stampMeta(entry, {
      source: "Free Dictionary API",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use dictionary_lookup_language to look up the same word in another language.",
      ],
    });
  } catch (err) {
    if (err instanceof Error && err.message === "WORD_NOT_FOUND") {
      return { error: `No definition found for "${word}".` };
    }
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── dictionary_lookup_language ───────────────────────────────────────────────
// GET /entries/{language}/{word}

export async function dictionaryLookupLanguage(args: Record<string, unknown>): Promise<unknown> {
  const word = String(args.word ?? "").trim();
  const language = String(args.language ?? "").trim();
  if (!word) return { error: "word is required." };
  if (!language) return { error: "language is required (e.g. es, fr, de, it, ja)." };

  try {
    const data = await dictFetch<WordEntry[]>(
      `/entries/${encodeURIComponent(language)}/${encodeURIComponent(word)}`,
    );

    if (!data || data.length === 0) {
      return { error: `No definition found for "${word}" in language "${language}".` };
    }

    const entry = normalizeEntry(data[0]);
    return stampMeta({ ...entry, language }, {
      source: "Free Dictionary API",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use dictionary_lookup for English definitions.",
        "Try a different language code if no results were returned.",
      ],
    });
  } catch (err) {
    if (err instanceof Error && err.message === "WORD_NOT_FOUND") {
      return { error: `No definition found for "${word}" in language "${language}".` };
    }
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
