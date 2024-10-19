import { useState, useEffect } from "react";

// Type for goToPage function
type GoToPageFunction = (page: number) => void;

// Type for updateQuery function
type UpdateQueryFunction = (newQuery: string) => void;

// Type for updatePerPage function
type UpdatePerPageFunction = (newPerPage: number) => void;

//  type for fetchData function
type FetchData<T> = (
  query: string,
  perPage: number,
  currentPage: number
) => Promise<{
  data: T[];
  totalPage: number;
}>;

// Custom hook with query and perPage inside, and generic data type
const usePagination = <T,>(
  fetchData: FetchData<T>,
  initialQuery = "",
  initialPerPage = 10
) => {
  const [data, setData] = useState<T[]>([]); // data state is an array of T
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [totalPage, setTotalPage] = useState(0);

  // Function to fetch data
  const fetchDataAsync = async () => {
    setLoading(true);
    const response = await fetchData(query, perPage, currentPage);
    setTotalPage(response.totalPage);
    setData(response.data);
    setLoading(false);
  };

  // Fetch data whenever query, perPage, or currentPage changes
  useEffect(() => {
    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, perPage, currentPage]); // dependencies

  // Function to manually refresh the data
  const refreshData = () => {
    fetchDataAsync(); // Re-fetch the data with the current state
  };

  const goToPage: GoToPageFunction = (page) => setCurrentPage(page);
  const updateQuery: UpdateQueryFunction = (newQuery) => setQuery(newQuery);
  const updatePerPage: UpdatePerPageFunction = (newPerPage) =>
    setPerPage(newPerPage);

  return {
    data,
    loading,
    currentPage,
    goToPage,
    updateQuery,
    updatePerPage,
    totalPage,
    refreshData, // Expose refreshData function
  };
};

export { usePagination };

export type {
  GoToPageFunction,
  UpdateQueryFunction,
  UpdatePerPageFunction,
  FetchData,
};
