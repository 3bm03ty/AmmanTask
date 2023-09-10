import React, { useState, useEffect, useContext } from "react";
import "./RecentlyViewd.css";
import Movie from "../Movie/Movie";
import Slider from "react-slick";
import { RecentlyViewedContext } from "../../Contexts/RecentlyViewedContext";
import { Link, useNavigate } from "react-router-dom";
import { settings } from "../../assets/SliderSettings/RecentlyViewd";

const RecentlyViewd: React.FC = () => {
  let navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const [drag, setDrag] = useState(false);
  const { recentlyViewdMovies, setRecentlyViewdMovies } = useContext(
    RecentlyViewedContext
  );

  useEffect(() => {
    document
      .querySelector(".slick-track")
      ?.addEventListener("mousedown", () => {
        setDrag(false);
      });

    document
      .querySelector(".slick-track")
      ?.addEventListener("mousemove", () => setDrag(true));
  }, []);
  const toggleSlide = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setHeight(!isExpanded ? 0 : getContentHeight());
    window.addEventListener("resize", () => {
      setHeight(!isExpanded ? 0 : getContentHeight());
    });
  }, [isExpanded]);

  const getContentHeight = () => {
    // Compute the height of the content inside the sliding div
    const contentElement = document.querySelector<HTMLElement>(".slick-list");
    return contentElement!.scrollHeight;
  };

  function openMovieDetails(imdbID: string) {
    if (!drag) {
      navigate("/movieDetails/" + imdbID);
    }
  }

  return (
    <>
      <h3 onClick={toggleSlide} className="recently">
        Recently Viewd shows{" "}
        <i
          className={
            isExpanded
              ? "fa-solid fa-chevron-down "
              : "fa-solid fa-chevron-down rotate-180deg"
          }
        ></i>
      </h3>
      <div
        style={{ height: `${height}px` }}
        id="slider"
        className={
          isExpanded ? "slide-down slider" : "slide-up slider overflow-hidden"
        }
      >
        <Slider {...settings}>
          {recentlyViewdMovies.map((movie: any, i) => {
            return (
              <div key={i} className="p-1">
                <img
                  onMouseUp={() => openMovieDetails(movie["imdbID"])}
                  src={movie.Poster}
                  alt=""
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default RecentlyViewd;
