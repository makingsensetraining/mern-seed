import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import autoBind from 'react-autobind';
import * as userActions from '../../actions/userActions';
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
    this.props.actions.getUser(userId)
      .then(() => {
        this.modal.open();
      })
      .catch(() => {
        toastr.error('The selected user does not exist.');
      });
  }

  onClickDelete(userId) {
    this.props.actions.requestUserId(userId);
    this.userDeleteModal.open();
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
          title="User Info"
          body={this.props.user.createdAt}
          ref={(child) => { this.modal = child; }} />
        <ConfirmModal
          title="Delete User"
          body="Are you sure you want to delete this user?"
          ref={(child) => { this.userDeleteModal = child; }}
          confirm={this.handleDelete} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  actions: PropTypes.object,
  alert: PropTypes.object,
  userToDelete: PropTypes.string,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    userToDelete: state.reducers.userToDelete,
    users: state.reducers.users.users,
    user: state.reducers.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
