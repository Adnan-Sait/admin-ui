import classNames from "classnames";
import Button from "../../ui/Button/Button";

import useAppContext from "../../hooks/context/useAppContext";
import Progress from "../../ui/Progress/Progress";

import classes from "./Toast.module.css";

export default function Toast() {
  const {
    toast: { toastTitle, toastVariant, showToast },
    toastDispatch,
  } = useAppContext();

  function handleLoadingComplete() {
    toastDispatch({ type: "hideToast" });
  }

  function handleToastClose() {
    toastDispatch({ type: "hideToast" });
  }

  if (!toastTitle || !showToast) return null;

  return (
    <dialog
      className={classNames(classes.toast, classes[`toast--${toastVariant}`])}
      open
    >
      <Progress
        className={classes.progress}
        max={3000}
        type="decrement"
        onComplete={handleLoadingComplete}
      />
      <div className={classes["toast-body"]}>
        <h3>{toastTitle}</h3>
        <Button variant="icon" onClick={handleToastClose}>
          Close
        </Button>
      </div>
    </dialog>
  );
}
