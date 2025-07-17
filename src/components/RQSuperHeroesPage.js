import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
  });

  if (isLoading) return <>Loading....</>;

  return (
    <>
      <div>RQ Super Heroes Page</div>
      {data?.data?.map((hero) => (
        <div key={hero.id}>
          {hero.id}: {hero.name}
        </div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
