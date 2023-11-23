import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { MainLayout } from "./components/MainLayout/MainLayout.tsx";
import { MainPage } from "./components/MainPage/MainPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <MainPage /> }],
  },
]);

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
