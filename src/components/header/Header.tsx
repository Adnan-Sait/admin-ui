import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className="container">
        <h1 className={classes.title}>Admin UI</h1>
      </div>
    </header>
  );
}
