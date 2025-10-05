export function paginate<T>(
  items: T[],
  currentPage: number = 1,
  pageSize: number = 10,
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const page = Math.max(1, currentPage);
  const size = Math.max(1, pageSize);

  const start = (page - 1) * size;
  const data = items.slice(start, start + size);

  return {
    data,
    currentPage: page,
    pageSize: size,
    total,
    totalPages,
  };
}
