import {
  ChangeEvent,
  MouseEvent,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import { User, userRole } from "../../page/admin/AdminPage";
import Button from "../../ui/Button/Button";
import PencilSquare from "../../ui/icons/PencilSquare";
import Trash from "../../ui/icons/Trash";

import classes from "./AdminTable.module.css";
import Check from "../../ui/icons/Check";
import CloseMark from "../../ui/icons/CloseMark";
import useAppContext from "../../hooks/context/useAppContext";

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
  const tableRef = useRef<HTMLTableElement | null>(null);

  const { toastDispatch } = useAppContext();
  const { activePage, removeMembers, updateMember } = useAdminTableContext();

  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(
    new Set()
  );
  const [editId, setEditId] = useState<string | null>(null);

  const membersListLength = membersList?.length ?? 0;

  useEffect(() => {
    setSelectedMemberIds(new Set());
  }, [membersList]);

  useEffect(() => {
    tableRef.current?.focus();
  }, [activePage]);

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

  function handleMemberDelete(member: User) {
    removeMembers([member.id]);
    toastDispatch({
      type: "setToastData",
      payload: {
        toastTitle: `User '${member.name}' has been deleted `,
        toastVariant: "primary",
      },
    });
  }

  function deleteSelectedMembers() {
    if (selectedMemberIds.size === 0) return;

    removeMembers(Array.from(selectedMemberIds));
    toastDispatch({
      type: "setToastData",
      payload: {
        toastTitle: `${selectedMemberIds.size} Member(s) deleted`,
        toastVariant: "primary",
      },
    });
  }

  function handleEditUser(event: MouseEvent<HTMLButtonElement>, member: User) {
    event.preventDefault();

    setEditId(member.id);
  }

  function handleMemberUpdate(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();

    const formEl = event.currentTarget;
    const name = (formEl.elements.namedItem("name") as HTMLInputElement).value;
    const email = (formEl.elements.namedItem("email") as HTMLInputElement)
      .value;
    const role = (formEl.elements.namedItem("role") as HTMLSelectElement)
      .value as userRole;

    if (!editId) return;

    const updatedMember: User = {
      id: editId,
      name,
      email,
      role,
    };

    updateMember(updatedMember);
    setEditId(null);
    toastDispatch({
      type: "setToastData",
      payload: {
        toastTitle: `User '${updatedMember.name}' has been updated `,
        toastVariant: "primary",
      },
    });
  }

  function handleCloseEdit() {
    setEditId(null);
  }

  function renderUserRow(user: User) {
    if (editId === user.id) {
      return renderEditRows(user);
    }

    return renderDetailsRow(user);
  }

  function renderDetailsRow(user: User) {
    return (
      <>
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
            <Button
              variant="icon"
              onClick={(event) => handleEditUser(event, user)}
            >
              <PencilSquare />
            </Button>
            <Button
              variant="icon"
              className={classes["trash-icon"]}
              onClick={handleMemberDelete.bind(null, user)}
            >
              <Trash />
            </Button>
          </div>
        </td>
      </>
    );
  }

  function renderEditRows(user: User) {
    return (
      // Using a separate key to ensure that the `edit` event does not propogate to the form as submit event.
      <>
        <td className={classNames(classes["table-td"], "text-center")}></td>
        <td className={classes["table-td"]}>
          <input
            className={classes["form-input"]}
            autoFocus
            type="text"
            name="name"
            defaultValue={user.name}
          />
        </td>
        <td className={classes["table-td"]}>
          <input
            className={classes["form-input"]}
            type="text"
            name="email"
            defaultValue={user.email}
          />
        </td>
        <td className={classNames(classes["table-td"], classes["td-role"])}>
          <select
            className={classes["form-input"]}
            name="role"
            defaultValue={user.role}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td className={classes["table-td"]}>
          <div className={classes["button-wrapper"]}>
            <Button variant="icon" type="submit">
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
      </>
    );
  }

  return (
    <FormTableWrapper
      isForm={editId ? true : false}
      onSubmit={handleMemberUpdate}
    >
      <table className={classes["table"]} ref={tableRef} tabIndex={-1}>
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
            <tr
              className={classNames(classes["table-tr"], {
                [classes["selected-row"]]: selectedMemberIds.has(user.id),
              })}
              key={user.id}
            >
              {renderUserRow(user)}
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
            {selectedMemberIds.size > 0 && (
              <span>
                ({selectedMemberIds.size} member
                {selectedMemberIds.size > 1 ? "s" : ""})
              </span>
            )}
          </Button>
        </div>
      )}
    </FormTableWrapper>
  );
}
