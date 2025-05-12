import { useState, useCallback } from "react";

type UseAiOptions = {
  headers?: Record<string, string>;
};

function useAi<TInput = any, TOutput = any>(
  endpoint: string,
  options?: UseAiOptions
) {
  const [data, setData] = useState<TOutput | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const call = useCallback(
    async (input: TInput) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {}),
          },
          body: JSON.stringify(input),
        });

        if (!res.ok) throw new Error("Request failed");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  return { data, error, loading, call };
}

export default useAi;
