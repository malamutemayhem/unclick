// Dog CEO API - random dog images by breed.
// No API key required - completely free and open.
// Base URL: https://dog.ceo/api/

import { stampMeta } from "./connector-meta.js";

const DOGCEO_BASE = "https://dog.ceo/api";
const DOGCEO_TIMEOUT_MS = Number(process.env.DOGCEO_TIMEOUT_MS) || 10000;

interface DogCeoResponse {
  message: unknown;
  status: string;
}

async function dogFetch<T = DogCeoResponse>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DOGCEO_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${DOGCEO_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Dog CEO request timed out after ${DOGCEO_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Dog CEO network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Dog CEO rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Dog CEO HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  const data = (await res.json()) as DogCeoResponse;
  if (data.status === "error") {
    throw new Error(`Dog CEO API error: ${String(data.message).slice(0, 200)}`);
  }
  return data as T;
}

// ─── dog_random_image ────────────────────────────────────────────────────────
// GET /breeds/image/random or /breeds/image/random/{count}

export async function dogRandomImage(args: Record<string, unknown>): Promise<unknown> {
  try {
    const count = args.count != null ? Math.min(50, Math.max(1, Number(args.count))) : undefined;

    if (count && count > 1) {
      const data = await dogFetch(`/breeds/image/random/${count}`);
      const urls = data.message as string[];
      return stampMeta({
        count: urls.length,
        image_urls: urls,
      }, {
        source: "Dog CEO",
        fetched_at: new Date().toISOString(),
        next_steps: ["Use dog_breed_image to get images of a specific breed, or dog_list_breeds to browse all breeds."],
      });
    }

    const data = await dogFetch("/breeds/image/random");
    return stampMeta({
      image_url: data.message as string,
    }, {
      source: "Dog CEO",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use dog_breed_image to get images of a specific breed, or dog_list_breeds to browse all breeds."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── dog_breed_image ─────────────────────────────────────────────────────────
// GET /breed/{breed}/images/random or /breed/{breed}/images/random/{count}
// For sub-breeds like "bulldog/french", the URL is /breed/bulldog/french/images/random

export async function dogBreedImage(args: Record<string, unknown>): Promise<unknown> {
  try {
    const breed = String(args.breed ?? "").trim().toLowerCase();
    if (!breed) return { error: "breed is required (e.g. hound, bulldog/french)." };

    const count = args.count != null ? Math.min(50, Math.max(1, Number(args.count))) : undefined;
    const breedPath = breed.replace(/\s+/g, "/");

    if (count && count > 1) {
      const data = await dogFetch(`/breed/${breedPath}/images/random/${count}`);
      const urls = data.message as string[];
      return stampMeta({
        breed,
        count: urls.length,
        image_urls: urls,
      }, {
        source: "Dog CEO",
        fetched_at: new Date().toISOString(),
        next_steps: ["Use dog_breed_list to see sub-breeds, or dog_list_breeds to browse all breeds."],
      });
    }

    const data = await dogFetch(`/breed/${breedPath}/images/random`);
    return stampMeta({
      breed,
      image_url: data.message as string,
    }, {
      source: "Dog CEO",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use dog_breed_list to see sub-breeds, or dog_list_breeds to browse all breeds."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── dog_list_breeds ─────────────────────────────────────────────────────────
// GET /breeds/list/all

export async function dogListBreeds(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await dogFetch("/breeds/list/all");
    const breedsMap = data.message as Record<string, string[]>;
    const breeds = Object.entries(breedsMap).map(([name, sub_breeds]) => ({
      name,
      sub_breeds,
    }));

    return stampMeta({
      count: breeds.length,
      breeds,
    }, {
      source: "Dog CEO",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use dog_breed_image to get images of a specific breed, or dog_breed_list to see sub-breeds."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── dog_breed_list ──────────────────────────────────────────────────────────
// GET /breed/{breed}/list

export async function dogBreedList(args: Record<string, unknown>): Promise<unknown> {
  try {
    const breed = String(args.breed ?? "").trim().toLowerCase();
    if (!breed) return { error: "breed is required (e.g. bulldog, hound)." };

    const data = await dogFetch(`/breed/${breed}/list`);
    const subBreeds = data.message as string[];

    return stampMeta({
      breed,
      count: subBreeds.length,
      sub_breeds: subBreeds,
    }, {
      source: "Dog CEO",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use dog_breed_image with breed/sub-breed (e.g. bulldog/french) to get images of a sub-breed."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
