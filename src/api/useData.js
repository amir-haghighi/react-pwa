import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "f33a484cf794d08d0148764789aaba32";
export const useData = (query) => {
  const axiosFn = (query) => {
    return axios.get(URL, {
      params: {
        q: query,
        units: "metric",

        APPID: API_KEY,
      },
    });
  };

  return useQuery({
    queryKey: ["weatherData"],
    queryFn: () => {
      if (!query) {
        return Promise.reject(new Error("Query cannot be empty")); // Reject for empty queries
      }

      return axiosFn(query);
    },
    enabled: false,
  });
};
