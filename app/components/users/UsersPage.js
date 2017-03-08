import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as usersActions from '../../actions/userActions';
import UserList from './UserList';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';
import UserAddModal from './UserAddModal';
import UserEditModal from './UserEditModal';

export class UsersPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, props.user)
        };

        this.onClickDetail = this.onClickDetail.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        props.actions.loadUsers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    onClickDetail(event) {
        event.preventDefault();
        this.props.actions.getUser(event.target.id)
            .then(() => {
                this.modal.open();
            })
            .catch(() => {
                toastr.error('The selected user does not exist.');
            });
    }

    onClickAdd(event) {
        event.preventDefault();
        this.userAddModal.getWrappedInstance().open();
    }

    onClickEdit(event) {
        event.preventDefault();
        this.userEditModal.getWrappedInstance().open(event.target.id);
    }

    onClickDelete(event) {
        event.preventDefault();
        this.setState({
            userToDelete: event.target.id // TODO: This should be removed and send the id by param.
        });
        this.userDeleteModal.open();
    }

    handleDelete() {
        // TODO: This method should receive the id by param.
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
                <a href="" onClick={this.onClickAdd}>Add</a>
                <UserList
                    users={this.props.users}
                    onClickDetail={this.onClickDetail}
                    onClickEdit={this.onClickEdit}
                    onClickDelete={this.onClickDelete} />
                <Modal
                    title="User Info"
                    body={this.state.user.createdAt}
                    ref={(child) => { this.modal = child; }} />
                <UserAddModal ref={(child) => { this.userAddModal = child; }} />
                <UserEditModal ref={(child) => { this.userEditModal = child; }} />
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
