import Button from "../../ui/Button/Button";
import ChevronLeft from "../../ui/icons/ChevronLeft";
import ChevronRight from "../../ui/icons/ChevronRight";
import DoubleChevronLeft from "../../ui/icons/DoubleChevronLeft";
import DoubleChevronRight from "../../ui/icons/DoubleChevronRight";

import classes from "./Pagination.module.css";

type PaginationProps = {
  activePage: number;
  itemsPerPage: number;
  totalItems: number;
};

export default function Pagination({
  activePage,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const startPage = 1;
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const pages = generatePageNumbers();

  function generatePageNumbers() {
    const tempPages: number[] = [];
    for (let page = startPage; page <= lastPage; page++) {
      tempPages.push(page);
    }

    return tempPages;
  }

  return (
    <section className={classes.pagination}>
      <Button>
        <DoubleChevronLeft />
      </Button>
      <Button>
        <ChevronLeft />
      </Button>
      {pages.map((num) => (
        <Button key={num}>{num}</Button>
      ))}
      <Button>
        <ChevronRight />
      </Button>
      <Button>
        <DoubleChevronRight />
      </Button>
    </section>
  );
}
