import { useEffect, useMemo } from "react";

import useQuery from "../../hooks/useQuery";
import useAdminTableContext from "../../hooks/context/useAdminTableContext";
import useQueryParams from "../../hooks/useQueryParams";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import MembersDisplay from "../../components/membersDisplay/MembersDisplay";
import Pagination from "../../components/pagination/Pagination";
import { getMembers } from "../../services/userService";

import Button from "../../ui/Button/Button";
import ArrowPath from "../../ui/icons/ArrowPath";

import classes from "./AdminPage.module.css";

export type userRole = "member" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: userRole;
};

export default function AdminPage() {
  const itemsPerPage = 10;
  const {
    data,
    error,
    isLoading,
    refetch: refetchUsers,
  } = useQuery<User[] | null>(getMembers);

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

  // Save data into context, once loaded.
  useEffect(() => {
    if (!error && data) {
      setMembers(data);
    }
  }, [data, error, setMembers]);

  // Reset active page when searchterm is changed.
  useEffect(() => {
    setActivePage(1);
  }, [searchTerm, setActivePage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  /**
   * Returns the paginated data along with the start and end item position.
   */
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

  /**
   * Prepares the map for the search operation.
   */
  function prepareSearchDataset(): Map<string, string> {
    const searchData = new Map<string, string>();

    if (!members) return searchData;

    members.forEach((item) => {
      searchData.set(
        item.id,
        `${item.name},${item.email},${item.role}`.toLowerCase()
      );
    });

    return searchData;
  }

  function filterMembers(): User[] {
    if (searchDataset.size === 0 || !members || !searchTerm) {
      return members || [];
    }

    const memberIds = new Set<string>();

    searchDataset.forEach((value, key) => {
      if (value.includes(searchTerm.trim().toLowerCase())) {
        memberIds.add(key);
      }
    });

    return members.filter((item) => memberIds.has(item.id));
  }

  function handleUsersRefetch() {
    refetchUsers();
  }

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return (
      <div className={classes["error-wrapper"]}>
        <span>Error Fetching Data</span>
        <Button
          className={classes["refresh-btn"]}
          variant="secondary"
          onClick={handleUsersRefetch}
        >
          <span>Try Again</span>
          <ArrowPath />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        startItem={startCount ?? 0}
        endItem={endCount ?? 0}
        totalRecords={filteredMembers.length}
      />
      <MembersDisplay membersList={paginatedData} />
      <aside className={classes["pagination-container"]}>
        {filteredMembers.length > 0 && (
          <Pagination
            totalCount={filteredMembers.length}
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}
      </aside>
    </div>
  );
}
