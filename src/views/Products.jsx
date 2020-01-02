import React, { Component } from "react";
import { Grid, Row, Col, Table, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import { fetchAllproducts } from "../actions/subject";
import {SERVER_URL} from '../helpers/constant'
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      isFetching: false
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
    }
  }

  fetchAllProducts(){
    fetch(`${SERVER_URL}/getAllProducts`, {
      method: 'POST',
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
      method: 'POST',
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

  onInsertProduct = e => {
    e.preventDefault();
    console.log(e.target.subjectName.value);
    fetch(`${SERVER_URL}/addProducts`, {
      method: 'POST',
      body: JSON.stringify({
        id_category:  e.target.subjectCategory.value,
        name:  e.target.subjectName.value,
        imgUrl: e.target.productImg.value,
        description:  e.target.subjectDescripID.value,
        price: e.target.productPrice.value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Add subject successful!", "success").then(()=>{
          this.fetchAllProducts();
      });
      })
      .catch((error) => {
        console.log(error);

      });

  }

  onDetailSubject(value) {

    $('#subjectCategory').val(value.categoryName);
    $('#subjectName').val(value.name);
    $('#productPrice').val(value.price);
    $('#subjectDescripID').val(value.description);
    $('#idSubject').val(value.id);
    $('#productImg').attr("src",value.imgUrl);
  }

  onSubmitDetailProduct() {
    fetch(`${SERVER_URL}/products`, {
      method: 'PUT',
      body: JSON.stringify({
        id: $('#idSubject').val(),
        name:  $('#subjectName').val(),
        id_category:   $('#subjectCategory').val(),
        description:  $('#subjectDescripID').val(),
        price: $('#productPrice').val(),
        imgUrl: $('#productImg').attr("src")
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Edit product successful!", "success").then(()=>{
          this.fetchAllProducts();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  onDeleteProduct(value) {
    fetch(`${SERVER_URL}/deleteProducts`, {
      method: 'PUT',
      body: JSON.stringify({
        id: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        swal("Sucessfully!", "Delete product successful!", "success").then(()=>{
          this.fetchAllProducts();
      });
      })
      .catch((error) => {
        console.log(error);

      });
  }

  render() {
    const { products } = this.state;
    const thArray = [
        "id", "name", "categoryName", "description", "price"
    ];

    console.log(products);

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
                title="List of products"
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
                      {this.state.products.map((product, key) => {
                      return (
                        <tr key={key}>
                          {thArray.map((prop, key) => {
                            return <td key={key}>{product[prop]}</td>;
                          })}
                                                      <td>
                          <Fab style={{backgroundColor: '#e3c922'}} onClick={()=> this.onDetailSubject(product)}  aria-label="detail" data-toggle="modal" data-target="#myModalDetail" >
                            <EditIcon />
                          </Fab>
                          </td>
                          <td>
                          <Fab color="danger"  style={{backgroundColor: '#FF4A55'}} onClick={()=> this.onDeleteProduct(product.id)} aria-label="delete">
                            <DeleteIcon />
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

        <div class="modal fade" id="myModalSubject" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <form onSubmit={this.onInsertProduct}>
              <div className="modal-header">
                <h4 className="modal-title">New Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                 <h>Image URL</h>
                   <input type="text" name='productImg' className="form-control" required/>
                  <h>Product</h>
                    <input type="text" name='subjectName' className="form-control" required/>
                  <h>Price ($)</h>
                    <input type="text" name='productPrice' className="form-control" required/>
                </div>
                  <div className="form-group">
                    <h>Category</h>
                    <select
                      className="form-control" name='subjectCategory'
                    >
                    {this.state.categories.map((category, key) => {
                      return <option value={category.id}>{category.name}</option>;
                    })}
                    </select>
                  </div>
                  <div className="form-group">
                    <h>Description</h>
                    <textarea className="form-control" name='subjectDescripID' required />
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
                <h4 className="modal-title">Product detail</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                 <input id="idSubject" style={{display: 'none'}} type="text" name='subjectId' className="form-control" required/>
                  <Image
                    className="avatar border-gray"
                    id="productImg"
                    style={{maxWidth: '30%', maxHieght: '30%'}}
                  />
                  <br/>
                  <h>Name</h>
                    <input id="subjectName" type="text" name='subjectName' className="form-control" required/>
                  <h>Price ($)</h>
                    <input id="productPrice" type="text" name='subjectName' className="form-control" required/>
                  </div>
                  <div className="form-group">
                    <h>Category</h>
                    <select
                      id="subjectCategory"
                      className="form-control" name='subjectCategory'
                    >
                    {this.state.categories.map((category, key) => {
                      return <option value={category.id}>{category.name}</option>;
                    })}
                    </select>
                  </div>
                  <div className="form-group">
                    <h>Description</h>
                    <textarea id="subjectDescripID" className="form-control" name='subjectDesc' required />
                  </div>
                </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="button" onClick={()=>this.onSubmitDetailProduct()} className="btn btn-success" value="Submit"/>
              </div>
            </div>

        </div>
      </div>
      </div>
    );
  }
}


export default ProductList;
