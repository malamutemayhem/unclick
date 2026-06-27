export interface Page<T> {
  items: T[];
  cursor: string | null;
  hasMore: boolean;
  total?: number;
}

export class CursorPaginator<T> {
  private items: T[];
  private pageSize: number;
  private getCursor: (item: T) => string;

  constructor(items: T[], pageSize: number, getCursor: (item: T) => string) {
    this.items = items;
    this.pageSize = pageSize;
    this.getCursor = getCursor;
  }

  getPage(afterCursor?: string): Page<T> {
    let startIdx = 0;
    if (afterCursor) {
      const idx = this.items.findIndex((item) => this.getCursor(item) === afterCursor);
      if (idx >= 0) startIdx = idx + 1;
    }
    const pageItems = this.items.slice(startIdx, startIdx + this.pageSize);
    const hasMore = startIdx + this.pageSize < this.items.length;
    const cursor = pageItems.length > 0 ? this.getCursor(pageItems[pageItems.length - 1]) : null;
    return { items: pageItems, cursor, hasMore, total: this.items.length };
  }

  getAllPages(): Page<T>[] {
    const pages: Page<T>[] = [];
    let cursor: string | undefined;
    while (true) {
      const page = this.getPage(cursor);
      pages.push(page);
      if (!page.hasMore || !page.cursor) break;
      cursor = page.cursor;
    }
    return pages;
  }

  get totalItems(): number {
    return this.items.length;
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }
}

export function paginateArray<T>(items: T[], page: number, pageSize: number): { items: T[]; page: number; totalPages: number; total: number } {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    totalPages: Math.ceil(items.length / pageSize),
    total: items.length,
  };
}
