import { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";

import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import { User } from "../../page/admin/AdminPage";
import Button from "../../ui/Button/Button";
import PencilSquare from "../../ui/icons/PencilSquare";
import Trash from "../../ui/icons/Trash";

import classes from "./AdminTable.module.css";

type AdminTableProps = {
  membersList: User[] | undefined;
};

export default function AdminTable({ membersList }: AdminTableProps) {
  const { removeMembers } = useAdminTableContext();

  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(
    new Set()
  );

  const membersListLength = membersList?.length ?? 0;

  useEffect(() => {
    setSelectedMemberIds(new Set());
  }, [membersList]);

  function handleMemberDelete(memberId: string) {
    removeMembers([memberId]);
  }

  function handleSelectMember(
    event: ChangeEvent<HTMLInputElement>,
    memberId: string
  ) {
    if (event.target.checked) {
      setSelectedMemberIds((state) => {
        const newSet = new Set(state);
        newSet.add(memberId);

        return newSet;
      });
    } else {
      setSelectedMemberIds((state) => {
        const newSet = new Set(state);
        newSet.delete(memberId);

        return newSet;
      });
    }
  }

  function handleSelectAllMembers(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const memberIds = membersList?.map((item) => item.id) || [];
      setSelectedMemberIds(new Set(memberIds));
    } else {
      setSelectedMemberIds(new Set());
    }
  }

  function deleteSelectedMembers() {
    removeMembers(Array.from(selectedMemberIds));
  }

  return (
    <>
      <table className={classes["table"]}>
        <thead className={classes["table-thead"]}>
          <tr className={classes["table-tr"]}>
            <th className={classNames(classes["table-th"], "text-center")}>
              {membersListLength > 0 && (
                <input
                  type="checkbox"
                  onChange={handleSelectAllMembers}
                  checked={selectedMemberIds.size === membersList?.length}
                />
              )}
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
                <input
                  type="checkbox"
                  checked={selectedMemberIds.has(user.id)}
                  onChange={(event) => handleSelectMember(event, user.id)}
                />
              </td>
              <td className={classes["table-td"]}>{user.name}</td>
              <td className={classes["table-td"]}>{user.email}</td>
              <td
                className={classNames(classes["table-td"], classes["td-role"])}
              >
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

      {membersListLength > 0 && (
        <div className={classes["delete-btn-wrapper"]}>
          <Button
            variant="danger"
            className={classes["delete-button"]}
            disabled={selectedMemberIds.size === 0}
            onClick={deleteSelectedMembers}
          >
            <span>Delete </span>
            <span>
              ({selectedMemberIds.size} member
              {selectedMemberIds.size > 1 ? "s" : ""})
            </span>
          </Button>
        </div>
      )}
    </>
  );
}
