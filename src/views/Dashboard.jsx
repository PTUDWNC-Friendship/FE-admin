import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {

  render() {



    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>


            </Col>
          </Row>
          <Row>
            <Col md={6}>


            </Col>

            <Col md={6}>

            </Col>
          </Row>

          <Row>

            <Col md={12} style={{marginTop: '30px'}}>


            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
