import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from "components/Card/Card.jsx";
import { fetchAllStudents } from '../../actions/user';

class StudentList extends Component {

componentDidMount() {
    this.props.fetAllStudentsAction();
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
  
