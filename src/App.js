import "./App.css";

import { useState } from "react";

import { useData } from "./api/useData";
import Loader from "./components/Loader";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M20.71 19.96l-3.24-3.25c-0.57-0.57-0.59-1.49-0.06-2.06l0.66-0.66c1.7-1.7 1.7-4.43 0-6.12-1.7-1.7-4.42-1.7-6.12 0-1.7 1.7-1.7 4.42 0 6.12 0.59 0.59 0.59 1.49 0 2.06l-0.66 0.66c-0.57 0.57-1.49 0.55-2.06-0.06l-3.24-3.24c-0.53-0.61-1.45-0.62-2.05-0.04l-3.65 3.18c-0.57 0.49-0.55 1.35 0.06 1.89l3.24 3.25c0.57 0.57 0.59 1.49 0.06 2.06l-0.66 0.66c-1.7 1.7-1.7 4.42 0 6.12 1.7 1.7 4.42 1.7 6.12 0 1.7-1.7 1.7-4.42 0-6.12-0.59-0.59-0.59-1.49 0-2.06l0.66-0.66c0.57-0.57 1.49-0.55 2.06 0.06l3.24 3.24c0.61 0.53 1.54 0.55 2.15 0.06l3.65-3.18c0.57-0.48 0.57-1.35 0-1.88zM12 18.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"></path>
  </svg>
);
const App = () => {
  const [searchState, setSearchState] = useState("");

  const { data, refetch, isLoading, isError, isSuccess, isFetching } =
    useData(searchState);

  const searchFn = async (e) => {
    refetch();

    setSearchState("");
  };

  return (
    <>
      <div className="main-container">
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search... "
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchFn();
              }
            }}
          />
          <button className="search-button" onClick={searchFn}>
            🔍
          </button>
        </div>
        {data && data.data.main && isSuccess && !isLoading && !isFetching && (
          <div className="city">
            <h2 className="city-name">
              <span>{data.data.name}</span>
              <sup>{data.data.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(data.data.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`}
                alt={data.data.weather[0].description}
              />
              <p>{data.data.weather[0].description}</p>
            </div>
          </div>
        )}
        {(isLoading || isFetching) && <Loader />}
        {isError && (
          <div className="city">
            <h2 className="city-name">
              <span>{"check your spelling"}</span>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
