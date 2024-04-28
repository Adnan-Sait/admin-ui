import React, { PropsWithChildren, useState } from "react";

import { User } from "../../page/admin/AdminPage";

type AdminTableContextReturnType = {
  members: User[] | null;
  setMembers: React.Dispatch<React.SetStateAction<User[] | null>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  totalLength: number;
  removeMembers: (state: string[]) => void;
  updateMember: (member: User) => void;
};

export const AdminTableContext =
  React.createContext<AdminTableContextReturnType | null>(null);

export default function AdminTableContextProvider({
  children,
}: PropsWithChildren) {
  const [members, setMembers] = useState<User[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const totalLength = members?.length ?? 0;

  function removeMembers(memberIds: string[]) {
    setMembers((state) => {
      if (!state) return state;

      return state.filter((item) => !memberIds.includes(item.id));
    });
  }

  function updateMember(member: User) {
    setMembers((state) => {
      if (!state) return state;

      const existingIndex = state.findIndex((item) => item.id === member.id);

      return [
        ...state.slice(0, existingIndex),
        member,
        ...state.slice(existingIndex + 1),
      ];
    });
  }

  return (
    <AdminTableContext.Provider
      value={{
        members,
        setMembers,
        activePage,
        setActivePage,
        totalLength,
        removeMembers,
        updateMember,
      }}
    >
      {children}
    </AdminTableContext.Provider>
  );
}
