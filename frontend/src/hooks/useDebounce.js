import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "../lib/utility";
import { fetchProductsWithSearch } from "../lib/api.js";

export function useDebounce(query, delay = 300) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback(query => {
    setSearch(query);
  }, []);

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, delay),
    [handleChange]
  );

  useEffect(() => {
    debouncedHandleChange(query);
  }, [query, debouncedHandleChange]);

  useEffect(() => {
    if (!search.trim()) return;

    setLoading(true);
    const controller = new AbortController();

    const getData = async () => {
      try {
        const data = await fetchProductsWithSearch(search, controller.signal);

        setResult(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();

    return () => {
      controller.abort();
      setError(null);
    };
  }, [search]);

  return { result, loading, error };
}
