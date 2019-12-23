import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';

import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import { fetchAllFeedbacks } from "../actions/feedback";
import {SERVER_URL} from '../helpers/constant'

class Feedbacks extends Component {

  componentDidMount() {
    this.props.fetchAllFeedbacksAction();
  }


  render() {
    const feedbacks = this.props.feedbackState.allFeedbacks;

    const thArray = [
        "_id", "student", "comment", "rate"
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
                      {feedbacks.length>0?feedbacks.map((feedback, key) => {
                        return (
                          <tr key={key}>
                            <td>{feedback._id}</td>
                            <td></td>
                            <td>{feedback.comment}</td>
                            <td>{feedback.rate}</td>
                          </tr>
                        );
                      }):null}
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
    feedbackState: state.feedbackState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllFeedbacksAction: () => dispatch(fetchAllFeedbacks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Feedbacks));
