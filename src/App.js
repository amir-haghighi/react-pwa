import "./App.css";

import { useState } from "react";

import { useData } from "./api/useData";

const App = () => {
  const [searchState, setSearchState] = useState("");

  const { data, refetch, isLoading } = useData(searchState);

  const searchFn = async (e) => {
    if (e.key === "Enter") {
      refetch();

      setSearchState("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={searchState}
        onChange={(e) => setSearchState(e.target.value)}
        onKeyDown={searchFn}
      />
      {data && data.data.main && (
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
    </div>
  );
};

export default App;
