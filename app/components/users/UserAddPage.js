import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';
import { alertMessage } from '../../helpers';

class UserAddPage extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
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
          saving={this.props.saving}
          canSubmit={this.props.canSubmit}
          enableSubmit={this.props.actions.enableSubmit}
          disableSubmit={this.props.actions.disableSubmit}
          user={this.props.user}
        />
      </div>
    );
  }
}

UserAddPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  saving: PropTypes.bool,
  canSubmit: PropTypes.bool,
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
    saving: state.reducers.saving,
    canSubmit: state.reducers.canSubmit,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserAddPage);
