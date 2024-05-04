import { MouseEvent, useEffect } from "react";
import classNames from "classnames";

import Button from "../../ui/Button/Button";
import ChevronLeft from "../../ui/icons/ChevronLeft";
import ChevronRight from "../../ui/icons/ChevronRight";
import DoubleChevronLeft from "../../ui/icons/DoubleChevronLeft";
import DoubleChevronRight from "../../ui/icons/DoubleChevronRight";

import classes from "./Pagination.module.css";

type PaginationProps = {
  activePage: number;
  itemsPerPage: number;
  totalCount: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  itemsPerPage,
  activePage,
  totalCount,
  setActivePage,
}: PaginationProps) {
  const startPage = 1;
  const lastPage = Math.ceil(totalCount / itemsPerPage);
  const pages = generatePageNumbers();

  useEffect(() => {
    if (activePage > lastPage) {
      setActivePage(lastPage);
    }
  }, [activePage, lastPage, setActivePage]);

  /**
   * Generates page numbers array.
   */
  function generatePageNumbers() {
    const tempPages: number[] = [];
    for (let page = startPage; page <= lastPage; page++) {
      tempPages.push(page);
    }

    return tempPages;
  }

  function handleFirstPage(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur();
    setActivePage(1);
  }

  function handleLastPage(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur();
    setActivePage(lastPage);
  }

  function handlePreviousPage(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur();
    setActivePage((state) => {
      const prevPage = Math.max(state - 1, 1);

      return prevPage;
    });
  }

  function handleNextPage(event: MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur();
    setActivePage((state) => {
      const nextPage = Math.min(state + 1, lastPage);

      return nextPage;
    });
  }

  function handlePageSelection(
    event: MouseEvent<HTMLButtonElement>,
    selectedPage: number
  ) {
    event.currentTarget.blur();
    setActivePage(selectedPage);
  }

  return (
    <section className={classes.pagination}>
      <Button
        variant="secondary"
        className="first-page"
        onClick={handleFirstPage}
        disabled={activePage === 1}
      >
        <span className="sr-only">Go to first page</span>
        <DoubleChevronLeft />
      </Button>
      <Button
        variant="secondary"
        className="previous-page"
        onClick={handlePreviousPage}
        disabled={activePage === 1}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      {pages.map((num) => (
        <Button
          className={classNames(num, { [classes.active]: activePage === num })}
          variant="secondary"
          key={num}
          onClick={(event) => handlePageSelection(event, num)}
        >
          <span className="sr-only">Go to page</span>
          {num}
        </Button>
      ))}
      <Button
        variant="secondary"
        className="next-page"
        onClick={handleNextPage}
        disabled={activePage === lastPage}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="secondary"
        className="last-page"
        onClick={handleLastPage}
        disabled={activePage === lastPage}
      >
        <span className="sr-only">Go to last page</span>
        <DoubleChevronRight />
      </Button>
    </section>
  );
}
