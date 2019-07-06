import { handleResponse, handleError, getHeaders } from "./apiUtils";
const baseUrl = 'http://localhost:4000';

export function create(record) {
  return fetch(baseUrl + '/quotes/', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(record)
  }).then(handleResponse)
    .catch(handleError);
}

export function getByPatientId(id) {
  return fetch(baseUrl + '/quotes/patient/' + id, {
    method: 'GET',
    headers: getHeaders()
  }).then(res => {
    if (res)
      return handleResponse(res);
  })
    .catch(handleError);
}
