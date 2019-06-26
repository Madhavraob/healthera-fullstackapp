import * as types from "./actionTypes";
import * as notificationsApi from "../../api/notificationApi";

export function createNotificationSuccess(payload) {
  return { type: types.CREATE_NOTIFICTION_SUCCESS, payload };
}

export function updateNotificationSuccess(payload) {
  return { type: types.UPDATE_NOTIFICTION_SUCCESS, payload };
}

export function loadNotificationsSuccess(payload) {
  return { type: types.LOAD_NOTIFICTIONS_SUCCESS, payload };
}

export function create(notification) {
  return function (dispatch) {
    return notificationsApi
      .create(notification)
      .then(newNotification => {
        dispatch(createNotificationSuccess(newNotification));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function update(notification) {
  return function (dispatch) {
    return notificationsApi
      .update(notification)
      .then(updatedNotification => {
        dispatch(updateNotificationSuccess(updatedNotification));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getByPatientId(id) {
  return function (dispatch) {
    return notificationsApi
      .getByPatientId(id)
      .then(notifications => {
        dispatch(loadNotificationsSuccess(notifications));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getAll() {
  return function (dispatch) {
    return notificationsApi
      .getAll()
      .then(notifications => {
        dispatch(loadNotificationsSuccess(notifications));
      })
      .catch(error => {
        throw error;
      });
  };
}