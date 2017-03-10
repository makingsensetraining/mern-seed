import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as usersActions from '../../actions/userActions';
import UserList from './UserList';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

export class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user)
    };

    this.onClickDetail = this.onClickDetail.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    props.actions.loadUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
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
    this.setState({
      userToDelete: userId
    });
    this.userDeleteModal.open();
  }

  handleDelete() {
    this.props.actions.deleteUser(this.state.userToDelete)
      .then(() => {
        toastr.success('User removed');
      })
      .catch(error => {
        toastr.error(error);
      });
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
          body={this.state.user.createdAt}
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
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state,
    users: state.users.users,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
