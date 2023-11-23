import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { MainLayout } from "./components/MainLayout/MainLayout.tsx";
import { MainPage } from "./components/MainPage/MainPage.tsx";
import { THEME_2022, ThemeContext } from "@skbkontur/react-ui";

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
      <ThemeContext.Provider value={THEME_2022}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </StrictMode>
  );
};

export default App;
