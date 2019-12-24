import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
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
      year: (new Date()).getFullYear()
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

  render() {
    var dataRevenue = {
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

    let labelsMonth = [];
    let seriesMoth = [];

    let totalRevenue = 0;


    dataRevenueMonth.labels = dataBar.labels;
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
        const date2 = new Date(arrayTopRevenue[i+1].createdDate);
        if(arrayTopRevenue[i].status==='confirmed') {
          if(date2.getDate()==date1.getDate()&&date2.getMonth()==date1.getMonth()&&date1.getFullYear()==date2.getFullYear()) {
            if(count<10) {
              count+=1;
              totalDay +=arrayTopRevenue[i].revenue;
            }
          }
          else {
            isSimilarDate = false;
            totalDay += arrayTopRevenue[i].revenue;
          }
          console.log(totalDay);
          if(isSimilarDate==false) {
            labelsRevenue.push(arrayTopRevenue[i].createdDate);
            seriesRevenue.push(totalDay);
            totalDay = 0;
          }
  
          if(i==arrayTopRevenue.length-2&&isSimilarDate==true) {
            totalDay+=arrayTopRevenue[i+1].revenue;
            totalRevenue+=arrayTopRevenue[i+1].revenue;
            labelsRevenue.push(arrayTopRevenue[i+1].createdDate);
            seriesRevenue.push(totalDay);
          } 
          if (i==arrayTopRevenue.length-2&&isSimilarDate==false){
            totalDay+=arrayTopRevenue[i+1].revenue;
            totalRevenue+=arrayTopRevenue[i+1].revenue;
            labelsRevenue.push(arrayTopRevenue[i+1].createdDate);
            seriesRevenue.push(totalDay);
          }
          totalRevenue+=arrayTopRevenue[i].revenue;  
        }
      }
      
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
          seriesMoth.push(totalRevenueMonth);
        }

        dataRevenueMonth.series.push(seriesMoth);
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
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Revenue"
                category="Top revenue in 10 days"
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
                      data={dataRevenueMonth}
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


