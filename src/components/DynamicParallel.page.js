import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallel = ({ heroIds }) => {
  const results = useQueries({
    queries: heroIds.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: () => fetchSuperHero(id),
    })),
  });

  return (
    <div>
      {results.map((query, index) => {
        if (query.isLoading)
          return <p key={heroIds[index]}>Loading hero {heroIds[index]}...</p>;
        if (query.isError)
          return (
            <p key={heroIds[index]}>Error loading hero {heroIds[index]}</p>
          );

        return (
          <div key={heroIds[index]}>
            <h2>{query.data.data.name}</h2>
            <p>Alter Ego: {query.data.data.alterEgo}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicParallel;
