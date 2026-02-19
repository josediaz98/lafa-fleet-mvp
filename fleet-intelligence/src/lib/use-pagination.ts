import { useState, useMemo, useEffect } from 'react';

interface UsePaginationOptions {
  pageSize?: number;
}

interface UsePaginationResult<T> {
  paginatedItems: T[];
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  pageSize: number;
  rangeStart: number;
  rangeEnd: number;
}

export function usePagination<T>(items: T[], options?: UsePaginationOptions): UsePaginationResult<T> {
  const pageSize = options?.pageSize ?? 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Reset to page 1 when items count changes (filter/tab/search)
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  // Clamp page if it exceeds totalPages
  const safePage = Math.min(currentPage, totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const rangeStart = items.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, items.length);

  return {
    paginatedItems,
    currentPage: safePage,
    totalPages,
    setPage: setCurrentPage,
    pageSize,
    rangeStart,
    rangeEnd,
  };
}
