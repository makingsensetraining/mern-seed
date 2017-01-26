import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/userActions';
import UserList from './UserList';
import Modal from  '../common/Modal';
import toastr from 'toastr';

export class UsersPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, props.user)
        };

        //Mapping functions
        this.onClickUserDetail = this.onClickUserDetail.bind(this);

        props.actions.loadUsers();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            user: nextProps.state.user
        });
    }

    onClickUserDetail(event){
        event.preventDefault();

        this.props.actions.getUser(event.target.id)
            .then(() => {
                this.modal.open();
            })
            .catch(() => {
                toastr.error('The selected user does not exist.');
            });
    }

    render() {
        return (
            <div>
                <h1>Users List</h1>
                <UserList
                    users={this.props.users}
                    onClick={this.onClickUserDetail}/>

                <Modal
                    title="User Info"
                    body={this.state.user.createdAt}
                    ref={(child) => { this.modal = child; }} />
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
    let user = {
        id: 0,
        name: '',
        email: '',
        createdAt: ''
    };

    return {
        state: state,
        users: state.users.users,
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(usersActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
