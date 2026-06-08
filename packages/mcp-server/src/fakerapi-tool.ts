import { stampMeta } from "./connector-meta.js";

const BASE = "https://fakerapi.it/api/v2";
const TIMEOUT = 10_000;

export async function fakerPersons(args: Record<string, unknown>) {
  const quantity = Math.min(Number(args.quantity) || 5, 100);
  const locale = String(args.locale ?? "en_US");
  const url = `${BASE}/persons?_quantity=${quantity}&_locale=${encodeURIComponent(locale)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`FakerAPI persons ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `fakerapi.it persons quantity=${quantity}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["use data array for test fixtures", "try other resource types: companies, addresses, books"],
  });
}

export async function fakerCompanies(args: Record<string, unknown>) {
  const quantity = Math.min(Number(args.quantity) || 5, 100);
  const locale = String(args.locale ?? "en_US");
  const url = `${BASE}/companies?_quantity=${quantity}&_locale=${encodeURIComponent(locale)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`FakerAPI companies ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `fakerapi.it companies quantity=${quantity}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["use data array for test company fixtures", "check fields: name, email, phone, addresses"],
  });
}

export async function fakerTexts(args: Record<string, unknown>) {
  const quantity = Math.min(Number(args.quantity) || 3, 100);
  const characters = Number(args.characters) || 200;
  const url = `${BASE}/texts?_quantity=${quantity}&_characters=${characters}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`FakerAPI texts ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `fakerapi.it texts quantity=${quantity}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["use data array for placeholder content", "adjust _characters for length"],
  });
}
