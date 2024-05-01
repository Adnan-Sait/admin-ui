import { useContext } from "react";
import { AppContext } from "../../store/app/AppContext";

export default function useAppContext() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("Context cannot be used outside the provider");
  }

  return appContext;
}
