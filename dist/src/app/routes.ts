import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { GymPlanner } from "./pages/GymPlanner";
import { History } from "./pages/History";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "gym-planner", Component: GymPlanner },
      { path: "history", Component: History },
      { path: "about", Component: About },
    ],
  },
]);
