import * as types from "./actionTypes";
import * as recordApi from "../../api/recordApi";

export function createRecordSuccess(payload) {
  return { type: types.CREATE_RECORD_SUCCESS, payload };
}

export function loadRecordsSuccess(payload) {
  return { type: types.LOAD_RECORDS_SUCCESS, payload };
}

export function create(record) {
  return function () {
    return recordApi
      .create(record)
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
}
