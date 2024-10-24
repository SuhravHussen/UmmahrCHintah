import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  query: string;
  sort: string;
}

export function PaginationComponent({
  currentPage,
  totalPage,
  query,
  sort,
}: PaginationProps) {
  const generatePageLink = (pageNumber: number) => {
    let link = query
      ? `?page=${pageNumber}&query=${query}`
      : `?page=${pageNumber}`;
    if (sort) {
      link += `&sort=${sort}`;
    }
    return link;
  };

  const renderPageLinks = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1); // Start from 1 page before current
    const endPage = Math.min(totalPage, currentPage + 1); // End at 1 page after current

    // If current page is greater than 3, show ellipsis after the first page
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href={generatePageLink(1)}>1</PaginationLink>
        </PaginationItem>
      );
      pages.push(<PaginationEllipsis key="startEllipsis" />);
    }

    // Show links from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={generatePageLink(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // If current page is less than totalPage - 2, show ellipsis before the last page
    if (currentPage < totalPage - 2) {
      pages.push(<PaginationEllipsis key="endEllipsis" />);
      pages.push(
        <PaginationItem key={totalPage}>
          <PaginationLink href={generatePageLink(totalPage)}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {renderPageLinks()} {/* Dynamically render page links */}
      </PaginationContent>
    </Pagination>
  );
}
