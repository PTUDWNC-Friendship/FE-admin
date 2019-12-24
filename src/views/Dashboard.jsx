import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Label } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { fetchAllContracts } from "../actions/contract";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRevenueIn10Day: null,
      year: (new Date()).getFullYear(),
      date: (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate(),
      month: (new Date()).getMonth()+1,
      yearOfMonth: new Date().getFullYear()
    }
  }

  componentWillMount() {
    this.props.fetchAllContractsAction();
  }


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  setvalueyear(e) {
      this.setState({
        year: e.target.value
      })
  }

  setValueDate(e) {
    this.setState({
      date: e.target.value
    })
}
setValueMonth(e) {
  this.setState({
    month:  parseInt(e.target.value,10)
  })
}

setValueYearOfMonth(e) {
  this.setState({
    yearOfMonth: parseInt(e.target.value,10)
  })
}

  render() {
    var dataRevenue = {
      labels: null,
      series: [
    
      ]
    }
    var dataRevenueYear = {
      labels: null,
      series: [
    
      ]
    }

    var dataRevenueMonth = {
      labels: null,
      series: [
    
      ]
    }

    let labelsRevenue = [];
    let seriesRevenue = [];



    let seriesYear = [];

    let labelsRevenueMonth = [];
    let seriesRevenueMonth = [];

    let totalRevenue = 0;


    dataRevenueYear.labels = dataBar.labels;
    const {allContracts} = this.props.contractState;
    let revenueContracts = allContracts;
    if(allContracts.length>0) {
      let count = 0;
      let totalDay = 0;

      // Note
      const arrayTopRevenue = allContracts;
      arrayTopRevenue.sort((function(a,b){
        return new Date(b.createdDate ) - new Date(a.createdDate);
      }))
      for(let i=0;i<arrayTopRevenue.length-1;i++) {
        let isSimilarDate = true;
        const date1 = new Date(arrayTopRevenue[i].createdDate);
        const endDate = new Date(arrayTopRevenue[i+1].createdDate);
        const dateFormat = date1.getUTCDate() + '-' + (date1.getMonth()+1) + '-' +date1.getFullYear();
        const endDateFormat = endDate.getUTCDate() + '-' + (endDate.getMonth()+1) + '-' +endDate.getFullYear();
        console.log(endDateFormat);
        const date2 = new Date(this.state.date);
        const date3 = new Date(arrayTopRevenue[i+1].createdDate);

        const month = new Date(arrayTopRevenue[i].createdDate).getMonth()+1;
        const year =  new Date(arrayTopRevenue[i].createdDate).getFullYear();
        if(arrayTopRevenue[i].status==='confirmed'||arrayTopRevenue[i].status==='finished') {
          if(date2.getUTCDate()==date1.getUTCDate()&&date2.getMonth()==date1.getMonth()&&date1.getFullYear()==date2.getFullYear()) {
              //labelsRevenue.push(arrayTopRevenue[i+1].createdDate);
              seriesRevenue.push(arrayTopRevenue[i].revenue)
          }

          if(month===this.state.month&&year === this.state.yearOfMonth) {
            if(date3.getUTCDate()==date1.getUTCDate()&&date3.getMonth()==date1.getMonth()&&date1.getFullYear()==date3.getFullYear()) {
              totalDay +=arrayTopRevenue[i].revenue;
            } else {
              isSimilarDate = false;
              totalDay += arrayTopRevenue[i].revenue;
              
            }

            if(isSimilarDate==false) {
              labelsRevenueMonth.push(dateFormat);
              seriesRevenueMonth.push(arrayTopRevenue[i].revenue);
              totalDay = 0;
            }

            if(i==arrayTopRevenue.length-2&&isSimilarDate==true&&(arrayTopRevenue[i+1].status==='confirmed'||arrayTopRevenue[i].status==='finished')) {
              totalDay+=arrayTopRevenue[i+1].revenue;
              totalRevenue+=arrayTopRevenue[i+1].revenue;
              labelsRevenueMonth.push(endDateFormat);
              seriesRevenueMonth.push(totalDay);
            } 
            if (i==arrayTopRevenue.length-2&&isSimilarDate==false&&(arrayTopRevenue[i+1].status==='confirmed'||arrayTopRevenue[i].status==='finished')){
              totalDay+=arrayTopRevenue[i+1].revenue;
              totalRevenue+=arrayTopRevenue[i+1].revenue;
              labelsRevenueMonth.push(endDateFormat);
              seriesRevenueMonth.push(totalDay);
          }
        }

          totalRevenue+=arrayTopRevenue[i].revenue;  
        }
      }

      dataRevenueMonth.labels = labelsRevenueMonth;
      dataRevenueMonth.series.push(seriesRevenueMonth);
      //
      dataRevenue.labels = labelsRevenue;
      dataRevenue.series.push(seriesRevenue)

      for(var i = 0;i<12;i+=1) {
        let totalRevenueMonth = 0;
        for(let j=0;j<allContracts.length;j++) {

            if(allContracts[j].status==='confirmed' && (new Date(allContracts[j].createdDate)).getMonth()===i && (new Date(allContracts[j].createdDate)).getFullYear()==this.state.year) {

              console.log((new Date(allContracts[j].createdDate)).getMonth());
              totalRevenueMonth+=allContracts[j].revenue;

              }
              
          }
          seriesYear.push(totalRevenueMonth);
        }

        dataRevenueYear.series.push(seriesYear);
      }
    
  

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue={'$'+totalRevenue}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={6}>
            <Col md={12} style={{display: 'flex', justifyContent: 'center'}}>
              <TextField type="date" value={this.state.date} onChange={(e)=>this.setValueDate(e)} id="standard-basic"  />
            </Col>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Revenue"
                category="Revenue in date"
                // stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataRevenue.series.length>0?dataRevenue:dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>

            <Col md={6}>
            <Col md={12} style={{display: 'flex', justifyContent: 'center'}}>
              
              <TextField type="number" value={this.state.month} onChange={(e)=>this.setValueMonth(e)} id="standard-basic"  label="Month"  />
              <TextField style={{marginLeft: '30px'}} type="number" value={this.state.yearOfMonth} onChange={(e)=>this.setValueYearOfMonth(e)} id="standard-basic"  label="Year"  />
            </Col>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Revenue"
                category="Revenue in month"
                // stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataRevenueMonth.series.length>0?dataRevenueMonth:dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            {/* <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col> */}
          </Row>

          <Row>
            <Col md={12} style={{display: 'flex', justifyContent: 'center'}}>
            <TextField value={this.state.year} onChange={(e)=>this.setvalueyear(e)} id="standard-basic" label="Year" />
            </Col>
            <Col md={12} style={{marginTop: '30px'}}>
              <Card
                id="chartActivity"
                title="2019 Revenue"
                category="Total revenue in 2019"
                // stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataRevenueYear}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>


            {/* <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col> */}
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
)(withRouter(Dashboard));


