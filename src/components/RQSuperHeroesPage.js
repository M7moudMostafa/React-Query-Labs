import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useFetchHeroesData,
  useAddSuperHero,
} from "../hooks/useSuperHeroesData";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  // isLoading => detect data loading or not
  // data => data returned from request
  // isError => detect there is an error from request or not
  // error => error type
  // isFetching => data is fetching or not
  // refetch => to refetch the data
  const { isLoading, data, isError, error, isFetching, refetch } =
    useFetchHeroesData();

  const { mutate: addHero } = useAddSuperHero();

  console.log({ isFetching, isLoading });

  if (isLoading) return <h2>Loading....</h2>;

  if (isError) return <h2>{error.message}</h2>;

  const handleAddSuperHero = (e) => {
    e.preventDefault();
    addHero({ name, alterEgo });
  };

  return (
    <>
      <h1>RQ Super Heroes Page</h1>
      <form onSubmit={handleAddSuperHero}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Alter Ego: </label>
          <input
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Hero</button>
      </form>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.id} {hero.name}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RQSuperHeroesPage;
