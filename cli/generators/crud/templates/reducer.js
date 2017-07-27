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

export const alert = (state = initialState.alert, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return action.alert;

    case types.HIDE_ALERT:
      return action.alert;

    default:
      return state;
  }
};

export const saving = (state = initialState.saving, action) => {
  switch (action.type) {
    case types.SAVING_<%= name.toUpperCase() %>:
      return action.saving;

    case types.SAVE_<%= name.toUpperCase() %>_SUCCESS:
      return action.saving;

    case types.SAVE_<%= name.toUpperCase() %>_ERROR:
      return action.saving;

    default:
      return state;
  }
};

export const <%= name %>ToDelete = (state = initialState.<%= name %>ToDelete, action) => {
  switch (action.type) {
    case types.REQUEST_<%= name.toUpperCase() %>_ID:
      return action.<%= name %>ToDelete;

    default:
      return state;
  }
};

export const canSubmit = (state = initialState.canSubmit, action) => {
  switch (action.type) {
    case types.ENABLE_SUBMIT:
      return action.canSubmit;

    case types.DISABLE_SUBMIT:
      return action.canSubmit;

    default:
      return state;
  }
};
