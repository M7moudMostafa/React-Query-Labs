import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
  });

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
