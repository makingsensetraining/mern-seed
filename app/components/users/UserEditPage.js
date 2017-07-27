import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import * as userActions from '../../actions/userActions';
import * as alertActions from '../../actions/alertActions';
import UserForm from './UserForm';
import { alertMessage } from '../../helpers';

class UserEditPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

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

UserEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  saving: PropTypes.bool,
  user: PropTypes.object,
  canSubmit: PropTypes.bool,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    saving: state.reducers.saving,
    canSubmit: state.reducers.canSubmit,
    user: state.reducers.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...userActions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserEditPage);
