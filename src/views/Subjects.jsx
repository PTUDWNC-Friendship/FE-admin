import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import { fetchAllSubjects } from "../actions/subject";

class SubjectList extends Component {
  componentDidMount() {
    this.props.fetchAllSubjectsAction();
  }

  render() {
    const subjects = this.props.subjectState.allSubjects;
    const thArray = [
        "_id", "name", "category", "description"
    ];
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Subjects"
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
                      {subjects.map((subject, key) => {
                        return (
                          <tr key={key}>
                            {thArray.map((prop, key) => {
                              return <td key={key}>{subject[prop]}</td>;
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
    subjectState: state.subjectState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSubjectsAction: () => dispatch(fetchAllSubjects())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SubjectList));
