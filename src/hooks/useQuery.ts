import { useEffect, useState } from "react";
import ApiResponse from "../models/ApiResponse";

export default function useQuery<T>(callback: () => Promise<ApiResponse<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const apiResponse = await callback();

      setData(apiResponse.data);
      setError(apiResponse.error);
      setIsLoading(false);
    })();
  }, [callback]);

  return { data, error, isLoading };
}
