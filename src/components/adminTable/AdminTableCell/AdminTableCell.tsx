import { PropsWithChildren, TdHTMLAttributes } from "react";

type AdminTableCellProps = PropsWithChildren<
  TdHTMLAttributes<HTMLTableCellElement>
> & {
  // Controls the rendering of the element.
  show?: boolean;
  // Sets the HTML element to be rendered.
  Element?: "th" | "td";
};

export default function AdminTableCell({
  children,
  className,
  show = true,
  Element = "td",
  ...params
}: AdminTableCellProps) {
  if (!show) return null;

  return (
    <Element className={className} {...params}>
      {children}
    </Element>
  );
}
