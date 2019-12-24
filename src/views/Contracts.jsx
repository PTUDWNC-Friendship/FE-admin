import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { fetchAllContracts } from "../actions/contract";
import $ from 'jquery';
import { SERVER_URL } from "helpers/constant";

class ContractList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailContract: null,
      feedback: null,
      isFetching: false
    };

    this.onDetailContract = this.onDetailContract.bind(this);
    this.onDetailFeedback = this.onDetailFeedback.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllContractsAction();
  }

  onDetailContract(contract) {
    this.setState({
      detailContract:  { ...contract }
    });

    $("#idDetail").text(contract._id);
    $("#studentDetail").text(`${contract.student.firstName} ${contract.student.lastName}`);
    $("#tutorDetail").text(`${contract.tutor.firstName} ${contract.tutor.lastName}`);
    $("#subjectDetail").text(contract.subject.name);
    $("#startDateDetail").text(contract.startDate);
    $("#endDateDetail").text(contract.endDate);
    $("#createdDateDetail").text(contract.createdDate);
    $("#hoursNumberDetail").text(contract.hoursNumber);
    $("#totalPriceDetail").text(contract.totalPrice);
    $("#revenueDetail").text(contract.revenue);
    $("#statusDetail").text(contract.status);
    $("#messageDetail").text(contract.message);

  }

  onDetailFeedback(_idFeedback) {
    this.setState({
      isFetching: true
    })

    fetch(`${SERVER_URL}/feedback/api/${_idFeedback}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          feedback: {...json},
          isFetching: false
        })
      })
      .catch(error => console.log(error));
  }

  onHandleDisputed(contract){
    this.setState({
      detailContract:  { ...contract }
    });

    $('#reportMsgContract').val(contract.message);
    $('#idContract').val(contract._id);
  }
  Approve() {

    let contract = {
      ...this.state.detailContract
    }
    delete contract.student;
    delete contract.tutor;
    delete contract.subject;
    delete contract.feedback;
   contract.status = 'canceled';

    fetch(`${SERVER_URL}/contract/update`,
    {
      method: 'POST',
      body: JSON.stringify({
          ...contract
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {

        this.setState({
          isFetching: false
        })
        this.props.fetchAllContractsAction();
        $('#closeModalReport').click();
      })
      .catch(error => console.log(error));

  }
  render() {
    const contracts = this.props.contractState.allContracts;
    const { feedback } = this.state;
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
                            <td>
                              <button 
                                className="btn btn-warning"
                                aria-label="add"
                                data-toggle="modal"
                                data-target="#modalFeebackx"
                                onClick={() => this.onDetailFeedback(contract._idFeedback)}>
                                Feedback
                              </button>
                            </td>
                            <td>{`${contract.startDate}
                                  ${contract.endDate}`}</td>
                            <td>{contract.createdDate}</td>
                            <td>{contract.hoursNumber}</td>
                            <td>{contract.totalPrice}</td>
                            <td>{contract.revenue}</td>
                            <td>{contract.message}</td>
                            <td>{contract.status}</td>
                            <td>
                              <Fab
                                color="secondary"
                                aria-label="add"
                                data-toggle="modal"
                                data-target="#modalContract"
                                onClick={() => this.onDetailContract(contract)}
                              >
                                <VisibilityIcon />
                              </Fab>
                            </td>
                            <td>
                            {contract.status==='disputed'?
                            <Fab
                                style={{backgroundColor: '#e3c922'}}
                                aria-label="add"
                                data-toggle="modal"
                                data-target="#myModalDisputed"
                                onClick={() => this.onHandleDisputed(contract)}
                              >
                                <ReportProblemIcon />
                              </Fab>:null}
                              <Link to="/admin/maps" >test</Link>
                            </td>
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

        <div id="modalContract" className="modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Detail Contract</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <div className="d-flex">
                    <div className="col-4"><h4>ID</h4></div>
                    <div className="col-8" id="idDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Student</h4></div>
                    <div className="col-8" id="studentDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Tutor</h4></div>
                    <div className="col-8" id="tutorDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Subject</h4></div>
                    <div className="col-8" id="subjectDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Created Date</h4></div>
                    <div className="col-8" id="createdDateDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Start Date</h4></div>
                    <div className="col-8" id="startDateDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>End Date</h4></div>
                    <div className="col-8" id="endDateDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Hours</h4></div>
                    <div className="col-8" id="hoursNumberDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Total Price</h4></div>
                    <div className="col-8" id="totalPriceDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Revenue</h4></div>
                    <div className="col-8" id="revenueDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Status</h4></div>
                    <div className="col-8" id="statusDetail"></div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4"><h4>Message</h4></div>
                    <div className="col-8" id="messageDetail"></div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Approve"
                  disabled={this.state.detailContract ? this.state.detailContract.status !== 'disputed' : false}
                />
                <input
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  value="OK"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div id="modalFeebackx" className="modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Feedback</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div style={{marginTop: '50px;'}} >
                <div>
                  <div className="d-flex">
                    <div className="col-md-4"><label>ID</label></div>
                    <div className="col-md-8">{feedback ? feedback._id : null}</div>
                  </div>
                  <div className="d-felx" style={{marginTop: '20px;'}}>
                  <div className="col-md-12">
                 <Box component="fieldset"  >
                        <Typography defaultValue="Rating" component="legend">Rating </Typography>
                            <Rating
                                id="ratingContract"
                                name="simple-controlled"
                                value={this.state.feedback!==null?this.state.feedback.rate:0}
                                max={10}
                            />
                </Box>
                 </div>
                  </div>
                  
                  <div className="form-group col-md-12" style={{marginTop: '20px;'}}>
                    <textarea className="form-control" value={feedback ? feedback.comment : null} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  value="OK"
                />
              </div>
            </div>
          </div>
        </div>


                 {/* Modal Disputed */}
                 <div id="myModalDisputed" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered ">

         
            <div className="modal-content">
            <div className="modal-header">
                            <h4 className="modal-title">Cancel contract</h4>
            </div>
            <div className="modal-body ">
                <input style={{display: 'none'}} id="idContract"></input>
                <div className="d-flex justify-content-center">
                    <TextField
                    style={{width: '100%'}}
                    id="reportMsgContract"
                    label="Reason"
                    multiline
                    rows="4"
                    variant="filled"
                    />
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">

                    <Button onClick={()=>this.Approve()} style={{width: '60%'}} className="btn btn-primary" color="secondary">
                        Approve
                    </Button>

                <button id="closeModalReport" style={{display: 'none'}} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>

        </div>
        </div>

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
