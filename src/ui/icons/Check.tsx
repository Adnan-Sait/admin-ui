import classNames from "classnames";

import classes from "./IconStyling.module.css";
import { SvgIconProp } from "./MagnifyingGlass";

export default function Check({ className, ...params }: SvgIconProp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={classNames(className, classes.icon, "icon")}
      {...params}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
