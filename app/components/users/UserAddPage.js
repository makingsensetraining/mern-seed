import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from '../../lib/autoBind';
import * as userActions from '../../actions/userActions';
import * as alertActions from '../../actions/alertActions';
import UserForm from './UserForm';
import { alertMessage } from '../../helpers';

class UserAddPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this, {
      bindOnly: ['handleSave']
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  handleSave(user) {
    this.props.actions.createUser(user);
  }

  render() {
    return (
      <div>
        <h1>Add User</h1>
        <UserForm
          onSave={this.handleSave}
          saving={this.props.savingUser}
          user={this.props.user}
        />
      </div>
    );
  }
}

UserAddPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  savingUser: PropTypes.bool,
  user: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  let user = {
    id: 0,
    name: '',
    email: '',
    createdAt: ''
  };

  return {
    state: state,
    alert: state.reducers.alert,
    savingUser: state.reducers.savingUser,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...userActions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserAddPage);
