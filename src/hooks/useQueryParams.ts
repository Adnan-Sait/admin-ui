import { useEffect, useState } from "react";

export default function useQueryParams(): [
  Map<string, string>,
  (callback: (state: Map<string, string>) => Map<string, string>) => void
] {
  const [params, setParams] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    /**
     * Saves the query parameters into the state map.
     */
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
          paramsMap.set(key, decodeURIComponent(value) ?? "");
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
    const updatedParamsMap = callback(params);
    const paramList: string[] = [];
    updatedParamsMap.forEach((value, key) => {
      if (key) {
        paramList.push(`${key}=${encodeURIComponent(value)}`);
      }
    });

    const queryParams = paramList.join("&");
    const queryParamSymbolIndex = window.location.hash.indexOf("?");

    if (!queryParams) {
      window.location.hash = "";
    } else if (queryParamSymbolIndex > -1) {
      window.location.hash = `${window.location.hash.substring(
        0,
        queryParamSymbolIndex + 1
      )}${queryParams}`;
    } else {
      window.location.hash = `${window.location.hash}?${queryParams}`;
    }
  }

  return [params, updateParams];
}
