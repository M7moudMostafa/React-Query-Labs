import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: () => {
      return axios.get(`http://localhost:4000/superheroes/${heroId}`);
    },
  });
};

export default useSuperHeroData;
