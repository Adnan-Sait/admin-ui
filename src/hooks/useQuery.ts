import { useEffect, useState } from "react";
import ApiResponse from "../models/ApiResponse";

/**
 *
 * @param apiCall Callback should be a stable reference
 */
export default function useQuery<T>(apiCall: () => Promise<ApiResponse<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    (async () => {
      const apiResponse = await apiCall();

      setData(apiResponse.data);
      setError(apiResponse.error);
      setIsLoading(false);
    })();
  }, [apiCall, refetchCount]);

  /**
   * Causes the API call to run again.
   */
  function refetch() {
    setRefetchCount((state) => state + 1);
  }

  return { data, error, isLoading, refetch };
}
