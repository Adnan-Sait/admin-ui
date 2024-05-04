import { useLayoutEffect, useState } from "react";

type WindowSize = {
  height: number | null;
  width: number | null;
};

/**
 * Returns the window size.
 */
export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: null,
    width: null,
  });

  useLayoutEffect(() => {
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

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
}
