import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

// Fetch colors with pagination
const fetchColors = (pageNumber) => {
  return axios.get(
    `http://localhost:4000/colors?_page=${pageNumber}&_per_page=2`
  );
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
  });

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (data?.data.data.length === 2) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Colors List (Paginated)</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      <ul>
        {data?.data.data.map((color) => {
          console.log("Fetched color:", color);
          return (
            <li key={color.id} style={{ color: color.label }}>
              {color.label}
            </li>
          );
        })}
      </ul>

      {isFetching && !isLoading && <p>Loading next page...</p>}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePrev} disabled={pageNumber === 1}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>Page: {pageNumber}</span>
        <button onClick={handleNext} disabled={pageNumber === 4}>
          Next
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>
        Fetched colors: {data?.data.data.map((c) => c.label).join(", ")}
      </p>
    </div>
  );
};

export default PaginatedQueries;
