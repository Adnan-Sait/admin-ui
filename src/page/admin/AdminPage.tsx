import AdminHeader from "../../components/adminHeader/AdminHeader";
import MembersDisplay from "../../components/membersDisplay/MembersDisplay";
import { getMembers } from "../../services/userService";
import useQuery from "../../hooks/useQuery";
import Pagination from "../../components/pagination/Pagination";

import classes from "./AdminPage.module.css";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import { useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

export default function AdminPage() {
  const itemsPerPage = 10;
  const { data, error, isLoading } = useQuery<User[] | null>(getMembers);

  const { members, setMembers, activePage } = useAdminTableContext();
  const [startCount, endCount, paginatedData] = getPaginatedData();

  useEffect(() => {
    if (!error && data) {
      setMembers(data);
    }
  }, [data, error, setMembers]);

  function getPaginatedData(): [number, number, User[]] | [] {
    if (!members || !activePage) return [];

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = Math.min(activePage * itemsPerPage, members.length);

    const slicedData = [];
    for (let index = startIndex; index < endIndex; index++) {
      slicedData.push(members[index]);
    }

    return [startIndex + 1, endIndex, slicedData];
  }

  if (isLoading) {
    return "loading";
  }

  if (error) {
    return "API error";
  }

  return (
    <div>
      <AdminHeader startItem={startCount ?? 0} endItem={endCount ?? 0} />
      <MembersDisplay membersList={paginatedData} />
      <aside className={classes["pagination-container"]}>
        <Pagination itemsPerPage={itemsPerPage} />
      </aside>
    </div>
  );
}
