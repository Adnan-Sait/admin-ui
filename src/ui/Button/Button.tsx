import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

import classes from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "icon";
  className?: string;
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...attrs
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        className,
        classes.button,
        classes[`variant--${variant}`]
      )}
      tabIndex={0}
      {...attrs}
    >
      {children}
    </button>
  );
}
