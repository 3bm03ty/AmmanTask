import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import imgThumb from "../../assets/imgs/notfound.jpg";

const MovieDetails: React.FC = () => {
  const params = useParams();
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const navigate = useNavigate();
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

  async function getMovieDetails(imdbID: string) {
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
    if(data.Response == 'False'){
      navigate("/NotFound");
    }
    setIsMovieLoading(false);
    setMovieDetails(data);
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
      stars.push(<i key={stars.length} className="fa-solid fa-star-half-stroke"></i>);
    }

    // Render remaining empty stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={stars.length + i} className="far fa-star"></i>);
    }

    return stars;
  };

  async function getActorData(actorName: string) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${actorName}`
      );
      
      
      if (data.results.length > 0) {
        navigate("/actor/" + data.results[0].id);
      }
    } catch (error) {
      console.error("Error fetching actor details:", error);
    }
  }

  useEffect(() => {
    getMovieDetails(params.id || "");
  }, []);
  return (
    <>
    {movieDetails.Title && <section style={{ backgroundImage: "url(" + movieDetails?.Poster + ")" }}>
        <div className="layer">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-4 ">
                <div className="media  mb-3">
                  <img
                    className="w-90 rounded-2  top-0 game-thumbnail"
                    src={
                      movieDetails?.Poster == "N/A" ? imgThumb : movieDetails?.Poster
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8">
                <h1>{movieDetails?.Title}</h1>
                <p className="description">{movieDetails?.Plot}</p>

                <h3>Additional Information</h3>
                <hr className="mt-2 mb-3" />
                <div className="row mb-3">
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Rating                      
                    </h4>
                    <p>{renderStars()}</p>
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Genre
                      <br />
                    </h4>
                    <div className="row">
                      {movieDetails?.Genre?.split(", ").map((genre, i) => {
                        return (
                          <p className="genre" key={i}>
                            {genre}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Released
                      <br />
                    </h4>
                    <span>{movieDetails?.Released}</span>
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Directors
                      <br />
                    </h4>{" "}
                    {movieDetails?.Director}
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Writer
                      <br />
                    </h4>{" "}
                    {movieDetails?.Writer}
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Language
                      <br />
                    </h4>
                    <div className="row">
                      {movieDetails?.Language?.split(", ").map((lang, i) => {
                        return (
                          <p className="lang" key={i}>
                            {lang}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="">
                      Actors
                      <br />
                    </h4>
                    <div className="row">
                      {movieDetails?.Actors?.split(", ").map((actor, i) => {
                        return (
                          <p
                            onClick={() => getActorData(actor)}
                            className="actor"
                            key={i}
                          >
                            {actor}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-6 col-md-4 p-2 ">
                    <h4 className="">
                      Awards
                      <br />
                    </h4>
                    {movieDetails?.Awards}
                  </div>
                  <div className="col-6 col-md-4 p-2 ">
                    <h4 className="">
                      Country
                      <br />
                    </h4>
                    {movieDetails?.Country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </>
  );
};

export default MovieDetails;
