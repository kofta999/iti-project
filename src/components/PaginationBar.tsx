import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types";
import { useNavigate } from "react-router-dom";

interface PaginationBarProps {
  pagination: PaginationType;
}

export default function PaginationBar({ pagination }: PaginationBarProps) {
  const navigate = useNavigate();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {pagination.page !== pagination.firstPage && (
            <PaginationFirst
              className="cursor-pointer"
              onClick={() => navigate(`?page=${pagination.firstPage}`)}
            />
          )}
        </PaginationItem>
        {pagination.prevPage && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => navigate(`?page=${pagination.prevPage}`)}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{pagination.page}</PaginationLink>
        </PaginationItem>
        {pagination.nextPage && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => navigate(`?page=${pagination.nextPage}`)}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          {pagination.page !== pagination.lastPage && (
            <PaginationLast
              className="cursor-pointer"
              onClick={() => navigate(`?page=${pagination.lastPage}`)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
