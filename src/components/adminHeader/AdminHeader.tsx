import AdminSearch from "../adminSearch/AdminSearch";
import RowCount from "../rowCount/RowCount";
import classes from "./AdminHeader.module.css";

type AdminHeaderProps = {
  startItem: number;
  endItem: number;
};

export default function AdminHeader({ startItem, endItem }: AdminHeaderProps) {
  return (
    <aside className={classes["admin-header"]}>
      <AdminSearch />
      {startItem > 0 && endItem > 0 && (
        <RowCount startCount={startItem} endCount={endItem} />
      )}
    </aside>
  );
}
