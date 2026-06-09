// xkcd webcomic API.
// No API key required - completely free and open.
// Base URL: https://xkcd.com/

import { stampMeta } from "./connector-meta.js";

const XKCD_BASE = "https://xkcd.com";
const XKCD_TIMEOUT_MS = Number(process.env.XKCD_TIMEOUT_MS) || 10000;

async function xkcdFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), XKCD_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`xkcd request timed out after ${XKCD_TIMEOUT_MS}ms.`);
    }
    throw new Error(`xkcd network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`xkcd rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`xkcd HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface XkcdComic {
  num: number;
  title: string;
  safe_title: string;
  alt: string;
  img: string;
  year: string;
  month: string;
  day: string;
  transcript: string;
  link: string;
}

function normalizeComic(c: XkcdComic) {
  return {
    number: c.num,
    title: c.title,
    alt_text: c.alt,
    image_url: c.img,
    date: `${c.year}-${c.month.padStart(2, "0")}-${c.day.padStart(2, "0")}`,
    transcript: c.transcript || null,
    link: c.link || null,
  };
}

export async function xkcdLatest(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await xkcdFetch<XkcdComic>(`${XKCD_BASE}/info.0.json`);
    return stampMeta(normalizeComic(data), {
      source: "xkcd",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use xkcd_comic with a number to read a specific comic.", "Use xkcd_random for a surprise."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function xkcdComic(args: Record<string, unknown>): Promise<unknown> {
  const num = Number(args.number ?? args.num ?? 0);
  if (!num || num < 1) return { error: "number is required (positive integer)." };
  try {
    const data = await xkcdFetch<XkcdComic>(`${XKCD_BASE}/${num}/info.0.json`);
    return stampMeta(normalizeComic(data), {
      source: "xkcd",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use xkcd_random for another comic.", "Use xkcd_latest for the newest."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function xkcdRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const latest = await xkcdFetch<XkcdComic>(`${XKCD_BASE}/info.0.json`);
    const randomNum = Math.floor(Math.random() * latest.num) + 1;
    const data = await xkcdFetch<XkcdComic>(`${XKCD_BASE}/${randomNum}/info.0.json`);
    return stampMeta(normalizeComic(data), {
      source: "xkcd",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use xkcd_comic with a number to read a specific comic."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
