'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
  const searchParams = useSearchParams();

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('currentPage', String(page));
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
      <Link
        href={createPageLink(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 aria-disabled:opacity-50 hover:bg-purple-500/20 aria-disabled:pointer-events-none"
      >
        Prev
      </Link>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={createPageLink(page)}
            aria-disabled={currentPage === page}
            className={`px-4 py-2 text-sm rounded-md ${
              page === currentPage
                ? 'bg-purple dark:bg-purple-500 text-white pointer-events-none'
                : 'bg-gray-100 hover:bg-purple-500/20 dark:hover:bg-purple-500/50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageLink(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 aria-disabled:opacity-50 hover:bg-purple-500/20 aria-disabled:pointer-events-none"
      >
        Next
      </Link>
    </div>
  );
};
