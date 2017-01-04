import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/userActions';
import UserList from './UserList';

class UsersPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <UserList users={this.props.users}/>
            </div>
        );
    }
}

UsersPage.propTypes = {
    actions: PropTypes.object,
    users: PropTypes.array.isRequired
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        users: state.userData.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(usersActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
