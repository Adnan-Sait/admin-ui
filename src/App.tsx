import classNames from "classnames";

import AdminTableContextProvider from "./store/adminTable/AdminTableContext";
import Header from "./components/header/Header";
import AdminPage from "./page/admin/AdminPage";
import classes from "./App.module.css";
import AppContextProvider from "./store/app/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <main className={classNames(classes.main, "container")}>
        <AdminTableContextProvider>
          <AdminPage />
        </AdminTableContextProvider>
      </main>
    </AppContextProvider>
  );
}

export default App;
