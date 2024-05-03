import { ChangeEvent, FormEvent, useRef } from "react";
import classNames from "classnames";

import useQueryParams from "../../hooks/useQueryParams";
import Button from "../../ui/Button/Button";
import CloseMark from "../../ui/icons/CloseMark";
import MagnifyingGlass from "../../ui/icons/MagnifyingGlass";

import classes from "./AdminSearch.module.css";

export default function AdminSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [params, updateParams] = useQueryParams();
  const searchTerm = params.get("search") ?? "";

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const val = inputRef.current?.value ?? "";

    updateSearchParam(val);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    updateSearchParam(val);
  }

  /**
   * Updates the search parameter.
   */
  function updateSearchParam(searchText: string) {
    updateParams((state) => {
      const updatedState = new Map(state);
      if (searchText && searchText.trim().length > 0) {
        updatedState.set("search", searchText);
      } else {
        updatedState.delete("search");
      }
      return updatedState;
    });
  }

  /**
   * Clears the search parameter.
   */
  function handleSearchClear() {
    inputRef.current?.focus();
    updateParams((state) => {
      const updatedState = new Map(state);
      updatedState.delete("search");
      return updatedState;
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className={classes["search-form"]}>
      <input
        ref={inputRef}
        className={classes["search-input"]}
        type="text"
        name="search"
        placeholder="Search by name, email or role"
        value={searchTerm}
        onChange={handleSearchInput}
      />

      <section className={classes["search-icon-group"]}>
        {searchTerm.length > 0 && (
          <Button
            variant="icon"
            type="button"
            className={classes["clear-icon"]}
            aria-label="Clear search"
            onClick={handleSearchClear}
          >
            <CloseMark />
          </Button>
        )}
        <Button
          variant="icon"
          type="submit"
          className={classNames("search-icon", classes["search-icon"])}
          aria-label={`Search for ${searchTerm}`}
        >
          <MagnifyingGlass />
        </Button>
      </section>
    </form>
  );
}
