import classNames from "classnames";
import classes from "./AdminTable.module.css";
import { User } from "../../page/admin/AdminPage";
import Button from "../../ui/Button/Button";
import PencilSquare from "../../ui/icons/PencilSquare";
import Trash from "../../ui/icons/Trash";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";

type AdminTableProps = {
  membersList: User[] | undefined;
};

export default function AdminTable({ membersList }: AdminTableProps) {
  const { removeMembers, updateMember } = useAdminTableContext();

  function handleMemberDelete(memberId: string) {
    removeMembers([memberId]);
  }

  return (
    <table className={classes["table"]}>
      <thead className={classes["table-thead"]}>
        <tr className={classes["table-tr"]}>
          <th className={classNames(classes["table-th"], "text-center")}>
            <input type="checkbox" />
          </th>
          <th className={classes["table-th"]}>Name</th>
          <th className={classes["table-th"]}>Email</th>
          <th className={classes["table-th"]}>Role</th>
          <th className={classNames(classes["table-th"], "text-center")}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody className={classes["table-tbody"]}>
        {membersList?.map((user) => (
          <tr className={classes["table-tr"]} key={user.id}>
            <td className={classNames(classes["table-td"], "text-center")}>
              <input type="checkbox" />
            </td>
            <td className={classes["table-td"]}>{user.name}</td>
            <td className={classes["table-td"]}>{user.email}</td>
            <td className={classNames(classes["table-td"], classes["td-role"])}>
              {user.role}
            </td>
            <td className={classes["table-td"]}>
              <div className={classes["button-wrapper"]}>
                <Button variant="icon">
                  <PencilSquare />
                </Button>
                <Button
                  variant="icon"
                  className={classes["trash-icon"]}
                  onClick={handleMemberDelete.bind(null, user.id)}
                >
                  <Trash />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
