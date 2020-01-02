
import Dashboard from "views/Dashboard.jsx";
import User from "views/Users/User";
import ProductList from "views/Products";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/user",
    name: "User",
    icon: "pe-7s-users",
    component: User,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/products",
    name: "Products",
    icon: "pe-7s-study",
    component: ProductList,
    layout: "/admin",
    sidebar: true
  }

];

export default dashboardRoutes;
