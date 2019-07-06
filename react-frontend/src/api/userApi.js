import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function login(user) {
  return fetch(baseUrl + '/users/authenticate', {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(loggedInUser => {
      if (loggedInUser && loggedInUser.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      }
      return loggedInUser;
    }
    )
    .catch(handleError);
}


export function register(user) {
  return fetch(baseUrl + '/users/register', {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  }).then(handleResponse)
    .catch(handleError);
}

export function getAll() {
  return fetch(baseUrl + '/users/', {
    method: 'GET',
    headers: { "content-type": "application/json" }
  }).then(handleResponse)
    .catch(handleError);
}

export function getAllPatients() {
  const token = JSON.parse(localStorage.getItem('currentUser')).token;
  return fetch(baseUrl + '/users/patients', {
    method: 'GET',
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` }
  }).then(handleResponse)
    .catch(handleError);
}

export function getById(id) {
  const token = JSON.parse(localStorage.getItem('currentUser')).token;
  return fetch(baseUrl + '/users/patients' + id, {
    method: 'GET',
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` }
  }).then(handleResponse)
    .catch(handleError);
}
