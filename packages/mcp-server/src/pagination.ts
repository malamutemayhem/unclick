export interface PageInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export function paginate(totalItems: number, page: number = 1, pageSize: number = 20): PageInfo {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  return {
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex,
    endIndex,
  };
}

export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
  hasPrevPage: boolean;
}

export function cursorPaginate<T>(
  items: T[],
  pageSize: number,
  cursor: string | null,
  getCursor: (item: T) => string,
): CursorPage<T> {
  let startIndex = 0;
  if (cursor) {
    const idx = items.findIndex((item: T) => getCursor(item) === cursor);
    if (idx >= 0) startIndex = idx + 1;
  }
  const page = items.slice(startIndex, startIndex + pageSize);
  const nextCursor = startIndex + pageSize < items.length
    ? getCursor(page[page.length - 1])
    : null;
  return {
    items: page,
    nextCursor,
    hasPrevPage: startIndex > 0,
  };
}

export function pageRange(currentPage: number, totalPages: number, windowSize: number = 5): number[] {
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}
