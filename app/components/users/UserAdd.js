import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';

class UserAdd extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, props.user),
            saving: false
        };

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(user) {
        this.setState({ saving: true });
        this.props.actions.createUser(user)
            .then(() => {
                this.setState({ saving: false });
                toastr.success('User created successfully');
                browserHistory.push('/app/users');
            })
            .catch(error => {
                this.setState({ saving: false });
                toastr.error(error.description);
            });
    }

    render() {
        return (
            <div>
                <h1>Add User</h1>
                <UserForm
                    onSave={this.handleSave}
                    saving={this.state.saving}
                    user={this.state.user}
                />
            </div>
        );
    }
}

UserAdd.propTypes = {
    actions: PropTypes.object.isRequired,
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
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserAdd);
