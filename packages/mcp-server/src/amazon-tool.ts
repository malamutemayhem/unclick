import { createHmac, createHash } from "crypto";

// ─── Marketplace configurations ─────────────────────────────────────────────

const MARKETPLACES: Record<string, { host: string; region: string; marketplace: string }> = {
  US: { host: "webservices.amazon.com",       region: "us-east-1", marketplace: "www.amazon.com" },
  CA: { host: "webservices.amazon.ca",        region: "us-east-1", marketplace: "www.amazon.ca" },
  MX: { host: "webservices.amazon.com.mx",    region: "us-east-1", marketplace: "www.amazon.com.mx" },
  BR: { host: "webservices.amazon.com.br",    region: "us-east-1", marketplace: "www.amazon.com.br" },
  UK: { host: "webservices.amazon.co.uk",     region: "eu-west-1", marketplace: "www.amazon.co.uk" },
  DE: { host: "webservices.amazon.de",        region: "eu-west-1", marketplace: "www.amazon.de" },
  FR: { host: "webservices.amazon.fr",        region: "eu-west-1", marketplace: "www.amazon.fr" },
  IT: { host: "webservices.amazon.it",        region: "eu-west-1", marketplace: "www.amazon.it" },
  ES: { host: "webservices.amazon.es",        region: "eu-west-1", marketplace: "www.amazon.es" },
  NL: { host: "webservices.amazon.nl",        region: "eu-west-1", marketplace: "www.amazon.nl" },
  SE: { host: "webservices.amazon.se",        region: "eu-west-1", marketplace: "www.amazon.se" },
  PL: { host: "webservices.amazon.pl",        region: "eu-west-1", marketplace: "www.amazon.pl" },
  BE: { host: "webservices.amazon.com.be",    region: "eu-west-1", marketplace: "www.amazon.com.be" },
  IN: { host: "webservices.amazon.in",        region: "eu-west-1", marketplace: "www.amazon.in" },
  JP: { host: "webservices.amazon.co.jp",     region: "us-west-2", marketplace: "www.amazon.co.jp" },
  AU: { host: "webservices.amazon.com.au",    region: "us-east-1", marketplace: "www.amazon.com.au" },
  SG: { host: "webservices.amazon.sg",        region: "us-east-1", marketplace: "www.amazon.sg" },
  AE: { host: "webservices.amazon.ae",        region: "eu-west-1", marketplace: "www.amazon.ae" },
  SA: { host: "webservices.amazon.sa",        region: "eu-west-1", marketplace: "www.amazon.sa" },
  TR: { host: "webservices.amazon.com.tr",    region: "eu-west-1", marketplace: "www.amazon.com.tr" },
};

interface AmazonCredentials {
  accessKey: string;
  secretKey: string;
  partnerTag: string;
  marketplace: string;
}

// ─── AWS Signature v4 ────────────────────────────────────────────────────────

function hmacSha256(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data, "utf8").digest();
}

function sha256Hex(data: string): string {
  return createHash("sha256").update(data, "utf8").digest("hex");
}

function getSigningKey(secretKey: string, dateStamp: string, region: string, service: string): Buffer {
  const kDate    = hmacSha256(`AWS4${secretKey}`, dateStamp);
  const kRegion  = hmacSha256(kDate, region);
  const kService = hmacSha256(kRegion, service);
  return hmacSha256(kService, "aws4_request");
}

