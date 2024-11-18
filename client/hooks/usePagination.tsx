import { useState, useEffect } from "react";

// Type for goToPage function
type GoToPageFunction = (page: number) => void;

// Type for updateQuery function
type UpdateQueryFunction = (newQuery: string) => void;

// Type for updatePerPage function
type UpdatePerPageFunction = (newPerPage: number) => void;

// Type for updateExtraParams function
type UpdateExtraParamsFunction = (newExtraParams: {
  [key: string]: any;
}) => void;

//  type for fetchData function
type FetchData<T> = (
  query: string,
  perPage: number,
  currentPage: number,
  extraParams?: { [key: string]: any }
) => Promise<{
  data: T[];
  totalPage: number;
}>;

// Custom hook with query and perPage inside, and generic data type
const usePagination = <T,>(
  fetchData: FetchData<T>,
  initialQuery = "",
  initialPerPage = 10,
  initialPage = 1,
  initialExtraParams: { [key: string]: any } = {}
) => {
  const [data, setData] = useState<T[]>([]); // data state is an array of T
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [totalPage, setTotalPage] = useState(0);
  const [extraParams, setExtraParams] = useState(initialExtraParams);

  // Function to fetch data
  const fetchDataAsync = async () => {
    setLoading(true);
    const response = await fetchData(query, perPage, currentPage, extraParams);
    setTotalPage(response.totalPage);
    setData(response.data);
    setLoading(false);
  };

  // Fetch data whenever query, perPage, currentPage, or extraParams changes
  useEffect(() => {
    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, perPage, currentPage, extraParams]); // dependencies

  // Function to manually refresh the data
  const refreshData = () => {
    fetchDataAsync(); // Re-fetch the data with the current state
  };

  const goToPage: GoToPageFunction = (page) => setCurrentPage(page);
  const updateQuery: UpdateQueryFunction = (newQuery) => setQuery(newQuery);
  const updatePerPage: UpdatePerPageFunction = (newPerPage) =>
    setPerPage(newPerPage);
  const updateExtraParams: UpdateExtraParamsFunction = (newExtraParams) =>
    setExtraParams(newExtraParams);

  return {
    data,
    loading,
    currentPage,
    goToPage,
    updateQuery,
    updatePerPage,
    updateExtraParams,
    totalPage,
    refreshData,
  };
};

export { usePagination };

export type {
  GoToPageFunction,
  UpdateQueryFunction,
  UpdatePerPageFunction,
  FetchData,
  UpdateExtraParamsFunction,
};
