import { handleResponse, handleError, getHeaders } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function create(alert) {
  return fetch(baseUrl + '/notifications/', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(alert)
  }).then(handleResponse)
    .catch(handleError);
}

export function getAll() {
  return fetch(baseUrl + '/notifications/', {
    method: 'GET',
    headers: getHeaders()
  }).then(handleResponse)
    .catch(handleError);
}

export function getByPatientId(id) {
  return fetch(baseUrl + '/notifications/patient/' + id, {
    method: 'GET',
    headers: getHeaders()
  }).then(handleResponse)
    .catch(handleError);
}

export function update(notification) {
  return fetch(baseUrl + '/notifications/' + notification.id, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(notification)
  }).then(handleResponse)
    .catch(handleError);
}
