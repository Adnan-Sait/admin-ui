import { useEffect, useState } from "react";

type WindowSize = {
  height: number;
  width: number;
};

/**
 * Returns the window size.
 */
export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  /**
   * Handles the window resize event.
   */
  function handleWindowResize() {
    const size: WindowSize = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    setWindowSize(size);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
}
