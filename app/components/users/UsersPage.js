import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import * as userActions from '../../actions/userActions';
import * as modalActions from '../../actions/modalActions';
import * as alertActions from '../../actions/alertActions';
import UserList from './UserList';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';
import { alertMessage } from '../../helpers';

export class UsersPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    props.actions.loadUsers();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  onClickDetail(userId) {
    this.props.actions.getUser(userId, true);
  }

  onClickDelete(userId) {
    this.props.actions.requestUserId(userId);
  }

  handleDelete() {
    this.props.actions.deleteUser(this.props.userToDelete);
  }

  render() {
    return (
      <div>
        <h1>Users List</h1>
        <Link to="/app/users/add">Add</Link>
        <UserList
          users={this.props.users}
          onClickDetail={this.onClickDetail}
          onClickDelete={this.onClickDelete} />
        <Modal
          id="userDetailsModal"
          title="User Info"
          body={this.props.user.createdAt}
          modal={this.props.modal}
          close={this.props.actions.hideModal}
        />
        <ConfirmModal
          id="userDeleteModal"
          title="Delete User"
          body="Are you sure you want to delete this user?"
          modal={this.props.modal}
          close={this.props.actions.hideModal}
          confirm={this.handleDelete}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  actions: PropTypes.object,
  alert: PropTypes.object,
  modal: PropTypes.object,
  userToDelete: PropTypes.string,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    modal: state.reducers.modal,
    userToDelete: state.reducers.userToDelete,
    users: state.reducers.users.users,
    user: state.reducers.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...userActions, ...modalActions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
