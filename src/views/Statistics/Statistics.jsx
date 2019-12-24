import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StatisticRevenueSubject from './StatisticRevenueSubject';
import StatisticRevenueTutor from './StatisticRevenueTutor';
import { fetchAllContracts } from '../../actions/contract';

class Statistics extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={6}>
              <StatisticRevenueTutor />
            </Col>
            <Col sm={6}>
              <StatisticRevenueSubject />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contractState: state.contractState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllContractsAction: () => dispatch(fetchAllContracts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Statistics));
