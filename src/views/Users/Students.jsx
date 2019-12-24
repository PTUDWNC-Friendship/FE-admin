import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Image, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import { withRouter, Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BlockIcon from "@material-ui/icons/Block";
import Card from "components/Card/Card.jsx";
import { fetchAllStudents } from "../../actions/user";
import { SERVER_URL } from "../../helpers/constant";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: null,
      search: '',
      indexFirst: 0,
      indexLast: 0,
      currentPage: 1,
      dataPerPage: 3,
      totalPage: 1,
      students: []
    };

    this.choosePage = this.choosePage.bind(this);
  }

  componentDidMount() {
    this.props.fetAllStudentsAction();
  }

  componentDidUpdate(oldProps) {
    // Pagination
    if (oldProps.userState.allStudents !== this.props.userState.allStudents) {
      const { search, dataPerPage } = this.state;
      this.setState({
        totalPage: Math.ceil(
          this.props.userState.allStudents.length / this.state.dataPerPage
        ),
        students: this.props.userState.allStudents
          .filter(element => {
            if (!search) {
              return true;
            }
            return true;
            // return (
            //   element.category.toLowerCase().search(search.toLowerCase()) !==
            //     -1 ||
            //   element.name.toLowerCase().search(search.toLowerCase()) !== -1
            // );
          })
          .slice(0, dataPerPage)
      });
    }
  }

  choosePage(page) {
    const { search } = this.state;
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState(prevState => {
      const indexFirst = (page - 1) * prevState.dataPerPage;
      const indexLast = page * prevState.dataPerPage;
      return {
        indexFirst,
        indexLast,
        currentPage: page,
        students: this.props.userState.allStudents
          .filter(element => {
            if (!search) {
              return true;
            }
            return true;
            // return (
            //   element.category.toLowerCase().search(search.toLowerCase()) !==
            //     -1 ||
            //   element.name.toLowerCase().search(search.toLowerCase()) !== -1
            // );
          })
          .slice(indexFirst, indexLast)
      };
    });
  }
  onChangeSatus(value) {
    let user = null;
    if (value.hasOwnProperty("status")) {
      user = {
        ...value
      };
      user.status = user.status === "Inactive" ? "Active" : "Inactive";
    } else {
      user = {
        ...value,
        status: "Inactive"
      };
    }

    fetch(`${SERVER_URL}/user/update`, {
      method: "POST",
      body: JSON.stringify({
        ...user
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.props.fetAllStudentsAction();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSelectElement(element) {
    this.setState({
      selectedStudent: element
    });
  }

  showContentModal() {
    const { selectedStudent } = this.state;
    if (selectedStudent !== null) {
      const statusAlert = [];
      if (selectedStudent.status !== null) {
        if (selectedStudent.status === "notverified") {
          statusAlert.push(
            <Alert
              className="alert alert-warning text-center"
              style={{ padding: "1%", marginLeft: "3%", fontSize: "20px" }}
            >
              Not Verified
            </Alert>
          );
        } else if (selectedStudent.status === "Active") {
          statusAlert.push(
            <Alert
              className="alert alert-success text-center"
              style={{ padding: "1%", marginLeft: "3%", fontSize: "20px" }}
            >
              Active
            </Alert>
          );
        } else if (selectedStudent.status === "Inactive") {
          statusAlert.push(
            <Alert
              className="alert alert-danger text-center"
              style={{ padding: "1%", marginLeft: "3%", fontSize: "20px" }}
            >
              Inactive
            </Alert>
          );
        }
      }
      return (
        <div id="detailSpecialtyModal" className="modal fade">
          {/* -------Modal--------- */}
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Student Information</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="card card-user" style={{ marginBottom: "3%" }}>
                  <div className="content">
                    <div className="text-center">
                      <Image
                        className="avatar border-gray"
                        src={selectedStudent.imageURL}
                      />
                      <br />
                      <strong style={{ color: "green" }}>
                        {`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                        <br />
                      </strong>
                      <br />
                      {statusAlert}
                      <br />
                    </div>
                    <br />
                    <div
                      style={{ wordBreak: "break-all", whiteSpace: "normal" }}
                    >
                      <p>
                        <strong>Email (Username): </strong>
                        {selectedStudent.username}
                      </p>
                      <br />
                      <p>
                        <strong>Account type: </strong>
                        {selectedStudent.type === "local"
                          ? "Normal registration account"
                          : `${selectedStudent.username} account`}
                      </p>
                      <br />
                      <p>
                        <strong>Role: </strong>
                        {selectedStudent.role}
                      </p>
                      <br />
                      <p>
                        <strong>Gender:</strong>
                        {selectedStudent.gender !== null
                          ? ` ${selectedStudent.gender}`
                          : " Other"}
                      </p>
                      <br />
                      <p>
                        <strong>Address:</strong>
                        {selectedStudent.address !== null
                          ? ` ${selectedStudent.address}`
                          : " this user haven not filled in an address"}
                      </p>
                      <br />
                      <p>
                        <strong>Contact:</strong>
                        {selectedStudent.phone !== null
                          ? ` ${selectedStudent.phone}`
                          : " this user haven not filled in any phone number"}
                      </p>
                      <br />
                      <p>
                        <strong>Bio:</strong>
                        {selectedStudent.bio !== null
                          ? ` ${selectedStudent.bio}`
                          : " this user haven not filled in a bio"}
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    // const { user } = this.props.userState;
    // const thArray = [
    //     "_id","username","firstName","lastName","gender","address","phone","type","role","bio","imageURL","status"
    // ];
    const thArray = ["_id", "username", "name", "type", "role", "status"];
    const { students, currentPage, totalPage } = this.state;

    return (
      <div className="content">
        {this.showContentModal()}

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Students"
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
                      {students.map((student, key) => {
                        return (
                          <tr key={key}>
                            {thArray.map((prop, key) => {
                              if (prop === "name") {
                                return (
                                  <td
                                    key={key}
                                    style={{ wordWrap: "break-word" }}
                                  >{`${student.firstName} ${student.lastName}`}</td>
                                );
                              }
                              return (
                                <td
                                  key={key}
                                  style={{ wordWrap: "break-word" }}
                                >
                                  {student[prop]}
                                </td>
                              );
                            })}

                            <td>
                              {student.status === "Inactive" ? (
                                <Fab
                                  title="Unlock user"
                                  onClick={() => this.onChangeSatus(student)}
                                  style={{ backgroundColor: "#87CB16" }}
                                  aria-label="like"
                                >
                                  <LockOpenIcon />
                                </Fab>
                              ) : (
                                <Fab
                                  title="Lock user"
                                  onClick={() => this.onChangeSatus(student)}
                                  style={{ backgroundColor: "#FF4A55" }}
                                  aria-label="like"
                                >
                                  <BlockIcon />
                                </Fab>
                              )}
                            </td>
                            <td className="text-center align-items-center">
                              <a
                                href="#detailSpecialtyModal"
                                className="detail"
                                data-toggle="modal"
                                onClick={() =>
                                  this.handleSelectElement(student)
                                }
                              >
                                <i
                                  className="pe-7s-look"
                                  data-toggle="tooltip"
                                  title="Detail"
                                ></i>
                              </a>
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
          <Row>
          <Pagination onChange={this.choosePage} defaultCurrent={1} defaultPageSize={1} current={currentPage} total={totalPage} />
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.userState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetAllStudentsAction: () => dispatch(fetchAllStudents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentList));
