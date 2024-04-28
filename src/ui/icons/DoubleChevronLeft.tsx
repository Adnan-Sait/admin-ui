import classNames from "classnames";

import classes from "./IconStyling.module.css";
import { SvgIconProp } from "./MagnifyingGlass";

export default function DoubleChevronLeft({
  className,
  ...params
}: SvgIconProp) {
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
        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
      />
    </svg>
  );
}
