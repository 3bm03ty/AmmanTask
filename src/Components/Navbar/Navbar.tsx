import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { SearchContext } from "../../Contexts/SearchContext";

const Navbar: React.FC = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('')

  function search(e: any) {
    setInputValue(e.target.value);    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(inputValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <div className="navbar ">
      <div className="container">
        <Link to={"all"} className="text-decoration-none">
          <h1>
            Movies<span>DB</span>
          </h1>
        </Link>
        <div className="search">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            id="searchInput"
            onKeyUp={search}
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
