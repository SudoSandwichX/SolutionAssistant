import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import VersionControl from "../views/VersionControl/VersionControl.jsx";
import SolutionManagement from "../views/SolutionManagement/SolutionManagement.jsx";

import { Dashboard, Folder } from "@material-ui/icons";

/*
{
  path: "/dashboard",
  sidebarName: "Dashboard",
  navbarName: "Dashboard",
  icon: Dashboard,
  component: DashboardPage
},
*/

const dashboardRoutes = [
  {
    path: "/versionControl",
    sidebarName: "Version Control",
    navbarName: "Version Control",
    icon: Dashboard,
    component: VersionControl
  },
  {
    path: "/solution",
    sidebarName: "Solution Packager",
    navbarName: "Solution Packager",
    icon: Folder,
    component: SolutionManagement
  },
  { redirect: true, path: "/", to: "/solution", navbarName: "Redirect" }
];

export default dashboardRoutes;
