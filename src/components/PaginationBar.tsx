import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
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
        {pagination.prevPage && (
          <PaginationItem>
            <PaginationPrevious
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
              onClick={() => navigate(`?page=${pagination.nextPage}`)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
