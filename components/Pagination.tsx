import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPagePath = (page: number) => {
    if (page === 1) return basePath || '/';
    return `${basePath}/page/${page}`;
  };

  return (
    <nav className="pagination">
      {currentPage > 1 && (
        <Link
          href={getPagePath(currentPage - 1)}
          className="pagination-button"
          aria-label="Previous page"
        >
          ←
        </Link>
      )}

      <div className="pagination-numbers">
        {pages.map((page) => (
          <Link
            key={page}
            href={getPagePath(page)}
            className={`pagination-number ${
              page === currentPage ? 'active' : ''
            }`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getPagePath(currentPage + 1)}
          className="pagination-button"
          aria-label="Next page"
        >
          →
        </Link>
      )}
    </nav>
  );
}
