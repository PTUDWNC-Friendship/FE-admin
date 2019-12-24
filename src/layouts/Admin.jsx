
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import AdminProfile from "views/Users/AdminProfile.jsx"

import { style } from "variables/Variables.jsx";
import routes from "routes.js";
import image from "assets/img/sidebar-3.jpg";
import { authorizeUser } from '../actions/user';
import childRoutes from '../routes-child';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown"
    };
  }

  handleNotificationClick = position => {
    const { firstName, lastName } = this.props.userState.user;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Hi <b>{`${firstName} ${lastName}`}</b>, welcome to <b>UBERFORTUTOR</b> Admin Page.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getChildRoutes = routes => {
    return routes.map((prop, key) => {
        return (
          <Route
            path={`/admin${prop.path}`}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
    });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    for (let i = 0; i < childRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          "/admin" + childRoutes[i].path
        ) !== -1
      ) {
        return childRoutes[i].name;
      }
    }
    return "Brand";
  };

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  componentDidMount() {
    const { userState, authorizeUserAction } = this.props;
    authorizeUserAction();

    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Hi <b>{userState.user !== null ? `${userState.user.firstName} ${userState.user.lastName}` : ''}</b>, welcome to <b>UBERFORTUTOR</b> Admin Page.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
  }

  componentDidUpdate(e) {

    const { userState, authorizeUserAction } = this.props;

    if (userState.user === null) {
      authorizeUserAction();
      const { history } = this.props;
      history.push("/login");
    }

    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    console.log(this.props);
    const invisibleRoute = [];
    for (let i = 0; i < routes.length; i+=1)
    {
      if (routes[i].path !== '/contract')
      {
        invisibleRoute.push(routes[i]);
      }
    }
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          {this.props.location.pathname === '/admin' ? (
            <AdminProfile/>
          ) : null}

          <Switch>
            {this.getRoutes(routes)}
            {this.getChildRoutes(childRoutes)}
          </Switch>
          <Footer />
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            mini={this.state["mini"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.userState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorizeUserAction: bindActionCreators(authorizeUser, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Admin));
