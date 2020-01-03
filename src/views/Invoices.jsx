import React, { Component } from "react";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import {SERVER_URL} from '../helpers/constant';

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      invoices: [],
      categories: [],
      isFetching: false,
      selectedInvoice: null
    };


  }
  componentDidMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllProducts();
      this.fetchAllCategories();
      this.fetchAllInvoices();
    }
  }

  componentWillMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllProducts();
      this.fetchAllCategories();
      this.fetchAllInvoices();
    }
  }

  componentWillUpdate(oldProps) {
    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllProducts();
      this.fetchAllCategories();
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

  fetchAllProducts(){
    fetch(`${SERVER_URL}/getAllProducts`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: data.info.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchAllCategories(){
    fetch(`${SERVER_URL}/getCategories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          categories: data.info.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  onSelectedInvoice(invoice) {

    this.setState({
      selectedInvoice: invoice
    });
  }

  render() {
    const { invoices, selectedInvoice } = this.state;
    const thArray = [
        "id_invoice", "createDate", "deliveryDate", "total"
    ];
    console.log(invoices);

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="List of invoices"
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
                      {invoices.map((invoice, key) => {
                      return (
                        <tr key={key}>
                          {thArray.map((prop, key) => {
                            return <td key={key}>{invoice[prop]}</td>;
                          })}
                          <td>
                          <Fab style={{backgroundColor: '#ebdf5d'}} onClick={()=> this.onSelectedInvoice(invoice)}  aria-label="detail" data-toggle="modal" data-target="#myModalDetail" >
                            <VisibilityIcon />
                          </Fab>
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


  <div id="myModalDetail" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered ">


            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Invoice detail</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">

                {/* Invoice */}
                <h1>Invoice</h1>
                {selectedInvoice !== null ? (
                  <div>
                    <h>ID: {selectedInvoice.id_invoice}</h>
                    <br/>
                    <h>Created date (YY-MM-dd): {selectedInvoice.createDate}</h>
                    <br/>
                    <h>Delivery date (YY-MM-dd): {selectedInvoice.deliveryDate}</h>
                    <br/>
                    <h>Total price: ${selectedInvoice.total}</h>
                    <br/>
                  </div>
                ) : null}

                <br/>

              {/* Customer */}
              <h1>Customer</h1>
              {selectedInvoice !== null ? (
                <div>
                  <h>ID: {selectedInvoice.id_customer}</h>
                  <br/>
                  <h>Email: {selectedInvoice.email}</h>
                  <br/>
                  <h>Dial: {selectedInvoice.dial}</h>
                  <br/>
                  <h>Address: {selectedInvoice.address}</h>
                  <br/>
                </div>
              ) : null}

                  <br/>


              {/* Product */}
              <h1>Products</h1>
              {selectedInvoice !== null ? (
                selectedInvoice.products.map((product, key) => {
                  return (
                    <div>
                      <h><b>Product {key}:</b></h>
                      <br/>
                      <h>Name: {product.productName}</h>
                      <br/>
                      <h>Category: {product.categoryName}</h>
                      <br/>
                      <h>Price: {product.curPrice}</h>
                      <br/>
                    </div>
                  )
                })
              ) : null}


                </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Close"/>
              </div>
            </div>

        </div>
      </div>
      </div>
    );
  }
}


export default InvoiceList;
