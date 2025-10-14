import { useEffect } from "react";
import { useState } from "react";

export default function useFetch(func) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await func(controller.signal);

        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted && err.name !== "AbortError") setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [func]);

  return { loading, error, data };
}
