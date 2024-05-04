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

import useAppContext from "../../hooks/context/useAppContext";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import useWindowSize from "../../hooks/useWindowSize";
import { User, userRole } from "../../page/admin/AdminPage";
import AdminTableCell from "./AdminTableCell/AdminTableCell";
import Button from "../../ui/Button/Button";
import PencilSquare from "../../ui/icons/PencilSquare";
import Trash from "../../ui/icons/Trash";
import Check from "../../ui/icons/Check";
import CloseMark from "../../ui/icons/CloseMark";
import UserGear from "../../ui/icons/UserGear";
import UserIcon from "../../ui/icons/User";

import classes from "./AdminTable.module.css";

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
  const selectAllCheckboxRef = useRef<HTMLInputElement | null>(null);

  const { toastDispatch } = useAppContext();
  const { removeMembers, updateMember } = useAdminTableContext();

  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(
    new Set()
  );
  const [editId, setEditId] = useState<string | null>(null);

  const { width: windowWidth } = useWindowSize();

  const isMobile = windowWidth !== null && windowWidth <= 768;
  const membersListLength = membersList?.length ?? 0;

  // When members list changes, clear the selection.
  useEffect(() => {
    setEditId(null);
    setSelectedMemberIds(new Set());
  }, [membersList]);

  // Sets the 'indeterminate' state on the checkbox.
  useEffect(() => {
    if (!selectAllCheckboxRef.current) return;

    const isIndeterminate =
      selectedMemberIds.size > 0 && selectedMemberIds.size < membersListLength;
    selectAllCheckboxRef.current.indeterminate = isIndeterminate;
  }, [selectedMemberIds, membersListLength]);

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
        toastTitle: `${selectedMemberIds.size} user(s) deleted`,
        toastVariant: "primary",
      },
    });
  }

  function handleEditUser(event: MouseEvent<HTMLButtonElement>, member: User) {
    // To prevent the event from triggering form submit.
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
        <AdminTableCell
          className={classNames(
            classes["table-td"],
            "text-center",
            classes["td-select"]
          )}
        >
          <input
            type="checkbox"
            checked={selectedMemberIds.has(user.id)}
            onChange={(event) => handleSelectMember(event, user.id)}
          />
        </AdminTableCell>
        {!isMobile
          ? renderDesktopDetailsRow(user)
          : renderMobileDetailsRow(user)}
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-actions"])}
        >
          <div className={classes["button-wrapper"]}>
            <Button
              variant="icon"
              className="edit"
              onClick={(event) => handleEditUser(event, user)}
            >
              <PencilSquare />
            </Button>
            <Button
              variant="icon"
              className={classNames("delete", classes["trash-icon"])}
              onClick={handleMemberDelete.bind(null, user)}
            >
              <Trash />
            </Button>
          </div>
        </AdminTableCell>
      </>
    );
  }

  function renderEditRows(user: User) {
    return (
      <>
        <AdminTableCell
          className={classNames(classes["table-td"], "text-center")}
        ></AdminTableCell>
        {!isMobile ? renderDeskopEditRow(user) : renderMobileEditRow(user)}
        <AdminTableCell className={classes["table-td"]}>
          <div className={classes["button-wrapper"]}>
            <Button className="save" variant="icon" type="submit">
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
        </AdminTableCell>
      </>
    );
  }

  function renderDesktopHeaders() {
    return (
      <>
        <AdminTableCell
          className={classNames(classes["table-th"], classes["th-name"])}
          Element="th"
        >
          Name
        </AdminTableCell>
        <AdminTableCell
          className={classNames(classes["table-th"], classes["th-email"])}
          Element="th"
        >
          Email
        </AdminTableCell>
        <AdminTableCell
          className={classNames(classes["table-th"], classes["th-role"])}
          Element="th"
        >
          Role
        </AdminTableCell>
      </>
    );
  }

  function renderMobileHeaders() {
    return (
      <>
        <AdminTableCell
          className={classNames(
            classes["table-th"],
            classes["th-role"],
            "text-center"
          )}
          Element="th"
        >
          Role
        </AdminTableCell>
        <AdminTableCell
          className={classNames(
            classes["table-th"],
            classes["th-name"],
            "text-center"
          )}
          Element="th"
        >
          User
        </AdminTableCell>
      </>
    );
  }

  function renderDesktopDetailsRow(user: User) {
    return (
      <>
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-name"])}
        >
          {user.name}
        </AdminTableCell>
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-email"])}
        >
          {user.email}
        </AdminTableCell>
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-role"])}
        >
          {user.role}
        </AdminTableCell>
      </>
    );
  }

  function renderMobileDetailsRow(user: User) {
    return (
      <>
        <AdminTableCell
          className={classNames(
            classes["table-td"],
            classes["td-role"],
            classes["role-icon"]
          )}
          title={user.role}
        >
          <div className={classes["icon-wrapper"]}>
            {user.role === "admin" ? <UserGear /> : <UserIcon />}
          </div>
        </AdminTableCell>
        <AdminTableCell
          className={classNames(
            classes["table-td"],
            classes["td-name"],
            "text-center"
          )}
        >
          <p className="mb-1">{user.name}</p>
          <p>{user.email}</p>
        </AdminTableCell>
      </>
    );
  }

  function renderDeskopEditRow(user: User) {
    return (
      <>
        <AdminTableCell className={classes["table-td"]}>
          <input
            className={classes["form-input"]}
            autoFocus
            type="text"
            name="name"
            defaultValue={user.name}
          />
        </AdminTableCell>
        <AdminTableCell className={classes["table-td"]}>
          <input
            className={classes["form-input"]}
            type="text"
            name="email"
            defaultValue={user.email}
          />
        </AdminTableCell>
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-role"])}
        >
          <select
            className={classes["form-input"]}
            name="role"
            defaultValue={user.role}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </AdminTableCell>
      </>
    );
  }

  function renderMobileEditRow(user: User) {
    return (
      <>
        <AdminTableCell
          className={classNames(classes["table-td"], classes["td-role"])}
        >
          <select
            className={classes["form-input"]}
            name="role"
            defaultValue={user.role}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </AdminTableCell>
        <AdminTableCell className={classes["table-td"]}>
          <input
            className={classNames(classes["form-input"], "mb-3")}
            autoFocus
            type="text"
            name="name"
            defaultValue={user.name}
          />

          <input
            className={classes["form-input"]}
            type="text"
            name="email"
            defaultValue={user.email}
          />
        </AdminTableCell>
      </>
    );
  }

  return (
    <FormTableWrapper
      isForm={editId ? true : false}
      onSubmit={handleMemberUpdate}
    >
      <table className={classes["table"]}>
        <thead className={classes["table-thead"]}>
          <tr className={classes["table-tr"]}>
            <AdminTableCell
              className={classNames(
                classes["table-th"],
                "text-center",
                classes["th-select"]
              )}
              Element="th"
            >
              {membersListLength > 0 && (
                <input
                  ref={selectAllCheckboxRef}
                  type="checkbox"
                  onChange={handleSelectAllMembers}
                  checked={selectedMemberIds.size === membersList?.length}
                />
              )}
            </AdminTableCell>
            {!isMobile ? renderDesktopHeaders() : renderMobileHeaders()}
            <AdminTableCell
              className={classNames(
                classes["table-th"],
                "text-center",
                classes["th-actions"]
              )}
              Element="th"
            >
              Actions
            </AdminTableCell>
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
            className={classNames("delete", classes["delete-button"])}
            disabled={selectedMemberIds.size === 0}
            onClick={deleteSelectedMembers}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </FormTableWrapper>
  );
}
