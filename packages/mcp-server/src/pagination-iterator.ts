// Async pagination iterator.
// Wraps cursor-based and offset-based APIs into a simple async
// iterator so callers can just "for await" through all pages
// without managing pagination state themselves.

export interface PageResult<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export type PageFetcher<T> = (cursor: string | undefined, limit: number) => Promise<PageResult<T>>;

export interface PaginationOptions {
  limit?: number;
  maxPages?: number;
  maxItems?: number;
}

const DEFAULTS = {
  limit: 100,
  maxPages: 50,
  maxItems: 5000,
};

export async function* paginate<T>(
  fetcher: PageFetcher<T>,
  opts: PaginationOptions = {},
): AsyncGenerator<T[], void, undefined> {
  const limit = opts.limit ?? DEFAULTS.limit;
  const maxPages = opts.maxPages ?? DEFAULTS.maxPages;
  const maxItems = opts.maxItems ?? DEFAULTS.maxItems;

  let cursor: string | undefined;
  let pages = 0;
  let totalItems = 0;

  while (pages < maxPages && totalItems < maxItems) {
    const page = await fetcher(cursor, limit);
    if (page.items.length === 0) break;

    yield page.items;

    totalItems += page.items.length;
    pages++;

    if (!page.hasMore) break;
    cursor = page.nextCursor;
    if (cursor === undefined) break;
  }
}

export async function collectAll<T>(
  fetcher: PageFetcher<T>,
  opts: PaginationOptions = {},
): Promise<T[]> {
  const all: T[] = [];
  for await (const page of paginate(fetcher, opts)) {
    all.push(...page);
  }
  return all;
}

export async function collectFirst<T>(
  fetcher: PageFetcher<T>,
  count: number,
): Promise<T[]> {
  const items: T[] = [];
  for await (const page of paginate(fetcher, { maxItems: count })) {
    items.push(...page);
    if (items.length >= count) break;
  }
  return items.slice(0, count);
}
