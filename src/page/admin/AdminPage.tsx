import { useEffect, useMemo } from "react";

import AdminHeader from "../../components/adminHeader/AdminHeader";
import MembersDisplay from "../../components/membersDisplay/MembersDisplay";
import { getMembers } from "../../services/userService";
import useQuery from "../../hooks/useQuery";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import useQueryParams from "../../hooks/useQueryParams";
import Pagination from "../../components/pagination/Pagination";

import classes from "./AdminPage.module.css";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

export default function AdminPage() {
  const itemsPerPage = 10;
  const { data, error, isLoading } = useQuery<User[] | null>(getMembers);

  const { members, setMembers, activePage, setActivePage } =
    useAdminTableContext();
  const [params] = useQueryParams();

  const searchTerm = params.get("search") ?? "";
  const searchDataset = useMemo(prepareSearchDataset, [members]);

  const filteredMembers = useMemo(filterMembers, [
    members,
    searchDataset,
    searchTerm,
  ]);

  const [startCount, endCount, paginatedData] = getPaginatedData();

  const filteredListLength = filteredMembers?.length ?? 0;

  useEffect(() => {
    if (!error && data) {
      setMembers(data);
    }
  }, [data, error, setMembers]);

  function getPaginatedData(): [number, number, User[]] | [] {
    if (!filteredMembers || !activePage) return [];

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = Math.min(
      activePage * itemsPerPage,
      filteredMembers.length
    );

    const slicedData = [];
    for (let index = startIndex; index < endIndex; index++) {
      slicedData.push(filteredMembers[index]);
    }

    return [startIndex + 1, endIndex, slicedData];
  }

  function prepareSearchDataset(): Map<string, string> {
    const searchData = new Map<string, string>();

    if (!members) return searchData;

    members.forEach((item) => {
      searchData.set(item.id, `${item.name},${item.email},${item.role}`);
    });

    return searchData;
  }

  function filterMembers(): User[] | null {
    if (searchDataset.size === 0 || !members || !searchTerm) {
      return members;
    }

    const memberIds: string[] = [];

    searchDataset.forEach((value, key) => {
      if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
        memberIds.push(key);
      }
    });

    return members.filter((item) => memberIds.includes(item.id));
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
        {filteredListLength > 0 && (
          <Pagination
            totalCount={filteredListLength}
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}
      </aside>
    </div>
  );
}
