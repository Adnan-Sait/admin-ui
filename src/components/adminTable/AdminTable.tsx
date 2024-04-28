import {
  ChangeEvent,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";

import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import { User } from "../../page/admin/AdminPage";
import Button from "../../ui/Button/Button";
import PencilSquare from "../../ui/icons/PencilSquare";
import Trash from "../../ui/icons/Trash";

import classes from "./AdminTable.module.css";
import Check from "../../ui/icons/Check";
import CloseMark from "../../ui/icons/CloseMark";

type AdminTableProps = {
  membersList: User[] | undefined;
};

/**
 * Conditionally adds a form element to wrap the children.
 */
function FormTableWrapper({
  children,
  isForm,
  onSubmit,
}: PropsWithChildren<{
  isForm: boolean;
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
}>) {
  if (isForm) {
    return <form onSubmit={onSubmit}>{children}</form>;
  }

  return <>{children}</>;
}

export default function AdminTable({ membersList }: AdminTableProps) {
  const { removeMembers } = useAdminTableContext();

  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(
    new Set()
  );
  const [newMemberDetails, setNewMemberDetails] = useState<User | null>(null);

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

  function handleEditUser(member: User) {
    setNewMemberDetails(null);
    setNewMemberDetails({ ...member });
  }

  function handleMemberUpdate(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();

    console.log(event.nativeEvent.submitter?.getAttribute("data-edit-element"));
  }

  function handleCloseEdit() {
    setNewMemberDetails(null);
  }

  function renderUserRow(user: User) {
    if (newMemberDetails?.id === user.id) {
      return renderEditRows(newMemberDetails);
    }

    return renderDetailsRow(user);
  }

  function renderDetailsRow(user: User) {
    return (
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
        <td className={classNames(classes["table-td"], classes["td-role"])}>
          {user.role}
        </td>
        <td className={classes["table-td"]}>
          <div className={classes["button-wrapper"]}>
            <Button variant="icon" onClick={handleEditUser.bind(null, user)}>
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
    );
  }

  function renderEditRows(user: User) {
    return (
      // Using a separate key to ensure that the `edit` event does not propogate to the form as submit event.
      <tr className={classes["table-tr"]} key={`${user.id}-edit`}>
        <td className={classNames(classes["table-td"], "text-center")}></td>
        <td className={classes["table-td"]}>
          <input type="text" name="name" value={user.name} />
        </td>
        <td className={classes["table-td"]}>
          <input type="text" name="email" value={user.email} />
        </td>
        <td className={classNames(classes["table-td"], classes["td-role"])}>
          <select name="role" value={user.role}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td className={classes["table-td"]}>
          <div className={classes["button-wrapper"]}>
            <Button variant="icon" data-edit-element="1" type="submit">
              <Check />
            </Button>
            <Button
              variant="icon"
              className={classes["trash-icon"]}
              onClick={handleCloseEdit}
            >
              <CloseMark />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <FormTableWrapper
      isForm={newMemberDetails ? true : false}
      onSubmit={handleMemberUpdate}
    >
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
          {membersList?.map((user) => renderUserRow(user))}
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
    </FormTableWrapper>
  );
}
