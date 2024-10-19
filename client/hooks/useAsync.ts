/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type AsyncFunction<T, A extends any[]> = (...args: A) => Promise<T>;

interface UseAsyncReturn<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
  execute: (...args: any[]) => Promise<void>;
}

const useAsync = <T, A extends any[]>(
  asyncFunction: AsyncFunction<T, A>
): UseAsyncReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: A) => {
    setLoading(true);
    setError(null); // Reset error state before new execution

    try {
      const result = await asyncFunction(...args);
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err); // Type guard to ensure error is of type Error
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, execute };
};

export default useAsync;
