import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import useQueryParams from "../../hooks/useQueryParams";
import AdminTable from "../adminTable/AdminTable";

import classes from "./MembersDisplay.module.css";
import { User } from "../../page/admin/AdminPage";

type MembersDisplayProps = {
  membersList: User[] | undefined;
};

export default function MembersDisplay({ membersList }: MembersDisplayProps) {
  const [params] = useQueryParams();
  const { totalLength } = useAdminTableContext();

  const searchTerm = params.get("search");

  let noMembersMsg;
  if (totalLength > 0 && membersList?.length === 0 && searchTerm) {
    noMembersMsg = `Could not find any users with the search term - ${searchTerm}`;
  } else if (totalLength === 0) {
    noMembersMsg = `No users found`;
  }

  return (
    <div>
      <AdminTable membersList={membersList} />
      {noMembersMsg && (
        <div className={classes["no-content-msg"]}>{noMembersMsg}</div>
      )}
    </div>
  );
}
