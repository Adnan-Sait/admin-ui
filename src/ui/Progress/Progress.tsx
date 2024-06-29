import { ProgressHTMLAttributes, useEffect, useState } from "react";

import classes from "./Progress.module.css";
import classNames from "classnames";

type ProgressProps = Omit<
  ProgressHTMLAttributes<HTMLProgressElement> & {
    /** The duration of the progress bar in milliseconds. */
    max: number;
    type?: "increment" | "decrement";
    /** The progress is reset if the reference changes */
    onComplete?: (value?: number) => void;
  },
  "value"
>;

export default function Progress({
  max,
  type = "increment",
  className,
  onComplete,
  ...params
}: ProgressProps) {
  const initialValue = type === "increment" ? 0 : max;
  const [value, setValue] = useState(initialValue);

  const deltaValue = Math.ceil(max / 100) * (type === "increment" ? 1 : -1);

  const isComplete = type === "increment" ? value >= max : value <= 0;

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;
    if (!isComplete) {
      intervalId = setInterval(() => {
        setValue((state) => state + deltaValue);
      }, Math.abs(deltaValue));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [deltaValue, isComplete]);

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete(value);
    }
  }, [value, isComplete, onComplete]);

  useEffect(() => {
    setValue(initialValue);
  }, [onComplete, initialValue]);

  return (
    <progress
      className={classNames(classes.progress, className)}
      value={value}
      max={max}
      {...params}
    />
  );
}
