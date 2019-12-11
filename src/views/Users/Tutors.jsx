import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import { fetchAllTutors } from "../../actions/user";

class TutorList extends Component {
  componentDidMount() {
    this.props.fetchAllTutorsAction();
  }

  render() {
    const tutors = this.props.userState.allTutors;
    const { user } = this.props.userState;
    const thArray = user !== null ? Object.keys(user) : [];
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Tutors"
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
                      {tutors.map((tutor, key) => {
                        return (
                          <tr key={key}>
                            {thArray.map((prop, key) => {
                              return <td key={key}>{tutor[prop]}</td>;
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
    fetchAllTutorsAction: () => dispatch(fetchAllTutors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TutorList));
