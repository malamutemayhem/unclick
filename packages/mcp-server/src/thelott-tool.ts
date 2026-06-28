// The Lott AU integration.
// Australian lottery results and jackpots. No authentication required.
// Supports Tattslotto, Oz Lotto, Powerball, Set for Life, Monday/Wednesday Lotto.
// The legacy REST API (api.thelott.com) was retired.
// Now uses the data API at data.api.thelott.com (POST-based, returns open draws).
// Public endpoint - no API key needed.

import { stampMeta } from "./connector-meta.js";

const LOTT_BASE = "https://data.api.thelott.com";

const GAME_PRODUCTS: Record<string, string> = {
  "tattslotto": "TattsLotto",
  "saturday-lotto": "TattsLotto",
  "saturday-tattslotto": "TattsLotto",
  "oz-lotto": "OzLotto",
  "ozlotto": "OzLotto",
  "powerball": "Powerball",
  "set-for-life": "SetForLife",
  "setforlife": "SetForLife",
  "monday-lotto": "MonWedLotto",
  "wednesday-lotto": "MonWedLotto",
};

const LOTT_TIMEOUT_MS = Number(process.env.LOTT_TIMEOUT_MS) || 10000;

async function lottPost(path: string, body: unknown): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOTT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${LOTT_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "UnClickMCP/1.0 (https://unclick.io)",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`The Lott API request timed out after ${LOTT_TIMEOUT_MS}ms.`);
    }
    throw new Error(`The Lott API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 404) throw new Error("Game or draw not found on The Lott data API.");
  if (res.status === 429) throw new Error("The Lott API rate limit exceeded.");
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`The Lott API HTTP ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

function resolveProduct(game: string): string {
  const lower = game.toLowerCase().replace(/\s+/g, "-");
  const product = GAME_PRODUCTS[lower];
  if (!product) {
    throw new Error(
      `Unknown game "${game}". Valid: ${Object.keys(GAME_PRODUCTS).join(", ")}`
    );
  }
  return product;
}

// ─── get_lott_results ─────────────────────────────────────────────────────────

export async function getLottResults(args: Record<string, unknown>): Promise<unknown> {
  try {
    const game = String(args.game ?? "powerball").trim();
    const product = resolveProduct(game);

    const reqBody: Record<string, unknown> = {
      CompanyId: "Tattersalls",
      MaxDrawCountPerProduct: 1,
      OptionalProductFilter: [product],
    };

    const data = await lottPost(
      "/sales/vmax/web/data/lotto/latestresults",
      reqBody,
    ) as Record<string, unknown>;

    const draws = (data["DrawResults"] ?? data["Draws"] ?? []) as Array<Record<string, unknown>>;
    const draw = draws[0];

    if (!draw) {
      return { error: `No results found for ${product}.` };
    }

    return stampMeta({
      game: product,
      draw_number: draw["DrawNumber"],
      draw_date: draw["DrawDate"],
      winning_numbers: draw["PrimaryNumbers"],
      supplementary_numbers: draw["SecondaryNumbers"],
      jackpot: draw["Jackpot"] ?? draw["Division1Amount"],
      division_results: draw["Dividends"] ?? draw["DivisionResults"],
    }, {
      source: "The Lott",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use lott_jackpots for current jackpots."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_lott_jackpots ────────────────────────────────────────────────────────

export async function getLottJackpots(args: Record<string, unknown>): Promise<unknown> {
  try {
    const games = args.games
      ? (Array.isArray(args.games) ? args.games as string[] : [String(args.games)])
      : ["powerball", "oz-lotto", "tattslotto", "set-for-life"];

    const products = games.map((g) => resolveProduct(g));

    const data = await lottPost(
      "/sales/vmax/web/data/lotto/opendraws",
      {
        CompanyId: "Tattersalls",
        MaxDrawCountPerProduct: 1,
        OptionalProductFilter: products,
      },
    ) as Record<string, unknown>;

    const draws = (data["Draws"] ?? data["DrawResults"] ?? []) as Array<Record<string, unknown>>;

    return {
      jackpots: draws.map((draw) => ({
        game: draw["ProductName"] ?? draw["ProductId"],
        draw_number: draw["DrawNumber"],
        draw_date: draw["DrawDate"] ?? draw["CloseDate"],
        jackpot: draw["Jackpot"] ?? draw["Division1Amount"],
        jackpot_guaranteed: draw["IsJackpotGuaranteed"] ?? false,
      })),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
