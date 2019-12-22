import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import { withRouter } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BlockIcon from '@material-ui/icons/Block';
import Card from "components/Card/Card.jsx";
import { fetchAllStudents } from '../../actions/user';
import {SERVER_URL} from '../../helpers/constant';

class StudentList extends Component {

componentDidMount() {
    this.props.fetAllStudentsAction();
}

onChangeSatus(value) {

  let user = null;
  if(value.hasOwnProperty('status')) {
    user = {
      ...value
    }
    user.status = user.status==='inactive'?'active':'inactive'
  } else {
    user = {
      ...value,
      status: 'inactive'
    }
  }

  fetch(`${SERVER_URL}/user/update`, {
    method: 'POST',
    body: JSON.stringify({
        ...user
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => response.json() )
    .then(data => {
        this.props.fetAllStudentsAction();


    })
    .catch((error) => {
        console.log(error);
    });

}

  render() {
    const students = this.props.userState.allStudents;
    // const { user } = this.props.userState;
    const thArray = [
        "_id","username","firstName","lastName","gender","address","phone","type","role","bio","imageURL","status"
    ];

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Students"
                category="Description"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, key) => {
                        return (
                          <tr key={key}>
                            {thArray.map((prop, key) => {
                              return <td key={key}>{student[prop]}</td>;
                            })}

                             <td>
                            {student.status==='inactive'?
                            <Fab title="Unlock user" onClick={()=>this.onChangeSatus(student)}  style={{backgroundColor: '#87CB16'}}  aria-label="like" >
                              <LockOpenIcon />
                            </Fab> :
                            <Fab title="Lock user" onClick={()=>this.onChangeSatus(student)} style={{backgroundColor: '#FF4A55'}}   aria-label="like" >
                              <BlockIcon />
                          </Fab>
                            }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
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
      fetAllStudentsAction: () => dispatch(fetchAllStudents())
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(StudentList));
  
