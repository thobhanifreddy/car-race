import "./App.css";
import { StartGame } from "./pages/StartGame";
import CarScene from "./scenes/CarScene";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartGame />,
  },
  {
    path: "/game",
    element: <CarScene />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
