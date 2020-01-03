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

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
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
      this.fetchAllCustomers();
    }
  }

  componentWillMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllCustomers();
    }
  }

  componentWillUpdate(oldProps) {
    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllCustomers();
    }
  }

  fetchAllCustomers(){
    fetch(`${SERVER_URL}/getCustomers`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          customers: data.info.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  onSelectedCustomer(customer) {

    this.setState({
      selectedCustomer: customer
    });
  }

  onSubmitDetailCustomer() {
    var newPassword = null;
    if ($('#customerPassword').val() === '')
    {
      newPassword = this.state.selectedCustomer.password;
    }
    else {
      newPassword = $('#customerPassword').val();
    }

    fetch(`${SERVER_URL}/users`, {
      method: 'PUT',
      body: JSON.stringify({
        id: $('#idCustomer').val(),
        email:  $('#customerEmail').val(),
        password: newPassword,
        dial: $('#customerDial').val(),
        address:   $('#customerAddress').val(),
        type: this.state.selectedCustomer.type
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Edit customer successful!", "success").then(()=>{
          this.fetchAllCustomers();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  onChangeCustomerStatus(customer) {
    let newStatus = null;
    if (customer.status === 0) {
      newStatus = 1
    }
    else {
      newStatus = 0
    }
    fetch(`${SERVER_URL}/users`, {
      method: 'PUT',
      body: JSON.stringify({
        id: customer.id,
        email:  customer.email,
        password: customer.password,
        dial: customer.dial,
        address: customer.address,
        status: newStatus,
        type: customer.type
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Edit customer successful!", "success").then(()=>{
          this.fetchAllCustomers();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  render() {
    const { customers, selectedCustomer } = this.state;
    const thArray = [
        "id", "email", "dial", "address", "status"
    ];


    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="List of customers"
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
                      {this.state.customers.map((customer, key) => {
                      return (
                        <tr key={key}>
                          {thArray.map((prop, key) => {
                            return <td key={key}>{customer[prop]}</td>;
                          })}
                          <td>
                            <Fab style={{backgroundColor: '#e3c922'}} onClick={()=> this.onSelectedCustomer(customer)}  aria-label="detail" data-toggle="modal" data-target="#myModalDetail" >
                              <EditIcon />
                            </Fab>
                          </td>
                          {customer.status === 1 ? (
                            <td>
                              <Fab color="danger"  style={{backgroundColor: '#FF4A55'}} onClick={()=> this.onChangeCustomerStatus(customer)} aria-label="delete">
                                <DeleteIcon />
                              </Fab>
                            </td>
                          ) : (
                            <Fab color="success"  style={{backgroundColor: '#03b580'}} onClick={()=> this.onChangeCustomerStatus(customer)} aria-label="delete">
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
                   <input id="idCustomer" style={{display: 'none'}} type="text" name='customerId' className="form-control"
                      value={selectedCustomer.id} onChange={this.onSelectedCustomer} required/>
                    <h>Email</h>
                      <input id="customerEmail" type="text" name='customerEmail' className="form-control"
                        value={selectedCustomer.email} onChange={this.onSelectedCustomer} required/>
                    <h>Password</h>
                      <input id="customerPassword" type="password" name='customerPassword' className="form-control"/>
                    <h>Dial</h>
                      <input id="customerDial" type="text" name='customerDial' className="form-control"
                        value={selectedCustomer.dial} onChange={this.onSelectedCustomer} required/>
                    <h>Address</h>
                      <input id="customerAddress" type="text" name='customerAddress' className="form-control"
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


export default CustomerList;
