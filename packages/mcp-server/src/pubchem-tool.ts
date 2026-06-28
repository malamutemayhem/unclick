import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
const TIMEOUT_MS = 12_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function pubchemSearch(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name (compound name) is required." };
  const data = await fetchJson(`${BASE}/compound/name/${encodeURIComponent(name)}/JSON`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ compound: data }, { source: "pubchem.ncbi.nlm.nih.gov", fetched_at: new Date().toISOString(), next_steps: ["Search by compound name (e.g. 'aspirin', 'caffeine', 'water').", "Use pubchem_properties for specific properties of a compound."] });
}

export async function pubchemProperties(args: Record<string, unknown>) {
  const cid = String(args.cid || "");
  if (!cid) return { error: "cid (PubChem Compound ID) is required." };
  const props = String(args.properties || "MolecularFormula,MolecularWeight,IUPACName,IsomericSMILES");
  const data = await fetchJson(`${BASE}/compound/cid/${encodeURIComponent(cid)}/property/${encodeURIComponent(props)}/JSON`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ properties: data }, { source: "pubchem.ncbi.nlm.nih.gov", fetched_at: new Date().toISOString(), next_steps: ["Available properties: MolecularFormula, MolecularWeight, IUPACName, IsomericSMILES, InChI, XLogP, HBondDonorCount, HBondAcceptorCount."] });
}
