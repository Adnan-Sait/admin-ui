import classNames from "classnames";
import classes from "./RowCount.module.css";

type RowCountProps = {
  startCount: number;
  endCount: number;
  totalRecords: number;
  className?: string;
};

export default function RowCount({
  startCount,
  endCount,
  totalRecords,
  className,
}: RowCountProps) {
  return (
    <div className={classNames(className, classes["row-count"])}>
      <span>
        Showing {startCount} to {endCount} of {totalRecords} items
      </span>
    </div>
  );
}
