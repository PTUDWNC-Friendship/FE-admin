import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import TextField from '@material-ui/core/TextField';
import { fetchAllContracts } from '../../actions/contract';

class StatisticRevenueSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
        startDate: new Date(),
        endDate: new Date(),
        subjects: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.calculateRevenue = this.calculateRevenue.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllContractsAction();
  }

  componentDidUpdate(oldProps) {
      if (oldProps.contractState.allContracts !== this.props.contractState.allContracts) {
          const { allContracts } = this.props.contractState;
          const { startDate, endDate } = this.state;
          this.setState({
            subjects: this.calculateRevenue(allContracts, startDate, endDate)
          })
      }
  }
  
  handleChange = e => {
    const { name, value } = e.target;
    const { startDate, endDate } = this.state;
    const { allContracts } = this.props.contractState;
    this.setState({
        [name]: value,
        subjects: name === 'startDate' ? this.calculateRevenue(allContracts, value, endDate) : this.calculateRevenue(allContracts, startDate, value)
    })
  }

  calculateRevenue(allContracts, startDate, endDate) {
    var filterDataList = allContracts.filter(element => {
        return element.createdDate >= startDate && element.createdDate <= endDate;
    })
    
    for (let i = 0; i < filterDataList.length - 1; i++) {
        filterDataList[i]['totalRevenue'] = filterDataList[i].totalPrice - filterDataList[i].revenue;
    }

    for (let i = 0; i < filterDataList.length - 1; i++) {
        filterDataList[i]['totalRevenue'] = filterDataList[i].totalPrice - filterDataList[i].revenue;
        for (let j = i + 1; j < filterDataList.length; j++) {
            if (filterDataList[i]._idSubject === filterDataList[j]._idSubject) {
                filterDataList[i]['totalRevenue'] += filterDataList[j].totalPrice - filterDataList[j].revenue ;
                filterDataList.splice(j,1);
                j--;
            }
        }
    }
    return filterDataList.sort((a,b) => a.totalRevenue - b.totalRevenue).reverse();
  }


  render() {
    const { subjects } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={12} sm={12}>
                <h3>Top Revenue of Subjects</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={12} sm={12}>
              <TextField
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleChange}
              />
              <TextField
                type="date"
                name="endDate"
                value={this.state.endDate}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row>
            {subjects.map((value, index) => {
              return (
                <Col key={index.toString()} lg={12} sm={12}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-wallet text-success" />}
                    statsText="Revenue"
                    statsValue={value.totalRevenue}
                    statsIcon={<i className="fa fa-user-o" />}
                    statsIconText={value.subject.name}
                  />
                </Col>
              );
            })}
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
)(withRouter(StatisticRevenueSubject));
