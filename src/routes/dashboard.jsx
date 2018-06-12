import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import SolutionManagement from "../views/SolutionManagement/SolutionManagement.jsx";

import { Dashboard, Folder } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/solution",
    sidebarName: "Solution Packager",
    navbarName: "Solution Packager",
    icon: Folder,
    component: SolutionManagement
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
