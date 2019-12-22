import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import { fetchAllContracts } from "../actions/contract";

class ContractList extends Component {
  componentDidMount() {
    this.props.fetchAllContractsAction();
  }

  render() {
    const contracts = this.props.contractState.allContracts;
    const thArray = [
        "_id", "student", "tutor", "subject", "feedback", "duration", "createdDate", "hoursNumber", "totalPrice", "revenue", "message", "status"
    ];
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Contracts"
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
                      {contracts.map((contract, key) => {
                        return (
                          <tr key={key}>
                            <td>{contract._id}</td>
                            <td>{`${contract.student.firstName} ${contract.student.lastName}`}</td>
                            <td>{`${contract.tutor.firstName} ${contract.tutor.lastName}`}</td>
                            <td>{contract.subject.name}</td>
                            <td><button className="btn btn-warning">Feedback</button></td>
                            <td>{`${contract.startDate}
                                  ${contract.endDate}`}</td>
                            <td>{contract.createdDate}</td>
                            <td>{contract.hoursNumber}</td>
                            <td>{contract.totalPrice}</td>
                            <td>{contract.revenue}</td>
                            <td>{contract.message}</td>
                            <td>{contract.status}</td>
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
)(withRouter(ContractList));
