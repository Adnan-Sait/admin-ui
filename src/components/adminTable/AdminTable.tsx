import { User } from "../../page/admin/AdminPage";
import classes from "./AdminTable.module.css";

type AdminTableProps = {
  membersList: User[] | null;
};

export default function AdminTable({ membersList }: AdminTableProps) {
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
        {membersList?.map((user) => (
          <tr className={classes["table-tr"]} key={user.id}>
            <td className={classes["table-td"]}>
              <input type="checkbox" />
            </td>
            <td className={classes["table-td"]}>{user.name}</td>
            <td className={classes["table-td"]}>{user.email}</td>
            <td className={classes["table-td"]}>{user.role}</td>
            <td className={classes["table-td"]}>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
