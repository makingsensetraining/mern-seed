import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from '../../lib/autoBind';
import * as userActions from '../../actions/userActions';
import * as alertActions from '../../actions/alertActions';
import UserForm from './UserForm';
import { alertMessage } from '../../helpers';

class UserEditPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this, {
      bindOnly: ['handleSave']
    });

    props.actions.getUser(props.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  handleSave(user) {
    let data = {
      id: this.props.user.id,
      name: user.name,
      email: user.email
    };

    this.props.actions.updateUser(data);
  }

  render() {
    return (
      <div>
        <h1>Edit User</h1>
        <UserForm
          onSave={this.handleSave}
          saving={this.props.savingUser}
          user={this.props.user}
        />
      </div>
    );
  }
}

UserEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  savingUser: PropTypes.bool,
  user: PropTypes.object,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    savingUser: state.reducers.savingUser,
    user: state.reducers.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...userActions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserEditPage);
