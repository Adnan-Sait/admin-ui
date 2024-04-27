import AdminHeader from "../../components/adminHeader/AdminHeader";
import AdminTable from "../../components/adminTable/AdminTable";
import { getMembers } from "../../services/userService";
import useQuery from "../../hooks/useQuery";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

export default function AdminPage() {
  const {
    data: members,
    error,
    isLoading,
  } = useQuery<User[] | null>(getMembers);

  if (isLoading) {
    return "loading";
  }

  if (error) {
    return "API error";
  }

  return (
    <div>
      <AdminHeader />
      <AdminTable membersList={members} />
    </div>
  );
}
