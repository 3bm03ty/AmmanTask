import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  HashRouter,
  createHashRouter
} from "react-router-dom";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Layout/Layout";
import Series from "./Components/Series/Series";
import MoviesSeries from "./Components/MoviesSeries/MoviesSeries";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Actor from "./Components/Actor/Actor";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"all"} /> },
        {
          path: "all",
          element: <MoviesSeries />,
          children: [
            {
              path: "",
              element: <Navigate to={"movies"} />,
            },
            {
              path: "movies",
              element: <Movies />,
            },
            {
              path: "series",
              element: <Series />,
            },
          ],
        },
        { path: "movieDetails/:id", element: <MovieDetails /> },
        { path: "actor/:id", element: <Actor /> },
      ],
    },
    {path: '*' , element: <NotFound/>}
  ]);
  return (
    <div className=" py-2">
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
