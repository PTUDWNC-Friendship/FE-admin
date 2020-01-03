import React, { Component } from "react";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import {SERVER_URL} from '../helpers/constant';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      isFetching: false,
      selectedCustomer: null
    };

    this.onSelectedCustomer = this.onSelectedCustomer.bind(this);
  }
  componentDidMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllEmployees();
    }
  }

  componentWillMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllEmployees();
    }
  }

  componentWillUpdate(oldProps) {
    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllEmployees();
    }
  }

  fetchAllEmployees(){
    fetch(`${SERVER_URL}/getEmployees`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          employees: data.info.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onInsertEmployee = e => {
    e.preventDefault();
    fetch(`${SERVER_URL}/addEmployee`, {
      method: 'POST',
      body: JSON.stringify({
        email:  e.target.employeeEmail.value,
        password: e.target.employeePassword.value,
        dial: e.target.employeeDial.value,
        address: e.target.employeeAddress.value,
        type: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Add employee successful!", "success").then(()=>{
          this.fetchAllEmployees();
      });
      })
      .catch((error) => {
        console.log(error);

      });

  }


  onSelectedCustomer(employee) {

    this.setState({
      selectedCustomer: employee
    });
  }

  onSubmitDetailCustomer() {
    var newPassword = null;
    if ($('#employeePassword').val() === '')
    {
      newPassword = this.state.selectedCustomer.password;
    }
    else {
      newPassword = $('#employeePassword').val();
    }

    fetch(`${SERVER_URL}/users`, {
      method: 'PUT',
      body: JSON.stringify({
        id: $('#idCustomer').val(),
        email:  $('#employeeEmail').val(),
        password: newPassword,
        dial: $('#employeeDial').val(),
        address:   $('#employeeAddress').val(),
        type: this.state.selectedCustomer.type
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Edit employee successful!", "success").then(()=>{
          this.fetchAllEmployees();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  onChangeCustomerStatus(employee) {
    let newStatus = null;
    if (employee.status === 0) {
      newStatus = 1
    }
    else {
      newStatus = 0
    }
    fetch(`${SERVER_URL}/users`, {
      method: 'PUT',
      body: JSON.stringify({
        id: employee.id,
        email:  employee.email,
        password: employee.password,
        dial: employee.dial,
        address: employee.address,
        status: newStatus,
        type: employee.type
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Edit employee successful!", "success").then(()=>{
          this.fetchAllEmployees();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  render() {
    const { employees, selectedCustomer } = this.state;
    const thArray = [
        "id", "email", "dial", "address", "status"
    ];


    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div style={{display: 'flex', justifyContent: 'center', float: 'right'}}>
                <Fab color="primary" aria-label="add" data-toggle="modal" data-target="#myModalSubject" >
                  <AddIcon />
                </Fab>
              </div>
              <Card
                title="List of employees"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead className='text-left'>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employees.map((employee, key) => {
                      return (
                        <tr key={key}>
                          {thArray.map((prop, key) => {
                            return <td key={key}>{employee[prop]}</td>;
                          })}
                          <td>
                            <Fab style={{backgroundColor: '#e3c922'}} onClick={()=> this.onSelectedCustomer(employee)}  aria-label="detail" data-toggle="modal" data-target="#myModalDetail" >
                              <EditIcon />
                            </Fab>
                          </td>
                          {employee.status === 1 ? (
                            <td>
                              <Fab color="danger"  style={{backgroundColor: '#FF4A55'}} onClick={()=> this.onChangeCustomerStatus(employee)} aria-label="delete">
                                <DeleteIcon />
                              </Fab>
                            </td>
                          ) : (
                            <Fab color="success"  style={{backgroundColor: '#03b580'}} onClick={()=> this.onChangeCustomerStatus(employee)} aria-label="delete">
                              <CheckCircleRoundedIcon />
                            </Fab>
                          )}
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


        <div class="modal fade" id="myModalSubject" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <form onSubmit={this.onInsertEmployee}>
              <div className="modal-header">
                <h4 className="modal-title">New Employee</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <h>Email</h>
                    <input type="text" id='employeeEmail' name='employeeEmail' className="form-control" required/>
                  <h>Password</h>
                    <input type="password" id='employeePassword' name='employeePassword' className="form-control" required/>
                  <h>Dial</h>
                    <input type="text" id='employeeDial' name='employeeDial' className="form-control" required/>
                  <h>Address</h>
                    <input type="text" id='employeeAddress' name='employeeAddress' className="form-control" required/>
                </div>

                </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" className="btn btn-success" value="Add"/>
              </div>
            </form>
      </div>


    </div>
        </div>

  <div id="myModalDetail" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered ">


            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Customer detail</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                {selectedCustomer !== null ? (
                  <div className="form-group">
                   <input id="idCustomer" style={{display: 'none'}} type="text" name='employeeId' className="form-control"
                      value={selectedCustomer.id} onChange={this.onSelectedCustomer} required/>
                    <h>Email</h>
                      <input id="employeeEmail" type="text" name='employeeEmail' className="form-control"
                        value={selectedCustomer.email} onChange={this.onSelectedCustomer} required/>
                    <h>Password</h>
                      <input id="employeePassword" type="password" name='employeePassword' className="form-control"/>
                    <h>Dial</h>
                      <input id="employeeDial" type="text" name='employeeDial' className="form-control"
                        value={selectedCustomer.dial} onChange={this.onSelectedCustomer} required/>
                    <h>Address</h>
                      <input id="employeeAddress" type="text" name='employeeAddress' className="form-control"
                        value={selectedCustomer.address} onChange={this.onSelectedCustomer} required/>
                  </div>
                ) : null}
                </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="button" onClick={()=>this.onSubmitDetailCustomer()} className="btn btn-success" value="Submit"/>
              </div>
            </div>

        </div>
      </div>
      </div>
    );
  }
}


export default EmployeeList;
