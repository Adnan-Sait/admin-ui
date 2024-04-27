import classNames from "classnames";
import Header from "./components/header/Header";
import AdminPage from "./page/admin/AdminPage";
import classes from "./App.module.css";

function App() {
  return (
    <>
      <Header />
      <main className={classNames(classes.main, "container")}>
        <AdminPage />
      </main>
    </>
  );
}

export default App;
