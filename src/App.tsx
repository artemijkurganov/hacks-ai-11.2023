import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { MainLayout } from "./components/MainLayout/MainLayout.tsx";

const router = createBrowserRouter([{ path: "/", element: <MainLayout /> }]);

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
