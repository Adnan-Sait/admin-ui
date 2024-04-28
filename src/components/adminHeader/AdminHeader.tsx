import Button from "../../ui/Button/Button";
import CloseMark from "../../ui/icons/CloseMark";
import MagnifyingGlass from "../../ui/icons/MagnifyingGlass";
import RowCount from "../rowCount/RowCount";
import classes from "./AdminHeader.module.css";

export default function AdminHeader() {
  return (
    <aside className={classes["admin-header"]}>
      <form className={classes["search-form"]}>
        <input
          className={classes["search-input"]}
          type="text"
          name="search"
          placeholder="Search by name, email or role"
        />

        <section className={classes["search-icon-group"]}>
          <Button
            variant="icon"
            type="reset"
            className={classes["clear-icon"]}
            aria-label="Clear search"
          >
            <CloseMark />
          </Button>
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
      <RowCount startCount={1} itemsPerPage={10} totalCount={52} />
    </aside>
  );
}
