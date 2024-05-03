import AdminSearch from "../adminSearch/AdminSearch";
import RowCount from "../rowCount/RowCount";

import classes from "./AdminHeader.module.css";

type AdminHeaderProps = {
  startItem: number;
  endItem: number;
  totalRecords: number;
};

export default function AdminHeader({
  startItem,
  endItem,
  totalRecords,
}: AdminHeaderProps) {
  return (
    <aside className={classes["admin-header"]}>
      <AdminSearch />
      {startItem > 0 && endItem > 0 && (
        <RowCount
          className={classes["row-count"]}
          startCount={startItem}
          endCount={endItem}
          totalRecords={totalRecords}
        />
      )}
    </aside>
  );
}
