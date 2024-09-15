import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage.tsx";
import { TasksProvider } from "./contexts/Tasks/TasksContext.tsx";
import ModalContextProvider from "./contexts/Modal/ModalContext.tsx";
import FiltersContextProvider from "./contexts/Filters/FiltersContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksProvider>
      <FiltersContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
        </ModalContextProvider>
      </FiltersContextProvider>
    </TasksProvider>
  </StrictMode>
);
