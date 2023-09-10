import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Movie from "../Movie/Movie";
import { SearchContext } from "../../Contexts/SearchContext";

const Series: React.FC = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { data } = await axios.get(
        process.env.REACT_APP_BASE_URL +
          "?s=" +
          (searchValue || "One") +
          "&apikey=" +
          process.env.REACT_APP_API_KEY +
          "&type=series"
      );
      setIsLoading(false);
      setSeries(data.Search);
    })();
  }, [searchValue]);

  return (
    <>
      <Movie movies={series} isLoading={isLoading} />
    </>
  );
};

export default Series;
