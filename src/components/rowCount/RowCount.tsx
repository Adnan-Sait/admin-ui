import classes from "./RowCount.module.css";

type RowCountProps = {
  startCount: number;
  totalCount: number;
  itemsPerPage: number;
};

export default function RowCount({
  startCount,
  totalCount,
  itemsPerPage,
}: RowCountProps) {
  const endCount = Math.min(totalCount, startCount + itemsPerPage - 1);

  return (
    <div className={classes["row-count"]}>
      <span>
        Showing {startCount} to {endCount} of {totalCount} items
      </span>
    </div>
  );
}
