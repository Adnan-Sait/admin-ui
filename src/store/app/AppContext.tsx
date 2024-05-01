import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

type ToastData = {
  toastTitle: string;
  toastVariant: "primary";
  showToast?: boolean;
};

type ToastAction = {
  type: ToastActions;
  payload?: ToastData;
};

type AppContextReturnType = {
  toast: ToastData;
  toastDispatch: Dispatch<ToastAction>;
};

type ToastActions = "setToastData" | "hideToast";

const toastInitialState: ToastData = {
  toastTitle: "",
  toastVariant: "primary",
  showToast: false,
};

function toastReducer(state: ToastData, action: ToastAction) {
  const { type, payload } = action;

  switch (type) {
    case "setToastData": {
      if (payload) {
        return { ...payload, showToast: true };
      }

      return state;
    }
    case "hideToast": {
      return toastInitialState;
    }

    default: {
      return state;
    }
  }
}

export const AppContext = createContext<AppContextReturnType | null>(null);

export default function AppContextProvider({ children }: PropsWithChildren) {
  const [toastState, toastDispatch] = useReducer(
    toastReducer,
    toastInitialState
  );

  return (
    <AppContext.Provider value={{ toast: toastState, toastDispatch }}>
      {children}
    </AppContext.Provider>
  );
}
