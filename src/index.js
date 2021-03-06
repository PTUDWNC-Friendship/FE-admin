/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import myReducer from "./reducers/index";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import Login from "layouts/Login.jsx";
import Logout from "layouts/Logout.jsx";
import NotFound from "layouts/NotFound.jsx";
import Home from "layouts/Home";

const loggerMiddleware = createLogger();

const store = createStore(myReducer, applyMiddleware(thunk, loggerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
