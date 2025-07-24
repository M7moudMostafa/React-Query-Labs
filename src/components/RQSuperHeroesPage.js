import useSuperHeroesData from "../hooks/useSuperHeroesData";

const RQSuperHeroesPage = () => {
  // isLoading => detect data loading or not
  // data => data returned from request
  // isError => detect there is an error from request or not
  // error => error type
  // isFetching => data is fetching or not
  // refetch => to refetch the data
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData();

  console.log({ isFetching, isLoading });

  if (isLoading) return <h2>Loading....</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h1>RQ Super Heroes Page</h1>
      <button onClick={refetch}>Fetch Heroes</button>
      {/** {data?.data?.map((hero) => (
        <div key={hero.id}>
          {hero.id}: {hero.name}
        </div>
      ))} **/}
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
