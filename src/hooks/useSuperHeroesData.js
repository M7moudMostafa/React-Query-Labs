import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    // gcTime: 5000, // Cache time => data removed default 5 minutes
    // staleTime: 30000, // Stale time => default 0 s
    // refetchOnMount: true, // True, false, 'always'
    // refetchOnWindowFocus: "always", // True, false, 'always'
    // refetchInterval: 2000, // set an integer value in ms. default is ( false )
    // refetchIntervalInBackground: true, // Will refetch the data when the windows not focused ( in background )
    // enabled: false, // To enable and disable use Query
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
};

export default useSuperHeroesData;
