import { handleResponse, handleError, getHeaders } from "./apiUtils";
const baseUrl = 'http://localhost:4000';

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

    // create(notification: Notification) {
    //     return this.http.post(`${environment.apiUrl}/notifications/`, notification);
    // }

    // getAll() {
    //     return this.http.get<Notification[]>(`${environment.apiUrl}/notifications`);
    // }

    // getByPatientId(id: number) {
    //     return this.http.get<Notification[]>(`${environment.apiUrl}/notifications/patient/${id}`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${environment.apiUrl}/notifications/${id}`);
    // }

    // update(notification: Notification) {
    //     return this.http.put(`${environment.apiUrl}/notifications/${notification.id}`, notification);
    // }