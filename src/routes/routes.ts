import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../components/Dashboard";
import WeatherDetail from "../components/WeatherDetail";

export const router = createBrowserRouter([
  {     
    path: "/",
    Component: App,
    children: [
        {
            index: true, 
            Component: Dashboard, 
        },
        {
            path: "weather/:city",
            Component: WeatherDetail,
        }
    ]
  }
]);