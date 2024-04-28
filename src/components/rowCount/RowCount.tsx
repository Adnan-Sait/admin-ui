import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import classes from "./RowCount.module.css";

type RowCountProps = {
  startCount: number;
  endCount: number;
};

export default function RowCount({ startCount, endCount }: RowCountProps) {
  const { totalLength } = useAdminTableContext();

  return (
    <div className={classes["row-count"]}>
      <span>
        Showing {startCount} to {endCount} of {totalLength} items
      </span>
    </div>
  );
}
