import React, { Component } from "react";
import { Grid, Row, Col, Label } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "components/Card/Card.jsx";
import {SERVER_URL} from '../helpers/constant'
import { LineChart } from 'react-chartkick'
import 'chart.js'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      isFetching: false
    };

  }
  componentDidMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllInvoices();
    }
  }

  componentWillMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllInvoices();
    }
  }

  componentWillUpdate(oldProps) {
    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllInvoices();
    }
  }

  fetchAllInvoices(){
    fetch(`${SERVER_URL}/getAllInvoices`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          invoices: data.info.final
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRevenueFromInvoices()
  {
    const { invoices } = this.state;
    let listRevenue = {};

    for (let i = 0; i < invoices.length; i+=1)
    {
      const date = new Date(invoices[i].createDate);
      const dateFomartted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`;
      const revenue = invoices[i].total;

      const temp = {};
      temp[dateFomartted] = revenue;

      Object.assign(listRevenue, temp);
    }

    return listRevenue;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Card
            title="Revenue Statistic ($)"
            ctTableFullWidth
            ctTableResponsive
            content={
              <LineChart data={this.getRevenueFromInvoices()}/> }
          />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
