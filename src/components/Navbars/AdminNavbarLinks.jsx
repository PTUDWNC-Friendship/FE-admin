import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import * as action from "../../actions/user";

class AdminNavbarLinks extends Component {

  render() {

    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/admin/profile" style={{color: 'grey'}}>
            Account
            </Link>
          </NavItem>
          <NavItem eventKey={3} href="/logout">
            Log out
          </NavItem>
        </Nav>
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
    authorizeUserAction: bindActionCreators(action.authorizeUser, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminNavbarLinks));
