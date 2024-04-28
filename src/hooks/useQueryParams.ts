import { useEffect, useState } from "react";

export default function useQueryParams(): [
  Map<string, string>,
  (callback: (state: Map<string, string>) => Map<string, string>) => void
] {
  const [params, setParams] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    function handleUrlHashChange() {
      const hashPath = window.location.hash;
      const paramsMap = new Map<string, string>();

      const [, queryParams] = hashPath.split("?");

      if (!queryParams) {
        setParams(paramsMap);
        return;
      }

      const paramsList = queryParams.split("&");
      for (let index = 0; index < paramsList.length; index++) {
        const item = paramsList[index];

        if (!item) continue;

        const [key, value] = item.split("=");

        if (key) {
          paramsMap.set(key, value ?? "");
        }
      }

      setParams(paramsMap);
    }

    handleUrlHashChange();
    window.addEventListener("hashchange", handleUrlHashChange);

    return () => {
      window.removeEventListener("hashchange", handleUrlHashChange);
    };
  }, []);

  /**
   * Updates the query params in the URL.
   */
  function updateParams(
    callback: (state: Map<string, string>) => Map<string, string>
  ) {
    // TODO: Add polyfill for structured clone.
    const updatedParams = callback(structuredClone(params));
    const paramList: string[] = [];
    updatedParams.forEach((value, key) => {
      if (key) {
        paramList.push(`${key}=${value}`);
      }
    });

    const queryParamIndex = window.location.hash.indexOf("?");
    const queryParams = paramList.join("&");

    if (!queryParams) {
      window.location.hash = "";
    } else if (queryParamIndex > -1) {
      window.location.hash = `${window.location.hash.substring(
        0,
        queryParamIndex + 1
      )}${queryParams}`;
    } else {
      window.location.hash = `${window.location.hash}?${queryParams}`;
    }
  }

  return [params, updateParams];
}
