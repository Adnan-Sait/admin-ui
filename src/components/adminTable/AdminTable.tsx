import useWindowSize from "../../hooks/useWindowSize";
import classes from "./AdminTable.module.css";

export default function AdminTable() {
  const { width } = useWindowSize();

  if (width <= 767) {
    return (
      <div>
        <div>
          <div>
            <input type="checkbox" />
          </div>

          <div>
            <div>Aaron Miles</div>
            <div>aaron@greektrust.com</div>
          </div>

          <div>Member</div>

          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <table className={classes["table"]}>
      <thead className={classes["table-thead"]}>
        <tr className={classes["table-tr"]}>
          <th className={classes["table-th"]}>
            <input type="checkbox" />
          </th>
          <th className={classes["table-th"]}>Name</th>
          <th className={classes["table-th"]}>Email</th>
          <th className={classes["table-th"]}>Role</th>
          <th className={classes["table-th"]}>Actions</th>
        </tr>
      </thead>
      <tbody className={classes["table-tbody"]}>
        <tr className={classes["table-tr"]}>
          <td className={classes["table-td"]}>
            <input type="checkbox" />
          </td>
          <td className={classes["table-td"]}>Aaron Miles</td>
          <td className={classes["table-td"]}>aaron@greektrust.com</td>
          <td className={classes["table-td"]}>Member</td>
          <td className={classes["table-td"]}>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
        <tr className={classes["table-tr"]}>
          <td className={classes["table-td"]}>
            <input type="checkbox" />
          </td>
          <td className={classes["table-td"]}>Aaron Miles</td>
          <td className={classes["table-td"]}>aaron@greektrust.com</td>
          <td className={classes["table-td"]}>Member</td>
          <td className={classes["table-td"]}>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
        <tr className={classes["table-tr"]}>
          <td className={classes["table-td"]}>
            <input type="checkbox" />
          </td>
          <td className={classes["table-td"]}>Aaron Miles</td>
          <td className={classes["table-td"]}>aaron@greektrust.com</td>
          <td className={classes["table-td"]}>Member</td>
          <td className={classes["table-td"]}>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
