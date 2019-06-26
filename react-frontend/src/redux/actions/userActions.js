import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";

export function loginUserSuccess(payload) {
  return { type: types.LOGIN_USER_SUCCESS, payload };
}


export function loadPatientsSuccess(payload) {
  return { type: types.LOAD_PATIENTS_SUCCESS, payload };
}

export function loginUser(user) {
  return function (dispatch) {
    return userApi
      .login(user)
      .then(loggedInUser => {
        dispatch(loginUserSuccess(loggedInUser));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function register(user) {
  return function (dispatch) {
    return userApi
      .register(user)
      // .then(loggedInUser => {
      //   dispatch(loginUserSuccess(loggedInUser));
      // })
      .catch(error => {
        throw error;
      });
  };
}

// export function getAll() {
// return fetch(baseUrl + '/users/', {
//   method: 'GET',
//   headers: { "content-type": "application/json" }
// }).then(handleResponse)
//   .catch(handleError);
// }

export function getAllPatients() {
  return function (dispatch) {
    return userApi
      .getAllPatients()
      .then(patients => {
        dispatch(loadPatientsSuccess(patients));
      })
      .catch(error => {
        throw error;
      });
  };
  // return fetch(baseUrl + '/users/patients', {
  //   method: 'GET',
  //   headers: { "content-type": "application/json" }
  // }).then(handleResponse)
  //   .catch(handleError);
}

// export function getById(id) {
//   return fetch(baseUrl + '/users/patients' + id, {
//     method: 'GET',
//     headers: { "content-type": "application/json" }
//   }).then(handleResponse)
//     .catch(handleError);
// }

