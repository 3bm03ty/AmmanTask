import React from "react";
import RecentlyViewd from "../RecentlyViewd/RecentlyViewd";
import { NavLink, Outlet } from "react-router-dom";
import "./MoviesSeries.css";

const MoviesSeries = () => {
  return (
    <>
      <div className="container">
        <RecentlyViewd />
        <div className="d-flex mt-3 ">
          <NavLink
            to={"movies"}
            className={({ isActive }) => (isActive ? "active h3" : "h3")}
          >
            Movies
          </NavLink>
          <NavLink
            to={"series"}
            className={({ isActive }) => (isActive ? "active h3" : "h3")}
          >
            Series
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MoviesSeries;
