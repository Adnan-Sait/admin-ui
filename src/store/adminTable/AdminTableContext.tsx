import React, { PropsWithChildren, useState } from "react";

import { User } from "../../page/admin/AdminPage";

type AdminTableContextReturnType = {
  members: User[] | null;
  setMembers: React.Dispatch<React.SetStateAction<User[] | null>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  totalLength: number;
};

export const AdminTableContext =
  React.createContext<AdminTableContextReturnType | null>(null);

export default function AdminTableContextProvider({
  children,
}: PropsWithChildren) {
  const [members, setMembers] = useState<User[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const totalLength = members?.length ?? 0;

  return (
    <AdminTableContext.Provider
      value={{ members, setMembers, activePage, setActivePage, totalLength }}
    >
      {children}
    </AdminTableContext.Provider>
  );
}