function buildSignedHeaders(
  operation: string,
  bodyStr: string,
  creds: AmazonCredentials,
  host: string,
  region: string
): Record<string, string> {
  const service = "ProductAdvertisingAPI";
  const path = `/paapi5/${operation.toLowerCase()}`;

  const now = new Date();
  // Format: 20240115T123045Z
  const amzDate  = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dateStamp = amzDate.slice(0, 8);

  const payloadHash = sha256Hex(bodyStr);
  const target = `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`;

  // Headers must be sorted for canonical form
  const rawHeaders: Record<string, string> = {
    "content-encoding": "amz-1.0",
    "content-type":     "application/json; charset=utf-8",
    "host":             host,
    "x-amz-date":       amzDate,
    "x-amz-target":     target,
  };

  const sortedKeys = Object.keys(rawHeaders).sort();
  const canonicalHeaders = sortedKeys.map((k) => `${k}:${rawHeaders[k]}`).join("\n") + "\n";
  const signedHeaders    = sortedKeys.join(";");

  const canonicalRequest = [
    "POST",
    path,
    "", // no query string
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey  = getSigningKey(creds.secretKey, dateStamp, region, service);
  const signature   = hmacSha256(signingKey, stringToSign).toString("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${creds.accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return { ...rawHeaders, Authorization: authorization };
}

// ─── PA-API HTTP call ────────────────────────────────────────────────────────

async function paApiCall(
  operation: string,
  requestBody: Record<string, unknown>,
  creds: AmazonCredentials
): Promise<unknown> {
  const code   = creds.marketplace.toUpperCase();
  const config = MARKETPLACES[code] ?? MARKETPLACES["US"];
  const { host, region } = config;

  const bodyStr = JSON.stringify(requestBody);
  const headers = buildSignedHeaders(operation, bodyStr, creds, host, region);
  const url     = `https://${host}/paapi5/${operation.toLowerCase()}`;

  const response = await fetch(url, { method: "POST", headers, body: bodyStr });
  const data = await response.json() as unknown;

  if (!response.ok) {
    const err = data as Record<string, unknown>;
    const type   = (err.__type    as string | undefined) ?? `HTTP ${response.status}`;
    const detail = (err.message   as string | undefined) ?? JSON.stringify(data);
    throw new Error(`PA-API error (${type}): ${detail}`);
  }

  return data;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Standard resources for item lookups
const ITEM_RESOURCES = [
  "ItemInfo.Title",
  "ItemInfo.Features",
  "ItemInfo.ProductInfo",
  "ItemInfo.ByLineInfo",
  "Offers.Listings.Price",
  "Offers.Listings.Availability.Message",
  "Images.Primary.Large",
  "Images.Primary.Medium",
  "CustomerReviews.StarRating",
  "CustomerReviews.Count",
];

function cleanItem(item: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {
    asin:  item.ASIN ?? null,
    url:   (item.DetailPageURL as string | undefined) ?? null,
    title: null,
  };

  const info = item.ItemInfo as Record<string, unknown> | undefined;
  if (info) {
    const titleObj = info.Title as Record<string, unknown> | undefined;
    out.title = (titleObj?.DisplayValue as string | undefined) ?? null;

    const features = info.Features as Record<string, unknown> | undefined;
    if (Array.isArray(features?.DisplayValues)) {
      out.features = features!.DisplayValues;
    }

    const byLine = info.ByLineInfo as Record<string, unknown> | undefined;
    if (byLine) {
      const brand = byLine.Brand as Record<string, unknown> | undefined;
      if (brand?.DisplayValue) out.brand = brand.DisplayValue;
      const mfr = byLine.Manufacturer as Record<string, unknown> | undefined;
      if (mfr?.DisplayValue) out.manufacturer = mfr.DisplayValue;
    }

    const productInfo = info.ProductInfo as Record<string, unknown> | undefined;
    if (productInfo?.ItemDimensions) out.dimensions = productInfo.ItemDimensions;
  }

  const offers = item.Offers as Record<string, unknown> | undefined;
  const listings = offers?.Listings as Array<Record<string, unknown>> | undefined;
  if (listings && listings.length > 0) {
    const listing = listings[0];
    const price = listing.Price as Record<string, unknown> | undefined;
    if (price) {
      out.price = {
        amount:   price.Amount,
        currency: price.Currency,
        display:  price.DisplayAmount,
      };
    }
    const avail = listing.Availability as Record<string, unknown> | undefined;
    if (avail?.Message) out.availability = avail.Message;
  }

  const images = item.Images as Record<string, unknown> | undefined;
  const primary = images?.Primary as Record<string, unknown> | undefined;
  if (primary) {
    const large  = primary.Large  as Record<string, unknown> | undefined;
    const medium = primary.Medium as Record<string, unknown> | undefined;
    out.image = (large?.URL ?? medium?.URL) as string | undefined ?? null;
  }

  const reviews = item.CustomerReviews as Record<string, unknown> | undefined;
  if (reviews) {
    out.ratings = {
      stars: reviews.StarRating,
      count: reviews.Count,
    };
  }

  return out;
}

function extractCreds(args: Record<string, unknown>): AmazonCredentials | { error: string } {
  const accessKey  = String(args.access_key  ?? "").trim();
  const secretKey  = String(args.secret_key  ?? "").trim();
  const partnerTag = String(args.partner_tag ?? "").trim();
  const marketplace = String(args.marketplace ?? "US").trim().toUpperCase();

  if (!accessKey || !secretKey || !partnerTag) {
    return { error: "access_key, secret_key, and partner_tag are all required." };
  }
  return { accessKey, secretKey, partnerTag, marketplace };
}

function marketplaceBody(
  creds: AmazonCredentials,
  extra?: Record<string, unknown>
): Record<string, unknown> {
  const code   = creds.marketplace.toUpperCase();
  const config = MARKETPLACES[code] ?? MARKETPLACES["US"];
  return {
    PartnerTag:  creds.partnerTag,
    PartnerType: "Associates",
    Marketplace: config.marketplace,
    ...extra,
  };
}

// ─── Operations ──────────────────────────────────────────────────────────────

export async function amazonSearch(args: Record<string, unknown>): Promise<unknown> {
  const creds = extractCreds(args);
  if ("error" in creds) return creds;

  if (!args.keywords && !args.browse_node_id) {
    return { error: "Either keywords or browse_node_id is required." };
  }

  const body = marketplaceBody(creds, { Resources: ITEM_RESOURCES });
  if (args.keywords)        body.Keywords      = String(args.keywords);
  if (args.search_index)    body.SearchIndex   = String(args.search_index);
  if (args.browse_node_id)  body.BrowseNodeId  = String(args.browse_node_id);
  if (args.sort_by)         body.SortBy        = String(args.sort_by);
  if (args.min_price)       body.MinPrice      = Number(args.min_price);
  if (args.max_price)       body.MaxPrice      = Number(args.max_price);
  if (args.item_count)      body.ItemCount     = Math.min(10, Math.max(1, Number(args.item_count)));
  if (args.item_page)       body.ItemPage      = Math.min(10, Math.max(1, Number(args.item_page)));

  const data         = await paApiCall("SearchItems", body, creds) as Record<string, unknown>;
  const searchResult = data.SearchResult as Record<string, unknown> | undefined;
  if (!searchResult) return { items: [], total_result_count: 0 };

  const items = (searchResult.Items as Array<Record<string, unknown>> | undefined) ?? [];
  return {
    total_result_count: searchResult.TotalResultCount ?? items.length,
    items: items.map(cleanItem),
  };
}

export async function amazonProduct(args: Record<string, unknown>): Promise<unknown> {
  const creds = extractCreds(args);
  if ("error" in creds) return creds;

  const raw   = args.asins ?? args.asin;
  const asins = Array.isArray(raw) ? raw.map(String) : [String(raw ?? "")];

  if (!asins[0]) return { error: "At least one ASIN is required (use asin or asins)." };

  const body = marketplaceBody(creds, { ItemIds: asins, Resources: ITEM_RESOURCES });

  const data        = await paApiCall("GetItems", body, creds) as Record<string, unknown>;
  const itemsResult = data.ItemsResult as Record<string, unknown> | undefined;
  const items       = (itemsResult?.Items as Array<Record<string, unknown>> | undefined) ?? [];

  const errors = data.Errors as Array<Record<string, unknown>> | undefined;
  return {
    items: items.map(cleanItem),
    ...(errors && errors.length > 0 ? { errors: errors.map((e) => ({ asin: e.ItemId, message: e.Message })) } : {}),
  };
}

export async function amazonBrowse(args: Record<string, unknown>): Promise<unknown> {
  const creds = extractCreds(args);
  if ("error" in creds) return creds;

  const raw        = args.browse_node_ids ?? args.browse_node_id;
  const nodeIds    = Array.isArray(raw) ? raw.map(String) : [String(raw ?? "")];

  if (!nodeIds[0]) return { error: "At least one browse_node_id is required." };

  const body = marketplaceBody(creds, {
    BrowseNodeIds: nodeIds,
    Resources: ["BrowseNodes.Ancestor", "BrowseNodes.Children"],
  });

  const data   = await paApiCall("GetBrowseNodes", body, creds) as Record<string, unknown>;
  const result = data.BrowseNodesResult as Record<string, unknown> | undefined;
  const nodes  = (result?.BrowseNodes as Array<Record<string, unknown>> | undefined) ?? [];

  const cleanNode = (node: Record<string, unknown>): Record<string, unknown> => {
    const ancestor = node.Ancestor as Record<string, unknown> | undefined;
    const children = node.Children as Array<Record<string, unknown>> | undefined;
    return {
      id:                node.Id,
      name:              node.DisplayName,
      context_free_name: node.ContextFreeName,
      is_root:           node.IsRoot ?? false,
      ancestor:          ancestor
        ? { id: ancestor.Id, name: ancestor.DisplayName }
        : null,
      children: (children ?? []).map((c) => ({ id: c.Id, name: c.DisplayName })),
    };
  };

  return { browse_nodes: nodes.map(cleanNode) };
}

export async function amazonVariations(args: Record<string, unknown>): Promise<unknown> {
  const creds = extractCreds(args);
  if ("error" in creds) return creds;

  const asin = String(args.asin ?? "").trim();
  if (!asin) return { error: "asin is required." };

  const variationResources = [
    ...ITEM_RESOURCES,
    "VariationSummary.Price.HighestPrice",
    "VariationSummary.Price.LowestPrice",
    "VariationSummary.VariationDimension",
  ];

  const body = marketplaceBody(creds, { ASIN: asin, Resources: variationResources });
  if (args.variation_count) body.VariationCount = Math.min(10, Math.max(1, Number(args.variation_count)));
  if (args.variation_page)  body.VariationPage  = Math.min(10, Math.max(1, Number(args.variation_page)));

  const data   = await paApiCall("GetVariations", body, creds) as Record<string, unknown>;
  const result = data.VariationsResult as Record<string, unknown> | undefined;
  if (!result) return { asin, variations: [], variation_dimensions: [] };

  const items   = (result.Items as Array<Record<string, unknown>> | undefined) ?? [];
  const summary = result.VariationSummary as Record<string, unknown> | undefined;

  return {
    asin,
    variation_dimensions: (summary?.VariationDimension as unknown[]) ?? [],
    price_range: summary
      ? { lowest: summary.LowestPrice, highest: summary.HighestPrice }
      : null,
    variations: items.map(cleanItem),
  };
}
