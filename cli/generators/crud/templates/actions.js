import * as types from './actionTypes';
import <%= name %>Service from '../services/<%= name %>Service';

export function load<%= ucName %>Success(<%= pluralizedName %>) {
  return {
    type: types.LOAD_<%= name.toUpperCase() %>_SUCCESS,
    <%= pluralizedName %>
  };
}

export function get<%= ucName %>Success(<%= name %>) {
  return {
    type: types.GET_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function create<%= ucName %>Success(<%= name %>) {
  return {
    type: types.CREATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function update<%= ucName %>Success(<%= name %>) {
  return {
    type: types.UPDATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function delete<%= ucName %>Success(<%= name %>Id) {
  return {
    type: types.DELETE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>Id
  };
}

export function load<%= pluralizedUcName %>() {
  return dispatch => {
    return <%= name %>Service.load<%= pluralizedUcName %>()
      .then(data => dispatch(load<%= ucName %>Success(data)));
  };
}

export function get<%= ucName %>(id) {
  return (dispatch, getState) => {
    return <%= name %>Service.get<%= ucName %>(id)
      .then(<%= name %> => dispatch(get<%= ucName %>Success(<%= name %>)));
  };
}

export function create<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    return <%= name %>Service.create<%= ucName %>(<%= name %>)
      .then(created<%= ucName %> => dispatch(create<%= ucName %>Success(created<%= ucName %>)));
  };
}

export function update<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    return <%= name %>Service.update<%= ucName %>(<%= name %>)
      .then(updated<%= ucName %> => dispatch(update<%= ucName %>Success(updated<%= ucName %>)));
  };
}

export function delete<%= ucName %>(id) {
  return (dispatch, getState) => {
    return <%= name %>Service.delete<%= ucName %>(id)
      .then(() => dispatch(delete<%= ucName %>Success(id)));
  };
}
