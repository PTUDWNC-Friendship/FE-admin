
import Dashboard from "views/Dashboard.jsx";
import User from "views/Users/User";
import SubjectList from "views/Subjects";
// import UserProfile from "views/UserProfile.jsx";
// import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User",
    icon: "pe-7s-users",
    component: User,
    layout: "/admin"
  },
  {
    path: "/subject",
    name: "Subject",
    icon: "pe-7s-study",
    component: SubjectList,
    layout: "/admin"
  },
  {
    path: "/contract",
    name: "Contract (DEVELOPMENT)",
    icon: "pe-7s-note2",
    component: null,
    layout: "/admin"
  },
  // {
  //   path: "/tag",
  //   name: "Tags",
  //   icon: "pe-7s-ticket",
  //   component: TagList,
  //   layout: "/admin"
  // },
  {
    path: "/feedback",
    name: "Feedback (DEVELOPMENT)",
    icon: "pe-7s-smile",
    component: null,
    layout: "/admin"
  },
  //==============================================
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
