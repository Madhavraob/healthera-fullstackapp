import * as types from "./actionTypes";
import * as recordApi from "../../api/recordApi";

export function createRecordSuccess(payload) {
  return { type: types.CREATE_RECORD_SUCCESS, payload };
}

export function loadRecordsSuccess(payload) {
  return { type: types.LOAD_RECORDS_SUCCESS, payload };
}

// export function loginUser(user) {
//   return function (dispatch) {
//     return userApi
//       .login(user)
//       .then(loggedInUser => {
//         dispatch(loginUserSuccess(loggedInUser));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// }

export function create(record) {
  return function (dispatch) {
    return recordApi
      .create(record)
      .then(newRecord => {
        dispatch(createRecordSuccess(newRecord));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getByPatientId(id) {
  return function (dispatch) {
    return recordApi
      .getByPatientId(id)
      .then(records => {
        dispatch(loadRecordsSuccess(records));
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

