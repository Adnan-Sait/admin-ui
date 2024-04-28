import { ChangeEvent, FormEvent, useRef } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import Button from "../../ui/Button/Button";
import CloseMark from "../../ui/icons/CloseMark";
import MagnifyingGlass from "../../ui/icons/MagnifyingGlass";

import classes from "./AdminSearch.module.css";

export default function AdminSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [params, setParams] = useQueryParams();
  const searchInput = params.get("search") ?? "";

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const val = inputRef.current?.value ?? "";

    updateSearchParam(val);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const val = event.target.value.trim();
    updateSearchParam(val);
  }

  function updateSearchParam(searchText: string) {
    setParams((state) => {
      if (searchText) {
        state.set("search", searchText);
      } else {
        state.delete("search");
      }
      return state;
    });
  }

  function handleSearchClear() {
    inputRef.current?.focus();
    setParams((state) => {
      state.delete("search");
      return state;
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
        value={searchInput}
        onChange={handleSearchInput}
      />

      <section className={classes["search-icon-group"]}>
        {searchInput.length > 0 && (
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
          className={classes["search-icon"]}
          aria-label="Search for"
        >
          <MagnifyingGlass />
        </Button>
      </section>
    </form>
  );
}
