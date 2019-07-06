import { handleResponse, handleError, getHeaders } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function create(record) {
  return fetch(baseUrl + '/records/', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(record)
  }).then(handleResponse)
    .catch(handleError);
}

export function getByPatientId(id) {
  return fetch(baseUrl + '/records/patient/' + id, {
    method: 'GET',
    headers: getHeaders()
  }).then(handleResponse)
    .catch(handleError);
}
