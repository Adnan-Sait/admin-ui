import classNames from "classnames";

import AdminTableContextProvider from "./store/adminTable/AdminTableContext";
import Header from "./components/header/Header";
import AdminPage from "./page/admin/AdminPage";
import classes from "./App.module.css";
import { createPortal } from "react-dom";
import Toast from "./components/toast/Toast";
import AppContextProvider from "./store/app/AppContext";

function App() {
  const toastPortal = createPortal(
    <Toast />,
    document.getElementById("toast-element")!
  );

  return (
    <AppContextProvider>
      <Header />
      <main className={classNames(classes.main, "container")}>
        <AdminTableContextProvider>
          <AdminPage />
        </AdminTableContextProvider>
      </main>

      {toastPortal}
    </AppContextProvider>
  );
}

export default App;
