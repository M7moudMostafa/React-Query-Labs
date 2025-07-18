import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  // isLoading => detect data loading or not
  // data => data returned from request
  // isError => detect there is an error from request or not
  // error => error type
  // isFetching => data is fetching or not
  // refetch => to refetch the data
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
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
    enabled: false, // To enable and disable use Query
  });

  console.log({ isFetching, isLoading });

  if (isLoading) return <h2>Loading....</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h1>RQ Super Heroes Page</h1>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data?.map((hero) => (
        <div key={hero.id}>
          {hero.id}: {hero.name}
        </div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
