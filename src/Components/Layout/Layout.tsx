import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, Link, NavLink } from "react-router-dom";
import "../../App.css";
import { SearchContext } from "../../Contexts/SearchContext";
import { RecentlyViewedContext } from "../../Contexts/RecentlyViewedContext";

const Layout = () => {
  const [dialogValue, setDialogValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentlyViewdMovies, setRecentlyViewdMovies] = useState<any[]>([]);

  useEffect(() => {
    if(localStorage.getItem("recentlyViewdMovies") != null){
      setRecentlyViewdMovies(JSON.parse(localStorage.getItem("recentlyViewdMovies")!))
    }
  }, [])

  return (
    <div className="">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <RecentlyViewedContext.Provider
          value={{ recentlyViewdMovies, setRecentlyViewdMovies }}
        >
          <Navbar />
          <Outlet />
        </RecentlyViewedContext.Provider>
      </SearchContext.Provider>
    </div>
  );
};

export default Layout;
