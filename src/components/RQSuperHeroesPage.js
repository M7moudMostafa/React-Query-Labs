import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    // gcTime: 5000, // Cache time => data removed default 5 minutes
    // staleTime: 30000, // Stale time => default 0 s
    refetchOnMount: true, // True, false, 'always'
    refetchOnWindowFocus: "always", // True, false, 'always'
  });

  console.log({ isFetching, isLoading });

  if (isLoading) return <h2>Loading....</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h1>RQ Super Heroes Page</h1>
      {data?.data?.map((hero) => (
        <div key={hero.id}>
          {hero.id}: {hero.name}
        </div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
