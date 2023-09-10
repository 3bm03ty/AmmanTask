import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RecentlyViewd from "../RecentlyViewd/RecentlyViewd";
import "./Movies.css";
import { Outlet, Link } from "react-router-dom";
import Movie from "../Movie/Movie";
import { useOutletContext } from "react-router-dom";
import { SearchContext } from "../../Contexts/SearchContext";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState([]);
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
          "&type=movie"
      );
      setIsLoading(false);

      setMovies(data.Search);
    })();
  }, [searchValue]);

  return (
    <>
      <Movie movies={movies} isLoading={isLoading} />
    </>
  );
};

export default Movies;
