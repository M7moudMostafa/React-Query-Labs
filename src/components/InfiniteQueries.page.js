import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(
    `http://localhost:4000/colors?_page=${pageParam}&_per_page=2`
  );
};

const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length < 4 ? allPages.length + 1 : undefined;
    },
  });

  console.log(data);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Colors List (Paginated)</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      <ul>
        {data?.pages.map((page) =>
          page.data.data.map((color) => (
            <li key={color.id} style={{ color: color.label }}>
              {color.label}
            </li>
          ))
        )}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          {isFetchingNextPage ? "Loading ..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default InfiniteQueries;
