import classNames from "classnames";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import Button from "../../ui/Button/Button";
import ChevronLeft from "../../ui/icons/ChevronLeft";
import ChevronRight from "../../ui/icons/ChevronRight";
import DoubleChevronLeft from "../../ui/icons/DoubleChevronLeft";
import DoubleChevronRight from "../../ui/icons/DoubleChevronRight";

import classes from "./Pagination.module.css";

type PaginationProps = {
  itemsPerPage: number;
};

export default function Pagination({ itemsPerPage }: PaginationProps) {
  const { activePage, setActivePage, totalLength } = useAdminTableContext();

  const startPage = 1;
  const lastPage = Math.ceil(totalLength / itemsPerPage);
  const pages = generatePageNumbers();

  function generatePageNumbers() {
    const tempPages: number[] = [];
    for (let page = startPage; page <= lastPage; page++) {
      tempPages.push(page);
    }

    return tempPages;
  }

  function handleFirstPage() {
    setActivePage(1);
  }

  function handleLastPage() {
    setActivePage(lastPage);
  }

  function handlePreviousPage() {
    setActivePage((state) => {
      const prevPage = state > 0 ? state - 1 : 1;

      return prevPage;
    });
  }

  function handleNextPage() {
    setActivePage((state) => {
      const nextPage = state < lastPage ? state + 1 : lastPage;

      return nextPage;
    });
  }

  function handlePageSelection(selectedPage: number) {
    setActivePage(selectedPage);
  }

  return (
    <section className={classes.pagination}>
      <Button
        variant="secondary"
        onClick={handleFirstPage}
        disabled={activePage === 1}
      >
        <DoubleChevronLeft />
      </Button>
      <Button
        variant="secondary"
        onClick={handlePreviousPage}
        disabled={activePage === 1}
      >
        <ChevronLeft />
      </Button>
      {pages.map((num) => (
        <Button
          className={classNames({ [classes.active]: activePage === num })}
          variant="secondary"
          key={num}
          onClick={handlePageSelection.bind(null, num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="secondary"
        onClick={handleNextPage}
        disabled={activePage === lastPage}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="secondary"
        onClick={handleLastPage}
        disabled={activePage === lastPage}
      >
        <DoubleChevronRight />
      </Button>
    </section>
  );
}
