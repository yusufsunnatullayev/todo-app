import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
export const routes = [
  {
    id: 1,
    element: Home,
    path: "/",
  },
];
