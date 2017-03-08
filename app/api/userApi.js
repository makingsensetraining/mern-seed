import fetch from 'isomorphic-fetch';
import * as endpoints from '../api/apiEndpoints';

class UserApi {

  static loadUsers() {
    const baseUrl = 'http://localhost:3000'; //ToDo: check a better way
    const url = baseUrl + endpoints.GET_USERS;

    const request = new Request(url, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getUser(id) {
    const baseUrl = 'http://localhost:3000'; //ToDo: check a better way
    const url = baseUrl + endpoints.GET_USER + `/${id}`;

    const request = new Request(url, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default UserApi;
