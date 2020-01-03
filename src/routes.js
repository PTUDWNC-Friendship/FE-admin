
import Dashboard from "views/Dashboard.jsx";
import EmployeeList from "views/Employees";
import ProductList from "views/Products";
import CustomerList from "views/Customers";
import InvoiceList from "views/Invoices";

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
    path: "/products",
    name: "Products",
    icon: "pe-7s-study",
    component: ProductList,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "pe-7s-study",
    component: CustomerList,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "pe-7s-study",
    component: EmployeeList,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "pe-7s-study",
    component: InvoiceList,
    layout: "/admin",
    sidebar: true
  }

];

export default dashboardRoutes;
