import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types";

interface PaginationBarProps {
  pagination: PaginationType;
}

export default function PaginationBar({ pagination }: PaginationBarProps) {
  return (
    <Pagination>
      <PaginationContent>
        {pagination.prevPage && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${pagination.prevPage}`} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{pagination.page}</PaginationLink>
        </PaginationItem>
        {pagination.nextPage && (
          <PaginationItem>
            <PaginationNext href={`?page=${pagination.nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
