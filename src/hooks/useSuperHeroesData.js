import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fetch Super Heroes
export const useFetchHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    // Optional configs:
    // gcTime: 5000,
    // staleTime: 30000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: "always",
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    // enabled: false,
    // select: (data) => data.data.map((hero) => hero.name),
  });
};

// Add Super Hero
export const useAddSuperHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-hero"],
    mutationFn: (hero) => axios.post("http://localhost:4000/superheroes", hero),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-heroes"] });
    },
  });
};
