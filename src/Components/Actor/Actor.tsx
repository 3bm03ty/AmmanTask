import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgThumb from "../../assets/imgs/notfound.jpg";
const Actor = () => {
  const params = useParams();
  let [actorDetails, setActorDetails] = useState<any>();
  async function getActorDetails() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    setActorDetails(data);
  }

  useEffect(() => {
    getActorDetails();
  }, []);
  return (
    <>
      <section>
        <div className="layer">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-4 ">
                <div className="media  mb-3">
                  <img
                    className="w-90 rounded-2  top-0 game-thumbnail"
                    src={
                      actorDetails?.profile_path != null
                        ? ("https://image.tmdb.org/t/p/w500/" +
                          actorDetails?.profile_path)
                        : imgThumb
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8">
                <h2>Actor Name: {actorDetails?.name}</h2>
                <p className="description">{actorDetails?.biography}</p>

                <h3>Additional Information</h3>
                <hr className="mt-2 mb-3" />
                <div className="row mb-3">
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="text-muted">Place of birth</h4>
                    <span>{actorDetails?.place_of_birth}</span>
                  </div>
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="text-muted">Birthday</h4>
                    <span>{actorDetails?.birthday}</span>
                  </div>
                  {actorDetails?.deathday ? (
                    <div className="col-6 col-md-4 p-2">
                      <h4 className="text-muted">Deathday</h4>
                      <span>{actorDetails?.deathday}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-6 col-md-4 p-2">
                    <h4 className="text-muted">Gender</h4>
                    <span>{actorDetails?.gender == 1 ? "Female" : "Male"}</span>
                    {/* <p>{game['title']}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Actor;
