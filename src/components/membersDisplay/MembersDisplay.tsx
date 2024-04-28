import { User } from "../../page/admin/AdminPage";

import AdminTable from "../adminTable/AdminTable";

type MembersDisplayProps = {
  membersList: User[] | undefined;
};

export default function MembersDisplay({ membersList }: MembersDisplayProps) {
  return <AdminTable membersList={membersList} />;
}
