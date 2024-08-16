import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import UserID from "./hooks/userID";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: (
      <UserID>
        <Quiz />
      </UserID>
    ),
  },
  {
    path: "/result",
    element: (
      <UserID>
        <Result />
      </UserID>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
