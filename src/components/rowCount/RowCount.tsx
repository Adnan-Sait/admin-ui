import classes from "./RowCount.module.css";

type RowCountProps = {
  startCount: number;
  endCount: number;
  totalRecords: number;
};

export default function RowCount({
  startCount,
  endCount,
  totalRecords,
}: RowCountProps) {
  return (
    <div className={classes["row-count"]}>
      <span>
        Showing {startCount} to {endCount} of {totalRecords} items
      </span>
    </div>
  );
}
