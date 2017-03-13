import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const <%= pluralizedName %> = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_<%= name.toUpperCase() %>_SUCCESS:
      return Object.assign({}, state, {
        <%= pluralizedName %>: action.<%= pluralizedName %>
      });

    case types.CREATE_<%= name.toUpperCase() %>_SUCCESS:
      return Object.assign({}, state, {
        <%= pluralizedName %>: [
          ...state.<%= pluralizedName %>,
          Object.assign({}, action.<%= name %>)
        ].sort((a, b) => {
          return a.id - b.id; // Sort by id alphabetically.
        })
      });

    case types.UPDATE_<%= name.toUpperCase() %>_SUCCESS:
      return Object.assign({}, state, {
        <%= pluralizedName %>: [
          ...state.<%= pluralizedName %>.filter(<%= name %> => <%= name %>.id !== action.<%= name %>.id),
          Object.assign({}, action.<%= name %>)
        ].sort((a, b) => {
          return a.id - b.id; // Sort by id alphabetically.
        })
      });

    case types.DELETE_<%= name.toUpperCase() %>_SUCCESS:
      return Object.assign({}, state, {
        <%= pluralizedName %>: [
          ...state.<%= pluralizedName %>.filter(<%= name %> => <%= name %>.id !== action.<%= name %>Id)
        ]
      });

    default:
      return state;
  }
};

export const <%= name %> = (state = initialState.<%= name %>, action) => {
  switch (action.type) {
    case types.GET_<%= name.toUpperCase() %>_SUCCESS:
      return action.<%= name %>;

    default:
      return state;
  }
};
