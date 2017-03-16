import fetch from 'isomorphic-fetch';
import * as endpoints from './apiEndpoints';

class <%= ucName %>Service {
  static load<%= pluralizedUcName %>() {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.GET_<%= pluralizedName.toUpperCase() %>}`, {
      method: 'GET'
    });

    return fetch(request).then(response => response.json());
  }

  static get<%= ucName %>(id) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.GET_<%= name.toUpperCase() %>}/${id}`, {
      method: 'GET'
    });

    return fetch(request).then(response => response.json());
  }

  static create<%= ucName %>(<%= name %>) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.POST_<%= name.toUpperCase() %>}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        <%= name %>: <%= name %>
      })
    });

    return fetch(request).then(response => response.json());
  }

  static update<%= ucName %>(<%= name %>) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.PUT_<%= name.toUpperCase() %>}/${<%= name %>.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        <%= name %>: <%= name %>
      })
    });

    return fetch(request).then(response => response.json());
  }

  static delete<%= ucName %>(id) {
    const request = new Request(`${endpoints.BASE_URL}${endpoints.DELETE_<%= name.toUpperCase() %>}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return fetch(request);
  }
}

export default <%= ucName %>Service;
