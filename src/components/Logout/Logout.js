import React from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../../actions/login';

// eslint-disable-next-line react/prefer-stateless-function
class Logout extends React.Component {

  constructor(props) {
      super(props);
      const { logOut } = this.props;
      logOut();
  }

 
  
  render() {

    return(
       <Redirect to='/login'/>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
  stateLogins: state.login
  }
};

const mapDispatchToProps = (dispatch) => 
bindActionCreators(
  {
    logOut: action.logOut
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))