import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

import classes from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "icon";
  className?: string;
};

export default function Button({
  children,
  className,
  variant = "primary",
  disabled,
  ...attrs
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        className,
        classes.button,
        classes[`variant--${variant}`],
        { "no-transition": disabled }
      )}
      tabIndex={0}
      disabled={disabled}
      {...attrs}
    >
      {children}
    </button>
  );
}
