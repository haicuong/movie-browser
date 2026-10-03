import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";

export default function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [searchState, setSearchState] = useState(urlQuery);
  const [searchQuery, immediateUpdate] = useDebounce(searchState, 400);

  const lastUrlQuery = useRef(urlQuery);

  useEffect(() => {
    // URL changed externally
    if (urlQuery !== lastUrlQuery.current) {
      lastUrlQuery.current = urlQuery;
      setSearchState(urlQuery);
      immediateUpdate(urlQuery);
      return;
    }

    if (urlQuery === searchQuery) return;

    // Debounced input changed
    lastUrlQuery.current = searchQuery;

    setSearchParams(searchQuery ? { q: searchQuery } : {});
  }, [urlQuery, searchQuery, setSearchParams, immediateUpdate]);

  return { searchState, setSearchState, searchQuery, urlQuery };
}
