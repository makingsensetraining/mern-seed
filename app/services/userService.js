import fetch from 'isomorphic-fetch';
import * as endpoints from './apiEndpoints';

class UserService {
  static loadUsers() {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.GET_USERS}`, {
      method: 'GET'
    });

    return fetch(request).then(response => response.json());
  }

  static getUser(id) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.GET_USER}/${id}`, {
      method: 'GET'
    });

    return fetch(request).then(response => response.json());
  }

  static createUser(user) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.POST_USER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user
      })
    });

    return fetch(request).then(response => response.json());
  }

  static updateUser(user) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.PUT_USER}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user
      })
    });

    return fetch(request).then(response => response.json());
  }

  static deleteUser(id) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.DELETE_USER}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return fetch(request).then(response => response.json());
  }
}

export default UserService;
