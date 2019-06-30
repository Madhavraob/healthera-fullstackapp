import { handleResponse, handleError, getHeaders } from "./apiUtils";
const baseUrl = 'http://localhost:4000';

// export function login(user) {
//   return fetch(baseUrl + '/users/authenticate', {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(user)
//   })
//     .then(handleResponse)
//     .then(loggedInUser => {
//       if (loggedInUser && loggedInUser.token) {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
//       }
//       return loggedInUser;
//     }
//     )
//     .catch(handleError);
// }

// export function register(user) {
//   return fetch(baseUrl + '/users/register', {
//     method: 'POST',
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(user)
//   }).then(handleResponse)
//     .catch(handleError);
// }

export function create(record) {
  return fetch(baseUrl + '/quotes/', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(record)
  }).then(handleResponse)
    .catch(handleError);
}

// export function getAll() {
//   const token = JSON.parse(localStorage.getItem('currentUser')).token;
//   return fetch(baseUrl + '/users/patients', {
//     method: 'GET',
//     headers: { "content-type": "application/json", Authorization: `Bearer ${token}` }
//   }).then(handleResponse)
//     .catch(handleError);
// }

export function getByPatientId(id) {
  return fetch(baseUrl + '/quotes/patient/' + id, {
    method: 'GET',
    headers: getHeaders()
  }).then(
    // handleResponse)
    res => {
      if (res)
        handleResponse
    })
    .catch(handleError);
}


    // create(record: Record) {
    //     return this.http.post(`${environment.apiUrl}/records/`, record);
    // }

    // getAll() {
    //     return this.http.get<Record[]>(`${environment.apiUrl}/records`);
    // }

    // getByPatientId(id: number) {
    //     return this.http.get<Record[]>(`${environment.apiUrl}/records/patient/${id}`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${environment.apiUrl}/records/${id}`);
    // }

    // update(record: Record) {
    //     return this.http.put(`${environment.apiUrl}/records/${record.id}`, record);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${environment.apiUrl}/records/${id}`);
    // }
