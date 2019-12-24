import React, { Component } from "react";
import { Grid, Row, Col, Table, Image, Alert } from "react-bootstrap";
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BlockIcon from '@material-ui/icons/Block';
import Card from "components/Card/Card.jsx";
import { fetchAllTutors } from "../../actions/user";
import {SERVER_URL} from '../../helpers/constant';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

class TutorList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTutor: null,
      search: '',
      indexFirst: 0,
      indexLast: 0,
      currentPage: 1,
      dataPerPage: 3,
      totalPage: 1,
      tutors: []
    };

    this.choosePage = this.choosePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllTutorsAction();
  }

  componentDidUpdate(oldProps) {
    // Pagination
    if ( oldProps.userState.allTutors !== this.props.userState.allTutors ) {
      const { search, dataPerPage} = this.state;
      this.setState({
        totalPage: Math.ceil(this.props.userState.allTutors.length / this.state.dataPerPage),
        tutors: this.props.userState.allTutors
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

  onChangeSatus(value) {

    let user = null;
    if(value.hasOwnProperty('status')) {
      user = {
        ...value
      }
      user.status = user.status==='Inactive'?'Active':'Inactive'
    } else {
      user = {
        ...value,
        status: 'Inactive'
      }
    }

    fetch(`${SERVER_URL}/user/update`, {
      method: 'POST',
      body: JSON.stringify({
          ...user
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
          this.props.fetchAllTutorsAction();


      })
      .catch((error) => {
          console.log(error);
      });

  }

  handleSelectElement(element) {
    this.setState({
      selectedTutor: element
    });
  };

  showContentModal()
  {
    const { selectedTutor } = this.state;
    if (selectedTutor !== null)
    {
      const statusAlert = [];
      if (selectedTutor.status !== null)
      {
        if (selectedTutor.status === 'notverified')
        {
          statusAlert.push(<Alert className='alert alert-warning text-center' style={{padding: '1%', marginLeft: '3%', fontSize: '20px'}}>Not Verified</Alert>);
        } else if (selectedTutor.status === 'Active')
        {
          statusAlert.push(<Alert className='alert alert-success text-center' style={{padding: '1%', marginLeft: '3%', fontSize: '20px'}}>Active</Alert>);
        } else if (selectedTutor.status === 'Inactive')
        {
          statusAlert.push(<Alert className='alert alert-danger text-center' style={{padding: '1%', marginLeft: '3%', fontSize: '20px'}}>Inactive</Alert>);
        }
      }
      return (
        <div id="detailSpecialtyModal" className="modal fade">
        {/* -------Modal--------- */}
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Tutor Information</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                <div className="card card-user" style={{marginBottom: '3%'}}>
                  <div className="content" >
                    <div className='text-center'>
                    <Image
                      className="avatar border-gray"
                      src={selectedTutor.imageURL}
                    />
                    <br/>
                    <strong style={{color: 'green'}}>
                    {`${selectedTutor.firstName} ${selectedTutor.lastName}`}
                    <br/>
                    </strong>
                    <br/>
                    {statusAlert}
                    <br/>
                    </div>
                    <br/>
                    <div style={{wordBreak: 'break-all', whiteSpace: 'normal'}}>
                      <p>
                        <strong>Email (Username): </strong>
                        {selectedTutor.username}
                      </p>
                      <br/>
                      <p>
                        <strong>Account type: </strong>
                        {selectedTutor.type === 'local' ? 'Normal registration account' : `${selectedTutor.username} account`}
                      </p>
                      <br/>
                      <p>
                        <strong>Role: </strong>
                        {selectedTutor.role}
                      </p>
                      <br/>
                      <p>
                        <strong>Gender:</strong>
                        {selectedTutor.gender !== null ? ` ${selectedTutor.gender}` : ' Other'}
                      </p>
                      <br/>
                      <p>
                        <strong>Address:</strong>
                        {selectedTutor.address !== null ? ` ${selectedTutor.address}` : ' this user haven not filled in an address'}
                      </p>
                      <br/>
                      <p>
                        <strong>Contact:</strong>
                        {selectedTutor.phone !== null ? ` ${selectedTutor.phone}` : ' this user haven not filled in any phone number'}
                      </p>
                      <br/>
                      <p>
                        <strong>Bio:</strong>
                        {selectedTutor.bio !== null ? ` ${selectedTutor.bio}` : ' this user haven not filled in a bio'}
                      </p>
                      <br/>
                    </div>
                  </div>
                </div>
                </div>


                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

              </div>
            </div>
        </div>
      );
    }
    return null;
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
        tutors: this.props.userState.allTutors
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

  render() {
    const thArray = [
        "_id","username","firstName","lastName","type","role","status"
    ];
    const { tutors, currentPage, totalPage } = this.state;

    return (
      <div className="content">
        {this.showContentModal()}

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Tutors"
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
                      {tutors.map((tutor, key) => {
                        return (
                          <tr key={key}>
                            {thArray.map((prop, key) => {
                              if (prop === "name") {
                                return (
                                  <td
                                    key={key}
                                    style={{ wordWrap: "break-word" }}
                                  >{`${tutor.firstName} ${tutor.lastName}`}</td>
                                );
                              }
                              return (
                                <td
                                  key={key}
                                  style={{ wordWrap: "break-word" }}
                                >
                                  {tutor[prop]}
                                </td>
                              );
                            })}
                            <td>
                              {tutor.status === "Inactive" ? (
                                <Fab
                                  title="Unlock user"
                                  onClick={() => this.onChangeSatus(tutor)}
                                  style={{ backgroundColor: "#87CB16" }}
                                  aria-label="like"
                                >
                                  <LockOpenIcon />
                                </Fab>
                              ) : (
                                <Fab
                                  title="Lock user"
                                  onClick={() => this.onChangeSatus(tutor)}
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
                                onClick={() => this.handleSelectElement(tutor)}
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
    fetchAllTutorsAction: () => dispatch(fetchAllTutors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TutorList));
