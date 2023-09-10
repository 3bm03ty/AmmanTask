import React, { useContext, useEffect, useState } from "react";
import "./Movie.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { RecentlyViewedContext } from "../../Contexts/RecentlyViewedContext";
import InfiniteScroll from "react-infinite-scroller";
import imgThumb from "../../assets/imgs/notfound.jpg";
import NoData from "../NoData/NoData";
const Movie = ({ movies, isLoading }: any) => {
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [dialogHeight, setDialogHeight] = useState(0);
  const [rowWidth, setRowWidth] = useState(0);
  const [imdbID, setImdbID] = useState("");
  const [targetIndex, setTargetIndex] = useState("0");
  const [isOpen, setIsOpen] = useState(false);

  const { recentlyViewdMovies, setRecentlyViewdMovies } = useContext(
    RecentlyViewedContext
  );
  const [movieDetails, setMovieDetails] = useState({
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setRowWidth(
        document.querySelector<HTMLElement>(".row")?.offsetWidth || 0
      );
    };
    handleResize();
    window.addEventListener("resize", () => {
      handleResize();
    });
  }, []);

  useEffect(() => {
    const dialogElements = document.querySelectorAll<HTMLElement>(
      ".dialog.loaded-dialog"
    );

    if (isMovieLoading) {
      setDialogHeight(
        document.querySelectorAll<HTMLElement>(".dialog.loading-dialog")[
          Number(targetIndex)
        ]?.offsetHeight! - 10 || 0
      );
    } else {
      setDialogHeight(
        document.querySelectorAll<HTMLElement>(".dialog.loaded-dialog")[
          Number(targetIndex)
        ]?.offsetHeight! - 10 || 0
      );
    }
  }, [isMovieLoading]);

  async function getMovieDetails(imdbID: string) {
    setImdbID(imdbID);
    setMovieDetails({
      Title: "",
      Year: "",
      Rated: "",
      Released: "",
      Runtime: "",
      Genre: "",
      Director: "",
      Writer: "",
      Actors: "",
      Plot: "",
      Language: "",
      Country: "",
      Awards: "",
      Poster: "",
      Ratings: [],
      Metascore: "",
      imdbRating: "",
      imdbVotes: "",
      imdbID: "",
      Type: "",
      DVD: "",
      BoxOffice: "",
      Production: "",
      Website: "",
      Response: "",
    });
    setIsMovieLoading(true);
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}?i=${imdbID}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    setIsMovieLoading(false);
    setMovieDetails(data);

    let recentlyViewdMovies = [];
    if (localStorage.getItem("recentlyViewdMovies") != null) {
      recentlyViewdMovies = JSON.parse(
        localStorage.getItem("recentlyViewdMovies") || JSON.stringify([])
      );
    }

    let isMovieExist = false;
    for (let i = 0; i < recentlyViewdMovies.length; i++) {
      if (recentlyViewdMovies[i].imdbID == data.imdbID) {
        isMovieExist = true;
      }
    }
    if (!isMovieExist) {
      recentlyViewdMovies.push(data);
    }
    localStorage.setItem(
      "recentlyViewdMovies",
      JSON.stringify(recentlyViewdMovies)
    );
    setRecentlyViewdMovies(recentlyViewdMovies);
  }

  const renderStars = () => {
    const rating = parseFloat(Number(movieDetails.imdbRating) / 2 + "");
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(
        <i key={stars.length} className="fa-solid fa-star-half-stroke"></i>
      );
    }

    // Render remaining empty stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={stars.length + i} className="far fa-star"></i>);
    }

    return stars;
  };

  const handleCardClick = (e: any) => {
    setTargetIndex(e.target.getAttribute("alt"));

    window.addEventListener("resize", () => {
      if (isMovieLoading) {
        setDialogHeight(
          document.querySelectorAll<HTMLElement>(".dialog.loading-dialog")[
            Number(e.target.getAttribute("alt"))
          ]?.offsetHeight! - 10 || 0
        );
      } else {
        setDialogHeight(
          document.querySelectorAll<HTMLElement>(".dialog.loaded-dialog")[
            Number(e.target.getAttribute("alt"))
          ]?.offsetHeight! - 10 || 0
        );
      }
    });
    let dialog = e.target.nextElementSibling;
    // let rowWidth = document.querySelector<HTMLElement>(".row")?.offsetWidth;
    let cardWidth =
      document.querySelector<HTMLElement>(".movie-card")?.offsetWidth;
    let arrowUp = document.querySelector<HTMLElement>(".fa-solid.fa-caret-up");

    let imgs = Array.from(
      document.querySelectorAll<HTMLElement>(".movie-card img")
    );

    if (
      dialog &&
      (dialog.classList.value == "card-overview text-center" ||
        dialog.classList.value == "card-overview loading-overview text-center")
    ) {
      let card = e.target.parentNode.parentNode.parentNode.parentNode;
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i] != e.target) imgs[i].style.border = "none";
      }
      if (e.target?.tagName == "IMG") {
        if (e.target.style.border == "none") {
          e.target.style.border = "2px solid #FFD600";
        } else {
          e.target.style.border = "none";
        }
      }
      setIsOpen(!isOpen);
      let dialogs = Array.from(
        document.querySelectorAll<HTMLElement>(".card-overview")
      );

      for (let i = 0; i < dialogs.length; i++) {
        if (dialogs[i] != dialog) dialogs[i].style.display = "none";
      }
      let cards = document.querySelectorAll<HTMLElement>(".row .w-20");
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.marginBottom = "0";
      }

      if (dialog?.style.display == "block") {
        dialog.style.display = "none";
        card.style.marginBottom = "0";
      } else {
        if (dialog.childNodes[1]) {
          dialog.style.display = "block";
        }
      }
    }
  };

  return (
    <>
      <div className="row position-relative mt-3">
        {!isLoading
          ? movies?.length > 0 ? movies?.map((movie: any, i: any) => {
            return (
              <div
                key={movie["imdbID"]}
                className="w-20 d-flex flex-column"
                onClick={handleCardClick}
              >
                <div className="">
                  <div
                    className="movie"
                    style={{
                      marginBottom: movie.imdbID == imdbID ? dialogHeight : 0,
                    }}
                  >
                    <div className="movie-card p-1">
                      <img
                        onClick={() => {
                          getMovieDetails(movie["imdbID"]);
                        }}
                        className="w-100"
                        src={
                          movie?.Poster == "N/A" ? imgThumb : movie?.Poster
                        }
                        alt={i + ""}
                      />
                      {!isMovieLoading ? (
                        <div className="card-overview text-center">
                          {/* Render movie overview data */}

                          <i className="fa-solid fa-caret-up"></i>
                          <div
                            className="dialog loaded-dialog"
                            style={{
                              backgroundImage: `url(${
                                movieDetails!["Poster"]
                              }`,
                              width: rowWidth + "px",
                            }}
                          >
                            <div className="layer">
                              <h1>{movieDetails.Title}</h1>
                              <p>{movieDetails.Plot}</p>
                              <div className="row">
                                <div className="w-20">
                                  <h2>Rating</h2>
                                  {renderStars()}
                                </div>
                                <div className="w-20">
                                  <h2>Genre</h2>
                                  <div className="spans">
                                    {movieDetails.Genre.split(", ").map(
                                      (genre, i) => {
                                        return (
                                          <span className="genre" key={i}>
                                            {genre}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                                <div className="w-20">
                                  <h2>Released</h2>
                                  <span>{movieDetails.Released}</span>
                                </div>
                                <div className="w-20">
                                  <h2>Directors</h2>
                                  <h5>{movieDetails.Director}</h5>
                                </div>
                                <div className="w-20">
                                  <h2>Language</h2>
                                  <div className="spans">
                                    {movieDetails.Language.split(", ").map(
                                      (lang, i) => {
                                        return (
                                          <span className="lang" key={i}>
                                            {lang}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Link to={"/movieDetails/" + movie["imdbID"]}>
                                <button className="more-btn">
                                  More Info
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="card-overview loading-overview text-center">
                          {/* Render movie overview data */}
                          <i className="fa-solid fa-caret-up"></i>
                          <div
                            className="dialog loading-dialog"
                            style={{ width: rowWidth + "px" }}
                          >
                            <div className="layer">
                              <h5></h5>
                              <p></p>
                              <div className="row">
                                <div className="w-20">
                                  <h2>Rating</h2>
                                  <h6></h6>
                                </div>
                                <div className="w-20">
                                  <h2>Genre</h2>
                                  <h6></h6>
                                </div>
                                <div className="w-20">
                                  <h2>Released</h2>
                                  <h6></h6>
                                </div>
                                <div className="w-20">
                                  <h2>Directors</h2>
                                  <h6></h6>
                                </div>
                                <div className="w-20">
                                  <h2>Language</h2>
                                  <h6></h6>
                                </div>
                              </div>

                              {/* <button className="more-btn">More Info</button> */}
                              <h6 className="more-btn-loading"></h6>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : <NoData/>
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => {
              return (
                <div key={i} className="w-20 card-container ">
                  <div className="card w-100 ">
                    <div className="card__image"></div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Movie;
