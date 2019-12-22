import fetch from "cross-fetch";
import * as types from "../helpers/action-type";
import { SERVER_URL } from "../helpers/constant";

function getAllContract(allContracts) {
  return {
    type: types.GET_ALL_CONTRACTS,
    allContracts
  };
}

function getTutorContract(allContracts) {
  return {
    type: types.GET_TUTOR_CONTRACTS,
    allContracts
  };
}

function getStudentContract(allStudentContracts) {
  return {
    type: types.GET_ALL_STUDENT_CONTRACTS,
    allStudentContracts
  };
}

export function fetchAllContracts() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/contract/api`)
      .then(response => response.json())
      .then(contracts => {
        dispatch(getAllContract(contracts));
      })
      .catch(error => {
        dispatch(getAllContract(null));
      });
  };
}

async function getDataContract(_idStudent, _idTutor, _idSubject, _idFeedback) {
  var contract = {};
  const resStudent = await fetch(`${SERVER_URL}/user/api/${_idStudent}`);
          const student = await resStudent.json();
          const resTutor = await fetch(`${SERVER_URL}/user/api/${_idTutor}`);
          const tutor = await resTutor.json();
          const resSubject = await fetch(`${SERVER_URL}/subject/api/${_idSubject}`);
          const subject = await resSubject.json();

          if (_idFeedback) {
            const resFeedback = await fetch(`${SERVER_URL}/feedback/api/${_idFeedback}`);
            const feedback = await resFeedback.json();
            contract = { ...contract, feedback};
          }   

    return { ...contract, student, tutor, subject };
}

export function fetchAllDetailContracts() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/contract/api`)
      .then(response => response.json())
      .then(contracts => {
        contracts.forEach(async contract => {
          const { _idStudent, _idTutor, _idSubject, _idFeedback } = contract;
          getDataContract(_idStudent, _idTutor, _idSubject, _idFeedback).then(data => {
            console.log(data);
            contract = { ...contract, ...data}
          })
          console.log(contract);
        });
        console.log(contracts);
        dispatch(getAllContract(contracts));

      }).catch(err => {
        console.log(err);
        dispatch(getAllContract(null));
      }) 
  };
}

export function fetchTutorContracts(id) {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/contract/student/${id}`)
      .then(response => response.json())
      .then(contracts => {
        dispatch(getTutorContract(contracts));
      })
      .catch(error => {
        dispatch(getTutorContract(null));
      });
  };
}


export function fetchStudentContracts(id) {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/contract/tutor/${id}`)
      .then(response => response.json())
      .then(contracts => {
        dispatch(getStudentContract(contracts));
      })
      .catch(error => {
        dispatch(getStudentContract(null));
      });
  };
}

export function setTutor(tutor) {
  return {
    type: types.SET_TUTOR_CONTRACT,
    tutor
  };
}

export function setStudent(student) {
  return {
    type: types.SET_STUDENT_CONTRACT,
    student
  };
}

export function setDetailContract(detailContract) {
  return {
    type: types.SET_DETAIL_CONTRACT,
    detailContract
  };
}
