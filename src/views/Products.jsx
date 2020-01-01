import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
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
      search: '',
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
    }
  }

  componentWillMount() {

    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllProducts();
    }
  }

  componentWillUpdate(oldProps) {
    if (!this.state.isFetching)
    {
      this.setState({
        isFetching: true
      });
      this.fetchAllProducts();
    }
  }

  fetchAllProducts(){
    fetch(`${SERVER_URL}/getAllProducts`)
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

  // onInsertTutorSubject = e => {
  //   e.preventDefault();
  //
  //   fetch(`${SERVER_URL}/subject/insert`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name:  e.target.subjectName.value,
  //       category: e.target.subjectCategory.value,
  //       description: e.target.subjectDesc.value
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   })
  //     .then(response => response.json() )
  //     .then(data => {
  //       swal("Sucessfully!", "Add subject successful!", "success").then(()=>{
  //         this.props.fetchAllproductsAction();
  //     });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //
  //     });
  //
  // }

  onDetailSubject(value) {
    console.log(value);
    $('#subjectCategory').val(value.categoryName);
    $('#subjectName').val(value.name);
    $('#subjectDescripID').val(value.price);
    $('#idSubject').val(value.id);
  }

  // onSubmitDetailSubject() {
  //   fetch(`${SERVER_URL}/subject/update`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       _id: $('#idSubject').val(),
  //       name:  $('#subjectName').val(),
  //       category:   $('#subjectCategory').val(),
  //       description:  $('#subjectDescripID').val()
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   })
  //     .then(response => response.json() )
  //     .then(data => {
  //       swal("Sucessfully!", "Edit subject successful!", "success").then(()=>{
  //         this.props.fetchAllproductsAction();
  //     });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //
  //     });
  // }

  // onDeleteSubject(value) {
  //   console.log(value);
  //   fetch(`${SERVER_URL}/subject/delete`, {
  //     method: 'DELETE',
  //     body: JSON.stringify({
  //       _id: value._id
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   })
  //     .then(response => response.json() )
  //     .then(data => {
  //       swal("Sucessfully!", "Delete subject successful!", "success").then(()=>{
  //         this.props.fetchAllproductsAction();
  //     });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //
  //     });
  // }

  render() {
    const { products } = this.state;
    const thArray = [
        "id", "name", "categoryName", "description", "price"
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
                title="products"
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
                          <Fab color="danger"  style={{backgroundColor: '#FF4A55'}} aria-label="delete">
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
          <form onSubmit={this.onInsertTutorSubject}>
              <div className="modal-header">
                <h4 className="modal-title">New Specialty</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <h>Subject</h>
                    <input type="text" name='subjectName' className="form-control" required/>
                  </div>
                  <div className="form-group">
                    <h>Category</h>
                    <select
                      className="form-control" name='subjectCategory'
                    >
                    <option value="Math">Math</option>
                    <option value="Literature">Literature</option>
                    <option value="Biology">Biology</option>
                    <option value="Languages">Languages</option>
                    <option value="Geography">Geography</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="History">History</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <h>Description</h>
                    <textarea className="form-control" name='subjectDesc' required />
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
                <h4 className="modal-title">Detail Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                <input id="idSubject" style={{display: 'none'}} type="text" name='subjectName' className="form-control" required/>
                  <h>Subject</h>
                    <input id="subjectName" type="text" name='subjectName' className="form-control" required/>
                  </div>
                  <div className="form-group">
                    <h>Category</h>
                    <select
                      id="subjectCategory"
                      className="form-control" name='subjectCategory'
                    >
                    <option value="Math">Math</option>
                    <option value="Literature">Literature</option>
                    <option value="Biology">Biology</option>
                    <option value="Languages">Languages</option>
                    <option value="Geography">Geography</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="History">History</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <h>Description</h>
                    <textarea id="subjectDescripID" className="form-control" name='subjectDesc' required />
                  </div>
                </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="button" onClick={()=>this.onSubmitDetailSubject()} className="btn btn-success" value="Submit"/>
              </div>
            </div>

        </div>
      </div>
      </div>
    );
  }
}


export default ProductList;
