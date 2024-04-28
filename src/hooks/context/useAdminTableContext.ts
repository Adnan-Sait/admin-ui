import { useContext } from "react";

import { AdminTableContext } from "../../store/adminTable/AdminTableContext";

export default function useAdminTableContext() {
  const contextValue = useContext(AdminTableContext);

  if (!contextValue) {
    throw new Error("Context cannot be used outside the provider");
  }

  return contextValue;
}
